import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImprovementType } from '../models/improvement-type';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { 
	this.http.get<ImprovementType[]>("assets/improvements.json").subscribe(t => {
		this.improvementypes = t;
		console.log(t);
	});
  }

  improvementypes: ImprovementType[] = [];
}
