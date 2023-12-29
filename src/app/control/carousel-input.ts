import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';
import { DataService } from '../service/data.service';
import { DialogService } from '../service/dialog.service';
import { isEmpty } from 'lodash';
import { Subscription, interval } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'carousel-input',
  template: `
 <style>


 

.example-box {
  padding: 20px 10px;  
  justify-content: space-between; 
  cursor: move;  
}

.cdk-drag-preview {
  box-sizing: border-box; 
}

.cdk-drag-placeholder {
  opacity: 0;
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-box:last-child {
  border: none;
  
}

.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}



/* .controls { */
  /* position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 50%;
  width: 100%; */
   /* border-radius: 50%;

} */

a {
  text-decoration: none;
  /* display: inline-block; */
  padding: 8px 16px;
}

a:hover {
  background-color: #ddd;
  color: black;
}


.round {
  border-radius: 50%;
}

.carousel-indicators {
    list-style: none;
    margin: 0;
    padding: 0;
    bottom: 2%;
    left: 0;
    right: 0;
    text-align: center; 
    position: absolute;
}

/* 
    position: absolute; */
.carousel-indicators li { 
    margin: 0 5px;
}

.carousel-bullet {
    color:whitesmoke;
    cursor: pointer;
    display: block;
    font-size: 35px;
}

.carousel-bullet:hover {
    color: #aaaaaa;
}


/* .fill {object-fit: fill;}
.contain {object-fit: contain;}
.cover {object-fit: cover;}
.scale-down {object-fit: scale-down;}
.none {object-fit: none;}
 */






    </style>


<!-- carousel.component.html -->
<!-- <div id="container" style="position: relative; height: 400px; width: 100%;">
<ngx-slick-carousel class="carousel" [config]="slickConfig" (init)="slickInit($event)" (afterChange)="slideChange($event)">
  <div   class="carousel-slide">
    <img [src]="imageList[currentIndex]" alt="Carousel Slide">
  </div>
</ngx-slick-carousel>

</div> -->











<div id="container" style="position: relative; height: 400px; width: 100%;">

<img [src]="defaultBannerImage" alt="" *ngIf="!originalBanner" style="width: 100%; height: 100%;object-fit: cover; " >
 
  <img [src]="imageList[currentIndex]" alt="" *ngIf="newBanner" style="width: 100%; height: 100%;object-fit:fill;"> 
  <!-- <div  class="controls" style="margin: 10px; display: flex; flex-direction: row; align-items: center; justify-content: center; "> -->
    
  <!-- <a   class="previous round" (click)="prev()" >&#8249;</a>
  <a class="current round" (click)="current()"> &#8249;</a>
<a class="next round" (click)="next()">&#8250;</a> -->
<!-- <ol class="carousel-indicators" style="display: flex; flex-direction: row ;justify-content: center; " >
            <li>
                <label for="carousel-1" class="carousel-bullet" (click)="prev()">•</label>
            </li>
            <li>
                <label for="carousel-2" class="carousel-bullet" (click)="current()">•</label>
            </li>
            <li>
                <label for="carousel-3" class="carousel-bullet" (click)="next()">•</label>
            </li> 
</ol> -->

  <!-- </div>  -->

<div style="display: flex; flex-direction: row;">
  <img [src]="defaultlogoImage ? defaultlogoImage : '../../assets/images/banner.png'" alt="Logo Image" style="width: 200px; height: 200px;object-fit: scale-down; border-radius: 50%; margin: 15px; padding-left: 15px; position: absolute; bottom: 0; left: 0;">
  <input type='file' style="width: 200px; height: 200px; border-radius: 50%; opacity: 0; margin: 15px; padding-left: 15px; position: absolute; bottom: 0%; left: 0;" (change)="onFileSelected($event)">
</div>
 
<mat-icon class="right-icon" style="position: absolute; bottom: 0; right: 0; margin: 10px; background-color: transparent;" (click)="onAddButonClick($event)">edit</mat-icon>

</div>

 <!-- Update the ng-template -->
<ng-template #editViewPopup>
  
  <div style="text-align-last: end; top: 0; right: 0 ;">
    <mat-icon (click)="cancel()">close</mat-icon>
  </div>

  <div style="display: flex; flex-direction: row;justify-content: space-evenly ">

    <input type="file" (change)="HandlingbannerImageUpload($event)" multiple >
     
    <button mat-raised-button  (click)="Submit()" *ngIf="ishide" style="width: 80px;height:30px;">
      Submit
      </button>
  </div>
  
  <br>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; top: 0;">

<div
  cdkDropList
  [cdkDropListData]="imageList"
  class="example-list"
  (cdkDropListDropped)="drop($event)"
> <div *ngFor="let image of imageList; let i = index" cdkDrag style="display: flex; flex-direction: column; position: relative;" fxLayout="column">
  <img [src]="image" alt="Image" style="width: 100%; height: 200px;">

  <mat-icon (click)="removeImage($event, i)" style="position: absolute; top: 0; right: 0; cursor: pointer;">cancel</mat-icon>
</div>

</div>
 
</div> 
</ng-template>
 
  `, 
})

export class CarouselInput extends FieldType<any> implements OnInit,OnChanges,OnDestroy {
  defaultBannerImage!: any;
  defaultlogoImage!:any
  slickConfig: any;
  
