const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createFavicon() {
  const inputImage = path.join(__dirname, '../public/image/nima-pic.png');
  const outputPng = path.join(__dirname, '../public/nima-pic.png');
  const outputIco = path.join(__dirname, '../public/favicon.ico');

  try {
    // Read the image metadata to get dimensions
    const metadata = await sharp(inputImage).metadata();
    const { width, height } = metadata;

    // Calculate the crop size (use the smaller dimension to make it square)
    const size = Math.min(width, height);

    // Calculate the crop position (center the crop)
    const left = Math.floor((width - size) / 2);
    const top = Math.floor((height - size) / 2);

    // For a portrait, we want to focus on the face area
    // Since it's a portrait, we'll crop from center but slightly adjust for face positioning
    // Assuming face is in upper center, we'll crop from top slightly more
    const faceTop = Math.floor((height - size) / 2) - Math.floor(size * 0.1); // Adjust slightly up for face
    const adjustedTop = Math.max(0, Math.min(faceTop, height - size));

    // Create the cropped square image (512x512 PNG)
    const croppedImage = sharp(inputImage)
      .extract({
        left: left,
        top: adjustedTop,
        width: size,
        height: size,
      })
      .resize(512, 512, {
        fit: 'cover',
        position: 'center',
      });

    // Save PNG version
    await croppedImage
      .png()
      .toFile(outputPng);

    // Save ICO version (32x32 for favicon.ico)
    await croppedImage
      .resize(32, 32, {
        fit: 'cover',
        position: 'center',
      })
      .png()
      .toFile(outputIco);

    console.log('✅ Favicon created successfully!');
    console.log(`   PNG: ${outputPng}`);
    console.log(`   ICO: ${outputIco}`);
    console.log(`   Original size: ${width}x${height}`);
    console.log(`   Cropped to: ${size}x${size}`);
    console.log(`   Resized to: 512x512 (PNG) and 32x32 (ICO)`);
    console.log('');
    console.log('📝 Note: Google may take a few days to update the favicon in search results.');
    console.log('   Make sure to clear your browser cache or use incognito mode to see the new favicon.');

  } catch (error) {
    console.error('❌ Error creating favicon:', error);
    process.exit(1);
  }
}

createFavicon();

