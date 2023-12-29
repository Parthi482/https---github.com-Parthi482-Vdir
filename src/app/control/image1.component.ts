import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-images',
  template:`
  <style>

.card:hover{
  cursor: pointer;
}

.card-body {

  top: 0px;
  position: relative;

  background-color: #ffffff;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #ffffff;
}

.card-body:hover {
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -4px;
  border: 1px solid #ffffff;
  background-color: white;
}

.card-body:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background:var(--main-color);
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 0.15s ease-out;
}

.card-body:hover:before {
  transform: scale(2.15);
}
  </style>
  <div class="card-body" (click)="my(event)"  style="background-image: url({{bannerImage}});height:400px;
   background-repeat: no-repeat;background-size: cover;">
<div class="text-center" style="float: left;margin-top: 10vh" >
  <img *ngIf="eventLogo" class="img-thumbnail"  [src]="eventLogo" alt="Event Logo" style="width: 200px; height: 200px;background-color:var(--main-color)">
</div>
<div class="card" style="opacity: 0.7;  justify-content: end;width: 200px;float: right;margin-top: 10vh ">
  <div class="card-body">
    <div style="display: flex; flex-direction: column; align-items: flex-end;">
      <div style="font-size: 15px; font-weight: bold;">{{event.basic_details.event_name}}</div>
      <h3 class="card-subtitle text-center">{{ event.startdate }}</h3>
      <h4 class="card-text text-center">{{ event.time1 }}</h4>
      <div style="font-size: 16px; color: black;">
      <i class="fas fa-map-marker-alt"  style="color:var(--main-color)"></i>
        {{event.Address}}
      </div>
    </div>
  </div>
</div>
</div>`
})
export class Image1Component {
@Input('EventID') EventID:any={};
@Input('height') height:any;
@Input('width') width:any;
event:any
eventLogo:any
bannerImage:any
constructor( private router:Router) {
}
docBasePath: string=environment?.ImageBaseUrl

ngOnInit() {
  this.width = this.width ?? 800;
  this.height = this.height ?? 900;

  console.log(this.EventID);
  const { event_image, event_banner } = this.EventID;
  this.event = this.EventID;
  this.eventLogo = `${this.docBasePath}${event_image?.storage_name}`;

  if (event_banner && event_banner.length > 0) {
    const firstBannerImage = event_banner[0].storage_name;
    this.bannerImage = `${this.docBasePath}${firstBannerImage}`;
    // console.warn(this.bannerImage);
  }
  console.warn(this.event.basic_details.event_name);
  
}

my(abc:any){
console.log(abc);
console.log(abc._id);
  let _id=abc._id.replace(/ /g, "-");
console.log(_id);
    // this.router.navigateByUrl('/'+EventName)
    this.router.navigate(["event-details/"+_id])

}
} 

// {
//   _id: '97e742d3-9f06-4225-afab-8b9db0f84119',
//   agenda_details: [
//     {
//       agenda_description: 'sdgsdgsdg',
//       agenda_details: {
//         agenda_mode: 'online',
//         session_link: 'sdgsdg',
//         session_name: 'fgdg',
//         session_start_time: '2023-12-27T07:51:32.833Z',
//         short_description: 'fdgfdg'
//       },
//       agenda_detailssession_end_time: '2023-12-27T07:51:36.354Z',
//       youtube_link: 'sdgsdg'
//     }
//   ],
//   basic_details: {
//     'Maximum_of_participants:': '46',
//     end_date: '2023-12-27T07:50:54.970Z',
//     event_name: 'vdv',
//     is_mandatory: true,
//     meeting_link: 'vsdv',
//     start_date: '2023-12-27T07:50:40.858Z'
//   },
//   contact_details: [
//     {
//       contact_email: 'dfbfdb',
//       contact_name: 'dfbdfb',
//       phone_number: 'dfbdfbdf',
//       user_role: 'dfbdf'
//     }
//   ],
//   created_by: 'sanjay123sanjay12@gmial.com',
//   created_on: '2023-12-27T07:51:42.824Z',
//   event_banner: [
//     {
//       _id: '09e6fe17c42346328ea1152bb7111efa',
//       file_name: 'Screenshot from 2023-09-25 15-15-19__2023-12-16-16-00-45.png',
//       folder: 'event_banner',
//       ref_id: 'undefined',
//       size: 117607,
//       storage_name: 
//         'event_banner/undefined/Screenshot from 2023-09-25 15-15-19__2023-12-16-16-00-45__2023-12-27-13-21-08.png',
//       uploaded_by: 'sanjay123sanjay12@gmial.com'
//     },