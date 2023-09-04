import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input()
  public title: string = '';

  @Input()
  public body: TemplateRef<any> | null = null;

  @Input()
  public buttons: TemplateRef<any> | null = null;

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();
}
