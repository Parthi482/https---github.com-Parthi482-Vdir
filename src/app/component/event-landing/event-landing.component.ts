import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rx';
import { map } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-event-landing',
  templateUrl: './event-landing.component.html',
  styleUrls: ['./event-landing.component.css']
})



export class EventLandingComponent implements OnInit { 
  upcomingDates: moment.Moment[] = [];
  DocImagePAth: any = environment.ImageBaseUrl;

  eventlanding: FormGroup | any;

  constructor(private router: Router,private dataService : DataService,private fb: FormBuilder,private datePipe: DatePipe) {

  }

  cities: City[] | undefined;

  eventImage:any[]=[]

  
  navigate(data:any) { 
    this.router.navigate(["event-details/"+data.id]) 
      
  }

  submitForm(){
    let data = this.eventlanding.value
     
    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value:data.dateTime,type:"date"}],
        },
      ],
    } 

    this.dataService.getDataByFilter("event",filterCondition1).subscribe((res:any) => {
      
      let response = res.data[0].response 
      if(response){
        this.eventImage = []
      }
      response.forEach((element:any) => { 
                
          this.eventImage.push(element.event_image);
});

    })



  
  }
 
  ngOnInit() { 
    const currentDate = new Date();
    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value: currentDate ,type:"date"}],
        },
      ],
    };  
    this.dataService.getDataByFilter("event",filterCondition1).subscribe((res:any) => {
      
      let response = res.data[0].response 
      response.forEach((element:any) => { 
        console.warn(element);
        
        let objects ={
          bannerimages:element.event_image,
          id:element._id
        }
          this.eventImage.push(objects);
});

    })

 

    
    this.eventlanding = this.fb.group({
      looking: [''],
      in: [''],
      dateTime: [''],  
  });

  }
 
 
}
 