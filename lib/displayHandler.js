// lib/displayHandler.js
// Handles displaying words on screen

const fs = require('fs');
const path = require('path');

class DisplayHandler {
  constructor() {
    this.wordBank = [];
    this.words = []; // The 10 words for this session
    this.loadWordBank();
  }

  // Load words from config/words.txt
  loadWordBank() {
    try {
      const filePath = path.join(__dirname, '..', 'config', 'words.txt');
      const content = fs.readFileSync(filePath, 'utf8');
      // Split by newline and trim each word to remove \r and spaces
      this.wordBank = content.split('\n').map(word => word.trim()).filter(word => word !== '');
      
      if (this.wordBank.length === 0) {
        throw new Error('Word bank is empty. Please add words to config/words.txt');
      }
    } catch (error) {
      console.error('Error loading word bank:', error.message);
      process.exit(1);
    }
  }

  // Get a random word from the bank
  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.wordBank.length);
    return this.wordBank[randomIndex];
  }

  // Generate 10 random words for the session
  generateSessionWords() {
    this.words = [];
    for (let i = 0; i < 10; i++) {
      this.words.push(this.getRandomWord());
    }
  }

  // Display the 10 words on screen
  displayWords() {
    console.clear();
    console.log('╔════════════════════════════════════════╗');
    console.log('║     CLI Type Game - Type These Words  ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    console.log('Type all these words, pressing space between each:\n');
    console.log(this.words.join(' '));
    console.log('\n' + '─'.repeat(45));
    console.log('Your input: ');
  }

  // Get the session words
  getWords() {
    return this.words;
  }
}

module.exports = DisplayHandler;
