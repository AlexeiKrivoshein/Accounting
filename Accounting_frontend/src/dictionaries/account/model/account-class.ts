export enum AccountClass {
  Card,
  DepositAccount
}

export function depositAccountClassLocal(account: AccountClass): string {
  switch (account) {
    case AccountClass.Card:
      return 'Карта';
    case AccountClass.DepositAccount:
      return 'Депозитный счет';
  }
}
