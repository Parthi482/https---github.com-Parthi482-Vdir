import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/search.service';
import { SharedService } from 'src/app/service/shared.service';
import { parse } from 'uuid';
import { isEmpty } from "lodash";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nav() {
    this.router.navigateByUrl("home")
  }

  employer: any;
  searchValue: string = '';
  searchQuery: any;
  userImage: any;
  url: any = null;
  email: any
  userName: any;
  profile_pic: any;
  jobSeekerName: any;
  Company_logo: any;
  employerName: any;
  isLoggedIn: boolean = false;
  isLoggedOut = false;
  deatils: any
  admin: boolean = false;
  seeker: boolean = false;
  city: IDropdownSettings = {
    singleSelection: false,
    idField: 'city',
    textField: 'city',
    limitSelection: 1,
    allowSearchFilter: true,
  };

  cityList: any[] = [];
  constructor(private cf: ChangeDetectorRef, private route: ActivatedRoute, public authService: AuthService, private router: Router, private auth: ApiService, private sharedService: SharedService) {

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

  ngOnInit() {
 
   
  
  }


  isMenuActive: boolean = false;
Onclick(){
  this.isMenuActive = !this.isMenuActive;
}



  search = new FormGroup({
    city: new FormControl(""),
    domain: new FormControl(""),
    value: new FormControl("")

  });
  data: any
  onItemSelect() {

    let data: any = this.search.getRawValue()
    console.log(data);

    let val: any[] = [data.city[0].city, data.domain, data.value]
    let route: any = this.route
    console.log(route?._routerState.snapshot.url);
    const cityValue = val[0];
    const typeValue = val[1];
    const domainValue = val[2]

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

  }

  ngAfterContentChecked(): void {
    let authData: any = localStorage.getItem('auth');
    let user = JSON.parse(authData);

    if (!isEmpty(user)) {
      this.isLoggedIn = true;
      this.email = user.email
      this.userName = user.user_name;
      this.profile_pic = user.user_profile;
    }


  }


  // ngOnChanges() { 
  //   console.log("changes");

  // }

  func3(parms: any, role: string) {
    let userType: string;

    this.router.navigateByUrl('auth/login');
  }

  func0() {
    this.router.navigateByUrl('/home')

  }
  func4(params: any) {
    if (params == 'Seeker') {
      this.router.navigateByUrl('auth/register/' + 'Seeker')
    } else if (params == 'Company') {
      this.router.navigateByUrl('auth/register/' + 'Company')
    } else {
      this.router.navigateByUrl('auth/register/' + 'selfEmployer')

    }


  }

  func113() {
    this.router.navigateByUrl('/list/screen')

  }
  func11() {
    this.router.navigateByUrl('/jobs')

  }
  route3() {
    this.router.navigateByUrl('admin/jobs')
  }

  route4() {
    this.router.navigate(['admin/candidates/all'])
  }
  route2() {
    this.router.navigateByUrl('admin/preview-profile')
  }
  route1() {
    this.router.navigateByUrl('admin/dashboard')
  }
  func12() {
    this.router.navigateByUrl('dashboard/createcv')
  }
  func22() {
    this.router.navigateByUrl('dashboard/applied-jobs')

  }
  func13() {
    this.router.navigateByUrl('/companies')
  }
  func111() {
    this.router.navigateByUrl('event-home')
  }
  signOut() {
    // let data = this.deatils.role
    this.isLoggedIn = false
    // this.isLoggedOut = true
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/home')
  }
  func44() {
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


