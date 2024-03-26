import { ModelElementBase } from 'src/model/model-element-base';

/**
 * Базовый класс элементов-справочников модели данных
 */
export class DictionaryElementBase extends ModelElementBase {
  /**
   * Признак удаления
   */
  public removed: boolean = false;

  /**
   * Дата удаления
   */
  public removedDate: Date = new Date();
}
