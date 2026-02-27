// Simple Express Server for NexPoint Agency
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Helper function to read JSON
function readJsonFile(filename) {
  const filePath = path.join(__dirname, filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
}

// Helper function to write JSON
function writeJsonFile(filename, data) {
  const filePath = path.join(__dirname, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// API: Get contacts
app.get('/api/contacts', (req, res) => {
  const contacts = readJsonFile('contacts.json');
  res.json(contacts);
});

// API: Save contacts (add, update, delete)
app.post('/api/contacts', (req, res) => {
  const { contacts } = req.body;
  if (!Array.isArray(contacts)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  
  const success = writeJsonFile('contacts.json', contacts);
  if (success) {
    res.json({ success: true, message: 'Contacts saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save contacts' });
  }
});

// API: Get properties
app.get('/api/properties', (req, res) => {
  const properties = readJsonFile('properties.json');
  res.json(properties);
});

// API: Save properties
app.post('/api/properties', (req, res) => {
  const { properties } = req.body;
  if (!Array.isArray(properties)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const success = writeJsonFile('properties.json', properties);
  if (success) {
    res.json({ success: true, message: 'Properties saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save properties' });
  }
});

// API: Save properties
app.post('/api/properties', (req, res) => {
  const { properties } = req.body;
  if (!Array.isArray(properties)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  
  const success = writeJsonFile('properties.json', properties);
  if (success) {
    res.json({ success: true, message: 'Properties saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save properties' });
  }
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NexPoint Agency server running at http://localhost:${PORT}`);
});
