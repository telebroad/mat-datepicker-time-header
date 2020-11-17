import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, Optional } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
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


  get isRange(): boolean {
    return this.calendar.selected instanceof DateRange
  }

  get timeControl(): AbstractControl {
    return this.parentFormDir.form.get(this.timeInputControlName || 'time');
  }

  constructor(
    private parentFormDir: FormGroupDirective,
    @Optional() @Inject(MAT_DATEPICKER_TIME_CONTROL_NAME) @Optional() private timeInputControlName: string,
    private matDatepickerContent: MatDatepickerContent<S>,
    @Inject(forwardRef(() => MatCalendar)) private calendar: MatCalendar<D>,
    changeDetectorRef: ChangeDetectorRef) {

    // rangepicker not supported (no place in heafer)
    this.throwIfRange();

    // by default, after selecting a date, the picker closes automaticaly. We are overriding it to allow time selection
    this.disableAutoClose();

     //this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
  }

  private throwIfRange() {
    if (this.isRange) {
      throw ('mat-datepicker-time-header-component is not yet supported for date-range picker');
    }
  }

  private disableAutoClose() {
    //; (this.matDatepickerContent as any).disableAutoClose = true;
    //MatDatepickerContent.prototype._handleUserSelection = _handleUserSelection;
    this.matDatepickerContent._handleUserSelection=_handleUserSelection;
  }

}
