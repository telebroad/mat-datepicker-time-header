import { InjectionToken } from '@angular/core';
import { DateRange, MatCalendarUserEvent } from "@angular/material/datepicker";

export const MAT_DATEPICKER_TIME_CONTROL_NAME = new InjectionToken<string>('custom form control name for datepicker header input');

export function _handleUserSelection<D, S>(this: any, event: MatCalendarUserEvent<D | null>) {
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

    // if ((!this._model || this._model.isComplete()) && !this.disableAutoClose) {
    //     this.datepicker.close();
    // }
}