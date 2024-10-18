export function calcularHPMinimo(baseStat) {
    return Math.floor(((2 * baseStat + 0 + Math.floor(0 / 4)) * 100) / 100) + 100 + 10;
  }
  
  export function calcularHPMaximo(baseStat) {
    return Math.floor(((2 * baseStat + 31 + Math.floor(252 / 4)) * 100) / 100) + 100 + 10;
  }
  
  export function calcularStatMinimo(baseStat) {
    return Math.floor((Math.floor(((2 * baseStat + 0 + Math.floor(0 / 4)) * 100) / 100) + 5) * 0.9);
  }
  
  export function calcularStatMaximo(baseStat) {
    return Math.floor((Math.floor(((2 * baseStat + 31 + Math.floor(252 / 4)) * 100) / 100) + 5) * 1.1);
  }
  