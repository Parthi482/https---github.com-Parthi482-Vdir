import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rx';
import { map } from 'rxjs';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-event-landing',
  templateUrl: './event-landing.component.html',
  styleUrls: ['./event-landing.component.css']
})



export class EventLandingComponent implements OnInit { 
  upcomingDates: moment.Moment[] = [];



  constructor(private router: Router,private dataService : DataService) {

  }

  cities: City[] | undefined;

  formGroup: FormGroup | undefined;
  bannerImage:any[]=[]

  
  navigate(data:any) {
    this.router.navigate(["event-details/"+"b692fffa-c59c-405b-83be-72fc99634521"]) 
      
  }




  ngOnInit() {
    this.getUpcomingDates();
    const filterCondition1 = {
      filter: [
        {
          clause: "AND",
          conditions: [{ column: "update_on", operator: "EQUALS", value: "2023-11-29T07:04:16.767+00:00" ,type:"time.Time"}],
        },
      ],
    };
// 2023-11-28T12:59:47.136+00:00
    this.dataService.getDataByFilter("event",filterCondition1).subscribe((res:any) => {
      
      let response = res.data[0].response
      // console.log(response);
      
      response.forEach((element:any) => {
        // console.log(element.eventBanner);
          this.bannerImage.push(element);
});

    })
  }


  getUpcomingDates() {
    const today = moment();
    console.log(today);

  }
 



}

// const filterCondition1 = {
//   filter: [
//     {
//       clause: "AND",
//       conditions: [{ column: "created_on", operator: "GREATERTHANOREQUAL", value: "2023-12-29T04:35:58.387+00:00" ,type:"time.Time"}],
//     },
//   ],
// };

// // 2023-11-28T12:59:47.136+00:00
// this.dataService.getDataByFilter("event",filterCondition1).subscribe((res:any) => {
  
//   let response = res.data[0].response
//   console.log(response);
//   // event_banner

//   response.forEach((element:any) => {

//     if (element.event_banner.length >1){
//       element.event_banner.forEach((banner:any)=>{
        
//         let data :any=environment.ImageBaseUrl + banner.storage_name 
//         this.data1.push(data)
//         console.log(banner.storage_name);
        




//       })
//     }

//       this.bannerImage.push(element);
// });

// })
// }

// {
//   "Address": "",
//   "Description": "Celebration",
//   "Location": "Tnagar",
//   "_id": "65939ccec90071a2fbee60f3",
//   "companyId": "GOK9148",
//   "coordinates": {
//       "Latitude": 80.2340761,
//       "Longitude": 13.0417591
//   },
//   "duration": "01:00",
//   "enddate": "2023-12-01",
//   "eventBanner": "https://seekers.sgp1.digitaloceanspaces.com/event/2023/11/ec66fdf09-80c4-40a5-8e94-796245e54de1/dhoni.jpeg",
//   "eventLogo": "https://seekers.sgp1.digitaloceanspaces.com/event/2023/11/ec66fdf09-80c4-40a5-8e94-796245e54de1/goku5.jpg",
//   "eventName": "PONGAL CELEBRATION 2024",
//   "event_id": "ede940977-627f-4abd-b7a2-0be49ece7623",
//   "fullDescription": "Entrepreneur, Technology and Business Leader:\n\nA\nvisionary pioneered new generation technology products, systems and platforms\nfor military and civil applications with many firsts in India.\n\n \n\nHave been on\nthe Board of Directors at Safex Chemicals, New Delhi, Codenomicon Software, New\nDelhi, Enertech Engineering, Hyderabad, DILABS Bangalore, Co-founder and\nMentor, Pitasys Pune, Co-founder & Director, QuikProto Labs Pvt Ltd, New\nDelhi, Executive Director, DILABS, Bangalore, Executive Vice Chairman, Mitkat\nAdvisory, Gurgaon, Advisor, FortyTwo42 Lab Pune, Consultant, Synopsys,\nBangalore and Nivetti Systems, Bangalore. Distinguished Fellow with Center for\nAir Power Studies, Ministry of Defense, and visiting Professor at Indian\nInstitute of Technology Kharagpur, India. \n\n \n\nThought\nLeadership:\n\na.     \nMember, Prime Minister’s National Task Force on IT & Software\nDevelopment.\n\nb.     \nChairman, World Tele Management Forum’s (TMF) Security Committee.\n\nc.      \nMember, New Generation Operations Software & Systems Architecture\nBoard at TMF\n\nd.     \nMember, Advisory Board, Information Systems Audit & Control\nAssociation (ISACA)\n\ne.     \nMember, NASSCOM National Advisory Board on Security & Assurance\n\nf.       \nMember, Board of Mentors, Regional Security Institute.\n\ng.     \nMember, Executive Committee, Asia Pacific Telecommunication Council\n\nh.     \nMember, National Research, Design & Development Working Group on IT\n\ni.       \nMember, CII National Committees on IT& ITeS, Defense and AI.\n\nj.       \nMember, NASSCOM Cyber Security Task Force & CII Cyber Security Task\nForce\n\n \n\nAuthorship of\nBooks, Reports and Papers:\n\na.     \n“Concept Definition, Architecture and Configuration for National C4ISR\nProgram for India”, at WESEE in 1995.\n\nb.     \n“Program Complexities of India’s National Information Infrastructure and\nInformation Warfare Program for the Year 2000 and Beyond”, 10 Volume work\n(Restricted), at WESEE in Feb 2000.\n\n",
//   "isRegisterMandatory": false,
//   "mode": "ON",
//   "opening": 20,
//   "phoneNumber": "8899876555",
//   "primaryContact": {
//       "contactName": "Srinath",
//       "email": "sri@gmail.com",
//       "phoneNumber": "8899876555",
//       "role": "Head"
//   },
//   "startdate": "2023-11-27",
//   "status1": "open",
//   "time1": "13:00",
//   "update_on": "2023-11-29T12:55:59.274Z"
// }