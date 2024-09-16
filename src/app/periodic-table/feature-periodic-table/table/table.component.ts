import { Component, inject, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../domain/interfaces/periodic-element.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormLayerComponent } from '../../feature-form-layer/form-layer/form-layer.component';
import { PeriodicTableFacade } from '../../domain/facade/facade';
import { ValueCategoryType } from '../../domain/types/value-category.type';
import { ValueCategory } from '../../domain/enums/value-category.enum';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly tableFacade = inject(PeriodicTableFacade);

  displayedColumns: string[] = [
    ValueCategory.POSITION,
    ValueCategory.NAME,
    ValueCategory.WEIGHT,
    ValueCategory.SYMBOL,
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(
    this.tableFacade.elements(),
  );

  ngOnInit() {
    this.tableFacade.loadElements();
  }

  applyFilter(event: Event) {
    setTimeout(() => {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }, 2000);
  }

  openLayer(editElement: PeriodicElement, valueCategory: ValueCategoryType) {
    const dialogRef = this.dialog.open(FormLayerComponent, {
      data: {
        value: editElement[valueCategory],
        type: typeof editElement[valueCategory],
      },
    });

    dialogRef.afterClosed().subscribe((layerData) => {
      if (!layerData?.changedValue) {
        return;
      }

      const index = this.dataSource.data.indexOf(editElement);
      this.dataSource.data[index][valueCategory] = layerData.changedValue;
    });
  }
}
