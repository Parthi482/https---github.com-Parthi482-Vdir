import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription, forkJoin, interval, of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit,OnDestroy {
  name = 'Angular';
  public isCollapsed = true; 
  AgendaData: any[] = []

  navigate() {
   if(!localStorage.getItem('auth')){
    // console.log( localStorage.getItem('auth'));
    this.router.navigate(['/auth/login'])
   }



  }

  // {"_id":"6586dda94d1925131f6ad122","createdOn":"2023-12-23T13:16:24.815Z","email":"parthiban@kriyatec.com","isActive":true,"isProfileCompleted":false,"mobile_number":null,"role":"user","userId":"WSGJvqBUEPQXlP2KKU1mv28Za2g2","user_name":"Parthiban U","user_photo":"https://lh3.googleusercontent.com/a/ACg8ocLhESVk5SxkN5-fDN0fYEW6J1hxDcgGrBTYcrShzx1HiA=s96-c","user_type":""}

















  panelOpenState = false;

  @ViewChild('drawer') drawer!: MatDrawer;
  // data: any;
  // details: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '130px',
    spellcheck: true,
    translate: 'yes',
    fonts: [
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' }
    ],
    toolbarHiddenButtons: [
      ['customClasses', 'insertImage', 'insertVideo', 'removeFormat', 'underline', 'heading', 'insertHorizontalRule', 'link', 'insertOrderedList',
        'toggleEditorMode', 'bold', 'italic', 'strikeThrough', 'backgroundColor', 'textColor', 'textColor', 'unlink', 'fontSize']
    ]
  };
  id: any
  // companyData: any;
  // latlong: any;
  currentIndex = 0;
  timerSubscription!: Subscription
  docBasePath: string = environment?.ImageBaseUrl
  // bannerImage: string[] = [];
  // startdate: any
  // eventlogo: any;
  // event_participants: any[] = []
  //  targetDate:any
 targetDate: Date = new Date('2024-01-05');

  timeRemaining: number | null = null;
  days: number | null = null;
  hours: number | null = null;
  minutes: number | null = null;
  seconds: number | null = null;
 
  private countdownSubscription: Subscription | undefined;
  // data1: any[] = []
  DocImagePAth: any = environment.ImageBaseUrl;
  // speakerData: any[] = [];
  // TeammemberData: any[] = [];
  // Delegates: any[] = [];
  constructor(private datePipe: DatePipe, private auth: ApiService, private dataservice: DataService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cf: ChangeDetectorRef,) {
    this.route.params.subscribe((params) => {
      this.id = params["id"]
      //  this.event_participant()

    });

    this.getData()
 
  }

  days1 = [
    {
      title: 'Day 1. February 12, 2019',
      sessions: [
        { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
       
      ]
    },
    {
      title: 'Day 2. February 13, 2019',
      sessions: [
        { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
         
      ]
    }
 ];
 
 slickCarouselConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000
};

cards = [
  {
    title: 'Day 1. February 12, 2019',
    image:'event_logo/undefined/HD-wallpaper-asta-anime-black-black-clover-demon__2023-12-29-10-05-14.jpg',
    sessions: [
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
     
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
    ]
  },
  {
    title: 'Day 2. February 13, 2019',
    image:'event_logo/undefined/HD-wallpaper-asta-anime-black-black-clover-demon__2023-12-29-10-05-14.jpg',
    sessions: [
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
    ]
  },
  {
    title: 'Day 2. February 13, 2019',
    image:'event_logo/undefined/HD-wallpaper-asta-anime-black-black-clover-demon__2023-12-29-10-05-14.jpg',
    sessions: [
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
      { time: '08:00 AM - 09:00 AM', title: 'Grand Opening', host: 'Michael Smith - Marketing ING CEO' },
       
    ]
  } 
  
];

cardRows = this.chunkArray(this.cards, 3);

chunkArray(array: any[], size: number): any[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}








  ngOnInit() {

    this.calculateTimeRemaining();
    this.startCountdown();

    // this.startCarousel()
  }
 

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.days1.length;
  }

  showPrevious() {
    this.currentIndex = (this.currentIndex - 1 + this.days1.length) % this.days1.length;
  }

  // UserData: any[] = []
  // // sessionName:any[]=[]
  // // description:any[]=[]
  // AgendaData: any[] = []
  // location: any = {};
  // start: any
  // // starttime:any[]=[]
  // agenda_details: any[] = []
  event_basic:any[]=[]
  startdate:any
  SpeakerData:any[]=[]
  participantNumber:any[]=[]
  EventImages:any[]=[]
  async getData() {
    this.auth.getbyid("event", this.id).subscribe((res: any) => {
 
      // basic Data 

      this.startdate = res.basic_details.start_date
      
      this.event_basic.push(res)
      res.event_banner.forEach((event_banner:any) => {
              
      this.EventImages.push(event_banner)

      });

      res.event_participants.forEach((elements:any) => { 
        
        this.auth.getbyid("event_participants",elements).subscribe((event_participants:any)=>{
    
        const participant =  event_participants.user_role
 
          if (participant.Speaker == true){
            this.SpeakerData.push(event_participants)
            let userData ={
              participant:res.event_participants.length,
              speaker:res.event_participants.length,
            }
            this.participantNumber.push(userData)
          }

        })
      });

      // Agenda
      res.agenda_details.forEach((agenda: any) => {
        this.AgendaData.push(agenda);
      });
      for (let iterator of this.AgendaData) {
        console.log(iterator);
        // Perform additional operations with the data
        const sessionStartTime = new Date(iterator.session_start_time);
  
        // Format the Date object
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(sessionStartTime);
         
          this.startDate.push(formattedDate)
    
      }







      // this.processData();
    });
  }
  startDate:any[]=[]
  // Function to process data (can be customized based on your requirements)
  processData() {
    for (let iterator of this.AgendaData) {
      console.log(iterator);
      // Perform additional operations with the data
      const sessionStartTime = new Date(iterator.session_start_time);

      // Format the Date object
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(sessionStartTime);
      console.log(formattedDate);
        this.startDate.push(formattedDate)
  
    }




  





  }
  
  // this.auth.getbyid("event", this.id).subscribe((res: any) => {
 
  //   res.agenda_details.forEach((agenda_details: any) => {

  //     this.agenda_details.push(agenda_details.agenda_details)

  //   });

  //   this.startdate = res.basic_details.start_date
   
  //   res.event_banner.forEach((element: any) => {

  //     let data: any = environment.ImageBaseUrl + element.storage_name
    
  //     this.data1.push(data)


  //   });


  // })
 
  // private convertToDate(dateString: string): Date | null {
  //   const parsedDate = new Date(dateString);

  //   // Check if the parsed date is a valid date
  //   if (!isNaN(parsedDate.getTime())) {
  //     return parsedDate;
  //   } else {
  //     console.error('Invalid date string:', dateString);
  //     return null;
  //   }
  // }



  // formatDate(dateString: string): string {

  //   const parsedDate = new Date(dateString);

  //   const formattedDate = this.datePipe.transform(parsedDate, 'EEE, MMM dd, yyyy HH:mm:ss');

  //   return formattedDate || dateString; // Return the original string if formatting fails
  // }

  // const response = res.data[0].response[0];
  // this.speakerData.push(response);
  // this.UserData.push(response);
  // this.description = res.agenda_details.short_description;

  // eventParticipant(data: any[]) {
  //   console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");


  //   const observables = data.map(iterator => {
  //     const filterCondition = {
  //       filter: [
  //         { clause: "AND", conditions: [{ column: "_id", operator: "EQUALS", value: iterator }] }
  //       ]
  //     };

  //     return this.dataservice.getDataByFilter("event_participants", filterCondition);
  //   });

  //   forkJoin(observables).subscribe((responses: any[]) => {
  //     responses.forEach(res => {
  //       const response = res.data[0].response[0];
  //       console.log(response);

  //       this.speakerData.push(response);
  //       this.UserData.push(response);
  //     });

  //     let dat = this.getMemberData();
  //     console.log(dat);

  //   });
  // }



  // type: string[] = ["TeamMember", "Speaker"];

  // getMemberData() {

  //   return this.UserData.filter(res => {
  //     const userRole = res.user_role;
  //     return userRole && this.type.some(role => userRole.hasOwnProperty(role) && userRole[role] === true);
  //   });
  // }



  // Participant(type: any): any[] {
  //   return this.UserData.filter(res => res.user_role && res.user_role.hasOwnProperty(type) && res.user_role[type] === true);
  // }

  // getLocation(data: any) {
  //   if (data.location) {

  //   }
  // }

  // Participant(type: any): any[] { 
  //   return this.event_participants.filter(res => res.user_role && res.user_role.hasOwnProperty(type) && res.user_role[type] === true);
  // }



  // openDrawer(item: any): void {
  //   this.data = item; // Set the selected item
  //   this.drawer.open();
  // }

  // closeDrawer(): void {
  //   this.drawer.close();
  // }
  // fun1001(){
  //   this.router.navigateByUrl('auth/register')
  // }
