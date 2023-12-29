import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'checkbox-input-field',
  template:  `
    
    <p><mat-checkbox formControlName="basic_details.is_mandatory">Is Registration Mandatory</mat-checkbox></p>

  `
})
export class CheckboxComponent extends FieldType {
  constructor() {
    super();
  }
}
