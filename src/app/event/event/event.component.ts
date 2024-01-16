import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import  'owl.carousel'; 

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements AfterViewInit {
 
image:any
carouselData = [
  '../../assets/image/11557.jpg',
  '../../assets/image/another-image.jpg', 
];


    constructor(private el: ElementRef, private renderer: Renderer2) {
      this.image = "../src/assets/image/11557.jpg"
    }

    ngAfterViewInit() {
      // this.initOwlCarousel();
      // this.setupItemClickHandler();
    }
    carouselItems = [
      { title: 'The Witcher 3', description: 'Description 1', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg' },
      { title: 'RDR 2', description: 'Description 2', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg' },
      { title: 'PUBG Mobile', description: 'Description 3', imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg' },
      // Add more items if needed
    ];
  
    initialItemsToShow = 3;
    activeDay: string = 'day17';

    // Function to update the active day
    showSchedule(day: string) {
      this.activeDay = day;
    }
    
}
