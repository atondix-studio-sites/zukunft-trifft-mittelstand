import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Keep reviews isolated: no analytics or test leads leave the browser.
  await page.route("https://studio.atondix.de/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
});

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
  for (const route of ["/", "/idee", "/fuer-schulen", "/fuer-unternehmen", "/kontakt", "/impressum", "/datenschutz"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    const photo = page.locator("figure img").first();
    if (await photo.count()) {
      await photo.scrollIntoViewIfNeeded();
      await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), route).toBe(true);
    await expect(page.getByText("Bildplatzhalter", { exact: false })).toHaveCount(0);
  }
  await page.goto("/");
  await page.getByRole("link", { name: "Als Unternehmen teilnehmen", exact: true }).click();
  await expect(page.getByRole("radio", { name: "Unternehmen", exact: true })).toBeChecked();
});

test("navigation, menu keyboard dismissal, FAQs and consent settings work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ablehnen", exact: true }).click();
  const menu = page.getByRole("button", { name: "Menü öffnen" });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(page.getByRole("navigation", { name: "Hauptnavigation" })).toBeVisible();
    await page.getByRole("button", { name: "Menü schließen" }).press("Escape");
    await expect(menu).toBeFocused();
    await expect(page.getByRole("navigation", { name: "Hauptnavigation" })).toBeHidden();
    await menu.click();
  }
  await page.getByRole("navigation").getByRole("link", { name: "Für Schulen", exact: true }).click();
  await expect(page).toHaveURL(/\/fuer-schulen$/);
  const faq = page.getByRole("button", { name: "Wie lange dauern die Gespräche?" });
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Cookie-Einstellungen" }).scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Cookie-Einstellungen" }).click();
  await page.getByRole("button", { name: "Zustimmen", exact: true }).click();
  await expect(page.getByRole("region", { name: "Datenschutzeinstellungen" })).toBeHidden();
  await page.reload();
  await expect(page.getByRole("region", { name: "Datenschutzeinstellungen" })).toBeHidden();
});

test("lead intake survives client navigation, rejects invalid data and retries failures", async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route("https://studio.atondix.de/api/collect/forms", async (route) => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ status: submissions.length === 1 ? 503 : 200, contentType: "application/json", body: "{}" });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Ablehnen", exact: true }).click();
  await page.getByRole("link", { name: "Als Unternehmen teilnehmen", exact: true }).click();
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  expect(submissions).toHaveLength(0);
  await page.getByRole("textbox", { name: "Name *", exact: true }).fill("Integration Test");
  await page.getByRole("textbox", { name: "E-Mail *", exact: true }).fill("test@example.invalid");
  await page.getByRole("textbox", { name: "Organisation", exact: true }).fill("Testbetrieb");
  await page.getByRole("textbox", { name: "Ihre Nachricht *", exact: true }).fill("Automatisierter lokaler Test.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(page.getByText("Der Versand konnte nicht bestätigt werden.", { exact: false })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Name *", exact: true })).toHaveValue("Integration Test");
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(page.getByText("Vielen Dank. Ihre Nachricht ist angekommen.", { exact: false })).toBeVisible();
  expect(submissions).toHaveLength(2);
  expect(submissions[1]).toMatchObject({ siteToken: "test-only-not-a-real-token", consent: "denied", path: "/kontakt", honeypot: "", fields: { role: "unternehmen", name: "Integration Test", organization: "Testbetrieb", privacy: "yes" } });
  await expect(page.getByRole("textbox", { name: "Name *", exact: true })).toHaveValue("");
  await expect(page.getByRole("radio", { name: "Unternehmen", exact: true })).toBeChecked();
});
