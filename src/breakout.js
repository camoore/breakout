
/** @class Breakout
  * The Breakout game for the game
  */
export default class Breakout {
  constructor(){
    //main canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    this.screenBufferCanvas.width = 1000;
    this.screenBufferCanvas.height = 800;
    this.x = this.screenBufferCanvas.width/2;
    this.y = this.screenBufferCanvas.height-200;
    this.dx = 2;
    this.dy = -2;

    //Size of the ball
    this.ballRadius = 9;
    this.screenBufferContext.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';

    //Paddle
    this.paddleH = 10;
    this.paddleW = 150;
    this.pSize = (this.screenBufferCanvas.width-this.paddleW)/2;
    this.spaceP = false;
    this.leftB = false;
    this.rightB = false;

    //Handle key press
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    //Bricks
    this.brickWidth = 94;
    this.brickHeight = 40;
    this.brickCols = 10;
    this.brickRows = 9;
    this.brickSpacing = 3;
    this.brickAlign1 = 12;
    this.brickAlign2 = 15;
    this.score = 0;

    this.bricks = [];
    for(this.c=0; this.c<this.brickCols; this.c++) {
      this.bricks[this.c] = [];
      for(this.r=0; this.r<this.brickRows; this.r++) {
        this.bricks[this.c][this.r] = { x: 0, y: 0, current: 1};
      }
    }

    this.ballObject = this.ballObject.bind(this);
    this.paddleObject = this.paddleObject.bind(this);
    this.scoreObject = this.scoreObject.bind(this);
    this.drawCanvasObjects = this.drawCanvasObjects.bind(this);
    this.interval = setInterval(this.drawCanvasObjects, 2);
    document.body.appendChild(this.screenBufferCanvas);

  }

  /** @method keyDownHandler
   * Handles if key is pressed
   */
  keyDownHandler(event) {
      if(event.keyCode === 39) {
        this.rightB = true;
      }
      else if(event.keyCode === 37) {
        this.leftB = true;
      }
      else if(event.keyCode === 32){
        this.spacebar = true;
      }
  }
  /** @method keyUpHandler
   * Handles if key is released
   */
  keyUpHandler(event) {
      if(event.keyCode === 39) {
        this.rightB = false;
      }
      else if(event.keyCode === 37) {
        this.leftB = false;
      }
      else if(event.keyCode === 32){
        this.spaceP = false;
      }
  }
  /** @method paddleObject
   * Draw the paddle object used in the game
   */
  paddleObject() {
      this.screenBufferContext.beginPath();
      this.screenBufferContext.rect(this.pSize,
                                    this.screenBufferCanvas.height-this.paddleH,
                                    this.paddleW, this.paddleH);

      this.screenBufferContext.fillStyle = "blue";
      this.screenBufferContext.fill();
      this.screenBufferContext.closePath();
  }
  /** @method scoreObject
   * Print the score onto the screen
   */
  scoreObject(){
     this.screenBufferContext.font="25px bold Arial";
     this.screenBufferContext.fillText("Score: "+this.score,40,600);

  }
  /** @method ballObject
   * Draw the ball for the game
   */
  ballObject() {
      this.screenBufferContext.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      this.screenBufferContext.beginPath();
      this.screenBufferContext.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
      this.screenBufferContext.fillStyle = "white";
      this.screenBufferContext.fill();
      this.screenBufferContext.closePath();
  }
  /** @method brickObjects
   * Draw the 50 bricks onto the canvas
   */
  brickObjects() {
    for(this.c=0; this.c<this.brickCols; this.c++) {

        for(this.r=0; this.r<this.brickRows; this.r++) {

            if(this.bricks[this.c][this.r].current === 1){
              this.brickX = (this.c*(this.brickWidth+this.brickSpacing))+this.brickAlign2;
              this.brickY = (this.r*(this.brickHeight+this.brickSpacing))+this.brickAlign1;
              this.bricks[this.c][this.r].x = this.brickX;
              this.bricks[this.c][this.r].y = this.brickY;
              this.screenBufferContext.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
              this.screenBufferContext.beginPath();


              this.screenBufferContext.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
              this.screenBufferContext.strokeStyle="black";
              this.screenBufferContext.strokeRect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
              this.screenBufferContext.fill();
              this.screenBufferContext.closePath();
            }

        }

    }

  }
  /** @method collisionDetection
   * Detects if a brick his been hit;
   */
  collisionDetection() {
      for(this.c=0; this.c<this.brickCols; this.c++) {
          for(this.r=0; this.r<this.brickRows; this.r++) {
              this.b = this.bricks[this.c][this.r];
              if(this.b.current === 1) {
                  if(this.x > this.b.x && this.x < this.b.x+this.brickWidth && this.y > this.b.y && this.y < this.b.y+this.brickHeight) {
                      this.screenBufferContext.beginPath();
                      this.score++;
                      this.screenBufferContext.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
                      this.screenBufferContext.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
                      this.screenBufferContext.stroke="10";
                      this.screenBufferContext.fill();
                      this.screenBufferContext.closePath();
                      this.dy = -this.dy;
                      this.b.current = 0;
                  }
              }
          }
      }
  }
/** @method drawCanvasObjects
 * Draw all of the objects onto the canvas
 */
  drawCanvasObjects() {

      this.screenBufferContext.clearRect(0, 0, this.screenBufferCanvas.width,
                                         this.screenBufferCanvas.height);

      this.ballObject();
      this.paddleObject();
      this.scoreObject();
      this.brickObjects();
      this.collisionDetection();


      if(this.x + this.dx > this.screenBufferCanvas.width-this.ballRadius
      || this.x + this.dx < this.ballRadius) {
        this.screenBufferContext.beginPath();
        this.screenBufferContext.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
        this.screenBufferContext.stroke="10";
        this.screenBufferContext.fill();
        this.screenBufferContext.closePath();
          this.dx = -this.dx;
          var play = document.getElementById("bounce").play();
      }
      if(this.y + this.dy < this.ballRadius) {
          this.dy = -this.dy;
          this.document.getElementById("bounce").play();
      }
      else if(this.y + this.dy > this.screenBufferCanvas.height-this.ballRadius) {
          if(this.x > this.pSize && this.x < this.pSize + this.paddleW) {
              this.dy = -this.dy;
          }
          else {
            clearInterval(this.interval);
            this.screenBufferContext.font = "35pt bold arial";
            this.screenBufferContext.fillText("Game Over",400,400);
            this.screenBufferContext.fillText("Press [spacebar] to reload",280,500);
            document.body.onkeyup = function(e){
              if(e.keyCode === 32){
                document.location.reload();
              }
            }
          }
      }


      this.x += this.dx;
      this.y += this.dy;

      if(this.rightB && this.pSize < this.screenBufferCanvas.width-this.paddleW) {
          this.pSize += 6;
      }
      else if(this.leftB && this.pSize > 0) {
          this.pSize -= 6;
      }

  }






}
