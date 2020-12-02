import { Component, OnInit,ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MdbTableDirective} from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { SlackService } from '../slack.service';
// @ts-ignore
import { HttpClient } from '@angular/common/http';
import {LivelogService} from './livelog.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-livelog',
  templateUrl: './livelog.component.html',
  styleUrls: ['./livelog.component.css']
})

export class LiveLogComponent implements OnInit {
  title = 'Live Log';
  addForm: FormGroup;
  rows: FormArray;
  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();
  products: any = [];

  itemForm: FormGroup;
 elements: any = [];
 stepelements: any=[];
  headElements = ['ID', 'StepTitle', 'ExecutionDate'];
  masterHeadElements = ['StepDesc', 'StepResult'];
  public countfail: number = 0 ;
  public countpass: number = 0;
  public countblock:  number = 0;
  public countnotexec:  number = 0;
  public modalErrorMessage: any;
public contents: Array<any>;
public contentstest:Array<any>;
public innercontentsfields: Array<any>;
public stepscontents: Array<any>;
@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  constructor(private httpService: HttpClient,
              private  livelogService: LivelogService,
             private fb: FormBuilder,private slackService: SlackService){}

  ngOnInit(){




    this.livelogService.getAllSteps().subscribe(



      data =>{
        console.log(data)
        this.contents=data;
      //  console.log("content: of contents "+this.contents);
        this.products = data;
        this.elements = data
        this.contents =  data;
        this.mdbTable.setDataSource(data);
        this.elements = this.mdbTable.getDataSource();
        this.getChartDataValues();

      },
      (error)=>{
        console.log(error.error.message);
      }
    )


       //  this.getScenarioResults();


  }

private webhook:any;
  textChange(url:any){
      this.inputModelChange.emit(this.inputModel);
    console.log(url)

    this.webhook = url;

    }

    slackle():void{
console.log("slackle")
console.log( "slackle")
    console.log(this.webhook)
 this.livelogService.getAllSteps().subscribe(

                  data => {


                       this.contents = data["default"][0]
                       this.contents = this.contents["elements"];

                     //  console.log(this.contents)

                     for(let content in this.contents){
                         this.stepscontents = this.contents[content].steps;
                         //console.log(this.stepscontents)
                         for(let step in this.stepscontents){
                           if(this.stepscontents[step].result.status.includes('failed') ){
                                                   console.log(this.webhook)
                                   this.slackService.postErrorOnSlack(this.stepscontents[step].name,this.webhook);
                        console.log(  "faileddd ")
                        console.log(this.stepscontents[step].name)

                           }

                         }
                         }



                                           },
                                                   (error)=>{
                                                     console.log(error.error.message);
                                                   }
                                     );
    }

   navigate(el:any){

    }

    setPage(event: any) {
        //  event.prevendDefault();
        //console.log("in setPage: ")
       // console.log(this.page);
       this.page = this.page /5  + 1;
         this.page = this.page *5;

        //this.getIssuessByMaxResults();

       // this.getContents();

      }



      showmodalboxerrormessage(data:any){
          this.modalErrorMessage =data.result.error_message;
        }

        public pages: Array<number>;
        private page: number = 0;
 public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [this.countfail, this.countpass, this.countblock, this.countnotexec], label: 'Test Exec Chart Results' }
  ];

  public chartLabels: Array<any> = ['Fail', 'Pass', 'Block', 'Not Executed'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#23bf5c', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void {
    // this.getChartDataValues();
  }
  public chartHovered(e: any): void {
    //  this.getChartDataValues();
  }

  getChartDataValues(){


this.livelogService.getAllSteps().subscribe(data =>{
    this.contents =  data;
        for(let content in this.contents){
          console.log("content in contents")
          console.log(content)

        }
    });


  this.chartDatasets =[
          { data: [this.countfail, this.countpass, this.countblock, this.countnotexec], label: 'Test Exec Chart Results'}
        ];
   }

   getScenarioResults(){

   this.livelogService.getAllSteps().subscribe(

                data => {


                     this.contents = data["default"][0]
                     this.contents = this.contents["elements"];
                    console.log(this.contents)

                   /*for(let content in this.contents){
                       this.stepscontents = this.contents[content].steps,
                       this.elements.push({id:this.contents[content].id,
                                          name:this.contents[content].name,
                                          keyword:this.contents[content].keyword})
                       console.log(this.stepscontents)
                       for(let step in this.stepscontents){
                          this.elements.push({
                                masterDetail:[{keyword:this.stepscontents[step].keyword,
                                               name:this.stepscontents[step].name,
                                               result:this.stepscontents[step].result.status}]
                                                                  });
                       }



                   }*/



                },
                        (error)=>{
                          console.log(error.error.message);
                        }
          );
   }

   ticketstatus=true;
   checkstatus(status:any){

      if(status.includes('skipped'))
       {
            this.ticketstatus=false;
               console.log(status)

       }
   }



}
