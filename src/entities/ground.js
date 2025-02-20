class Ground {
  constructor({ width, height, sceneWidth, sceneHeight }) {
    this.width = width;
    this.height = height; 
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
  }

  show() {
    // Starting position for the ground
    const startY = this.height;
    
    // Noise offsets for Perlin noise
    let xNoiseOffset = 0.0;
    let yNoiseOffset = 0.0;

    noFill();
    beginShape();

    // Draw ground points across width
    for (let currentX = 0; currentX < this.width; currentX++) {
      for (let j = 0; j < this.height; j++) {
        let groundHeight;
        let drawX = currentX;

        // Split ground into flat and mountainous regions
        const isFlatRegion = currentX / this.width < 0.65;

        if (isFlatRegion) {
          // Generate slightly bumpy terrain
          groundHeight = map(
            noise(xNoiseOffset),
            0,
            1,
            startY,
            startY + 10
          );
        } else {
          // Generate mountainous terrain
          const mountainProgress = map(currentX, 0.65 * this.width, this.width, 0, 6);
        
          if (currentX % 4 === 0) {
            // Calculate base mountain height using logarithmic curve
            const mountainHeight = map(
              log(2 * mountainProgress + 1),
              0,
              2,
              startY,
              this.sceneHeight
            );
            
            // Add random horizontal variation to mountain shape
            const horizontalShift = map(noise(xNoiseOffset), 0, 1, -10, 10);
            drawX = map(noise(xNoiseOffset), 0, 1, drawX + horizontalShift, drawX + horizontalShift);
            
            // Add slight vertical variation to mountain peaks
            groundHeight = map(noise(yNoiseOffset), 0, 1, mountainHeight, mountainHeight + 2);
          }
        }

        stroke(60);
        vertex(drawX, groundHeight);
        yNoiseOffset += 0.01;
      }
      xNoiseOffset += 0.1;
    }
    endShape();
  }
}
