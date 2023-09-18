export enum OperationType {
  Debited,
  Credited
}

export const OPERATION_TYPE_LOCALIZED: { type: OperationType, local: string }[] = [
  {
    type: OperationType.Credited,
    local: 'Расход'
  },{
    type: OperationType.Debited,
    local: 'Приход'
  }
]