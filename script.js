// Setup Matter.js
const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

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

// A bouncing ball
const ball = Bodies.circle(300, 50, 20, {
  restitution: 0.9,
  render: { fillStyle: "tomato" }
});
Composite.add(world, ball);

// Some boxes to knock over
for (let i = 0; i < 5; i++) {
  const box = Bodies.rectangle(400, 200 - i * 40, 40, 40, {
    render: { fillStyle: "skyblue" }
  });
  Composite.add(world, box);
}

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
