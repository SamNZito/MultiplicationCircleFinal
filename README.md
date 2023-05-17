# MultiplicationCircleFinal
The purpose of the program is to provide an interactive and visually captivating experience by generating an animation on a canvas. The animation is based on a modular multiplication circle, where users can control various factors to customize the visual output.

## Table of Contents

- [The Breakdown](#The-Breakdown)
- [Section 2](#section-2)
- [Section 3](#section-3)
  - [Subsection 3.1](#subsection-3.1)
  - [Subsection 3.2](#subsection-3.2)
- [Section 4](#section-4)

## The Breakdown
Here's a breakdown of the program's functionality:

* The program sets up the canvas, initializes variables, and draws the initial frame.
* The **getVector()** function calculates the coordinates of a vector based on its index and the total number of elements.
* Event listeners are added to mode selection buttons (**lengthHueBtn**, **colorHueBtn**, **indexHueBtn**, **white**) to allow users to choose different color rendering modes.
* The **draw()** function is responsible for clearing the canvas, updating animation parameters, updating display values, and rendering the elements based on the selected mode.
* The **toggleAnimation()** function toggles the animation flag and starts or stops the animation accordingly.
* The **startAnimation()** function initiates the animation by requesting the first frame.
* The **stopAnimation()** function stops the animation by canceling the animation frame request.
* The **processNumbers()** function retrieves user input values for total, factor, and speed, processes them, updates the display, and redraws the canvas with the new values. It also handles cases where user input is not a valid number.
* An event listener is added to handle window resize and trigger the **setup()** function to adjust the canvas dimensions.
* The **mapRange()** function maps a value from one range to another range.
* The **setup()** function is called to perform the initial setup of the canvas and other variables.

## Overview
Comments are provided throughout the code to explain the purpose and functionality of different sections.
Overall, the program offers an interactive interface for controlling a modular multiplication circle by adjusting various factors. Users can manipulate the total number of points in the circle and the factor by which each point rotates, observing the resulting visual patterns in real-time on the canvas. Additionally, the program provides different color modes, including index hue, length hue, color hue, and plain white, allowing users to explore and experiment with different color variations. With these controls, users can gain insights into the fascinating world of modular multiplication and its captivating visual representations.

## More About Multiplication Circles
A modular multiplication circle, also known as a multiplication modulo circle, is a mathematical concept that involves performing multiplication operations within a finite set of numbers. It is commonly visualized as a circle, where each point on the circle represents a number.

In the context of the program, the modular multiplication circle is formed by a series of lines connecting points on the circle. The position and length of these lines are determined by applying modular multiplication to the input parameters. The factor parameter controls the speed and direction of the animation by determining how the lines move around the circle.

Modular multiplication involves taking the remainder of a multiplication operation when divided by a given number, often referred to as the modulus. This operation ensures that the result remains within a defined range. In the case of the circle visualization, the modulus is typically the total number of points on the circle.

By manipulating the factor and other parameters, users can explore different patterns and visual effects created by the modular multiplication circle. It provides an intuitive way to observe the relationships and interactions between numbers in a visually engaging manner.
