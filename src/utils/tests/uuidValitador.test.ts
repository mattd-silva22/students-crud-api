import { it, describe, expect } from "@jest/globals";
import { uuidValidator } from "../uuidValidator.utils";

describe("#UUID Valitador Suite", () => {
  it("Should return false if uuid is invalid", () => {
    const invalidUuid = [
      "53916e2e-b93b-4a20-bf58-7a2efb2867b22",
      "53916e2esb93b-4a20-bf58-7a2efb2867b22",
      "iAmNotAUuid",
      "53916e2eb93b4a20bf587a2efb2867b22ddxd",
    ];
    expect(uuidValidator(invalidUuid[0])).toBe(false);
    expect(uuidValidator(invalidUuid[1])).toBe(false);
    expect(uuidValidator(invalidUuid[2])).toBe(false);
    expect(uuidValidator(invalidUuid[3])).toBe(false);
  });

  it("Should return true if uuid is valid", () => {
    const validUuid = ["53916e2e-b93b-4a20-bf58-7a2efb2867b2"];
    expect(uuidValidator(validUuid[0])).toBe(true);
  });
});
