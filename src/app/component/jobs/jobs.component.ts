import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{

  Data:any

  constructor(private dataservice:DataService){

  }


ngOnInit(): void {
    this.getData() 
    
}

getData(){

  const filterValue = {
    filter: [
      {
        clause: "AND",
        conditions: [{ column: 'user_type', operator: "NOTEQUAL", value:"" }],
      },
    ],
  } 
 
  this.dataservice.getDataByFilter("jobs",{}).subscribe((res:any)=>{
     let data = res.data[0].response 
     
     this.Data = data
     console.log(data);
    })
}
}
