import { Account } from 'src/account/model/account';
import { Movement } from './movement';
import { OperationType } from './operation-type';

/**
 * Корректировка
 */
export interface Correction extends Movement {
  /**
   * Идентификатор счета
   */
  accountID: string;

  /**
   * Счет
   */
  account: Account | null;

  /**
   * Тип операции дебет/кредит
   */
  operationType: OperationType;
}
