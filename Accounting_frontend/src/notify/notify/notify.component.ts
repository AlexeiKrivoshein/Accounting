import { Component, Inject, Input } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { Notify } from "../model/notify";
import { NotifyType } from "../model/notify-type";

@Component({
  selector: 'app-notify-component',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent {
  public message: string = '';

  public type: NotifyType = 'inform';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notify){
    this.message = data.message;
    this.type = data.type;
  }
}