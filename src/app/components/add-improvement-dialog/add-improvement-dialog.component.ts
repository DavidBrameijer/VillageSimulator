import { Component, Input } from '@angular/core';
import { VillageService } from '../../services/village.service';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ImprovementType } from '../../models/improvement-type';

@Component({
	selector: 'app-add-improvement-dialog',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './add-improvement-dialog.component.html',
	styleUrl: './add-improvement-dialog.component.css'
})
export class AddImprovementDialogComponent {
	constructor(private village: VillageService, private data: DataService) { }

	@Input() index: number = -1;
	type: string = "";

	ngOnInit() : void {
		this.data.getImprovementTypes(types => {
			this.type = types[0].type;
		});
	}

	getPossible(): ImprovementType[] {
		return this.data.improvementypes;
	}

	addImprovement(): void {
		this.village.addImprovement(this.type, this.index);
	}


	canImprove(): Boolean {

		let improvement = this.getPossible().find((item) => item.type === this.type);

		if (improvement === undefined) {
			return false;
		}

		for (const type in improvement.cost) {
			if (this.village.resources.get(type)! < (improvement.cost as any)[type]) {
				return false;
			}
		}
		return true;
	}

}
