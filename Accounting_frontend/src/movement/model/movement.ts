import { EMPTY_GUID } from 'src/const';
import { MovementType } from './movement-type';

/**
 * Операция
 */
export interface Movement {
  /**
   * Идентификатор
   */
  id: string;

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

export function movementDefault(): Movement {
  return {
    id: EMPTY_GUID,
    date: new Date(),
    sum: 0,
    description: '',
    index: -1
  };
}
