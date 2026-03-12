/**
 * Creates a delay for the specified number of milliseconds.
 * @param milliseconds specify the time in miliseconds
 */
export function delay(milliseconds: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, milliseconds);
  });
}
