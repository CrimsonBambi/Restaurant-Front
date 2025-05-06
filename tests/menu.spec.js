
import { test, expect } from '@playwright/test';

test.describe('MenuPage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/menu');
    });


    test('should display menu items', async ({ page }) => {
        const menuHeading = await page.locator('h2#menu-heading');
        await expect(menuHeading).toBeVisible();


        const menuItems = await page.locator('.menu-item-container');
        await expect(menuItems).toHaveCount(3);
    });


    test('should open menu modal when clicking on a menu item', async ({ page }) => {
        const firstMenuItem = page.locator('.menu-item-container').first();
        await firstMenuItem.click();

        const modal = page.locator('.modal');
        await expect(modal).toBeVisible();
    });


    test('should highlight the menu of the day', async ({ page }) => {
        const highlightedMenu = await page.locator('.menu-item-container.highlighted');
        await expect(highlightedMenu).toBeVisible();
    });
});
