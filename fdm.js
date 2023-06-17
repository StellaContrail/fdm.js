class FDM {
  dh = 0.0;
  #acc = 1;
  #coes = [[-0.5, 0, 0.5], [1, -2, 1]];
  set accuracy(acc) {
    if (this.#acc == acc) return;
    this.#acc = acc; this.#coes[0] = [];
    for (let i = -acc; i < acc + 1; i++) {
      this.#coes[0].push(FDM.#get_1st_def_coe(acc, i));
      this.#coes[1].push(FDM.#get_2nd_def_coe(acc, i));
    }
  }

  get accuracy() { return this.#acc; }

  get order() { return Math.pow(this.dh, this.#acc * 2); }
  
  constructor(dh = 0.5) { this.dh = dh; }

  static factorial = n => n == 0 ? 1 : n * FDM.factorial(n - 1);

  static #get_1st_def_coe = (n, j) => {
    if (j == 0) {
      return 0;
    }
    return (j % 2 == 0 ? -1 : 1) * (FDM.factorial(n) / FDM.factorial(n - j)) * (FDM.factorial(n) / FDM.factorial(n + j)) * (1.0 / j);
  }

  static #get_harmonic_number = (n, m) => {
    let sum = 0;
    for (let i = 1; i < n + 1; i++) {
      sum = sum + 1.0 / Math.pow(i, m);
    }
    return sum;
  }

  static #get_2nd_def_coe = function (n, j) {
    if (j == 0) {
      return -2 * FDM.#get_harmonic_number(n, 2);
    }
    return (j % 2 == 0 ? -1 : 1) * (FDM.factorial(n) / FDM.factorial(n - j)) * (FDM.factorial(n) / FDM.factorial(n + j)) * (1.0 / (j * j));
  }

  grad = function (f) {
    let _dh = this.dh; let _acc = this.#acc; let _coes = this.#coes[0];
    return function () {
      let x = arguments[0]; let y = arguments[1]; let z = arguments[2];
      let dh = _dh; let acc = _acc; let coes = _coes;
      const vs = [0, 0, 0];
      for (let i = -acc; i < acc + 1; i++) {
        vs[0] = vs[0] + coes[i + acc] * f(x + i * dh, y, z);
      }
      vs[0] = vs[0] / dh;
      if (arguments.length > 1) {
        for (let i = -acc; i < acc + 1; i++) {
          vs[1] = vs[1] + coes[i + acc] * f(x, y + i * dh, z);
        }
        vs[1] = vs[1] / dh;
      }
      if (arguments.length > 2) {
        for (let i = -acc; i < acc + 1; i++) {
          vs[2] = vs[2] + coes[i + acc] * f(x, y, z + i * dh);
        }
        vs[2] = vs[2] / dh;
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
    let _dh = this.dh; let _acc = this.#acc; let _coes = this.#coes[1];
    return function () {
      let x = arguments[0]; let y = arguments[1]; let z = arguments[2];
      let dh = _dh; let acc = _acc; let coes = _coes;
      let a = 0;
      for (let i = -acc; i < acc + 1; i++) {
        a = a + coes[i + acc] * f(x + i * dh, y, z);
      }
      if (arguments.length > 1) {
        for (let i = -acc; i < acc + 1; i++) {
          a = a + coes[i + acc] * f(x, y + i * dh, z);
        }
      }
      if (arguments.length > 2) {
        for (let i = -acc; i < acc + 1; i++) {
          a = a + coes[i + acc] * f(x, y, z + i * dh);
        }
      }
      return a / (dh*dh);
    }
  }
}
