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
    ["water", 5],
    ["Sheep", 1]
  ]);

  clearImprovements(): void {
    this.improvements = [];
    for (let i = 0; i < 49; i++) {
      this.improvements.push({} as Improvement);
    }
  }

  addImprovement(type: string, x: number, y: number): void {
    let added: Improvement = { type: type, level: 1 }
    this.improvements[y * 7 + x] = added;
  }

  removeImprovement(x: number, y: number): void {
    this.improvements[y * 7 + x] = {} as Improvement;
  }

  upgradeImprovement(x: number, y: number): void {

    this.improvements[y * 7 + x].level += 1;

  }

  downgradeImprovement(x: number, y: number) {
    let currentImprovement = this.improvements[y * 7 + x];

    if (currentImprovement.level > 0) {
      currentImprovement.level -= 1;
    }


  }
}
