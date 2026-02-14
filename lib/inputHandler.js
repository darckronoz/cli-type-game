// lib/inputHandler.js
// Handles real-time keystroke input capture using Node.js readline

const readline = require('readline');

class InputHandler {
  constructor() {
    this.input = '';
    this.listeners = {
      onChar: null,
      onBackspace: null,
      onEnter: null,
      onExit: null
    };
  }

  // Set up stdin to capture keystrokes in real-time
  startListening() {
    // Enable raw mode: process each keystroke immediately without waiting for Enter
    process.stdin.setRawMode(true);
    
    // Prevent input from being echoed to the screen (we'll handle display)
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Listen for each key press
    process.stdin.on('data', (char) => {
      this.handleKey(char);
    });

    // Handle process termination gracefully
    process.on('SIGINT', () => {
      this.stopListening();
      if (this.listeners.onExit) {
        this.listeners.onExit();
      }
      process.exit(0);
    });
  }

  // Stop listening for input and restore normal terminal behavior
  stopListening() {
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }

  // Handle individual key presses
  handleKey(char) {
    const charCode = char.charCodeAt(0);

    // Ctrl+C: Exit
    if (charCode === 3) {
      this.stopListening();
      if (this.listeners.onExit) {
        this.listeners.onExit();
      }
      process.exit(0);
    }

    // Backspace (both ASCII 8 and 127)
    if (charCode === 8 || charCode === 127) {
      if (this.input.length > 0) {
        this.input = this.input.slice(0, -1);
        if (this.listeners.onBackspace) {
          this.listeners.onBackspace(this.input);
        }
      }
      return;
    }

    // Enter
    if (charCode === 13) {
      if (this.listeners.onEnter) {
        this.listeners.onEnter(this.input);
      }
      return;
    }

    // Regular character (printable ASCII)
    if (charCode >= 32 && charCode <= 126) {
      this.input += char;
      if (this.listeners.onChar) {
        this.listeners.onChar(char, this.input);
      }
    }
  }

  // Register event listeners
  on(event, callback) {
    if (this.listeners.hasOwnProperty(event)) {
      this.listeners[event] = callback;
    }
  }

  // Get current input
  getInput() {
    return this.input;
  }

  // Clear input
  clearInput() {
    this.input = '';
  }
}

module.exports = InputHandler;
