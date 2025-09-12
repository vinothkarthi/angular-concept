import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
  standalone: true,
  imports: [CommonModule, ModalComponent],
})
export class SignalComponent implements OnInit {
  users: any = signal([]);

  constructor() {
    this.users.set([
      {
        name: 'vinoth',
        gender: 'male',
      },
    ]);

    effect(() => {});
  }

  ngOnInit(): void {}

  maleUsers = computed(() =>
    this.users().filter((user: any) => user.gender == 'male')
  );

  updateUser() {
    this.users.update((userArr: any) => [
      ...userArr,
      { name: 'eren yeager', gender: 'male' },
      { name: 'mikasa', gender: 'female' },
    ]);
  }
  showModal = signal(false);
  modalTitle = signal('Hello from Parent!');

  openModal() {
    this.showModal.set(true);
  }

  onModalClosed() {
    this.showModal.set(false);
  }
}
