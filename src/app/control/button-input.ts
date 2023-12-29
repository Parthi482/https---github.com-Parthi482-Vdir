// import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
// import { values } from 'lodash';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { DataService } from '../service/data.service';
// import { DialogService } from '../service/dialog.service';
// @Component({
//   selector: 'button-input',
//   template: `
//   <style>
//   .icon{
// margin-bottom: 20px;

//   }
//   .label {
//     font-weight: bold;
//     color: #555;
//   }
//   .list-item {
//     margin-bottom: 10px;
//   }
  
//   .storedDate {
//     display: grid;
//     grid-template-rows: auto auto;
//     align-items: center;
//   }
  
//   .name-row {
//     display: flex;
//     align-items: center;
//   }
  
//   .bullet-point {
//     margin-right: 5px;
//   }
  
 
  
//   .contact-row {
//     display: flex;
//     align-items: center;
//   }
  
//   .contact {
//     margin-left: 10px;
//   }
  
//   .button-group {
//     display: none;
//     margin-left: 10px;
//   }
  
//   .storedDate:hover .button-group {
//     display: inline-block;
//   }
  
  
  
//   </style>
//    <div class=icon>
//    <mat-label class="label">{{field.props!['label']}}</mat-label>
//       <button
       
//         [formlyAttributes]="field"
//         matTooltip="Add"
//         mat-mini-fab
//         (click)="onAddButonClick()"
//         style="
//           margin-left: 30px;
//           background-color: #5C6BC0;
//           color: white;
//           height: 30px;
//           width: 30px;
//           font-size: 9px;
//           line-height: 3;
//           vertical-align: middle;
//         "
//       >
//         <mat-icon>add</mat-icon>
//       </button>
//     </div>



// <ng-template  #editViewPopup let-data>
// <nestedform (onClose)="close($event)" [formName]="formName" [model]="data" ></nestedform>
// </ng-template>


// <div *ngFor="let field of storedDate ; let i=index " class="list-item" (mouseenter)="toggleButtons(i, true)" (mouseleave)="toggleButtons(i, false)" >
// <div class="storedDate">
// <div class="name-row">
// <span class="bullet-point">&#8226;</span> 
// <span style="justify-content: center;">
// {{ field.role_name }} {{ field.team_name }}  {{field.employee_id}} 
// <!-- {{field.team_name}} -->
// <mat-icon style="padding-top: 3px;" *ngIf="field.showButtons" (click)="deleteItem(i)">delete</mat-icon>
//   <mat-icon (click)="editItem(field)" style="padding-top: 3px;" *ngIf="field.showButtons">edit</mat-icon>
// </span>
// </div>
// <!-- <div class="contact-row">
// <span class="contact">{{ field.emailid }}, {{ field.mobilenumber }}</span> -->
// <!-- </div> -->
// </div>
// </div>

//   `

// })


// export class ButtonInput extends FieldType<any> implements OnInit {
//   pageHeading: any
//   collectionName: any
//   mode: any
//   label: any
//   formName: any
//   public fields!: FormlyFieldConfig[]
//   config: any
//   onClose = new EventEmitter<any>();

//   // form = new FormGroup({});


//   @ViewChild("editViewPopup", { static: true }) editViewPopup!: TemplateRef<any>;
//   storedDate: any;
//   constructor(
//     private dialogService: DialogService,
//     private httpclient: HttpClient,
//     private dataservice: DataService
//   ) {
//     super()
//   }



//   ngOnInit(): void {
//     localStorage.removeItem('projectmembers')
//     this.storedDate = this.model[this.field.key]
    
//     if(this.model.isEdit==true){

//       localStorage.setItem('projectmembers',JSON.stringify(this.storedDate))
    
//     }

//     this.label = this.field.props?.label
//     this.formName = this.field.props?.attributes

//   }
//   ngOnDestroy() {
//     console.log("Component will be destroyed");
//   }
//   close_icon() {
//     this.dialogService.closeModal()
//   }


//   // ...

//   toggleButtons(index: number, show: boolean): void {
//     this.storedDate[index].showButtons = show;
//   }
//   onAddButonClick() {
//     debugger

//     this.dialogService.openDialog(this.editViewPopup, "40%", null, {});
//   }

