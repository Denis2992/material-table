import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PeriodicElement } from '../domain/interfaces/periodic-element.interface';
import { ELEMENT_DATA } from '../domain/const/elements.const';

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableService {
  getTableData(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA);
  }
}
