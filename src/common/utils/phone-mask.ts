/**
 * Formats user input into Ukrainian phone mask: +38 (0XX) XXX-XX-XX
 */
export const formatUaPhoneNumber = (value: string): string => {
  if (!value) return "";

  // Extract digits only
  let digits = value.replace(/\D/g, "");

  // If user begins typing with 0 (e.g. 068...), prepend 38
  if (digits.startsWith("0")) {
    digits = "38" + digits;
  } else if (digits.startsWith("80")) {
    digits = "3" + digits;
  } else if (!digits.startsWith("38") && digits.length > 0) {
    digits = "380" + digits;
  }

  // Limit to max 12 digits (380XXXXXXXXX)
  digits = digits.slice(0, 12);

  // Format progressively
  let formatted = "+38";

  if (digits.length > 2) {
    formatted += " (" + digits.slice(2, 5);
  }
  if (digits.length >= 5) {
    formatted += ") " + digits.slice(5, 8);
  }
  if (digits.length >= 8) {
    formatted += "-" + digits.slice(8, 10);
  }
  if (digits.length >= 10) {
    formatted += "-" + digits.slice(10, 12);
  }

  return formatted;
};

/**
 * Validates if the phone number is a complete Ukrainian number (12 digits starting with 380)
 */
export const isCompleteUaPhoneNumber = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  // Must be 12 digits and start with 380 (e.g. 380681689911)
  return digits.length === 12 && digits.startsWith("380");
};
