import { db } from "../database/database.connection.js";

export async function signUp(req, res) {
  const { name, phone, cpf, email, password, confirmPassword } = req.body;
}

try {
  const alreadyExists = await db.query(`SELECT id FROM users WHERE email = $1`);
  const getValues = [email];
  const result = await db.query(alreadyExists, getValues);

  if (result.rowCount > 0) return res.status(409).send("Usuário já cadastrado");

  const hash = bcrypt.hash(password, 10);
} catch (error) {
  console.log(error);
}
