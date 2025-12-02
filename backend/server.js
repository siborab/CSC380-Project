const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Caesar Cipher encryption function
 * @param {string} text - Text to encrypt
 * @param {number} shift - Number of positions to shift (key)
 * @returns {string} - Encrypted text
 */
function caesarEncrypt(text, shift) {
    if (!text) return '';
    
    // Normalize shift to be within 0-25 range
    shift = ((shift % 26) + 26) % 26;
    
    return text.split('').map(char => {
        // Check if character is uppercase letter
        if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        // Check if character is lowercase letter
        else if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        // Return non-alphabetic characters unchanged
        return char;
    }).join('');
}

/**
 * Caesar Cipher decryption function
 * @param {string} text - Text to decrypt
 * @param {number} shift - Number of positions to shift back (key)
 * @returns {string} - Decrypted text
 */
function caesarDecrypt(text, shift) {
    // Decryption is encryption with negative shift
    return caesarEncrypt(text, -shift);
}

/**
 * Brute force attack to find all possible decryptions
 * @param {string} text - Encrypted text
 * @returns {Array} - Array of all possible decryptions with their shifts
 */
function bruteForce(text) {
    const results = [];
    for (let shift = 0; shift < 26; shift++) {
        results.push({
            shift: shift,
            decrypted: caesarDecrypt(text, shift)
        });
    }
    return results;
}

/**
 * Frequency analysis helper (for advanced decryption)
 * @param {string} text - Text to analyze
 * @returns {Object} - Frequency analysis results
 */
function frequencyAnalysis(text) {
    const frequencies = {};
    let totalLetters = 0;
    
    text.split('').forEach(char => {
        const upperChar = char.toUpperCase();
        if (upperChar >= 'A' && upperChar <= 'Z') {
            frequencies[upperChar] = (frequencies[upperChar] || 0) + 1;
            totalLetters++;
        }
    });
    
    // Convert counts to percentages
    const percentages = {};
    Object.keys(frequencies).forEach(char => {
        percentages[char] = ((frequencies[char] / totalLetters) * 100).toFixed(2);
    });
    
    return {
        frequencies,
        percentages,
        totalLetters
    };
}

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Caesar Cipher API is running' });
});

// Encrypt endpoint
app.post('/api/encrypt', (req, res) => {
    try {
        const { text, shift } = req.body;
        
        if (text === undefined || text === null) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        if (shift === undefined || shift === null) {
            return res.status(400).json({ error: 'Shift value is required' });
        }
        
        const shiftNum = parseInt(shift);
        if (isNaN(shiftNum)) {
            return res.status(400).json({ error: 'Shift must be a valid number' });
        }
        
        const encrypted = caesarEncrypt(text, shiftNum);
        
        res.json({
            success: true,
            originalText: text,
            shift: shiftNum,
            encryptedText: encrypted
        });
    } catch (error) {
        res.status(500).json({ error: 'Encryption failed', details: error.message });
    }
});

// Decrypt endpoint
app.post('/api/decrypt', (req, res) => {
    try {
        const { text, shift } = req.body;
        
        if (text === undefined || text === null) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        if (shift === undefined || shift === null) {
            return res.status(400).json({ error: 'Shift value is required' });
        }
        
        const shiftNum = parseInt(shift);
        if (isNaN(shiftNum)) {
            return res.status(400).json({ error: 'Shift must be a valid number' });
        }
        
        const decrypted = caesarDecrypt(text, shiftNum);
        
        res.json({
            success: true,
            encryptedText: text,
            shift: shiftNum,
            decryptedText: decrypted
        });
    } catch (error) {
        res.status(500).json({ error: 'Decryption failed', details: error.message });
    }
});

// Brute force attack endpoint
app.post('/api/bruteforce', (req, res) => {
    try {
        const { text } = req.body;
        
        if (text === undefined || text === null) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        const results = bruteForce(text);
        
        res.json({
            success: true,
            encryptedText: text,
            possibleDecryptions: results
        });
    } catch (error) {
        res.status(500).json({ error: 'Brute force attack failed', details: error.message });
    }
});

// Frequency analysis endpoint
app.post('/api/analyze', (req, res) => {
    try {
        const { text } = req.body;
        
        if (text === undefined || text === null) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        const analysis = frequencyAnalysis(text);
        
        res.json({
            success: true,
            text: text,
            analysis: analysis
        });
    } catch (error) {
        res.status(500).json({ error: 'Frequency analysis failed', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🔐 Caesar Cipher API Server running on port ${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`\nAvailable endpoints:`);
    console.log(`  GET  /api/health - Health check`);
    console.log(`  POST /api/encrypt - Encrypt text with Caesar cipher`);
    console.log(`  POST /api/decrypt - Decrypt text with Caesar cipher`);
    console.log(`  POST /api/bruteforce - Brute force all possible decryptions`);
    console.log(`  POST /api/analyze - Frequency analysis of text`);
});

module.exports = app;