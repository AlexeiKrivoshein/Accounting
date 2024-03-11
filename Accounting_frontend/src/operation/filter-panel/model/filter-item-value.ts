export type FilterComparer =
  | 'eq'
  | 'neq'
  | 'more'
  | 'less'
  | 'meq'
  | 'leq';

export interface FilterItemValue {
  path: string;
  comparer: FilterComparer;
  value: string;
}