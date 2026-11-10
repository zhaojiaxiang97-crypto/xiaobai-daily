function e(e) {
  return typeof e == `string` ? `'${e}'` : new r().serialize(e);
}
var t = function () {
  let uint8Array = new Uint8Array(128);
  for (let t = 0; t < 69; t++) uint8Array[` _-,;:!?.'"()[]{}@*/\\&#%\`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz`.charCodeAt(t)] = t + 1;
  for (let t = 65; t <= 90; t++) uint8Array[t] = uint8Array[t + 32];
  return uint8Array;
}();
function n(count, n) {
  if (count === n) return 0;
  let r = Math.min(count.length, n.length),
    i = 0;
  for (let a = 0; a < r; a++) {
    let charCodeAtResult = count.charCodeAt(a),
      o = n.charCodeAt(a);
    if (charCodeAtResult === o) continue;
    let s = charCodeAtResult < 128 && t[charCodeAtResult] ? t[charCodeAtResult] : charCodeAtResult + 128,
      c = o < 128 && t[o] ? t[o] : o + 128;
    if (s !== c) return s < c ? -1 : 1;
    i === 0 && (i = charCodeAtResult > o ? -1 : 1);
  }
  return count.length === n.length ? i : count.length < n.length ? -1 : 1;
}
var r = function () {
  class e {
    #e = new Map();
    compare(compare, compareValue) {
      let r = typeof compare,
        i = typeof compareValue;
      return r === `string` && i === `string` ? n(compare, compareValue) : r === `number` && i === `number` ? compare - compareValue : n(this.serialize(compare, true), this.serialize(compareValue, true));
    }
    serialize(serialize, serializeValue) {
      if (serialize === null) return `null`;
      switch (typeof serialize) {
        case `string`:
          return serializeValue ? serialize : `'${serialize}'`;
        case `bigint`:
          return `${serialize}n`;
        case `object`:
          return this.$object(serialize);
        case `function`:
          return this.$function(serialize);
      }
      return String(serialize);
    }
    serializeObject(object) {
      let t = Object.prototype.toString.call(object);
      if (t !== `[object Object]`) return this.serializeBuiltInType(t.length < 10 ? `unknown:${t}` : t.slice(8, -1), object);
      let constructor = object.constructor,
        i = constructor === Object || constructor === undefined ? `` : constructor.name;
      if (i !== `` && globalThis[i] === constructor) return this.serializeBuiltInType(i, object);
      if (`toJSON` in object && typeof object.toJSON == `function`) {
        let t = object.toJSON();
        return i + (typeof t == `object` && t ? this.$object(t) : `(${this.serialize(t)})`);
      }
      let a = Object.keys(object).sort(n),
        o = `${i}{`;
      for (let t = 0; t < a.length; t++) {
        let n = a[t];
        o += `${n}:${this.serialize(object[n])}`, t < a.length - 1 && (o += `,`);
      }
      return o + `}`;
    }
    serializeBuiltInType(built, type) {
      let n = this[`$` + built];
      if (n) return n.call(this, type);
      if (typeof type.entries == `function`) return this.serializeObjectEntries(built, type.entries());
      throw Error(`Cannot serialize ${built}`);
    }
    serializeObjectEntries(object, entries) {
      let n = Array.from(entries).sort((left, right) => this.compare(left[0], right[0])),
        r = `${object}{`;
      for (let e = 0; e < n.length; e++) {
        let [t, i] = n[e];
        r += `${this.serialize(t, true)}:${this.serialize(i)}`, e < n.length - 1 && (r += `,`);
      }
      return r + `}`;
    }
    $object(e) {
      let t = this.#e.get(e);
      return t === undefined && (this.#e.set(e, `#${this.#e.size}`), t = this.serializeObject(e), this.#e.set(e, t)), t;
    }
    $function(count) {
      let t = Function.prototype.toString.call(count);
      return t.slice(-15) === `[native code] }` ? `${count.name || ``}()[native]` : `${count.name}(${count.length})${t.replace(/\s*\n\s*/g, ``)}`;
    }
    $Array(count) {
      let t = `[`;
      for (let n = 0; n < count.length; n++) t += this.serialize(count[n]), n < count.length - 1 && (t += `,`);
      return t + `]`;
    }
    $Date(e) {
      try {
        return `Date(${e.toISOString()})`;
      } catch {
        return `Date(null)`;
      }
    }
    $ArrayBuffer(array) {
      return `ArrayBuffer[${new Uint8Array(array).join(`,`)}]`;
    }
    $Set(e) {
      return `Set${this.$Array(Array.from(e).sort((left, right) => this.compare(left, right)))}`;
    }
    $Map(e) {
      return this.serializeObjectEntries(`Map`, e.entries());
    }
  }
  for (let t of [`Error`, `RegExp`, `URL`]) e.prototype[`$` + t] = function (e) {
    return `${t}(${e})`;
  };
  for (let t of [`Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`]) e.prototype[`$` + t] = function (e) {
    return `${t}[${e.join(`,`)}]`;
  };
  for (let t of [`BigInt64Array`, `BigUint64Array`]) e.prototype[`$` + t] = function (count) {
    return `${t}[${count.join(`n,`)}${count.length > 0 ? `n` : ``}]`;
  };
  return e;
}();
function i(t, n) {
  return t === n || e(t) === e(n);
}
export { i as t };