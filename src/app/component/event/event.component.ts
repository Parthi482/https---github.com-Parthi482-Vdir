import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  FormlyFieldConfig,
  FormlyFieldProps,
  FormlyFormOptions,
} from "@ngx-formly/core";
import { DataService } from "src/app/service/data.service";
import { DialogService } from "src/app/service/dialog.service";
import { FormService } from "src/app/service/form.service";
import { HelperService } from "src/app/service/helper.service";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { startWith, map, takeUntil } from "rxjs/operators";
import { concat, create, isEmpty, uniqueId } from "lodash";
import { ButtonInput } from "src/app/control/button-input";

import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
diaglogbox() {

  this.CreateUser=false 
  this.Button.drawer.close();
   
}
  @Output("eventData") eventData = new EventEmitter<any>();
  @Input("dataEmitter") dataEmitter = new EventEmitter<any>();
  @Input() openDrawer: boolean = false;
  @Input("buttonData") buttonData: any;

  @Output("Testing") Testing = new EventEmitter<any>();
  @Input("Data") Data: any = {};
  DocImagePAth: any = environment.ImageBaseUrl;
  private destroy$: Subject<void> = new Subject<void>();

  url: any = null;
  url1: any = null;

  docBasePath: string = environment?.ImageBaseUrl;

  public gridOptions: GridOptions = {
    getDataPath: (data: any) => {
      return data.treePath;
    },

    animateRows: true,
    paginationPageSize: 10,
  };
  context: any;
  components: { [p: string]: any } | undefined;
  selectedRows: any;

  gridApi!: GridApi<any>;

  formName: any;
  ShowGrid: Boolean = false;
  searchbutText: any;
  opt: any;

  options1: any = {};
  multiples: string | undefined;

  field!: FormlyFieldConfig<
    FormlyFieldProps & { [additionalProperties: string]: any }
  >;

  data: any = {};

  searchFormGroup!: FormGroup;
  // eventFormGroup!: FormGroup;
