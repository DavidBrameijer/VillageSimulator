import { Injectable } from '@angular/core';
import { VillageService } from './village.service';
import { SaveData } from '../models/save-data';

@Injectable({
  providedIn: 'root'
})
export class SaveLoadService {
  constructor() {}

  whichGame: number = -1;

  loadGame(which: number) : SaveData | null {
	let json = localStorage.getItem(`sanctuary_save_${which}`);
	if (json === null) {
		return null;
	}
	this.whichGame = which;
	return JSON.parse(json) as SaveData;
  }

  hasSavedGame(which: number) : boolean {
	return localStorage.getItem(`sanctuary_save_${which}`) != null;
  }

  saveGame(saveData: SaveData) : void {
	let json = JSON.stringify(saveData);
	localStorage.setItem(`sanctuary_save_${this.whichGame}`, json);
  }

  newGame(which: number) : void {
	this.whichGame = which;
  }
}
