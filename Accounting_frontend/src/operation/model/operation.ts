import { EMPTY_GUID } from 'src/const';
import { ModelElementBase } from 'src/model/model-element-base';
import { OperationClass } from './operation-class';

/**
 * Операция
 */
export class Operation extends ModelElementBase {
  /**
   * Дата
   */
  public date: Date = new Date();

  /**
   * Сумма
   */
  public sum: number = 0;

  /**
   * Описание
   */
  public description: string = '';

  /**
   * Порядковый номер операции в разрезе дня
   */
  public index: number = 0;

  /**
   * Класс/тип операции, заполняется при получении на фронте
   */
  public operationClass: OperationClass = OperationClass.ContractorOperation;
}

export function operationDefault(): Operation {
  return {
    id: EMPTY_GUID,
    date: new Date(),
    sum: 0,
    description: '',
    index: -1,
    operationClass: OperationClass.ContractorOperation,
  };
}
