import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResourcesViewComponent } from "./components/resources-view/resources-view.component";
import { MapComponent } from "./components/map/map.component";
import { DataService } from './services/data.service';
import { SaveLoadService } from './services/save-load.service';
import { LoadMenuComponent } from "./components/load-menu/load-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResourcesViewComponent, MapComponent, LoadMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private data:DataService, private saveLoad:SaveLoadService) {}

  title = 'Sanctuary';
  buildingTypes: string[] = [];
  musicMuted: boolean = false;

  ngOnInit() : void {
	this.data.getImprovementTypes(types => {
		this.buildingTypes = types.map(type => type.type);
	});
  }

  isGameLoaded(): boolean {
	return this.saveLoad.whichGame > 0
  }

  backToHome():number{
    return this.saveLoad.whichGame = -1;
  }
}
