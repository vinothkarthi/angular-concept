import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
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
import { CustominputComponent } from '../custominput/custominput.component';
import { SharedService } from '../../service/shared.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  zip,
} from 'rxjs';
import { pickUser } from '../../utils/mapUser';

@Component({
    selector: 'app-user-form',
    imports: [CommonModule, ANGULAR_FORMS, CustominputComponent],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {
  userForm: FormGroup<any>;

  @ViewChild('ageFormControlTemplate') ageFormControl!: TemplateRef<any>;
  @ViewChild('ageFormControlContainer', { read: ViewContainerRef })
  ageFormControlContainer!: ViewContainerRef;
  unSubscribe: Subject<any> = new Subject<any>();
  users: any[] = [];
  editFlag: boolean = false;
  editUserId: number | null = null;
  searchTerm: string = '';
  private search$: Subject<string> = new Subject<string>();
  filteredUsers$!: Observable<any[]>;
  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: [
        '',
        [Validators.required, noSpacesValidator(), Validators.minLength(3)],
        [usernameTakenValidator()],
      ],
      // age: ['', [Validators.required, minAgeValidator(18)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: [''],
        zipcode: [''],
      }),
      // gender: ['male'],
      // contact: this.fb.group({
      //   email: ['', [Validators.required, Validators.email]],
      //   phone: [''],
      // }),
      // hobbies: this.fb.array([
      //   this.fb.control('Reading'),
      //   this.fb.control('Traveling'),
      // ]),
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

    this.getAllUsers();
    // Search functionality
    this.filteredUsers$ = this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => typeof term === 'string' && term.length >= 3),
      switchMap((term) => this.sharedService.searchUsers(term))
    );
  }

  getAllUsers() {
    this.sharedService
      .getUsersDetails()
      .pipe(
        takeUntil(this.unSubscribe),
        map((data) =>
          data.map(
            ({
              id,
              name,
              username,
              email,
              address: { street, city, zipcode },
            }) => ({
              id,
              name,
              username,
              email,
              address: {
                street,
                city,
                zipcode,
              },
            })
          )
        )
      )
      .subscribe((data) => {
        this.users = data;
      });
  }

  ngAfterViewInit(): void {
    // this.ageFormControlContainer?.createEmbeddedView(this.ageFormControl, {
    //   placeholder: 'Enter Age',
    // });
  }

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
    //this.hobbies.push(new FormControl(''));
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.editFlag ? this.updateUser() : this.addUser();
  }

  addUser() {
    if (this.userForm.invalid) return;
    // const id = +this.users[this.users.length - 1].id + 1;
    // const newUser = { id, ...this.userForm.value };
    this.sharedService
      .addUser(this.userForm.value)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe({
        next: (res) => {
          this.users = [...this.users, res];
        },
        error: (err) => {
          console.error('Error adding user:', err);
        },
      });
    this.userForm.reset();
  }

  updateUser() {
    if (this.editUserId === null) return;
    const index = this.users.findIndex((user) => user.id == this.editUserId);
    if (index !== -1) {
      this.sharedService
        .updateUser(this.editUserId, this.userForm.value)
        .pipe(takeUntil(this.unSubscribe), map(pickUser))
        .subscribe({
          next: (res) => {
            this.users[index] = res;
          },
        });
      // this.users[index] = {
      //   id: this.editUserId,
      //   ...this.userForm.value,
      // };
    }
    this.cancelEdit();
  }

  editUser(id: number) {
    this.editFlag = true;
    this.editUserId = id;
    this.sharedService
      .getUser(id)
      .pipe(takeUntil(this.unSubscribe), map(pickUser))
      .subscribe({
        next: (res) => {
          this.userForm.patchValue(JSON.parse(JSON.stringify(res)), {
            emitEvent: false,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteUser(id: number) {
    this.sharedService
      .deleteUser(id)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe({
        next: (res) => {
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancelEdit() {
    this.editFlag = false;
    this.editUserId = null;
    this.userForm.reset();
  }

  trackByUserId(index: number, user: any) {
    return user.id;
  }
  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.search$.next(this.searchTerm);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(null);
    this.unSubscribe.complete();
  }
}
