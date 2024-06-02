export function uuidValidator(uuidString: string): boolean {
  const uuid4Pattern: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid4Pattern.test(uuidString);
}
