import { ModelElementBase } from 'src/model/model-element-base';

/**
 * Базовый класс элементов-справочников модели данных
 */
export interface DictionaryElementBase extends ModelElementBase {
  /**
   * Признак удаления
   */
  removed: boolean;

  /**
   * Дата удаления
   */
  removedDate: Date;
}
