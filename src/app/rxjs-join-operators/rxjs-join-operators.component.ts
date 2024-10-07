import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, bufferTime, combineLatest, concat, concatMap, debounceTime, distinctUntilChanged, filter, forkJoin, from, fromEvent, interval, map, merge, mergeMap, of, race, scan, switchMap, take, takeUntil, tap, zip } from 'rxjs';

@Component({
    selector: 'app-rxjs-join-operators',
    templateUrl: './rxjs-join-operators.component.html',
    styleUrl: './rxjs-join-operators.component.scss',
    standalone: true
})
export class RxjsJoinOperatorsComponent implements OnInit, OnDestroy {
  fromSub: Subscription = new Subscription();
  intervalSub: Subscription = new Subscription();
  fromEventSub: Subscription = new Subscription();
  combinelatestSub: Subscription = new Subscription();
  concatSub: Subscription = new Subscription();
  forkJoinSub: Subscription = new Subscription();
  mergeSub: Subscription = new Subscription();
  zipSub: Subscription = new Subscription();
  debounceTimeSub: Subscription = new Subscription();
  filterSub: Subscription = new Subscription();
  takeUntilSub: Subscription = new Subscription();
  tapMapSub: Subscription = new Subscription();
  bufferTimeSub: Subscription = new Subscription();
  concatMapSub: Subscription = new Subscription();
  scanSub: Subscription = new Subscription();
  ngOnInit(): void {
    const data = from([1,2,3]);
   this.fromSub = data.subscribe({
      next(res) {console.log('from',res)} ,
      error(err) {console.log(`error, ${err}`)},
      complete(){console.log('completed')}
    })
    const secondsCounter = interval(100).pipe(take(10))
    this.intervalSub = secondsCounter.subscribe(n => console.log(`interval, it's been ${n} seconds since subscribing`))
    const fromevent = fromEvent(document,'click').pipe(take(10))
    this.fromEventSub = fromevent.subscribe(n => console.log(`fromEvent, it's been clicked ${n} times`))
    const firstTimer = interval(1000).pipe(map(x=>x+10))
    const secondTimer = interval(3000).pipe(map(x=>x+100))
    const combinelatest = combineLatest([firstTimer,secondTimer])
    // this.combinelatestSub = combinelatest.subscribe(val=>console.log('combineLatest', val))
    const thirdTimer = interval(1000).pipe(take(10),map(x=>x+10))
    const forthTimer = interval(3000).pipe(take(5),map(x=>x+100))
    const concatOp = concat(thirdTimer,forthTimer)
    // this.concatSub = concatOp.subscribe(val=>console.log('concat',val))
    const forkJoinOp = forkJoin([thirdTimer,forthTimer])
    this.forkJoinSub = forkJoinOp.subscribe(val=>console.log('forkJoin',val))
    const mergeOp = merge(thirdTimer,forthTimer)
    // this.mergeSub = mergeOp.subscribe(val=>console.log('merge',val))
    const raceOP = race(thirdTimer,forthTimer)
    raceOP.subscribe(val=>console.log('raceOP',val))
    const age$ = of(27, 25, 29, 30);
    const name$ = of('Foo', 'Bar', 'Beer');
    const isDev$ = of(true, true, false);
    this.zipSub = zip(age$, name$, isDev$).pipe(
      map(([age, name, isDev]) => ({ age, name, isDev }))
    )
    .subscribe(x => console.log(x));
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(debounceTime(1000));
    this.debounceTimeSub = result.subscribe(x => console.log(x));
    of(1, 1, 1, 2, 2, 2, 1, 1, 3, 3)
    .pipe(distinctUntilChanged())
    .subscribe(console.log);
    const clicksOnDivs = clicks.pipe(filter(ev => (<HTMLElement>ev.target).tagName === 'DIV'));
    this.filterSub = clicksOnDivs.subscribe(x => console.log(x));
    const source = interval(1000);
    const result1 = source.pipe(takeUntil(clicks));
    this.takeUntilSub = result1.subscribe(x => console.log(x));
    const positions = clicks.pipe(tap(ev => console.log(ev)),map((ev:any) => ev.clientX));
    this.tapMapSub = positions.subscribe(x => console.log(x));
    const buffered = clicks.pipe(bufferTime(2000,5000));
    this.bufferTimeSub = buffered.subscribe(x => console.log(x));
    const letters = of('a', 'b', 'c');
    const result3 = letters.pipe(
      concatMap(x => interval(1000).pipe(take(2),map(i => x + i)))
      // mergeMap(x => interval(1000).pipe(take(2),map(i => x + i)))
      // switchMap(x => interval(1000).pipe(map(i => x + i)))
    );
    this.concatMapSub = result3.subscribe(x => console.log(x));
    const numbers = of(1,2,3);
    this.scanSub = numbers.pipe(
      // Get the sum of the numbers coming in.
      scan((total, n) => total + n),
      // Get the average by dividing the sum by the total number
      // received so far (which is 1 more than the zero-based index).
      map((sum, index) => sum / (index + 1))
    )
    .subscribe(console.log);
  }
  ngOnDestroy(): void {
    if(this.fromSub)
    this.fromSub.unsubscribe()
    if(this.intervalSub)
    this.intervalSub.unsubscribe()
    if(this.fromEventSub)
    this.fromEventSub.unsubscribe()
    if(this.combinelatestSub)
    this.combinelatestSub.unsubscribe()
    if(this.concatSub)
    this.concatSub.unsubscribe()
    if(this.forkJoinSub)
    this.forkJoinSub.unsubscribe()
    if(this.mergeSub)
    this.mergeSub.unsubscribe()
    if(this.zipSub)
    this.zipSub.unsubscribe()
    if(this.debounceTimeSub)
    this.debounceTimeSub.unsubscribe()
    if(this.filterSub)
    this.filterSub.unsubscribe()
    if(this.takeUntilSub)
    this.takeUntilSub.unsubscribe()
    if(this.tapMapSub)
    this.tapMapSub.unsubscribe()
    if(this.bufferTimeSub)
    this.bufferTimeSub.unsubscribe()
    if(this.concatMapSub)
    this.concatMapSub.unsubscribe()
    if(this.scanSub)
    this.scanSub.unsubscribe()
  }

}
