import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';



@Component({
    selector: 'login-input',
    template: `
        <style>
           .logo {
  text-align: center;
  justify-content: center;

}
        </style>
 <div className="font">
  <section class="h-100" style="background-color:var(--main-color)">
    
     <div class="container py-5 h-100">
      <div class="logo">
        <img src="/assets/image/vdirectory-small-logo.png" width="180px" height="100px">
    </div>
      <div class="row d-flex justify-content-center align-items-center vh-80">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
            
              <!-- <span style="color: var(--button-color); font-family: sans-serif;" class="mb-5 fs-4">Login Using</span> -->
              <div  class="center-div" (click)="authService.GoogleAuth()" style="cursor: pointer;padding: 10px 0px;">
                <img src="/assets/image/google-signup.png" width="60%" height="30%" alt="Gmail Login" title="Gmail Login">
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </section>
</div>
   `,

})
export class Login implements OnInit {
    constructor( public authService: AuthService){}

    ngOnInit() {  

    }

}