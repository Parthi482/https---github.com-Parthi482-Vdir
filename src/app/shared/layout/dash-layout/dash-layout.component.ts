import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.css']
})
export class DashLayoutComponent {
  ishow:boolean = false
  constructor(  private route: ActivatedRoute,){ 
    this.route.params.subscribe((params:any) => { 
      
        if (params == "event"){
          this.ishow = true
        }
  })
  }
}
