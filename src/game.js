
import Breakout from './breakout';

export default class Game {
  constructor() {
    this.game = new Breakout();


    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 300;
    this.backBufferCanvas.height = 300;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');


  }




}
