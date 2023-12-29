import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core'; 

@Component({
  selector: 'carousel-component-input',
  template: ` 
    <h1>Hello</h1>
  `,
})
export class CarouselComponentInput extends FieldType<any>  { 

}
