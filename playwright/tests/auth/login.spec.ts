import { test } from "@fixtures/base.fixture";

test.describe("Login Page — saucedemo.com", () => {
  test.beforeEach(async ({ login }) => {
    await login.navigate();
  });

  // ── Positive Scenarios ────────────────────────────────────────────────────

  test(
    "[REQ-LOGIN-001] valid credentials redirect to inventory page",
    { tag: ["@smoke", "@P0", "@REQ-LOGIN-001"] },
    async ({ login }) => {
      await login.login(
        process.env.SAUCE_STANDARD_USER!,
        process.env.SAUCE_PASSWORD!,
      );
      await login.assertOnInventoryPage();
    },
  );

  // ── Negative Scenarios ────────────────────────────────────────────────────

  test(
    "[REQ-LOGIN-002] invalid username shows authentication error",
    { tag: ["@regression", "@P1", "@REQ-LOGIN-002"] },
    async ({ login }) => {
      await login.login("invalid_user_xyz", process.env.SAUCE_PASSWORD!);
      await login.assertErrorVisible(
        "Username and password do not match any user in this service",
      );
      await login.assertRemainsOnLoginPage();
    },
  );

  test(
    "[REQ-LOGIN-003] invalid password shows authentication error",
    { tag: ["@regression", "@P1", "@REQ-LOGIN-003"] },
    async ({ login }) => {
      await login.login(
        process.env.SAUCE_STANDARD_USER!,
        "wrong_password_xyz",
      );
      await login.assertErrorVisible(
        "Username and password do not match any user in this service",
      );
      await login.assertRemainsOnLoginPage();
    },
  );

  test(
    "[REQ-LOGIN-004] empty credentials show required-field validation error",
    { tag: ["@regression", "@P1", "@REQ-LOGIN-004"] },
    async ({ login }) => {
      await login.submit();
      await login.assertErrorVisible("Username is required");
      await login.assertRemainsOnLoginPage();
    },
  );

  test(
    "[REQ-LOGIN-005] locked-out user sees account-locked error",
    { tag: ["@regression", "@P1", "@REQ-LOGIN-005"] },
    async ({ login }) => {
      await login.login(
        process.env.SAUCE_LOCKED_USER!,
        process.env.SAUCE_PASSWORD!,
      );
      await login.assertErrorVisible(
        "Sorry, this user has been locked out",
      );
      await login.assertRemainsOnLoginPage();
    },
  );
});
