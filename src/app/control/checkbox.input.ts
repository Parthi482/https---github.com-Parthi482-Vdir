import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'checkbox-input-field',
  template:  `
    <p><mat-checkbox [formControl]="customFormControl" (change)="onchangesworkd($event)">Is Registration Mandatory</mat-checkbox></p>
  `
})
export class CheckboxComponent extends FieldType implements OnInit {
  customFormControl!: FormControl;
   constructor(){
    super()
   }
 

  ngOnInit(): void { 
    const newValue = true;
 
    // this.customFormControl.patchValue({ "": newValue });
  }
  onchangesworkd(data :any){
    this.form.value.basic_details.is_mandatory = data.checked
         

  }









}
