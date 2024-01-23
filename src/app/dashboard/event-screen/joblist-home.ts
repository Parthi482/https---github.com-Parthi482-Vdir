import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-joblist',

  template: `     
   
   <style>
  
    .center-container {
        display: flex;
        justify-content: center;
        align-items: center;  
    }
    .return-home{
      background-color: pink;
      border: none;
      border-radius: 30px;
      padding: 5px 20px;
      font-size: 16px;
      color: white;
      justify-content: center;
      align-items: center;

    }
  
</style>
 <div  class="center-container">
    <div>
        <h1 class="site-header__title" data-lead-id="site-header-title">THANK YOU! 
        </h1>
        <br>
  </div>
    <div> 
        <p class="main-content__body" data-lead-id="main-content-body">Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you.</p>
        <button class="return-home" [routerLink]="['/event-home']" routerLinkActive="router-link-active">Return to Home</button> 
      </div>
    </div>

  `,
})
export class JoblistHome {

  constructor(private auth: ApiService, private dataservice: DataService, private cvdr: ChangeDetectorRef) {

  }



}
