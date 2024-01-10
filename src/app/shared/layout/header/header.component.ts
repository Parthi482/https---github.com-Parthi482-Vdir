import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/service/search.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
nav() {
  this.router.navigateByUrl("home")
}

  employer:any;
  searchValue: string = '';
  searchQuery: any;
  userImage:any;
  url:any = null;
  userName:any;
  profile_pic:any;
  jobSeekerName:any;
  Company_logo:any;
  employerName:any;
  isLoggedIn = false;
  isLoggedOut = false;
deatils:any
admin:boolean=false;
seeker:boolean=false;
city:IDropdownSettings = {
  singleSelection: false,
  idField: 'city',
  textField: 'city',
  limitSelection:1,
  allowSearchFilter: true,
};

cityList:any[] = [];
  constructor( private route:ActivatedRoute ,private router:Router , private auth : ApiService,private sharedService: SharedService){
   
   }
   
   isSearchDropdownOpen: boolean = false;

   toggleSearchDropdown() {
     this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
   }


   onDropdownChange(selectedItems: any) {
    this.sharedService.updateDropdownValues(selectedItems);
    console.log(selectedItems);

  }


  onSearchClick() {
    this.sharedService.updateSearchQuery(this.searchValue);
    console.log(this.searchValue);

  }
  // onSearchInputChange() {
  //   this.sharedService.updateSearchValue(this.searchValue);
  //   console.log(this.searchValue);

  // }

  ngOnInit(){

// if(this.auth.decodeToken().role==='Company'){
// this.admin=true
// console.log(this.admin);
// this.userName=this.auth.decodeToken().name
// // console.log(this.userName);
// }else{
// this.seeker=true
// console.log(this.seeker);
// this.userName=this.auth.decodeToken().firstName
// // console.log(this.userName);
// }

this.auth.isLoggedIn().then((data:any)=>{

if(data==true){
    this.isLoggedIn = true;
    // this.isLoggedOut=false
    this.deatils=this.auth.getdetails()
    console.log(this.deatils);
     this.userName=this.deatils.user_name
    console.log(this.deatils.Name);
    this.profile_pic=this.deatils.user_photo


  } else{
    this.isLoggedIn = false;
    this.deatils=this.auth.getdetails()
    console.log(this.deatils);

  }

})

  }
  search = new FormGroup({
    city: new FormControl(""),
    domain: new FormControl(""),
   value: new FormControl("")

  });
  data:any
  onItemSelect() {

      let data:any = this.search.getRawValue()
console.log(data);

  let val:any[]=[data.city[0].city,data.domain,data.value]
// console.log(val);
let route:any=this.route
// console.log(route);
// console.log(route?.url._value[0].path);

// console.log(route?.routeConfig.path);
console.log(route?._routerState.snapshot.url);
const cityValue = val[0];
const typeValue = val[1];
const domainValue = val[2]

// this.router.navigateByUrl('jobs/')
// if (route?._routerState.snapshot.url=='/jobs'||route?._routerState.snapshot.url==`/jobs?city=${cityValue}&type=${typeValue}`){
//   this.router.navigate(
//     ['/jobs'],
//     { queryParams: { city: data.city[0].city,type:data.value } }
//   );
// }
// else if(route?._routerState.snapshot.url=='/companies'||route?._routerState.snapshot.url==`/companies?city=${cityValue}&type=${typeValue}`){
//   this.router.navigate(
//     ['/companies'],
//     { queryParams: { city: data.city[0].city,type:data.value } }
//   );
// }
// else{
//   console.log('hi')
// }

if (data.domain === "Jobs") {
  const formattedValue = data.value.replace(/\s+/g, '-');
  this.router.navigate(
    ['/jobs'],
    { queryParams: { city: data.city[0].city, type: formattedValue } }
  );
} else if (data.domain === "Companies") {
  const formattedValue = data.value.replace(/\s+/g, '-');
  this.router.navigate(
    ['/companies'],
    { queryParams: { city: data.city[0].city, type: formattedValue } }
  );
} else {
  const formattedValue = data.value.replace(/\s+/g, '-');
  this.router.navigate(
    ['/home'],
    { queryParams: { city: data.city[0].city, type: formattedValue } }
  );
}

this.sharedService.updateDropdownValues(val);
    // console.log(val);



  }
//  click(){
//   let data:any = this.search.getRawValue()

//   let val:any[]=[data.city[0].city,data.value]
// console.log(val);



//  }

  ngOnChanges(){
// console.log(this.auth.decodeToken());
this.auth.isLoggedIn().then((data:any)=>{
  this.isLoggedIn = data;

})
    // if(this.auth.decodeToken()){
    // } else{
    //   this.isLoggedIn = false;

    // }
  }
  func3(parms: any, role: string) {
    let userType: string;

    if (role === "Seeker") {
      userType = "Seeker";
    } else if (role === "Company") {
      userType = "Company";
    }else if(role === "selfEmployer"){
      userType = "selfEmployer";

    } else {
      // Handle the case where role is neither "seeker" nor "employer"
      console.error("Invalid role:", role);
      return; // Do not proceed further
    }

    localStorage.setItem("userType", userType);
    this.router.navigateByUrl('auth/login');
  }

func0(){
  this.router.navigateByUrl('/home')

}
  func4(params:any){
if(params=='Seeker'){
  this.router.navigateByUrl('auth/register/'+'Seeker')
}else if(params=='Company'){
  this.router.navigateByUrl('auth/register/'+'Company')
}else{
  this.router.navigateByUrl('auth/register/'+'selfEmployer')

}


}
func113(){
  this.router.navigateByUrl('/list/screen')

}
func11(){
  this.router.navigateByUrl('/jobs')

}
route3(){
  this.router.navigateByUrl('admin/jobs')
}

route4(){
  this.router.navigate(['admin/candidates/all'])
}
route2(){
  this.router.navigateByUrl('admin/preview-profile')
}
route1(){
  this.router.navigateByUrl('admin/dashboard')
}
func12(){
  this.router.navigateByUrl('dashboard/createcv')
}
func22(){
  this.router.navigateByUrl('dashboard/applied-jobs')

}
func13(){
  this.router.navigateByUrl('/companies')
}
func111(){
  this.router.navigateByUrl('eventlanding')
}
signOut() {
  console.log(this.deatils);

  let data=this.deatils.role
  console.log(data);
this.isLoggedIn=false
this.isLoggedOut=true
  localStorage.clear();
  sessionStorage.clear();
  // this.auth.signOut();
  // this.router.navigate(['auth/login']);
  this.router.navigateByUrl('/home')

}
func44(){
  this.router.navigateByUrl('dashboard/profile')

}
cl9(value: any) {
this.isLoggedIn = true
this.isLoggedOut = value
}
cl10(value: any) {
  this.isLoggedOut = true
  this.isLoggedIn = value
  }

}


