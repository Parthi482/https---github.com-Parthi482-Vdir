import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/service/search.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {
  searchForm: FormGroup;
  fetchedData: any[] = [];
  filteredJobs: any[] = [];
  columnDataList: any[] = [];
  firstFiveItems: any[] = [];
  itemsPerColumn = 8;
  currentColumn = 0;
  showResults = false;
  city: IDropdownSettings = {
    singleSelection: false,
    idField: 'city',
    textField: 'city',
    limitSelection: 1,
    allowSearchFilter: true,
  };
  cityList: any[] = [];
  DocImagePAth: any = environment.ImageBaseUrl;


  loadNextColumnData() {
    const startIndex = this.currentColumn * this.itemsPerColumn;
    const endIndex = startIndex + this.itemsPerColumn;


    if (startIndex < this.fetchedData.length) {
      const newData = this.fetchedData.slice(startIndex, endIndex);
      this.columnDataList.push(newData);
      console.log(this.columnDataList);

      this.currentColumn++;
    }


  }
  imageUrls: any[] = []
  loadMore() {
    console.log('ji');

    for (let i = 0; i < 3; i++) {
      this.loadNextColumnData();
    }
  }
  constructor(private formBuilder: FormBuilder, private auth: ApiService, private route: Router) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });
    this.auth.GetALL('city').subscribe((xyz: any) => {
      this.cityList = xyz
      console.log(xyz);

    })
    this.auth.GetALL('companies').subscribe((res: any) => {
      this.firstFiveItems = res.slice(0, 4)
      console.log(this.firstFiveItems);

    })
    this.auth.GetALL("industry").subscribe((data: any) => {
      this.fetchedData = data;
      console.log(this.fetchedData);
      this.loadMore()
    })
    const filterValue: any = [
      {
        clause: "$and",
        conditions: [
          { column: "_id", operator: "$ne", value: "id" },
        ]
      }
    ];
    this.auth.getDataByFilter("event", filterValue).subscribe((event: any) => {

      event.forEach((element: any) => {
        if (element.event_image) {
          let images = element
          this.imageUrls.push(images)

        }

      });


    })






  }



  searchJobs() {
    const query = this.searchForm.get('searchQuery')?.value;

    // const filterValue: any = [
    //   {
    //     clause: "$and",
    //     conditions: [
    //       { column: "CompanyName", operator: "$eq", value: query}
    //       // ,
    //       // { column: "applied_type", operator: "$eq", value: "new_registration" }
    //     ]
    //   }
    // ];
    // this.auth.getDataByFilter
    this.auth.GetByID('companies', "CompanyName", query, 'true').subscribe((xyz: any) => {
      console.log(xyz);
      if (xyz != null) {
        this.showResults = true;
        this.filteredJobs = xyz;
      }


    })
    // const filteredJobs = this.sampleJobs.filter(job =>
    //   job.title.toLowerCase().startsWith(query.toLowerCase())
    // );

    // this.filteredJobs = filteredJobs.sort((a, b) => {
    //   const titleA = a.title.toLowerCase();
    //   const titleB = b.title.toLowerCase();
    //   if (titleA < titleB) {
    //     return -1;
    //   }
    //   if (titleA > titleB) {
    //     return 1;
    //   }
    //   return 0;
    // });

    // this.showResults = this.filteredJobs.length > 0;


  }

  NavigateJobs() {
    this.route.navigateByUrl('job-details')
  }
  NavigateIndustry(industry: any) {
    console.log(industry);
    const modifiedValue = industry.replace(/ /g, "-");

    this.route.navigateByUrl(modifiedValue)
  }



  navigate(imageUrl: any, category: string) { 
    console.log('Clicked Image Details:', imageUrl);
    console.log('Category:', category);

    this.route.navigate(["event-details/"+"b692fffa-c59c-405b-83be-72fc99634521"]) 

  }











}
