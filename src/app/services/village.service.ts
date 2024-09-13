import { Injectable } from '@angular/core';
import { Improvement } from '../models/improvement';

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  constructor() {
    this.clearImprovements();
  }

  improvements: Improvement[] = [];
  resources: Map<string, number> = new Map([
    ["Lumber", 5],
    ["Grain", 5],
    ["Water", 5],
    ["Sheep", 1]
  ]);

  clearImprovements(): void {
    this.improvements = [];
    for (let i = 0; i < 49; i++) {
      this.improvements.push({} as Improvement);
    }
  }

  addImprovement(type: string, index: number): void {
    let added: Improvement = { type: type, level: 1 }
    this.improvements[index] = added;
  }

  removeImprovement(index: number): void {
    this.improvements[index] = {} as Improvement;
  }

  upgradeImprovement(index: number): void {

    this.improvements[index].level += 1;

  }

  downgradeImprovement(index: number) {
    let currentImprovement = this.improvements[index];

    if (currentImprovement.level > 1) {
      currentImprovement.level -= 1;
    }


  }
}
