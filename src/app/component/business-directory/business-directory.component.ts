import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-business-directory',
  templateUrl: './business-directory.component.html',
  styleUrls: ['./business-directory.component.css']
})
export class BusinessDirectoryComponent implements OnInit {
  @Input('IsHome') Ishomescreen: any
  @Input('minNumberOfCards') minNumberOfCards?: number;

  Data:any

  constructor(private dataservice:DataService, private router: Router){

  }


ngOnInit(): void {
    this.getData();
    
}
navigateToAddress(data:any){
let email = `mailto:${data}`
console.log(email);
window.open(email,"_blank");


}
navigate(router: string, data?: any) {
  // if (router == "list") {
  //   this.router.navigate(['event-home'])
  // } else {
  //   this.router.navigate(["event/" + id])

  // } 
  // this.router.navigate([data.industry + data])
  this.router.navigateByUrl(data.industry+'/'+data.CompanyName)

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
