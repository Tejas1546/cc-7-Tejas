import { test, expect } from '@playwright/test';

test.describe('Drum Kit Player E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('initial state', async ({ page }) => {
    await expect(page.locator('#playback-zone')).toHaveClass(/disabled-zone/);
    await expect(page.locator('#record-zone')).not.toHaveClass(/disabled-zone/);
  });

  test('trigger audio', async ({ page }) => {
    const audioEl = page.locator('audio[data-key="KeyA"]');
    await expect(audioEl).toHaveJSProperty('paused', true);
    await page.keyboard.press('a');
    await expect(audioEl).toHaveJSProperty('paused', false);
  });
  test('recording and playback', async ({ page }) => {
    const recordBtn = page.locator('#record-btn');
    const playBtn = page.locator('#play-btn');
    const recordZone = page.locator('#record-zone');
    const playbackZone = page.locator('#playback-zone');
    const progressBar = page.locator('#progress-bar');
    await page.keyboard.press('r');
    await expect(recordBtn).toHaveClass(/recording-active/);
    await expect(playbackZone).toHaveClass(/disabled-zone/);

    await page.keyboard.press('a');
    await page.waitForTimeout(200); // Wait 200ms
    await page.keyboard.press('s');
    await page.waitForTimeout(200);

    await page.keyboard.press('r');
    await expect(recordBtn).not.toHaveClass(/recording-active/);

    await expect(playbackZone).not.toHaveClass(/disabled-zone/);

    await page.keyboard.press('Space');
    await expect(playBtn).toHaveClass(/playback-active/);
    await expect(recordZone).toHaveClass(/disabled-zone/);

    await expect(progressBar).not.toHaveAttribute('style', 'width: 0%;');

    await page.waitForTimeout(1000);

    await expect(playBtn).not.toHaveClass(/playback-active/);
    await expect(recordZone).not.toHaveClass(/disabled-zone/);
    await expect(progressBar).toHaveAttribute('style', 'width: 0%;', {
      timeout: 2000,
    });
  });

  test('pause recording', async ({ page }) => {
    const recordBtn = page.locator('#record-btn');
    const pauseRecBtn = page.locator('#pause-record-btn');

    await page.keyboard.press('r');
    await expect(recordBtn).toHaveClass(/recording-active/);
    await page.keyboard.press('e');
    await expect(recordBtn).not.toHaveClass(/recording-active/);
    await expect(pauseRecBtn).toHaveClass(/recording-active/);

    await page.keyboard.press('e');
    await expect(pauseRecBtn).not.toHaveClass(/recording-active/);
    await expect(recordBtn).toHaveClass(/recording-active/);
  });
});
