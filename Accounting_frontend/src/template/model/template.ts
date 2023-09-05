import { Category } from "src/category/model/category";

/**
 * Шаблон
 */
export interface Template
{
  /**
   * Наименование
   */
  name: string;

  /**
   * Идентификатор категории по умолчанию
   */
  defaultCategoryID: string;

  /**
   * Категория по умолчанию для данного шаблона
   * используется для заполнения Operation.Category
   * значение которого может быть изменено пользователем
   */
  defaultCategory: Category;
}