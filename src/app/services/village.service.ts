import { Injectable } from '@angular/core';
import { Improvement } from '../models/improvement';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor() { }

  improvements:Improvement[] = [];
  resources:Map<string,number> = new Map([
    ["Lumber", 5],
    ["Grain", 5],
    ["water", 5],
    ["Sheep", 1]
  ]);

  addImprovement(type:string){
    let added:Improvement = {type:type, level: 1}
    this.improvements.push(added)
  }

  removeImprovement(){

  }

  upgradeImprovement(){

  }

  downgradeImprovement(){

  }
}
