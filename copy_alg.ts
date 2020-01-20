const is_arr = (potentialArr: [] | any) => {
  return (
    typeof potentialArr.reduce == "function" &&
    typeof potentialArr.map == "function" &&
    typeof potentialArr.filter == "function" &&
    typeof potentialArr.length == "number"
  );
};

const arr_comp = (x: [], z: []) => {
  if (!is_arr(x) && is_arr(z)) return false;
  if (x.length !== z.length) return false;
  for (let i = 0; i < x.length; i++) if (x[i] !== z[i]) return false;
  return true;
};

const object_comp = (x: {}, z: {}) => {
  let X = Object.getOwnPropertyNames(x);
  let Z = Object.getOwnPropertyNames(z);
  if (X.length !== Z.length) return false;
  for (let i = 0; i < X.length; i++) {
    const propName = X[i];
    const propUno = x[propName];
    const propDos = z[propName];
    if (is_arr(propUno) && is_arr(propDos)) {
      if (!arr_comp(propUno, propDos)) return false;
    } else if (propUno.constructor == "Object" && propDos == "Object")
      if (!object_comp(propUno, propDos)) return false;
      else if (propUno !== propDos) return false;
  }
  return true;
};

console.log(
  object_comp(
    { x: 1, y: 2, arr: [1, 2, 3, 4] },
    { x: 1, y: 2, arr: [1, 2, 3, 4] }
  )
);
