import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlsModule} from "../../controls/controls.module";
import { DepositAccountEditorComponent } from './deposit-account-editor/deposit-account-editor.component';

@NgModule({
  declarations: [
    DepositAccountEditorComponent
  ],
  imports: [CommonModule, ControlsModule]
})
export class DepositAccountModule {}
