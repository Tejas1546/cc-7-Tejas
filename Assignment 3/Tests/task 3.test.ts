import { describe, it, expect } from "vitest";
import path from "path";
import { getFileType, getContents, getSize } from "../Tasks/task 3";

describe("File system utilities", () => {
  const filePath = path.resolve(__dirname, "../Assignment 1/Stack.ts");
  const dirPath = path.resolve(__dirname, "../Assignment 1");

  it("should detect Stack.ts as a file", async () => {
    const type = await getFileType(filePath);
    expect(type).toBe("FILE");
  });

  it("should detect Assignment 1 as a directory", async () => {
    const type = await getFileType(dirPath);
    expect(type).toBe("DIRECTORY");
  });

  it("should return file path when getContents is called on a file", async () => {
    const contents = await getContents(filePath);
    expect(contents).toBe(filePath);
  });

  it("should return contents of Assignment 1 directory", async () => {
    const contents = await getContents(dirPath);

    expect(Array.isArray(contents)).toBe(true);
    expect(contents).toContain("Stack.ts");
  });

  it("should return correct size of Stack.ts", async () => {
    const size = await getSize(filePath);
    expect(size).toBe(582);
  });
});
