#!/usr/bin/env node

// CLI Type Game - Main Entry Point
const InputHandler = require('../lib/inputHandler');

console.log('CLI Type Game v0.0.1');
console.log('Starting typing practice session...\n');
console.log('Type something (Ctrl+C to exit):\n');

const inputHandler = new InputHandler();

// Listen for character input
inputHandler.on('onChar', (char, fullInput) => {
  process.stdout.write(char); // Echo the character to screen
});

// Listen for backspace
inputHandler.on('onBackspace', (fullInput) => {
  process.stdout.write('\b \b'); // Backspace, space, backspace (erase character)
});

// Listen for enter
inputHandler.on('onEnter', (fullInput) => {
  console.log('\n\nYou typed: ' + fullInput);
  process.exit(0);
});

// Listen for exit
inputHandler.on('onExit', () => {
  console.log('\n\nGoodbye!');
});

inputHandler.startListening();