  timerSubscription!: Subscription
  dropImage:any
  ishide:boolean = false
  isshowcursor:boolean= false
  constructor(
    public dataService: DataService, 
    private cf: ChangeDetectorRef,
    public dialogService: DialogService,  
  ) {
    super();
  }
  imageList: SafeUrl[] = [];
  slideWidth: number = 1800;
  imageheihgt:number =  400
  @ViewChild('popupEdit', { static: true }) popupEdit!: TemplateRef<any>;
  @ViewChild("editViewPopup", { static: true }) editViewPopup!: TemplateRef<any>; 






eventId:any

  ngOnInit(): void {

    this.defaultBannerImage = "../../assets/images/newbanner.jpg" 
    this.dropImage = "./../assets/images/drop.jpg" ;
    this.eventId = this.form.value._id;
    console.log(this.eventId);
    
    if (this.model.isEdit == true) {
      this.imageList=[]
      let data:any=   this.model["event_banner"]
      // console.log(data);
        this.originalBanner = true
        this.newBanner = true
      data.forEach((element:any) => {
        let data :any=environment.ImageBaseUrl + element.storage_name
        console.log(data);
        
        this.imageList.push(data)
        this.startCarousel()
      });
      
      console.warn(this.imageList);
      
      this.defaultlogoImage = environment.ImageBaseUrl + this.model["event_image"].storage_name || []
    }
  }

  originalBanner:boolean = false 
  newBanner:boolean =  false
  res: any[] = []; 
 //todo Storing BannerData
  BannerData:any[]=[]  


 //!pending
  HandlingbannerImageUpload(event: any) {
    const files: FileList = event.target.files;
    const filesArray: File[] = Array.from(files);
    
    // var formData = new FormData();

    for (const file of filesArray) {

      const imageUrl = URL.createObjectURL(file);
    
      this.BannerData.push(file);
      this.imageList.push(imageUrl);
      // formData.append("file", file);
      // formData.append("category", "event_banner");
    }

 
  
    this.ishide = true;
  }
 
  // Handling the drag-and-drop reordering
  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.imageList, event.previousIndex, event.currentIndex);
  }

 
  currentIndex = 0;
  
  Submit() { 
    let images = this.BannerData.map(image => URL.createObjectURL(image));
     
    if (images.length >= 0) {
      this.newBanner = true;
      this.isshowcursor = true;
      this.originalBanner = true;  
      this.startCarousel()
      this.fileupload()

      
       
    }
    if(isEmpty(this.imageList)){
  
      this.originalBanner =false
      this.newBanner = false
  }
     
  this.dialogService.CloseALL();
    this.cf.detectChanges()
  }
  
  refId:any
  fileupload(){
    let ref=this?.field?.props?.['refId']
    this.refId=this.model[ref]
    console.log();
    let Id =this.model[this.field.bind_key]

    if(!this.field?.['bind_key']){
      if(!this.model[this.field?.['bind_key']]==undefined){
          return this.dialogService.openSnackBar(`${this.field.bind_key.toUpperCase().replace('_', ' ')} Is Missing`,"OK")
      }
    }



    var formData = new FormData();

    for (const file of this.BannerData) {
 
      formData.append("file", file);
      // if(this.field?.['bind_key']){
            // formData.append(ref,Id);

            formData.append("user_profile", "test_user");
          // }
          
    }
 console.clear()
    console.log(Id);
    
  //banner upload
  this.dataService.imageupload("temporary_user",Id,formData).subscribe((res: any) => {
    debugger
    if (res.data) { 
      this.res.push(...res.data); 
    (this.form as FormGroup).addControl("event_banner",new FormControl(this.res))
 
    }
    })

  }
 
  startCarousel() { 
    this.timerSubscription = interval(3000).subscribe(() => {
      this.showNextSlide();
    });
  }

  showNextSlide() {
    if (this.currentIndex === this.imageList.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.cf.detectChanges();
    // this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }
  // showNextSlide() {
  //   this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  // }


  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
    console.log(this.imageList)
    this.originalBanner = true;
  }
 

onFileSelected(event: any) {

  let ref=this?.field?.props?.['refId']






  const files: FileList = event.target.files;
  const filesArray: File[] = Array.from(files);

  var formData = new FormData();
  for (const file of filesArray) {
    // Show the image on screen without using bypassSecurityTrustUrl
    const imageUrl = URL.createObjectURL(file);
    this.defaultlogoImage = imageUrl;
    formData.append("file", file);
    if(this.field?.['bind_key']){
            formData.append("event_logo",this.model[this.field.bind_key]);
          }
  }
 
//banner upload
// this.dataService.imageupload("event_image",this.eventId,formData).subscribe((res: any) => {
  this.dataService.imageupload("event_logo",this.model[this.field.bind_key],formData).subscribe((res: any) => {
  if (res.data) { 
    // this.res.push(...res.data); 
  (this.form as FormGroup).addControl("event_image",new FormControl(res.data[0]))

  }
  })



}

// const removeDuplicateImages(this.imageList)

  onAddButonClick(event:any){

    this.dialogService.openDialog(this.editViewPopup, "50%", "70%", {});
  }

  removeImage(event: Event, index: number) {
 
    event.stopPropagation(); // prevent the click event from propagating to the parent element
    this.imageList.splice(index, 1);
     
  }
  
   
   
  // next() {
  //   this.currentIndex = (this.currentIndex + 1) % this.imageList.length; 
  // }
  
  // prev() {
  //   this.currentIndex = (this.currentIndex - 1 + this.imageList.length) % this.imageList.length;
  // }
  cancel() { 
    
    this.dialogService.closeModal() 

  }
  current(){

    this.currentIndex = (this.currentIndex - 0 + this.imageList.length) % this.imageList.length;
    console.log(this.currentIndex)
  }
  ngOnDestroy() {
    // Unsubscribe from the timer when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}

 