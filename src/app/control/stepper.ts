
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
  selector: 'formly-field-stepper',
  template: `  
    <mat-horizontal-stepper [linear]="isLinear" #stepper (selectionChange)="stepChanged($event)">
  <div>
    <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last">
      <ng-template matStepLabel>{{ step.props!.label }}</ng-template>
      <div style="height: 70vh">
        <formly-field [field]="step"></formly-field>
    
    </div>

      <div style="text-align-last: end; width: 100%">
        <button mat-button *ngIf="index !== 0" matStepperPrevious>Back step</button>
         
        <button matStepperNext mat-raised-button type="button" *ngIf="!last" [disabled]="!isValid(step)">
          Next step
        </button>

        <button mat-raised-button type="button" *ngIf="last" [disabled]="!isValid(step)" (click)="SubmitData()">
          Submit
        </button>
      </div>
    </mat-step>
  </div>
</mat-horizontal-stepper>






  `,
})



export class FormlyFieldStepper extends FieldType implements OnInit {
  isLinear = false;
  // stepper: any; 
  constructor(private dataservice: DataService,  private router: Router,) {
    super()

  }
  @Output() dataChanged = new EventEmitter<any>();

  StepperData: any[] = []


  currentStepIndex: any = 0;

  eventid:any

message:string =''
  bindkey?: any;
  ngOnInit(): void {
    // if(this.model && this.model.isEdit == undefined){
    (this.form as FormGroup).addControl("_id",new FormControl(uuid_v4()))
//  }
  }


  collectionName: any
  stepChanged(event: StepperSelectionEvent): void {

    const currentStep = this.field.fieldGroup?.[event.selectedIndex] ?? {};
    this.currentStepIndex = this.field.fieldGroup?.[event.selectedIndex] ?? {};
    let formData = currentStep.formControl?.value ?? {};
    // event.
    // console.log(event.selectedIndex, "event.selectedIndex ")
    // if (event.selectedIndex == 1) {

    //   this.dataservice.save("event", formData).subscribe((data: any) => {
    //     const insertId = data.data['insert ID'];
    //     formData._id = insertId

    //     this.StepperData.push(formData);
    //     this.dataChanged.emit(formData);
    //     // sessionStorage.setItem("event_id", insertId)

    //   })
    // }






  }



  SubmitData( ) {
    
 this.dataservice.save("event", this.form.value)
.subscribe((res: any) => {

  if (res.data){
    this.router.navigate(['list/event']);
 
  }
  // (this.config.editMode == 'page') {
  // }
});
///list/event
  }

  isValid(field: FormlyFieldConfig): any {
 
    if (field.key) {
      
      return field.formControl?.valid;
    }
 
    return field.fieldGroup?.every(f => this.isValid(f));
  }

 



}
 