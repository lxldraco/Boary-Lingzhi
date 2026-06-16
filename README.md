# Boary and Lingzhi

**Boary and Lingzhi** is a browser-based 2D platformer game built with **JavaScript**, **p5.js**, **HTML/CSS**, and **JSON-based level configuration**. It was developed independently in December 2023 as a course project for *Introduction to Programming* at Goldsmiths, University of London.

The project combines front-end programming, interaction design, game design, and original UI/visual art. All visual assets and interface elements were designed by me in **Figma** with a Chinese-inspired visual style.

## Live Demo

Play the game here: <https://lxldraco.github.io/Boary-Lingzhi/>

## Project Overview

The player controls **Boary**, a small character travelling through a stylised mountain landscape to collect **Lingzhi** and **peaches**, avoid traps, and reach the flagpole at the end of the level.

The game includes one complete playable level. Beyond the required course features, I implemented collectible-based progression, animated scenery, score tracking, a custom UI layer, and a data-driven level design system.

## Key Features

- **Playable 2D platformer prototype** with one complete level
- **Keyboard-based player control** for walking, jumping, and directional jumping
- **Collision detection** for collectibles and traps
- **Obstacle and trap system** with game-over handling
- **Collectible system** for Lingzhi and peaches
- **Progression mechanic** where collecting peaches increases jumping ability
- **Win condition** with animated flag-raising sequence
- **Game state management** for welcome, gameplay, game-over, win, and restart flows
- **Animated background elements**, including moving clouds and parallax-style mountain layers
- **Original Chinese-inspired UI and visual assets** created in Figma
- **GitHub Pages deployment** for browser-based access

## Technical Highlights

### Data-driven level design

The game separates level content from gameplay logic. Level elements such as trees, clouds, mountains, rocks, traps, collectibles, the flagpole, and player boundaries are stored in `data/levels/level_1.json` and loaded at runtime.

This makes the level easier to edit and extend without hard-coding every object directly into the main game loop.

### Modular JavaScript structure

The project is organised into separate JavaScript modules:

```text
js/
├── background.js     # Scenery, clouds, mountains, grass, sky, ground
├── collectable.js    # Lingzhi and peach collectibles
├── flagPole.js       # End-of-level flagpole and flag animation
├── main.js           # Game loop, state transitions, loading, camera, collisions
├── obstacle.js       # Rocks and traps
├── player.js         # Player movement, jumping, falling, boundaries
└── ui.js             # Popups, mask, score window, digit display
```

### Interaction and feedback design

The project includes a complete user flow: start screen, gameplay, score display, game-over feedback, win feedback, and restart. The visual style was designed to support a playful Chinese fantasy atmosphere while keeping the interface readable and responsive.

## Controls

| Action | Key / Input |
|---|---|
| Move left | `A` |
| Move right | `D` |
| Jump | `W` |
| Directional jump | `W` + `A` / `D` |
| Start / Restart | Mouse click on popup button |

## Technologies Used

- JavaScript
- p5.js
- HTML / CSS
- JSON
- Figma
- Git / GitHub
- GitHub Pages

## What I Learned

This project helped me connect my previous experience as a UI designer with front-end programming practice. I learned how to structure a small interactive application, separate content data from game logic, manage game states, implement collision detection, and design visual feedback for user interaction.

It also gave me experience working through typical programming problems in a complete project: asset loading, camera movement, jump mechanics, object boundaries, restart logic, and maintaining readable code across multiple files.

## Future Improvements

Potential improvements include:

- Adding multiple levels using the existing JSON-based level structure
- Refining movement physics with velocity and acceleration
- Improving jump control and edge-case collision handling
- Adding sound effects and background music
- Adding a loading screen and asset optimisation
- Improving responsiveness for different screen sizes
- Refactoring the codebase into a more scalable architecture

## Project Context

This was an independent programming project completed as part of an introductory programming course. The original course requirements included using p5.js, building a game project, implementing obstacles, and creating a final flag-raising animation. I extended the project with additional mechanics, original art direction, animated scenery, collectible-based progression, and a more flexible level configuration system.
