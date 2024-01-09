import { Component } from '@angular/core'; 
import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-joblist',
  template: `        
        <div class="container">
          <div class="column">
            <div class="col-md-6" *ngFor="let job of search_details;let i =index">
              <div class="card border-light mb-3">
                <div class="card-body" (click)="my(job)">
                  <div style="display: flex;">
                    <img *ngIf="job?.Company_logo" [src]="job?.Company_logo" alt="" style="width: 80px; height: 80px;border-radius: 50%;">
                    <div style="margin-left: 10px;">
                      <h2 class="card-title" style="margin-top: 20px;"><strong> {{ job?.companyName }}</strong></h2>
                      <i class="fas fa-map-marker-alt" style=" margin-right: 10px;"></i>{{ job?.Location }}
                    </div>
                  </div>
                  <h2 class="card-title" style="margin-top: 7px;">{{ job.title }}</h2>
                  <h3  class="card-subtitle" style="color: rgb(84, 78, 78);"><i class="fa fa-id-badge" style="" aria-hidden="true"></i>
                    {{ job?.role }} <i style="margin: 7px;">|</i><i class="fa fa-suitcase" style="" aria-hidden="true"></i>
                    {{ job?.employmentType }} <i style="margin: 7px;">|
                      <i class="fas fa-money-bill mt-3" style=""></i>
                    </i> {{ job?.salary }}<i style="margin: 7px;">|</i><i class="fa fa-suitcase"style="" aria-hidden="true">
                    </i> {{job?.MinimumExperience}}-{{job?.MaximumExperience}} Years </h3>
                  <ul class="list-unstyled">
                    Qualifications :
                    <ul *ngFor="let value of job.Education">
                      <li>{{ value.education }}</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
           
          </div>
        </div>
    

  `,
})
export class JoblistHome   { 
    search_details:any

constructor(private auth:ApiService,){

}
        ngOnInit(): void {
             

            const cdate= new Date
            const filterValue1: any = [
                {
                  clause: "$and",
                  conditions: [
                    { column: "validity", operator: "$gte", value:cdate ,type:"date"},
                    { column: "status", operator: "$eq", value:'open' },
                  ]
                }
              ];
              // For some thing it will not due to to data in databse
              console.log(filterValue1);
        
              this.auth.getDataByFilter("jobs",filterValue1).subscribe((data:any)=>{ 
                this.search_details=data 
         
              })





        }







        my(abc:any){
            console.log(abc);
            
            // let id:any=abc.refid;
            let companyName=abc.companyName.replace(/ /g, "-");
            let industry = abc.industry.replace(/ /g, "-");
            
            
            
            
            
            }

}
