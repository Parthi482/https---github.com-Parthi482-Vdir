import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
// import { ApiService } from 'src/app/service/search.service';
// import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-event-screen',
  templateUrl: './event-screen.component.html',
  styleUrls: ['./event-screen.component.css'],
})
export class EventScreenComponent {
city:any;
eventName:any;
events:any
event:any
eventLogo:any
bannerImage:any
docBasePath: string=environment?.ImageBaseUrl
EventID:any

  constructor(private route: ActivatedRoute,private http: HttpClient, private dataservice: DataService,private router:Router ) {

    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
        // this.auth.getDataList('event').subscribe({
        //   next: (data: any) => {
        //     console.log(data);
        //     this.events = data;
        //   },
        //   error(err) {
        //     console.error(err);
        //   },
        // });
          // const filterCondition1 = {
          //   filter: [
          //     {
          //       clause: "AND",
          //       conditions: [{ column: "_id", operator: "NOTEQUAL", value: "" }],
          //     },
          //   ],
          // };
        // this.dataservice.getDataByFilter("event", {}).subscribe((data:any)=>{
 

        //   this.events =  data.data[0].response

        // })


        // getData(): Observable<any[]> {
        //   const filterCondition1 = {
        //     filter: [
        //       {
        //         clause: "AND",
        //         conditions: [{ column: "_id", operator: "NOTEQUAL", value: "" }],
        //       },
        //     ],
        //   };
      
        //   return this.dataService
        //     .getDataByFilter("test_user", filterCondition1)
        //     .pipe(map((res: any) => res.data[0].response.map((user: any) => user)));
        // }
      







      } else {
        // this.sharedService.dropdownValues$.subscribe(values => {
        //   this.city = values[0];
        //   this.eventName = values[2];
        //   console.log(values);
        //   console.log( this.city);
        //   console.log(this.eventName);


        // });
      }
    });
  }
  // my(abc:any){
  //   let val =abc._id

  //   // this.router.navigateByUrl('dashboard/companies-info/'+val);
  // }
ngOnInit(){
  // this.width = this.width ?? 800;
  // this.height = this.height ?? 900;

  // console.log(this.EventID);
  const { event_image, event_banner } = this.EventID;
  // this.event = this.EventID;
  this.eventLogo = `${this.docBasePath}${event_image?.storage_name}`;

  if (event_banner && event_banner.length > 0) {
    const firstBannerImage = event_banner[0].storage_name;
    this.bannerImage = `${this.docBasePath}${firstBannerImage}`;
    // console.warn(this.bannerImage);
  }




}
  my(abc:any){
    console.log(abc);
    console.log(abc._id);
      let _id=abc._id.replace(/ /g, "-");
    console.log(_id);
        // this.router.navigateByUrl('/'+EventName)
        this.router.navigate(["event-details/"+_id])
    
    }
  

   

}