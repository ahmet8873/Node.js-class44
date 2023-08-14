import express from "express";

import fs from "fs";

import { fileURLToPath } from "url";
import path from "path";

export const app = express();

const port = 3000;

app.use(express.json());

// Create
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required." });
    return;
    // we dont need return
  }

  try {
    fs.writeFileSync(`${title}.json`, JSON.stringify({ title, content }));
    res.status(201).send("ok");
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
  }
});

// Read one
app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;

  if (!fs.existsSync(`${title}.json`)) {
    res.status(404).json({ error: "This post does not exist!" });
    return;
  }

  try {
    const postContent = fs.readFileSync(`${title}.json`);
    const post = JSON.parse(postContent);
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while reading the post." });
  }
});

// Update
app.put("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (!fs.existsSync(`${title}.json`)) {
    res.status(404).json({ error: "This post does not exist!" });
    return;
  }

  try {
    fs.writeFileSync(`${title}.json`, JSON.stringify({ title, content }));
    res.status(200).send("ok");
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the post." });
  }
});

// Delete
app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;

  if (!fs.existsSync(`${title}.json`)) {
    res.status(404).json({ error: "This post does not exist!" });
    return;
  }

  try {
    fs.unlinkSync(`${title}.json`);
    res.status(200).send("ok");
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
});

// In Node.js, the __dirname variable is only available in CommonJS modules (files that use require and module.exports). If you're using ES Modules (files that use import and export), __dirname is not available by default.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all (bonus)
app.get("/blogs", (req, res) => {
  try {
    const files = fs.readdirSync(__dirname);
    const blogTitles = files
      .filter((file) => {
        return (
          file.endsWith(".json") &&
          file !== "package.json" &&
          file !== "package-lock.json"
        );
      })

      .map((file) => ({ title: file.replace(".json", "") }));

    res.status(200).json(blogTitles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while reading blog posts." });
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Blog API is listening at http://localhost:${port}`);
});
