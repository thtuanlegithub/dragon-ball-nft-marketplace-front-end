export function formatBalance(balance: string): string {
  const numberBalance = Number(balance);
  return numberBalance.toFixed(3);
}
