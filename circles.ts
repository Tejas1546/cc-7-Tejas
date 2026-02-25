//! Exercise. Implement Circle class. It should override from Shape. Implement getter to access its radius.  Then create an Array of circles and rectangles. Find the item in the array that has least area.

interface Point {
  x: number;
  y: number;
  r: number;
}
abstract class Shape {
  private origin: Point;

  area(): number {
    return 0;
  }

  constructor() {
    this.origin = { x: 0, y: 0, r: 0 };
  }
}

class Circle extends Shape {
  private radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  override area(): number {
    return 3.14 * this.radius * this.radius;
  }
  get r(): number {
    return this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }
  override area() {
    return this.width * this.height;
  }

  get w() {
    return this.width;
  }

  get h() {
    return this.height;
  }

  set w(width: number) {
    this.width = width;
  }
  set h(height: number) {
    this.height = height;
  }
}

const rectangle = new Rectangle(10, 22);
rectangle.w = 15;
rectangle.h = rectangle.w + 10;

const shapes: Shape[] = [
  new Circle(5),
  new Rectangle(10, 20),
  new Circle(2),
  new Rectangle(40, 30),
];

let smallest: Shape = shapes[0];

for (let i = 1; i < shapes.length; i++) {
  if (shapes[i].area() < smallest.area()) {
    smallest = shapes[i];
  }
}

console.log("Smallest area:", smallest.area());
