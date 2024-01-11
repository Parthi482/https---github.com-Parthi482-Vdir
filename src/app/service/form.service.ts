import { HttpClient } from '@angular/common/http';
import { Injectable, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';
import { async, catchError } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';
import { HelperService } from './helper.service';
import { values } from 'lodash';
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  authdata: any
  user_id: any
  email: any
  role_id: any
  formData = new FormData();

  constructor(
    private helperService: HelperService,
    private dataService: DataService,
    private dialogService: DialogService,
    private httpclient: HttpClient) {
   
  }

  LoadMasterInitData(ctrl:any) {
    this.dataService.loadScreenConfigJson(ctrl.formName).subscribe(async config=>{
      console.log(config);
      
        ctrl.config = config
        
        ctrl.pageHeading = config.pageHeading
        ctrl.collectionName = config.form.collectionName
        // ctrl.model = config.model ? config.model : {};
        // ctrl.isPopupEdit=ctrl.detailForm.isPopupEdit
        // ctrl.detailModel=ctrl.detailForm.fields
        ctrl.mode = config.addEditMode ? config.addEditMode : 'popup'
        ctrl.fields = config.form.fields
        this.LoadData(ctrl)
        // this.loadSupportData(ctrl)
        // if (config.getWeightFromMachine) {
        //   this.serialPortService.init()
        // }
      })
    }
  /**
 * This Main method We CAll in form Services 
 * @id if id availabe ,IT  load the existing data 
 * @ctrl This is Total content from the parent componet.
 */
  LoadInitData1(ctrl: any) {
 
    this.httpclient.get("assets/jsons/" + ctrl.formName + "-" + "form.json").subscribe(async (config: any) => {
      ctrl.config = config
      ctrl.model = config.model ? config.model : ctrl.model;
      ctrl.pageHeading = config.pageHeading
      ctrl.collectionName = config.form.collectionName
      // ctrl.model = config.model ? config.model : {};
      ctrl.mode = config.addEditMode ? config.addEditMode : 'popup' 
      ctrl.id = ctrl.model[config.keyField]  || ctrl.model["id"] || ctrl["id"]
      ctrl.butText = ctrl.id ? 'Update' : 'Save';   //buttons based on the id
      ctrl.formAction = ctrl.id ? 'Edit' : 'Add';
    
      if (ctrl.formAction == 'Edit' && ctrl.mode == 'page') {
        this.LoadData(ctrl).subscribe((res: any) => {
          ctrl.fields = config.form.fields
          console.log(ctrl.model);
        })
      }
      else if (ctrl.formAction == 'Edit' && ctrl.mode == 'popup') {
        ctrl.model['isEdit'] = true
        ctrl.model['isshow'] = true
        ctrl.model['ishide'] = true
        ctrl.isFormDataLoaded = true
        ctrl.formAction = ctrl.config.formAction || 'Edit';
        ctrl.isEditMode = true;
      }
      ctrl.fields = config.form.fields
    })
 
  }
  LoadInitData(ctrl: any) {
 
    
    
    if (ctrl.id) {
      ctrl.collectionName = ctrl.formName
      
      this.LoadData(ctrl).subscribe((res: any) => {
        console.log(ctrl,"existing data loaded")
        this.LoadConfig(ctrl)
      })
    } else {
      this.LoadConfig(ctrl)
    }
  }
  /**
 * This Function help to get the screen config from data base
 * @ctrl This is Total content from the parent componet.
 */
  LoadConfig(ctrl: any) {
    
    // form or any other screen keyField (it should be given in form)
    this.dataService.loadScreenConfigJson(ctrl.formName).subscribe(async config=>{
      console.log(config);
      
      ctrl.config = config
      ctrl.pageHeading = config.pageHeading
      ctrl.collectionName = config.form.collectionName
      ctrl.mode = config.screenEditMode ? config.screenEditMode : 'popup'
      ctrl.model["keyField"] = config.keyField || 'id'
      ctrl.id = ctrl.model[config?.keyField] || ctrl?.model["_id"] 
      ctrl.formAction = ctrl.id ? 'Edit' : 'Add';
      ctrl.butText = ctrl.id ? 'Update' : 'Save';   //buttons based on the id
      
        if (ctrl.formAction == 'Edit' && ctrl.config.mode == 'page') {
                  // this.LoadData(ctrl).subscribe((res: any) => {
        ctrl.fields = config.form.fields
        // })
      }
      else if (ctrl.formAction == 'Edit' && ctrl.mode == 'popup') {
        

        ctrl.model['isEdit'] = true
        ctrl.model['isshow'] = true
        ctrl.model['ishide'] = true
        ctrl.isFormDataLoaded = true
        ctrl.formAction = ctrl.config.formAction || 'Edit';
        ctrl.isEditMode = true;
      }
      ctrl.fields = config.form.fields
    })
  }

 

  //"json:"within" bson:"within"  validate:"omitempty,within=2d
  extractComparisonOperator(tag: any) {
    const matchResult = tag.match(
      /\b(eq|gt|gte|lt|lte|min|max|regexp|between_age|within|ne)\b/
    );
    if (matchResult) {
      return matchResult[0];
    }
    return null;
  }
  resetDetailModel(ctrl: any) {

    let form = ctrl.config.detailForm
    if (form) {
      ctrl.detailModel = {}
      ctrl.isDetailEditMode = false
      ctrl.butText = "Add"
      if (form.defaultFocusIndex) {
        form.fields[form.defaultFocusIndex].focus = true
                //TODO ??
        // form.fields[form.defaultFocusIndex].defaultValue = ""
      }
    }
  }

 
  LoadData(ctrl: any): Observable<boolean> {
    
    var nextValue = new Subject<boolean>()
    this.LoadFormData(ctrl).subscribe((exists:any) => {
    nextValue.next(exists)
      if (exists && ctrl.config.formType=='master-detail') {
        //load detailed form details and its data, if available
        
        this.LoadDetailConfig(ctrl)
        this.LoadDetailDataList(ctrl,ctrl.id)
        this.resetDetailModel(ctrl)
      }
    })
    return nextValue.asObservable()
  }

// !Need TO do in same componenet for server side pagination
LoadDetailDataList(ctrl:any,id:string,addtionalFilterConditions?:any) {

  if(ctrl.config.diffApi==true){
    let key:any=ctrl.model[ctrl.config.idToSend]
    this.dataService.lookupTreeData(ctrl.config.endPoint,key).subscribe(
      (result:any) => {
      ctrl.listData=result.data.response ||  []
      // ctrl.listData = res.data[0].response|| [];
      ctrl.tempListData = ctrl.listData;
      ctrl.gridApi.sizeColumnsToFit();
      },
      error => {
        ctrl.listData = []
        ctrl.tempListData = ctrl.listData;
        //Show the error popup
        console.error('There was an error!', error);
      })
     
    
  }else{





    let filterCondition :any
    //master-detail mapping record filter condition
    if(ctrl?.config?.detailForm?.customfilter){
       filterCondition = [
        { column: ctrl.config.detailForm.mapColumn,
            operator: "EQUALS",
          value:ctrl.model[ctrl?.config?.detailForm?.customkey]
          },
        ]
    
    }else{

      filterCondition = [
        { column: ctrl.config.detailForm.mapColumn,
            operator: "EQUALS",
          value:id
          },
        ]
    }
    console.log(filterCondition);

  this.dataService.makeFilterConditions(ctrl.detailListConfig.defaultFilter,filterCondition,ctrl.detailModel)
  this.dataService.makeFilterConditions(ctrl.detailListConfig.fixedFilter,filterCondition,ctrl.detailModel)

    //when we apply filter the top filter controls,
    //this conditions to be merged with the above filter condition
    if (addtionalFilterConditions) {
    
    filterCondition = _.merge(filterCondition,addtionalFilterConditions)
    }
    //load detail (child) collection data
    var filterQuery = {filter:[{
      clause: "AND",
      conditions: filterCondition
    }]}
    

  this.dataService.getDataByFilter(ctrl.config.detailForm.collectionName,filterQuery).subscribe(
    (result:any) => {
        ctrl.listData = result.data[0].response|| [];
        ctrl.tempListData = ctrl.listData;
        ctrl.gridApi.sizeColumnsToFit();
      },
      error => {
        ctrl.listData = []
        ctrl.tempListData = ctrl.listData;
        //Show the error popup
        console.error('There was an error!', error);
      }
    );
  }

}



LoadDetailConfig(ctrl:any) {
  ctrl.form.disable()

  ctrl.keyCol = ctrl.config.detailForm.keyColumn || 'cno'
  ctrl.detailDefaultFocusIndex = ctrl.config.detailForm.defaultFocusIndex || 0
  ctrl.detailFields = ctrl.config.detailForm.fields
  ctrl.detailModel = ctrl.config.detailForm.model ? ctrl.config.detailForm.model : {};
  ctrl.isPopupEdit = ctrl.config.detailForm.isPopupEdit || false
  ctrl.listData = []
  
  ctrl.tempListData = ctrl.listData;
  ctrl.detailListConfig = ctrl.config.detailListConfig
  ctrl.filterOptions = ctrl.config.detailListConfig.filterOptions
  ctrl.actions = ctrl.config.detailListConfig.actions || []
  ctrl.actionPopup =ctrl.config.detailListConfig.actionPopup || []         //popup form screen in master table
  ctrl.delete=ctrl.config.detailListConfig.delete || []
  //TODO
ctrl.detailListFields =  ctrl.config.detailListConfig.fields

  ctrl.config.detailListConfig.fields.forEach((e:any) => 
  // {
  //   if (e.type) {
  //     if (e.type == "date") {
  //         e["valueFormatter"] =  (params:any) => params.value == null ? "" : moment(params.value).format(e.format || "DD/MM/YY");
  //     } 
  //   }
  // });
  
  {
    console.log(e,'e');
    console.log(e.type,'type');

    if (e.type == "datetime" || e.type == "date") {
      e.valueGetter = (params: any) => {
        if (params.data && params.data[e.field]) {
          console.log('dasd');
          
          return moment(params.data[e.field]).format(
            e.format || "DD-MM-YYYY "
          );
        }
        return ' '
      };
    }
    if (e.type == "color") {
      e.cellStyle = (params: any) => {
        return { color: "blue" };
      };
    }
    if (e.type == "arraytostring") {        
      e.valueFormatter = (params: any) => {
          if (params.data && params.data[e.field]&& !_.isEmpty(params.data[e.field])) {
          let txt = "";
          if(e.valueType=="plainArray"){
            let input=params.data[e.field] ;
            
            for (let i=0; i < input?.length;i++){
              txt += input[i] +","
             }
             console.log("txt",txt);
             
             var n =txt.lastIndexOf(",")
             var value=txt.substring(0,n)
             console.log(value);
             
             return value
            
          }else{
            let input=params.data[e.field] ;
            let attribute=e.value
            for (let i=0; i < input?.length;i++){
              txt += (input[i][attribute]) +","
             }
             var n =txt.lastIndexOf(",")
             var value=txt.substring(0,n)
             return value
            }

          }
          return

      };
      e.type='text'
    }  
    if (e.width) {
      e["width"] = e.width;
    } 
    // if (e.type == "set_Filter" && e.filter == "agSetColumnFilter") {
    //   if (e.Diffkey == true) {
    //     e.filterParams = {
    //       values: (params: any) => {
    //         let filter:any={
     //           start: 0,
    //           end: 1000,
    //           filter: this.filterQuery,
    //         }
    //         if(this.allFilter!==undefined){
    //         filter=this.allFilter;
    //         }
    //         this.DataService.getDataByFilter(this.collectionName, filter).subscribe((xyz: any) => {
    //           const apidata = xyz.data[0].response;
    //           const uniqueArray = Array.from(
    //             new Map( apidata.map((obj: any) => [obj[e.field], obj])).values()
    //           );
    //           params.success(uniqueArray);
    //         });
    //       },
    //       keyCreator: (params: KeyCreatorParams) => {
    //         return [params.value[e.keyCreator], e.keyCreator, true];
    //       },
    //       valueFormatter: (params: any) => {
    //         return params.value[e.field];
    //       },
    //     };
    //   } else {
    //     e.filterParams = {
    //       values: (params: any) => {
    //         let filter:any={
    //           start: 0,
    //           end: 1000,
    //           filter: this.filterQuery,
    //         }
    //         if(this.allFilter!==undefined){
    //         filter=this.allFilter;
    //         }
    //         this.dataService.getDataByFilter(this.collectionName,filter).subscribe((xyz: any) => {
    //           const apidata = xyz.data[0].response
    //             .map((result: any) => {
    //               let val = result[e.field];
    //               if (val !== undefined) {
    //                 return val;
    //               }
    //             })
    //             .filter((val: any) => val !== undefined); // Filter out undefined values
    //           params.success(apidata);
    //         });
    //       },
    //     };
    //   }
    // }
    //if the object in nested array
    // if (e.type == "set_Filter" && e.filter == "agSetColumnFilter" &&e.object_type == "nested_array") {
    //   debugger;
    //   e.filterParams = {
    //     values: (params: any) => {
    //       let filter:any={
    //         start: 0,
    //         end: 1000,
    //         filter: this.filterQuery,
    //       }
    //       if(this.allFilter!==undefined){
    //       filter=this.allFilter;
    //       }
    //       this.DataService.getDataByFilter(this.collectionName,filter).subscribe((xyz: any) => {
    //         const apidata = xyz.data[0].response
    //           .map((result: any) => {
    //             //let val = result[e.field];
    //             let val = e.field
    //               .split(".")
    //               .reduce((o: any, i: any) => o[i], result);
    //             if (val !== undefined) {
    //               return val;
    //             }
    //           })
    //           .filter((val: any) => val !== undefined); // Filter out undefined values
    //         params.success(apidata);
    //       });
    //     },
    //   };
    // }
  })

}








  LoadFormData(ctrl: any): Observable<boolean> {
  
    var nextValue = new Subject<boolean>() 
    if (ctrl.id) {

	    const filterCondition1 = {
        filter: [
          {
            clause: "AND",
            conditions: [{ column: '_id', operator: "EQUALS", value: ctrl.id }],
          },
        ],
      } 
       
      this.dataService.getDataById(ctrl.collectionName,ctrl.id ).subscribe((result:any)=>{

// let result = data.data[0].response

        if (result  && result != null) {
         
            
          ctrl.model = result.data[0] || {}
          console.log(ctrl.model);      
          ctrl.model['isEdit'] = true
          ctrl.model['isshow'] = true
          ctrl.model['ishide'] = true
          ctrl.isFormDataLoaded = true
          ctrl.isDataError = false //???
          ctrl.formAction = ctrl.config.formAction || 'Edit';
          ctrl.isEditMode = true;
          //we need old data, if update without any changes
          ctrl.modelOldData = _.cloneDeep(ctrl.model)
          nextValue.next(true)

        } else {
          ctrl.model['isEdit'] = false
          ctrl.formAction = 'Add';
          ctrl.isFormDataLoaded = false
          nextValue.next(false)
        }

        
      }, error => {
        console.error('There was an error!', error);
        nextValue.next(false)
      }
      
      
      
      
      )
      // this.dataService.getDataById(ctrl.collectionName, ctrl.id).subscribe(
      //   (result: any) => {
      //     console.log(result);
      //     if (result  && result != null) {
      //       ctrl.model = result || {}
      //       // console.log(ctrl.model);      
      //       ctrl.model['isEdit'] = true
      //       ctrl.model['isshow'] = true
      //       ctrl.model['ishide'] = true
      //       ctrl.isFormDataLoaded = true
      //       ctrl.isDataError = false //???
      //       ctrl.formAction = ctrl.config.formAction || 'Edit';
      //       ctrl.isEditMode = true;
      //       //we need old data, if update without any changes
      //       ctrl.modelOldData = _.cloneDeep(ctrl.model)
      //       nextValue.next(true)
      //     } else {
      //       ctrl.model['isEdit'] = false
      //       ctrl.formAction = 'Add';
      //       ctrl.isFormDataLoaded = false
      //       nextValue.next(false)
      //     }
      //   },
      //   error => {
      //     console.error('There was an error!', error);
      //     nextValue.next(false)
      //   }
      // )
    } else {
      nextValue.next(false)
    }
    return nextValue.asObservable();
  }


  
  /**
 * This method used Save or update the data / Add and update the form
 * Take the Old Data in modelOldData 
 * @param ctrl This is Total content from the parent componet
 */
  async saveFormData(ctrl: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
       
      if (!ctrl.form.valid) {
    
      const invalidLabels:any = this.helperService.getDataValidatoion(ctrl.form.controls);
      this.dialogService.openSnackBar("Error in " + invalidLabels, "OK");
       ctrl.form.markAllAsTouched();
        ctrl.butonflag=false
        return ;
      }
      var data = ctrl.form.value
      
      // It can be done in any project with different screen config
      //while saving set default values

        if (ctrl.formAction == 'Add') {
          var defaultValues = ctrl.config.form.defaultValues || []
          // this.loadDefaultValues(defaultValues,data,ctrl.model)
          console.log("save");
          
          this.dataService.save(ctrl.collectionName,data).pipe(
            catchError((error:any) => {
              ctrl.butonflag=false
              return error }) ).subscribe((res: any) => {
            if(res){
              
              if(ctrl?.config?.user){
                this.updateuser(ctrl,res);
              } 
              
              this.dialogService.openSnackBar("Data has been Inserted successfully", "OK")
             resolve(res)

          }
             else {
              this.dialogService.openSnackBar(res.error_msg, "OK")
            }
          })
        }
        else {
          delete data._id
          console.log("update");
          
          this.dataService.update(ctrl.collectionName,ctrl.id,data).pipe(
            catchError((error:any) => {
              ctrl.butonflag=false
              // console.error('Error occurred:', error);
              return error
            })
    ).subscribe((res: any) => {

          
      this.dialogService.openSnackBar("Data has been updated successfully", "OK")

            resolve(res)
          })
        }
      

    })
  }



  updateuser(ctrl:any,refId:any){
    
      let datas:any={}
      if(ctrl?.collectionName=='client'){
         datas={
          _id:ctrl.model.contact_details.email_id,
          first_name:ctrl.model.contact_details.first_name + " " +ctrl.model.contact_details.last_name,
          mobile_number:ctrl.model.contact_details.mobile_number,
          user_type:ctrl.collectionName.toLowerCase(),
          role:'Admin',
          org_id:ctrl.model._id 
        }
     }else{
    datas={
            _id:ctrl.model.email,
            name:ctrl.model.first_name+" "+ctrl.model.last_name,
            user_type: ctrl.collectionName.toLowerCase(),
            mobile_number:ctrl.model.mobile_number,
            role:ctrl.model.designation,
            employee_id:ctrl.model.employee_id,
            status:"Email Sended"
          }
        }
     this.dataService.save('user',datas).subscribe((res: any) => {
     console.log(res);
     
    }
    )
     
  }


}

