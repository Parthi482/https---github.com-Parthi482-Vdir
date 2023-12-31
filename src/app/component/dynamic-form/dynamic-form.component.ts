
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { HelperService } from 'src/app/service/helper.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  form = new FormGroup({})
  pageHeading: any
  formAction = 'Add'
  butText = 'Save'
  id: any
  keyField: any
  isDataError = false
  config: any = {}
  authdata: any
  options: any = {};
  fields!: FormlyFieldConfig[]
  paramsSubscription !: Subscription;
  @Input('formName') formName: any
  @Input('mode') mode: string = "page"
  @Input('model') model: any = {}
  @Output('onClose') onClose = new EventEmitter<any>();
  butonflag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private helperService:HelperService,
    private dialogService: DialogService
  ) {
   
  }

  ngOnInit() {
    
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['form']) {
        this.formName = params['form'];
       }
      if (params['id'] != undefined) {
        this.id = params['id']
      
    }
      this.initLoad()
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes['item'];
    if (this.formName && this.model) {
      this.id = this.model['_id']
      this.initLoad()
    }
  }

  frmSubmit(event:any) {
   console.log("working");
  this.formService.saveFormData(this).then((result: any) => {
          console.log(result);
          if (result != undefined) {
            this.goBack(result)
            
        this.butonflag=true
          }
        })
  
    
  }

  ngOnDestroy() {
    console.log("Component will be destroyed");
    this.paramsSubscription.unsubscribe();
  }

  initLoad() {
    this.formService.LoadInitData(this)
  }
  // goBack(data?: any) {
  //   if (this.mode == 'page') {
  //    this.router.navigate([`${this.config.onCancelRoute}`]);
  //   } else if (this.mode == 'popup') {
  //     if (data) {
  //       this.onClose.emit({ action: this.formAction, data: this.form.value })
        
  //     } else {
  //       this.onClose.emit({ action: this.formAction, data: this.form.value })
        
  //     }
  //     return
  //   }
  // }

  goBack(data?: any) {
    console.log(data);
    
    if (this.config.editMode == 'page' && this.config.cancelroute_ID) {
      this.router.navigate([`${this.config.onCancelRoute}`+this.model[this.config.add_value]]);
    }
   else  if (this.config.editMode == 'page') {
      this.router.navigate([`${this.config.onCancelRoute}`]);
    }
    // if (this.config.editMode == 'popup') 
    else {
      
      //   if (data) {
      //     // this.onClose.emit({ action: this.formAction, data: this.form.value })
  
      //     this.onClose.emit(data)
      //   } else {
      //     this.onClose.emit({ action: this.formAction, data: this.form.value })
      //   }
      //   return
       if (data&&this.formAction=="Add") {
       console.log(data);
      //  if(data.data._id==undefined||data.data._id==null){
      if(this.config.inserted_id){
        data.data._id=data.data.InsertedId
            this.model['_id']=data.data["insert ID"] 
      }else{
        this.model['_id']=data.data["insert ID"] 

      }
      // sdad
        let insertedData = Object.assign(data.data,this.model)
        Object.assign(insertedData,this.form.value)
            
        
        this.onClose.emit({ action: this.formAction, data:insertedData})
       
        // this.onClose.emit(data)
        } else {
          let insertedData = Object.assign(this.model,this.form.value)
              
        
        this.onClose.emit({ action: this.formAction, data: insertedData })
        }
        return  
    }
  }


  resetBtn(data?: any) {
    this.model = {}
    this.formAction = this.model.id ? 'Edit' : 'Add'
    this.butText = this.model.id ? 'Update' : 'Save';

  }

  cancel() {
    console.log(this.config);
    
    if(this.config.editMode=="page"){
      this.router.navigate([`${this.config.onCancelRoute}`]);
    }else
    this.dialogService.closeModal()
    // this.dialogService.CloseALL()

  }


}
