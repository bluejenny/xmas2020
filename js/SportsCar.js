class SportsCar extends Car {
  constructor(x, y) {
    super(x, y);
    this.vx = 15;
  }

  display() {
    super.display();

    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 0)
    rect(this.x, this.y - this.height/10, this.width, this.height/20);
    rect(this.x, this.y + this.height/10, this.width, this.height/20);
    pop();
  }
}
