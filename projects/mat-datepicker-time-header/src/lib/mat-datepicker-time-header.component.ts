import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { DateRange, MatDatepickerContent, MatCalendar } from '@angular/material/datepicker';
import { MAT_DATEPICKER_TIME_CONTROL_NAME, _handleUserSelection } from './utils';



@Component({
  selector: 'mat-datepicker-time-header',
  templateUrl: './mat-datepicker-time-header.component.html',
  styleUrls: ['./mat-datepicker-time-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class MatDatepickerTimeHeaderComponent<D, S> {

  parentForm: FormGroup;

  constructor(
    parentFormDir: FormGroupDirective,
    @Optional() @Inject(MAT_DATEPICKER_TIME_CONTROL_NAME) @Optional() public timeInputControlName: string = 'time',
    matDatepickerContent: MatDatepickerContent<S>,
    @Inject(forwardRef(() => MatCalendar)) public calendar: MatCalendar<D>,
    changeDetectorRef: ChangeDetectorRef) {

    if (this.isRange) {
      throw ('timepicker header is not yet supported for range picker')
    }
      // by default, after selecting a date, the picker closes. We are verriding it to allow time selection

      ;(matDatepickerContent as any).disableAutoClose = true;
    MatDatepickerContent.prototype._handleUserSelection = _handleUserSelection
    this.parentForm = parentFormDir.form;
    this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());


  }



  get isRange(): boolean {
    return this.calendar.selected instanceof DateRange
  }

}
