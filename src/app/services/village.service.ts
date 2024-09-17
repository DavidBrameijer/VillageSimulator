import { Injectable } from '@angular/core';
import { Improvement } from '../models/improvement';
import { SaveLoadService } from './save-load.service';
import { SaveData } from '../models/save-data';

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  constructor(private saveLoad:SaveLoadService) {
    this.clearImprovements();
  }

  improvements: Improvement[] = [];
  resources: Map<string, number> = this.getDefaultResources();

  saveGame() : void {
	let saveData : SaveData = {
		resources: Object.fromEntries(this.resources), 
		improvements: this.improvements
	};
	this.saveLoad.saveGame(saveData);
  }

  loadGame(index: number) : void {
	let loadData = this.saveLoad.loadGame(index);
	if (loadData === null) {
		return;
	}	
	this.improvements = loadData.improvements;
	this.resources = this.getDefaultResources();
	for (const key in loadData.resources) {
		this.resources.set(key, (loadData.resources as any)[key] as number);
	}
  }

  getDefaultResources() : Map<string, number> {
	return new Map([
		["Lumber", 5],
		["Grain", 5],
		["Water", 5],
		["Sheep", 1],
		["People", 0],
		["Stone", 0],
		["Gold", 0]
	]);
  }

  newGame(index: number) : void {
	this.saveLoad.newGame(index);
	this.resources = this.getDefaultResources();
	this.clearImprovements();
	this.saveGame();
  }

  clearImprovements(): void {
    this.improvements = [];
    for (let i = 0; i < 49; i++) {
      this.improvements.push({} as Improvement);
    }
  }

  addImprovement(type: string, index: number): void {
    let added: Improvement = { type: type, level: 1 }
    this.improvements[index] = added;
	this.saveGame();
  }

  removeImprovement(index: number): void {
    this.improvements[index] = {} as Improvement;
	this.saveGame();
  }

  upgradeImprovement(index: number): void {
    this.improvements[index].level += 1;
	this.saveGame();
  }

  downgradeImprovement(index: number) {
    let currentImprovement = this.improvements[index];

    if (currentImprovement.level > 1) {
      currentImprovement.level -= 1;
    }

	this.saveGame();
  }

  addResources(requirements:Map<string, number>):void{
    for (const type in requirements) {
			let amount = this.resources.get(type)!;
			console.log(amount);
			console.log(type);
			amount += (requirements as any)[type];
			this.resources.set(type, amount);
	}
	this.saveGame();
  }

  removeResources(requirements:Map<string, number>):void{
    for (const type in requirements) {
			let amount = this.resources.get(type)!;
			amount -= (requirements as any)[type];
			this.resources.set(type, amount);
	}
	this.saveGame();
  }
}
