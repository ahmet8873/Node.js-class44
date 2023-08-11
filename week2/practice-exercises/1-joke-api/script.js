/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */

import fetch from "node-fetch";

async function printChuckNorrisJoke() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.value) {
      console.log("full data: ", data);
      console.log("joke: ", data.value);
    } else {
      console.log("Failed to fetch Chuck Norris joke.");
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

printChuckNorrisJoke();
