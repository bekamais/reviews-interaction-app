import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import { gsap, Expo } from 'gsap';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rv-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnChanges {
  data$: Observable<any>;
  @ViewChild('heading', { static: true }) heading: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;

  @Input() dataLength: number;

  tl = gsap.timeline();
  tl2 = gsap.timeline();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.getElement(this.dataLength);
    this.animate();
  }

  getElement(id) {
    this.data$ = this.dataService.getMockDataById(id);
  }

  public animate(): void {
    if (this.elementsExist) {
      this.tl2
        .to(this.heading.nativeElement, {
          duration: 0.5,
          y: 5,
          opacity: 0,
          ease: Expo.easeInOut,
        })
        .to(this.heading.nativeElement, {
          duration: 0,
          y: -10,
          onComplete: () => {
            gsap.to(this.heading.nativeElement, {
              duration: 0.5,
              y: 0,
              opacity: 1,
              ease: Expo.easeInOut as any,
            });
          },
        });
      this.tl
        .to(this.content.nativeElement, {
          delay: 0.1,
          duration: 0.5,
          y: 5,
          opacity: 0,
          ease: Expo.easeInOut as any,
        })
        .to(this.content.nativeElement, {
          duration: 0,
          y: -10,
          onComplete: () => {
            gsap.to(this.content.nativeElement, {
              duration: 0.5,
              y: 0,
              opacity: 1,
              ease: Expo.easeInOut as any,
            });
          },
        });
    }
  }

  private get elementsExist() {
    return (
      !!(this.content && this.content.nativeElement) ||
      !!(this.heading && this.heading.nativeElement)
    );
  }
}