eventFormGroup!: FormGroup;
  @Output() found = new EventEmitter<any>();
  // eventData = new EventEmitter<any>();
  public file: any;
  useroptions!: FormlyFormOptions;

  constructor(
    private cf: ChangeDetectorRef,
    private Button: ButtonInput,
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    private helperServices: HelperService,
    public dataService: DataService,
    private formService: FormService,
    private sanitizer: DomSanitizer
  ) {

    this.eventFormGroup = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      event_id: [''],
      last_name: [''],
      mobile_number: [''],
      gender: [''],
      description: [''],
      organization_name: [''],
      fullDescription:[''],
      edit: [''],
      index: [''],
      user_role: this.formBuilder.group({
        Delegates: false,
        Speaker: false,
        TeamMember: false,
        Buyer: false,
      }),
      user_photo: [''],
      email: ['', [Validators.required, Validators.email]],
      user_id: [''],
      userFileData: [''],
    });









    // super()
  }

  // eventFormGroup = new FormGroup({
  //   first_name: new FormControl("", [
  //     Validators.required,
  //     Validators.minLength(3),
  //   ]),
  //   event_id: new FormControl(""),
  //   last_name: new FormControl(""),
  //   mobileNumber: new FormControl(""),
  //   gender: new FormControl(""),
  //   description: new FormControl(""),
  //   organization_name: new FormControl(""),
  //   edit:new FormControl(""),
  //   index: new FormControl(""),
  //   user_role: this.formBuilder.group({
  //     Delegates: false,
  //     Speaker: false,
  //     TeamMember: false,
  //     Buyer: false,
  //   }),

  //   user_photo: new FormControl(""),
  //   email: new FormControl("",[  Validators.required,Validators.email]),
  //   user_id: new FormControl(""),
  //   userFileData: new FormControl(""),
  // });

  updateCategoryValue(category: string, value: boolean) {
    const categoriesControl = this.eventFormGroup.get("user_role")!;
    const categoryControl = categoriesControl.get(category) as FormControl;

    if (categoryControl) {
      categoryControl.setValue(value);
    }
  }

  ChangesFunc(buttonText: string) {
    this.CreateUser = true;
    this.butText = buttonText;
    // this.eventFormGroup.reset();
    this.url=null
    this.newuser = true
    this.eventFormGroup.reset()
    // this.olduser = false
  }


  User = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    
    lastName: new FormControl(""),
    mobileNumber: new FormControl(""),
    gender: new FormControl("",[  Validators.required]),
    description: new FormControl(""),
    organization_name: new FormControl(""),

    user_role: this.formBuilder.group({
      Delegates: false,
      Speaker: false,
      TeamMember: false,
      Buyer: false,
    }),

    user_photo: new FormControl("",[  Validators.required]),
    email: new FormControl("",[  Validators.required,Validators.email]),
    user_id: new FormControl(""),
    userFileData: new FormControl(""),
  })



  newuser:boolean= false
 
  // todo default Both not visible
  SearchUser: boolean = false;
  SpeakerDetails: boolean = false;
  CreateUser: boolean = false;
  removable: boolean = false;

  selectControl: FormControl = new FormControl();

  public searchText: FormControl = new FormControl("", []);
  public search = { searchText: "" };
  remove:any
  // todo Editing and patching the data from button Ts
  logToConsole(data: any,edit:any,index:any) {
   

    this.ChangesFunc("update"); 
    this.eventFormGroup.patchValue({
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      gender: data.gender,
      description: data.description,
      organization_name: data.organization_name,
      user_role: data.user_role,
      user_photo: data.user_photo,
      email: data.email,
      user_id: data.user_id,
      userFileData: data.userFileData,
      event_id: data.event_id,
      edit:edit,
      index: index,
      fullDescription:data.fullDescription
    });

    this.url = data.user_photo
 
  } 

  collectionName = "event_participate";

  butText = "save";
  imagePath: any;
  form = new FormGroup({});

  myControl: FormControl = new FormControl();

  inputWidth = "300px";

  model: any = {};

  inputFields: FormlyFieldConfig[] = [
    {
      type: "logo",
      key: "user_photo",
      className: "flex-6",
      templateOptions: {
        label: "Profile",
      },
    },
    {
      fieldGroupClassName: "display-flex",
      fieldGroup: [
        {
          key: "first_name",
          type: "input",
          templateOptions: {
            label: "First Name",
            placeholder: "Enter your First name",
            required: true,
          },
        },
        {
          key: "last_name",
          type: "input",
          templateOptions: {
            label: "Last Name",
            placeholder: "Enter your Last name",
            required: true,
          },
        },
      ],
    },
    {
      key: "email",
      type: "input",
      templateOptions: {
        label: "Email ID",
        placeholder: "Enter your email address",
        required: true,
        type: "email",
      },
    },
    {
      key: "mobile_number",
      type: "input",
      templateOptions: {
        label: "Mobile Number",
        placeholder: "Enter your mobile number",
        required: true,
      },
    },
    {
      key: "gender",
      type: "select",
      templateOptions: {
        label: "Gender",
        placeholder: "Select your gender",
        required: true,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Not Prefer to say", value: "other" },
        ],
      },
    },
    {
      key: "fullDescription",
      type: "textarea",
      templateOptions: {
        label: "Profile Description",
        placeholder: "Write a brief description about yourself",
      },
    },
  ];

  formData!: any;

  receivedData: any;

  showFormlyField: boolean = false;

  valueProp = "email";
  labelProp = "first_name";
  onValueChangeUpdate: any;
  optionsvalue!: any[];
  DataOptions!: string[];

  options: string[] = [];

  filteredOptions: any;

  curentEventID: any;

  arrayvalueEvents: any;

  ngOnInit() {
    this.initForm();

    this.getNames();
    this.curentEventID = sessionStorage.getItem("event_id");
    // this.eventFormGroup.reset()
    // this.EventIDGen("")
  }

  // EventIDGen(val:any) {
  //   debugger
  //   // // console.log("sdfsdfsdfsdfsdfsdfsdfsdfsdfsd", id);
  //   // // console.warn("Cretae Workers");
    
  //   // // this.arrayvalueEvents = id;
  //   // this.eventFormGroup.reset()
  //   // this.url =null
  //   console.log(val);
    
  // }

  getNames() {
    this.getData().subscribe((users: any[]) => {
      console.log(users);
      this.options = users;
      this.filteredOptions = users;
    });
  }

  getData(): Observable<any[]> {
    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "_id", operator: "NOTEQUAL", value: "" }],
        },
      ],
    };

    return this.dataService.getDataByFilter("test_user", filterCondition1).pipe(map((res: any) => res.data[0].response.map((user: any) => user)));
  }

  initForm() {
    this.searchFormGroup = this.formBuilder.group({
      search_user: [""],
    });

    this.searchFormGroup
      .get("search_user")
      ?.valueChanges.subscribe((response) => {
        this.filterData(response);
      });
  }

  filterData(enterData: any) {
    this.filteredOptions = this.options.filter(
      (user: any) =>
        typeof user === "object" &&
        user.first_name &&
        user.first_name.toLowerCase().includes(enterData.toLowerCase())
    );
  }
  olduser:boolean= false
  onOptionSelected(event: MatAutocompleteSelectedEvent ) {

    this.newuser = false; 
    const selectedFirstName = event.option.value;

    // const selectedUser = this.options.find(user => user);
    const selectedUser = this.options.find(
      (user: any) => user.first_name === selectedFirstName
    );
this.olduser = true 

    this.showFormForUser(selectedUser);

  }

  UserData: any;
  showFormForUser(user: any) {
    this.CreateUser = true;

    this.url = user.user_photo;
    console.log("fdsffsdfsdfsdf",user)
    //todo To bind the UserData
    this.UserData = user;

    // if User data is available to patch the data
    if (!isEmpty(user)) {
      this.eventFormGroup.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        mobile_number: user.mobile_number,
        gender: user.gender,
        description: user.description,
        user_id: user._id,
        user_photo:user.user_photo,
        organization_name:user.organization_name,
        fullDescription:user.fullDescription,
        email: user.email,
      });

      this.butText = "update";
    }
  } 
  olduserimageChanged: boolean = false;
  // fileInputs: any;



  formDatas =   new FormData();
  
