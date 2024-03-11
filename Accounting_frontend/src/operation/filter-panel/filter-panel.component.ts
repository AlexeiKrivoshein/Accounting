import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterComparer, FilterItemValue } from './model/filter-item-value';
import { FilterPanelItem } from './model/filter-panel-item';
import { FilterPanelItemAutocompete } from './model/filter-panel-item-autocomplete';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FILTER_PREFIX, MAX_DATE_POSTFIX, MIN_DATE_POSTFIX } from './const';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  providers: [DatePipe],
})
export class FilterPanelComponent implements OnInit {
  private _items: FilterPanelItem[] = [];

  @Input()
  public set items(value: FilterPanelItem[]) {
    this._items = value;

    this.formGroup = new FormGroup({});
    this.items.forEach((item) => {
      this.formGroup.addControl(item.path, new FormControl());
    });
  }

  public get items() {
    return this._items;
  }

  public formGroup = new FormGroup({});

  @Output()
  public apply = new EventEmitter<FilterItemValue[]>();

  constructor(public datepipe: DatePipe) {}

  public ngOnInit(): void {}

  public getControl(path: string): FormControl<any> {
    const control = this.formGroup.get(path);
    return control as FormControl;
  }

  public onApply() {
    const filter: FilterItemValue[] = [];
    this._items.forEach((item) => {
      const control = this.formGroup.get(item.path);
      if (!control) {
        return;
      }

      let path: string = item.path;
      let comparer: FilterComparer = 'eq';
      let value = control.getRawValue();

      if (!path || (!value && value !== 0)) {
        return;
      }

      // дата - может быть диапазоном
      if (item.type === 'date') {
        if (path.endsWith(MIN_DATE_POSTFIX)) {
          path = `${FILTER_PREFIX}${path.slice(
            0,
            path.length - MIN_DATE_POSTFIX.length
          )}`;
          comparer = 'meq';
          const date = new Date(value);
          value = this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
        } else if (path.endsWith(MAX_DATE_POSTFIX)) {
          path = `${FILTER_PREFIX}${path.slice(
            0,
            path.length - MAX_DATE_POSTFIX.length
          )}`;
          comparer = 'leq';
          const date = new Date(value);
          value = this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
        } else {
          path = `${FILTER_PREFIX}${path}`;
          comparer = 'eq';
          const date = new Date(value);
          value = this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
        }
      } else {
        path = `${FILTER_PREFIX}${path}`;
      }

      filter.push({
        path,
        comparer,
        value: '' + value,
      });
    });

    this.apply.emit(filter);
  }

  public onClear() {
    this.formGroup.reset();
    this.onApply();
  }

  public autocompleteItems$(item: FilterPanelItem): Observable<any[]> {
    const autocompete = item as FilterPanelItemAutocompete;
    return autocompete?.items$ ?? [];
  }

  public autocompleteDisplayFn(item: FilterPanelItem): (data: any) => string {
    const defaultFn = (value: any) => value;

    const autocompete = item as FilterPanelItemAutocompete;
    return autocompete?.displayFn ?? defaultFn;
  }

  public autocompleteValueFn(item: FilterPanelItem): (data: any) => any {
    const defaultFn = (value: any) => value;

    const autocompete = item as FilterPanelItemAutocompete;
    return autocompete?.valueFn ?? defaultFn;
  }
}
