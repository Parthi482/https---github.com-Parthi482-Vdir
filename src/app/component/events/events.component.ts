import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit { 

  Data:any

  constructor(private dataservice:DataService){

  }


ngOnInit(): void {
    this.getData() 
    
}

getData(){
  let todayDate = new Date()
  console.log(todayDate);
  
  const filterValue = {
    filter: [
      {
        clause: "AND",
        conditions: [{ column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value:todayDate , type:"date"}],
      },
    ],
  } 
 
  this.dataservice.getDataByFilter("event",filterValue).subscribe((res:any)=>{
     let data = res.data[0].response 
     console.log(data);
     
       this.Data = data
  })
}



}
