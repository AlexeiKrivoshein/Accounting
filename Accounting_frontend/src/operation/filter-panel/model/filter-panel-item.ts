export type FilterItemType = 'string' | 'number' | 'date' | 'autocomplete';

export interface FilterPanelItem {
  text: string;
  path: string;
  type: FilterItemType;
}
