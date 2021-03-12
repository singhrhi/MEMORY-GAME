import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICard } from './card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  @Input()
  cardData!: ICard

  @Output()
  clickedCard: EventEmitter <ICard> = new EventEmitter();


  imgClick(clickedCard: ICard){
    console.log('in clickedCard card')
    this.clickedCard.emit(clickedCard);
  }

  constructor() { }

  ngOnInit(): void {
    console.log('in ng-on-init')
  }

  getUrl(){
    if(this.cardData.cardState !== 'default'){
      return this.cardData.image;
    }
    if(this.cardData.cardState === 'default'){
      return "https://picsum.photos/200/200/?blur=10"
    }
    return;
  }
  
}
