#!/bin/bash
# Quick Start Guide for Invoice Processing HITL System

echo "🚀 Invoice Processing HITL System - Quick Start"
echo "=================================================="
echo ""

# Check Node.js installation
echo "1️⃣  Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version) found"
else
    echo "❌ Node.js not found. Please install Node.js 16 or higher."
    exit 1
fi

# Check npm installation
echo ""
echo "2️⃣  Checking npm installation..."
if command -v npm &> /dev/null; then
    echo "✅ npm $(npm --version) found"
else
    echo "❌ npm not found. Please install npm."
    exit 1
fi

# Install dependencies
echo ""
echo "3️⃣  Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Start development server
echo ""
echo "4️⃣  Starting development server..."
echo ""
echo "🌐 Development server will open at http://localhost:3000"
echo "📝 Press Ctrl+C to stop the server"
echo ""
npm run dev
