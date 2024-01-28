import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { EMPTY_GUID } from 'src/const';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss'],
})
export class ListComponent {
  private _clickCount = 0;

  public EMPTY_GUID = EMPTY_GUID;

  private _items: any[] = [];

  @Input()
  public set items(value: any[] | null) {
    this._items = value ?? [];
  }

  public get items() {
    return this._items;
  }

  @Input()
  public template: TemplateRef<any> | null = null;

  @Input()
  public selected: any;

  @Output()
  public selectedChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public doubleClick: EventEmitter<any> = new EventEmitter<any>();

  private timeout?: NodeJS.Timeout;

  public onSelectionChanged(row: any) {
    const change = this.selected?.id !== row?.id;
    this.selected = row;
    this.selectedChange.emit(row);

    if (change) {
      this._clickCount = 0;
      clearTimeout(this.timeout);
    }

    this._clickCount++;
    this.timeout = setTimeout(() => {
      if (this._clickCount > 1) {
        this.doubleClick.next(row);
      }
      this._clickCount = 0;
    }, 250);
  }
}
