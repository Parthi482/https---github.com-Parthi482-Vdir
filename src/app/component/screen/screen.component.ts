import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor'; 
import { Subscription, forkJoin, interval } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {



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
   id:any
   companyData: any;
   latlong: any;
   currentIndex = 0;
   timerSubscription!: Subscription
   docBasePath: string=environment?.ImageBaseUrl
   bannerImage: string[] = [];
   eventlogo:any; 
   event_participants:any[]=[]


   speakerData:any[]=[];
   TeammemberData:any[]=[];
   Delegates:any[]=[];
  constructor(private datePipe: DatePipe,private dataservice: DataService,private route:ActivatedRoute, private router: Router, private fb: FormBuilder,private cf: ChangeDetectorRef,) {
    this.route.params.subscribe((params) => {
     console.log(params["id"]);
     this.id=params["id"]
    //  this.event_participant()
      
    });

  }
  
  ngOnInit(){
     
    this.getData()



  this.startCarousel()
}
UserData:any[]=[]
// Agenda:any[]=[]
// sessionName:any[]=[]
// description:any[]=[]
AgendaData:any[]=[]
location:any={};
start:any
// starttime:any[]=[]
getData(){
  this.dataservice.getDataById("event",this.id).subscribe((res:any)=>{
       
    let response = res.data[0]
    this.data = response
 
      let startstring = this.data.basic_details.start_date
    this.start= this.datePipe.transform(startstring, 'yyyy-MM-dd');


    let bannerImages = response.event_banner.map((event: any) => {
      return event.storage_name;
  }); 

  this.bannerImage.push(...bannerImages);

  this.eventlogo = this.data.event_image.storage_name
    this.getLocation(this.data.basic_details)
  this.eventParticipant(this.data.event_participants)



  this.data.agenda_details.forEach((res: any) => {
    // Format the session_start_time
  
    
    let dateString = res.agenda_details.session_start_time;
    // let formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss');
    let formattedDate = this.formatDate(dateString);
    // this.location= res.basic_details.location
 
 
    
    this.AgendaData.push({
      session_name: res.agenda_details.session_name,
      agenda_description: res.agenda_description,
      session_start_time: formattedDate   
    });
  });

  // basic_details
//agenda_details.session_start_time

 


  // this.sessionName = this.data.ag
  console.warn(this.AgendaData);
  
  // this.Agenda.push(this.data.agenda_details)
  })
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
      this.speakerData.push(response);
      this.UserData.push(response);
    });

  let dat =  this.getMemberData();
  console.log(dat);
  
  });
}
type: string[] = ["TeamMember", "Speaker"];

getMemberData() {
  console.log(this.UserData);

  return this.UserData.filter(res => {
    const userRole = res.user_role;
    return userRole && this.type.some(role => userRole.hasOwnProperty(role) && userRole[role] === true);
  });
}



  Participant(type: any): any[] { 
    return this.UserData.filter(res => res.user_role && res.user_role.hasOwnProperty(type) && res.user_role[type] === true);
  }

getLocation(data :any){
  if (data.location){

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
  routeFunction(){
    this.router.navigateByUrl(`dashboard/event-list/${this.id}`)
  }
  fun1998(){
    this.router.navigateByUrl(`/sidescreen`)
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startCarousel() {
    this.timerSubscription = interval(3000).subscribe(() => {
      this.showNextSlide();
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

  
}
