import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { delay } from "../Tasks/task 5";

describe("delay()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve exactly after the specified time", async () => {
    let isResolved = false;
    const pendingDelay = delay(1000).then(() => {
      isResolved = true;
    });

    expect(isResolved).toBe(false);
    await vi.advanceTimersByTimeAsync(500);
    expect(isResolved).toBe(false);
    await vi.advanceTimersByTimeAsync(500);
    await pendingDelay;
    expect(isResolved).toBe(true);
  });
});
