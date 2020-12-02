import {Injectable} from '@angular/core';
import {StepModel} from './step.model';
// @ts-ignore
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment.prod";




@Injectable()
export class LivelogService {

  elementsSt:StepModel[];

  constructor(private http: HttpClient) {



  }


  private livelog_api_url=environment.spring+'/steps/all';
  private livelog_pagination_url=environment.spring+'/pagination/steps?orderBy=id&direction=ASC&page='
  public getSteps() {

    return this.http.get<StepModel[]>(`${environment.spring}/pagination/preprod?orderBy=id&direction=DESC&page=0&size=10`);
  }

  public getAllSteps(){
    return this.http.get<StepModel[]>(this.livelog_api_url);

  }

  public getContentsByPage(page:number){

    //   return this.http.get<PreProd[]>(`${environment.spring}/preprod?orderBy=id&direction=DESC&size=10&page`,{page});
    return this.http.get<StepModel[]>(this.livelog_pagination_url+page+ '&size=10');
  }

}
