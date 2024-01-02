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
  console.log("Insert");
  
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
//   "Description": "event",
//   "Location": "teynampet",
//   "_id": "e74918dbd-bf7b-4ba6-9eeb-8e9c68d533f5",
//   "address1": "chennai",
//   "companyId": "GOK9148",
//   "coordinates": {
//       "Latitude": 80.24896840000001,
//       "Longitude": 13.0384444
//   },
//   "duration": "02:00",
//   "enddate": "2023-12-31",
//   "eventBanner": "https://seekers.sgp1.digitaloceanspaces.com/event/2023/11/e878bacfa-5ad2-4da3-874d-a374af748bb7/goku6.jpg",
//   "eventLogo": "https://seekers.sgp1.digitaloceanspaces.com/event/2023/11/eb5b297b3-d5ee-4215-a11c-bed3f7eb1de2/2023-02-02 (1).png",
//   "eventName": "DIGITAL MARKETING 2024",
//   "event_id": "ee68316c9-5641-40fe-bda8-3d541dc49899",
//   "isRegisterMandatory": false,
//   "mode": "ON",
//   "opening": 80,
//   "phoneNumber": "9789789789",
//   "primaryContact": {
//       "contactName": "srinath",
//       "email": "sri@gmail.com",
//       "phoneNumber": "6382620091",
//       "role": "SDD"
//   },
//   "startdate": "2023-12-31",
//   "status1": "open",
//   "time1": "23:12",
//   "update_on": "2023-11-29T07:04:16.767Z"
// }