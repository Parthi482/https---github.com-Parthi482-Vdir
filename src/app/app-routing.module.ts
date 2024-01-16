import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { DashLayoutComponent } from './shared/layout/dash-layout/dash-layout.component';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';
import { AuthsGuard } from './service/auths.guard';
import { CategoryComponent } from './dashboard/category/category.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CompaniesComponent } from './dashboard/companies/companies.component';
import { JobDetailsComponent } from './dashboard/job-details/job-details.component';
import { LocationComponent } from './shared/layout/location/location.component';
import { DefaultComponent } from './shared/layout-event/default/default.component';
import { DatatableComponent } from './component/datatable/datatable.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';  
import { ScreenComponent } from './component/screen/screen.component';
import { EventLandingComponent } from './component/event-landing/event-landing.component'; 
import { EventScreenComponent } from './dashboard/event-screen/event-screen.component';
import { JoblistHome } from './dashboard/event-screen/joblist-home';
import { Login } from './control/login';
import { HomeScreenInput } from './control/home';
import { EventComponent } from './event/event/event.component';
 
const routes: Routes = [
{
  path:"testing",
  component:EventComponent
},




{
  path:'homescreen',
  component:DashLayoutComponent,
  children:[
    {
      path:'',
      component:HomeScreenInput
    }
  ]
},
  {
    path: 'events',
    component: JoblistHome,
    children: [
      {
        path: '',
        component: JoblistHome,
      },
    ],
  }, 
  {
    path:"eventlanding",
    component: DashLayoutComponent,
    children:[
      {
        path:'',
        component: EventLandingComponent
      }
    ]
  },
  {path: "event-details",
  component: DashLayoutComponent,
  
  children: [
   {
    path: "",
    component: ScreenComponent,
   },
   {
    path: ":id",
    component:ScreenComponent
   },
  ],
  },




  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashLayoutComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((x) => x.DashboardModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivateChild: [AuthsGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule),
  },

  //  {path:"",redirectTo:"/dashboard/home",pathMatch:"full"}
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'companies',
    component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: CompaniesComponent,
      },
    ],
  },
  {
    path: 'google',
    component: LocationComponent,
    children: [
      {
        path: '',
        component: LocationComponent,
      },
    ],
  },
//   {path: "event-details",
//   children: [
//    {
//     path: "",
//     component:DefaultComponent ,
//    },
//    {
//     path: ":id",
//     component:DefaultComponent
//    },
//   ],
//  },
  {
    path: 'jobs',
    component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: JobDetailsComponent,
      },
    ],
  },

  {
    path: "add",
    component: DashLayoutComponent,
  //  canActivate: [AuthGuardService],

    children: [
      {
        path: ":form",
        component: DynamicFormComponent,
      },
    ],
  },
  {
    path: "edit",
    component: DashLayoutComponent,
  //  canActivate: [AuthGuardService],

    children: [
      {
        path: ":form/:id",
        component: DynamicFormComponent,
      },
    ],
  },

  {
    path: "list",
    // canActivate: [AuthGuardService], 
    component: DashLayoutComponent,
    children: [
      {
        path: "",
        component: DatatableComponent,
      },
      {
        path: ":form",
        component: DatatableComponent,
      }
    ],
  },
  {
    path: ':business-category',
    // component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: CategoryComponent,
      },
      {
        path: ':company',
        children: [
          {
            path: '',
            component: CategoryComponent,
          },
          {
            path: ':job/:title',
            children: [
              {
                path: '', // An empty path for the child route (meaning it matches when no additional segment is provided)
                component: CategoryComponent,
              },
              {
                path: ':jobid', // The optional dynamic segment
                component: CategoryComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
