import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/search.service';

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
  <div class="card-body" (click)="my(event)"  style="background-image: url({{event.eventBanner}});height:400px;
   background-repeat: no-repeat;background-size: cover;">
<div class="text-center" style="float: left;margin-top: 10vh" >
  <img *ngIf="event.eventLogo" class="img-thumbnail"  src="{{ event.eventLogo }}" alt="Event Logo" style="width: 200px; height: 200px;background-color:var(--main-color)">
</div>
<div class="card" style="opacity: 0.7;  justify-content: end;width: 200px;float: right;margin-top: 10vh ">
  <div class="card-body">
    <div style="display: flex; flex-direction: column; align-items: flex-end;">
      <div style="font-size: 15px; font-weight: bold;">{{event.eventName}}</div>
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

constructor(private auth: ApiService,private router:Router) {
}

ngOnInit() {
  this.width=this.width? this.width : 800;
  this.height=this.height? this.height : 900;
  console.log(this.EventID);
  this.event=this.EventID;
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