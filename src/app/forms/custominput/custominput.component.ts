
import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-custominput',
  standalone: true,
  // imports: [NgIf],
  templateUrl: './custominput.component.html',
  styleUrl: './custominput.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustominputComponent), // forwardRef is used to refer to the CustominputComponent class before it is defined. this is necessary because the CustominputComponent class is not yet defined when the providers array is created. it allows us to use the CustominputComponent as a value accessor for form controls.
      multi: true,
    },
  ],
})
export class CustominputComponent implements ControlValueAccessor {
  // constructor(public ngControl: NgControl) {
  //   ngControl.valueAccessor = this;
  // }

  @Input('placeholder') placeholder: string = 'Enter your input here';
  @Input('value') value: string = '';
  @Input('type') type: 'text' | 'email' | 'number' = 'text';

  onChange = (_: any) => {};
  onTouched = () => {};
  disabled: boolean = false;

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
