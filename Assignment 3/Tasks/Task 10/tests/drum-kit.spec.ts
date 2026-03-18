import { test, expect } from '@playwright/test';
const APP_URL = 'http://localhost:5173';

test.describe('Drum Kit App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before every single test
    await page.goto(APP_URL);
  });

  test('should animate a drum key when pressed', async ({ page }) => {
    const keyA = page.locator('.key[data-key="KeyA"]');

    // Simulate pressing the 'a' key on the keyboard
    await page.keyboard.press('a');

    // Verify the 'playing' class was immediately added
    await expect(keyA).toHaveClass(/playing/);
  });

  test('should record a sequence and save it to localStorage', async ({
    page,
  }) => {
    const recordBtn = page.locator('#record-btn');

    // 1. Start Recording
    await page.keyboard.press('r');
    await expect(recordBtn).toHaveClass(/recording-active/);

    // 2. Play a quick beat with delays
    await page.keyboard.press('a');
    await page.waitForTimeout(200);
    await page.keyboard.press('s');

    // 3. Stop Recording
    await page.keyboard.press('r');
    await expect(recordBtn).not.toHaveClass(/recording-active/);

    // 4. Validate localStorage
    const savedRecord = await page.evaluate(() =>
      localStorage.getItem('drumRecord'),
    );

    // Check that it actually saved something
    expect(savedRecord).toBeTruthy();

    // Parse it and check the contents
    const parsedRecord = JSON.parse(savedRecord!);
    expect(parsedRecord.length).toBe(2);
    expect(parsedRecord[0].code).toBe('KeyA');
    expect(parsedRecord[1].code).toBe('KeyS');
  });

  test('should clear the recording when Backspace is pressed', async ({
    page,
  }) => {
    // 1. First, artificially inject a fake recording into localStorage
    await page.evaluate(() => {
      localStorage.setItem(
        'drumRecord',
        JSON.stringify([{ code: 'KeyA', time: 100 }]),
      );
    });

    const clearBtn = page.locator('#clear-btn');

    // 2. Press Backspace
    await page.keyboard.press('Backspace');

    // 3. Verify it triggered the visual animation
    await expect(clearBtn).toHaveClass(/playing/);

    // 4. Verify localStorage is completely wiped
    const wipedRecord = await page.evaluate(() =>
      localStorage.getItem('drumRecord'),
    );
    expect(wipedRecord).toBeNull();
  });

  test('should play back a recorded sequence', async ({ page }) => {
    // 1. Inject a fake recording
    await page.evaluate(() => {
      localStorage.setItem(
        'drumRecord',
        JSON.stringify([{ code: 'KeyA', time: 100 }]),
      );
    });

    // 2. We need to reload the page so your app parses the injected localStorage
    await page.reload();

    const playBtn = page.locator('#play-btn');
    const keyA = page.locator('.key[data-key="KeyA"]');

    // 3. Start Playback
    await page.keyboard.press('Space');
    await expect(playBtn).toHaveClass(/playback-active/);

    // 4. Verify that KeyA lights up automatically after ~100ms
    // We use a slight timeout in the expect block to account for the async timer
    await expect(keyA).toHaveClass(/playing/, { timeout: 500 });
  });
});
