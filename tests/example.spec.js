import { test, expect } from "@playwright/test";

test("Add Food Item Test", async ({ page }) => {
  // Open application
  await page.goto("http://localhost:5174/");

  // Open login page
  await page.getByRole("button", { name: "Login" }).click();

  // Login
  await page.getByRole("textbox", { name: "Email" }).fill("tester3@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("12345678");

  await page.getByRole("checkbox", { name: "Remember Me" }).check();

  await page.getByRole("button", { name: "Login" }).click();

  // Wait until dashboard loads
  await expect(page.getByRole("button", { name: "Dashboard" })).toBeVisible();

  // Open Food Inventory
  await page.getByRole("button", { name: "Food Inventory" }).click();

  // Add new item
  await page.getByRole("button", { name: "Add Food Items" }).click();

  await page.getByRole("textbox", { name: "Apple" }).fill("Carrot");

  await page.locator('select[name="category"]').selectOption("Vegetable");

  await page.getByPlaceholder("2").fill("3");

  await page.locator('input[name="expiryDate"]').fill("2026-07-17");

  await page.locator('select[name="storage"]').selectOption("Pantry");

  await page
    .getByRole("textbox", { name: "https://example.com/food-" })
    .fill(
      "https://tse2.mm.bing.net/th/id/OIP.nMuNZG9gi4O5GMfNSeSB2QHaE7?r=0&pid=Api&h=220&P=0",
    );

  await page.getByRole("button", { name: "Save Item" }).click();

  // Logout
  await page.getByRole("button", { name: "Log out" }).click();

  // Verify Login button is visible again
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
