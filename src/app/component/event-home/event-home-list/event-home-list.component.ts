import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-home-list',
  templateUrl: './event-home-list.component.html',
  styleUrls: ['./event-home-list.component.css']
})
export class EventHomeListComponent {
  upcomingDates: moment.Moment[] = [];
  DocImagePAth: any = environment.ImageBaseUrl;
  ishow:boolean = false
  eventlanding: FormGroup | any;
  Data:any  
  @Input('minNumberOfCards') minNumberOfCards?: number; 

  @Input('IsHome')Ishome:any
  constructor(private router: Router,private dataService : DataService,private fb: FormBuilder,private route : ActivatedRoute) {

  }
 

  eventImage:any[]=[]

  
  navigate(data:any) { 
    this.router.navigate([data])
    // this.router.navigate(["event/"+data.id]) 
      
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

    // this.ishow = true
    this.getData() 
    // this.route.params.forEach((res:any)=>{
    //   console.log(res);
      
    // })

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
  getData(){
    let todayDate = new Date() 
    const filterValue = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value:todayDate , type:"date"}],
        },
      ],
    } 
   
    this.dataService.getDataByFilter("event",filterValue).subscribe((res:any)=>{
       let data = res.data[0].response  
         this.Data = data
    })
  }
  
 
}
 