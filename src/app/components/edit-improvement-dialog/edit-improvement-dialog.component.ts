import { Component, Input } from '@angular/core';
import { Improvement } from '../../models/improvement';
import { VillageService } from '../../services/village.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-improvement-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-improvement-dialog.component.html',
  styleUrl: './edit-improvement-dialog.component.css'
})
export class EditImprovementDialogComponent {
	constructor(private village:VillageService, private data:DataService) {}

	@Input() index: number = -1;

	getImprovement() : Improvement {
		return this.village.improvements[this.index];
	}

	doUpgradeDowngrade(isUpgrade: boolean) : void {
		if (isUpgrade) {
			this.village.upgradeImprovement(this.index);
		}
		else {
			this.village.downgradeImprovement(this.index);
		}
	}

	destroyImprovement() : void {
		let requirement = this.data.getImprovementByName(this.getImprovement().type);
		this.village.removeImprovement(this.index);
		this.village.addResources(requirement.cost);
		this.village.removeResources(requirement.product);
	}
}
