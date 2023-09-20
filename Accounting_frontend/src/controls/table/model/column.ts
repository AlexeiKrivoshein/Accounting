import { ColumnType } from "./column-type";

export interface Column {
  path: string;
  header: string;
  type?: ColumnType;
}