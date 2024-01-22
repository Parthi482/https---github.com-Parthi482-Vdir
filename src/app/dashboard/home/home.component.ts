import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {
  // @Output('')minNumberOfCards:any

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
  constructor(private formBuilder: FormBuilder, private auth: ApiService, private route: Router,private dataservice: DataService) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });
    // this.Ishome =  true
    this.dataservice.getDataByFilter("companies", {}).subscribe((xyz: any) => {
    // this.auth.GetALL('city').subscribe((xyz: any) => {
      this.cityList = xyz.data[0].response 

    })
 
    
    this.dataservice.getDataByFilter("companies", {}).subscribe((res: any) => {
    // this.auth.GetALL('companies').subscribe((res: any) => {
      let event = res.data[0].response
      this.firstFiveItems = event.slice(0, 4)
      console.log(this.firstFiveItems);

    })




    this.dataservice.getDataByFilter("industry", {}).subscribe((res: any) => {
    // this.auth.GetALL("industry").subscribe((data: any) => {
      this.fetchedData = res.data[0].response
      console.log(this.fetchedData);
      this.loadMore()
    })
    const filterValue = {filter:[{
      clause: 'AND',
      conditions: [
        { column: '_id', operator: 'NOTEQUAL',type:'string', value: "" },
      ]
    }]};

    this.dataservice.getDataByFilter("event", {}).subscribe((res: any) => {
      console.log(res.data[0].response);
      let event = res.data[0].response
      event.forEach((element: any) => {
        if (element.event_image) {
          console.log(element.event_image);
          
          let images = element
          this.imageUrls.push(images)

        }

      });


    })






  }



  searchJobs() {
    const query = this.searchForm.get('searchQuery')?.value;
    const filterValue = {
      filter: [
        {
          clause: "AND",
          conditions: [

            { column: "CompanyName", operator: "EQUALS", value:query }


          ],
        },
      ],
    }
  
      this.dataservice.getDataByFilter('companies', filterValue).subscribe((xyz: any) => {
      console.log(xyz);
      if (xyz != null) {
        this.showResults = true;
        this.filteredJobs = xyz.data[0].response[0];
      }


    })
   

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

  showSections = window.innerWidth < 763;
// response
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showSections = (event.target as Window).innerWidth < 763;
    console.log("Hello Lesstham");
    
  }








}
