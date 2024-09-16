import { inject, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../interfaces/periodic-element.interface';
import { ComponentStore } from '@ngrx/component-store';
import { PeriodicTableService } from '../../infrastructure/periodic-table.service';
import { tap } from 'rxjs';

interface TableState {
  periodicTable: PeriodicElement[];
}

@Injectable({
  providedIn: 'root',
})
export class TableStore extends ComponentStore<TableState> {
  periodicTableService = inject(PeriodicTableService);

  constructor() {
    super({
      periodicTable: [],
    });
  }

  readonly getElements = this.selectSignal((state) => state.periodicTable);

  private readonly setElements = this.updater(
    (state, elements: PeriodicElement[]) => ({
      periodicTable: elements,
    }),
  );

  readonly loadElements = this.effect<void>(() =>
    this.periodicTableService
      .getTableData()
      .pipe(tap({ next: (elements) => this.setElements(elements) })),
  );
}
