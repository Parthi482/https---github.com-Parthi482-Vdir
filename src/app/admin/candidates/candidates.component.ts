import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import { ApiService } from 'src/app/service/search.service';
import { ActionButtonComponent } from './action-button';
import { DataService } from 'src/app/service/data.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  public cardData: any;
  Email: any;
  card: any;
  userDetails: any
  len: any
  value: any
  frameworkComponents: any
  context: any
  companies: any[] = []
  fields: ColDef[] = [
    {
      "headerName": "Job Title",
      "field": "title",
      "filter": "agTextColumnFilter"
    }, {
      "headerName": "Applied Person  Name",
      "field": "name"
    },
    {
      "headerName": "Phone",
      "field": "phone",
      "filter": "agTextColumnFilter",
      "maxWidth": 350
    },
    {
      "headerName": "Email ID",
      "field": "email",
      "filter": "agTextColumnFilter",
      "maxWidth": 350
    }, {
      "headerName": "Applied Date",
      "field": "date"
    },
    {
      "headerName": "Status",
      "field": "applied_type",
      "filter": "agTextColumnFilter",
      "maxWidth": 350
    }, {
      "headerName": "Action",
      "cellRenderer": "buttonRenderer"

    }
  ]
  params: any
  constructor(private dataservice: DataService, private router: Router, private http: HttpClient, private route: ActivatedRoute, private auth: ApiService) {
    let details = this.auth.getdetails()
    let id = details.unique_id
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ActionButtonComponent,
    };
  }
  id: any
  ngOnInit() {
    let data: any
    this.route.params.subscribe((xyz: any) => {
      console.log(xyz);
      data = xyz.id
      this.id = xyz.id
    })

    this.route.queryParamMap.subscribe((params: any) => { // queryparams
      console.log(params);
      this.value = params.params;
      console.log(this.value);

      if (data == "all") {
        // console.log('hi');
        let details = this.auth.getdetails()
        this.params = details.unique_id
        const filterValue: any = [
          {
            clause: "AND",
            conditions: [
              { column: "companyId", operator: "EQUALS", value: this.params },
              // { column: "applied_type", operator: "$eq", value: "New_Registration" }
            ]
          }
        ];
        this.dataservice.getDataByFilter('applied_jobs', filterValue).subscribe((xyz: any) => {
          console.log(xyz, '92');

          if (xyz != null) {

            this.cardData = xyz.map((xyz: any) => ({
              ...xyz,


              date: this.formatMonthInNumber(xyz.date[0].response)
            }));
          }
        })
      }
      else {
        this.params = data

        const filterValue = {
          filter: [
            {
              clause: "AND",
              conditions: [

                { column: "Jobid", operator: "EQUALS", value: this.params },
                { column: "applied_type", operator: "EQUALS", value: "New_Registration" }


              ],
            },
          ],
        }


        this.dataservice.getDataByFilter('applied_jobs', filterValue).subscribe((xyz: any) => {
          console.log(xyz, '120');
          if (xyz != null) {
            this.cardData = xyz.map((xyz: any) => ({
              ...xyz,
              date: this.formatMonthInNumber(xyz.date[0].response)
            }));
          }
        })
      }
    })


  }
  formatMonthInNumber(dateString: any) {

    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Adding 1 since getMonth() returns 0 for January
    const date = dateObj.getDate();
    let final = date + "-" + month + "-" + year
    return final
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
  gridApi: any
  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }
  public defaultColDef: ColDef = {
    resizable: true,
    suppressMovable: true,


  };
  start(data: any, event: any) {
    console.log(data);

    this.router.navigate(["admin/candidate-info", data.refid],
      { queryParams: { Jobid: data.Jobid, role: data.role, applied_type: data.applied_type, title: data.title } }
    );

  }
  onSelect(row: any) {
    row = row.api.getSelectedRows()[0]

  }

  viewCanditeInfo() {
    let type: any = (document.getElementById("Select") as HTMLSelectElement).value
    console.log(type);

    if (type == "all") {
      console.log('hi');
      // let details=this.auth.getdetails() // ALL Canditate
      // let params=details.unique_id
      // let val=this.value
      // console.log(val);



      const filterValue = {
        filter: [
          {
            clause: "AND",
            conditions: [

              { column: "companyId", operator: "EQUALS", value: this.params }


            ],
          },
        ],
      }
      this.dataservice.getDataByFilter('applied_jobs', {}).subscribe((res: any) => {
        let xyz:any = res.data[0].response
        this.cardData = []
        if (xyz != null) {
          this.cardData = xyz.map((xyz: any) => ({
            ...xyz,
            date: this.formatMonthInNumber(xyz.date[0].response)
          }));
        }
      })
    } else {
   
      
      const filterValue = {
        filter: [
          {
            clause: "AND",
            conditions: [

              // { column: "companyId", operator: "EQUALS", value: data },
              { column: "applied_type", operator: "EQUALS", value: type }


            ],
          },
        ],
      }

 
      this.dataservice.getDataByFilter('applied_jobs', filterValue).subscribe((res: any) => {
     
        let xyz  = res.data[0].response
        this.cardData = []
        if (!isEmpty(xyz)) {
          this.cardData = xyz.map((xyz: any) => ({
            ...xyz,
            date: this.formatMonthInNumber(xyz.date[0].response)
          }));
        }
      })
    }

  }



  //   getJobCardDataByEmail(email: string): void {
  //     console.log(email);

  //     let a =btoa(email);
  //     this.router.navigateByUrl('admin/candidate-info/'+a)
  // //     this.auth.getInfo(email).subscribe(
  // //       {
  // //         next: (data: any) => {
  // //           console.log(data);
  // //          this.userDetails = data;
  // //          this.auth.setValueJob(data)

  // //         },error(err: { message: any; }) {
  // //             console.log(err);
  // //             alert(err.message);
  // //         }
  // //        });
  //   }

  routeback() {
    this.router.navigate(["admin/jobs"]);
  }
}
