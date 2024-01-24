import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { isEmpty } from 'lodash';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription, interval } from 'rxjs';
import { HelperService } from 'src/app/service/helper.service';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/service/search.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-event-home-list',
  templateUrl: './event-home-list.component.html',
  styleUrls: ['./event-home-list.component.css']
})
export class EventHomeListComponent implements OnInit, AfterContentChecked{
  upcomingDates: moment.Moment[] = [];
  DocImagePAth: any = environment.ImageBaseUrl;
  searchForm!: FormGroup;
  eventlanding: FormGroup | any;
  Data: any[] = []
  options: string[] = [];
  filteredData: any[] = [];
  filteredOptions: any;
  public search = { searchText: '' };
  selectedDate!: Date;
  currentIndex = 0;
  imageList: SafeUrl[] = [];
  timerSubscription!: Subscription
  @Input('minNumberOfCards') minNumberOfCards?: number;
  @Input('IsHome') Ishomescreen: any
  userData:any
  ActiveUser:boolean = false
CurrentBannerData:any[]=[]
  searchText = new FormControl('');
  dateControl = new FormControl('');

  form = new FormGroup({
    search: this.searchText,
    date: this.dateControl
  });


  constructor(public authService: AuthService,private auth:ApiService,private datePipe: DatePipe, private formBuilder: FormBuilder, private cf: ChangeDetectorRef, private router: Router, private dataService: DataService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.getData()
    this.userData =  this.auth.getdetails()
    if (!isEmpty(this.userData)){
      this.ActiveUser =  true
    }
  }


  eventImage: any[] = []


  navigate(router: string, id?: any) {
    if (router == "list") {
      this.router.navigate(['event-home'])
    } else {
      this.router.navigate(["event/" + id])

    }

  }

  submitForm() {
    let data = this.eventlanding.value

    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value: data.dateTime, type: "date" }],
        },
      ],
    }

    this.dataService.getDataByFilter("event", filterCondition1).subscribe((res: any) => {

      let response = res.data[0].response
      if (response) {
        this.eventImage = []
      }
      response.forEach((element: any) => {

        this.eventImage.push(element.event_image);
      });

    })




  }
ngOnInit(): void { 

  this.searchText.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  ).subscribe((res: any) => {

    const escapedTerm = res.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = new RegExp(escapedTerm, 'i');

    this.filteredData = this.Data.filter((element: any) => {
      return regexPattern.test(element.event_name);
    });
  });
  
  this.startCarousel()
}
 
 
  onSubmit(): void {
    const formData = this.searchForm.value;
  }
 async getData() {
    let todayDate = new Date()
    const filterValue = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value: todayDate, type: "date" }],
        },
      ],
    }

    this.dataService.getDataByFilter("event", filterValue).subscribe((res: any) => {
      //  let data1 = res.data[0].response  

      var dateTime: any

      res.data[0].response.forEach((res: any) => {


        res.event_banner.forEach((event_banner: any) => {

          let data: any = event_banner.storage_name

          this.imageList.push(data)
          console.log(this.imageList);

        });

        dateTime = this.formatDate(res.basic_details.start_date)

        res["Start_date"] = dateTime

        this.Data.push(res)

      });
    })
  }

  clearSearch() {
    this.searchText.setValue('');
    this.filteredData = [];
    // this.searchForm.get('eventName').setValue('');
  }

  private formatDate(timestamp: any): any {
    // const date = new Date(timestamp);
    return this.datePipe.transform(timestamp, 'MMM dd yyyy');
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedFirstName = event.option.value;

    let matchingObject = this.Data.find((res: any) => {

      return res.event_name === selectedFirstName;
    });

    if (!isEmpty(matchingObject)) {
      this.router.navigate(["event/" + matchingObject._id])
    }
  }


  //  todo Mail Api 
  SendEmail(data?:any) {   
    
      // alert("Thank Your For Register")
      // this.dataService.SendEmailForEvent(this.userData.email).subscribe((res:any)=>{         
      // }) 
  }
  ngAfterContentChecked(): void {
     
    this.GetCurrentBannerData()
  }
 
  startCarousel() {
    
    this.timerSubscription = interval(3000).subscribe(() => {
      this.showNextSlide();
    });
  }

  showNextSlide() {
    
    
    if (this.currentIndex === this.imageList.length - 1) {
      this.currentIndex = 0; 
    } else { 
      this.currentIndex++; 
      // this.GetCurrentBannerData() 
    }   
  }
 async GetCurrentBannerData(){
 
    if (!isEmpty(this.imageList[this.currentIndex])){

      let image = this.imageList[this.currentIndex  ] 
  var matchingObject: any = this.Data.find((res: any) => {
    return res.event_banner.some((event_banner: any) => {
      return image === event_banner.storage_name;
    });
  });
  this.CurrentBannerData.push(matchingObject)  
      
    }
   
}
  addEvent(event: any) {
    this.selectedDate = event.value

  }

  // todo remove Duplicate
  // async GetCurrentBannerData() {
  //   if (!isEmpty(this.imageList[this.currentIndex])) {
  //     let image = this.imageList[this.currentIndex];
      
  //     var matchingObject: any = this.Data.find((res: any) => {
  //       return res.event_banner.some((event_banner: any) => {
  //         return image === event_banner.storage_name;
  //       });
  //     });
   
  //     let existingIndex = this.CurrentBannerData.findIndex((resa: any) => resa._id === matchingObject._id);
  
  //     if (existingIndex !== -1) {
        
  //       this.CurrentBannerData[existingIndex] = matchingObject;
  //     } else { 
  //       this.CurrentBannerData.push(matchingObject);
  //     } 
  //   }  
  // }

  onEnter() {
    const searchValue = this.form.get('search')?.value;
 
    
    const filteredData = {
      filter: [
        {
          clause: "AND",
          conditions: [
            { column: 'event_name', operator: "EQUALS", value: searchValue },
            { column: "basic_details.start_date", operator: "GREATERTHANOREQUAL", value: this.selectedDate, type: "date" }
          ],
        },
      ]
    }
    this.dataService.getDataByFilter("event", filteredData).subscribe((res: any) => {

       
      res.data[0].response.forEach((res: any) => {
        if (!isEmpty(res)){
          this.Data = []
          this.Data.push(res)

        }
      
        res.event_banner.forEach((event_banner:any) => {
          let data: any = res.event_banner.storage_name 
          this.imageList.push(data)
        });
 
      });
    })



  }






}
