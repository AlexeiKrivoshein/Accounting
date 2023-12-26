import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { MIN_DATE } from 'src/const/min-date';
import { DictionaryElementBase } from 'src/dictionaries/model/dictionary-element-base';

/**
 * Категория
 */
export interface Category extends DictionaryElementBase {
  /**
   * Наименование
   */
  name: string;
}

export function categoryDefault(): Category {
  return {
    id: EMPTY_GUID,
    name: '',
    removed: false,
    removedDate: MIN_DATE,
  };
}

export function categoryFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    removed: new FormControl<boolean>(false),
    removedDate: new FormControl<Date>(MIN_DATE),
  });
}
