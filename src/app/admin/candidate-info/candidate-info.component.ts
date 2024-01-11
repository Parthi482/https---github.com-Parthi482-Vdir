import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-candidate-info',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,MatIconModule ],
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
export class CandidateInfoComponent {
  userDetails:any;
  parms:any;
  resumeHere:boolean=false;
  overall_data:any[]=[]

  constructor(private http: HttpClient, private auth:ApiService,private dataservice:DataService,private route: ActivatedRoute,private router:Router) {
    this.route.queryParamMap.subscribe((params:any)=>{ // queryparams
      this.parms = params.params;
      console.log(this.parms.applied_type);
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    const data: any[] = [];
    const data1: any[] = [];


    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: '_id', operator: "EQUALS", value:id }],
        },
      ],
    } 



    this.dataservice.getDataByFilter('seekers_info',filterCondition1).subscribe((res: any) => {
    // this.auth.GetByID('seekers_info', '_id', id,'false').subscribe((res: any) => {
 
      let response =  res.data[0].response

      data.push(response);
      console.log(response.resume);
      if(response.resume!=null){
this.resumeHere=true
      }else{
this.resumeHere=false
      }
 
       const filterValue = {
        filter: [
          {
            clause: "AND",
            conditions: [{ column: '_id', operator: "EQUALS", value:id }],
          },
        ],
      } 
    // const filterValue: any = [
    //   {
    //     clause: "$and",
    //     conditions: [
    //       { column: "_id", operator: "$eq", value:id },
    //     ]
    //   }
    // ];
    this.dataservice.getDataByFilter('user_resume',filterValue).subscribe((res:any)=>{
 

    // }) 
    let response = res.data[0].response
       
        if(res!=null){
          data1.push(response);
          this.overall_data = this.groupData(data, data1);

        }else{
          this.overall_data = this.groupData(data);
        }


        console.log(this.overall_data);
        // if( this.overall_data){

        // }else{

        // }

      });
    });
  }

groupData(data: any[], data1?: any[]):any[] {
 


  const groupedData: any[] = [];
  if (data1 == null) {
    data.forEach((item) => {
      groupedData.push({
        candidateInfo: item,
        resumeData: null, // You can set this to null when resume data is not available
      });
    });
  } else { 
    data.forEach((item) => {
      const matchingData = data1.find((dataItem) => dataItem._id === item._id);
      if (matchingData) {
        groupedData.push({
          candidateInfo: item,
          resumeData: matchingData,
        });
      }
    });
  } 

  return groupedData;
}

UpdateCanditeInfo(type:any){ 
let data:any={}
data['applied_type']=type; 
let value =this.parms.Jobid 
const filterCondition1 = {
  filter: [
    {
      clause: "AND",
      conditions: [{ column: 'Jobid', operator: "EQUALS", value:value }],
    },
  ],
} 




this.dataservice.getDataByFilter('applied_jobs',filterCondition1).subscribe((xyz:any)=>{
  // console.log(xyz);
    let res = xyz.data[0].response
let ID =res._id
this.auth.update('applied_jobs',ID,data).subscribe((val:any)=>{
console.log(val);
})
this.router.navigateByUrl("admin/candidates/all",value)
})


}
routeback(){
  console.log(this.parms);

  this.router.navigate(["admin/candidates/"+this.parms.Jobid]);
}
}

