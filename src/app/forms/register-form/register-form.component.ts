import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ANGULAR_FORMS } from '../../shared/angular-forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule,ANGULAR_FORMS],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  user = {
    name: '',
    email: '',
    gender: ''
  };

  onSubmit(form: NgForm) {
    console.log('Form Submitted!', this.user);
    alert('Form Submitted! ✅\n' + JSON.stringify(this.user));

    form.resetForm({
      name: '',
      email: '',
      gender: ''
    });
  }

  onReset(form: NgForm) {
      form.resetForm({
      name: "Default User",
      email: "test@example.com",
      gender: "male"
    });
  }
}
