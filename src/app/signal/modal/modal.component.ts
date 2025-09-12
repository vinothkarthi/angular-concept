import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="backdrop">
      <div class="modal">
        <h2>Edit Title</h2>

        <!-- bind directly to signal -->
        <input
          [value]="title()"
          (input)="title.set($any($event.target).value)"
        />

        <p>Live preview: {{ title() }}</p>
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styles: [
    `
      .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
      }
      .modal {
        background: #fff;
        padding: 20px;
        margin: 100px auto;
        width: 300px;
        border-radius: 8px;
      }
    `,
  ],
})
export class ModalComponent {
  title = model<string>(); // two-way bound
  closed = output<void>();

  close() {
    this.closed.emit();
  }
}
