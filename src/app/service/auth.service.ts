import { Injectable, NgZone } from "@angular/core";
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
  ) {}

  obj: any = {};
  obj1: any = {};
  obj2: any = {};
  obj3: any = {};

  //firebase login function
  // GoogleAuth() {
  //   console.log(this.AuthLogin(new firebase.auth.GoogleAuthProvider()));

  //   return this.AuthLogin(new firebase.auth.GoogleAuthProvider());

  // }

  // async AuthLogin(provider: any) {
  //   try {
  //     const result: any = await this.afAuth.signInWithPopup(provider);
  //     this.SetUserData(result.user.multiFactor.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.warn(result.additionalUserInfo?.profile);

        this.SetUserData(result.additionalUserInfo?.profile);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async SetUserData(user: any) {
    console.log(user);

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
        let doc = res.data[0].response;
        console.warn("sdfsdfsdf", user);

        if (doc.length <= 0) {
          let userData = {
            _id: user.id,
            userId: user.id,
            user_name: user.given_name,
            email: user.email,
            last_name: user.family_name,
            mobile_number: user.phoneNumber,
            user_photo: user.picture || "/assets/image/default-user.jpg",
            role: "user",
            isProfileCompleted: false,
            isActive: true,
            user_type: "",
          };
          console.warn(userData);
          localStorage.setItem("auth", JSON.stringify(userData));

          this.dataservice
            .saveUser("user", userData)
            .subscribe((result: any) => {
              this.token.push({ token: result.data });
              this.token.push({ token: userData });
              this.dataservice.storedToken(this.token);
              console.log(user);

              this.userProfile = user;
              this.callRedirect(user.email);
            });
        }
      });
  }

  callRedirect(email: any) {
    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "email", operator: "EQUALS", value: email }],
        },
      ],
    };

    this.dataservice
      .getDataByFilter("user", filterCondition1)
      .subscribe((res: any) => {
        let data = res.data[0].response;

        this.userId = data._id;

        this.router.navigate([`/edit/profile/${this.userId}`]);
      });
 





    // this.api.GetByID('user', 'email', email).subscribe((data: any) => {
    //   this.userId = data[0]._id;
    //   console.log(this.userId);

    // Move the condition checks inside the subscription block
    // if (this.userId) {
    //     if (!this.userProfile.isProfileCompleted || newUser) {
    //         this.router.navigate([`/edit/profile/${this.userId}`]);
    //     } else {
    //         this.router.navigate([`/edit/profile/${this.userId}`]);
    //     }
    // }
    // });
  }

  // } else {
  //   debugger

  //   this.token.push({ token: user.accessToken })
  //   this.token.push(doc[0]);

  //   // this.api.storedToken(this.token);
  //   // this.userProfile = doc[0];

  //   // console.log(this.userId,"2");
  //   this.callRedirect(this.userProfile.email)
  // }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem("user")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     this.router.navigate(['home']);
  //   });
  // }

  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result:any) => {
  //       this.router.navigate(['home']);
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error:any) => {
  //       window.alert(error);
  //     });
  // }
  // facebookLogin(){
  //   return this.doFacebookLogin(new auth.FacebookAuthProvider()).then((res:any)=>{
  //     this.router.navigate(['home']);
  //   })
  // }
  // doFacebookLogin(provider:any){
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((res:any) => {
  //       this.router.navigate(['home']);
  //       this.SetUserData(res.user);
  //     })
  //     .catch((error:any) => {
  //       window.alert(error);
  //     });
  // }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,

  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }
  // Sign out
  //   SignOut() {
  //     return this.afAuth.signOut().then(() => {
  //       sessionStorage.removeItem('user');
  //       this.router.navigate(['login']);
  //     });
  //   }
  // }
}

// import { Injectable, NgZone } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import { Router } from '@angular/router';
// import { FormGroup } from '@angular/forms';

// import { DataService } from './data.service';
// import { ApiService } from './search.service';
// import firebase from 'firebase/compat/app';
// import { async } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   userProfile: any;
//   token: any[] = [];
//   userData: any; // Save logged in user data
//   userId: any;
//   constructor(
//     public afs: AngularFirestore,
//     private afAuth: AngularFireAuth,
//     private api: ApiService,
//     private dataservice: DataService,
//     public router: Router,
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {

//   }

//   obj: any = {}
//   obj1: any = {}
//   obj2: any = {}
//   obj3: any = {}

//   //firebase login function
//   GoogleAuth() {

//     return this.AuthLogin(new firebase.auth.GoogleAuthProvider());

//   }

//   async AuthLogin(provider: any) {
//     try {
//       const result: any = await this.afAuth.signInWithPopup(provider);
//       this.SetUserData(result.user.multiFactor.user);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async SetUserData(user: any) {

//   const filterCondition1 = {
//     filter: [
//       {
//         clause: "AND",
//         conditions: [{ column: "email", operator: "EQUALS", value:  user.email }],
//       },
//     ],
//   };

//     this.dataservice.getDataByFilter('user',filterCondition1  )
//       .subscribe( (doc: any) => {
//         let response = doc.data[0]
//         console.log("cfghb");
//         console.log(user);

//         if (response == null) {
// console.log("if");

//           let userData = Object.assign(
//             { userId: user.uid },
//             { user_name: user.displayName }, { email: user.email },
//             { mobile_number: user.phoneNumber },
//             { user_photo: user.photoURL || '/assets/image/default-user.jpg' },
//             { role: "user" }, { isProfileCompleted: false }, { isActive: true },
//             { user_type: '' })
//           console.log(userData);
//           // localStorage.setItem('auth', JSON.parse(userData))
//          this.dataservice.save('user', userData).subscribe((result: any) => {
//            console.log(result);
//            this.token.push({ token: user.accessToken })
//            this.token.push(userData);

//            this.api.storedToken(this.token);

//            this.userProfile = userData;
//            this.callRedirect(user.email,"newUser")
//         }
//         )

//         } else {
//           console.log("else");

//           this.token.push({ token: user.accessToken })
//           this.token.push(doc[0]);

//           this.api.storedToken(this.token);
//           this.userProfile = doc[0];

//           console.log(this.userId,"2");
//           this.callRedirect(this.userProfile.email)
//         }
//       })

//   }
//   callRedirect(email:any,newUser?:any) {

//     const filterCondition1 = {
//       filter: [
//         {
//           clause: "AND",
//           conditions: [{ column: "email", operator: "EQUALS", value:  email }],
//         },
//       ],
//     };

//     this.dataservice.getDataByFilter('user',filterCondition1  ).subscribe((data: any) => {
//       let response = data.data[0]

//       this.userId = response[0]._id;
//       console.log(this.userId);

//       // Move the condition checks inside the subscription block
//       if (this.userId) {
//           if (!this.userProfile.isProfileCompleted || newUser) {
//               this.router.navigate([`/edit/profile/${this.userId}`]);
//           } else {
//               this.router.navigate([`/edit/profile/${this.userId}`]);
//           }
//       }
//   });
//   }
//   // Returns true when user is looged in and email is verified
//   get isLoggedIn(): boolean {
//     const user = JSON.parse(sessionStorage.getItem('user')!);
//         return user !== null && user.emailVerified !== false ? true : false;

//   }

//   // Sign in with Google
//   // GoogleAuth() {
//   //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
//   //     this.router.navigate(['home']);
//   //   });
//   // }

//   // Auth logic to run auth providers
//   // AuthLogin(provider: any) {
//   //   return this.afAuth
//   //     .signInWithPopup(provider)
//   //     .then((result:any) => {
//   //       this.router.navigate(['home']);
//   //       this.SetUserData(result.user);
//   //     })
//   //     .catch((error:any) => {
//   //       window.alert(error);
//   //     });
//   // }
//   // facebookLogin(){
//   //   return this.doFacebookLogin(new auth.FacebookAuthProvider()).then((res:any)=>{
//   //     this.router.navigate(['home']);
//   //   })
//   // }
//   // doFacebookLogin(provider:any){
//   //   return this.afAuth
//   //     .signInWithPopup(provider)
//   //     .then((res:any) => {
//   //       this.router.navigate(['home']);
//   //       this.SetUserData(res.user);
//   //     })
//   //     .catch((error:any) => {
//   //       window.alert(error);
//   //     });
//   // }
//   /* Setting up user data when sign in with username/password,
//   sign up with username/password and sign in with social auth
//   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//   // SetUserData(user: any) {
//   //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//   //     `users/${user.uid}`
//   //   );
//   //   const userData: User = {
//   //     uid: user.uid,
//   //     email: user.email,
//   //     displayName: user.displayName,
//   //     photoURL: user.photoURL,
//   //     emailVerified: user.emailVerified,

//   //   };
//   //   return userRef.set(userData, {
//   //     merge: true,
//   //   });
//   // }
//   // Sign out
//   //   SignOut() {
//   //     return this.afAuth.signOut().then(() => {
//   //       sessionStorage.removeItem('user');
//   //       this.router.navigate(['login']);
//   //     });
//   //   }
//   // }
// }
