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

test("photography and audience pages work without horizontal overflow", async ({ page }) => {
  for (const route of ["/", "/idee", "/fuer-schulen", "/fuer-unternehmen", "/kontakt"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    const photo = page.locator("figure img").first();
    await photo.scrollIntoViewIfNeeded();
    await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByText("Bildplatzhalter", { exact: false })).toHaveCount(0);
  }
  await page.goto("/");
  await page.getByRole("link", { name: "Als Unternehmen teilnehmen", exact: true }).click();
  await expect(page.getByRole("radio", { name: "Unternehmen", exact: true })).toBeChecked();
});
