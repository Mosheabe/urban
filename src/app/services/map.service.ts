import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  markerUrl: string = '/assets/data/layers.geojson';
  markers = new Array();
  constructor(private http: HttpClient, private popupService: PopupService) {}

  addMarkers(map: L.Map, feature): void {
    //for (const c of features) {
    const lon = feature.geometry.coordinates[0];
    const lat = feature.geometry.coordinates[1];
    const marker = L.marker([lat, lon]);
    this.markers.push(marker);
    marker.bindPopup(this.popupService.makePopup(feature.properties));

    marker.addTo(map);
    //}
  }

  removeMarkers(map: L.Map, feature): void {
    let lng = feature.geometry.coordinates[0];
    let lat = feature.geometry.coordinates[1];
    for (const c of this.markers) {
      if (c._latlng.lat === lat && c._latlng.lng === lng) {
        map.removeLayer(c);
      }
    }
  }

  getLayers() {
    return this.http.get(this.markerUrl).pipe(
      map((res: any) => {
        if (!res || !res.features) {
          throw new Error('Value expected!');
        }
        return res.features;
      }),
      catchError(() => of([]))
    );
  }
}
