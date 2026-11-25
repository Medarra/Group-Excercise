let originalImg, modifiedImg, overlayImg;
let filterName = "Original";
function preload() {
  originalImg = loadImage("photo.png");
  overlayImg = loadImage("overlay.png");
}
function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  modifiedImg = originalImg.get();
}
function draw() {
  background(235);
  fill(20); textSize(18);
  text("Original image", 20, 30);
  text("Modified: " + filterName, 420, 30);
  image(originalImg, 20, 50, 360, 450);
  image(modifiedImg, 420, 50, 360, 450);
  textSize(14);
  text("G: Gray | B: Blur | T: Threshold | P: Posterize", 20, 540);
  text("I: Invert | M: Blend | R: Reset | S: Save", 20, 565);
}
function keyPressed() {
  const k = key.toLowerCase();
  if (k === "s") {
    saveCanvas("mini-photo-editor", "png");
    return;
  }
  if (!"gbtpimr".includes(k) || k.length !== 1) return;
  modifiedImg = originalImg.get();
  filterName = "Original";
  if (k === "g")
  {
    modifiedImg.filter(GRAY);
    filterName = "Gray";
  }
  if (k === "b")
  {
    modifiedImg.filter(BLUR, 3);
    filterName = "Blur";
  }
  if (k === "t")
  {
    modifiedImg.filter(THRESHOLD, 0.5);
    filterName = "Threshold";
  }
  if (k == "p")
  {
    modifiedImg.filter(POSTERIZE, 3);
    filterName = "Posterize";
  }
  if (k == "r")
  {
    modifiedImg = originalImg.get();
    filterName = "Original";
  }

  // Hint: modifiedImg.filter(MODE, level); update filterName.
  if (k === "i") {
    customInvert();
    filterName = "Custom invert";
  }
  if (k === "m") {
    // TODO: Blend overlayImg into modifiedImg using blend().
    // Source and destination rectangles can use the full image sizes.
    blend(overlayImg, 0, 0, overlayImg.width, overlayImg.height, 0, 0, modifiedImg.width, modifiedImg.height, ADD);
    filterName = "Blend";
  }
}
function customInvert() {
  modifiedImg.loadPixels();
  for (let i = 0; i < modifiedImg.pixels.length; i += 4) {
    // TODO: Invert red, green and blue; preserve alpha.
    let r = modifiedImg.pixels[i];
    let g = modifiedImg.pixels[i + 1];
    let b = modifiedImg.pixels[i + 2];

    modifiedImg.pixels[i] = 255 - r;
    modifiedImg.pixels[i + 1] = 255 - g;
    modifiedImg.pixels[i + 2] = 255 - b;
  }
  modifiedImg.updatePixels();
}
