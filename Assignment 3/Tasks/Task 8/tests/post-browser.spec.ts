import { test, expect } from '@playwright/test';

test.describe('Post Browser E2E Tests', () => {
  // Before every test, navigate to the app and wait for the initial load
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('.post-meta')).toContainText('POST #1');
  });

  //initial load - 1st post
  test('should load the initial post correctly', async ({ page }) => {
    await expect(page.locator('.post-title')).toBeVisible();
    await expect(page.locator('.post-body')).toBeVisible();
    await expect(page.locator('#btn-prev')).toBeDisabled();
    await expect(page.locator('#btn-next')).toBeEnabled();
  });

  //prev, next navigation
  test('navigate to the next and previous posts', async ({ page }) => {
    await page.click('#btn-next');
    await expect(page.locator('.post-meta')).toContainText('POST #2');
    await expect(page.locator('#btn-prev')).toBeEnabled();
    await page.click('#btn-prev');
    await expect(page.locator('.post-meta')).toContainText('POST #1');
    await expect(page.locator('#btn-prev')).toBeDisabled();
  });

  // Positive Case: Comments
  test('load comments when View Comments is clicked', async ({ page }) => {
    await page.click('#btn-comments');
    await expect(page.locator('.comments-section h3')).toHaveText(
      'Recent Comments',
    );
    await expect(page.locator('.comment-card').first()).toBeVisible();
  });

  //Error scenario - fail to fetch a post
  test('display an error message when failing to fetch a post', async ({
    page,
  }) => {
    // Intercept the API call for Post 2 and force it to fail with a 500 status
    await page.route(
      'https://jsonplaceholder.typicode.com/posts/2',
      async (route) => {
        await route.fulfill({ status: 500, body: 'Internal Server Error' });
      },
    );
    await page.click('#btn-next');
    await expect(
      page.locator('text="Failed to load post data."'),
    ).toBeVisible();
  });

  test('handle failures when fetching comments', async ({ page }) => {
    await page.route(
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      async (route) => {
        await route.fulfill({ status: 500, body: 'Internal Server Error' });
      },
    );

    await page.click('#btn-comments');
    await expect(page.locator('.comments-section')).not.toBeVisible();
  });

  //Refresh, loads back the 1st post, discarding existing data
  test('reset to post 1 and clear cache when refresh is clicked', async ({
    page,
  }) => {
    // Navigate to Post 2 first
    await page.click('#btn-next');
    await expect(page.locator('.post-meta')).toContainText('POST #2');

    // Click Refresh
    await page.click('#btn-refresh');

    // Verify it jumps back to Post 1
    await expect(page.locator('.post-meta')).toContainText('POST #1');
  });
});
