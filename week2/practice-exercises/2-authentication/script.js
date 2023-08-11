/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
import fetch from "node-fetch";
const credentials = "admin:hvgX8KlVEa";
const base64Credentials = "YWRtaW46aHZnWDhLbFZFYQ==";
const apiUrl = "https://restapiabasicauthe-sandbox.mxapps.io/api/books";

async function printBooks() {
  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Basic ${base64Credentials}` },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

printBooks();
