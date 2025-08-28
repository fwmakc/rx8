import { wait } from './wait.helper';

/**
 * Executes a given asynchronous callback function in a loop until callback returns false.
 * loop can include an optional pause between iterations.
 *
 * @param {function} callback - An asynchronous function that returns a boolean value.
 *                              Loop will continue executing as long as this function returns true.
 * @param {number} [milliseconds=0] - Amount of time to wait between each iteration of loop in milliseconds.
 *                                      If set to 0, no delay will be applied.
 * @returns {Promise<void>} A promise that resolves when loop is exited.
 */
export async function loop(
  callback: () => Promise<boolean> | boolean,
  milliseconds = 0,
): Promise<void> {
  let infinite = true;
  // eslint-disable-next-line no-constant-condition
  while (infinite) {
    infinite = await callback();
    if (infinite && milliseconds) {
      await wait(milliseconds);
    }
  }
}
