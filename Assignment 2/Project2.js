function imageMap(img, func) {
  for(let i = 0; i < img.width; ++i) {
    for(let j = 0; j < img.height; ++j) {
      let a = func(img, i, j);
      //console.log(a);
      img.setPixel(i, j, a);
    }
  }
  return img;
}

function imageMask(img, func, maskValue) {
  function changeItUp(img, x, y) {
    let bol = func(img, x, y);
    if(bol === true) {
      return maskValue;
    }
    else {
      return img.getPixel(x, y);
    }
  }
  return imageMap(img, changeItUp);
}

function blurPixel(img, x, y) {
  let count = 1;
  let a = img.getPixel(x, y);
  let red = a[0];
  let green = a[1];
  let blue = a[2];
  let wid = img.width;
  for(let pR = 1; pR <= 5; pR = pR + 1) {
    if(x+pR < wid) {
      let right = img.getPixel(x + pR, y);
      red = red + right[0];
      green = green + right[1];
      blue = blue + right[2];
      count = count + 1;
    }
  }
  for(let pL = 1; pL <= 5; pL = pL + 1) {
    if(x-pL > wid) {
      let left = img.getPixel(x - pL, y);
      red = red + left[0];
      green = green + left[1];
      blue = blue + left[2];
      count = count + 1;
    }
  }
  
  a[0] = red / count;
  a[1] = green / count;
  a[2] = blue / count;
  return a;
}

function blurImage(img) {
  return imageMap(img, blurPixel);
}

function isDark(img, x, y) {
  let a = img.getPixel(x,y);
  if(a[0] >= .5 || a[1] >= .5 || a[2] >= .5) {
    return false;
  }
  return true;
}

function darken(img) {
  return imageMask(img, isDark, [0, 0, 0]);
}

function isLight(img, x, y) {
  let a = img.getPixel(x,y);
  if(a[0] >= .5 && a[1] >= .5 && a[2] >= .5) {
    return true;
  }
  return false;
}

function lighten(img) {
  return imageMask(img, isLight, [1, 1, 1]);
}

function lightenAndDarken(img) {
  let newImg = lighten(img);
  return darken(newImg);
}



//tests

test('imageMap GIVEN TEST RUNS', function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  imageMap(robot, function(img, x, y) {
    const c = img.getPixel(x, y);
    return [c[0], 0, 0];
  }).show();
});

test("imageMask GIVEN TEST RUNS", function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  imageMask(robot, function(img, x, y) {
  return (y % 10 === 0);}, [1, 0, 0]).show();
});

test("blurPixel Test NOT EQUAL", function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  robot.getPixel(0,0);
  assert(robot.getPixel(0,0) !== blurPixel(robot, 0, 0));
  console.log(blurPixel(robot, 0, 0));
  console.log(robot.getPixel(0,0));
});

test("blurImage Test", function() {
  let url = 'http://www.bestprintingonline.com/help_resources/Image/Ducky_Head_Web_XtraLow-Q.jpg';
  let robot = lib220.loadImageFromURL(url);
  robot.show();
  blurImage(robot).show();
});

test("isDark Test", function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  console.log(robot.getPixel(0,0));
  assert(isDark(robot, 0, 0) === true);
});

test("darken Test", function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  darken(robot).show();
});

test("lighten Test", function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  lighten(robot).show();
});

test("l+d Test", function() {
  let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
  let robot = lib220.loadImageFromURL(url);
  lightenAndDarken(robot).show();
});

