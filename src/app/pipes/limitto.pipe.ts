import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitto',
  standalone: true,
})
export class LimittoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    const limit = args.length ? (args[0] as number) : 5;
    return [...value].map((char, i) => (i < limit ? char : '.')).join('');
  }
}
