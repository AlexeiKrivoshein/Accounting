import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMPTY_GUID } from "src/const";

export interface Account {
  id: string;
  name: string;
}

export function accountDefault(): Account {
  return {
    id: EMPTY_GUID,
    name: ''
  }
}

export function accountFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required])
  })
}