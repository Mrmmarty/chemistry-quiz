#!/bin/bash

# This script sets up the Python environment for the PDF conversion tools

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "Error: pip is not installed. Please install Python and pip first."
    exit 1
fi

# Install requirements
echo "Installing Python dependencies..."
pip install -r "$(dirname "$0")/requirements.txt"

echo "Setup complete!"
echo "To convert PDF files:"
echo "1. Place PDF files in the input_pdf directory"
echo "2. Run: python pdf_to_images.py"
echo "3. Check output_images directory for results" 