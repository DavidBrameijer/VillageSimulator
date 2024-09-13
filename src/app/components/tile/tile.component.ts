import { Component, Input } from '@angular/core';
import { Improvement } from '../../models/improvement';
import { EditImprovementDialogComponent } from "../edit-improvement-dialog/edit-improvement-dialog.component";
import { AddImprovementDialogComponent } from "../add-improvement-dialog/add-improvement-dialog.component";

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [EditImprovementDialogComponent, AddImprovementDialogComponent],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
	@Input() improvement: Improvement = {} as Improvement;
	@Input() index: number = -1;

	displayPanel: boolean = false;
}
