import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuidv4 } from "uuid";

export async function signUp(req, res) {
  const { name, phone, cpf, email, password } = req.body;

  try {
    const alreadyExists = `SELECT id FROM users WHERE email = $1`;
    const getExistsValues = [email];
    const result = await db.query(alreadyExists, getExistsValues);

    if (result.rowCount > 0)
      return res.status(409).send("Usuário já cadastrado");

    const hash = bcrypt.hashSync(password, 10);

    const insertUserQuery = `INSERT INTO users (name, phone, cpf, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now())`;
    const getUserValues = [name, phone, cpf, email, hash];
    await db.query(insertUserQuery, getUserValues);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userQuery = `SELECT id, password FROM users WHERE email = $1`;
    const getUserValues = [email];
    const userResult = await db.query(userQuery, getUserValues);

    if (userResult.rowCount === 0) return res.sendStatus(401);

    const user = userResult.rows[0];
    const hashedPassword = user.password;
    const validatePassword = bcrypt.compareSync(password, hashedPassword);

    if (!validatePassword) return res.sendStatus(401);

    const sessionId = uuidv4();

    const sessionQuery = `INSERT INTO sessions (user_id,session_id,created_at) VALUES ($1, $2, now())`;
    const sessionValues = [user.id, sessionId];
    await db.query(sessionQuery, sessionValues);

    await db.query(`UPDATE users SET updated_at = now() WHERE id = $1`, [
      user.id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
