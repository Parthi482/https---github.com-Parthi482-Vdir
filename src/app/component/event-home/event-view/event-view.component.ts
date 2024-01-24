import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash';
import { Subscription, forkJoin, interval } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';
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
  agenda_data: any[] = []
  CurrentBannerData: any[] = []
  scheduleData: any = [
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
  imageList: SafeUrl[] = [];
  timerSubscription!: Subscription
  ActiveUser: boolean = false
  userData: any

  constructor(private dataService: DataService,private cf : ChangeDetectorRef,private auth: ApiService, public authService: AuthService, private route: ActivatedRoute, private dataservice: DataService, private datePipe: DatePipe) {

    this.route.params.forEach((res: any) => {

      if (res.id) this.getData(res.id)

    })

    this.activeDay = this.scheduleData.length > 0 ? this.scheduleData[0].day : null;
    this.userData = this.auth.getdetails()

    if (!isEmpty(this.userData)) {
      this.ActiveUser = true
    }
  }

  ngOnInit(): void {
    this.displayedItems = this.event_participants 
    this.cf.detectChanges()

    this.startCarousel();
  }

  getData(id: any) {
    this.dataservice.getDataById("event", id).subscribe((res: any) => {
      if (res.data && res.data.length > 0 && res.data[0]) {
        const data = res.data[0];
        this.data = data;
        this.about = data.event_description;
        
        // todo event_banner image
        this.imageList = data.event_banner.map((bannerimage: any) => bannerimage.storage_name); 
        data["Start_date"] = this.datePipe.transform(data.basic_details.start_date, 'MMM dd yyyy');;
        this.CurrentBannerData.push(data);
  
        // todo event_participants data get 
        const participantObservables = data.event_participants.map((event_participants: any) => {
          return this.dataservice.getDataById("event_participants", event_participants);
        });
  
        forkJoin(participantObservables).subscribe((participantsResponses: any) => {
          participantsResponses.forEach((response: any) => {
            this.event_participants.push(...response.data);
          });
        });
  
        const session_start_time = '2024-01-11T13:16:34.000Z';
        const formatTime = this.formatTime(session_start_time);
  
        this.data.agenda_details.forEach((agendaDetails: any) => {
          agendaDetails.session_start_time = formatTime;
          agendaDetails["date"] = this.formatDate(session_start_time);
          this.scheduleData.push(agendaDetails);
        });
      }
    });
  }
  

  private formatDate1(timestamp: any): any {
    // const date = new Date(timestamp);
    return this.datePipe.transform(timestamp, 'MMM dd yyyy');
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

      this.displayedItems = this.event_participants;
    } else { 
      this.displayedItems = this.event_participants.slice(0, 3);
    }
  }

  //  todo Mail Api 
  SendEmail(data?: any) {

    alert("Thank Your For Register")
    this.dataService.SendEmailForEvent(this.userData.email).subscribe((res:any)=>{         
    }) 
  }
  startCarousel() {

    this.timerSubscription = interval(3000).subscribe(() => {
      this.showNextSlide();
    });
  }

  showNextSlide() {
    if (this.currentIndex === this.imageList.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
      // this.GetCurrentBannerData() 
    }
  }


}
