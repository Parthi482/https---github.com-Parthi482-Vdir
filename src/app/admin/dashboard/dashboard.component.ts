import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/search.service';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  details:any;
  logo:any
  value:any
  postedJobs:any
  jobId:any
  cards:any
  todayJob:any
  companyId:any
  appliedCandidate:any
  visitorLength:any


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private formService: FormService,
    private auth:ApiService,
    public dialog: MatDialog,
    private dataservice:DataService
    // private dialogService: DialogService,


  ) {

  }

  // openDialog() {
  //   const dialogConfig = new MatDialogConfig();
  // dialogConfig.autoFocus = true;
  // dialogConfig.width = '700px'; // Set the width here
  // // dialogConfig.height = '70vh'; // Set the height here

  // const dialogRef = this.dialog.open(DialogContentExampleDialog, dialogConfig);

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log(`Dialog result: ${result}`);
  // });
  // }

  ngOnInit(): void {
    // this.dataservice.getparentdata('get-all-data-count').subscribe((res:any)=>{
    //   this.cards=res.data
    //   console.log( this.cards,"cardssssssssss")
    // })
 
this.details=this.auth.getdetails()
console.log(this.details);

this.dataservice.getDataById("companies",this.details._id).subscribe((res:any)=>{

let xyz = res.data[0]





  console.log(xyz);
  if(xyz===null){
    this.visitorLength=0
  }
console.log(xyz.visitors);
this.visitorLength = xyz.visitors.length
this.visitorLength.length
console.log(this.visitorLength);

})
this.companyId = this.details.unique_id
console.log(this.companyId);
const filterValue = {
  filter: [
    {
      clause: "AND",
      conditions: [{ column: 'companyId', operator: "EQUALS", value:this.companyId }],
    },
  ],
} 
 
this.dataservice.getDataByFilter('jobs',filterValue).subscribe((abc:any)=>{
  console.log(abc);
  if(abc===null){
    this.postedJobs=0
  }else{
    this.postedJobs = abc.data[0].response.length 
  }



      })
      this.companyId = this.details.unique_id 


const filterValue1 = {
  filter: [
    {
      clause: "AND",
      conditions: [{ column: 'companyId', operator: "EQUALS", value:this.companyId }],
    },
  ],
}  
      this.dataservice.getDataByFilter('applied_jobs',filterValue1).subscribe((icf:any)=>{
        console.log(icf);
        if(icf===null){
          this.appliedCandidate=0
        }else{
          this.appliedCandidate = icf.data[0].response.length
          console.log(this.appliedCandidate);
        }



            })

            const startTime = moment().startOf('day').format();
            const endTime = moment().endOf('day').subtract(1, 'minute').format()
            

 
const filterValue2 = {
  filter: [
    {
      clause: "AND",
      conditions: [{ column: 'companyId', operator: "EQUALS", value:this.companyId },
      { column: "createdOn", operator: "GREATERTHANOREQUAL", value:startTime ,type:"date"},
      { column: "createdOn", operator: "LESSTHANOREQUAL", value:endTime ,type:"date"},
    ],
    
    },
  ],
} 

      this.dataservice.getDataByFilter('applied_jobs',filterValue2).subscribe((res:any)=>{
        console.log(res);
        if(res==null){
          this.todayJob=0
          console.log(this.todayJob);
        }else{
          this.todayJob = res.data[0].response.length
          console.log(this.todayJob);
        }



            })

setTimeout(()=>{
  this.cards = [
    {
      count: this.visitorLength,
      text: 'Total visitor',
      icon: 'home',
      iconColor: 'blue',
      altText: 'Icon 1',
      height: '100px',
      width: '150px'
    },
    {
      count: this.postedJobs,
      text: 'Job Post',
      icon: 'work',
      iconColor: 'green',
      altText: 'Icon 2',
      height: '120px',
      width: '180px'
    },
    {
      count: this.appliedCandidate,
      text: 'Job Applied',
      icon: 'assignment',
      iconColor: 'red',
      altText: 'Icon 3',
      height: '110px',
      width: '160px'
    },
    {
      count: this.todayJob,
      text: 'Applicant today',
      icon: 'list',
      iconColor: 'orange',
      altText: 'Icon 4',
      height: '130px',
      width: '170px'
    },
  ];

},1000);

// console.log(this.cards);




  }



  getdata(){
    this.route.params.subscribe((params:any) => { 
      this.dataservice.getDataById("user",params.id).subscribe((res:any)=>{
       let data= res.data[0] 
       this.logo= sessionStorage.setItem("company_logo",data.profileimage)
      })
  })
  }

page_route(url:any){
  this.router.navigate([`${url}`]);
}


} 
