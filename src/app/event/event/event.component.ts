import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// import  'owl.carousel'; 

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  activeDay: any;
  image: any
  showRemaining: boolean = false;
  isMobile!: boolean;


  carouselData = [
    '../../assets/image/11557.jpg',
    '../../assets/image/another-image.jpg',
  ];


  constructor(private breakpointObserver: BreakpointObserver, private el: ElementRef, private renderer: Renderer2) {
    this.image = "../src/assets/image/11557.jpg"
    this.displayedItems = this.carouselItems.slice(0, 3);
    this.activeDay = this.scheduleData.length > 0 ? this.scheduleData[0].day : null;

  }

  displayedItems: any[] = [];
  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  scheduleData = [
    {
      day: 'day17',
      date: '17th Aug',
      events: [
        { name: 'Registration And Breakfast', speaker: '- Mal Practice', time: '8:30 am' },
        { name: 'Opening Remarks And Keynote', speaker: '- Aaron Ottix', time: '10:00 am' },
        { name: 'Web Accessible Designs', speaker: '- Frank Senbeans', time: '11:30 am' },
        { name: 'Building Communities', speaker: '- Ken Tucky', time: '12:30 pm' }
      ]
    },
    {
      day: 'day18',
      date: '18th Aug',
      events: [
        { name: 'reakfast', speaker: '- Mal Practice', time: '8:30 am' },
        { name: 'Opening Remarks And Keynote', speaker: '- Aaron Ottix', time: '10:00 am' },
        { name: 'Web Accessible Designs', speaker: '- Frank Senbeans', time: '11:30 am' },
        { name: 'Building Communities', speaker: '- Ken Tucky', time: '12:30 pm' }
      ]
    },
    {
      day: 'day19',
      date: '19th Aug',
      events: [
        { name: 'Registration And Breakfast', speaker: '- Mal Practice', time: '8:30 am' },
        { name: 'Opening Remarks And Keynote', speaker: '- Aaron Ottix', time: '10:00 am' },
        { name: 'Web Accessible Designs', speaker: '- Frank Senbeans', time: '11:30 am' },
        { name: 'Building Communities', speaker: '- Ken Tucky', time: '12:30 pm' }
      ]
    }
    // Add more days and events as needed
  ];


  carouselItems: any[] = [
    { title: 'The Witcher 3', description: 'Description 1', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg' },
    { title: 'RDR 2', description: 'Description 2', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg' },
    { title: 'PUBG Mobile', description: 'Description 3', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg' },
    { title: 'The Witcher 3', description: 'Description 1', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg' },
    { title: 'RDR 2', description: 'Description 2', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg' },
    { title: 'PUBG Mobile', description: 'Description 3', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg' },

  ];

  initialItemsToShow = 3;

  showSchedule(day: string) {
    this.activeDay = day;
  }


  toggleRemainingImages() {
    this.showRemaining = !this.showRemaining;

    if (this.showRemaining) {
      this.displayedItems = this.carouselItems;
    } else {
      this.displayedItems = this.carouselItems.slice(0, 3);
    }
  }





}
