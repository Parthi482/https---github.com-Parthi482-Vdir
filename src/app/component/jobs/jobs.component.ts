import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{
  @Input('IsHome') Ishomescreen: any
  @Input('minNumberOfCards') minNumberOfCards?: number;

  Data:any

  constructor(private dataservice:DataService,private router: Router){

  }


ngOnInit(): void {
    this.getData() 
    
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
     
     this.Data = data;
    })
}
}
