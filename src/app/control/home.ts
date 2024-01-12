import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
// import { Carousel } from '@fancyapps/ui';
// import '@fancyapps/ui/dist/carousel/carousel.css';

@Component({
    selector: 'app-home-input',
    template: `

<style>
  #cardSlider {
  --f-carousel-slide-width: 100%;
  --f-carousel-spacing: 0;
  --f-carousel-slide-padding: 0 1rem;

  --f-button-prev-pos: 5rem;
  --f-button-next-pos: 5rem;

  --f-button-bg: #fff;
  --f-button-color: #333;

  --f-button-width: 48px;
  --f-button-height: 48px;
  --f-button-border-radius: 50%;

  --f-button-svg-width: 27px;
  --f-button-svg-height: 27px;
  --f-button-svg-stroke-width: 1.5;

  --f-button-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

@media screen and (min-width: 640px) {
  #cardSlider {
    --f-carousel-slide-width: calc(100% / 3);
  }
}

</style>

<!-- <style>
  mat-toolbar {
  justify-content: space-between;
}

.content {
  padding: 16px;
}

.content > mat-card {
  margin-bottom: 16px;
}

.content > mat-card {
  width: 200px;
}

</style>
<div class="container">
  <div class="row">
    <div class="col-sm">
        <h1>Event List</h1>
         
<div class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
  <div
    [fxFlex]="(100/gridColumns) + '%'"
    fxFlex.xs="100%"
    fxFlex.sm="33%"
    *ngFor="let num of [1,2,3,4,5,6,7]"
  >
    <mat-card class="mat-elevation-z4" >
 
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
      />
      <mat-card-content>
        <p>
          Some text content
        </p>
      </mat-card-content>
 
    </mat-card>
  </div>
</div>

    </div>
    <div class="col-sm">
    <h1>Business directory</h1>
    <div class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
  <div
    [fxFlex]="(100/gridColumns) + '%'"
    fxFlex.xs="100%"
    fxFlex.sm="33%"
    *ngFor="let num of [1,2,3,4,5,6,7]"
  >
    <mat-card class="mat-elevation-z4">
 
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
      />
      <mat-card-content>
        <p>
          Some text content
        </p>
      </mat-card-content>
 
    </mat-card>
  </div>
</div>
    </div>

 

    <div class="col-sm">
    <h1>job List</h1>
    <div class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
  <div
    [fxFlex]="(100/gridColumns) + '%'"
    fxFlex.xs="100%"
    fxFlex.sm="33%"
    *ngFor="let num of [1,2,3,4,5,6,7]"
  >
    <mat-card class="mat-elevation-z4">
 
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
      />
      <mat-card-content>
        <p>
          Some text content
        </p>
      </mat-card-content>
 
    </mat-card>
  </div>
</div>
    </div>
 

    <div class="col-sm">
     <h1>Self Employee</h1>


     <div class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
  <div
    [fxFlex]="(100/gridColumns) + '%'"
    fxFlex.xs="100%"
    fxFlex.sm="33%"
    *ngFor="let num of [1,2,3,4,5,6,7]"
  >
    <mat-card class="mat-elevation-z4">
     
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
      />
      <mat-card-content>
        <p>
          Some text content
        </p>
      </mat-card-content>
 
    </mat-card>
  </div>
</div>
    </div>
    
  </div>
</div>

  -->
 <!-- carousel.component.html -->
<div id="app" class="p-4">
  <div class="max-w-6xl mx-auto">
    <div id="cardSlider" class="mb-8 py-10 f-carousel bg-gray-50">
      <div class="f-carousel__viewport flex px-12 overflow-x-auto">
        <figure class="f-carousel__slide mr-8">
          <img
            class="mb-4 h-full rounded-lg"
            alt=""
            width="300"
            height="400"
            src="https://source.unsplash.com/0Zx1bDv5BNY/300x400"
          />
          <figcaption>
            <h3 class="text-lg font-semibold">Lara</h3>
            <p>CEO</p>
          </figcaption>
        </figure>
        <figure class="f-carousel__slide mr-8">
          <img
            class="mb-4 h-full rounded-lg"
            alt=""
            width="300"
            height="400"
            src="https://source.unsplash.com/NPy59VPyYYg/300x400"
          />
          <figcaption>
            <h3 class="text-lg font-semibold">Celina</h3>
            <p>CTO</p>
          </figcaption>
        </figure>
        <figure class="f-carousel__slide mr-8">
          <img
            class="mb-4 h-full rounded-lg"
            alt=""
            width="300"
            height="400"
            src="https://source.unsplash.com/7jCYw6a2Wao/300x400"
          />
          <figcaption>
            <h3 class="text-lg font-semibold">Gislain</h3>
            <p>Lead Developer</p>
          </figcaption>
        </figure>
        <figure class="f-carousel__slide mr-8">
          <img
            class="mb-4 h-full rounded-lg"
            alt=""
            width="300"
            height="400"
            src="https://source.unsplash.com/xrWlGiv8m-4/300x400"
          />
          <figcaption>
            <h3 class="text-lg font-semibold">Adrien</h3>
            <p>Full Stack Developer</p>
          </figcaption>
        </figure>
        <figure class="f-carousel__slide mr-8">
          <img
            class="mb-4 h-full rounded-lg"
            alt=""
            width="300"
            height="400"
            src="https://source.unsplash.com/pQyIutdScOY/300x400"
          />
          <figcaption>
            <h3 class="text-lg font-semibold">Ruby</h3>
            <p>Full Stack Developer</p>
          </figcaption>
        </figure>
        <figure class="f-carousel__slide">
          <img
            class="mb-4 h-full rounded-lg"
            alt=""
            width="300"
            height="400"
            src="https://source.unsplash.com/WEDDt-u3q3o/300x400"
          />
          <figcaption>
            <h3 class="text-lg font-semibold">Lucas</h3>
            <p>Sales Manager</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</div>


     
    
    
    `
  })


  export class HomeScreenInput  implements AfterViewInit, OnDestroy,OnInit {
    ngOnInit(): void {
        console.log("sdk initialized");
        
    }
    // private carouselInstance: Carousel | null = null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.initializeCarousel();
  }

  ngOnDestroy() {
    // this.destroyCarousel();
  }

  private initializeCarousel() {
    const element = this.renderer.createElement('div');
    this.renderer.setAttribute(element, 'id', 'cardSlider');
    this.renderer.appendChild(document.body, element);

  //   this.carouselInstance = new Carousel(element, {
  //     Navigation: {
  //       prevTpl:
  //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5l-7 7 7 7"/><path d="M4 12h16"/></svg>',
  //       nextTpl:
  //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
  //     },
  //     infinite: true,
  //     center: false,
  //     slidesPerPage: 'auto',
  //     transition: false,
  //   });
  // }

  // private destroyCarousel() {
  //   if (this.carouselInstance) {
  //     this.carouselInstance.destroy();
  //     this.carouselInstance = null;
  //   }
  }
  }