import { FilterItemValue } from '../model/filter-item-value';

export function filterToParams(filterItems: FilterItemValue[]): {
  [key: string]: string;
} {
  const filter: { [key: string]: string } = {};
  filterItems.forEach((item) => {
    filter[`${item.path}_${item.comparer}`] = item.value;
  });

  return filter;
}
