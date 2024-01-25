import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatOptionModule,
    MatSelectModule, MatFormFieldModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: any = {};
  editing: boolean = false;
  Email: any;
  email: any;
  id: any;
  url: any = null;
  path: any;
  NewUser: boolean = false;
  OldUser: boolean = false;

  profileForm: FormGroup = new FormGroup({});
  data: any
  selectedUserType!: string;
  userTypes = [
    { label: 'Employee/Job Seeker', value: 'Employee/Job Seeker' },
    { label: 'Business Owner', value: 'Business Owner' },
    { label: 'Voluntary', value: 'Voluntary' },
    { label: 'Self Employee/Skilled Labour', value: 'Self Employee/Skilled Labour' }
  ];
  profileData: any
  constructor(private http: HttpClient, private auth: ApiService, private dataservice: DataService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.Email = this.auth.decodeToken().email;
    this.data = this.auth.getdetails()
    // let val = this.data;
    this.route.params.subscribe(params => {
      const user = params['flag'];

      if (user === "true") {
        this.NewUser = true;
        this.OldUser = false;
      } else {
        this.NewUser = false;
        this.OldUser = true;
      }
    });
    // console.log(this.data._id);
    this.dataservice.getDataById("user", this.data._id).subscribe((res: any) => {
      let val = res.data[0]

      this.profile = {
        firstName: val.user_name,
        lastName: val.last_name,
        email: val.email,
        
        password: val.password,
        role: val.role,
        phone: val.phone,
        education: val.education,
        dateofbirth: val.dateofbirth,
        profile_pic: val.profile_pic,
        resume: val.resume,
        address: val.address,
        user_type: val.user_type
      };
      this.url = val.user_profile

    })

    // this.getData()


  }




  getData() {
    this.dataservice.getDataById("user", "115630771831972926623").subscribe((res: any) => {
      this.profileData = res.data[0]

    })
  }
  noSpacesValidator(control: any) {
    const value = control.value;
    if (value && /[0-9\s]/.test(value)) {
      return { hasSpaces: true };
    }
    return null;
  }
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    {


      const enteredDate = new Date(control.value);
      const today = new Date();
      const differenceInMilliseconds = Math.abs(today.getTime() - enteredDate.getTime());
      const differenceInYears = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));


      if (differenceInYears >= 18) {
        return null;
      } else {
        return { underage: true };
      }
    }
  }
  noSpaceAtStartEnd(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && (control.value as string).trim().length === 0) {
        return { 'noSpaceAtStartEnd': true };
      }
      if (control.value && (control.value as string).trim() !== control.value) {
        return { 'noSpaceAtStartEnd': true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, this.noSpaceAtStartEnd()]],
      lastName: ['', [Validators.required, this.noSpaceAtStartEnd()]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.noSpaceAtStartEnd(), Validators.pattern(/^[6-9][0-9]{9}$/)]],
      address: ['', Validators.required, this.noSpaceAtStartEnd()],
      dateofbirth: ['', [Validators.required, this.noSpaceAtStartEnd(), Validators.pattern(/^(?:(?:(?:0[1-9]|[12][0-9]|3[01])[\/-](?:0[1-9]|1[0-2])[\/-]\d{4})|(?:\d{4}[\/-](?:0[1-9]|1[0-2])[\/-](?:0[1-9]|[12][0-9]|3[01])))$/)]],
      education: ['', [Validators.required, this.noSpaceAtStartEnd()]],
      user_type: ['']
    });
  }
  // formData.append('file', file);
  // formData.append('data', this.selfEmployerForm.value.selfEmployer_id);
  // formData.append('category', type);
  // formData.append('collectionName', 'selfEmployer');
  // this.auth.finalfileUpload(formData, 's3').subscribe((res: any) => {
  //   const newControl: any = this.fb.control(res["S3 key"]);

  //   this.selfEmployerForm.addControl(id, newControl);
  //   console.log(this.selfEmployerForm);
  handleFileUpload() {
    const fileInput: any = document.getElementById('fileInput');
    const file = fileInput.files[0];
    let id = this.data._id
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', id);
    formData.append('category', 'profile_pic');
    formData.append('collectionName', 'seekers_info');


    // this.auth.fileUpload(formData).subscribe((res:any)=>{
    //   console.log(res);

    // })
    this.dataservice.imageupload("resume", id, formData).subscribe((res: any) => {
      console.log(res);

    })
  }
  ResumeUpload() {
    const formFile: any = document.getElementById('formFile');
    const file = formFile.files[0];
    let id = this.data._id
    const resume = new FormData();
    resume.append('file', file);
    resume.append('data', id);
    resume.append('category', 'resume');
    resume.append('collectionName', 'seekers_info');

    this.dataservice.imageupload("resume", id, resume).subscribe((res: any) => {


    })
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  // ngOnInit(): void {
  //   this.fetchProfileData();
  // }

  // fetchProfileData(): void {
  //   this.http.get<any>(`http://127.0.0.1:8080/auth/user_resume/${this.Email}`)
  //   .subscribe(
  //   (data: any) => {
  //     // Handle the retrieved seeker's information
  //     console.log(data);
  //     // Do something with the data
  //   },
  //   (error: any) => {
  //     // Handle any errors that occurred during the request
  //     console.error(error);
  //     // Display an error message or take appropriate action
  //   }
  // );


  onPhotoSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
    }
  }

  UpdateProfile() {
    let formValue: any = this.profileForm.getRawValue()

    this.dataservice.update('user', this.data._id, formValue)
      .subscribe((res: any) => {
        if (!isEmpty(res.data)){
          this.router.navigate(['/home'])
        }

      });

  }

  saveProfile() {
    let formValue: any = this.profileForm.getRawValue()

    console.log(formValue);

    // this.http
    //   .put<any>(`http://127.0.0.1:8080/auth/seekers-info/${this.Email}`, this.profile)
    this.dataservice.update('user', this.data._id, formValue)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
        },
      });

    this.editing = false;
  }

}
