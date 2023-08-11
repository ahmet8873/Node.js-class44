/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

import fetch from "node-fetch";

async function makeReservation() {
  try {
    const apiUrl =
      "https://reservation100-sandbox.mxapps.io/rest-doc/api/reservations";
    const headers = {
      "Content-Type": "application/json",
    };

    const requestBody = {
      name: "ahmet",
      numberOfPeople: 2,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
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

makeReservation();
