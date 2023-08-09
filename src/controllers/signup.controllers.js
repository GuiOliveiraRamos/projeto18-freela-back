import { hashSync } from "bcrypt";
import { db } from "../database/database.connection.js";

export async function signUp(req, res) {
  const { name, phone, cpf, email, password } = req.body;

  try {
    const alreadyExists = await db.query(
      `SELECT id FROM users WHERE email = $1`
    );
    const getExistsValues = [email];
    const result = await db.query(alreadyExists, getExistsValues);

    if (result.rowCount > 0)
      return res.status(409).send("Usuário já cadastrado");

    const hash = bcrypt.hash(password, 10);

    const insertUserQuery = `INSERT INTO users (name, phone, cpf, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now())`;
    const getUserValues = [name, phone, cpf, email, hash];
    await db.query(insertUserQuery, getUserValues);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userQuery = `SELECT id FROM users WHERE email = $1`;
    const getUserValues = [email];
    const userResult = await db.query(userQuery, getUserValues);

    if (userResult.rowCount === 0) return res.sendStatus(401);

    const user = userResult.rows[0];

    const validatePassword = hashSync(password, user.password);

    if (!validatePassword) return res.sendStatus(401);

    await db.query(`UPDATE users SET updated_at = now() WHERE id = $1`, [
      user.id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
