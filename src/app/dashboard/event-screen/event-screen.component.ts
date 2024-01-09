import { Component } from '@angular/core';
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
export class EventScreenComponent {
city:any;
eventName:any;
events:any

  constructor(private route: ActivatedRoute,private http: HttpClient, private auth: ApiService,private dataservice: DataService,private router:Router,private sharedService: SharedService ) {

    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
 
const filterValue: any = [
  {
    clause: "$and",
    conditions: [
      { column: "basic_details.start_date", operator: "$gte", value:"2024-01-01T05:00:26.905+00:00",type:"date" },
    ]
  }
];
        this.auth.getDataByFilter("event",filterValue).subscribe((res :any )=>{
              console.log(res);
              
            this.events = res;

            
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
  my(abc:any){
    let val =abc._id

    // this.router.navigateByUrl('dashboard/companies-info/'+val);
  }
}