//todo User_image
  onFileSelected(event: any) {
    const fileInput: any = document.getElementById('fileInput');
    const file = fileInput.files[0];
     const formData=new FormData();
      formData.append("file", file);
      formData.append("user_profile", "test_user");
      let emailID:any=this.eventFormGroup.value.email || ''
if(emailID==''){
this.dialogService.openSnackBar("Email Id Should Is Required","ok")
return
} 
      this.dataService.imageupload("temporary_user", emailID, formData).subscribe((res: any) => {
        if (res.data) {
              let image_Storage:any= "https://pms-api.sgp1.digitaloceanspaces.com/"+res.data[0].storage_name;
    this.eventFormGroup.get("user_photo")?.setValue(image_Storage)
    console.warn(this.eventFormGroup.value);
    
  this.olduserimageChanged = true;
    // this.cf.detectChanges()
  
        }
      })
 
      
    // }

  }




  //todo Image Show the Screen
  handleFileUpload(event: any) {

    let emailID:any=this.eventFormGroup.value.email || ''
    if(emailID==''){
      this.dialogService.openSnackBar("Email Id Should Is Required","ok")
      return
      } 
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event: any) => {
        this.url = event.target.result;
  this.cf.detectChanges()

      }; 
  }
 

 newUserID:any
//todo edit and new user
 saveForm() { 

  let regularFormData:any = this.eventFormGroup.value;  
  if (regularFormData.edit == "edit"|| this.olduser == true ){  
this.dataService.update("test_user", regularFormData.user_id, regularFormData)
.subscribe((Update: any) => {
  // console.log(Update);
  console.log("Update", Update);

  this.CreateUser = false;
  // this.url =null
  
  this.eventData.emit(regularFormData);
  this.eventFormGroup.reset();
  this.Button.drawer.close();this.olduserimageChanged=false
});


  }
  else if(this.newuser==true){

    //todo New User Added 
    // var formData = new FormData();
    // formData.append("file", this.fileInputs);
    // formData.append("category", "test_user");
 
this.dataService.save("test_user",regularFormData)
.subscribe((newUser: any) => {
  // console.log(newUser);
  console.log("newUser", newUser);
  regularFormData["_id"]=newUser.data["insert ID"]
  this.CreateUser = false;
  // this.url =null
  this.getNames()
  this.eventData.emit(regularFormData);
  this.eventFormGroup.reset();
  this.Button.drawer.close();this.olduserimageChanged=false
});

    // this.dataService
    // .imageupload("temporary_user", regularFormData.email, this.formDatas).subscribe((res: any) => {
    //   if (res.data) {
    //     regularFormData.user_photo =
    //       "https://pms-api.sgp1.digitaloceanspaces.com/" +
    //       res.data[0].storage_name;

    //       this.CreateUser = false;
    //       this.url =null
    
    //       this.eventData.emit(regularFormData);
    //       this.eventFormGroup.reset();
    //       this.Button.drawer.close();
    //       this.olduserimageChanged=false
    //       return
    //   }})
 
  }
  
 }

// saveForm(){


//   let regularFormData = this.eventFormGroup.value;
 




//     this.dataService
//     .imageupload("temporary_user", regularFormData.email, this.formDatas).subscribe((res: any) => {
//       if (res.data) {
//         regularFormData.user_photo =
//           "https://pms-api.sgp1.digitaloceanspaces.com/" +
//           res.data[0].storage_name;
 
//           let userData = {
//             email: regularFormData.email,
//             first_name: regularFormData.firstName,
//             lastName: regularFormData.lastName,
//             mobile_number: regularFormData.mobileNumber,
//             gender: regularFormData.gender,
//             description: regularFormData.description,
//             user_role: regularFormData.user_role,
//             user_profile: regularFormData.user_photo,
//             is_verify: false,
//           };
 
//           this.dataService.save("test_user",userData).subscribe((res: any) => {
//             console.log(res);
      
//           })

//       }})
 
//       this.CreateUser = false;
//       this.url =null
//       this.eventData.emit(regularFormData);
//       // this.eventFormGroup.reset();
//       this.Button.drawer.close();



// }
 



  userCollectionUpdate(data: any) {

    let UserData={
      "first_name": data.first_name,
      "last_name": data.last_name,
      "mobile_number": data.mobile_number,
      "gender": data.gender,
      "fullDescription": data.fullDescription,
      "user_photo": data.user_photo,
      "email": data.email,

    } 
    return UserData
  }
  
 EventColectionUpdate(data:any){
  let event = {
    "first_name": data.first_name,
    "last_name": data.last_name,
    "mobile_number": data.mobile_number,
    "gender": data.gender,
    "fullDescription": data.fullDescription,
    "user_photo": data.user_photo,
    "email": data.email,
    // "event_id": data.event_id

  }
  return event
 }  


}