function removeBlueAndGreen(inputImage) {
  let imageCopy = inputImage.copy();
  for(let i = 0; i < inputImage.width; ++i) {
    for(let j = 0; j < inputImage.height; ++j) {
      let a = imageCopy.getPixel(i, j);
      a[1] = 0;
      a[2] = 0;
      imageCopy.setPixel(i, j, a);
    }
  }

  return imageCopy;
}

function makeGrayscale(inputImage) {
  let imageCopy = inputImage.copy();
  for(let i = 0; i < inputImage.width; ++i) {
    for(let j = 0; j < inputImage.height; ++j) {
      let a = imageCopy.getPixel(i, j);
      let m = (a[0] + a[1] + a[2]) / 3;
      a[0] = m;
      a[1] = m;
      a[2] = m;
      imageCopy.setPixel(i, j , a);
    }
  }

  return imageCopy;
}

function highlightEdges(inputImage) {
  let imageCopy = inputImage.copy();
  for(let i = 0; i < inputImage.width; ++i) {
    for(let j = 0; j < inputImage.height; ++j) {
      let a = imageCopy.getPixel(i, j);
      let m1 = (a[0] + a[1] + a[2]) / 3;
      if(i + 1 < inputImage.width) {
        let b = imageCopy.getPixel(i + 1, j);
        let m2 = (b[0] + b[1] + b[2]) / 3;
        a[0] = Math.abs(m1-m2);
        a[1] = Math.abs(m1-m2);
        a[2] = Math.abs(m1-m2);
        imageCopy.setPixel(i, j , a);
      }
      else {
        a[0] = 0;
        a[1] = 0;
        a[2] = 0;
        imageCopy.setPixel(i, j , a);
      }
    }
  }

  return imageCopy;
}

function blur(inputImage) {
  let imageCopy = inputImage.copy();
  let safeImage = inputImage.copy();
  for(let i = 0; i < safeImage.width; ++i) {
    for(let j = 0; j < safeImage.height; ++j) {
      let count = 1;
      let a = safeImage.getPixel(i, j);
      let red = a[0];
      let green = a[1];
      let blue = a[2];
      for(let pR = 1; pR <= 5; pR = pR + 1) {
        if(i+pR < safeImage.width) {
          let right = safeImage.getPixel(i + pR, j);
          red = red + right[0];
          green = green + right[1];
          blue = blue + right[2];
          count = count + 1;
        }
      }
      for(let pL = 1; pL <= 5; pL = pL + 1) {
        if(i-pL > safeImage.width) {
          let left = safeImage.getPixel(i - pL, j);
          red = red + left[0];
          green = green + left[1];
          blue = blue + left[2];
          count = count + 1;
        }
      }
      
      
      a[0] = red / count;
      a[1] = green / count;
      a[2] = blue / count;
      imageCopy.setPixel(i, j, a);
    }
  }

  return imageCopy;
}



