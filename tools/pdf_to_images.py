import os
import shutil
from pdf2image import convert_from_path
from PIL import Image

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Create output directory if it doesn't exist
output_dir = os.path.join(script_dir, 'output_images')
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Path to the PDF files
pdf_dir = os.path.join(script_dir, 'input_pdf')

# Get all PDF files
pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]

# Convert each PDF to images
for pdf_file in pdf_files:
    # Create a subdirectory for each PDF file
    pdf_name = os.path.splitext(pdf_file)[0]
    pdf_output_dir = os.path.join(output_dir, pdf_name)
    if not os.path.exists(pdf_output_dir):
        os.makedirs(pdf_output_dir)
    
    pdf_path = os.path.join(pdf_dir, pdf_file)
    print(f"Converting {pdf_file}...")
    
    try:
        # Convert PDF to images
        images = convert_from_path(pdf_path, dpi=200)
        
        # Save each page as an image
        for i, image in enumerate(images):
            image_path = os.path.join(pdf_output_dir, f'page_{i+1}.png')
            image.save(image_path, 'PNG')
            print(f"  Saved page {i+1}/{len(images)}")
        
        print(f"Converted {pdf_file} - {len(images)} pages")
    except Exception as e:
        print(f"Error converting {pdf_file}: {e}")

print("\nConversion complete!")
print(f"Images saved to {os.path.abspath(output_dir)}") 