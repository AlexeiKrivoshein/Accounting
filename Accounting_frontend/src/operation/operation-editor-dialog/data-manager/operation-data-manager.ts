import { Observable } from 'rxjs';
import { Operation } from 'src/operation/model/operation';

export interface OperationDataManager<T extends Operation> {
  operation: T;
  save(): Observable<T>;
}
