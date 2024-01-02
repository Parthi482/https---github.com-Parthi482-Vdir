import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/search.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-event-screen',
  templateUrl: './event-screen.component.html',
  styleUrls: ['./event-screen.component.css'],
})
export class EventScreenComponent {
city:any;
eventName:any;
events:any
bannerImage:any
eventLogo:any
event:any
@Input('EventID') EventID:any={};
  constructor(private route: ActivatedRoute,private http: HttpClient, private auth: ApiService,private router:Router,private sharedService: SharedService ) {

    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
        this.auth.getDataList('event').subscribe({
          next: (data: any) => {
            console.log(data);
            this.events = data;
          },
          error(err) {
            console.error(err);
          },
        });
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
  




}


  
  my(abc:any){
    let val =abc._id

    // this.router.navigateByUrl('dashboard/companies-info/'+val);
  }
}