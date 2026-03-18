import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:5173';

test.describe('Drum Kit App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test.describe('Core Audio Engine', () => {
    test('should animate a drum key when keyboard is pressed', async ({
      page,
    }) => {
      const keyA = page.locator('.key[data-key="KeyA"]');
      await page.keyboard.press('a');
      await expect(keyA).toHaveClass(/playing/);
    });

    test('should animate a drum key when clicked with the mouse', async ({
      page,
    }) => {
      const keyS = page.locator('.key[data-key="KeyS"]');
      await keyS.click();
      await expect(keyS).toHaveClass(/playing/);
    });
  });

  test.describe('Recording System', () => {
    test('should record sequence and verify the zero-delay feature', async ({
      page,
    }) => {
      const recordBtn = page.locator('#record-btn');

      // 1. Arm the recording
      await page.keyboard.press('r');
      await expect(recordBtn).toHaveClass(/recording-active/);

      // 2. Play a beat (No arbitrary wait timeouts needed!)
      await page.keyboard.press('a');
      await page.keyboard.press('s');
      await page.keyboard.press('d');

      // 3. Stop Recording
      await page.keyboard.press('r');

      // 4. Validate localStorage
      const savedRecord = await page.evaluate(() =>
        localStorage.getItem('drumRecord'),
      );
      expect(savedRecord).toBeTruthy();

      const parsedRecord = JSON.parse(savedRecord!);

      // Assert it caught all 3 notes
      expect(parsedRecord.length).toBe(3);

      // The first note should be exactly 0 (or within 5ms due to execution speed)
      expect(parsedRecord[0].time).toBeLessThan(5);

      // Assert the sequence progressed forward in time
      expect(parsedRecord[1].time).toBeGreaterThanOrEqual(parsedRecord[0].time);
    });
  });

  test.describe('Playback System', () => {
    test('should play back a recorded sequence and automatically stop', async ({
      page,
    }) => {
      // 1. Inject a fake recording (Note A at 0ms, Note S at 100ms)
      await page.evaluate(() => {
        localStorage.setItem(
          'drumRecord',
          JSON.stringify([
            { code: 'KeyA', time: 0 },
            { code: 'KeyS', time: 100 },
          ]),
        );
      });
      await page.reload();

      const playBtn = page.locator('#play-btn');
      const keyA = page.locator('.key[data-key="KeyA"]');
      const keyS = page.locator('.key[data-key="KeyS"]');

      // 2. Start Playback
      await page.keyboard.press('Space');
      await expect(playBtn).toHaveClass(/playback-active/);

      // 3. Verify notes light up
      await expect(keyA).toHaveClass(/playing/);
      await expect(keyS).toHaveClass(/playing/);

      // 4. Verify playback automatically turns off after the sequence ends
      await expect(playBtn).not.toHaveClass(/playback-active/, {
        timeout: 1000,
      });
    });
  });
});
