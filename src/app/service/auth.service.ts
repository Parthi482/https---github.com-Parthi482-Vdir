import { ChangeDetectorRef, Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

import { DataService } from "./data.service";
import { ApiService } from "./search.service";
import firebase from "firebase/compat/app";
import { async } from "rxjs";
import { isEmpty } from "lodash";

type NewType = boolean;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userProfile: any;
  token: any[] = [];
  userData: any; // Save logged in user data
  userId: any;
  constructor( 
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private api: ApiService,
    private dataservice: DataService,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  obj: any = {};
  obj1: any = {};
  obj2: any = {};
  obj3: any = {};

  //firebase login function

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers 
  async AuthLogin(provider: any) {
    try {
      const result: any = await this.afAuth.signInWithPopup(provider);
      console.warn(result);
      
      this.SetUserData(result.additionalUserInfo?.profile);
    } catch (error) {
      console.log(error);
    }
  }


  async SetUserData(user: any) { 
    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [
            { column: "email", operator: "EQUALS", value: user.email },
          ],
        },
      ],
    };

    this.dataservice
      .getDataByFilter("user", filterCondition1)
      .subscribe(async (res: any) => {
        let doc = res.data[0].response 
        if (!isEmpty(doc)) {  
          this.dataservice.GetTokenHanderUser(doc[0].email).subscribe((res: any) => { 
            if (!isEmpty(res.data)) {    
              localStorage.setItem('auth', JSON.stringify(doc[0]));
              localStorage.setItem('token', res.data.token); 
              this.userProfile = doc; 
              this.router.navigate([`home`]); 
            } 
          }) 
        } else {   
          
          let userData = {
            _id:  user.id,
            user_id: user.id,
            first_name:user.given_name,
            user_name: user.given_name,
            email: user.email,
            last_name: user.family_name,
            mobile_number: user.phoneNumber,
            user_profile: user.picture || "/assets/image/default-user.jpg",
            role: "user",
            isProfileCompleted: false,
            isActive: true,
            user_type: "",
          };  
          
          this.dataservice
            .saveUser(userData)
            .subscribe((result: any) => {    
              localStorage.setItem('auth', JSON.stringify(userData));
              localStorage.setItem('token',  result.data); 
              this.userProfile = user;
              this.router.navigate([`/edit/user/${userData._id}`]); 
            }); 
        } 
      }); 
  }
 
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem("auth")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

 
} 