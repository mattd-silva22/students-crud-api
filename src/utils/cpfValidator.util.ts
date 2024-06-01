export function cpfValidator(cpf: string) {
  const cpfNumbers = cpf.replace(/\D/g, "");
  if (cpfNumbers.length !== 11) {
    return false;
  }
  const cpfArray = Array.from(cpfNumbers).map((digit) => parseInt(digit));
  let sum = 0;
  let factor = 10;
  for (let i = 0; i < 9; i++) {
    sum += cpfArray[i] * factor;
    factor -= 1;
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  if (remainder !== cpfArray[9]) {
    return false;
  }
  sum = 0;
  factor = 11;
  for (let i = 0; i < 10; i++) {
    sum += cpfArray[i] * factor;
    factor -= 1;
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  if (remainder !== cpfArray[10]) {
    return false;
  }
  return true;
}
