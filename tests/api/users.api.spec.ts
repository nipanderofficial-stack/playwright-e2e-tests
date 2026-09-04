import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe("REST API Demo", () => {
  const baseURL = "https://reqres.in/api";

  test("Should get list of users", async ({ request }) => {
    //Make a GET call
    await log("info", `Making a GET call using ${baseURL}`);
    const res = await request.get(`${baseURL}/users?page=2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    //Assert the API response
    expect(res.status()).toBe(200);
    await log("info", `GET call is successfull with ${res.status()}`);

    //Get the list of users
    const usersData = await res.json();
    log("info", `List of users: ${JSON.stringify(usersData)}`);
  });
});
