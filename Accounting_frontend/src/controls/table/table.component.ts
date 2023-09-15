import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from './model/column';
import { EMPTY_GUID } from 'src/const';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public EMPTY_GUID = EMPTY_GUID;

  @Input()
  public dataSource: DataSource<any> = new MatTableDataSource<any>([]);

  @Input()
  public columns: Column[] = [];

  @Input()
  public selected: any;

  @Output()
  public selectedChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public doubleClick: EventEmitter<any> = new EventEmitter<any>();

  public columnsToDisplay: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.map((column) => column.path);
  }

  public onSelectionChanged(row: any) {
    this.selected = row;
    this.selectedChange.emit(row);
  }

  public onDoubleClick(row: any) {
    this.onSelectionChanged(row);
    this.doubleClick.emit(row);
  }

  public getData(data: any, path: string) {
    const items = path.split('.');

    let result: any = data;
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (result[item]) {
        result = result[item];
      } else {
        result = '';
      }
    }

    return result;
  }
}
