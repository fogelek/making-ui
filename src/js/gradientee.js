'use strict';// https://jakearchibald.com/2020/css-paint-predictably-random/
const randomGenerator = (seed) => {
  let state = seed;

  const next = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    // Instead of incrementing, set the seed
    // to a 'random' 32 bit value:
    fork: () => randomGenerator(next() * 2 ** 32),
  };
};const _bounds = (row, column, cellSize) => {
  const move = cellSize / 2;
  return {
    top: row * cellSize - move,
    bottom: (row + 1) * cellSize - move,
    left: column * cellSize - move,
    right: (column + 1) * cellSize - move,
  };
};

const _getDeflection = (column, row, columns, rows, maxDeflect, rand) => {
  if (maxDeflect === 0) {
    return { top: 0, right: 0, bottom: 0 };
  }
  const top =
    column === columns - 1 || row > 0
      ? 0
      : Math.floor(rand.next() * maxDeflect * 2) - maxDeflect;

  const bottom = Math.floor(rand.next() * maxDeflect * 2) - maxDeflect;

  const right = Math.floor(rand.next() * maxDeflect * 2) - maxDeflect;

  return { top, bottom, right };
};

const _cellCoors = (
  row,
  column,
  previousRow,
  previousColumn,
  bounds,
  deflection
) => {
  const leftTop =
    row === 0
      ? {
          x: previousColumn ? previousColumn.topRight.x : bounds.left,
          y: previousColumn ? previousColumn.topRight.y : bounds.top,
        }
      : { x: previousRow.bottomLeft.x, y: previousRow.bottomLeft.y };

  const rightTop =
    row === 0
      ? { x: bounds.right + deflection.top, y: bounds.top }
      : { x: previousRow.bottomRight.x, y: previousRow.bottomRight.y };

  const rightBottom = {
    x: bounds.right + deflection.right,
    y: bounds.bottom + deflection.bottom,
  };

  const leftBottom = {
    x: previousColumn ? previousColumn.bottomRight.x : bounds.left,
    y: previousColumn ? previousColumn.bottomRight.y : bounds.bottom,
  };

  return {
    topLeft: leftTop,
    topRight: rightTop,
    bottomLeft: leftBottom,
    bottomRight: rightBottom,
  };
};

const generate = (width, height, cellSize, deflectionMultiplier, rand) => {
  const grid = [];

  const _rand = rand || randomGenerator(Math.random() * 10000);

  const maxDeflect = Math.floor(cellSize * deflectionMultiplier);

  const columns = Math.ceil(width / cellSize) + 2;
  const rows = Math.ceil(height / cellSize) + 2;

  for (let row = 0; row < rows; row++) {
    grid.push([]);

    for (let column = 0; column < columns; column++) {
      const bounds = _bounds(row, column, cellSize);
      const deflection = _getDeflection(
        column,
        row,
        columns,
        rows,
        maxDeflect,
        _rand
      );

      const previousColumn = column ? grid[row][column - 1] : undefined;
      const previousRow = row ? grid[row - 1][column] : undefined;

      const cellCoords = _cellCoors(
        row,
        column,
        previousRow,
        previousColumn,
        bounds,
        deflection
      );

      grid[row].push(cellCoords);
    }
  }

  return { grid, columns, rows };
};

const grid = {
  generate,
};const _allowedLengths = [3, 4, 6, 8];

const _color = (value) => {
  const hex = value.toString(16);
  return hex.length === 2 ? hex : "0" + hex;
};

const _getStop = (a, b, stop, interval) => {
  if (a === b) return a;
  const result = stop * interval;
  if (a > b) return a - result > b ? a - result : b;
  return a + result < b ? a + result : b;
};

const _getColor = (from, to, i, stops) => {
  return {
    r: _getStop(from.r, to.r, i, stops.r),
    g: _getStop(from.g, to.g, i, stops.g),
    b: _getStop(from.b, to.b, i, stops.b),
  };
};

const toHex = (color) => {
  const { r, g, b, a } = color;
  const alpha = a !== undefined && a < 255 ? _color(a) : "";
  return "#" + _color(r) + _color(g) + _color(b) + alpha;
};

