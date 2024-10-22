function hideAddress(address) {
  if (!address) return;
  const first4Digits = address.slice(0, 4);
  const last4Digits = address.slice(-4);
  return first4Digits + " .. " + last4Digits;
}

export { hideAddress };
