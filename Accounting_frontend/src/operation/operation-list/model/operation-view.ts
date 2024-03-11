import { OperationClass } from "src/operation/model/operation-class";

export interface OperationView {
  id: string;
  icon: string;
  from: string;
  to: string;
  description: string;
  sum: number;
  operationClass: OperationClass | null;
}