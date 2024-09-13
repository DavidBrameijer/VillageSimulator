import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resource-line',
  standalone: true,
  imports: [],
  templateUrl: './resource-line.component.html',
  styleUrl: './resource-line.component.css'
})
export class ResourceLineComponent {
  @Input() type:string = "";
  @Input() quantity:number = 0;
}
