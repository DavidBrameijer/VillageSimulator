import { Injectable } from '@angular/core';
import { VillageService } from './village.service';
import { SaveData } from '../models/save-data';

@Injectable({
  providedIn: 'root'
})
export class SaveLoadService {
  constructor(private village:VillageService) { }

  whichGame: number = -1;

  loadGame(which: number) : void {
	let json = localStorage.getItem(`sanctuary_save_${which}`);
	if (json === null) {
		return;
	}

	let saveData = JSON.parse(json) as SaveData;
	this.village.improvements = saveData.improvements;
	this.village.resources.clear();
	for (const key in saveData.resources) {
		this.village.resources.set(key, (saveData.resources as any)[key] as number);
	}
	this.whichGame = which;
  }

  hasSavedGame(which: number) : boolean {
	return localStorage.getItem(`sanctuary_save_${which}`) != null;
  }

  saveGame() : void {
	let saveData : SaveData = {
		resources: this.village.resources, 
		improvements: this.village.improvements
	};
	localStorage.setItem(`sanctuary_save_${this.whichGame}`, JSON.stringify(saveData));
  }

  newGame(which: number) : void {
	this.whichGame = which;
	this.village.clearImprovements();
	this.saveGame();
  }
}
