import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
  imports: [RouterOutlet],
  // hostDirectives: [HighlightDirective] // Example of using hostDirectives in standalone component
})
export class UserComponent {}
