let r = require('rrt');

//distance(p1: Point, p2: Point): number
function distance(p1, p2) {
  let theX = Math.abs(p1.x - p2.x);
  let theY = Math.abs(p1.y - p2.y);
  return Math.sqrt((theX*theX) + (theY*theY));
}

//samplePoint(mapSize: number, goal: Point, goalBias: number): Point
function samplePoint(mapSize, goal, goalBias) {
  if(goalBias === 1) {
    return goal;
  }
  else {
    let x = Math.floor(Math.random() * mapSize);
    let y = Math.floor(Math.random() * mapSize);
    return new r.Point(x, y);
  }

}

//collides(map: Line[], p1: Point, p2: Point): boolean
function collides(map, p1, p2) {
  let l = new r.Line(p1, p2);
  for(let i = 0; i < map.length; ++i) {
    if(r.intersects(map[i], l)) {
      return true;
    }
  }
  return false;
}

//getPath(goal: Tree): Point[]
function getPath(goal) {

}

class Tree {
  // constructor(node: Point, children: Tree[], parent: Tree | null)
  constructor(node, children, parent) {
    this.node = node;
    this.children = children;
    this.parent = parent;
  }

  // nearest(p : Point): Tree
  nearest(p) {
    if(this.children.length === 0) {
      return null;
    }
    let sDis = distance(this.children[0].node, p);
    let curClose = this.children[0];
    for(let i = 1; i < this.children.length; ++i) {
      let dis = distance(this.children[i].node, p);
      if(sDis > dis) {
        sDis = dis;
        curClose = this.children[i];
      }
    }
    return curClose;

  }

  // extend(p: Point, maxExtension: number): Point
  extend(p, maxExtension) {
    if(distance(this.node, p) < maxExtension) {
      return p;
    }
    else {
      let t = maxExtension/(distance(this.node, p));
      let x = ((1-t)*this.node.x)+(t*p.x);
      let y = ((1-t)*this.node.y)+(t*p.y);
      return new r.Point(x, y);
    }

  }

  // add(p: Point): Tree
  add(p) {
    let emp = [];
    let newTree = new Tree(p, emp, this);
    this.children.push(newTree);
    return newTree;
  }

}

// type Options = {
//     mapSize: number,
//     maxExtension: number,
//     goalBias: number,
//     maxSamples: number,
//     callback: (p: Point, q: Tree, r: Point, t: Tree) => void
// };

//plan(start: Point, goal: Point, map: Line[], options: Options): Point[] | undefined,
function plan(start, goal, map, options) {
}
