class FDM {
  dh = 0.0;
  
  constructor(dh = 0.5) {
    this.dh = dh;
  }

  grad = function (f) {
    let value = this.dh;
    return function () {
      let x = arguments[0]; let y = arguments[1]; let z = arguments[2]; let dh = value;
      const vs = [0, 0, 0];
      vs[0] = (f(x + dh, y, z) - f(x - dh, y, z)) * 0.5 / dh;
      if (arguments.length > 1) {
        vs[1] = (f(x, y + dh, z) - f(x, y - dh, z)) * 0.5 / dh;
      }
      if (arguments.length > 2) {
        vs[2] = (f(x, y, z + dh) - f(x, y, z - dh)) * 0.5 / dh;
      }
      switch (arguments.length) {
        case 1:
          return vs[0];
        case 2:
          return [vs[0], vs[1]];
        case 3:
          return vs;
      }
    }
  }
  
  lap = function(f) {
    let value = this.dh;
    return function () {
      let x = arguments[0]; let y = arguments[1]; let z = arguments[2]; let dh = value;
      let a = (f(x + dh, y, z) - 2 * f(x, y, z) + f(x - dh, y, z)) / (dh * dh);
      if (arguments.length > 1) {
        a += (f(x, y + dh, z) - 2 * f(x, y, z) + f(x, y - dh, z)) / (dh * dh);
      }
      if (arguments.length > 2) {
        a += (f(x, y, z + dh) - 2 * f(x, y, z) + f(x, y, z - dh)) / (dh * dh);
      }
      return a;
    }
  }
}
