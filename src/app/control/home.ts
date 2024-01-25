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
    <h1>Hello</h1>
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