//   close(data: any) {
//     debugger
//     console.log(data);
    
//     this.dialogService.closeModal()
//     let getData: any = localStorage.getItem('projectmembers')
//     this.storedDate = JSON.parse(getData)

//     this.field.formControl.setValue(this.storedDate)


//   }
//   deleteItem(index: number): void {
//     this.storedDate.splice(index, 1);
//     localStorage.setItem('projectmembers', JSON.stringify(this.storedDate));

//   }
//   editItem(item: any) {
//     debugger
    
//     item.isEdit=true
//     this.dialogService.openDialog(this.editViewPopup, "40%", null, item);

//   }



// }



import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FieldArrayType, FieldType, FormlyFieldConfig } from "@ngx-formly/core";
import { concat, values } from "lodash";
import { Observable, Subscription } from "rxjs";
import { DataService } from "../service/data.service";
import { FormService } from "../service/form.service";
import { DynamicFormComponent } from "../component/dynamic-form/dynamic-form.component";
import { DialogService } from "../service/dialog.service";
import { HttpClient } from "@angular/common/http";
// import { EventComponent } from '../component/event/event.component';
import { MatSidenav } from "@angular/material/sidenav";
import { environment } from "src/environments/environment";
import { EventComponent } from "../component/event/event.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "button-input",
  template: `
    <style>
      .icon {
        margin-bottom: 20px;
      }
      .example-sidenav {
        width: 50%;
        height: 100%;
      }

      .label {
        font-weight: bold;
        color: #555;
      }
      .list-item {
        margin-bottom: 10px;
      }

      .storedDate {
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;
      }

      .name-row {
        display: flex;
        align-items: center;
      }

      .bullet-point {
        margin-right: 5px;
      }

      .contact-row {
        display: flex;
        align-items: center;
      }

      .contact {
        margin-left: 10px;
      }

      .button-group {
        display: none;
        margin-left: 10px;
      }
 
      .column {
  float: left;
  width: 33.33%;
  padding: 5px;
}
 
.row::after {
  content: "";
  clear: both;
  display: table;
}

/* .containers{
  margin-top: 15%;
}
 */
/* .userProfile{
 width: 120px;
  height: 120px;
   border-radius: 10%;
     
} */

img{
  width: 120px;
  height: 120px;
   margin-right: 30px;   /* Horizontal Space */
   margin-bottom: 30px;  /* Vertical Space */
   border-radius: 10%;
   /* justify-content: space-between; */

}

      .drawer-container {
        background-color: transparent !important;
        position: inherit;
      }



      div.polaroid {
  /* display: flex; */
  width: 80%;
  height: 50%;
  /* background-color: transparent !important; */
  /* margin-bottom: 25px; */
}

/* mat-icon.trash-icon {
  margin-right: 10px;  
  align-self: flex-end; 
} */

div.content {
  display: flex;
  flex-direction: "column";
  /* justify-content: space-between; */
  /* align-items: flex-start;   */
  width: 100%;
}

/* img {
  width: 100%;
} */

p {
  margin: 0; /* Remove default margin on paragraphs */
}

    </style>

 
    <div class="containers" *ngIf="this.array==false; ">

<div class="icon">
    <mat-label class="label">{{ field.props!["label"] }}</mat-label>
    <button
      [formlyAttributes]="field"
      matTooltip="Add"
      mat-mini-fab
      (click)="onAddButonClick()"
      
      style="
        margin-left: 30px;
        background-color: #5C6BC0;
        color: white;
        height: 30px;
        width: 30px;
        font-size: 9px;
        line-height: 3;
        vertical-align: middle;
      "
    >

      <mat-icon>add</mat-icon>
    </button>


  </div>
  </div>

<!--Araay Below -->
<br>
  <div class="containers" *ngIf="this.array==true" >
<div class="icon" *ngFor="let data of field.props">
    <mat-label class="label">{{ data!["label"] }}</mat-label>
    <button
      [formlyAttributes]="field"
      matTooltip="Add"
      mat-mini-fab
      (click)="onAddButonClick()"
      
      style="
        margin-left: 30px;
        background-color: #5C6BC0;
        color: white;
        height: 30px;
        width: 30px;
        font-size: 9px;
        line-height: 3;
        vertical-align: middle;
      "
    >

      <mat-icon>add</mat-icon>
    </button>
 
    <div  style="display: flex; flex-direction: row;margin-top:10px"> 
  <div  *ngFor="let user of Participant(data.type); let index = index">
    <mat-icon class="trash-icon" (click)="removes( user,data.type)">restore_from_trash</mat-icon>
    <img src="{{ user.user_photo }}" style="width:150px;" (click)="openDrawer(user, index)" /> 
    <p>{{ user.first_name }}</p> 
  </div>
</div>
</div>

  </div>

<mat-drawer-container
    class="drawer-container"
    [hasBackdrop]="true"
    autosize
  >
    <mat-drawer #drawer position="end" mode="side" style="width: 50%">
      <div *ngIf="open_drawer == true">
        <div style="text-align-last: start; padding: 10px;">
          <!-- <app-event [openDrawer]="open_drawer"></app-event> -->
          
          <app-event #eventComponent
            [Data]="UserData"
            (eventData)="DataTrans($event)"
          ></app-event>

          <!-- <mat-icon (click)="close()">keyboard_backspace</mat-icon> -->
        </div>
      </div>
    </mat-drawer>
  </mat-drawer-container>
 
    
 
  `,
})


