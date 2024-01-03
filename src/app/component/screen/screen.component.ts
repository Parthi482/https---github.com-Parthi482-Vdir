import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription, forkJoin, interval } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  name = 'Angular';
  public isCollapsed = true; 


  navigate() {
    this.router.navigate(['/event-details'])
  }

  panelOpenState = false;

  @ViewChild('drawer') drawer!: MatDrawer;
  data: any;
  details: any;
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
  companyData: any;
  latlong: any;
  currentIndex = 0;
  timerSubscription!: Subscription
  docBasePath: string = environment?.ImageBaseUrl
  bannerImage: string[] = [];
  startdate: any
  eventlogo: any;
  event_participants: any[] = []
  //  targetDate:any
 targetDate: Date = new Date('2024-01-05');

  timeRemaining: number | null = null;
  days: number | null = null;
  hours: number | null = null;
  minutes: number | null = null;
  seconds: number | null = null;
 
  private countdownSubscription: Subscription | undefined;
  data1: any[] = []

  speakerData: any[] = [];
  TeammemberData: any[] = [];
  Delegates: any[] = [];
  constructor(private datePipe: DatePipe, private auth: ApiService, private dataservice: DataService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cf: ChangeDetectorRef,) {
    this.route.params.subscribe((params) => {
      this.id = params["id"]
      //  this.event_participant()

    });

    // this.getData()
 
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


  ngOnInit() {

    // this.calculateTimeRemaining();
    // this.startCountdown();

    // this.startCarousel()
  }



  // currentIndex = 0;
 

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
 
  // getData() {
  //   debugger
     
  //   this.auth.getbyid("event", this.id).subscribe((res: any) => {
   
  //     res.agenda_details.forEach((agenda_details: any) => {

  //       this.agenda_details.push(agenda_details.agenda_details)

  //     });

  //     this.startdate = res.basic_details.start_date
     
  //     res.event_banner.forEach((element: any) => {

  //       let data: any = environment.ImageBaseUrl + element.storage_name
      
  //       this.data1.push(data)


  //     });
 

  //   })
 
  // }
 
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

//   ngOnDestroy() {
//     if (this.timerSubscription) {
//       this.timerSubscription.unsubscribe();
//     }
//     this.stopCountdown();
//   }

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
//   startCountdown() {
//     this.countdownSubscription = interval(1000).subscribe(() => {
//       this.calculateTimeRemaining();
//     });
//   }

//   stopCountdown() {
//     if (this.countdownSubscription) {
//       this.countdownSubscription.unsubscribe();
//     }
//   }



//   calculateTimeRemaining() {
//     const currentDate = new Date();
//     const timeDifference = this.targetDate.getTime() - currentDate.getTime();

//     if (timeDifference > 0) {
//       this.timeRemaining = timeDifference / 1000;

//       this.days = Math.floor(this.timeRemaining / 86400);
//       this.hours = Math.floor((this.timeRemaining % 86400) / 3600);
//       this.minutes = Math.floor((this.timeRemaining % 3600) / 60);
//       this.seconds = Math.floor(this.timeRemaining % 60);
//     } else {
//       this.timeRemaining = this.days = this.hours = this.minutes = this.seconds = null;
//     }
//   }
}
 