import { NgModule, Component, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { Tab } from "./tab";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyMatDatepickerModule } from "@ngx-formly/material/datepicker";
import { FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { HtmlInput } from "./html-input";
import { MultiSelectInput } from "./multiselect-input";
import { SelectInput } from "./select-input";
import { DateTimeInput } from "./datetime-input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
// import { Editor } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";
import { FileUploadModule } from "ng2-file-upload";
import { NgSelectModule } from "@ng-select/ng-select"; 
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule } from 'primeng/calendar';

import { LabelView } from "./label";
import { FileInput } from "./file-input";
import { ImageInput } from "./image-input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AutogenerateId } from "./autogenerateid-input";
import { ButtonInput } from "./button-input";
import { Nestedform } from "./nestedform";
import { addonsExtension } from "./prefix-extensions";
import { PrefixInput } from "./prefix-input";
import { MatPrefixInput } from "./mat-prefix-input";
import { PasswordInput } from "./password-input";
import { CustomPopupInput } from "./custompopup-input";
import { TimeInput } from "./timepicker";
import { GoogleMapsModule } from "@angular/google-maps"; 
import { NgxMatIntlTelInputComponent } from "ngx-mat-intl-tel-input";
import { BrowserModule } from "@angular/platform-browser";  
import {
  ArrayTodateStringPipe,
  ArrayToStringPipe,
  LastIndexPipe,
  SumPipe,
} from "../pipe/arraytostring";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormlyFieldSelectAutocomplete } from "./select-autocomplete.type";
import { MapComponent } from "./map";
import { LogoComponent } from "./profile-logo";
import { patchWork } from "./patchwork";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { tooglebutton } from "./tooglebutton";
import { CompaniesInput } from "./companies-input";
import { radiobutton } from "./radiobutton";
import { RepeatTypeComponent } from "./repeat";
import { Chips } from "./chips";
import { MatChipsModule } from "@angular/material/chips";
import { DateInput } from "./datepicker";
import { CustomDecimalInputType } from "./custom-decimal-input";
import { FormlyFieldset } from "./fieldsetform";
import { OnlyDecimalDirective } from "./decimal-directive";
import { FormlyMultiImageUpload } from "./multiimage_upload";
import { CarsoalComponent } from './carsoal.component';
import { FormlyFieldInputTextEnterKey } from "./inputcheck";
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyFieldStepper } from "./stepper";
import { Carousel } from '@fancyapps/ui';

import { MatSidenavModule } from '@angular/material/sidenav';
import { EventComponent } from "../component/event/event.component";  
import {  CarouselInput } from "./carousel-input";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { CarouselComponentInput } from "./carousel-component-input";
import { ImageComponent } from "./image.component"; 
import { Image1Component } from "./image1.component";
import { ScreenComponent } from "../component/screen/screen.component";
import { CheckboxComponent } from './checkbox.input';
import { LocationComponent } from "../component/screen/locations.component"; 
import { Location } from "./location";
import { ColorPickerInputComponent } from "./color-picker";
import { LayoutsModule } from "../shared/layout-event/layouts.module";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { CounterComponent } from './counter.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Login } from "./login"; 
import { MatGridListModule } from "@angular/material/grid-list";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormlyFieldUser } from "./user-input";
// import { ColorPickerInputComponent } from "./colourpicker";


export function minLengthValidationMessage(err: any, field: FormlyFieldConfig) {
  console.log(field);

  return `Should NOT be shorter than ${field.props?.minLength} characters`;
}

export function maxLengthValidationMessage(err: any, field: FormlyFieldConfig) {
  console.log(field);

  return `Should NOT be longer than ${field.props?.maxLength} characters`;
}

export function minValidationMessage(err: any, field: FormlyFieldConfig) {
  console.log(field);

  return `Should be >= ${field.props?.min}`;
}

export function maxValidationMessage(err: any, field: FormlyFieldConfig) {
  console.log(field);

  return `Should be <= ${field.props?.max}`;
}

export function multipleOfValidationMessage(
  err: any,
  field: FormlyFieldConfig
) {
  console.log(field);

  return `Should be multiple of ${field.props?.step}`;
}

export function exclusiveMinimumValidationMessage(
  err: any,
  field: FormlyFieldConfig
) {
  console.log(field);

  return `Should be > ${field.props?.step}`;
}

export function exclusiveMaximumValidationMessage(
  err: any,
  field: FormlyFieldConfig
) {
  console.log(field);

  return `Should be < ${field.props?.step}`;
}

export function patternValidationMessage(err: any, field: FormlyFieldConfig) {
  console.log(field);

  return `Invalid Format ${field.props?.label}`;
}
export function uniqueItemsValidationMessag(
  err: any,
  field: FormlyFieldConfig
) {
  console.clear()
  console.log(field);

  return `This ${field.props?.label} is already exists in database `;
}

export function required(err: any, field: FormlyFieldConfig) {
  console.log(field);

  return `This ${field.props?.label} is Required `;
}

