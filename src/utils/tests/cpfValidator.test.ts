import { it, describe, expect } from "@jest/globals";
import { cpfValidator } from "src/utils/cpfValidator.util";

describe("#CPF Valitador Suite", () => {
  it("Should return false if cpf is invalid", () => {
    const invalidCpf = ["88811133398", "1234", "iAmNotACpf", "728.099.580-99"];
    expect(cpfValidator(invalidCpf[0])).toBe(false);
    expect(cpfValidator(invalidCpf[1])).toBe(false);
    expect(cpfValidator(invalidCpf[2])).toBe(false);
    expect(cpfValidator(invalidCpf[3])).toBe(false);
  });

  it("Should return false if cpf contains non-digits'", () => {
    const invalidCpf = ["728.099.580-25", "72809958025"];
    expect(cpfValidator(invalidCpf[0])).toBe(false);
    expect(cpfValidator(invalidCpf[1])).toBe(true);
  });

  it("Should return false if cpf length is different from 11", () => {
    const invalidCpf = ["728099580251"];
    expect(cpfValidator(invalidCpf[0])).toBe(false);
  });
});
