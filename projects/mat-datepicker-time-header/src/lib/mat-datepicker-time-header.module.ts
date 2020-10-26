import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerTimeHeaderComponent } from './mat-datepicker-time-header.component';



@NgModule({
  declarations: [MatDatepickerTimeHeaderComponent],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [MatDatepickerTimeHeaderComponent]
})
export class MatDatepickerTimeHeaderModule { }
