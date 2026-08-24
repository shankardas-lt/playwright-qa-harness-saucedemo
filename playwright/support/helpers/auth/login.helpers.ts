import { Page, expect } from "@playwright/test";
import { LOGIN_UI } from "@configs/ui/auth/login.ui";
import { ROUTES } from "@configs/app/routes";

export class LoginHelpers {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto(ROUTES.LOGIN, { waitUntil: "domcontentloaded" });
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.getByTestId(LOGIN_UI.USERNAME_INPUT).fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.getByTestId(LOGIN_UI.PASSWORD_INPUT).fill(password);
  }

  async submit(): Promise<void> {
    await this.page.getByTestId(LOGIN_UI.LOGIN_BUTTON).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async assertOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.INVENTORY.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  async assertErrorVisible(expectedText: string): Promise<void> {
    const error = this.page.getByTestId(LOGIN_UI.ERROR_MESSAGE);
    await expect(error).toBeVisible();
    await expect(error).toContainText(expectedText);
  }

  async assertRemainsOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.LOGIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    await expect(this.page.getByTestId(LOGIN_UI.LOGIN_BUTTON)).toBeVisible();
  }
}
