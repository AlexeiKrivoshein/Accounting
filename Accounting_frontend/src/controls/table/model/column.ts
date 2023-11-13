import { ColumnType } from "./column-type";

export interface Column {
  path: string;
  header: string;
  type?: ColumnType;
  displayFn?: (data: any) => string;
}