# MatDatepickerTimeHeader

### Check out the [Demo](https://stackblitz.com/edit/ngx-file-drag-drop)

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
in `component.ts`
#### Create a `formGroup` with a `time` control

```ts
form = new FormGroup({ date: new FormControl(), time: new FormControl() });
```

#### Create a referance to the MatDatepickerTimeHeaderComponent

```ts
timeHeader = MatDatepickerTimeHeaderComponent;
```
in `component.html`
#### Create a form and place the picker into it

```html
<form [formGroup]="formGroup">
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
## Todo

Add option to configure time control name.

## Current Limitations

No support yet for date range (no place in the header).