function fixMe(numeros) {
  const unirNumeros = numeros.join();
  let arr = unirNumeros.split(",").map(function (item) {
    return parseInt(item, 10);
  });

  const filtrado = arr.filter((n) => {
    return n !== undefined && n !== null;
  });

  const ordenado = filtrado.sort(function (a, b) {
    return b - a;
  });

  return ordenado;
}

console.log(fixMe([[3, 4], [12, 100, 89], [0], [], [56]]));

console.log(0 === null);
