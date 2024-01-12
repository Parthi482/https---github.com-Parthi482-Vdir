import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
// import { Carousel } from '@fancyapps/ui';
// import '@fancyapps/ui/dist/carousel/carousel.css';

@Component({
    selector: 'app-home-input',
    template: `
   
   <div fxLayout.xs="column" fxLayout="row wrap" fxLayoutGap="10px" ngClass.gt-xs="ml-10">
  <div>
    <h1>hi</h1>
  </div> 
  <div>
    <h1>hi</h1>
  </div> 
  <div>
    <h1>hi</h1>
  </div> 
</div>
    
    `
  })


  export class HomeScreenInput  implements OnInit {
    ngOnInit(): void {
        console.log("sdk initialized");
        
    }
   
  }