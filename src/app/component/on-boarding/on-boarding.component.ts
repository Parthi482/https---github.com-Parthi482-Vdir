import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css']
})
export class OnBoardingComponent  implements OnInit{
  JobSeeker:boolean= false;
  SelfEmpolyee:boolean = false;
  company:boolean = false;
  @ViewChild('fileInput') fileInput: any;
 
  constructor(private router:Router,private route:ActivatedRoute){

  }



  openFileInput() {
    this.fileInput.nativeElement.click();
  }


  onSelectFile(event: any): void { 

    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        let sourcefile:any=event.target.files[0]
        reader.readAsDataURL(sourcefile); 
         
    reader.onload = (event) => {
        const url = (<FileReader>event.target).result as string;
        
      };
   
    }
  }


  handleFileUpload(): void {
    const fileInput: any = document.getElementById('fileInput');
    const file = fileInput.files[0];
    console.log(fileInput);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'profile_pic');
 
   
  }



  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      if(res.id == "jobseeker") {
        this.JobSeeker = true
      }else if(res.id == "company"){
        this.company = true
        
      }
      // else{
      //   this.SelfEmpolyee= true
      // }
    })
  }










}
