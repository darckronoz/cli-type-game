#!/usr/bin/env node

// CLI Type Game - Main Entry Point
const InputHandler = require('../lib/inputHandler');
const DisplayHandler = require('../lib/displayHandler');

const inputHandler = new InputHandler();
const displayHandler = new DisplayHandler();

// Generate 10 random words
displayHandler.generateSessionWords();
displayHandler.displayWords();

// Listen for character input - display it on screen
inputHandler.on('onChar', (char, fullInput) => {
  process.stdout.write(char);
});

// Listen for backspace - erase character
inputHandler.on('onBackspace', (fullInput) => {
  process.stdout.write('\b \b');
});

// Listen for enter - end session
inputHandler.on('onEnter', (fullInput) => {
  console.log('\n\n════════════════════════════════════════');
  console.log('Session ended!');
  console.log('You typed: ' + fullInput);
  console.log('════════════════════════════════════════');
  process.exit(0);
});

// Listen for exit (Ctrl+C)
inputHandler.on('onExit', () => {
  console.log('\n\nGoodbye!');
});

inputHandler.startListening();
