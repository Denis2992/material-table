import { inject, Injectable } from '@angular/core';
import { TableStore } from '../+state/store';

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableFacade {
  tableStore = inject(TableStore);

  elements = this.tableStore.getElements;

  loadElements(): void {
    this.tableStore.loadElements();
  }
}
