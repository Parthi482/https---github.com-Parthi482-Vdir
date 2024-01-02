import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';

@Component({
  selector: 'datetime-input',
  template: `

<p>{{this.field.props?.label}}</p>
<div style='margin:5px 5px;top:0px'>
  <p-calendar id="customCalendar"  [(ngModel)]="selected_date"  class="max-w-full"  dateFormat="dd/mm/yy"  hourFormat='12' min [formControl]="formControl" [formlyAttributes]="field" [(ngModel)]="date" [showTime]="true" [showIcon]="true" [style]="{ height: '100%', width: '100%' }">label</p-calendar>
  </div>

`,
})
export class DateTimeInput extends FieldType<any> implements AfterViewInit, OnInit {

  date: Date[] | undefined;
  @ViewChild('picker') picker: any;

  // public date!: moment.Moment;
  hideTime = false
  placeholder:any
  required:any
  currentField:any
  selected_date!:any
  ngAfterViewInit(): void {
  }

  public get FormControl() {
    return this.formControl as FormControl;
  }
  constructor(private datePipe: DatePipe) {
    super();
  }
  ngOnInit(): void {
    debugger
    this.required=this.field.props?.required
    this.placeholder=this.field.props?.placeholder
    this.currentField = this.field
    this.selected_date = new Date(this.model[this.field.key])
    if (this.currentField.parentKey!= "") {
      debugger
      (this.field.hooks as any).afterViewInit = (f: any) => {
      let field =  this.currentField.parentKey
        const parentControl = this.form.get(field)
        parentControl?.valueChanges.subscribe((val: any) => {
         // this.minFromDate = val
        })

      }
    }
  }
}