import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImprovementType } from '../models/improvement-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { 
	this.api = this.http.get<ImprovementType[]>("assets/improvements.json");
	this.api.subscribe(t => {
		this.improvementypes = t;
		this.hasData = true;
		console.log(t);
	});
  }

  improvementypes: ImprovementType[] = [];
  hasData : boolean = false;
  private api: Observable<ImprovementType[]>;

  getImprovementTypes(subscriber: ((value: ImprovementType[]) => void)) : void {
	if (this.hasData) {
		console.log(this.improvementypes);
		subscriber(this.improvementypes);
	}
	else {
		this.api.subscribe(subscriber);
	}
  }
}
