
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../service/data.service';
// import * as stepper from '@angular/material/stepper';
import { v4 as uuid_v4 } from "uuid";
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'formly-field-user',
  template: `  
    <h1>fff</h1>

  `,
})



export class FormlyFieldUser extends FieldType implements OnInit {
   
  constructor(private dataservice: DataService,  private router: Router,) {
    super()

  }
   
  ngOnInit(): void {
    console.warn(this.form);
    
  }
 
 



}
 