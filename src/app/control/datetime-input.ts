import { DatePipe } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

import { FieldType } from "@ngx-formly/core";
import * as moment from "moment";

@Component({
  selector: "datetime-input",
  template: `
  <style>
  ::ng-deep .ui-datepicker.ui-widget {
    line-height: 0.5rem;
  }
</style>

<p>{{ this.field.props?.label }}</p>
<div style="margin: 5px 5px; top: 0px">
  <p-calendar
    id="customCalendar"
    class="max-w-full"
    dateFormat="dd/mm/yy"
    hourFormat="12"
    [formControl]="formControl"
    [formlyAttributes]="field"
    [(ngModel)]="date"
    [showTime]="true"
    [showIcon]="true"
    [style]="{ height: '40px', width: '100%' }"
    [minDate]="minSelectableDate"  
    
    (onSelect)="onDateSelect($event)"
  ></p-calendar>
</div>
<p style="color: red; font-size: 12px;">{{ this.errorMessage }}</p>

  `,
})
export class DateTimeInput
  extends FieldType<any>
  implements AfterViewInit, OnInit
{
  date: Date[] | undefined;
  minSelectableDate!: Date;
  @ViewChild("picker") picker: any;
  errorMessage!: string; 
  hideTime = false;
  placeholder: any; 
  currentDate = moment().toDate();
  required: any;
  currentField: any;
  selected_date!: any;
  ngAfterViewInit(): void {}

  public get FormControl() {
    return this.formControl as FormControl;
  }


 
  constructor() {
    super();
  }
  ngOnInit(): void {
    debugger;
    this.minSelectableDate = new Date(); 
    this.required = this.field.props?.required;
    this.placeholder = this.field.props?.placeholder;
    this.currentField = this.field; 
    if(this.model.isEdit == true){
      this.selected_date = new Date (this.model.start_date_time)
      this.date=this.selected_date
    }

    if(this.model.isclone == true){
      this.selected_date = new Date (this.model.start_date_time)
      this.date=this.selected_date
    }

    if (this.currentField.parentKey != "") {
      debugger;
      (this.field.hooks as any).afterViewInit = (f: any) => {
        let field = this.currentField.parentKey;
        const parentControl = this.form.get(field);
        parentControl?.valueChanges.subscribe((val: any) => {
          // this.minFromDate = val
        });
      };
    }
  } 
  onDateSelect(event: any) { 
    
    if(this.model.isCorporateCustomer == true) {
    if (event instanceof Date) {
      const selectedTime = this.formatTime(event);

      const formattedFrom = this.formatTime(moment(`2000-01-01 ${this.model.business_hours_from}`, 'YYYY-MM-DD hh:mm A'));
      const formattedTo = this.formatTime(moment(`2000-01-01 ${this.model.business_hours_to}`, 'YYYY-MM-DD hh:mm A'));

      if (moment(selectedTime, 'hh:mm A').isBetween(moment(formattedFrom, 'hh:mm A'), moment(formattedTo, 'hh:mm A'))) {
        this.errorMessage = ''
      } else {
        this.errorMessage = 'Start date and time is beyond business hours.'
      }
    }
  }
  }

  formatTime(date: Date | moment.Moment): string {
    return moment(date).format('hh:mm A');
  }
}
