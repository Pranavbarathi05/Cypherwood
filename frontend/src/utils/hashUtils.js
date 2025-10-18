// src/utils/hashUtils.js
import SHA256 from "crypto-js/sha256";

/**
 * Hashes the flag using SHA256.
 * @param {string} flag - The plaintext flag.
 * @returns {string} The hashed flag.
 */
export const generateFlagHash = (flag) => {
  // exact input, case-sensitive
  return SHA256(flag).toString();
};

/**
 * Verifies a user-submitted flag against the stored hash.
 * @param {string} enteredFlag - The flag submitted by the user.
 * @param {string} storedHash - The correct hash stored for this challenge.
 * @returns {boolean} True if hashes match exactly.
 */
export const verifyFlagHash = (enteredFlag, storedHash) => {
  if (!enteredFlag || !storedHash) return false;
  const enteredHash = SHA256(enteredFlag).toString();
  return enteredHash === storedHash;
};
