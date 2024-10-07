import { Component, OnInit, computed, effect, signal } from '@angular/core';

@Component({
    selector: 'app-signal',
    templateUrl: './signal.component.html',
    styleUrl: './signal.component.scss',
    standalone: true
})
export class SignalComponent implements OnInit {
users:any = signal([]);

constructor() {
  this.users.set([{
    name: 'vinoth',
    gender: 'male'
  }])

  effect(()=>{
    localStorage.setItem('user list', JSON.stringify(this.users()));
  })
}

ngOnInit(): void {


}

maleUsers = computed(() =>
  this.users().filter((user:any)=>user.gender=='male')
);

updateUser(){
  this.users.update((userArr:any)=> [...userArr,{name:'rajiv',gender:'male'}, {name:'mikasa',gender:'female'}]);
}

}
