import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatCalendarUserEvent, DateRange, MatDatepickerContent, MatCalendar } from '@angular/material/datepicker';

function _handleUserSelection<D, S>(this: any, event: MatCalendarUserEvent<D | null>) {
  const selection = this._model.selection;
  const value = event.value;
  const isRange = selection instanceof DateRange;

  // If we're selecting a range and we have a selection strategy, always pass the value through
  // there. Otherwise don't assign null values to the model, unless we're selecting a range.
  // A null value when picking a range means that the user cancelled the selection (e.g. by
  // pressing escape), whereas when selecting a single value it means that the value didn't
  // change. This isn't very intuitive, but it's here for backwards-compatibility.
  if (isRange && this._rangeSelectionStrategy) {
    const newSelection = this._rangeSelectionStrategy.selectionFinished(value,
      selection as unknown as DateRange<D>, event.event);
    this._model.updateSelection(newSelection as unknown as S, this);
  } else if (value && (isRange ||
    !this._dateAdapter.sameDate(value, selection as unknown as D))) {
    this._model.add(value);
  }

  if ((!this._model || this._model.isComplete()) && !this.disableAutoClose) {
    this.datepicker.close();
  }
}

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
    matDatepickerContent: MatDatepickerContent<S>,
    @Inject(forwardRef(() => MatCalendar)) public calendar: MatCalendar<D>,
    changeDetectorRef: ChangeDetectorRef) {

    // by default, after selecting a date, the picker closes. We are verriding it to allow time selection

    (matDatepickerContent as any).disableAutoClose = true;
    MatDatepickerContent.prototype._handleUserSelection = _handleUserSelection
    this.parentForm = parentFormDir.form;
    this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());

    if (this.isRange) {
      throw ('timepicker header is not yet supported for range picker')
    }
  }

  get isRange(): boolean {
    return this.calendar.selected instanceof DateRange
  }

}