const lang = "en-US";
const formlyConfig = {
  wrappers: [{ name: "addons", component: PrefixInput }],
  extensions: [{ name: "addons", extension: { onPopulate: addonsExtension } }],

  extras: { lazyRender: true, resetFieldOnHide: true },
  validationMessages: [
    { name: "required", message: required },
    { name: "null", message: "Should be null" },
    { name: "minLength", message: minLengthValidationMessage },
    { name: "maxLength", message: maxLengthValidationMessage },
    { name: "min", message: minValidationMessage },
    { name: "max", message: maxValidationMessage },
    { name: "multipleOf", message: multipleOfValidationMessage },
    { name: "exclusiveMinimum", message: exclusiveMinimumValidationMessage },
    { name: "exclusiveMaximum", message: exclusiveMaximumValidationMessage },
    { name: "uniqueItems", message: uniqueItemsValidationMessag },
    { name: "pattern", message: patternValidationMessage },
  ],

  types: [

    // {
    //   validationMessages: [{ name: 'required', message: 'This field is required' }],
    //   types: [{ name: 'stepper', component: FormlyFieldStepper, wrappers: [] }],
    // },
    {  name: "multiselect-input", component: MultiSelectInput,
      validationMessages: [
        { name: "required", message: required },
        { name: "null", message: "Should be null" },
        { name: "minLength", message: minLengthValidationMessage },
        { name: "maxLength", message: maxLengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage,
        },
        {
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage,
        },
        { name: "uniqueItems", message: uniqueItemsValidationMessag },
        { name: "pattern", message: patternValidationMessage },
      ],
    },

    { name: "tab-input", component: Tab },
    {
      name: 'input-text-enterkey',
      component: FormlyFieldInputTextEnterKey
    }, 
    { name: "select-input", component: SelectInput,
      validationMessages: [
        { name: "required", message: required },
        { name: "null", message: "Should be null" },
        { name: "minLength", message: minLengthValidationMessage },
        { name: "maxLength", message: maxLengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage,
        },
        {
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage,
        },
        { name: "uniqueItems", message: uniqueItemsValidationMessag },
        { name: "pattern", message: patternValidationMessage },

      ],
    },
    
    { name: "html-input", component: HtmlInput }, 
    // {
    //   name: "multiselect-input",
    //   component: MultiSelectInput,
    //   validationMessages: [
    //     { name: "required", message: required },
    //     { name: "null", message: "Should be null" },
    //     { name: "minLength", message: minLengthValidationMessage },
    //     { name: "maxLength", message: maxLengthValidationMessage },
    //     { name: "min", message: minValidationMessage },
    //     { name: "max", message: maxValidationMessage },
    //     { name: "multipleOf", message: multipleOfValidationMessage },
    //     {
    //       name: "exclusiveMinimum",
    //       message: exclusiveMinimumValidationMessage,
    //     },
    //     {
    //       name: "exclusiveMaximum",
    //       message: exclusiveMaximumValidationMessage,
    //     },
    //     { name: "uniqueItems", message: uniqueItemsValidationMessag },
    //     { name: "pattern", message: patternValidationMessage },
    //   ],
    // },
    { name: "label-view", component: LabelView },
    { name: "map", component: MapComponent },
    { name: "logo", component: LogoComponent },
    { name: "datetime-input", component: DateTimeInput },
    { name: "date-input", component: DateInput,
      validationMessages: [
        { name: "required", message: required },
        { name: "null", message: "Should be null" },
        { name: "minLength", message: minLengthValidationMessage },
        { name: "maxLength", message: maxLengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage,
        },
        {
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage,
        },
        { name: "uniqueItems", message: uniqueItemsValidationMessag },
        { name: "pattern", message: patternValidationMessage },
      ],
    },
    { name: "custom-decimal-input", component: CustomDecimalInputType,
      validationMessages: [
        { name: "required", message: required },
        { name: "null", message: "Should be null" },
        { name: "minLength", message: minLengthValidationMessage },
        { name: "maxLength", message: maxLengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage,
        },
        {
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage,
        },
        { name: "uniqueItems", message: uniqueItemsValidationMessag },
        { name: "pattern", message: patternValidationMessage },
      ],
    },
    { name: "file-input", component: FileInput },
    // { name: "file-input", component: FileInput },
    { name: "checkbox-input-field", component: CheckboxComponent },

    { name: "fieldset", component: FormlyFieldset },
    { name: "image-input", component: ImageInput },
    { name: "autoId-input", component: AutogenerateId }, // input text entry key
    { name: "button-input", component: ButtonInput }, 
    { name: "password-input", component: PasswordInput },
    { name: "matprefix-input", component: MatPrefixInput,
      validationMessages: [
        { name: "required", message: required },
        { name: "null", message: "Should be null" },
        { name: "minLength", message: minLengthValidationMessage },
        { name: "maxLength", message: maxLengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage,
        },
        {
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage,
        },
        { name: "uniqueItems", message: uniqueItemsValidationMessag },
        { name: "pattern", message: patternValidationMessage },
      ],
    },
    { name: "carousel-input", component: CarouselInput },
    {
name:"carousel-component-input",Component:CarouselComponentInput
    },
    { name: "location", component: Location },
    { name: "select-autocomplete", component: FormlyFieldSelectAutocomplete,
      validationMessage: [
        { name: "required", message: required },
        { name: "null", message: "Should be null" },
        { name: "minLength", message: minLengthValidationMessage },
        { name: "maxLength", message: maxLengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage,
        },
        {MatStepperModule,
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage,
        },
        { name: "uniqueItems", message: uniqueItemsValidationMessag },
        { name: "pattern", message: patternValidationMessage },
       
      ],
    },
    // { name: 'autocomplete-input', component: AutoComplete },
   
    { name: "custompopup-input", component: CustomPopupInput },
    { name: "time-input", component: TimeInput }, 
    { name: "toogle", component: tooglebutton },
    { name: "companies-input", component: CompaniesInput },
    { name: "patch-work", component: patchWork }, 
    { name: "radio-button", component: radiobutton },
    { name: "repeat", component: RepeatTypeComponent },
    { name: "chips", component: Chips },
    { name: "muti-image", component: FormlyMultiImageUpload },
    {name:"stepper",component:FormlyFieldStepper},
    { name: 'color-picker-input', component: ColorPickerInputComponent,validationMessages: [
      { name: 'required', message: 'This field is required' }
    ],},
    { name: 'datetime_input', component: DateTimeInput },
    {name:"counter-input",Component:CounterComponent},
    {name:"user",Component:FormlyFieldUser},
  ],
}; 

