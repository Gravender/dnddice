# DnD Dice

A react project that simulates dice rolls for a tabletop roleplaying game, such as Dungeons and Dragons, and displays the results on a graph.

## Components

### DiceRoller

A form that allows the user to input values for the name of the dice roll, the difficulty class (DC) to hit, and the attack and damage values for a player. The form also has a button to simulate a dice roll using these values and update the graph with the results.

### DiceViewer

A container that holds the DiceRoller form and the Plotly graph. It stores the data for the graph and the dice roll parameters for each roll that has been simulated. The DiceViewer component updates the graph with the results of the dice roll simulation.

## How to Use

1. Enter values for the name of the dice roll, the DC to hit, and the attack and damage values for a player in the DiceRoller form.
2. Click the "Simulate" button to generate a dice roll using the input values and update the graph with the results.
3. Repeat step 1 and 2 to simulate additional dice rolls and compare the results on the same graph.
