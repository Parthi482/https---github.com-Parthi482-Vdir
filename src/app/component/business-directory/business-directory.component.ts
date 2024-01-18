import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-business-directory',
  templateUrl: './business-directory.component.html',
  styleUrls: ['./business-directory.component.css']
})
export class BusinessDirectoryComponent implements OnInit {

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
        conditions: [{ column: '_id', operator: "NOTEQUAL", value:"id" }],
      },
    ],
  } 
 
  this.dataservice.getDataByFilter("companies",filterValue).subscribe((res:any)=>{
     let data = res.data[0].response 
       this.Data = data
  })
}


}
