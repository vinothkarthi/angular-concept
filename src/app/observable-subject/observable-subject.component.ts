import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, of } from 'rxjs';
import { SharedService } from '../service/shared.service';

@Component({
    selector: 'app-observable-subject',
    templateUrl: './observable-subject.component.html',
    styleUrl: './observable-subject.component.scss',
    standalone: true,
    imports: []
})
export class ObservableSubjectComponent implements OnInit {

  data:any;
  count = 1;
  observable1: any;
  observable2: any;
  subject1: any;
  subject2: any;
  subject = new Subject();
  // subject = new ReplaySubject(2); how many values to keep in memory
  // subject = new BehaviorSubject(100); it will keep last one emitted value, we can pass initial value to be emit
  observable:any;
  promise:any;
  subscription: Subscription = new Subscription();
  myData:any=[];

  constructor(private sharedSrv: SharedService){}

  ngOnInit(): void {
    // this.sharedSrv.sub.next(100); we can call next()
    // this.sharedSrv.subObs$.next(100); we can't call next()
  }

  create() {
    this.observable = new Observable<any>(observer => {
      console.log("observable created");
      setInterval(()=> {
        observer.next("observable has emitted")
      },1000)
    })
    this.promise = new Promise<any>(resolve => {
      console.log("promise created")
      setInterval(()=>{
        resolve("promise has emitted")
      },1000)
    })
  }

  execute(){
    this.subscription = this.observable.subscribe((data: any) => console.log(data));
    this.promise.then((data:any) => console.log(data))
  }

  cancel() {
    this.subscription.unsubscribe()
  }

  getObservableData() {
    let observable = new Observable<any>(observer => {
      observer.next(Math.floor(Math.random()*99))
    })
    observable.subscribe(data => this.observable1 = data)
    observable.subscribe(data => this.observable2 = data)
  }

  getSubjectData() {
    let subject = new Subject<any>();
    // subject.next(Math.floor(Math.random()*99)) if sub emit the data before its subscribe then those data will lost or we can't able to access those data
    subject.subscribe(data => this.subject1 = data)
    subject.subscribe(data => this.subject2 = data)
    subject.next(Math.floor(Math.random()*99))
  }

  emitData(){
    this.subject.next(1);
    setTimeout(()=>this.subject.next(2),3000);
    setTimeout(()=>this.subject.next(3),6000);
    setTimeout(()=>this.subject.next(4),9000);
    setTimeout(()=>this.subject.next(5),12000);
  }

  getData() {
    this.subject.subscribe((data:any) => this.myData.push(data))
  }
}
