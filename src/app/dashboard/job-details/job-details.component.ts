import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/search.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SharedService } from 'src/app/service/shared.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-job-details',
  // standalone:true,
  // imports:[CommonModule,ReactiveFormsModule,MatListModule,MatIconModule],
  templateUrl:
    './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  job: any
  salary: any
  city: any;
  jobTitle: any;
  otherFilter: boolean = false;
  val: [] = []
  workmode: IDropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'value',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    maxHeight: 300
  };
  workmodeList: any[] = [];
  education: IDropdownSettings = {
    // singleSelection: true,
    idField: 'education',
    textField: 'education',
    // itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    maxHeight: 200
  };
  educationList: any[] = [];
  Salary: IDropdownSettings = {
    singleSelection: false,
    idField: 'range',
    textField: 'range',
    limitSelection: 1,
    allowSearchFilter: true,
    maxHeight: 200
  };
  SalaryList: any[] = [];
  role: IDropdownSettings = {
    singleSelection: false,
    idField: 'category',
    textField: 'category',
    limitSelection: 3,
    allowSearchFilter: true
  };
  roleList: any[] = [];
  industry: IDropdownSettings = {
    singleSelection: false,
    idField: 'category',
    textField: 'category',
    limitSelection: 3,
    allowSearchFilter: true,
  };
  industryList: any[] = [];

  worktype: IDropdownSettings = {
    idField: 'value',
    textField: 'value',
    allowSearchFilter: true
  };
  worktypeList: any[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private dataservice: DataService, private sharedService: SharedService) {
    console.log(!!localStorage.getItem('token'));
    // dataservice

    this.route.queryParams.subscribe(params => {
      this.flag = false
      if (Object.keys(params).length === 0) {
        const cdate = new Date
        const fdate = new Date
        fdate.setDate(cdate.getDate() + 60);


        const filterValue = {
          filter: [{
            clause: 'AND',
            conditions: [
              { column: 'validity', operator: 'GREATERTHANEQUAL', type: 'date', value: cdate },
              { column: "status", operator: "EQUALS", value: 'open' },
            ]
          }]
        };

        this.dataservice.getDataByFilter("jobs", filterValue).subscribe((data: any) => {
          console.log(data);
          this.search_details = data.data[0].response
          console.log(this.search_details);

          this.flag = true
        })
        this.otherFilter = false
        // this.dataservice.getDataList('jobs').subscribe({
        //   next: (data: any) => {
        //     console.log(data);
        //     this.job = data;
        //   },
        //   error(err) {
        //     console.error(err);
        //   },
        // });
      } else {
        this.otherFilter = true
        this.sharedService.dropdownValues$.subscribe(values => {
          console.log(values)
          this.city = values[0];
          this.jobTitle = values[2]
          console.log(this.city)
          console.log(this.jobTitle)

        });

        const inputCategory = this.city;
        const inputCategory2 = this.jobTitle;

        const filteredValue: any[] = [];

        if (this.city && this.jobTitle) {
          filteredValue.push({
            clause: '$and',
            conditions: [
              { column: 'city', operator: '$eq', value: inputCategory },
              { column: 'title', operator: '$eq', type: 'search', value: inputCategory2, FullTextSearch: true },
            ],
          });
          console.log('hi');

        } else {
          filteredValue.push({
            clause: '$or',
            conditions: [
              { column: 'city', operator: '$eq', value: inputCategory },
              { column: 'title', operator: '$eq', value: inputCategory2 },
            ],
          });
          console.log('bye');

        }



        this.dataservice.getDataByFilter('jobs', {}).subscribe((xyz: any) => {
          console.log(xyz);

          this.search_details = xyz;
        });
        this.otherFilter = true
      }


      this.dataservice.getDataByFilter('workmode', {}).subscribe((xyz: any) => {
        let data = xyz.data[0].response
        this.workmodeList = data;
      })
      this.dataservice.getDataByFilter('education', {}).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.educationList = data1;
      })


      // this.dataservice.GetALL("education").subscribe((data: any) => {
      //   this.educationList = data;
      // })

this.dataservice.getDataByFilter('industry', {}).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.industryList = data1;
      })

      // this.dataservice.GetALL("industry").subscribe((data: any) => {
      //   this.industryList = data;
      // })



      this.dataservice.getDataByFilter('role_category', {}).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.roleList = data1;
      }) 
      // this.dataservice.GetALL("role_category").subscribe((data: any) => {
      //   this.roleList = data;
      // })


      this.dataservice.getDataByFilter('worktype', {}).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.worktypeList = data1;
      })

      // this.dataservice.GetALL("worktype").subscribe((data: any) => {
      //   console.log(data[0].value);

      //   this.worktypeList = data;
      // })








      this.dataservice.getDataByFilter('worktype', {}).subscribe((data: any) => {
        let xyz = data.data[0].response
        this.SalaryList = xyz
      })

      // this.dataservice.GetALL('salary').subscribe((xyz: any) => {
      //   this.SalaryList = xyz
      //   console.log(xyz); 

      // })

    })
  }



  jobDetails: any[] = [];

  showResults: any;
  searchForm: any;
  filteredJobs: any;


  zoro = new FormGroup({
    searchQuery: new FormControl("")

  })

  search_details: any

  search1() {
    const abc: any = this.zoro.value.searchQuery
    if (abc === "") {




      this.dataservice.getDataByFilter('jobs', {}).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.search_details = data1;
      })




      // this.dataservice.GetALL('jobs').subscribe({
      //   next: (data: any) => {
      //     console.log(data);
      //     this.search_details = data;
      //     console.log(this.search_details);


      //   }, error(err) {
      //     console.log(err);
      //     alert(err.message);

      //   }
      // });
    } else {
      this.dataservice.getDataByFilter('jobs', {}).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.search_details = data1;
      })



   

      const filterValue = {
        filter: [{
          clause: 'AND',
          conditions: [
            { column: 'title', operator: 'EQUALS', value: abc }, 
          ]
        }]
      };

      this.dataservice.getDataByFilter('jobs', filterValue).subscribe((data: any) => {
        let data1 = data.data[0].response
        this.search_details = data1;
        console.log(this.search_details);
      })




      // this.dataservice.GetByID('jobs', 'title', abc, 'true').subscribe({
      //   next: (data: any) => {
      //     console.log(data);
      //     this.search_details = data;
      //     console.log(this.search_details);

      //   },
      //   error(err) {
      //     console.log(err);
      //     alert(err);

      //   }
      // });

    }
  }
  flag: any = false
  industryval: any[] = []
  roleval: any[] = []
  Salaryval: any[] = []
  workmodeval: any[] = []
  worktypeval: any[] = []
  educationval: any[] = []
  orderObj: any = {}


  filter(data?: any) {

    this.orderObj = {}

    let industryval: any[] = []
    let roleval: any[] = []
    let Salaryval: any[] = []
    let workmodeval: any[] = []
    let worktypeval: any[] = []
    let educationval: any[] = []
    if (this.roleval.length != 0) {
      for (let i = 0; i < this.roleval.length; i++) {
        roleval.push(this.roleval[i].category)
      }
      this.orderObj['role'] = roleval

    }
    if (this.Salaryval.length != 0) {
      for (let i = 0; i < this.Salaryval.length; i++) {
        //  console.log(this.Salaryval[i].range);
        Salaryval.push(this.Salaryval[i].range)
      }
      this.orderObj['salary'] = Salaryval

      // Salaryval=this.Salaryval[0].range
      // console.log(this.Salaryval);
    }
    if (this.industryval.length != 0) {
      for (let i = 0; i < this.industryval.length; i++) {
        console.log(this.industryval[i].category);
        industryval.push(this.industryval[i].category)
      }
      this.orderObj['industry'] = industryval

      // industryval=this.industryval
      // console.log(industryval);
    }
    //  role  employmentType  salary  industryType Experience workmode  Education
    if (this.workmodeval.length != 0) {
      for (let i = 0; i < this.workmodeval.length; i++) {
        // console.log(this.workmodeval[i].value);
        workmodeval.push(this.workmodeval[i].value)
      }
      this.orderObj['workmode'] = workmodeval

      // workmodeval=this.workmodeval
      // console.log(workmodeval);

    }
    if (this.worktypeval.length != 0) {
      for (let i = 0; i < this.worktypeval.length; i++) {
        // console.log(this.worktypeval[i].value);
        worktypeval.push(this.worktypeval[i].value)
      }
      this.orderObj['employmentType'] = worktypeval

      // console.log(worktypeval);
      // worktypeval=this.worktypeval
    }
    if (this.educationval.length != 0) {
      // console.log(this.educationval);
      educationval = this.educationval
      this.orderObj['Education'] = educationval

    }

    if (data != 0) {
      const val: number = JSON.parse(data)
      this.orderObj['Experience'] = val

    }


    console.log(this.orderObj);
    if (this.flag == true) {


      
      this.dataservice.getfilterjob(this.orderObj).subscribe((xyz: any) => {
        console.log(xyz);
        this.search_details = xyz.data
        console.log(this.search_details);

      })
    }

  }




  my(abc: any) {
    console.log(abc);

    // let id:any=abc.refid;
    let companyName = abc.companyName.replace(/ /g, "-");
    let industry = abc.industry.replace(/ /g, "-");

    // if(!!localStorage.getItem('token') == true){
    //   let visitor:any = localStorage.getItem('dataservice')
    //  let profileVisitor: any = {};
    // let visitors = JSON.parse(visitor)

    // visitors.visitedDate = new Date
    // console.log(visitors.visitedDate);

    // profileVisitor.visitors = profileVisitor.visitors || [];

    // profileVisitor.visitors.push({
    //   firstName: visitors.firstName,
    //   lastName: visitors.lastName,
    //   email: visitors.email,
    //   address: visitors.address,
    //   visitedDate: visitors.visitedDate
    // });

    // console.log(profileVisitor);




    // this.dataservice.update("companies",id,profileVisitor).subscribe((xyz:any)=>{
    //   // console.log(xyz);

    this.router.navigateByUrl(industry + '/' + companyName)
    // });

    // }else{


    //   this.router.navigateByUrl(industry+'/'+companyName)

    // }

    // console.log(id);


    //   }




  }
}
