import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  standalone: true,
  imports: [JsonPipe],
})
export class PostComponent implements OnInit {
  posts: any = [];
  constructor(
    private sharedSrv: SharedService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eleRef: ElementRef,
    private router: Router
  ) {
    this.style = this.sanitizer.bypassSecurityTrustStyle(
      'font-size: 15px; font-weight: bold'
    );
  }
  /*   @HostBinding
  Binds a property of the host element to a field/property in your directive or component.
  Keeps the host element’s attribute/class/style in sync with your directive/component logic. */
  @HostBinding('style') style: SafeStyle;

  /*   @HostListener
Listens to events on the host element and runs a method when the event occurs. */
  @HostListener('mouseover') mouseEnter() {
    this.eleRef.nativeElement.style.color = 'orange';
  }
  @HostListener('mouseleave') mouseLeave() {
    this.eleRef.nativeElement.style.color = 'black';
  }

  ngOnInit(): void {
    this.posts = this.activateRoute.snapshot.data['resolvedData'];
  }
}
