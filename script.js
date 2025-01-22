const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorCode = document.getElementById('color-code');
const colorDisplay = document.getElementById('color-display');
const label = document.querySelector('label');
  

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
      
      img.src = e.target.result;
    };

    img.onload = function(){
      canvas.style.display = "block";
      canvas.width = img.width > 400 ? 400 : img.width;
      canvas.height = (img.height / img.width) * canvas.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      uploadInput.style.display = "none";
      label.style.display = "none";
    };

    reader.readAsDataURL(file);
  }
});

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pixelData = ctx.getImageData(x, y, 1, 1).data;
  const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
  const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

  colorCode.textContent = hexColor;
  colorDisplay.style.backgroundColor = hexColor;
});

function rgbToHex(r, g, b) {
      return (
        '#' +
        [r, g, b]
          .map((x) => x.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()
      );
    }