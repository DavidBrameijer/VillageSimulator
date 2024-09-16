import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResourcesViewComponent } from "./components/resources-view/resources-view.component";
import { MapComponent } from "./components/map/map.component";
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResourcesViewComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private data:DataService) {}

  title = 'Sanctuary';
  buildingTypes: string[] = [];

  ngOnInit() : void {
	this.data.getImprovementTypes(types => {
		this.buildingTypes = types.map(type => type.type);
	});
  }
}
