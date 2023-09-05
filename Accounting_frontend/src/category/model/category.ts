import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMPTY_GUID } from "src/const";

// категория
export interface Category {
  id: string;
  name: string;
}

export function categoryDefault(): Category {
  return {
    id: EMPTY_GUID,
    name: ''
  }
}

export function categoryFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required])
  })
}