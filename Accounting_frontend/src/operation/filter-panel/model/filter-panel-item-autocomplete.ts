import { Observable } from 'rxjs';
import { FilterPanelItem } from './filter-panel-item';

export interface FilterPanelItemAutocompete extends FilterPanelItem {
  items$: Observable<any[]>;
  displayFn: (data: any) => string;
  valueFn: (data: any) => any;
}
