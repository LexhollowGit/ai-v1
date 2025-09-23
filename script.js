const { Engine, Render, Runner, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const { world } = engine;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 600,
    height: 400,
    wireframes: false,
    background: "#222"
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(300, 0, 600, 20, { isStatic: true }),
  Bodies.rectangle(300, 400, 600, 20, { isStatic: true }),
  Bodies.rectangle(0, 200, 20, 400, { isStatic: true }),
  Bodies.rectangle(600, 200, 20, 400, { isStatic: true })
];
Composite.add(world, walls);

// 🟠 Soft circle (using particles + springs)
const softBall = Composites.softBody(
  200, 100,   // x, y
  6, 6,       // columns, rows
  5, 5,       // xSpacing, ySpacing
  true,       // crossBrace
  15,         // particle radius
  {
    restitution: 0.8,
    render: { fillStyle: "tomato" }
  },
  {
    stiffness: 0.2,
    render: { visible: false }
  }
);
Composite.add(world, softBall);

// 🟦 Squishy square (4x4 grid of particles with springs)
const squishyBox = Composites.softBody(
  400, 100,   // x, y
  4, 4,       // columns, rows
  5, 5,       // spacing
  true,
  15,
  {
    restitution: 0.6,
    render: { fillStyle: "skyblue" }
  },
  {
    stiffness: 0.3,
    render: { visible: false }
  }
);
Composite.add(world, squishyBox);

// 🎮 Mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});
Composite.add(world, mouseConstraint);

render.mouse = mouse;
