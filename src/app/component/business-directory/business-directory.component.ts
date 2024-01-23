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
    this.getData();
    
}
navigateToAddress(data:any){
let email = `mailto:${data}`
console.log(email);
window.open(email,"_blank");


}


navigateToMap(lng:any,lat:any){ 
     let url=`https://www.google.com/maps?q=${lng},${lat}`;
     window.open(url,"_blank");
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
