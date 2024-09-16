import { Component } from '@angular/core';
import { SaveLoadService } from '../../services/save-load.service';
import { VillageService } from '../../services/village.service';

@Component({
  selector: 'app-load-menu',
  standalone: true,
  imports: [],
  templateUrl: './load-menu.component.html',
  styleUrl: './load-menu.component.css'
})
export class LoadMenuComponent {
	constructor(private village:VillageService, private saveLoad:SaveLoadService) {}

	slotHasSave(index: number) : boolean{
		return this.saveLoad.hasSavedGame(index);
	}

	loadOrCreate(index: number) : void {
		if (this.slotHasSave(index)) {
			this.village.loadGame(index);
		} else {
			this.village.newGame(index);
		}
	}
}
