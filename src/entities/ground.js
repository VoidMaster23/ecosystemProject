class Ground {
  constructor({ width, height, sceneWidth, sceneHeight }) {
    // this.x = 0;
    // this.y = 0;
    this.width = width;
    this.height = height;
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
  }

  show() {
    const initialPositions = {
      x: 0,
      y: this.height,
    };
    let xoff = 0.0;
    let yoff = 0.0;
    noFill();
    beginShape();
    for (let wx = 0; wx < this.width; wx++) {
      for (let j = 0; j < this.height; j++) {
        let height;
         let baseX = wx;

        if (wx / this.width < 0.65) {
          height = map(
            noise(xoff),
            0,
            1,
            initialPositions.y,
            initialPositions.y + 10
          );
        } else {
          const mappedXCoord = map(wx, 0.65 * this.width, this.width, 0, 6);
        
          if (wx % 4 === 0) {
            const baseHeight = map(
              log(2 * mappedXCoord + 1),
              0,
              2,
              initialPositions.y,
              this.sceneHeight
            );
            
            // dx is the shift in for the exponential curve, so if x is at 10 for example dx ads some shift to give the idea of bumpiness
            // shifting y was not the solition here 
            const dx = map(noise(xoff), 0, 1, -10, 10);

            baseX = map(noise(xoff), 0, 1, baseX + dx, baseX + dx);
            height = map(noise(yoff), 0, 1, baseHeight, baseHeight + 2);
          }
        }

        stroke(60);
        vertex(baseX, height);
        yoff += 0.01;

      }
      xoff += 0.1;
    }
    endShape();
  }
}
