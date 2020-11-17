# MatDatepickerTimeHeader

### Check out the [Demo](https://stackblitz.com/edit/mat-datepicker-time-header)

### Install

```
npm i ngx-file-drag-drop
```

### Usage

#### Add the module

```ts
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerTimeHeaderModule } from 'mat-datepicker-time-header';

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    // the module for this lib
    MatDatepickerTimeHeaderModule
  ]
})

```
**In order for the input to work, you must add a control with the name `time` to a `formGroup`, and add the formGroup on one of the parents of the datepicker. Otherwise it will just throw an error. The cotrol name can optionaly [ be configured](#optional-control-name-configuration).**

in `component.ts`

#### Create a `formGroup` with a `time` control

```ts
form = new FormGroup({ date: new FormControl(), time: new FormControl() });
```

#### Create a referance to the MatDatepickerTimeHeaderComponent

```ts 
import { MatDatepickerTimeHeaderComponent } from 'mat-datepicker-time-header'
timeHeader = MatDatepickerTimeHeaderComponent;
```

in `component.html`

#### Create a form and place the picker into it

```html
<form [formGroup]="form">
  <mat-form-field appearance="fill">
    <mat-label>Custom calendar header</mat-label>
    <input formControlName="date" matInput [matDatepicker]="picker" />
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
</form>
```

#### Add the custom heaser to the datepicker

```html
<mat-datepicker #picker [calendarHeaderComponent]="timeHeader"></mat-datepicker>
```

## Optional control name configuration

By default, the time input will search for a parent formGroup and attach itself to the control with the name `time`,
the control name can optionaly be changed by providing the control name.

```ts
import { MAT_DATEPICKER_TIME_CONTROL_NAME } from "mat-datepicker-time-header";

providers: [
  { provide: MAT_DATEPICKER_TIME_CONTROL_NAME, useValue: "event_time" }
  // now it will attach to "event_time" instead
];
```

## Current Limitations
* No support for template driven forms
* Date range picker not supported yet (no place in the header).

Pull requests welcome

