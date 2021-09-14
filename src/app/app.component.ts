import { Component } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  startTime = "00:00:00";
  time = 0;
  hours!:(number|string);
  minutes!:(number|string);
  seconds!:(number|string);
  counter = 0;
  condition = false;
  sub!: Subscription;
  subWait!: Subscription;


  onStartStopClick() {
    this.condition = !this.condition;

    if (this.condition) {
      const stream$: Observable<number> = new Observable(obresrver => {
        setInterval(() => {
          obresrver.next(1);
        }, 1000)
      })
      this.sub = stream$.subscribe(value => {
        this.time += value;
        this.hours =  Math.floor(this.time / 3600);
      this.minutes = Math.floor(this.time % 3600 / 60);
      this.seconds =  Math.floor(this.time % 3600 % 60);
      if (Number(this.hours) < 10) {
        this.hours = '0' + this.hours;
      } else {
        this.hours = '' + this.hours;
      }
      if (Number(this.minutes) < 10) {
        this.minutes = '0' + this.minutes;
      } else {
        this.minutes = '' + this.minutes;
      }
      if (Number(this.seconds) < 10) {
        this.seconds = '0' + this.seconds;
      } else {
        this.seconds = '' + this.seconds;}

      this.startTime =`${this.hours}:${this.minutes}:${this.seconds} `

      })
      this.counter = 0;
    } else {
      this.sub.unsubscribe();
      this.time = 0;
    }
  }

  onWaitClick() {

    if (this.counter !== 0 && this.counter <= 300) {
      console.log(this.counter);
      this.sub.unsubscribe();
      this.subWait.unsubscribe();
      this.condition = false;
      this.counter = 0;
    }

    this.subWait = interval(1).subscribe(value => {
      if (value === 300) {
        this.subWait.unsubscribe();
        this.counter = 0;
      } else {
        this.counter = value;
      }
    })

  }
  onResetClick() {
    this.time = 0;
      
    if (this.condition) return;

    this.onStartStopClick();
  }
}