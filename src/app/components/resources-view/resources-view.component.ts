import { Component } from '@angular/core';
import { VillageService } from '../../services/village.service';
import { KeyValuePipe } from '@angular/common';
import { ResourceLineComponent } from '../resource-line/resource-line.component';

@Component({
  selector: 'app-resources-view',
  standalone: true,
  imports: [KeyValuePipe, ResourceLineComponent],
  templateUrl: './resources-view.component.html',
  styleUrl: './resources-view.component.css'
})
export class ResourcesViewComponent {

  constructor (private villageServices:VillageService){}

  getResources():Map<string, number>{
    return this.villageServices.resources;
  }
}
