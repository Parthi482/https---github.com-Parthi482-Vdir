import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import { DataService } from "../service/data.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-home-input",
  template: `
    <style>
      .card {
        display: flex;
        padding: 16px;
        cursor: pointer; 
        max-width: auto;
        height:180px;
        margin: 10px;
      }

      .card-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: auto; 
        justify-content: center;
        align-items: center;
      }

      .image-container {
        margin-right: 16px;
      }

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        object-fit: cover;
      }

      .name {
        font-size: 16px;
        font-weight: bold;
    
      }
      .contact-details {
        display: flex;
        /* font-size: 16px; */
        flex-direction: column;
      }

      .phone,
      .address {
        margin: 0;
        margin-bottom: 5px;
      }

      .marker-icon {
        padding-right: 5px;
      }

      .details-container {
        flex-grow: 1;
      }
      @media screen and (max-width: 600px) {
        .card {
          flex-direction: column;
          align-items: center;
        }

        .image-container {
          margin-right: 0;
          margin-bottom: 10px;
        }
      }
    </style>

    <div fxLayout="row" fxLayoutGap="12px">
      <div fxFlex>
        <h1>Event list</h1>
        <mat-card
          class="card"
          *ngFor="let event of eventData"
         
          (click)="navigateToHome('event-details', event._id)"
        >
          <div class="card-content" style="justify-content:center">
            <div class="image-container" >
              <img
                class="avatar"
                src="{{
                  'https://seekers.sgp1.digitaloceanspaces.com/' +
                    event.event_image.storage_name
                }}"
                alt="{{ event.event_name }}"
              />
            </div>
            <div style="margin-left: 30px;">

              <span class="name" > {{ event.event_name }}</span>
            </div>
          </div>
        </mat-card>
      </div>

      <div fxFlex>
        <h1>Business list</h1>

 

        <div class="card-container" *ngFor="let company of companies">
          <mat-card
            class="card"
            (click)="navigateToHome('event-details', company._id)"
            *ngIf="company.Company_logo"
          >
            <div class="card-content">
              <div class="image-container">
                <img
                  class="avatar"
                  [src]="company.Company_logo"
                alt="{{ company.CompanyName }}"
                />
              </div>
              <div class="details-container">

              <div>
              <span class="name">{{ company.CompanyName }}</span> 
                <h3>
                   {{ company.industry }} 
                </h3>
              </div>
                
                <div class="contact-details"> 
                  <span style="font-weight: normal;"> 
                  <i class="fa fa-phone" aria-hidden="true"></i>  {{ company.phone }}
                  </span>
                  <span> 
                    {{ company.email }}</span>
                  <span class="address"> 
                      <i class="fas fa-map-marker-alt marker-icon" style="color: brown;"></i>
                      {{ company.Address }}  
                  </span>
  
                </div>
              </div>
            </div>
          </mat-card>
        </div>



      </div>

      <div fxFlex>
        <h1>Job list</h1>
        

        <!-- <div *ngFor="let job of jobData">
          <mat-card
            class="card"
          
            *ngIf="job"
          >
            <div class="card-content" style="justify-content:center">
              <div class="image-container">
                <img
                  class="avatar"
                  src="{{ job.Company_logo }}"
              alt="{{ job.companyName }}"
                />
              </div>

              <div style="margin-left: 50px;"> 
                <h1> {{job.title }}</h1>
                <br>
                <span>{{ job.companyName }}</span>
                <br>
                <span>{{job.Skill}}</span>
                <br>
                <span>{{job.workmode}}</span>
                
              </div>
            </div>
          </mat-card>
        </div> -->
        <div class="card-container" *ngFor="let job of jobData">
          <mat-card class="card">
            <div class="card-content">
              <div class="image-container">
                <img
                  class="avatar"
                  [src]=" job.Company_logo"
                  alt="{{  job.companyName }}"
                />
              </div>
              <div class="details-container">

              <div>
                <h3>{{  job.companyName }}</h3>
                <h5 >
                   {{ job.Skill }} 
                </h5>
              </div>
                
                <div class="contact-details"> 
                  <span > 
                    {{ job.workmode}}
                  </span>
                   
                </div>
              </div>
            </div>
          </mat-card>
        </div>
      </div>

      <div fxFlex>
        <h1>Self Employee</h1>

        <mat-card class="card" *ngFor="let users of user" style="width: 300px;">
          <div class="card-content" style="justify-content:center">
            <div class="image-container">
              <img
                class="avatar"
                src="{{ users.user_profile }}"
                alt="{{ users.user_name }}"
              />
            </div>
            <span class="name">{{ users.user_name }}</span>
          </div>
        </mat-card>
      </div>
    </div>
  `,
})
export class HomeScreenInput implements OnInit {
  constructor(
    private dataservice: DataService,
    private cf: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  eventData: any[] = [];
  jobData: any[] = [];
  companies: any[] = [];
  user: any[] = [];
  getData() {
    const today = new Date();

    const currentDate = new Date();
    const eventFilter = {
      filter: [
        {
          clause: "AND",
          conditions: [
            {
              column: "basic_details.start_date",
              operator: "GREATERTHANOREQUAL",
              value: currentDate,
              type: "date",
            },
          ],
        },
      ],
    };

    this.dataservice
      .getDataByFilter("event", eventFilter)
      .subscribe((event: any) => {
        let events = event.data[0].response;

        events.forEach((element: any) => {
          this.eventData.push(element);
        });
      });

    this.dataservice.getDataByFilter("jobs", {}).subscribe((jobs: any) => {
      jobs.data[0].response.forEach((element: any) => {
        this.jobData.push(element);
      });
    });

    this.dataservice
      .getDataByFilter("companies", {})
      .subscribe((companies: any) => {
        companies.data[0].response.forEach((res: any) => {
          this.companies.push(res);
        });
      });

    const USER_FILTER = {
      filter: [
        {
          clause: "AND",
          conditions: [
            {
              column: "user_type",
              operator: "EQUALS",
              value: "Self Employee//Skilled Labour",
            },
          ],
        },
      ],
    };

    this.dataservice
      .getDataByFilter("user", USER_FILTER)
      .subscribe((res: any) => {
        res.data[0].response.forEach((user: any) => {
          this.user.push(user);
        });
      });

    this.cf.detectChanges();
  }

  navigateToHome(route: any, id?: any) {
    this.router.navigate([`${route}/${id}`]);
  }
}
