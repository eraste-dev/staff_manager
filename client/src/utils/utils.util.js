/**
 * Checks if a given date is expired by comparing it to the current date.
 *
 * @param {string|number|Date} date - The date to check for expiration.
 * @return {boolean} Returns true if the date is in the past, false otherwise.
 */
export const isExpired = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};
