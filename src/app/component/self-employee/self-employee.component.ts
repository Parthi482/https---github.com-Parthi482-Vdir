import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-self-employee',
  templateUrl: './self-employee.component.html',
  styleUrls: ['./self-employee.component.css']
})
export class SelfEmployeeComponent  implements OnInit{

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
        conditions: [{ column: 'user_type', operator: "EQUALS", value:"Self Employee//Skilled Labour" }],
      },
    ],
  } 
 
  this.dataservice.getDataByFilter("user",filterValue).subscribe((res:any)=>{
     let data = res.data[0].response 
     
     this.Data = data
     console.log(data);
    })
}

}
