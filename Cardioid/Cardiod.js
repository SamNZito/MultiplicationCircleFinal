/*
The purpose of the program is to create an interactive animation of the Modular Multiplication Circle 
on a canvas that renders a series of lines based on user input. 
The animation can be controlled by adjusting parameters such as the total number of lines, 
the factor that determines the animation speed, and the color rendering mode.

Overall, the program allows users to interactively control the multiplcation Circle parameters 
and observe the visual effects in real-time on the canvas. 
The rendering of lines is based on different color modes, such as index hue, 
length hue, color hue, or plain white, providing a visually engaging experience.
*/


// Variables to store the animation parameters
let r; // Radius of the Multiplication Circle
let factor = 0; // Starting Factor to control the animation speed
let factorSpeed = 0.005; // Speed at which the factor increases
let total = 200; // Starting Total number of elements to draw
let hueOffset = 0; // Offset for hue calculation
let currentMode = 'white'; // Current mode for color rendering the animation: white, colorHue, lengthHue, and indexHue
let isAnimating = false; // Flag to indicate if the animation is running
let animationRequestId = null; // ID of the animation frame

//Setup the canvas and its dimensions
function setup() {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);

  // Initialize other variables and draw the initial frame
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  r = Math.min(canvas.width, canvas.height) / 2 - 16;

  draw();
}

// Calculate the vector coordinates based on the index and total elements
function getVector(index, total) {  
  const angle = mapRange(index % total, 0, total, 0, Math.PI * 2);
  const x = Math.cos(angle + Math.PI) * r;
  const y = Math.sin(angle + Math.PI) * r;
  return { x, y };
}

// Add event listeners to handle mode selection buttons
// Allows for selection of the different color modes as listed above
lengthHueBtn.addEventListener('click', () => {
  currentMode = 'lengthHue';
});
colorHueBtn.addEventListener('click', () => {
  currentMode = 'colorHue';
});
indexHueBtn.addEventListener('click', () => {
  currentMode = 'indexHue';
});
white.addEventListener('click', () => {
  currentMode = 'white';
});

// Draws the circle
function draw() {

  // Clear the canvas and set the background color
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // If animation is running, request the next frame
  if (isAnimating) {
    animationRequestId = requestAnimationFrame(draw);
 
    factor += factorSpeed; //.015
    hueOffset += .5;

    // Update and display the values of total, factor, and speed
    const totalDisplay = document.getElementById('totalDisplay');
    const factorDisplay = document.getElementById('factorDisplay');
    const speedDisplay = document.getElementById('speedDisplay');

    // Update the HTML elements with the current values
    totalDisplay.textContent = `Total: ${total.toFixed(3)}`;
    factorDisplay.textContent = `Factor: ${factor.toFixed(3)}`;
    speedDisplay.textContent = `Speed: ${factorSpeed.toFixed(3)}`;

    // Render the elements based on the current mode and animation parameters
    context.save();
    context.translate(canvas.width/2, canvas.height/2);
    context.lineWidth = 2;
    context.fillStyle = 'transparent';
    context.beginPath();
    context.arc(canvas.width, canvas.height, r, 0, Math.PI * 2);
    context.stroke();

    context.lineWidth = 2;
    for (let i = 0; i < total; i++) {
      const a = getVector(i, total);
      const b = getVector(i * factor, total);

      if(currentMode == 'indexHue'){
        //index hue
        const hue = mapRange(i, 0, total, 0, 360);
        context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      }
      else if(currentMode == 'lengthHue'){
        //Length Hue
        const lineLength = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        const hue = mapRange(lineLength, 0, Math.sqrt(2) * r, 0, 360);
        context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      }
      else if(currentMode == 'colorHue'){
        //Color hue
        const hue = (hueOffset) % 360; // add i * 2 + to make rainbow
        context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      }
      else if(currentMode == 'white'){
        //Color white
        context.strokeStyle = 'rgb(255, 255, 255)';
        }

      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
    context.restore();

}
}

// Add event listener to toggle animation button
const animateBtn = document.getElementById('animateBtn');
animateBtn.addEventListener('click', toggleAnimation)

// Toggle the animation flag and start or stop the animation accordingly
function toggleAnimation() {
  isAnimating = !isAnimating;
  if (isAnimating) {
    startAnimation();
  } else {
    stopAnimation();
  }
}

// Start the animation by requesting the first frame
function startAnimation() {
  if (!animationRequestId) {
    animationRequestId = requestAnimationFrame(draw);
  }
}

// Stop the animation by canceling the animation frame request
function stopAnimation() {
  if (animationRequestId) {
    cancelAnimationFrame(animationRequestId);
    animationRequestId = null;
  }
}

 // Retrieve and process user input values for total, factor, and speed
function processNumbers() {
  const input1 = document.getElementById('input1');
  const input2 = document.getElementById('input2');
  factorSpeed = document.getElementById('factorSpeed');
  
  // Update the display and redraw the canvas with new values
  factorSpeed = parseFloat(speedBtn.value);
  total = parseFloat(input1.value);
  factor = parseFloat(input2.value);
  draw();

  // Handle cases when user input is not a valid number
  if(isNaN(total)){
    total = 200;
  }
  if(isNaN(factor)){
    factor = 0;
  }
  if(isNaN(factorSpeed)){
    factorSpeed = .005
  }
}

// Map a value from one range to another range
function mapRange(value, minInput, maxInput, minOutput, maxOutput) {
  return ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) + minOutput;
}

// Add event listener to handle window resize
window.addEventListener('resize', setup);

// Call the setup function and perform initial setup
setup();
