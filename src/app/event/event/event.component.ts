import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
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
  currentIndex = 0;
  displayedItems: any[] = [];
  Banner_data: any[] = [];
  data: any;
  about: any
  docBasePath: string = environment?.ImageBaseUrl
  id: any
  event_participants: any[] = []
  carouselData = [
    '../../assets/image/11557.jpg',
    '../../assets/image/another-image.jpg',
  ];


  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private dataservice: DataService) {

    this.route.children.forEach((res: any) => {

      if (res.params._value.id) this.getData(res.params._value.id)

    })
   
    // this.image = "../src/assets/image/11557.jpg"
    this.activeDay = this.scheduleData.length > 0 ? this.scheduleData[0].day : null;

  }

  ngOnInit(): void {
    this.displayedItems = this.event_participants
    this.startCarousel();
  }

  getData(id: any) {


    this.dataservice.getDataById("event", id).subscribe((res: any) => {

      if (res.data && res.data.length > 0 && res.data[0]) {
        this.data = res.data[0]
        this.about = this.data.event_description
        this.data.event_banner.forEach((bannerimage: any) => {

          this.Banner_data.push(bannerimage);
        });



        this.data.event_participants.forEach((event_participants: any) => {

          this.dataservice.getDataById("event_participants", event_participants).subscribe((res: any) => {

            res.data.forEach((element: any) => {
              this.event_participants.push(element)
            });

          })
        });

      }
    })
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




  initialItemsToShow = 3;

  showSchedule(day: string) {
    this.activeDay = day;
  }


  toggleRemainingImages() {
    this.showRemaining = !this.showRemaining;

    if (this.showRemaining) {
      console.log("If ");

      this.displayedItems = this.event_participants;
    } else {
      console.log('else');

      this.displayedItems = this.event_participants.slice(0, 3);
    }
  }


  startCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.Banner_data.length;
    }, 3000);
  }





}