const toRgb = (hex) => {
  const val = hex.toString().trim().substring(1);
  if (_allowedLengths.indexOf(val.length) === -1) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const regex = val.length <= 4 ? /[0-9a-fA-F]/g : /[0-9a-fA-F]{1,2}/g;

  const aRgbHex = val.match(regex);
  if (aRgbHex.length > 4 || aRgbHex.length < 3) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const repeats = val.length <= 4 ? 2 : 1;

  return {
    r: parseInt(aRgbHex[0].repeat(repeats), 16),
    g: parseInt(aRgbHex[1].repeat(repeats), 16),
    b: parseInt(aRgbHex[2].repeat(repeats), 16),
    a: aRgbHex.length === 4 ? parseInt(aRgbHex[3].repeat(repeats), 16) : 255,
  };
};

const generateGradient = (colorFrom, colorTo, stops) => {
  const stopValues = {
    r: Math.floor(Math.abs(colorFrom.r - colorTo.r) / stops),
    g: Math.floor(Math.abs(colorFrom.g - colorTo.g) / stops),
    b: Math.floor(Math.abs(colorFrom.b - colorTo.b) / stops),
  };

  const colors = [];
  colors.push(toHex(colorFrom));
  for (let i = 0; i < stops; i++) {
    const color = _getColor(colorFrom, colorTo, i + 1, stopValues);
    const hexColor = toHex(color);
    colors.push(hexColor);
  }
  colors.push(toHex(colorTo));

  return colors;
};

const color = {
  toHex,
  toRgb,
  generateGradient,
};const _point = (point) => [point.x, point.y];

const _getPoly = (points) => "M " + points.reduce((x, y) => `${x} ${y}`);

const _cloneGrid = (grid) => grid.map((row) => row.slice());

const paint = (
  ctx,
  grid,
  colors,
  colorRandomness,
  paintTriangles,
  rand = null,
  pure = true
) => {
  ctx.lineWidth = 1;

  const _rand = rand || randomGenerator(Math.random() * 10000);

  const _grid = pure ? _cloneGrid(grid) : grid;

  for (let row = 0; row < _grid.length; row++) {
    for (let column = 0; column < _grid[row].length; column++) {
      const path = _grid[row][column];
      if (!path.direction) {
        path.direction = _rand.next() > 0.5;
      }
      const quadAnchors = [
        _point(path.topLeft),
        _point(path.topRight),
        _point(path.bottomRight),
        _point(path.bottomLeft),
      ];

      const quadrilateral = new Path2D(_getPoly(quadAnchors));

      const colorDeflection = Math.round(
        _rand.next() * (colorRandomness * 2) - colorRandomness
      );
      let colorIndex = column + colorDeflection;
      if (colorIndex < 0) {
        colorIndex = 0;
      } else if (colorIndex >= colors.length) {
        colorIndex = colors.length - 1;
      }

      ctx.fillStyle = colors[colorIndex];
      ctx.strokeStyle = colors[colorIndex];
      ctx.fill(quadrilateral);
      ctx.stroke(quadrilateral);

      if (paintTriangles) {
        const trianglePath = [
          _point(path.topLeft),
          _point(path.direction ? path.topRight : path.bottomRight),
          _point(path.bottomLeft),
        ];
        const triangle = new Path2D(_getPoly(trianglePath));

        const alpha = _rand.next() > 0.5 ? "#ffffff08" : "#00000008";

        ctx.fillStyle = alpha;
        ctx.strokeStyle = alpha;
        ctx.fill(triangle);
        ctx.stroke(triangle);
      }
    }
  }
  return _grid;
};
const canvas = { paint };const defaultOptions = {
  width: 100,
  height: 100,
  boxSize: 20,
  colorFrom: "#fff",
  colorTo: "#000",
  colorRandomness: 0,
  deflectionLevel: 20,
  triangles: true,
  seed: null,
};

const paintGradientee = (ctx, options) => {
  let {
    width,
    height,
    boxSize,
    colorFrom,
    colorTo,
    colorRandomness,
    deflectionLevel,
    seed,
    triangles,
  } = { ...defaultOptions, ...options };

  if (deflectionLevel < 0) {
    deflectionLevel = 0;
  } else if (deflectionLevel > 25) {
    deflectionLevel = 25;
  }

  const rand = randomGenerator(seed ? seed : Math.random() * 10000);
  const gridResult = grid.generate(
    width,
    height,
    boxSize,
    deflectionLevel / 100,
    rand
  );

  const colors = color.generateGradient(
    color.toRgb(colorFrom),
    color.toRgb(colorTo),
    gridResult.columns
  );
  canvas.paint(ctx, gridResult.grid, colors, colorRandomness, triangles, rand);
};const gradientee = (ctx, options) => {
  paintGradientee(ctx, options);
};module.exports=gradientee;//# sourceMappingURL=gradientee.js.map
