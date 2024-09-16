import { Component, Input, Type } from '@angular/core';
import { Improvement } from '../../models/improvement';
import { VillageService } from '../../services/village.service';
import { DataService } from '../../services/data.service';
import { concatWith } from 'rxjs';

@Component({
	selector: 'app-edit-improvement-dialog',
	standalone: true,
	imports: [],
	templateUrl: './edit-improvement-dialog.component.html',
	styleUrl: './edit-improvement-dialog.component.css'
})
export class EditImprovementDialogComponent {
	constructor(private village: VillageService, private data: DataService) { }

	@Input() index: number = -1;

	getImprovement(): Improvement {
		return this.village.improvements[this.index];
	}

	doUpgradeDowngrade(isUpgrade: boolean): void {
		if (isUpgrade) {
			let requirement = this.data.getImprovementByName(this.getImprovement().type);
			this.village.upgradeImprovement(this.index);
			this.village.removeResources(requirement.cost);
			this.village.addResources(requirement.product);
		}
		else {
			let requirement = this.data.getImprovementByName(this.getImprovement().type);
			this.village.downgradeImprovement(this.index);
			this.village.addResources(requirement.cost);
			this.village.removeResources(requirement.product);
		}
	}

	destroyImprovement(): void {
		let level = this.getImprovement().level;
		let requirement = this.data.getImprovementByName(this.getImprovement().type);
		this.village.removeImprovement(this.index);

		for (let i = 0; i < level; i++) {
			this.village.addResources(requirement.cost);
			this.village.removeResources(requirement.product);
		}


	}

	canUpgrade(): Boolean {
		let type = this.getImprovement().type;
		let upgrade = this.data.getImprovementByName(type)



		for (const validUpgrade in upgrade.cost) {
			if (this.village.resources.get(validUpgrade)! < (upgrade.cost as any)[validUpgrade]) {
				return false;
			}
		}
		return true;
	}

	canDowngrade(): Boolean {

		let type = this.getImprovement().type;
		let upgrade = this.data.getImprovementByName(type)
		if (this.getImprovement().level == 1) {
			return false;
		}

		for (const validUpgrade in upgrade.product) {
			if (this.village.resources.get(validUpgrade)! < (upgrade.product as any)[validUpgrade]) {
				return false;
			}
		}
		return true;

	}

	canDestroy(): Boolean {

		let type = this.getImprovement().type;
		let upgrade = this.data.getImprovementByName(type)
		let level = this.getImprovement().level;

		for (const validUpgrade in upgrade.product) {

			if (this.village.resources.get(validUpgrade)! < (upgrade.product as any)[validUpgrade] * level) {
				return false;
			}

		}

		return true;

	}

	playSoundDestroy(){
		let audio = new Audio();
		audio.src = `assets/sounds/Sound Effects/destroy.wav`;
		audio.load();
		audio.volume = 0.5;
		audio.play();
		
			
	}


}