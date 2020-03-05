import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MapViewComponent implements OnInit {
  Employee;
  @Input('mapApiData') set data (apiData : any){
    this.Employee = apiData;
    console.log({'emp' : this.Employee});
  }
  @Output() mapClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapMarkerClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapInfoWindow: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  closeMapView() {
    this.mapClose.emit();
  }
  close_window(){
    this.mapMarkerClose.emit();
  }
  select_marker(infoWindow){
    this.mapInfoWindow.emit(infoWindow);
  }
}
