import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-postedjobs',
  templateUrl: './postedjobs.component.html',
  styleUrls: ['./postedjobs.component.css']
})
export class PostedjobsComponent {
data:any
search_details:any[] = [];
details:any
editorConfig: AngularEditorConfig = {
  editable: true,
  height:"130px",
  // width:"200px",
  spellcheck: true,
  translate: 'yes',
   fonts: [
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'}
  ],
  toolbarHiddenButtons :[
          [
            'customClasses',
            'insertImage',
            'insertVideo',
            'removeFormat','underline','heading','insertHorizontalRule','link',    'insertOrderedList',
            'toggleEditorMode','bold', 'italic','strikeThrough','backgroundColor','textColor','textColor','unlink','fontSize'
          ]
        ]

}

  constructor(private http: HttpClient, private auth:ApiService, private router: Router,private fb: FormBuilder,private dataservice:DataService ) {
    this.details=this.auth.getdetails()
// todo hardcode
    this.dataservice.getDataById("companies","654331ce4c36b5f156fc3880").subscribe((res:any)=>{
      let xyz:any = res.data[0]
      console.log(xyz);

      let address=xyz.street+" "+xyz.area+" "+xyz.statename+" "+xyz.pincode
      console.log(address);

      if(xyz.Company_Register_Type!=undefined&&xyz.Company_Register_Type!=null){
        xyz.Company_Register_Type=xyz.Company_Register_Type.replace(/_/g, ' ');
        console.log(xyz.Company_Register_Type);

      }else{
        xyz.Company_Register_Type=''
      }
      if(xyz.company_type!=undefined&&xyz.company_type!=null){
        xyz.company_type=xyz.company_type.replace(/_/g, ' ');
        console.log(xyz.Company_Register_Type);
      }else{
        xyz.company_type=''
      }
      if(xyz.estd_date==undefined&&xyz.estd_date==null){
        xyz.estd_date=''
        console.log(xyz.Company_Register_Type);
      }

this.data=xyz
 

const filterValue = {
  filter: [
    {
      clause: "AND",
      conditions: [{ column: 'companyId', operator: "EQUALS", value:this.data.unique_id},
      { column: "applied_type", operator: "EQUALS", value: "New_Registration" }
    
    ],
    },
  ],
} 
 

this.dataservice.getDataByFilter('applied_jobs',filterValue).subscribe((xyz:any)=>{
  console.log(xyz);
  this.search_details=xyz.data[0].response

})

    })
    }
    routeFunction(){
      this.router.navigateByUrl('admin/edit-profile')
    }
// get functions(){
//   return this.employee.controls
// }
// updatevalue(){

// }
my(abc:any){
  console.log(abc);
  let data =abc
  this.router.navigate(["admin/candidate-info",data.refid],
{ queryParams: { Jobid:data.Jobid,role:data.role ,applied_type:data.applied_type,title:data.title } }
);
}
}



