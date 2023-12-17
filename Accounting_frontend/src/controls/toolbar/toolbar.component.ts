import { Component, Input } from '@angular/core';
import { ToolbarButtonConfig } from './model/toolbar-button-config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input()
  public buttons: ToolbarButtonConfig[] = [];

  public enabled(button: ToolbarButtonConfig): boolean {
    if (button?.enabled) {
      return button.enabled();
    } else {
      return true;
    }
  }
}
