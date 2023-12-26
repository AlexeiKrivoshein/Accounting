export enum OperationType {
  Debited,
  Credited,
}

export const OPERATION_TYPE_LOCALIZED: {
  type: OperationType;
  local: string;
}[] = [
  {
    type: OperationType.Credited,
    local: 'Расход',
  },
  {
    type: OperationType.Debited,
    local: 'Приход',
  },
];

export const operationTypeDisplayFn = (data: any) => {
  const index = OPERATION_TYPE_LOCALIZED.findIndex((item) => item.type == data);
  return index >= 0 ? OPERATION_TYPE_LOCALIZED[index].local : '';
};
