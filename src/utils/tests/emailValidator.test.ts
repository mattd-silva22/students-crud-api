import { it, describe, expect } from "@jest/globals";

import { emailValidator } from "src/utils/emailValidator.util";

describe("#Email Validator Suite", () => {
  it("Should return false if email is invalid", () => {
    const invalidEmails = [
      "email@domain",
      "email@domain.",
      "myemail.com.br",
      "myvalid@email.com",
    ];
    expect(emailValidator(invalidEmails[0])).toBe(false);
    expect(emailValidator(invalidEmails[1])).toBe(false);
    expect(emailValidator(invalidEmails[2])).toBe(false);
  });

  it("Should return false if email contains spaces", () => {
    const invalidEmails = ["my email@.com"];
    expect(emailValidator(invalidEmails[0])).toBe(false);
  });

  it("Should return true if email is valid", () => {
    const validEmails = ["myvalidmail@mail.com"];
    expect(emailValidator(validEmails[0])).toBe(true);
  });
});
