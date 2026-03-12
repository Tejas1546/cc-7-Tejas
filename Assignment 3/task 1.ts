import { stat, readdir } from "fs";
import pathMod from "path";

/**
 * the getFileType() is a simple function that returns the path type like "FILE" | "DIRECTORY" | "OTHER". This uses promise based callback system using fs.stat based wrapper wrapping is manually
 * @param path takes in the absolute path of a file or a folder
 * @returns the path is a File or a folder
 */
function getFileType(path: string): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        return reject(new Error("file system error"));
      }
      if (stats.isFile()) return resolve("FILE");
      if (stats.isDirectory()) return resolve("DIRECTORY");

      return resolve("OTHER");
    });
  });
}

/**
 * the getContens() returns the folder contents or the path of the file. this function also uses the promise based callback system that uses fs.stat for wrapping the function
 * @param path takes in the absolute path of a file or a folder
 * @returns if the path is a file then it returns the path, if it is directory it acts like the 'ls' command used in linux systems
 */
function getContents(path: string): Promise<string | string[]> {
  return getFileType(path)
    .then((type) => {
      if (type === "FILE") return path;
      if (type === "DIRECTORY") {
        return new Promise<string | string[]>((resolve, reject) => {
          readdir(path, (err, files) => {
            if (err) return reject(new Error("file system error"));
            resolve(files);
          });
        });
      }
      return path;
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * the getSize() returns the size of the file or the folder of the given path in bytes.this function also uses the promise based callback system that uses fs.stat for wrapping the function
 * @param path takes in the absolute path of a file or a folder
 * @returns returns the size of the file or the folder of the given path in bytes
 */
function getSize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        return reject(new Error("file system error"));
      }

      if (stats.isFile()) {
        return resolve(stats.size);
      }

      if (stats.isDirectory()) {
        readdir(path, (err, files) => {
          if (err) return reject(new Error("file system error"));

          function processNextFile(
            index: number,
            accumulatedSize: number,
          ): void {
            if (index >= files.length) {
              return resolve(accumulatedSize);
            }

            const fullPath = pathMod.join(path, files[index]);

            getSize(fullPath)
              .then((size) => {
                processNextFile(index + 1, accumulatedSize + size);
              })
              .catch(() => {
                reject(new Error("file system error"));
              });
          }

          processNextFile(0, 0);
        });
      } else {
        resolve(0);
      }
    });
  });
}

//console based testing
const tpath =
  "/mnt/c/Users/Tejas/Desktop/internship/task/cc-7-Tejas/Assignment 3/task 1.ts";
getFileType(tpath)
  .then((type) => {
    console.log("Type:", type);
    return getContents(tpath);
  })
  .then((contents) => {
    console.log(contents);
    return getSize(tpath);
  })
  .then((size) => {
    console.log("Total Size: ", size);
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
