# fdm.js
A Javascript Library for Finite Difference Method (FDM)

## Usage
```Javascript
const fdm = new FDM();
fdm.dh = 0.1;

const g = fdm.grad(f); // gradient
console.log(g(1) - 2*1);
console.log(g(2) - 2*2);

const h = fdm.lap(f); // laplacian
console.log(h(1) - 2);
console.log(h(2) - 2);
```

## License
MIT License.