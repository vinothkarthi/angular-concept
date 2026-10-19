import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-decorator-metadata',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './decorator-metadata.component.html',
  styleUrl: './decorator-metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DecoratorMetadataComponent {}
