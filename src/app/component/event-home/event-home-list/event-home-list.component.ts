import { ChangeDetectorRef, Component, Input } from '@angular/core';
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


@Component({
  selector: 'app-event-home-list',
  templateUrl: './event-home-list.component.html',
  styleUrls: ['./event-home-list.component.css']
})
export class EventHomeListComponent {
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

  searchText = new FormControl('');
  dateControl = new FormControl('');

  form = new FormGroup({
    search: this.searchText,
    date: this.dateControl
  });


  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private cf: ChangeDetectorRef, private router: Router, private dataService: DataService, private fb: FormBuilder, private route: ActivatedRoute) {

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

  ngOnInit() {

    this.getData()



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


  initForm(): void {
    this.searchForm = this.formBuilder.group({
      eventName: [''],
      chosenDate: [null]
    });
  }

  onSubmit(): void {
    const formData = this.searchForm.value;
  }
  getData() {
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
        let data: any = res.event_image.storage_name;
        dateTime = this.formatDate(res.basic_details.start_date)

        res["Start_date"] = dateTime

        this.Data.push(res)
        this.imageList.push(data)

      });
      //  console.log(dateTime);
      //  data.forEach((res:any) => {

      //  });
      //  this.Data = data ;
      //  let dateTime =  this.formatDate(data.basic_details.start_date) 

  console.log(this.Data);
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
    }
    this.cf.detectChanges();
  }

  addEvent(event: any) {
    this.selectedDate = event.value

  }


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

      this.Data = res.data[0].response
      res.data[0].response.forEach((res: any) => {
        let data: any = res.event_image.storage_name
        this.imageList.push(data)

      });
    })



  }






}
