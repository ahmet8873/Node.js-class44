import express from "express";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      throw new Error("City name is missing");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.cod === "404") {
      res.json({ weatherText: "City is not found!" });
    } else {
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherText = `Temperature in ${cityName}: ${temperature}°K`;
      res.json({ weatherText });
    }
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

export default app;