//   routeFunction() {
//     this.router.navigateByUrl(`dashboard/event-list/${this.id}`)
//   }
//   fun1998() {
//     this.router.navigateByUrl(`/sidescreen`)
//   }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.stopCountdown();
  }

//   startCarousel() {
//     this.timerSubscription = interval(3000).subscribe(() => {
//       // this.showNextSlide();
//     });

//   }

//   showNextSlide() {
//     if (this.currentIndex === this.bannerImage.length - 1) {
//       this.currentIndex = 0;
//     } else {
//       this.currentIndex++;
//     }
//     this.cf.detectChanges();
//   }
  startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.calculateTimeRemaining();
    });
  }

  stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  
  show:boolean = false;
  calculateTimeRemaining() {
 
    const startDate = new Date(this.startdate);
    const currentDate = new Date();
    if ( currentDate < startDate){
      this.show = true
    }

    const timeDifference = startDate.getTime() - currentDate.getTime();
  
    if (timeDifference > 0) {
      this.timeRemaining = timeDifference / 1000;
  
      this.days = Math.floor(this.timeRemaining / 86400);
      this.hours = Math.floor((this.timeRemaining % 86400) / 3600);
      this.minutes = Math.floor((this.timeRemaining % 3600) / 60);
      this.seconds = Math.floor(this.timeRemaining % 60);
    } else {
      this.timeRemaining = this.days = this.hours = this.minutes = this.seconds = null;
    }
  }
  

  // calculateTimeRemaining() {
  //   const currentDate = new Date();
  //   const timeDifference = this.targetDate.getTime() - currentDate.getTime();

  //   if (timeDifference > 0) {
  //     this.timeRemaining = timeDifference / 1000;

  //     this.days = Math.floor(this.timeRemaining / 86400);
  //     this.hours = Math.floor((this.timeRemaining % 86400) / 3600);
  //     this.minutes = Math.floor((this.timeRemaining % 3600) / 60);
  //     this.seconds = Math.floor(this.timeRemaining % 60);
  //   } else {
  //     this.timeRemaining = this.days = this.hours = this.minutes = this.seconds = null;
  //   }
  // }
}
 