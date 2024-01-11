import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/search.service';
import { SharedService } from 'src/app/service/shared.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-event-screen',
  templateUrl: './event-screen.component.html',
  styleUrls: ['./event-screen.component.css'],
})
export class EventScreenComponent  implements OnInit{
navigate(event:any) {
  console.log("ddddddd",event._id);
  this.router.navigate(["event-details/"+event._id])



}
city:any;
eventName:any;
events:any
@Input('data') data: any;
 
  constructor(private route: ActivatedRoute,private http: HttpClient, private auth: ApiService,private dataservice: DataService,private router:Router,private sharedService: SharedService ) {

    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
          let date = new Date
          console.log(date);
          
// const filterValue: any = [
//   {
//     clause: "AND",
//     conditions: [
//       { column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value:"2024-01-01T05:00:26.905+00:00",type:"date" },
//     ]
//   }
// ];
  this.dataservice.getDataByFilter("event",{}).subscribe((res :any )=>{
        // this.auth.getDataByFilter("event",filterValue).subscribe((res :any )=>{
              console.log(res);
              
            this.events = res.data[0].response;

            
        })

 

        // this.auth.getDataList('event').subscribe({
        //   next: (data: any) => {
        //     console.log(data);
        //     this.events = data;
        //   },
        //   error(err) {
        //     console.error(err);
        //   },
        // });
      } else {
        this.sharedService.dropdownValues$.subscribe(values => {
          this.city = values[0];
          this.eventName = values[2];
          console.log(values);
          console.log( this.city);
          console.log(this.eventName);


        });
      }
    });
  }
  ngOnInit(): void {
    console.log(this.data);
    
  }
  my(abc:any){
    let val =abc._id

    // this.router.navigateByUrl('dashboard/companies-info/'+val);
  }
}