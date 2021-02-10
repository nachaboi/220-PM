// Given a state object and an AST of an expression as arguments,
// interpExpression returns the result of the expression (number or boolean)
// interpExpression(state: State, e: Expr): number | boolean
function interpExpression(state, e) {
  // console.log(e);
  if(e.kind === "boolean") {
    return e.value;
  }
  else if(e.kind === "number") {
    return e.value;
  }
  else if(e.kind === "variable") {
    return lib220.getProperty(state, e.name).value;
  }
  else {
    return mathOp(interpExpression(state, e.e1), e.op, interpExpression(state, e.e2));
  }
}


//'+' | '-' | '*' | '/' | '&&' | '||' | '>' | '<' | '===';
function mathOp(num1, op, num2) {
  if(op === "+") {
    return num1 + num2;
  }
  else if(op === "-") {
    return num1 - num2;
  }
  else if(op === "*") {
    return num1 * num2;
  }
  else if(op === "/") {
    return num1 / num2;
  }
  else if(op === "&&") {
    return num1 && num2;
  }
  else if(op === "||") {
    return num1 || num2;
  }
  else if(op === ">") {
    return num1 > num2;
  }
  else if(op === "<") {
    return num1 < num2;
  }
  else {
    return num1 === num2;
  }
}


// The State type is explained further down the document.
// Given a state object and an AST of a statement,
// interpStatement updates the state object and returns nothing
// interpStatement(state: State, p: Stmt): void
function interpStatement(state, p) {
  // console.log(p);
  if(p.kind === "let") {
    lib220.setProperty(state, p.name, interpExpression(state, p.expression));
  }
  else if(p.kind === "assignment") {
    lib220.setProperty(state, p.name, interpExpression(state, p.expression));
  }
  else if(p.kind === "if") {
    if(interpExpression(state, p.test)) {
      p.truePart.forEach(element => {
        interpStatement(state, element);
      });
    }
    else {
      p.falsePart.forEach(element => {
        interpStatement(state, element);
      });
    }
  }
  else if(p.kind === "while") {
    let toUpdate = interpExpression(state, p.test);
    while(toUpdate) {
      p.body.forEach(element => {
        interpStatement(state, element);
      });
      toUpdate = interpExpression(state, p.test);
    }
  }
  else {
    console.log(interpExpression(state, p.expression));
  }
}


// Given the AST of a program,
// interpProgram returns the final state of the program
// interpProgram(p: Stmt[]): State
function interpProgram(p) {
  // console.log(p);
  let state = {};
  p.forEach(element => {
    interpStatement(state, element);
  });
  return state;
}

test("multiplication with a variable", function() {
  let r = interpExpression({ x: 10 }, parser.parseExpression("x * 2").value);
  assert(r === 20);
});

test("longEq", function() {
  let r = interpExpression({ x: 10, y:2 }, parser.parseExpression("x * 2 + y").value);
  assert(r === 22);
});

test("bool", function() {
  let r = interpExpression({ x: 10, y:2 }, parser.parseExpression("2 === 3").value);
  assert(r === false);
});

test("bool", function() {
  let r = interpExpression({ x: 10, y:2 }, parser.parseExpression("2 === 3").value);
  assert(r === false);
});

test("assignment", function() {
  let st = interpProgram(parser.parseProgram("let x = 10; x = 20;").value);
  assert(st.x === 20);
});

test("twotwo", function() {
  let obj = {x: 11}
  let st = interpStatement(obj, parser.parseProgram("let x = 10;").value[0]);
  assert(obj.x === 10);
});

test("moremore", function() {
  let b = interpProgram(parser.parseProgram("let x = 10; x = x * 2;").value);
  assert(b.x === 20);
});

test("moremore", function() {
  let b = interpProgram(parser.parseProgram("let x = 10; if(x === 10) { x = 5;} else{ x = 2; }").value);
  assert(b.x === 5);
});


test("moremore", function() {
  let b = interpProgram(parser.parseProgram("let x = 10; while(x === 10) { x = x * 2;}").value);
  assert(b.x === 20);
});


test("moremore", function() {
  let b = interpProgram(parser.parseProgram("let x = 10; print(x);").value);
});

