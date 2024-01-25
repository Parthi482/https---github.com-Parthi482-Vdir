import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';




import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatSliderModule } from '@angular/material/slider';

import { HomeComponent } from './home/home.component';

import { LayoutModule } from '../shared/layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventListComponent } from './event-list/event-list.component';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AgendaAddComponent } from './agenda-add/agenda-add.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { NgxMatDatetimePickerModule } from 'ngx-mat-datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventScreenComponent } from './event-screen/event-screen.component';
import { JoblistHome } from './event-screen/joblist-home';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { HomeScreenInput } from '../control/home';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from '../component/events/events.component';
import { BusinessDirectoryComponent } from '../component/business-directory/business-directory.component';
import { SelfEmployeeComponent } from '../component/self-employee/self-employee.component';
import { JobsComponent } from '../component/jobs/jobs.component';
import { EventHomeListComponent } from '../component/event-home/event-home-list/event-home-list.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    HomeScreenInput,
    HomeComponent,
    AppliedJobsComponent,
    JobDetailsComponent,
    EventListComponent,
    AgendaAddComponent,
    EventScreenComponent,
    EventsComponent,
    BusinessDirectoryComponent,
    SelfEmployeeComponent,
    JobsComponent,
    EventHomeListComponent,

    JoblistHome,
    // ProfileComponent
  ],
  imports: [
    // CommonModule, ReactiveFormsModule, FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCardModule,
    LayoutModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    DashboardRoutingModule, MatSliderModule, MatIconModule, MatTabsModule, MatInputModule, MatProgressBarModule,
    MatButtonModule, MatSliderModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    AdminRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule, NgMultiSelectDropDownModule.forRoot(),
    CommonModule, AngularEditorModule, MatButtonModule, MatSliderModule,
    MatDialogModule,
    MatButtonModule, 
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule, MatRadioModule,
    MatFormFieldModule,
    MatDividerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule, MatProgressBarModule,
    AdminRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule, NgMultiSelectDropDownModule.forRoot(),

  ],
 
})
export class DashboardModule { }

