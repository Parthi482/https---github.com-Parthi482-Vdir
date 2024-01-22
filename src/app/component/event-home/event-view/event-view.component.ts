import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {
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
  initialItemsToShow = 3;
  agenda_data:any[]=[]
  scheduleData:any = [
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
  ];

  constructor(private route: ActivatedRoute, private dataservice: DataService,private datePipe: DatePipe) {
   
    this.route.params.forEach((res:any)=>{

      if (res.id) this.getData(res.id)

    })

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
        // todo event_banner image
        this.data.event_banner.forEach((bannerimage: any) => {

          this.Banner_data.push(bannerimage);
        });
        // todo event_participants data get 
        this.data.event_participants.forEach((event_participants: any) => {
          this.dataservice.getDataById("event_participants", event_participants).subscribe((res: any) => {
            res.data.forEach((element: any) => {
              this.event_participants.push(element)
            });

          })
        });
 
 
        let session_start_time = '2024-01-11T13:16:34.000Z';
        let formatTime =  this.formatTime(session_start_time);
       
        this.data.agenda_details.forEach((res:any)=>{
         res.agenda_details.session_start_time = formatTime 
         res["date"] = this.formatDate(session_start_time)
        
         this.scheduleData.push(res)
        })
           
      }
    })
  }


  private formatTime(timestamp: string): any {
    const date = new Date(timestamp);
    return this.datePipe.transform(date, 'h:mm a');
  }


  private formatDate(timestamp: string): any {
    const date = new Date(timestamp);
    return this.datePipe.transform(date, 'MMM dd');
  }

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
