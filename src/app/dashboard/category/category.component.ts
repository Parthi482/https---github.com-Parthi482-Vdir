import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/service/search.service';
import {MatTabsModule} from '@angular/material/tabs';
import { LayoutModule } from "../../shared/layout/layout.module";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import slugify from 'slugify';
import { SharedService } from 'src/app/service/shared.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-category',
  standalone:true,
  imports:[CommonModule,MatTabsModule,LayoutModule,MatIconModule, RouterModule,ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

companyflag:boolean=false
jobflag:boolean=false
industryFlag:boolean=false
showMapDiv = false;
mapdata:any
user:any
companies:any
latlong:any
loggedInBy:any=false
company:any
id:any
Checkvalue:any
Email:any;
apply:any
jobId: any;
job: any;
applied_job: any;
button: boolean = false;
profileVisitor: any = {};
isLoggedIn: boolean = false;
    logo:any;
    zoro: any;
    http: any;
    search_details: any;
    companyData: any = {};

jobFilter = false;
companyFilter = false;
industryFilter = false;

ngOnChanges(){
console.log(this.route);
}
ngOnInit() {
  // console.log('hi'); 
this.applyJob()
}
    constructor(private dataservice:DataService,private auth: ApiService,private route :ActivatedRoute,private router:Router,private sharedService: SharedService) {
 

      if(!!localStorage.getItem('token') == true){
        let visitor:any = localStorage.getItem('auth')

      let visitors = JSON.parse(visitor) 
      this.profileVisitor.visitors = this.profileVisitor.visitors || [];

      this.profileVisitor.visitors.push({
        firstName: visitors.user_name,
        email: visitors.email,
        // address: visitors.address,
      }); 
        }
       this.sharedService.dropdownValues$.subscribe(values => {
 
  });
  this.user=this.auth.decodeToken().role  


  this.sharedService.searchQuery$.subscribe(value => { 
   });
      const params = this.route.snapshot.params;
 

      this.route.params.subscribe((xyz: any) => {
        const slugify = (text: string) => {
          return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        };

        const slugifiedParams: any = {};

        Object.keys(xyz).forEach(key => {
          slugifiedParams[key] = slugify(xyz[key] as string); // Type assertion here
        });
 
      });
      if (params['job'] && params['title'] || params['jobid']) { 
  this.jobFilter=true;



  interface FilterCondition {
    clause: string;
    conditions: Condition[];
  }

  interface Condition {
    column: string;
    operator: string;
    value: string;
  }

  const inputCategory = params['business-category'];
  const inputCategory2 = params['company']
  const transformedCategory = inputCategory.replace('-', ' ');
  const transformedCategory2 = inputCategory2.replace('-', ' ');
  const filterValue1 : FilterCondition[] = [
    {
      clause: "AND",
      conditions: [
         
        { column: 'industry', operator: "EQUALS", value:transformedCategory },
        { column: 'CompanyName', operator: "EQUALS", value:transformedCategory2 }
         
        ]
    }
  ]; 
   this.dataservice.getDataByFilter('companies',filterValue1)
  .subscribe((xyz:any)=>{ 

    this.companyData=xyz[0];
    // console.log( xyz[0].coordinate);

   this.latlong= xyz[0].coordinate

    // console.log(this.latlong);



    // this.jobflag=true
  })
  interface FilterCondition {
    clause: string;
    conditions: Condition[];
  }

  interface Condition {
    column: string;
    operator: string;
    value: string;
  }

  const input = params['title'];
  const title = input.replace(/-/g, ' '); 
  const filterValue = {
    filter: [
      {
        clause: "AND",
        conditions: [  
                    { column: "title", operator: "EQUALS", value: title },
                    {column: "jobId", operator: "EQUALS", value:params['jobid']}
          
      ],
      },
    ],
  } 
  console.log(title);
  console.log(filterValue);

  this.dataservice.getDataByFilter('jobs',filterValue)
  .subscribe((xyz:any)=>{
    console.log(xyz);

    console.log(xyz[0]);
    this.job=xyz[0]


    this.jobflag=true
    this.auth.isLoggedIn().then((xyz: any) => {
      if (xyz) {
        const id = this.auth.getdetails()._id;
        interface FilterCondition {
          clause: string;
          conditions: Condition[];
        }

        interface Condition {
          column: string;
          operator: string;
          value: string;
        }

        const inputCategory = params['job'];
        const inputTitle = params['title'];

        const transformedCategory = inputCategory.replace(/-/g, ' ');
        const transformedTitle = inputTitle.replace(/-/g, ' ');

        
        const filterValue = {
          filter: [
            {
              clause: "AND",
              conditions: [ 
                          { column: "refid", operator: "EQUALS", value:  id},
              { column: "Jobid", operator: "EQUALS", value:transformedCategory },
              { column: "title", operator: "EQUALS", value:transformedTitle }
                
            ],
            },
          ],
        }  

        this.dataservice.getDataByFilter('applied_jobs', filterValue).subscribe((xyz: any) => {
          // console.log(xyz);
          if (xyz == null) {
            this.button = true;
          }
        });
      }
    });

    if (this.auth.decodeToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  })

  // this.auth.GetByID("")
}
else if(params['business-category']&&params['company']){
  interface FilterCondition {
    clause: string;
    conditions: Condition[];
  }

  interface Condition {
    column: string;
    operator: string;
    value: string;
  }
  this.companyFilter=true;
  console.log(this.jobFilter,this.companyFilter,this.industryFilter);

  const inputCategory = params['business-category'];
  const inputCompany = params['company'];

  const transformedCategory = inputCategory.replace(/-/g, ' ');
  const transformedCompany = inputCompany.replace(/-/g, ' ');

 
  const filterValue = {
    filter: [
      {
        clause: "AND",
        conditions: [
          { column: "industry", operator: "EQUALS", value:transformedCategory},
        { column: "CompanyName", operator: "EQUALS", value: transformedCompany }
                
          
      ],
      },
    ],
  } 
  console.log(transformedCategory);
  console.log(transformedCompany);

  // console.log("IT Services"==params['business-category']);

  // { 'business-category': 'IT services', company: 'Ban' }
  // console.log('company');




  this.dataservice.getDataByFilter('companies',filterValue)
  .subscribe((res:any)=>{
    let xyz =  res.data[0].response[0]
 
    res.data[0].response.forEach((element:any) => {
      this.companyData=element

      // // this.mapdata=xyz[0].coordinate
      // console.log(this.companyData.coordinate);

      // console.log(this.companyData);
      
    });
  
    
          // console.log(id);
//  !pending
// this.dataservice.updateVisitor("companies",id,this.profileVisitor).subscribe((xyz:any)=>{
//   console.log(xyz);

// })
     

          let address= xyz.Address
          // let CompanyID= xyz[0]._id

          if(xyz.Company_Register_Type!=undefined&&xyz.Company_Register_Type!=null){
            xyz.Company_Register_Type=xyz.Company_Register_Type.replace(/_/g, ' ');
            console.log(xyz.Company_Register_Type);

          }else{
            xyz.Company_Register_Type=''
          }
          if(xyz.company_type!=undefined&&xyz.company_type!=null){
            xyz.company_type=xyz.company_type.replace(/_/g, ' ');
            console.log(xyz.Company_Register_Type);
          }else{
            xyz.company_type=''
          }
          if(xyz.estd_date==undefined&&xyz.estd_date==null){
            xyz.estd_date=''
            console.log(xyz.Company_Register_Type);
          }
          this.companyflag=true

    this.companyData['fulladdress']=address;
    console.log(this.companyData);
    const filtersValue = {
      filter: [
        {
          clause: "AND",
          conditions: [
            { column: "companyId", operator: "EQUALS", value: this.companyData.unique_id},
                  { column: "status", operator: "EQUALS", value: "open" }
            
        ],
        },
      ],
    } 


    this.dataservice.getDataByFilter('jobs',filtersValue).subscribe((xyz:any)=>{
      xyz.data[0].response.forEach((element:any) => {
        this.search_details.push(element)  
      });
      

    })

        })

}
else {
  interface FilterCondition {
  clause: string;
  conditions: Condition[];
}

interface Condition {
  column: string;
  operator: string;
  value: string;
}


this.industryFilter=true
const inputCategory = params['business-category'];
const transformedCategory = inputCategory.replace('-', ' ');

 
const filterValue = {
  filter: [
    {
      clause: "AND",
      conditions: [
        { column: "industry", operator: "EQUALS", value:transformedCategory},
              
        
    ],
    },
  ],
} 
console.log(transformedCategory); // Output the transformed category
console.log(filterValue);

   // { 'business-category': 'IT services', company: 'Ban' }
   this.dataservice.getDataByFilter('companies',filterValue)
   .subscribe((xyz:any)=>{
          //  console.log(xyz[0]);
           this.company=xyz.data[0].response;
           console.log(this.company);
           console.log(this.company.coordinate);



           this.industryFlag=true;

   })
}
    }
    my(abc:any){
      console.log(abc);
      let val=abc
      // let route = this.route.snapshot.params
      // console.log(route);


      // let id=parseInt(abc.jobId)
      const modifiedIndustry = val.industry.replace(/ /g, "-");
      const modifiedCompany = val.companyName.replace(/ /g, "-");
      const modifiedTitle = val.title.replace(/ /g, "-");
      const modifiedJobId = val.jobId
      console.log(modifiedJobId);



      const urlSegment = `${modifiedIndustry}/${modifiedCompany}/Jobs/${modifiedTitle}/${modifiedJobId}`;
      this.router.navigateByUrl(urlSegment);
        }
        routeback(){
          // this.router.navigateByUrl("dashboard/companies")
        }
        showMap() {
          this.showMapDiv = true;
        }
        hideMap() {
          this.showMapDiv = false;
        }
        zoro2 = new FormGroup({
          searchQuery : new FormControl("")

        })
        search1(){
          const abc:any = this.zoro2.value.searchQuery
          this.auth.GetByID('companies','CompanyName',abc,'true').subscribe({
            next: (data: any) => {
              console.log(data);
              this.companies = data;
            },
            error: (err: any) => {
              console.log(err);
              alert(err);
            }
          });
        }
        my1(abc:any){
          let val =abc
    let route = this.route.snapshot.params
    const modifiedValue = val.industry.replace(/ /g, "-");
    const modifiedCompany = val.CompanyName.replace(/ /g, "-");

    // this.route.navigateByUrl(modifiedValue)

          this.router.navigateByUrl(modifiedValue+"/"+modifiedCompany);
        }
        applyJob(){


          if(this.user=="Company"){
this.loggedInBy=false
          }else if(this.user=="seeker"){
            this.loggedInBy=true
            let button =document.getElementById("buttom") as HTMLButtonElement;
            button.disabled=true;
            this.button=false;
            let data = this.auth.getdetails();
            this.Email = this.auth.decodeToken().email;
            let date = new Date()
            console.log(this.job);
            let value =this.job
            const newData:any = {}
            newData.companyId= value.companyId
            let fname=data.firstName+ ' ' +data.lastName
            newData.name= fname
            newData.Company_name= value.companyName
            newData.title= value.title
            newData.education= data.education
            newData.Jobid =value.jobId
            newData.email= data.email
            newData.phone=data.phone
            newData.date= date
            newData.applied_type= 'New_Registration'
            // newData.phone=value.role
            newData.Location= value.Location
            newData.refid=data._id  // change in _id
            newData.role=value.role 
            // this.auth.postAppliedJobs
            this.dataservice.save('applied_jobs',newData).subscribe((xyz:any)=>{ 

              let applied_job:any={}
                let valu=(this.job.applied_job)+1
                applied_job['applied_job']=valu
                this.dataservice.update('jobs',this.job._id,applied_job).subscribe((last:any)=>{ 

                })


            });
          }




        }
        routeback1(data:boolean,id?:any){
          if(data){
            this.router.navigateByUrl("dashboard/job-details")
          }else{
            this.router.navigateByUrl("dashboard/companies-info/"+id)

          }

        }
      //dashboard/companies-info/
        login(params:any){
          if(params){
            this.router.navigate(['auth/register/seeker']);
          }else{
            this.router.navigate(['auth/login']);
          }
        }
        click(event:any){
          console.log(event);
          console.log(this.jobFilter,this.companyFilter,this.industryFilter);

          console.log('hi there');
          if(this.jobFilter){
console.log('job');

          }else if(this.companyFilter){
            console.log('Company');

          }else{
console.log('industry');

            this.industryFilter=true
          }


        }

   }
