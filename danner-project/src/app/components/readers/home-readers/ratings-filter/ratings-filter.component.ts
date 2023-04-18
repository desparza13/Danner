import { Component, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-ratings-filter',
  templateUrl: './ratings-filter.component.html',
  styleUrls: ['./ratings-filter.component.scss']
})
export class RatingsFilterComponent {
  //Ratings checkboxes
  panelOpenState = false;
  ratings = [
    { name: '1 star', checked: false, index:0 },
    { name: '2 stars', checked: false, index:1 },
    { name: '3 stars', checked: false, index:2 },
    { name: '4 stars', checked: false, index:3 },
    { name: '5 stars', checked: false, index:4 }
  ];
  @Output() ratingsChanged = new EventEmitter<any>();

  onRatingChange(isChecked:boolean, index:any) {
    this.ratings[index].checked = isChecked;
    console.log(this.ratings);
    this.ratingsChanged.emit(this.ratings);
  }
}
