import { AfterContentInit, AfterViewInit, OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard } from './card/card.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit{
  cData: ICard [] = [];

  @Output()
  informParent: EventEmitter <ICard> = new EventEmitter()

  checkTwoClickedImages: ICard[] = [];

  playerOne = {
    points: 0
  }

  playerTwo = {
    points: 0
  }

  cutrrentPlayer: string = 'first'
  arrResetLength:  ICard[] = [];
  

  constructor() { }

  singleCardClicked(cardData: ICard){
      this.cardClickedAtCards(cardData);
      this.arrResetLength = this.cData.filter(data => {
        return (data.cardState === 'default') || (data.cardState === 'flipped')
      })
  }

  resetRequired(){
    return this.arrResetLength.length === 1;
  }

  cardClickedAtCards(cardData: ICard){
    
    if(cardData.cardState === 'default'){
     
      this.checkTwoClickedImages.push(cardData)
       

      if(this.checkTwoClickedImages.length == 2){
          if(this.checkTwoClickedImages[0].cardId == this.checkTwoClickedImages[1].cardId){

            this.checkTwoClickedImages[0].cardState = 'matched'
            this.checkTwoClickedImages[1].cardState = 'matched'
            
            if(this.cutrrentPlayer === 'first'){
              this.playerOne.points += 1
              this.cutrrentPlayer = 'second';
            }
            else if(this.cutrrentPlayer === 'second'){
              this.playerTwo.points += 1;
              this.cutrrentPlayer = 'first';
            }
            this.checkTwoClickedImages.pop();
            this.checkTwoClickedImages.pop();
          }
          else{
            if(this.cutrrentPlayer === 'first'){
              this.cutrrentPlayer = 'second';
            }
            else if(this.cutrrentPlayer === 'second'){
              this.cutrrentPlayer = 'first';
            }
            this.checkTwoClickedImages[0].cardState = 'flipped'
            this.checkTwoClickedImages[1].cardState = 'flipped'

            setTimeout(()=>{
              this.checkTwoClickedImages[0].cardState = 'default'
              this.checkTwoClickedImages[1].cardState = 'default'

              this.checkTwoClickedImages = [];
  
            },1000)
           
          }
          
      }
      if(this.checkTwoClickedImages.length == 1){
        this.checkTwoClickedImages[0].cardState = 'flipped'

      }

    }
  }

  shuffleArray() {
    for (let i = this.cData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cData[i], this.cData[j]] = [this.cData[j], this.cData[i]];
    }
  }

  showWinner(){
    return this.playerOne.points > this.playerTwo.points ? 'Player One' : 'Player Two'; 
  }

  reset(){

    this.cData = [ {image: "https://picsum.photos/id/238/200/200", uid:'first' + 1, cardId: 238, cardState: 'default'},
                  {image: "https://picsum.photos/id/238/200/200", uid:'second' + 2, cardId: 238, cardState: 'default'},
                  {image: "https://picsum.photos/id/239/200/200", uid:'third' + 3, cardId: 239, cardState: 'default'},
                  {image: "https://picsum.photos/id/239/200/200", uid:'fourth' + 4, cardId: 239, cardState: 'default'},
                  {image: "https://picsum.photos/id/240/200/200", uid:'five' + 5, cardId: 240, cardState: 'default'},
                  {image: "https://picsum.photos/id/240/200/200", uid:'six' + 6, cardId: 240, cardState: 'default'},
                  {image: "https://picsum.photos/id/241/200/200", uid:'seven' + 7, cardId: 241, cardState: 'default'},
                  {image: "https://picsum.photos/id/241/200/200", uid:'eight' + 8, cardId: 241, cardState: 'default'},
                  {image: "https://picsum.photos/id/242/200/200", uid:'nine' + 9, cardId: 242, cardState: 'default'},
                  {image: "https://picsum.photos/id/242/200/200", uid:'ten' + 10, cardId: 242, cardState: 'default'},
                  {image: "https://picsum.photos/id/243/200/200", uid:'eleven' + 11, cardId: 243, cardState: 'default'},
                  {image: "https://picsum.photos/id/243/200/200", uid:'twelve' + 12, cardId: 243, cardState: 'default'},
                  {image: "https://picsum.photos/id/244/200/200", uid:'thirteen' + 13, cardId: 244, cardState: 'default'},
                  {image: "https://picsum.photos/id/244/200/200", uid:'fourteen' + 14, cardId: 244, cardState: 'default'},
                  {image: "https://picsum.photos/id/237/200/200", uid:'fifteen' + 15, cardId: 245, cardState: 'default'},
  
                  ]

    this.arrResetLength = [];
    this.playerOne.points = 0;
    this.playerTwo.points = 0;
    this.cutrrentPlayer = 'first';
  }

  ngOnInit(): void {

    this.reset();

    this.shuffleArray();
  }

  trackByMethod(index:number, el:ICard): string {
    return el.uid;
  }

}
