import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-layer',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-layer.component.html',
  styleUrl: './form-layer.component.scss',
})
export class FormLayerComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<FormLayerComponent>);
  layerData = inject(MAT_DIALOG_DATA);
  editValue = new FormControl('');
  inputType: string = 'string';

  ngOnInit() {
    this.editValue.setValue(this.layerData.value);
    this.inputType = this.layerData.type;
  }

  onClose(): void {
    this.dialogRef.close({
      changedValue: this.editValue.getRawValue(),
    });
  }
}
