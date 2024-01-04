import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <style>


.count-down-timer {
  box-shadow: 2px 6px 9px 2px rgb(0 0 0 / 20%);
  text-align: center;
  /* background-color: #313b3f; */
  max-width: 700px;
  width:500px;
  margin: 20px auto;
  color: #d9a74a;
  border-radius: 6px;
  padding: 10px;
  font-family: sans-serif;

  > p {
    margin: 5px 0 15px 0;
  }

  .wrapper {
    .description,
    .times {
      display: grid;
      grid-template-columns: repeat(4, calc(25% - 8px));
      grid-column-gap: 10px;
    }

    .description {
      > p {
        margin: 0;
        font: normal 14px sans-serif;
      }
    }

    .times {
      p {
        letter-spacing: -5px;
        position: relative;
        margin: 0;
        font: normal 40px courier, sans-serif;
        ::ng-deep img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          display: block;
          height: 30px;
        }
      }
    }
  }
}

@media screen and (max-width: 430px) {
  .count-down-timer {
    margin: 20px;
  }
}



  </style>
  
  
  
  <div class="count-down-timer">
  <p>{{ currentTime }}</p>
  <div class="wrapper">
    <div class="description">
      <p>Days</p>
      <p>Hours</p>
      <p>Minutes</p>
      <p>Seconds</p>
    </div>
    <div class="times">
      <p #days></p>
      <p #hours></p>
      <p #minutes></p>
      <p #seconds></p>
    </div>
  </div>
</div>`,
 
})
export class CounterComponent implements AfterViewInit{
constructor(){}
currentTime!: string;
months: Array<string> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
// @Input('start_time') start_time: any



targetDate: Date = new Date('2024-01-05T04:34:55.567+00:00');




@ViewChild('days', { static: true })
  days!: ElementRef;
  @ViewChild('hours', { static: true })
  hours!: ElementRef;
  @ViewChild('minutes', { static: true })
  minutes!: ElementRef;
  @ViewChild('seconds', { static: true })
  seconds!: ElementRef;

ngAfterViewInit() {
  this.updateCountdown();

  setInterval(() => {
    this.updateCountdown();
  }, 1000);
}

updateCountdown() {
  const now = new Date().getTime();
  let difference = this.targetDate.getTime() - now;

  if (difference < 0) {
    difference = 0; // To prevent displaying negative values
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  this.days.nativeElement.innerText = days;
  this.hours.nativeElement.innerText = hours;
  this.minutes.nativeElement.innerText = minutes;
  this.seconds.nativeElement.innerText = seconds;

  this.currentTime = `${this.months[this.targetDate.getMonth()]} ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
}
 
}
