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
  Banner_data:any[]=[];
  data:any;
  about:any
  docBasePath: string = environment?.ImageBaseUrl 
  
  carouselData = [
    '../../assets/image/11557.jpg',
    '../../assets/image/another-image.jpg',
  ];


  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private dataservice:DataService) {
    this.route.params.subscribe((res: any) => { 
      this.getData(res.id)
    })
    this.image = "../src/assets/image/11557.jpg"
    this.displayedItems = this.carouselItems.slice(0, 3);
    this.activeDay = this.scheduleData.length > 0 ? this.scheduleData[0].day : null; 
  
  }
 
  ngOnInit(): void {
    // this.data.event_banner.map((res:any) => {
    //     console.log(res);
        
    // });  
    this.startCarousel();
  }

  getData(id:any){ 
    this.dataservice.getDataById("event",id).subscribe((res:any)=>{ 
      // this.about  = "jjj"
      console.log(res);
      
      if (res.data && res.data.length > 0 && res.data[0]) {
        this.data = res.data[0];
console.log("sss");
this.about  = this.data.event_description
        this.data.event_banner.forEach((bannerimage:any) => {
          
          this.Banner_data.push(bannerimage);
        }); 
        
        
        console.log(this.about);
        
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


  startCarousel() {
    // Change the current index at regular intervals (e.g., every 3 seconds)
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.Banner_data.length;
    }, 3000);  // Adjust the interval (in milliseconds) according to your needs
  }





}



// {
//   _id: 'e16a37c0-af62-4f33-b9fd-db642e1b80cc',
//   agenda_details: [
//     {
//       agenda_description: 
//         '<ol><li>dsfdsfdsfsdfsdf</li></ol><ul><li>fdsfsdfdsf</li></ul><span>sdfdsfdsf</span><br><div><span>fdsfdsf</span></div><div><ol><li><span>fdsfsd</span></li><li><span>dsfsdf</span></li><li><span>dsfdsf</span></li><li><span>dsfsdfsd</span></li><li><span>fsdfdsf vxvxvdsbf</span></li></ol></div>',
//       agenda_details: {
//         session_name: 'sdgsd',
//         session_start_time: '2023-12-29T16:35:51.223Z',
//         short_description: 'gdsgds'
//       },
//       agenda_detailssession_end_time: '2023-12-29T16:35:53.871Z'
//     },
//     {
//       agenda_description: 
//         'sdgsdggdcvxv<div>vcxxcvsgvxcxcv</div><div>sdgdsv vdsdvsd</div>',
//       agenda_details: {
//         session_link: 'sdgsdg',
//         session_name: 'sdgdsg',
//         session_start_time: '2023-12-29T04:37:11.661Z',
//         short_description: 'gsddsgdsgsd'
//       },
//       agenda_detailssession_end_time: '2023-12-29T04:37:13.695Z',
//       youtube_link: 'dsgsdgsdg'
//     }
//   ],
//   basic_details: {
//     'Maximum_of_participants:': 'asdsad',
//     end_date: '2023-12-28T08:25:56.361Z',
//     location: { lat: 34.78176759999999, lng: 32.0852999 },
//     start_date: '2023-12-28T08:25:54.397Z'
//   },
//   contact_details: [
//     {
//       contact_email: 'dsfdsf',
//       contact_name: 'sdfsdf',
//       phone_number: 'fsdfdsfsd',
//       user_role: 'sdfsd'
//     }
//   ],
//   created_by: 'sanjay123sanjay12@gmial.com',
//   created_on: '2023-12-28T08:26:42.799Z',
//   
//   event_description: 'sadsad',
//   event_image: {
//     _id: { Subtype: 4, Data: 'wZdCWiGpTrSrLkBKhLvkXg==' },
//     file_name: 'HD-wallpaper-asta-anime-black-black-clover-demon.jpg',
//     folder: 'event_logo',
//     ref_id: 'undefined',
//     size: 75197,
//     storage_name: 
//       'event_logo/undefined/HD-wallpaper-asta-anime-black-black-clover-demon__2023-12-28-13-56-08.jpg',
//     uploaded_by: 'sanjay123sanjay12@gmial.com'
//   },
//   event_mode: 'offline',
//   event_name: 'sdasada',
//   event_participants: [
//     'd6339f5a-c2ae-4288-b6ea-67380f87bdef', '452231df-c1ce-4327-a734-7a909b2c9657'
//   ]
// }