import { Component } from '@angular/core';
import { ICard } from './cards/card/card.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'memory-game';
}
