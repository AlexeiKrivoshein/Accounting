import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/category/model/category";
import { EMPTY_GUID } from "src/const";

/**
 * Шаблон
 */
export interface Template
{
  /**
   * Идентификатор
   */
  id: string;

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
  defaultCategory: Category | null;
}

export function templateDefault(): Template {
  return {
    id: EMPTY_GUID,
    name: '',
    defaultCategoryID: '',
    defaultCategory: null
  }
}

export function templateFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    defaultCategoryID: new FormControl<string>(EMPTY_GUID),
    defaultCategory: new FormControl<Category | null>(null, [Validators.required])
  })
}