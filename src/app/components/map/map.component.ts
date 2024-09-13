import { Component } from '@angular/core';
import { VillageService } from '../../services/village.service';
import { Improvement } from '../../models/improvement';
import { TileComponent } from "../tile/tile.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  constructor (private villageServices:VillageService){}

  getImprovements():Improvement[]{
    return this.villageServices.improvements;
  }
  

}
