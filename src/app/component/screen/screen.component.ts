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

    this.getData()
 
  }

  ngOnInit() {

    this.calculateTimeRemaining();
    this.startCountdown();

    this.startCarousel()
  }
  UserData: any[] = []
  // sessionName:any[]=[]
  // description:any[]=[]
  AgendaData: any[] = []
  location: any = {};
  start: any
  // starttime:any[]=[]
  agenda_details: any[] = []
 
  getData() {
    debugger
     
    this.auth.getbyid("event", this.id).subscribe((res: any) => {
   
      res.agenda_details.forEach((agenda_details: any) => {

        this.agenda_details.push(agenda_details.agenda_details)

      });

      this.startdate = res.basic_details.start_date
     
      res.event_banner.forEach((element: any) => {

        let data: any = environment.ImageBaseUrl + element.storage_name
      
        this.data1.push(data)


      });
 

    })
 
  }
 
  private convertToDate(dateString: string): Date | null {
    const parsedDate = new Date(dateString);

    // Check if the parsed date is a valid date
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    } else {
      console.error('Invalid date string:', dateString);
      return null;
    }
  }



  formatDate(dateString: string): string {

    const parsedDate = new Date(dateString);

    const formattedDate = this.datePipe.transform(parsedDate, 'EEE, MMM dd, yyyy HH:mm:ss');

    return formattedDate || dateString; // Return the original string if formatting fails
  }

  // const response = res.data[0].response[0];
  // this.speakerData.push(response);
  // this.UserData.push(response);
  // this.description = res.agenda_details.short_description;

  eventParticipant(data: any[]) {
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");


    const observables = data.map(iterator => {
      const filterCondition = {
        filter: [
          { clause: "AND", conditions: [{ column: "_id", operator: "EQUALS", value: iterator }] }
        ]
      };

      return this.dataservice.getDataByFilter("event_participants", filterCondition);
    });

    forkJoin(observables).subscribe((responses: any[]) => {
      responses.forEach(res => {
        const response = res.data[0].response[0];
        console.log(response);

        this.speakerData.push(response);
        this.UserData.push(response);
      });

      let dat = this.getMemberData();
      console.log(dat);

    });
  }



  type: string[] = ["TeamMember", "Speaker"];

  getMemberData() {

    return this.UserData.filter(res => {
      const userRole = res.user_role;
      return userRole && this.type.some(role => userRole.hasOwnProperty(role) && userRole[role] === true);
    });
  }



  Participant(type: any): any[] {
    return this.UserData.filter(res => res.user_role && res.user_role.hasOwnProperty(type) && res.user_role[type] === true);
  }

  getLocation(data: any) {
    if (data.location) {

    }
  }

  // Participant(type: any): any[] { 
  //   return this.event_participants.filter(res => res.user_role && res.user_role.hasOwnProperty(type) && res.user_role[type] === true);
  // }



  openDrawer(item: any): void {
    this.data = item; // Set the selected item
    this.drawer.open();
  }

  closeDrawer(): void {
    this.drawer.close();
  }
  // fun1001(){
  //   this.router.navigateByUrl('auth/register')
  // }
  routeFunction() {
    this.router.navigateByUrl(`dashboard/event-list/${this.id}`)
  }
  fun1998() {
    this.router.navigateByUrl(`/sidescreen`)
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.stopCountdown();
  }

  startCarousel() {
    this.timerSubscription = interval(3000).subscribe(() => {
      // this.showNextSlide();
    });

  }

  showNextSlide() {
    if (this.currentIndex === this.bannerImage.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.cf.detectChanges();
  }
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



  calculateTimeRemaining() {
    const currentDate = new Date();
    const timeDifference = this.targetDate.getTime() - currentDate.getTime();

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
}


// {
//   Description: 'event',
//   Location: 'teynampet',
//   _id: 'e74918dbd-bf7b-4ba6-9eeb-8e9c68d533f5',
//   address1: 'chennai',
//   companyId: 'GOK9148',
//   coordinates: { Latitude: 80.24896840000001, Longitude: 13.0384444 },
//   duration: '02:00',
//   enddate: '2023-12-31',
//   eventBanner: 
//     'https://seekers.sgp1.digitaloceanspaces.com/event/2023/11/e878bacfa-5ad2-4da3-874d-a374af748bb7/goku6.jpg',
//   eventLogo: 
//     'https://seekers.sgp1.digitaloceanspaces.com/event/2023/11/eb5b297b3-d5ee-4215-a11c-bed3f7eb1de2/2023-02-02 (1).png',
//   eventName: 'DIGITAL MARKETING 2024',
//   event_id: 'ee68316c9-5641-40fe-bda8-3d541dc49899',
//   isRegisterMandatory: false,
//   mode: 'ON',
//   opening: 80,
//   phoneNumber: '9789789789',
//   primaryContact: {
//     contactName: 'srinath',
//     email: 'sri@gmail.com',
//     phoneNumber: '6382620091',
//     role: 'SDD'
//   },
//   startdate: '2023-12-31',
//   status1: 'open',
//   time1: '23:12',
//   update_on: '2023-11-29T07:04:16.767Z'
// }





// {
//   _id: 'b692fffa-c59c-405b-83be-72fc99634521',
//   agenda_details: [
//     {
//       agenda_description: 'dsgdsgds',
//       agenda_details: {
//         session_link: 'dsgsdg',
//         session_name: 'sdgsd',
//         session_start_time: '2023-12-29T04:35:51.223Z',
//         short_description: 'gdsgds'
//       },
//       agenda_detailssession_end_time: '2023-12-29T04:35:53.871Z',
//       youtube_link: 'sdgds'
//     }
//   ],
//   basic_details: {
//     'Maximum_of_participants:': 34,
//     end_date: '2023-12-29T04:34:59.591Z',
//     location: { lat: 80.25032279999999, lng: 13.0404524 },
//     start_date: '2023-12-29T04:34:55.567Z'
//   },
//   contact_details: [
//     {
//       contact_email: 'fdsfd',
//       contact_name: 'dsdfsd',
//       phone_number: 'dsfsdfsd',
//       user_role: 'sdfsdf'
//     }
//   ],
//   created_by: 'sanjay123sanjay12@gmial.com',
//   created_on: '2023-12-29T04:35:58.387Z',
//   event_banner: [
//     {
//       _id: { Subtype: 4, Data: 'fjRCv5xSSimZCZqVJkFetg==' },
//       file_name: 'Screenshot from 2023-09-25 15-15-19__2023-12-16-16-00-45.png',
//       folder: 'event_banner',
//       ref_id: 'undefined',
//       size: 117607,
//       storage_name: 
//         'event_banner/undefined/Screenshot from 2023-09-25 15-15-19__2023-12-16-16-00-45__2023-12-29-10-05-27.png',
//       uploaded_by: 'sanjay123sanjay12@gmial.com'
//     },
//     {
//       _id: { Subtype: 4, Data: 'XS3N8eT9SLeb8DtVx+YdTA==' },
//       file_name: 'Screenshot from 2023-11-17 16-19-02__2023-11-22-19-10-44.png',
//       folder: 'event_banner',
//       ref_id: 'undefined',
//       size: 139096,
//       storage_name: 
//         'event_banner/undefined/Screenshot from 2023-11-17 16-19-02__2023-11-22-19-10-44__2023-12-29-10-05-27.png',
//       uploaded_by: 'sanjay123sanjay12@gmial.com'
//     }
//   ],
//   event_description: 'dfgfgfdg',
//   event_image: {
//     _id: { Subtype: 4, Data: 'tPGINrsLTz+Ude24CR1eMw==' },
//     file_name: 'HD-wallpaper-asta-anime-black-black-clover-demon.jpg',
//     folder: 'event_logo',
//     ref_id: 'undefined',
//     size: 75197,
//     storage_name: 
//       'event_logo/undefined/HD-wallpaper-asta-anime-black-black-clover-demon__2023-12-29-10-05-14.jpg',
//     uploaded_by: 'sanjay123sanjay12@gmial.com'
//   },
//   event_mode: 'online',
//   event_name: 'fsdf',
//   event_participants: [ { Subtype: 4, Data: 'HtxM0q4ARDuIjEo45fyrfA==' } ]
// }