import { Component } from '@angular/core';
import { VillageService } from '../../services/village.service';
import { Improvement } from '../../models/improvement';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  constructor (private villageServices:VillageService){}

  getImprovements():Improvement[]{
    return this.villageServices.improvements;
  }
  

}
