import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUsers } from "../Tasks/task 6.ts";

describe("getUsers()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks(); //cleans the memory after each test run
  });

  it("will fetch real console data and delay the return", async () => {
    const mockConsoleResults = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: { lat: "-37.3159", lng: "81.1496" },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: { lat: "-43.9509", lng: "-34.4618" },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
    ];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockConsoleResults,
    } as Response);
    let isResolved = false;
    let actualData = null;
    const pendingPromises = getUsers(2000).then((data) => {
      isResolved = true;
      actualData = data;
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
    );
    expect(isResolved).toBe(false);
    await vi.advanceTimersByTimeAsync(2000);
    await pendingPromises;
    expect(isResolved).toBe(true);
    expect(actualData).toEqual(mockConsoleResults);
  });
});
