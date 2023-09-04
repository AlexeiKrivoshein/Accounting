import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input()
  public text = "";

  @Input()
  public width = "auto";

  @Input()
  public height = "auto";
}
