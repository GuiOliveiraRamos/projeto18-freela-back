import { db } from "../database/database.connection.js";

export async function newMiaudelo(req, res) {
  const { image, name, description } = req.body;
  const sessionId = req.headers.authorization;

  try {
    if (!sessionId) {
      return res.status(401).send("Você não está logado!");
    }
    const sessionQuery = `SELECT user_id FROM sessions WHERE session_id = $1`;
    const sessionValues = [sessionId];
    const sessionResult = await db.query(sessionQuery, sessionValues);

    if (sessionResult.rowCount === 0) {
      return res.status(401).send("Faça login novamente!");
    }

    const userId = sessionResult.rows[0].user_id;

    const insertMiaudeloQuery = `INSERT INTO miaudelos (user_id, session_id, image, name, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now())`;
    const insertMiaudeloValues = [userId, sessionId, image, name, description];
    await db.query(insertMiaudeloQuery, insertMiaudeloValues);
    res.status(201).send("Miaudelo cadastrado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getMyMiaudelos(req, res) {
  const sessionId = req.headers.authorization;

  try {
    if (!sessionId) {
      return res.status(401).send("Você não está logado!");
    }

    const sessionQuery = `SELECT user_id FROM sessions WHERE session_id = $1`;
    const sessionValues = [sessionId];
    const sessionResult = await db.query(sessionQuery, sessionValues);

    if (sessionResult.rowCount === 0) {
      return res.status(401).send("Faça login novamente!");
    }

    const userId = sessionResult.rows[0].user_id;
    const getMiaudelosQuery = `SELECT * FROM miaudelos WHERE user_id = $1`;
    const getMiaudelosValues = [userId];
    const result = await db.query(getMiaudelosQuery, getMiaudelosValues);
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateMiaudelo(req, res) {
  const { id } = req.params;
  const { image, name, description } = req.body;
  try {
    const updateMiaudeloQuery = `UPDATE miaudelos SET image = $1, name = $2, description = $3, updated_at = now() WHERE id = $4`;
    const updateMiaudeloValues = [image, name, description, id];
    await db.query(updateMiaudeloQuery, updateMiaudeloValues);
    res.status(200).send("Miaudelo atualizado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteMiaudelo(req, res) {
  const { id } = req.params;
  try {
    const deleteMiaudeloQuery = `DELETE FROM miaudelos WHERE id = $1`;
    const deleteMiaudeloValues = [id];
    await db.query(deleteMiaudeloQuery, deleteMiaudeloValues);
    res.status(200).send("Miaudelo deletado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
