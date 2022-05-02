import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MarkerService } from '../services/map.service';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
})
export class LayersComponent implements OnInit {
  @Output() layerClicked = new EventEmitter<{}>();

  hide = true;
  layers: any;

  selectedLayers = [];

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    this.markerService.getLayers().subscribe((res) => {
      this.layers = res;
    });
  }

  onCheckboxChange(e: any, layer: any) {
    let checked = e.target.checked;
    this.layerClicked.emit({ checked, layer });
  }
}
