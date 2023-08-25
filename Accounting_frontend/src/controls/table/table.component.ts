import { Component, Input, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {MatTableDataSource} from '@angular/material/table';
import { Column } from './model/column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
  public dataSource: DataSource<any> = new MatTableDataSource<any>([]);

  @Input()
  public columns: Column[] = [];

  public columnsToDisplay: string[] = [];

  constructor(){}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.map(column => column.path);
  }
}
