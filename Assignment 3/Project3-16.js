function generateInput(number) {
  let base = [];
  let toUse = [];
  let output = [];
  for(let i=0; i<number; ++i) {
   base.push(i);
  }
  for(let j=0; j<number; ++j) {
    toUse = base.slice(0, number);
    let thisList = [];
    for(let k=0; k<number; ++k) {
      // console.log(toUse);
      let current = Math.floor(Math.random() * number-k);
      // console.log(current);
      if(current < 0) {
        current = 0;
      }
      thisList.push(toUse[current]);
      // console.log("here");
      toUse.splice(current, 1);
      // console.log(thisList);
    }
    output.push(thisList);
  }
  return output;
}

function oracle(f) {
  let numTests = 500;  // og20 Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 3;  // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = f(companies, candidates);
    test('Hires length is correct', function() {
     assert(companies.length === hires.length);
});
    test("company didnt miss out on first pick", function() {
      let b = Math.floor(Math.random() *hires.length-1);
      // let c = Math.floor(Math.random() *hires.length-1);
      // let match = hires[b];
      let match = hires[0];
      let compRankOfCan = companies[match.company].indexOf(match.candidate);
      let canRankOfComp = candidates[match.candidate].indexOf(match.company);
      let compWantsHim = companies[match.company][0];
      let thatGuyOpinion = candidates[compWantsHim].indexOf(match.company);
      

      assert(canRankOfComp <= thatGuyOpinion);

});
    }
  }

test("huh", function() {
  let a = generateInput(4);
  //console.log(a);
});

// test("oracle", function() {
//   oracle(chaff1);
// });

test("better oracle", function() {
  oracle(wheat1);
});


