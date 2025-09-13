import {
  Component,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  afterNextRender,
  afterRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-life-cycle-hook',
  standalone: true,
  templateUrl: './life-cycle-hook.component.html',
  styleUrl: './life-cycle-hook.component.scss',
})
export class LifeCycleHookComponent {
  public chart: any;

  @ViewChild('MyStyle') MyStyle!: ElementRef<HTMLParagraphElement>;
  @ViewChild('MyChart') MyChart!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Runs after *every* render cycle
    afterRender({
      read: () => {
        console.log(
          'afterRender → read:',
          this.MyStyle?.nativeElement?.style.color
        );
      },
      write: () => {
        console.log('afterRender → write');
      },
    });
    // Runs only after the *next* render (once)
    afterNextRender({
      write: async () => {
        if (isPlatformBrowser(this.platformId)) {
          this.MyStyle.nativeElement.style.color = 'red';
          await this.createChart();
        }
      },
    });
  }

  async createChart() {
    // Lazy import Chart.js only in browser
    const { default: Chart } = await import('chart.js/auto');

    this.chart = new Chart(this.MyChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            data: [467, 576, 572, 79, 92, 574, 573, 576],
            backgroundColor: 'blue',
          },
          {
            label: 'Profit',
            data: [542, 542, 536, 327, 17, 0, 538, 541],
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: { aspectRatio: 2.5 },
    });
  }
}
