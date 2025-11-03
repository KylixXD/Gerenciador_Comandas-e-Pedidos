export function toBrazilianCurrencyFromCents(value: number): string {
  const valueInReais = value / 100;
  return valueInReais.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