export class ButtonInput extends FieldType<any> implements OnInit, OnDestroy {
  // @ViewChild(EventComponent) eventComponent!: EventComponent; 
  @ViewChild(EventComponent) eventComponent!: EventComponent;



  open_drawer: boolean = false;
  DocImagePAth: any = environment.ImageBaseUrl;
  pageHeading: any;
  paramsSubscription !: Subscription;
  collectionName: any;
  showFiller = false;
  mode: any;
  label: any;
  formName: any;
  public fields!: FormlyFieldConfig[];
  config: any;
  array: any = false;
  @ViewChild("drawer") drawer!: MatSidenav;
  // open_drawer: boolean = false
  onClose = new EventEmitter<any>();

  @ViewChild("editViewPopup", { static: true })
  editViewPopup!: TemplateRef<any>;
  storedDate: any;
  @Input() public found = new EventEmitter<any>();

  constructor(
    private dialogService: DialogService,
    private httpclient: HttpClient,
    private dataservice: DataService,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private cf: ChangeDetectorRef,
  ) {
    super();
  }

  eventPartipant_id: any[] = []
  removes(userDetails:any ,type:any) {

    let i = this.UserData.findIndex((res:any)=>{return res.email.toLowerCase() ==userDetails.email.toLowerCase()});
console.log(i);

    // this.eventPartipant_id[i].user_role[type]==false
    this.UserData[i].user_role[type]=false
    let roleAccess:any=this.UserData[i].user_role
console.log(roleAccess);


let Deleteevery = !Object.values(roleAccess).every(value => value === false);

  if (!Deleteevery) {
  this.UserData.splice(i,1)
  }

}

  //  remove(i: number, { markAsDirty }?: {
  //         markAsDirty: boolean;
  //     }

  //todo edit
  openDrawer(user: any, index: any): void {
    // Set the selected user data inerDetails.event_id = this.event_id; the component
    // this.data = user;
    console.log(user)
    // Open the drawer
    this.open_drawer = true;
    this.eventComponent.logToConsole(user, "edit", index);
    this.drawer.open();
    

  }

  // Participant(type: any): any[] {
  //   return this.UserData.filter(res => res.user_role[type] == true);
  // }
  Participant(type: any): any[] { 
    return this.UserData.filter(res => res.user_role && res.user_role.hasOwnProperty(type) && res.user_role[type] === true);
  }


  close_icon() {
    this.dialogService.closeModal();
  }

  toggleButtons(index: number, show: boolean): void {
    this.storedDate[index].showButtons = show;
  }


  UserData: any[] = [];



