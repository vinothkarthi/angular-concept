import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-not-found',
    imports: [],
    template: ` <p>404 not found!</p> `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: ``
})
export class NotFoundComponent {}
