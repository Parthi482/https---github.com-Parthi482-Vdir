import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'app-home-input',
    template: `

<div class="container">
  <div class="row">
    <div class="col-sm">
        <h1>Event List</h1>
    </div>
    <div class="col-sm">
    <h1>Business directory</h1>
     
    </div>
    <div class="col-sm">
    <h1>job List</h1>
      
    </div>
    <div class="col-sm">
     <h1>Self Employee</h1>
    </div>
    
  </div>
</div>


<!-- <div fxLayout="row" fxLayoutGap="16px">
  <div fxFlex="25%"> 
    <mat-card> 
    </mat-card>
  </div>
  <div fxFlex="25%"> 
    <mat-card> 
    </mat-card>
  </div>
  <div fxFlex="25%"> 
    <mat-card> 
    </mat-card>
  </div>
  <div fxFlex="25%"> 
    <mat-card> 
    </mat-card>
  </div>
</div> -->




     
    
    
    `
  })


  export class HomeScreenInput implements OnInit {
    ngOnInit(): void {
        console.log("sdk initialized");
        
    }

  }