@NgModule({
    declarations: [
      FormlyFieldUser,
      CounterComponent,
        Tab,
        FileInput, 
        CheckboxComponent,
        HtmlInput,
        LabelView,
        MultiSelectInput,
        SelectInput,
        FormlyFieldset,
        DateTimeInput,
        MapComponent,
        ImageInput,
        CarouselInput,
        CarouselComponentInput,
        AutogenerateId,
        ButtonInput,
        LocationComponent,
        FormlyFieldStepper,
        DateInput,
        Nestedform,
        PrefixInput,
        MatPrefixInput,
        PasswordInput,
        RepeatTypeComponent,
        CustomPopupInput,
        OnlyDecimalDirective,
        FormlyMultiImageUpload,
        FormlyFieldSelectAutocomplete,
        CustomDecimalInputType,
        TimeInput,
        Location,
        LogoComponent,
        tooglebutton,
        CompaniesInput,
        patchWork,
        Chips,
        FormlyFieldStepper,
        CarsoalComponent,
        FormlyFieldInputTextEnterKey,
        EventComponent, 
        ImageComponent,
        Image1Component,
        ScreenComponent,
        ColorPickerInputComponent,
        Login, 

    ],
    exports: [
      CompaniesInput,
      FormlyFieldUser,
      Login,
        Tab,
        FileInput,
        CheckboxComponent,
        HtmlInput,
        LabelView,
        MultiSelectInput,
        SelectInput,
        DateTimeInput,
        ImageInput, CarouselInput,
        FormlyFieldInputTextEnterKey,
        AutogenerateId,
        RepeatTypeComponent,
        ButtonInput,
        FormlyFieldSelectAutocomplete,
        Location,
        Nestedform,
        PrefixInput,
        DateInput,
        MatPrefixInput,
        PasswordInput,
        CustomPopupInput,
        TimeInput,
        LogoComponent,
        OnlyDecimalDirective,
        CarsoalComponent,
        patchWork,
        CarouselComponentInput,
        MapComponent,
        CustomDecimalInputType,
        FormlyFieldStepper,
        ImageComponent,
        Image1Component,
        ColorPickerInputComponent,
        CounterComponent,
    ],
    providers: [
        ArrayTodateStringPipe,
        ArrayToStringPipe,
        LastIndexPipe,
        SumPipe,
        { provide: LOCALE_ID, useValue: lang },
    ],
    imports: [
      MatCardModule,
      MatButtonModule,
      SlickCarouselModule,
      FlexLayoutModule,
      // Carousel,
      NgbModule,
        BrowserModule,
        MatGridListModule,

        DragDropModule,
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatDatepickerModule,
        NgSelectModule,
        NgxEditorModule,
        MatAutocompleteModule,
        MatButtonModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        MatNativeDateModule,
        FormsModule,
        BrowserAnimationsModule,
        AgGridModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        CdkDropList, CdkDrag,
        FormlyMatDatepickerModule,
        FormlyModule.forRoot(formlyConfig),
        FormsModule,
        MatChipsModule,
        AngularEditorModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatStepperModule,
        MatInputModule,
        MatOptionModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatDialogModule,
        MatNativeDateModule,
        FormlyMatDatepickerModule,
        MatCheckboxModule,
        NgxMatTimepickerModule.setLocale(lang),
        FileUploadModule,
        NgSelectModule,
        NgxMatTimepickerModule,
        GoogleMapsModule,
        NgxMatIntlTelInputComponent,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        MatIconModule,
        MatSlideToggleModule,
        NgxMatDatetimePickerModule,
        // MatStepperModule,
        MatAutocompleteModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        CalendarModule,
        LayoutsModule,

    ]
})
export class ControlModule {}
