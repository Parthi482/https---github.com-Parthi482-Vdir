import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/search.service';
import { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import { filter } from 'lodash';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-applied-jobs',

  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
})
export class AppliedJobsComponent{

  cardData: any;
  Email: any;
  card: any;
   data:any
companies: any;
frameworkComponents: any;
context: any;
button: any;
title:any;
companyName:any;
applied_date:any;
status:any;
role:any;
location:any;
formControl:any
fields:ColDef[]= [
  {
    "headerName": "Job Title",
    "field": "title",
    "filter": "agTextColumnFilter",
    "maxWidth":115
  },{
    "headerName": "Company Name",
    "field": "Company_name",
    "filter": "agTextColumnFilter",
  },
  {
    "headerName": "Applied Date",
    "field": "date",
    "filter": "agTextColumnFilter",
    "maxWidth":350
  },
  {
    "headerName": "Status",
    "field": "status",
    "filter": "agTextColumnFilter",
    "maxWidth":350
  }, {
    "headerName": "Role",
    "field": "role",
    },
    {
      "headerName": "Location",
      "field": "Location",
      }

]
public defaultColDef: ColDef = {
  resizable: true,
  suppressMovable:true,
};
gridApi:any
  constructor(private http: HttpClient, private auth: ApiService, private dataservice: DataService) {
    this.Email = this.auth.decodeToken().email;
    this.data = this.auth.getdetails()._id;
  


    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [  { column: "refid", operator: "EQUALS", value:this.data }],
        },
      ],
    } 

  //   const filterValue: any = [
        //    {
        //      clause: "$and",
        //      conditions: [
        //        { column: "Jobid", operator: "$eq", value:this.id },
        //        { column: "refid", operator: "$eq", value:details }
        //      ]
        //    }
        //  ];









    this.dataservice.getDataByFilter('applied_jobs',filterCondition1).subscribe((res:any)=>{

      let xyz =  res.data[0].response


      this.cardData=xyz.map((xyz: any) => ({
        ...xyz,
        status:xyz.applied_type.replace(/_/g, ' '),
        date: this.formatMonthInNumber(xyz.date)
      }));
    })
    // this.auth.getAppliedJobByEmail(this.Email).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.cardData = data;
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     alert(err.message);
    //   }
    // });

  }

  formatMonthInNumber(dateString:any) {
    console.log(dateString);

    const dateObj = new Date(dateString);
    console.log(dateObj);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Adding 1 since getMonth() returns 0 for January
    const date = dateObj.getDate();
  console.log(date,month,year);
  let final = date+"-"+month+"-"+year
    // return `${date} ${"-"} ${month} ${"-"} ${year}`;
    return final
  }

  my(value:any){
return value.slice(0, 10);
  }


  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
   }

  onGridReady(params: GridReadyEvent<any>) {
   this.gridApi = params.api;
 }



}
