// This is a script you can run once to create placeholder icons
// Run in browser console or save as HTML file

const createPlaceholderIcon = (size) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, size, size);
  
  // White circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/3, 0, Math.PI * 2);
  ctx.fill();
  
  // Tree icon
  ctx.fillStyle = '#059669';
  const treeSize = size/4;
  // Tree base
  ctx.beginPath();
  ctx.moveTo(size/2, size/2 - treeSize);
  ctx.lineTo(size/2 - treeSize, size/2 + treeSize);
  ctx.lineTo(size/2 + treeSize, size/2 + treeSize);
  ctx.closePath();
  ctx.fill();
  
  // Tree trunk
  ctx.fillStyle = '#92400e';
  ctx.fillRect(size/2 - treeSize/4, size/2 + treeSize, treeSize/2, treeSize/2);
  
  return canvas.toDataURL('image/png');
};

// For now, just use a simple approach - create minimal icons manually
// Or use favicon.io to generate icons