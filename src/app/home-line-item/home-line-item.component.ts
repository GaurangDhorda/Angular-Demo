import { Component, OnInit, Input, EventEmitter , Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-home-line-item',
  templateUrl: './home-line-item.component.html',
  styleUrls: ['./home-line-item.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class HomeLineItemComponent implements OnInit {
   @Input('employee') hotelData; 
   @Output() clickImage: EventEmitter<any> = new EventEmitter<any>();
   @Output() showMoreDetails: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  details(employee){
    this.clickImage.emit(employee);
  }
  showMoreData(data){
    this.showMoreDetails.emit(data);
  }
}
