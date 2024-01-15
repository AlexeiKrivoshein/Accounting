export enum OperationClass {
  ContractorOperation,
  TransferOperation,
  CorrectionOperation,
  CashOperation
}

export function operationClassLocal(operation: OperationClass): string {
  switch (operation) {
    case OperationClass.ContractorOperation: 
      return 'Операция с контрагентом';
    case OperationClass.TransferOperation: 
      return 'Перевод между счетами';
    case OperationClass.CorrectionOperation: 
      return 'Корректировка';
    case OperationClass.CashOperation: 
      return 'Наличные';
    default: 
      return "";
  }
}