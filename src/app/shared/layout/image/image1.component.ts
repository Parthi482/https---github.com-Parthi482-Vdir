import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/search.service';
import { environment } from 'src/environments/environment';

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
  
  <div class="card-body" (click)="my($event)" style="background-image: url('https://pms-api.sgp1.digitaloceanspaces.com/event_banner/undefined/Screenshot from 2023-11-17 16-19-02__2023-11-22-19-10-44__2023-12-29-10-05-27.png'); height: 400px; background-repeat: no-repeat; background-size: cover;">
  
<div class="text-center" style="float: left;margin-top: 10vh" >
<!-- <br>
{{event | json }}
<br> -->
  <img class="img-thumbnail"  [src]="DocImagePAth+ event.event_image.storage_name" alt="Event Logo" style="width: 200px; height: 200px;background-color:var(--main-color)">
</div>
<div class="card" style="opacity: 0.7;  justify-content: end;width: 200px;float: right;margin-top: 10vh ">
  <div class="card-body">
    <div style="display: flex; flex-direction: column; align-items: flex-end;">
      <div style="font-size: 15px; font-weight: bold;">{{event.event_name}}</div>
      <h3 class="card-subtitle text-center">{{ event.basic_details.start_date }}</h3>
      
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
bannerimage:any
DocImagePAth: any = environment.ImageBaseUrl;

constructor(private auth: ApiService,private router:Router) {
}
navigate(data:any){
  console.log(data);
  
}
ngOnInit() {
  this.width=this.width? this.width : 800;
  this.height=this.height? this.height : 900; 

  this.event=this.EventID;
  this.event.event_banner.forEach((element:any) => {
    
    this.bannerimage =  this.DocImagePAth +element.storage_name



  });
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
//   "_id": "52c702c3-c4a3-4794-ba29-a5b464e50728",
//   "agenda_details": [
//       {
//           "agenda_description": "dbbsd",
//           "agenda_details": {
//               "session_link": "sbd",
//               "session_name": "sbd",
//               "session_start_time": "2023-12-29T05:01:00.203Z",
//               "short_description": "sbd"
//           },
//           "agenda_detailssession_end_time": "2023-12-29T05:01:01.994Z",
//           "youtube_link": "dsb"
//       }
//   ],
//   "basic_details": {
//       "Maximum_of_participants:": "sc",
//       "end_date": "2023-12-29T05:00:28.617Z",
//       "location": {
//           "lat": -99.9018131,
//           "lng": 31.9685988
//       },
//       "start_date": "2023-12-29T05:00:26.905Z"
//   },
//   "contact_details": [
//       {
//           "contact_email": "sdb",
//           "contact_name": "dsb",
//           "phone_number": "dsb",
//           "user_role": "sbd"
//       }
//   ],
//   "created_by": "sanjay123sanjay12@gmial.com",
//   "created_on": "2023-12-29T05:01:06.045Z",
//   "event_banner": [
//       {
//           "_id": {
//               "Subtype": 4,
//               "Data": "aoBSbRorSIqMoPlz46844Q=="
//           },
//           "file_name": "Screenshot from 2023-09-25 15-45-49__2023-12-16-15-53-42.png",
//           "folder": "temporary_user",
//           "ref_id": "undefined",
//           "size": 115941,
//           "storage_name": "temporary_user/undefined/Screenshot from 2023-09-25 15-45-49__2023-12-16-15-53-42__2023-12-29-10-30-44.png",
//           "uploaded_by": "sanjay123sanjay12@gmial.com"
//       },
//       {
//           "_id": {
//               "Subtype": 4,
//               "Data": "RITTtNu/Rs6ncIgBkg8nUw=="
//           },
//           "file_name": "Screenshot from 2023-09-25 15-15-19__2023-12-16-16-00-45.png",
//           "folder": "temporary_user",
//           "ref_id": "undefined",
//           "size": 117607,
//           "storage_name": "temporary_user/undefined/Screenshot from 2023-09-25 15-15-19__2023-12-16-16-00-45__2023-12-29-10-30-44.png",
//           "uploaded_by": "sanjay123sanjay12@gmial.com"
//       },
//       {
//           "_id": {
//               "Subtype": 4,
//               "Data": "IvUhErQ2SVu0riw4YppDgQ=="
//           },
//           "file_name": "Screenshot from 2023-08-24 09-58-14__2023-11-28-13-05-39.jpg",
//           "folder": "temporary_user",
//           "ref_id": "undefined",
//           "size": 53557,
//           "storage_name": "temporary_user/undefined/Screenshot from 2023-08-24 09-58-14__2023-11-28-13-05-39__2023-12-29-10-30-44.jpg",
//           "uploaded_by": "sanjay123sanjay12@gmial.com"
//       },
//       {
//           "_id": {
//               "Subtype": 4,
//               "Data": "Wte515HbRxKV3/HduKctIw=="
//           },
//           "file_name": "Screenshot_20230720_123841__2023-12-19-06-57-20.jpg",
//           "folder": "temporary_user",
//           "ref_id": "undefined",
//           "size": 18589,
//           "storage_name": "temporary_user/undefined/Screenshot_20230720_123841__2023-12-19-06-57-20__2023-12-29-10-30-44.jpg",
//           "uploaded_by": "sanjay123sanjay12@gmial.com"
//       }
//   ],
//   "event_description": "scsccs",
//   "event_image": {
//       "_id": {
//           "Subtype": 4,
//           "Data": "pM1NC4R6TM+NGMU5JSTnnQ=="
//       },
//       "file_name": "Screenshot from 2023-08-24 09-58-14__2023-11-28-13-05-39.jpg",
//       "folder": "event_logo",
//       "ref_id": "undefined",
//       "size": 53557,
//       "storage_name": "event_logo/undefined/Screenshot from 2023-08-24 09-58-14__2023-11-28-13-05-39__2023-12-29-10-30-37.jpg",
//       "uploaded_by": "sanjay123sanjay12@gmial.com"
//   },
//   "event_mode": "online",
//   "event_name": "sccs",
//   "event_participants": [
//       {
//           "Subtype": 4,
//           "Data": "KW1D/69RRvqfqhc92I8B9w=="
//       }
//   ]
// }