export function cpfValidator(cpf: string): boolean {
  if (cpf.length !== 11) {
    return false;
  }

  if (!/^\d+$/.test(cpf)) {
    return false;
  }

  let total = 0;
  for (let i = 0; i < 9; i++) {
    total += parseInt(cpf.charAt(i)) * (10 - i);
  }
  const digit1 = total % 11 < 2 ? 0 : 11 - (total % 11);

  total = 0;
  for (let i = 0; i < 10; i++) {
    total += parseInt(cpf.charAt(i)) * (11 - i);
  }
  const digit2 = total % 11 < 2 ? 0 : 11 - (total % 11);

  if (
    parseInt(cpf.charAt(9)) !== digit1 ||
    parseInt(cpf.charAt(10)) !== digit2
  ) {
    return false;
  }

  return true;
}
