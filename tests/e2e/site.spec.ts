import { expect, test } from "@playwright/test";

test("core navigation and role paths are available", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Unternehmen kommen in die Schule." })).toBeVisible();
  await page.getByRole("link", { name: "Als Schule anfragen" }).first().click();
  await expect(page).toHaveURL(/\/kontakt\?rolle=schule/);
  await expect(page.getByRole("radio", { name: "Schule" })).toBeChecked();
});

test("consent banner has equal action targets", async ({ page }) => {
  await page.goto("/idee");
  const banner = page.getByRole("region", { name: "Datenschutzeinstellungen" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Ablehnen" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Zustimmen" })).toBeVisible();
});
