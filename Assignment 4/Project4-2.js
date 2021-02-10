class FluentRestaurants{
  // let data = null;
  constructor(jsonData) {
    this.data = jsonData;
  }

  fromState(stateStr) {
    let array = [];
    for(let i = 0; i < this.data.length; ++i) {
      if(lib220.getProperty(this.data[i], 'state').value === stateStr) {
        array.push(this.data[i]);
      }
    }
    return new FluentRestaurants(array);
  }

  ratingLeq(rating) {
    let array = [];
    for(let i = 0; i < this.data.length; ++i) {
      if(lib220.getProperty(this.data[i], 'stars').value <= rating) {
        array.push(this.data[i]);
      }
    }
    return new FluentRestaurants(array);
  }

  ratingGeq(rating) {
    let array = [];
    for(let i = 0; i < this.data.length; ++i) {
      if(lib220.getProperty(this.data[i], 'stars').value >= rating) {
        array.push(this.data[i]);
      }
    }
    return new FluentRestaurants(array);
  }

  category(categoryStr) {
    let array = [];
    // console.log(lib220.getProperty(this.data[0], 'categories'));

    for(let i = 0; i < this.data.length; ++i) {
      let temp = lib220.getProperty(this.data[i], 'categories').value;
      for(let j = 0; j < temp.length; ++j) {
        if(temp[j] === categoryStr) {
          array.push(this.data[i]);
          break;
        }
      }
    }
    return new FluentRestaurants(array);
  }

  hasAmbience(ambienceStr) {
    let array = [];
    for(let i = 0; i < this.data.length; ++i) {
      let temp = lib220.getProperty(this.data[i], 'attributes').value;
      if(lib220.getProperty(temp, 'Ambience').found) {
        let temp2 = lib220.getProperty(temp, 'Ambience').value;
        if(lib220.getProperty(temp2, ambienceStr).found) {
          array.push(this.data[i]);
        }
      }
    }
    return new FluentRestaurants(array);
  }

  bestPlace() {
    let x = 5;
    let array = [];
    while(x > -1) {
      array = this.ratingGeq(x).data;
      if(array.length <= 0) {
        x = x -1;
      }
      else {
        break;
      }
    }
  if(array.length > 1) {
    let revs = 0;
    let curBest = null;
    for(let i = 0; i < array.length; ++i) {
      if(lib220.getProperty(array[i], 'review_count').value > revs) {
        curBest = array[i];
        revs = lib220.getProperty(array[i], 'review_count').value;
      }
    }
    return curBest;
  }
  else if(array.length <= 0) {
    return {};
  }
  return array[0];
}


}



test('run test', function() {
  let data = lib220.loadJSONFromURL('https://people.cs.umass.edu/~joydeepb/yelp.json');
  let f = new FluentRestaurants(data);
  console.log(f.fromState("NC"));
  console.log(f.ratingLeq(3));
  console.log(f.ratingGeq(3));
  console.log(f.category("Restaurants"));
  console.log(f.hasAmbience("trendy"));
  console.log(f.bestPlace());

});