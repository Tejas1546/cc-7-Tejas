/**
 * Creates a delay for the specified number of milliseconds.
 * @param milliseconds specify the time in miliseconds
 */
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
