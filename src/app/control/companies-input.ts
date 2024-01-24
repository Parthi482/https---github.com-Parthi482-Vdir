import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'companies-input',
  template: ` 
 <!-- <formly-form style="width: 150px;"></formly-form> -->

  `,
})

export class CompaniesInput extends FieldType<any> implements OnInit {
  ngOnInit(): void {
    console.log(this.form.controls);

  }


}

