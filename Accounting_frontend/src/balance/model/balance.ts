import { AccountBase } from "src/dictionaries/account/model/account-base";

/**
 * Баланс счета на конец дня
 */
export interface Balance {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Дата операции
   */
  date: Date;

  /**
   * Сумма
   */
  sum: number;

  /**
   * Идентификатор счета
   */
  accountID: string;

  /**
   * Счет кредит
   */
  account: AccountBase | null;
}