  event_id: any
  ngOnInit() {

    this.eventComponent = this.field.form.get('eventComponent') as EventComponent;

   

    this.label = this.field.props?.label;
    this.formName = this.field.props?.attributes;

    this.event_id = this.form.value._id





    this.array = this.field.array || false
    this.collectionName = this.field.collectionName || false
    console.log(this.model);
    
    if (this.model.isEdit == true) {
      // console.warn(this.UserData);
      this.UserData = [];


      let data:any[]=[]

      this.form.value.event_participants.forEach((element:any) => {
  
      
        const filterCondition1 = {
          filter: [
            {
              clause: "AND",
              conditions: [{ column: "_id", operator: "EQUALS", value: element }],
            },
          ],
        };
        this.dataservice.getDataByFilter("event_participants",filterCondition1).subscribe((res:any)=>{
          data.push(res.data[0].response[0]) 
          if(this.form.value.event_participants.length==data.length){
            this.UserData=data 
            this.cf.detectChanges()
          }
  
        })
        
      });
  
    }
    console.warn(this.UserData);
 
  }

  UserRole: any;
   
  // event_participants: any = {}
  DataTrans(UserDetails: any) {
    if (UserDetails.edit == 'edit') {

    let index = this.UserData.findIndex((res:any)=>{return res.email.toLowerCase() ==UserDetails.email.toLowerCase()});
    
      // console.clear();
      // console.warn(UserDetails,"Data");
      // console.log("------------------------------------------------------");
      // console.log("------------------------------------------------------");
      // console.log("------------------------------------------------------");
      // console.warn("Previous",this.UserData[index]);
      // console.log("------------------------------------------------------");
      // console.log("------------------------------------------------------");
      // console.log("------------------------------------------------------");
      this.UserData[index]=UserDetails
      // console.warn("After",this.UserData[index]);
      
      // this.UserData.splice(UserDetails.index, 1);

    } else {
      let insertids:any[]=[]
      
      UserDetails.event_id = this.event_id;
 
      this.dataservice.save("event_participants", UserDetails).subscribe((res: any) => {
        // console.log(res);
        insertids.push(res.data["insert ID"])
        
        UserDetails["insert_id"] = res.data["insert ID"];

        // // this.eventPartipant_id.push(res.data["insert ID"]);

        this.UserData.push(UserDetails);

        this.cf.detectChanges();
      });
      (this.form as FormGroup).addControl("event_participants",new FormControl(insertids))

      console.log(insertids,"new");

    }

  }


  removeItemsWithNullField(): void {
    this.UserData = this.UserData.filter(item => item.index !== "" && item.index !== undefined);
  }




  onAddButonClick( ) {
 
    this.open_drawer = true;
    this.drawer.open();
    // if (this.eventComponent) {
// console.log(this.eventComponent);
// this.eventComponent = this.field.form.get('eventComponent') as EventComponent;
// console.log(this.eventComponent);

// this.eventComponent.EventIDGen("create");
  //  this.datacheck.dialogService.openSnackBar("hi","OK")
    //  this.datacheck.EventIDGen("Cretae")
  }










  close(data: any) {
    console.log(data);

    this.dialogService.closeModal();
    let getData: any = localStorage.getItem("projectmembers");
    this.storedDate = JSON.parse(getData);

    this.field.formControl.setValue(this.storedDate);
  }
  deleteItem(index: number): void {
    this.storedDate.splice(index, 1);
    localStorage.setItem("projectmembers", JSON.stringify(this.storedDate));
  }
  editItem(item: any) {
    debugger;

    item.isEdit = true;
    this.dialogService.openDialog(this.editViewPopup, "40%", null, item);
  }


  removeSelectedimage(index: number, user: any[]) {
    console.log("Removing user at index:", index);
    console.log("Removed user:", user[index]);

    // Use splice to remove the user at the specified index
    user.splice(index, 1);

    console.log("Updated user array:", user);
  }

  // this.dataservice.deleteDataById(this.collectionName, objectAtIndex._id).subscribe((res: any) => {
  //   // this.dialog.openSnackBar('Data has been deleted successfully', 'OK');
  //   //this.getList();
  // });






  ngOnDestroy(): void {

    (this.form as FormGroup).addControl("event_participate", new FormControl(this.UserData))

    console.log("Component will be destroyed");
  }




}

// [
//   {
//       "username": "luffy",
//       "imageUrl": "assets/images/images(1).jpg"
//   },
//   {
//       "username": "luffy",
//       "imageUrl": "assets/images/images(1).jpg"
//   }
// ]
