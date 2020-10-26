import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerTimeHeaderComponent } from '../../../mat-datepicker-time-header/src/lib/mat-datepicker-time-header.component';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <form [formGroup]="form1">
  <mat-form-field appearance="fill">
    <mat-label>Custom calendar header</mat-label>
    <input formControlName="date" matInput [matDatepicker]="picker">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker [calendarHeaderComponent]="timeHeader"></mat-datepicker>
  </mat-form-field>
</form>

<form [formGroup]="form2">
  <mat-form-field appearance="fill">
    <mat-label>Enter a date range</mat-label>
    <mat-date-range-input [rangePicker]="picker2">
      <input [formControl]="form2.get('date.start')" matStartDate placeholder="Start date">
      <input [formControl]="form2.get('date.end')" matEndDate placeholder="End date">
    </mat-date-range-input>
    <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
    <mat-date-range-picker #picker2 [calendarHeaderComponent]="timeHeader"></mat-date-range-picker>
  </mat-form-field>
</form>

    
  `,
  styles: []
})
export class AppComponent {
  form1 = new FormGroup({ date: new FormControl(), time: new FormControl() })
  form2 = new FormGroup({ date: new FormGroup({ start: new FormControl(), end: new FormControl() }), time: new FormGroup({ start: new FormControl(), end: new FormControl() }) })
  constructor() {
    this.form1.valueChanges.subscribe(console.log)
    this.form2.valueChanges.subscribe(console.log)
  }
  timeHeader = MatDatepickerTimeHeaderComponent
}
