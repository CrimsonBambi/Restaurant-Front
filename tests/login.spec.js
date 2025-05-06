import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:5173/login');
    });

    test('should display login form', async ({ page }) => {

        const heading = await page.locator('h2');
        await expect(heading).toHaveText('Kirjaudu Sisään');


        const emailInput = await page.locator('input[type="email"]');
        await expect(emailInput).toBeVisible();


        const passwordInput = await page.locator('input[type="password"]');
        await expect(passwordInput).toBeVisible();

        const loginButton = await page.locator('button[type="submit"]');
        await expect(loginButton).toBeVisible();
    });

    test('should show error message on failed login', async ({ page }) => {
        await page.fill('input[type="email"]', 'wrong@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');

        await page.click('button[type="submit"]');


        const errorMessage = await page.locator('.error-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Login failed');
    });

    test('should navigate to profile page after successful login', async ({ page }) => {

        await page.fill('input[type="email"]', 'correct@example.com');
        await page.fill('input[type="password"]', 'correctpassword');

        await page.route('http://localhost:5173/login', (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({ token: 'test-token' }),
            })
        );

        
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('/profile');
    });
});
