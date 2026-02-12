/**
 * Numeric formatting helpers for frontend and backend.
 * All helpers are defensive and NEVER throw when given null/undefined/NaN.
 */

/**
 * Safely format a value using Number.toFixed.
 *
 * @param value    Any incoming value (number | string | null | undefined)
 * @param digits   Number of fractional digits (default: 2)
 * @param fallback Fallback string to return when value is not a finite number
 */
export function safeToFixed(
  value: unknown,
  digits: number = 2,
  fallback: string = "0.00"
): string {
  if (value === null || value === undefined) return fallback;

  const num =
    typeof value === "string"
      ? Number(value)
      : typeof value === "number"
      ? value
      : Number(value as any);

  return Number.isFinite(num) ? num.toFixed(digits) : fallback;
}

