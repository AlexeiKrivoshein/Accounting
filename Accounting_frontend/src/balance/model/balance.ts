import { Account } from "src/account/model/account";

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
  account: Account | null;
}
