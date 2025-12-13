import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ANGULAR_FORMS } from '../../shared/angular-forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import {
  minAgeValidator,
  noSpacesValidator,
  usernameTakenValidator,
} from '../../validators/custom-validators';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ANGULAR_FORMS],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup<any>;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [
        '',
        [Validators.required, noSpacesValidator(), Validators.minLength(3)],
        [usernameTakenValidator()],
      ],
      age: ['', [Validators.required, minAgeValidator(18)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male'],
      contact: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
      }),
      hobbies: this.fb.array([
        this.fb.control('Reading'),
        this.fb.control('Traveling'),
      ]),
    });
  }

  // userForm = new FormGroup({
  //   name: new FormControl(
  //     '',
  //     [Validators.required, noSpacesValidator(), Validators.minLength(3)],
  //     [usernameTakenValidator()]
  //   ),
  //   age: new FormControl('', [Validators.required, minAgeValidator(18)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   gender: new FormControl('male'),
  //   contact: new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     phone: new FormControl(''),
  //   }),
  //   hobbies: new FormArray([
  //     new FormControl('Reading'),
  //     new FormControl('Traveling'),
  //   ]),
  // });

  ngOnInit() {
    // Watch single control
    this.userForm.get('name')?.valueChanges.subscribe((value) => {
      // console.log('Name changed:', value);
    });

    // Watch entire form
    this.userForm.valueChanges.subscribe((formValue) => {
      // console.log('Form changed:', formValue);
    });
  }

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
    //this.hobbies.push(new FormControl(''));
  }

  onSubmit() {
    console.log(this.userForm);
    // Option 1: Clear everything
    this.userForm.reset();

    // Option 2: Reset with default values
    this.userForm.reset({
      name: 'Default Name',
      email: 'default@example.com',
    });
  }
}
