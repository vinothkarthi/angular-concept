import { NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustominputComponent),
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
