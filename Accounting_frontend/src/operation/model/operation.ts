import { EMPTY_GUID } from 'src/const';
import { ModelElementBase } from 'src/model/model-element-base';

/**
 * Операция
 */
export interface Operation extends ModelElementBase {
  /**
   * Дата
   */
  date: Date;

  /**
   * Сумма
   */
  sum: number;

  /**
   * Описание
   */
  description: string;

  /**
   * Порядковый номер операции в разрезе дня
   */
  index: number;
}

export function operationDefault(): Operation {
  return {
    id: EMPTY_GUID,
    date: new Date(),
    sum: 0,
    description: '',
    index: -1
  };
}
