// server/index.js
const express = require("express");
const cors = require("cors");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

const app = express();
app.use(cors());
app.use(express.json());

// Alle woorden ophalen
app.get("/words", async (req, res) => {
  try {
    const words = await knex("words").select("*");
    // Sommige DB drivers sturen JSON velden als string, dus check en parse:
    const parsedWords = words.map((w) => ({
      ...w,
      description:
        typeof w.description === "string"
          ? JSON.parse(w.description)
          : w.description,
    }));
    res.json(parsedWords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Nieuw woord toevoegen
app.post("/api/words", async (req, res) => {
  const { word, descriptions } = req.body;
  if (!word || !Array.isArray(descriptions)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const [id] = await knex("words").insert({
      word,
      descriptions: JSON.stringify(descriptions),
    });
    const newWord = await knex("words").where({ id }).first();
    newWord.descriptions = JSON.parse(newWord.descriptions || "[]");
    res.status(201).json(newWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verwijder woord
app.delete("/api/words/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("words").where({ id }).del();
    res.json({ message: "Woord verwijderd" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend actief op http://localhost:${PORT}`);
});
