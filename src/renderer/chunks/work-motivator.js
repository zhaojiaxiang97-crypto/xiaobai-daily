import { r as e } from "../ui/icons/lucide-icons.js";
var t = e(`eye-off`, [[`path`, {
    d: `M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`,
    key: `ct8e1f`
  }], [`path`, {
    d: `M14.084 14.158a3 3 0 0 1-4.242-4.242`,
    key: `151rxh`
  }], [`path`, {
    d: `M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`,
    key: `13bj9a`
  }], [`path`, {
    d: `m2 2 20 20`,
    key: `1ooewy`
  }]]),
  n = e(`eye`, [[`path`, {
    d: `M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,
    key: `1nclc0`
  }], [`circle`, {
    cx: `12`,
    cy: `12`,
    r: `3`,
    key: `1v7zrd`
  }]]),
  r = e(`settings-2`, [[`path`, {
    d: `M14 17H5`,
    key: `gfn3mx`
  }], [`path`, {
    d: `M19 7h-9`,
    key: `6i9tg`
  }], [`circle`, {
    cx: `17`,
    cy: `17`,
    r: `3`,
    key: `18b49y`
  }], [`circle`, {
    cx: `7`,
    cy: `7`,
    r: `3`,
    key: `dfmy0x`
  }]]),
  payload;
(function (items) {
  items.assertEqual = e => {};
  function t(e) {}
  items.assertIs = t;
  function n(e) {
    throw Error();
  }
  items.assertNever = n, items.arrayToEnum = e => {
    let t = {};
    for (let resolvedValue of e) t[resolvedValue] = resolvedValue;
    return t;
  }, items.getValidEnumValues = t => {
    let filtered = items.objectKeys(t).filter(item => typeof t[t[item]] != `number`),
      r = {};
    for (let value of filtered) r[value] = t[value];
    return items.objectValues(r);
  }, items.objectValues = t => items.objectKeys(t).map(function (item) {
    return t[item];
  }), items.objectKeys = typeof Object.keys == `function` ? e => Object.keys(e) : e => {
    let emptyItems = [];
    for (let resolvedValue in e) Object.prototype.hasOwnProperty.call(e, resolvedValue) && emptyItems.push(resolvedValue);
    return emptyItems;
  }, items.find = (e, fn) => {
    for (let resolvedValue of e) if (fn(resolvedValue)) return resolvedValue;
  }, items.isInteger = typeof Number.isInteger == `function` ? e => Number.isInteger(e) : e => typeof e == `number` && Number.isFinite(e) && Math.floor(e) === e;
  function r(e, t = ` | `) {
    return e.map(item => typeof item == `string` ? `'${item}'` : item).join(t);
  }
  items.joinValues = r, items.jsonStringifyReplacer = (e, t) => typeof t == `bigint` ? t.toString() : t;
})(payload ||= {});
var a;
(function (e) {
  e.mergeShapes = (e, t) => ({
    ...e,
    ...t
  });
})(a ||= {});
var arrayToEnum = payload.arrayToEnum([`string`, `nan`, `number`, `integer`, `float`, `boolean`, `date`, `bigint`, `symbol`, `function`, `undefined`, `null`, `array`, `object`, `unknown`, `promise`, `void`, `never`, `map`, `set`]),
  handler = e => {
    switch (typeof e) {
      case `undefined`:
        return arrayToEnum.undefined;
      case `string`:
        return arrayToEnum.string;
      case `number`:
        return Number.isNaN(e) ? arrayToEnum.nan : arrayToEnum.number;
      case `boolean`:
        return arrayToEnum.boolean;
      case `function`:
        return arrayToEnum.function;
      case `bigint`:
        return arrayToEnum.bigint;
      case `symbol`:
        return arrayToEnum.symbol;
      case `object`:
        return Array.isArray(e) ? arrayToEnum.array : e === null ? arrayToEnum.null : e.then && typeof e.then == `function` && e.catch && typeof e.catch == `function` ? arrayToEnum.promise : typeof Map < `u` && e instanceof Map ? arrayToEnum.map : typeof Set < `u` && e instanceof Set ? arrayToEnum.set : typeof Date < `u` && e instanceof Date ? arrayToEnum.date : arrayToEnum.object;
      default:
        return arrayToEnum.unknown;
    }
  },
  arrayToEnumResult = payload.arrayToEnum([`invalid_type`, `invalid_literal`, `custom`, `invalid_union`, `invalid_union_discriminator`, `invalid_enum_value`, `unrecognized_keys`, `invalid_arguments`, `invalid_return_type`, `invalid_date`, `invalid_string`, `too_small`, `too_big`, `invalid_intersection_types`, `not_multiple_of`, `not_finite`]),
  l = class e extends Error {
    get errors() {
      return this.issues;
    }
    constructor(constructor) {
      super(), this.issues = [], this.addIssue = e => {
        this.issues = [...this.issues, e];
      }, this.addIssues = (e = []) => {
        this.issues = [...this.issues, ...e];
      };
      let t = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = `ZodError`, this.issues = constructor;
    }
    format(format) {
      let formatValue = format || function (e) {
          return e.message;
        },
        n = {
          _errors: []
        },
        r = e => {
          for (let i of e.issues) if (i.code === `invalid_union`) i.unionErrors.map(r);else if (i.code === `invalid_return_type`) r(i.returnTypeError);else if (i.code === `invalid_arguments`) r(i.argumentsError);else if (i.path.length === 0) n._errors.push(formatValue(i));else {
            let e = n,
              r = 0;
            for (; r < i.path.length;) {
              let n = i.path[r];
              r === i.path.length - 1 ? (e[n] = e[n] || {
                _errors: []
              }, e[n]._errors.push(formatValue(i))) : e[n] = e[n] || {
                _errors: []
              }, e = e[n], r++;
            }
          }
        };
      return r(this), n;
    }
    static assert(assert) {
      if (!(assert instanceof e)) throw Error(`Not a ZodError: ${assert}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, payload.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = e => e.message) {
      let t = {},
        emptyItems = [];
      for (let r of this.issues) if (r.path.length > 0) {
        let n = r.path[0];
        t[n] = t[n] || [], t[n].push(e(r));
      } else emptyItems.push(e(r));
      return {
        formErrors: emptyItems,
        fieldErrors: t
      };
    }
    get formErrors() {
      return this.flatten();
    }
  };
l.create = e => new l(e);
var u = (event, t) => {
    let resolvedValue;
    switch (event.code) {
      case arrayToEnumResult.invalid_type:
        resolvedValue = event.received === arrayToEnum.undefined ? `Required` : `Expected ${event.expected}, received ${event.received}`;
        break;
      case arrayToEnumResult.invalid_literal:
        resolvedValue = `Invalid literal value, expected ${JSON.stringify(event.expected, payload.jsonStringifyReplacer)}`;
        break;
      case arrayToEnumResult.unrecognized_keys:
        resolvedValue = `Unrecognized key(s) in object: ${payload.joinValues(event.keys, `, `)}`;
        break;
      case arrayToEnumResult.invalid_union:
        resolvedValue = `Invalid input`;
        break;
      case arrayToEnumResult.invalid_union_discriminator:
        resolvedValue = `Invalid discriminator value. Expected ${payload.joinValues(event.options)}`;
        break;
      case arrayToEnumResult.invalid_enum_value:
        resolvedValue = `Invalid enum value. Expected ${payload.joinValues(event.options)}, received '${event.received}'`;
        break;
      case arrayToEnumResult.invalid_arguments:
        resolvedValue = `Invalid function arguments`;
        break;
      case arrayToEnumResult.invalid_return_type:
        resolvedValue = `Invalid function return type`;
        break;
      case arrayToEnumResult.invalid_date:
        resolvedValue = `Invalid date`;
        break;
      case arrayToEnumResult.invalid_string:
        typeof event.validation == `object` ? `includes` in event.validation ? (resolvedValue = `Invalid input: must include "${event.validation.includes}"`, typeof event.validation.position == `number` && (resolvedValue = `${resolvedValue} at one or more positions greater than or equal to ${event.validation.position}`)) : `startsWith` in event.validation ? resolvedValue = `Invalid input: must start with "${event.validation.startsWith}"` : `endsWith` in event.validation ? resolvedValue = `Invalid input: must end with "${event.validation.endsWith}"` : payload.assertNever(event.validation) : resolvedValue = event.validation === `regex` ? `Invalid` : `Invalid ${event.validation}`;
        break;
      case arrayToEnumResult.too_small:
        resolvedValue = event.type === `array` ? `Array must contain ${event.exact ? `exactly` : event.inclusive ? `at least` : `more than`} ${event.minimum} element(s)` : event.type === `string` ? `String must contain ${event.exact ? `exactly` : event.inclusive ? `at least` : `over`} ${event.minimum} character(s)` : event.type === `number` || event.type === `bigint` ? `Number must be ${event.exact ? `exactly equal to ` : event.inclusive ? `greater than or equal to ` : `greater than `}${event.minimum}` : event.type === `date` ? `Date must be ${event.exact ? `exactly equal to ` : event.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(event.minimum))}` : `Invalid input`;
        break;
      case arrayToEnumResult.too_big:
        resolvedValue = event.type === `array` ? `Array must contain ${event.exact ? `exactly` : event.inclusive ? `at most` : `less than`} ${event.maximum} element(s)` : event.type === `string` ? `String must contain ${event.exact ? `exactly` : event.inclusive ? `at most` : `under`} ${event.maximum} character(s)` : event.type === `number` ? `Number must be ${event.exact ? `exactly` : event.inclusive ? `less than or equal to` : `less than`} ${event.maximum}` : event.type === `bigint` ? `BigInt must be ${event.exact ? `exactly` : event.inclusive ? `less than or equal to` : `less than`} ${event.maximum}` : event.type === `date` ? `Date must be ${event.exact ? `exactly` : event.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(event.maximum))}` : `Invalid input`;
        break;
      case arrayToEnumResult.custom:
        resolvedValue = `Invalid input`;
        break;
      case arrayToEnumResult.invalid_intersection_types:
        resolvedValue = `Intersection results could not be merged`;
        break;
      case arrayToEnumResult.not_multiple_of:
        resolvedValue = `Number must be a multiple of ${event.multipleOf}`;
        break;
      case arrayToEnumResult.not_finite:
        resolvedValue = `Number must be finite`;
        break;
      default:
        resolvedValue = t.defaultError, payload.assertNever(event);
    }
    return {
      message: resolvedValue
    };
  },
  ee = u;
function te() {
  return ee;
}
var ne = fn => {
  let {
      data: t,
      path: n,
      errorMaps: r,
      issueData: i
    } = fn,
    a = [...n, ...(i.path || [])],
    o = {
      ...i,
      path: a
    };
  if (i.message !== undefined) return {
    ...i,
    path: a,
    message: i.message
  };
  let s = ``,
    c = r.filter(item => !!item).slice().reverse();
  for (let value of c) s = value(o, {
    data: t,
    defaultError: s
  }).message;
  return {
    ...i,
    path: a,
    message: s
  };
};
function d(e, t) {
  let n = te(),
    r = ne({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, n, n === u ? undefined : u].filter(item => !!item)
    });
  e.common.issues.push(r);
}
var f = class e {
    constructor() {
      this.value = `valid`;
    }
    dirty() {
      this.value === `valid` && (this.value = `dirty`);
    }
    abort() {
      this.value !== `aborted` && (this.value = `aborted`);
    }
    static mergeArray(state, array) {
      let emptyItems = [];
      for (let r of array) {
        if (r.status === `aborted`) return p;
        r.status === `dirty` && state.dirty(), emptyItems.push(r.value);
      }
      return {
        status: state.value,
        value: emptyItems
      };
    }
    static async mergeObjectAsync(object, asyncValue) {
      let emptyItems = [];
      for (let value of asyncValue) {
        let t = await value.key,
          n = await value.value;
        emptyItems.push({
          key: t,
          value: n
        });
      }
      return e.mergeObjectSync(object, emptyItems);
    }
    static mergeObjectSync(state, sync) {
      let n = {};
      for (let r of sync) {
        let {
          key: t,
          value: i
        } = r;
        if (t.status === `aborted` || i.status === `aborted`) return p;
        t.status === `dirty` && state.dirty(), i.status === `dirty` && state.dirty(), t.value !== `__proto__` && (i.value !== undefined || r.alwaysSet) && (n[t.value] = i.value);
      }
      return {
        status: state.value,
        value: n
      };
    }
  },
  p = Object.freeze({
    status: `aborted`
  }),
  re = e => ({
    status: `dirty`,
    value: e
  }),
  m = e => ({
    status: `valid`,
    value: e
  }),
  ie = e => e.status === `aborted`,
  ae = e => e.status === `dirty`,
  h = e => e.status === `valid`,
  g = e => typeof Promise < `u` && e instanceof Promise,
  _;
(function (e) {
  e.errToObj = e => typeof e == `string` ? {
    message: e
  } : e || {}, e.toString = e => typeof e == `string` ? e : e?.message;
})(_ ||= {});
var v = class {
    constructor(constructor, constructorValue, constructorInput, r) {
      this._cachedPath = [], this.parent = constructor, this.data = constructorValue, this._path = constructorInput, this._key = r;
    }
    get path() {
      return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  },
  oe = (e, state) => {
    if (h(state)) return {
      success: true,
      data: state.value
    };
    if (!e.common.issues.length) throw Error(`Validation failed but no issues detected.`);
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        let t = new l(e.common.issues);
        return this._error = t, this._error;
      }
    };
  };
function y(e) {
  if (!e) return {};
  let {
    errorMap: t,
    invalid_type_error: n,
    required_error: r,
    description: i
  } = e;
  if (t && (n || r)) throw Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? {
    errorMap: t,
    description: i
  } : {
    errorMap: (event, i) => {
      let {
        message: a
      } = e;
      return event.code === `invalid_enum_value` ? {
        message: a ?? i.defaultError
      } : i.data === undefined ? {
        message: a ?? r ?? i.defaultError
      } : event.code === `invalid_type` ? {
        message: a ?? n ?? i.defaultError
      } : {
        message: i.defaultError
      };
    },
    description: i
  };
}
var b = class {
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return handler(e.data);
    }
    _getOrReturnCtx(e, returnValue) {
      return returnValue || {
        common: e.parent.common,
        data: e.data,
        parsedType: handler(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      };
    }
    _processInputParams(e) {
      return {
        status: new f(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: handler(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
        }
      };
    }
    _parseSync(e) {
      let t = this._parse(e);
      if (g(t)) throw Error(`Synchronous parse encountered promise.`);
      return t;
    }
    _parseAsync(e) {
      let t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      let safeParse = this.safeParse(e, t);
      if (safeParse.success) return safeParse.data;
      throw safeParse.error;
    }
    safeParse(safe, parse) {
      let n = {
        common: {
          issues: [],
          async: parse?.async ?? false,
          contextualErrorMap: parse?.errorMap
        },
        path: parse?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: safe,
        parsedType: handler(safe)
      };
      return oe(n, this._parseSync({
        data: safe,
        path: n.path,
        parent: n
      }));
    }
    "~validate"(state) {
      let t = {
        common: {
          issues: [],
          async: !!this[`~standard`].async
        },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: state,
        parsedType: handler(state)
      };
      if (!this[`~standard`].async) try {
        let n = this._parseSync({
          data: state,
          path: [],
          parent: t
        });
        return h(n) ? {
          value: n.value
        } : {
          issues: t.common.issues
        };
      } catch (e) {
        e?.message?.toLowerCase()?.includes(`encountered`) && (this[`~standard`].async = true), t.common = {
          issues: [],
          async: true
        };
      }
      return this._parseAsync({
        data: state,
        path: [],
        parent: t
      }).then(result => h(result) ? {
        value: result.value
      } : {
        issues: t.common.issues
      });
    }
    async parseAsync(asyncValue, asyncInput) {
      let safeParseAsync = await this.safeParseAsync(asyncValue, asyncInput);
      if (safeParseAsync.success) return safeParseAsync.data;
      throw safeParseAsync.error;
    }
    async safeParseAsync(safe, parse) {
      let n = {
          common: {
            issues: [],
            contextualErrorMap: parse?.errorMap,
            async: true
          },
          path: parse?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: safe,
          parsedType: handler(safe)
        },
        r = this._parse({
          data: safe,
          path: n.path,
          parent: n
        });
      return oe(n, await (g(r) ? r : Promise.resolve(r)));
    }
    refine(refine, refineValue) {
      let n = e => typeof refineValue == `string` || refineValue === undefined ? {
        message: refineValue
      } : typeof refineValue == `function` ? refineValue(e) : refineValue;
      return this._refinement((t, r) => {
        let i = refine(t),
          a = () => r.addIssue({
            code: arrayToEnumResult.custom,
            ...n(t)
          });
        return typeof Promise < `u` && i instanceof Promise ? i.then(result => result ? true : (a(), false)) : i ? true : (a(), false);
      });
    }
    refinement(refinement, refinementValue) {
      return this._refinement((n, r) => refinement(n) ? true : (r.addIssue(typeof refinementValue == `function` ? refinementValue(n, r) : refinementValue), false));
    }
    _refinement(e) {
      return new V({
        schema: this,
        typeName: q.ZodEffects,
        effect: {
          type: `refinement`,
          refinement: e
        }
      });
    }
    superRefine(superValue) {
      return this._refinement(superValue);
    }
    constructor(constructor) {
      this.spa = this.safeParseAsync, this._def = constructor, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this[`~standard`] = {
        version: 1,
        vendor: `zod`,
        validate: e => this[`~validate`](e)
      };
    }
    optional() {
      return H.create(this, this._def);
    }
    nullable() {
      return U.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return E.create(this);
    }
    promise() {
      return B.create(this, this._def);
    }
    or(e) {
      return k.create([this, e], this._def);
    }
    and(e) {
      return M.create(this, e, this._def);
    }
    transform(transform) {
      return new V({
        ...y(this._def),
        schema: this,
        typeName: q.ZodEffects,
        effect: {
          type: `transform`,
          transform: transform
        }
      });
    }
    default(defaultValue) {
      let t = typeof defaultValue == `function` ? defaultValue : () => defaultValue;
      return new W({
        ...y(this._def),
        innerType: this,
        defaultValue: t,
        typeName: q.ZodDefault
      });
    }
    brand() {
      return new We({
        typeName: q.ZodBranded,
        type: this,
        ...y(this._def)
      });
    }
    catch(e) {
      let t = typeof e == `function` ? e : () => e;
      return new G({
        ...y(this._def),
        innerType: this,
        catchValue: t,
        typeName: q.ZodCatch
      });
    }
    describe(describe) {
      let t = this.constructor;
      return new t({
        ...this._def,
        description: describe
      });
    }
    pipe(e) {
      return Ge.create(this, e);
    }
    readonly() {
      return K.create(this);
    }
    isOptional() {
      return this.safeParse(undefined).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  },
  se = /^c[^\s-]{8,}$/i,
  ce = /^[0-9a-z]+$/,
  le = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  ue = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  de = /^[a-z0-9_-]{21}$/i,
  fe = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  pe = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  me = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  he = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`,
  ge,
  _e = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ve = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  ye = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  be = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  xe = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Se = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Ce = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`,
  we = RegExp(`^${Ce}$`);
function Te(e) {
  let t = `[0-5]\\d`;
  e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision ?? (t = `${t}(\\.\\d+)?`);
  let n = e.precision ? `+` : `?`;
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function Ee(e) {
  return RegExp(`^${Te(e)}$`);
}
function De(e) {
  let t = `${Ce}T${Te(e)}`,
    emptyItems = [];
  return emptyItems.push(e.local ? `Z?` : `Z`), e.offset && emptyItems.push(`([+-]\\d{2}:?\\d{2})`), t = `${t}(${emptyItems.join(`|`)})`, RegExp(`^${t}$`);
}
function Oe(e, t) {
  return !((t !== `v4` && t || !_e.test(e)) && (t !== `v6` && t || !ye.test(e)));
}
function ke(text, t) {
  if (!fe.test(text)) return false;
  try {
    let [n] = text.split(`.`);
    if (!n) return false;
    let r = n.replace(/-/g, `+`).replace(/_/g, `/`).padEnd(n.length + (4 - n.length % 4) % 4, `=`),
      parsed = JSON.parse(atob(r));
    return !(typeof parsed != `object` || !parsed || `typ` in parsed && parsed?.typ !== `JWT` || !parsed.alg || t && parsed.alg !== t);
  } catch {
    return false;
  }
}
function Ae(e, t) {
  return !((t !== `v4` && t || !ve.test(e)) && (t !== `v6` && t || !be.test(e)));
}
var x = class e extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== arrayToEnum.string) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.string,
        received: t.parsedType
      }), p;
    }
    let t = new f(),
      resolvedValue;
    for (let r of this._def.checks) if (r.kind === `min`) e.data.length < r.value && (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.too_small,
      minimum: r.value,
      type: `string`,
      inclusive: true,
      exact: false,
      message: r.message
    }), t.dirty());else if (r.kind === `max`) e.data.length > r.value && (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.too_big,
      maximum: r.value,
      type: `string`,
      inclusive: true,
      exact: false,
      message: r.message
    }), t.dirty());else if (r.kind === `length`) {
      let i = e.data.length > r.value,
        a = e.data.length < r.value;
      (i || a) && (resolvedValue = this._getOrReturnCtx(e, resolvedValue), i ? d(resolvedValue, {
        code: arrayToEnumResult.too_big,
        maximum: r.value,
        type: `string`,
        inclusive: true,
        exact: true,
        message: r.message
      }) : a && d(resolvedValue, {
        code: arrayToEnumResult.too_small,
        minimum: r.value,
        type: `string`,
        inclusive: true,
        exact: true,
        message: r.message
      }), t.dirty());
    } else if (r.kind === `email`) me.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `email`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `emoji`) ge ||= new RegExp(he, `u`), ge.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `emoji`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `uuid`) ue.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `uuid`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `nanoid`) de.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `nanoid`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `cuid`) se.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `cuid`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `cuid2`) ce.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `cuid2`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `ulid`) le.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `ulid`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty());else if (r.kind === `url`) try {
      new URL(e.data);
    } catch {
      resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
        validation: `url`,
        code: arrayToEnumResult.invalid_string,
        message: r.message
      }), t.dirty();
    } else r.kind === `regex` ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `regex`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty())) : r.kind === `trim` ? e.data = e.data.trim() : r.kind === `includes` ? e.data.includes(r.value, r.position) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.invalid_string,
      validation: {
        includes: r.value,
        position: r.position
      },
      message: r.message
    }), t.dirty()) : r.kind === `toLowerCase` ? e.data = e.data.toLowerCase() : r.kind === `toUpperCase` ? e.data = e.data.toUpperCase() : r.kind === `startsWith` ? e.data.startsWith(r.value) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.invalid_string,
      validation: {
        startsWith: r.value
      },
      message: r.message
    }), t.dirty()) : r.kind === `endsWith` ? e.data.endsWith(r.value) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.invalid_string,
      validation: {
        endsWith: r.value
      },
      message: r.message
    }), t.dirty()) : r.kind === `datetime` ? De(r).test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.invalid_string,
      validation: `datetime`,
      message: r.message
    }), t.dirty()) : r.kind === `date` ? we.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.invalid_string,
      validation: `date`,
      message: r.message
    }), t.dirty()) : r.kind === `time` ? Ee(r).test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.invalid_string,
      validation: `time`,
      message: r.message
    }), t.dirty()) : r.kind === `duration` ? pe.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `duration`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty()) : r.kind === `ip` ? Oe(e.data, r.version) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `ip`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty()) : r.kind === `jwt` ? ke(e.data, r.alg) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `jwt`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty()) : r.kind === `cidr` ? Ae(e.data, r.version) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `cidr`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty()) : r.kind === `base64` ? xe.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `base64`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty()) : r.kind === `base64url` ? Se.test(e.data) || (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      validation: `base64url`,
      code: arrayToEnumResult.invalid_string,
      message: r.message
    }), t.dirty()) : payload.assertNever(r);
    return {
      status: t.value,
      value: e.data
    };
  }
  _regex(e, t, n) {
    return this.refinement(t => e.test(t), {
      validation: t,
      code: arrayToEnumResult.invalid_string,
      ..._.errToObj(n)
    });
  }
  _addCheck(t) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(e) {
    return this._addCheck({
      kind: `email`,
      ..._.errToObj(e)
    });
  }
  url(e) {
    return this._addCheck({
      kind: `url`,
      ..._.errToObj(e)
    });
  }
  emoji(e) {
    return this._addCheck({
      kind: `emoji`,
      ..._.errToObj(e)
    });
  }
  uuid(e) {
    return this._addCheck({
      kind: `uuid`,
      ..._.errToObj(e)
    });
  }
  nanoid(nanoid) {
    return this._addCheck({
      kind: `nanoid`,
      ..._.errToObj(nanoid)
    });
  }
  cuid(e) {
    return this._addCheck({
      kind: `cuid`,
      ..._.errToObj(e)
    });
  }
  cuid2(e) {
    return this._addCheck({
      kind: `cuid2`,
      ..._.errToObj(e)
    });
  }
  ulid(e) {
    return this._addCheck({
      kind: `ulid`,
      ..._.errToObj(e)
    });
  }
  base64(base64) {
    return this._addCheck({
      kind: `base64`,
      ..._.errToObj(base64)
    });
  }
  base64url(base64url) {
    return this._addCheck({
      kind: `base64url`,
      ..._.errToObj(base64url)
    });
  }
  jwt(e) {
    return this._addCheck({
      kind: `jwt`,
      ..._.errToObj(e)
    });
  }
  ip(e) {
    return this._addCheck({
      kind: `ip`,
      ..._.errToObj(e)
    });
  }
  cidr(e) {
    return this._addCheck({
      kind: `cidr`,
      ..._.errToObj(e)
    });
  }
  datetime(datetime) {
    return typeof datetime == `string` ? this._addCheck({
      kind: `datetime`,
      precision: null,
      offset: false,
      local: false,
      message: datetime
    }) : this._addCheck({
      kind: `datetime`,
      precision: datetime?.precision === undefined ? null : datetime?.precision,
      offset: datetime?.offset ?? false,
      local: datetime?.local ?? false,
      ..._.errToObj(datetime?.message)
    });
  }
  date(e) {
    return this._addCheck({
      kind: `date`,
      message: e
    });
  }
  time(e) {
    return typeof e == `string` ? this._addCheck({
      kind: `time`,
      precision: null,
      message: e
    }) : this._addCheck({
      kind: `time`,
      precision: e?.precision === undefined ? null : e?.precision,
      ..._.errToObj(e?.message)
    });
  }
  duration(duration) {
    return this._addCheck({
      kind: `duration`,
      ..._.errToObj(duration)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: `regex`,
      regex: e,
      ..._.errToObj(t)
    });
  }
  includes(includes, includesValue) {
    return this._addCheck({
      kind: `includes`,
      value: includes,
      position: includesValue?.position,
      ..._.errToObj(includesValue?.message)
    });
  }
  startsWith(withValue, withInput) {
    return this._addCheck({
      kind: `startsWith`,
      value: withValue,
      ..._.errToObj(withInput)
    });
  }
  endsWith(ends, withValue) {
    return this._addCheck({
      kind: `endsWith`,
      value: ends,
      ..._.errToObj(withValue)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: `min`,
      value: e,
      ..._.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: `max`,
      value: e,
      ..._.errToObj(t)
    });
  }
  length(length, lengthValue) {
    return this._addCheck({
      kind: `length`,
      value: length,
      ..._.errToObj(lengthValue)
    });
  }
  nonempty(nonempty) {
    return this.min(1, _.errToObj(nonempty));
  }
  trim() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, {
        kind: `trim`
      }]
    });
  }
  toLowerCase() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, {
        kind: `toLowerCase`
      }]
    });
  }
  toUpperCase() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, {
        kind: `toUpperCase`
      }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find(item => item.kind === `datetime`);
  }
  get isDate() {
    return !!this._def.checks.find(item => item.kind === `date`);
  }
  get isTime() {
    return !!this._def.checks.find(item => item.kind === `time`);
  }
  get isDuration() {
    return !!this._def.checks.find(item => item.kind === `duration`);
  }
  get isEmail() {
    return !!this._def.checks.find(item => item.kind === `email`);
  }
  get isURL() {
    return !!this._def.checks.find(item => item.kind === `url`);
  }
  get isEmoji() {
    return !!this._def.checks.find(item => item.kind === `emoji`);
  }
  get isUUID() {
    return !!this._def.checks.find(item => item.kind === `uuid`);
  }
  get isNANOID() {
    return !!this._def.checks.find(item => item.kind === `nanoid`);
  }
  get isCUID() {
    return !!this._def.checks.find(item => item.kind === `cuid`);
  }
  get isCUID2() {
    return !!this._def.checks.find(item => item.kind === `cuid2`);
  }
  get isULID() {
    return !!this._def.checks.find(item => item.kind === `ulid`);
  }
  get isIP() {
    return !!this._def.checks.find(item => item.kind === `ip`);
  }
  get isCIDR() {
    return !!this._def.checks.find(item => item.kind === `cidr`);
  }
  get isBase64() {
    return !!this._def.checks.find(item => item.kind === `base64`);
  }
  get isBase64url() {
    return !!this._def.checks.find(item => item.kind === `base64url`);
  }
  get minLength() {
    let value = null;
    for (let t of this._def.checks) t.kind === `min` && (value === null || t.value > value) && (value = t.value);
    return value;
  }
  get maxLength() {
    let value = null;
    for (let t of this._def.checks) t.kind === `max` && (value === null || t.value < value) && (value = t.value);
    return value;
  }
};
x.create = e => new x({
  checks: [],
  typeName: q.ZodString,
  coerce: e?.coerce ?? false,
  ...y(e)
});
function je(e, t) {
  let n = (e.toString().split(`.`)[1] || ``).length,
    r = (t.toString().split(`.`)[1] || ``).length,
    i = n > r ? n : r;
  return Number.parseInt(e.toFixed(i).replace(`.`, ``)) % Number.parseInt(t.toFixed(i).replace(`.`, ``)) / 10 ** i;
}
var Me = class e extends b {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== arrayToEnum.number) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.number,
        received: t.parsedType
      }), p;
    }
    let value,
      n = new f();
    for (let r of this._def.checks) r.kind === `int` ? payload.isInteger(e.data) || (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.invalid_type,
      expected: `integer`,
      received: `float`,
      message: r.message
    }), n.dirty()) : r.kind === `min` ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.too_small,
      minimum: r.value,
      type: `number`,
      inclusive: r.inclusive,
      exact: false,
      message: r.message
    }), n.dirty()) : r.kind === `max` ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.too_big,
      maximum: r.value,
      type: `number`,
      inclusive: r.inclusive,
      exact: false,
      message: r.message
    }), n.dirty()) : r.kind === `multipleOf` ? je(e.data, r.value) !== 0 && (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.not_multiple_of,
      multipleOf: r.value,
      message: r.message
    }), n.dirty()) : r.kind === `finite` ? Number.isFinite(e.data) || (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.not_finite,
      message: r.message
    }), n.dirty()) : payload.assertNever(r);
    return {
      status: n.value,
      value: e.data
    };
  }
  gte(e, t) {
    return this.setLimit(`min`, e, true, _.toString(t));
  }
  gt(e, t) {
    return this.setLimit(`min`, e, false, _.toString(t));
  }
  lte(e, t) {
    return this.setLimit(`max`, e, true, _.toString(t));
  }
  lt(e, t) {
    return this.setLimit(`max`, e, false, _.toString(t));
  }
  setLimit(limit, limitValue, limitInput, i) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, {
        kind: limit,
        value: limitValue,
        inclusive: limitInput,
        message: _.toString(i)
      }]
    });
  }
  _addCheck(t) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(e) {
    return this._addCheck({
      kind: `int`,
      message: _.toString(e)
    });
  }
  positive(positive) {
    return this._addCheck({
      kind: `min`,
      value: 0,
      inclusive: false,
      message: _.toString(positive)
    });
  }
  negative(negative) {
    return this._addCheck({
      kind: `max`,
      value: 0,
      inclusive: false,
      message: _.toString(negative)
    });
  }
  nonpositive(nonpositive) {
    return this._addCheck({
      kind: `max`,
      value: 0,
      inclusive: true,
      message: _.toString(nonpositive)
    });
  }
  nonnegative(nonnegative) {
    return this._addCheck({
      kind: `min`,
      value: 0,
      inclusive: true,
      message: _.toString(nonnegative)
    });
  }
  multipleOf(multiple, multipleValue) {
    return this._addCheck({
      kind: `multipleOf`,
      value: multiple,
      message: _.toString(multipleValue)
    });
  }
  finite(finite) {
    return this._addCheck({
      kind: `finite`,
      message: _.toString(finite)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: `min`,
      inclusive: true,
      value: -(2 ** 53 - 1),
      message: _.toString(e)
    })._addCheck({
      kind: `max`,
      inclusive: true,
      value: 2 ** 53 - 1,
      message: _.toString(e)
    });
  }
  get minValue() {
    let value = null;
    for (let t of this._def.checks) t.kind === `min` && (value === null || t.value > value) && (value = t.value);
    return value;
  }
  get maxValue() {
    let value = null;
    for (let t of this._def.checks) t.kind === `max` && (value === null || t.value < value) && (value = t.value);
    return value;
  }
  get isInt() {
    return !!this._def.checks.find(state => state.kind === `int` || state.kind === `multipleOf` && payload.isInteger(state.value));
  }
  get isFinite() {
    let value = null,
      t = null;
    for (let resolvedValue of this._def.checks) if (resolvedValue.kind === `finite` || resolvedValue.kind === `int` || resolvedValue.kind === `multipleOf`) return true;else resolvedValue.kind === `min` ? (t === null || resolvedValue.value > t) && (t = resolvedValue.value) : resolvedValue.kind === `max` && (value === null || resolvedValue.value < value) && (value = resolvedValue.value);
    return Number.isFinite(t) && Number.isFinite(value);
  }
};
Me.create = e => new Me({
  checks: [],
  typeName: q.ZodNumber,
  coerce: e?.coerce || false,
  ...y(e)
});
var Ne = class e extends b {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce) try {
      e.data = BigInt(e.data);
    } catch {
      return this._getInvalidInput(e);
    }
    if (this._getType(e) !== arrayToEnum.bigint) return this._getInvalidInput(e);
    let value,
      n = new f();
    for (let r of this._def.checks) r.kind === `min` ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.too_small,
      type: `bigint`,
      minimum: r.value,
      inclusive: r.inclusive,
      message: r.message
    }), n.dirty()) : r.kind === `max` ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.too_big,
      type: `bigint`,
      maximum: r.value,
      inclusive: r.inclusive,
      message: r.message
    }), n.dirty()) : r.kind === `multipleOf` ? e.data % r.value !== BigInt(0) && (value = this._getOrReturnCtx(e, value), d(value, {
      code: arrayToEnumResult.not_multiple_of,
      multipleOf: r.value,
      message: r.message
    }), n.dirty()) : payload.assertNever(r);
    return {
      status: n.value,
      value: e.data
    };
  }
  _getInvalidInput(e) {
    let t = this._getOrReturnCtx(e);
    return d(t, {
      code: arrayToEnumResult.invalid_type,
      expected: arrayToEnum.bigint,
      received: t.parsedType
    }), p;
  }
  gte(e, t) {
    return this.setLimit(`min`, e, true, _.toString(t));
  }
  gt(e, t) {
    return this.setLimit(`min`, e, false, _.toString(t));
  }
  lte(e, t) {
    return this.setLimit(`max`, e, true, _.toString(t));
  }
  lt(e, t) {
    return this.setLimit(`max`, e, false, _.toString(t));
  }
  setLimit(limit, limitValue, limitInput, i) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, {
        kind: limit,
        value: limitValue,
        inclusive: limitInput,
        message: _.toString(i)
      }]
    });
  }
  _addCheck(t) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(positive) {
    return this._addCheck({
      kind: `min`,
      value: BigInt(0),
      inclusive: false,
      message: _.toString(positive)
    });
  }
  negative(negative) {
    return this._addCheck({
      kind: `max`,
      value: BigInt(0),
      inclusive: false,
      message: _.toString(negative)
    });
  }
  nonpositive(nonpositive) {
    return this._addCheck({
      kind: `max`,
      value: BigInt(0),
      inclusive: true,
      message: _.toString(nonpositive)
    });
  }
  nonnegative(nonnegative) {
    return this._addCheck({
      kind: `min`,
      value: BigInt(0),
      inclusive: true,
      message: _.toString(nonnegative)
    });
  }
  multipleOf(multiple, multipleValue) {
    return this._addCheck({
      kind: `multipleOf`,
      value: multiple,
      message: _.toString(multipleValue)
    });
  }
  get minValue() {
    let value = null;
    for (let t of this._def.checks) t.kind === `min` && (value === null || t.value > value) && (value = t.value);
    return value;
  }
  get maxValue() {
    let value = null;
    for (let t of this._def.checks) t.kind === `max` && (value === null || t.value < value) && (value = t.value);
    return value;
  }
};
Ne.create = e => new Ne({
  checks: [],
  typeName: q.ZodBigInt,
  coerce: e?.coerce ?? false,
  ...y(e)
});
var Pe = class extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== arrayToEnum.boolean) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.boolean,
        received: t.parsedType
      }), p;
    }
    return m(e.data);
  }
};
Pe.create = e => new Pe({
  typeName: q.ZodBoolean,
  coerce: e?.coerce || false,
  ...y(e)
});
var Fe = class e extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== arrayToEnum.date) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.date,
        received: t.parsedType
      }), p;
    }
    if (Number.isNaN(e.data.getTime())) return d(this._getOrReturnCtx(e), {
      code: arrayToEnumResult.invalid_date
    }), p;
    let t = new f(),
      resolvedValue;
    for (let r of this._def.checks) r.kind === `min` ? e.data.getTime() < r.value && (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.too_small,
      message: r.message,
      inclusive: true,
      exact: false,
      minimum: r.value,
      type: `date`
    }), t.dirty()) : r.kind === `max` ? e.data.getTime() > r.value && (resolvedValue = this._getOrReturnCtx(e, resolvedValue), d(resolvedValue, {
      code: arrayToEnumResult.too_big,
      message: r.message,
      inclusive: true,
      exact: false,
      maximum: r.value,
      type: `date`
    }), t.dirty()) : payload.assertNever(r);
    return {
      status: t.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(t) {
    return new e({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: `min`,
      value: e.getTime(),
      message: _.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: `max`,
      value: e.getTime(),
      message: _.toString(t)
    });
  }
  get minDate() {
    let value = null;
    for (let t of this._def.checks) t.kind === `min` && (value === null || t.value > value) && (value = t.value);
    return value == null ? null : new Date(value);
  }
  get maxDate() {
    let value = null;
    for (let t of this._def.checks) t.kind === `max` && (value === null || t.value < value) && (value = t.value);
    return value == null ? null : new Date(value);
  }
};
Fe.create = e => new Fe({
  checks: [],
  coerce: e?.coerce || false,
  typeName: q.ZodDate,
  ...y(e)
});
var Ie = class extends b {
  _parse(e) {
    if (this._getType(e) !== arrayToEnum.symbol) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.symbol,
        received: t.parsedType
      }), p;
    }
    return m(e.data);
  }
};
Ie.create = e => new Ie({
  typeName: q.ZodSymbol,
  ...y(e)
});
var S = class extends b {
  _parse(e) {
    if (this._getType(e) !== arrayToEnum.undefined) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.undefined,
        received: t.parsedType
      }), p;
    }
    return m(e.data);
  }
};
S.create = e => new S({
  typeName: q.ZodUndefined,
  ...y(e)
});
var C = class extends b {
  _parse(e) {
    if (this._getType(e) !== arrayToEnum.null) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.null,
        received: t.parsedType
      }), p;
    }
    return m(e.data);
  }
};
C.create = e => new C({
  typeName: q.ZodNull,
  ...y(e)
});
var Le = class extends b {
  constructor() {
    super(...arguments), this._any = true;
  }
  _parse(e) {
    return m(e.data);
  }
};
Le.create = e => new Le({
  typeName: q.ZodAny,
  ...y(e)
});
var w = class extends b {
  constructor() {
    super(...arguments), this._unknown = true;
  }
  _parse(e) {
    return m(e.data);
  }
};
w.create = e => new w({
  typeName: q.ZodUnknown,
  ...y(e)
});
var T = class extends b {
  _parse(e) {
    let t = this._getOrReturnCtx(e);
    return d(t, {
      code: arrayToEnumResult.invalid_type,
      expected: arrayToEnum.never,
      received: t.parsedType
    }), p;
  }
};
T.create = e => new T({
  typeName: q.ZodNever,
  ...y(e)
});
var Re = class extends b {
  _parse(e) {
    if (this._getType(e) !== arrayToEnum.undefined) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.void,
        received: t.parsedType
      }), p;
    }
    return m(e.data);
  }
};
Re.create = e => new Re({
  typeName: q.ZodVoid,
  ...y(e)
});
var E = class e extends b {
  _parse(e) {
    let {
        ctx: t,
        status: n
      } = this._processInputParams(e),
      _def = this._def;
    if (t.parsedType !== arrayToEnum.array) return d(t, {
      code: arrayToEnumResult.invalid_type,
      expected: arrayToEnum.array,
      received: t.parsedType
    }), p;
    if (_def.exactLength !== null) {
      let e = t.data.length > _def.exactLength.value,
        i = t.data.length < _def.exactLength.value;
      (e || i) && (d(t, {
        code: e ? arrayToEnumResult.too_big : arrayToEnumResult.too_small,
        minimum: i ? _def.exactLength.value : undefined,
        maximum: e ? _def.exactLength.value : undefined,
        type: `array`,
        inclusive: true,
        exact: true,
        message: _def.exactLength.message
      }), n.dirty());
    }
    if (_def.minLength !== null && t.data.length < _def.minLength.value && (d(t, {
      code: arrayToEnumResult.too_small,
      minimum: _def.minLength.value,
      type: `array`,
      inclusive: true,
      exact: false,
      message: _def.minLength.message
    }), n.dirty()), _def.maxLength !== null && t.data.length > _def.maxLength.value && (d(t, {
      code: arrayToEnumResult.too_big,
      maximum: _def.maxLength.value,
      type: `array`,
      inclusive: true,
      exact: false,
      message: _def.maxLength.message
    }), n.dirty()), t.common.async) return Promise.all([...t.data].map((item, n) => _def.type._parseAsync(new v(t, item, t.path, n)))).then(result => f.mergeArray(n, result));
    let mapped = [...t.data].map((item, n) => _def.type._parseSync(new v(t, item, t.path, n)));
    return f.mergeArray(n, mapped);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new e({
      ...this._def,
      minLength: {
        value: t,
        message: _.toString(n)
      }
    });
  }
  max(t, n) {
    return new e({
      ...this._def,
      maxLength: {
        value: t,
        message: _.toString(n)
      }
    });
  }
  length(length, lengthValue) {
    return new e({
      ...this._def,
      exactLength: {
        value: length,
        message: _.toString(lengthValue)
      }
    });
  }
  nonempty(nonempty) {
    return this.min(1, nonempty);
  }
};
E.create = (e, t) => new E({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: q.ZodArray,
  ...y(t)
});
function D(e) {
  if (e instanceof O) {
    let t = {};
    for (let resolvedValue in e.shape) {
      let r = e.shape[resolvedValue];
      t[resolvedValue] = H.create(D(r));
    }
    return new O({
      ...e._def,
      shape: () => t
    });
  }
  return e instanceof E ? new E({
    ...e._def,
    type: D(e.element)
  }) : e instanceof H ? H.create(D(e.unwrap())) : e instanceof U ? U.create(D(e.unwrap())) : e instanceof N ? N.create(e.items.map(item => D(item))) : e;
}
var O = class e extends b {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    let e = this._def.shape(),
      objectKeys = payload.objectKeys(e);
    return this._cached = {
      shape: e,
      keys: objectKeys
    }, this._cached;
  }
  _parse(items) {
    if (this._getType(items) !== arrayToEnum.object) {
      let t = this._getOrReturnCtx(items);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.object,
        received: t.parsedType
      }), p;
    }
    let {
        status: t,
        ctx: n
      } = this._processInputParams(items),
      {
        shape: r,
        keys: i
      } = this._getCached(),
      emptyItems = [];
    if (!(this._def.catchall instanceof T && this._def.unknownKeys === `strip`)) for (let value in n.data) i.includes(value) || emptyItems.push(value);
    let message = [];
    for (let value of i) {
      let t = r[value],
        i = n.data[value];
      message.push({
        key: {
          status: `valid`,
          value: value
        },
        value: t._parse(new v(n, i, n.path, value)),
        alwaysSet: value in n.data
      });
    }
    if (this._def.catchall instanceof T) {
      let unknownKeys = this._def.unknownKeys;
      if (unknownKeys === `passthrough`) for (let value of emptyItems) message.push({
        key: {
          status: `valid`,
          value: value
        },
        value: {
          status: `valid`,
          value: n.data[value]
        }
      });else if (unknownKeys === `strict`) emptyItems.length > 0 && (d(n, {
        code: arrayToEnumResult.unrecognized_keys,
        keys: emptyItems
      }), t.dirty());else if (unknownKeys !== `strip`) throw Error(`Internal ZodObject error: invalid unknownKeys value.`);
    } else {
      let catchall = this._def.catchall;
      for (let value of emptyItems) {
        let r = n.data[value];
        message.push({
          key: {
            status: `valid`,
            value: value
          },
          value: catchall._parse(new v(n, r, n.path, value)),
          alwaysSet: value in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      let value = [];
      for (let t of message) {
        let n = await t.key,
          r = await t.value;
        value.push({
          key: n,
          value: r,
          alwaysSet: t.alwaysSet
        });
      }
      return value;
    }).then(result => f.mergeObjectSync(t, result)) : f.mergeObjectSync(t, message);
  }
  get shape() {
    return this._def.shape();
  }
  strict(strict) {
    return _.errToObj, new e({
      ...this._def,
      unknownKeys: `strict`,
      ...(strict === undefined ? {} : {
        errorMap: (event, n) => {
          let fallbackValue = this._def.errorMap?.(event, n).message ?? n.defaultError;
          return event.code === `unrecognized_keys` ? {
            message: _.errToObj(strict).message ?? fallbackValue
          } : {
            message: fallbackValue
          };
        }
      })
    });
  }
  strip() {
    return new e({
      ...this._def,
      unknownKeys: `strip`
    });
  }
  passthrough() {
    return new e({
      ...this._def,
      unknownKeys: `passthrough`
    });
  }
  extend(extend) {
    return new e({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...extend
      })
    });
  }
  merge(t) {
    return new e({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: q.ZodObject
    });
  }
  setKey(keyInput, keyValue) {
    return this.augment({
      [keyInput]: keyValue
    });
  }
  catchall(catchall) {
    return new e({
      ...this._def,
      catchall: catchall
    });
  }
  pick(t) {
    let n = {};
    for (let value of payload.objectKeys(t)) t[value] && this.shape[value] && (n[value] = this.shape[value]);
    return new e({
      ...this._def,
      shape: () => n
    });
  }
  omit(t) {
    let n = {};
    for (let value of payload.objectKeys(this.shape)) t[value] || (n[value] = this.shape[value]);
    return new e({
      ...this._def,
      shape: () => n
    });
  }
  deepPartial() {
    return D(this);
  }
  partial(partial) {
    let n = {};
    for (let value of payload.objectKeys(this.shape)) {
      let r = this.shape[value];
      n[value] = partial && !partial[value] ? r : r.optional();
    }
    return new e({
      ...this._def,
      shape: () => n
    });
  }
  required(required) {
    let n = {};
    for (let value of payload.objectKeys(this.shape)) if (required && !required[value]) n[value] = this.shape[value];else {
      let t = this.shape[value];
      for (; t instanceof H;) t = t._def.innerType;
      n[value] = t;
    }
    return new e({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return He(payload.objectKeys(this.shape));
  }
};
O.create = (e, t) => new O({
  shape: () => e,
  unknownKeys: `strip`,
  catchall: T.create(),
  typeName: q.ZodObject,
  ...y(t)
}), O.strictCreate = (e, t) => new O({
  shape: () => e,
  unknownKeys: `strict`,
  catchall: T.create(),
  typeName: q.ZodObject,
  ...y(t)
}), O.lazycreate = (e, t) => new O({
  shape: e,
  unknownKeys: `strip`,
  catchall: T.create(),
  typeName: q.ZodObject,
  ...y(t)
});
var k = class extends b {
  _parse(items) {
    let {
        ctx: t
      } = this._processInputParams(items),
      options = this._def.options;
    function r(e) {
      for (let value of e) if (value.result.status === `valid`) return value.result;
      for (let resolvedValue of e) if (resolvedValue.result.status === `dirty`) return t.common.issues.push(...resolvedValue.ctx.common.issues), resolvedValue.result;
      let mapped = e.map(item => new l(item.ctx.common.issues));
      return d(t, {
        code: arrayToEnumResult.invalid_union,
        unionErrors: mapped
      }), p;
    }
    if (t.common.async) return Promise.all(options.map(async item => {
      let n = {
        ...t,
        common: {
          ...t.common,
          issues: []
        },
        parent: null
      };
      return {
        result: await item._parseAsync({
          data: t.data,
          path: t.path,
          parent: n
        }),
        ctx: n
      };
    })).then(r);
    {
      let value,
        emptyItems = [];
      for (let i of options) {
        let n = {
            ...t,
            common: {
              ...t.common,
              issues: []
            },
            parent: null
          },
          a = i._parseSync({
            data: t.data,
            path: t.path,
            parent: n
          });
        if (a.status === `valid`) return a;
        a.status === `dirty` && !value && (value = {
          result: a,
          ctx: n
        }), n.common.issues.length && emptyItems.push(n.common.issues);
      }
      if (value) return t.common.issues.push(...value.ctx.common.issues), value.result;
      let mapped = emptyItems.map(item => new l(item));
      return d(t, {
        code: arrayToEnumResult.invalid_union,
        unionErrors: mapped
      }), p;
    }
  }
  get options() {
    return this._def.options;
  }
};
k.create = (e, t) => new k({
  options: e,
  typeName: q.ZodUnion,
  ...y(t)
});
var A = options => options instanceof I ? A(options.schema) : options instanceof V ? A(options.innerType()) : options instanceof L ? [options.value] : options instanceof R ? options.options : options instanceof z ? payload.objectValues(options.enum) : options instanceof W ? A(options._def.innerType) : options instanceof S ? [undefined] : options instanceof C ? [null] : options instanceof H ? [undefined, ...A(options.unwrap())] : options instanceof U ? [null, ...A(options.unwrap())] : options instanceof We || options instanceof K ? A(options.unwrap()) : options instanceof G ? A(options._def.innerType) : [],
  ze = class e extends b {
    _parse(e) {
      let {
        ctx: t
      } = this._processInputParams(e);
      if (t.parsedType !== arrayToEnum.object) return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.object,
        received: t.parsedType
      }), p;
      let discriminator = this.discriminator,
        r = t.data[discriminator],
        i = this.optionsMap.get(r);
      return i ? t.common.async ? i._parseAsync({
        data: t.data,
        path: t.path,
        parent: t
      }) : i._parseSync({
        data: t.data,
        path: t.path,
        parent: t
      }) : (d(t, {
        code: arrayToEnumResult.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      }), p);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(createValue, count, createInput) {
      let i = new Map();
      for (let value of count) {
        let n = A(value.shape[createValue]);
        if (!n.length) throw Error(`A discriminator value for key \`${createValue}\` could not be extracted from all schema options`);
        for (let r of n) {
          if (i.has(r)) throw Error(`Discriminator property ${String(createValue)} has duplicate value ${String(r)}`);
          i.set(r, value);
        }
      }
      return new e({
        typeName: q.ZodDiscriminatedUnion,
        discriminator: createValue,
        options: count,
        optionsMap: i,
        ...y(createInput)
      });
    }
  };
function j(count, t) {
  let n = handler(count),
    r = handler(t);
  if (count === t) return {
    valid: true,
    data: count
  };
  if (n === arrayToEnum.object && r === arrayToEnum.object) {
    let objectKeys = payload.objectKeys(t),
      filtered = payload.objectKeys(count).filter(item => objectKeys.indexOf(item) !== -1),
      a = {
        ...count,
        ...t
      };
    for (let resolvedValue of filtered) {
      let r = j(count[resolvedValue], t[resolvedValue]);
      if (!r.valid) return {
        valid: false
      };
      a[resolvedValue] = r.data;
    }
    return {
      valid: true,
      data: a
    };
  }
  if (n === arrayToEnum.array && r === arrayToEnum.array) {
    if (count.length !== t.length) return {
      valid: false
    };
    let emptyItems = [];
    for (let r = 0; r < count.length; r++) {
      let i = count[r],
        a = t[r],
        o = j(i, a);
      if (!o.valid) return {
        valid: false
      };
      emptyItems.push(o.data);
    }
    return {
      valid: true,
      data: emptyItems
    };
  }
  return n === arrayToEnum.date && r === arrayToEnum.date && +count == +t ? {
    valid: true,
    data: count
  } : {
    valid: false
  };
}
var M = class extends b {
  _parse(state) {
    let {
        status: t,
        ctx: n
      } = this._processInputParams(state),
      r = (e, r) => {
        if (ie(e) || ie(r)) return p;
        let i = j(e.value, r.value);
        return i.valid ? ((ae(e) || ae(r)) && t.dirty(), {
          status: t.value,
          value: i.data
        }) : (d(n, {
          code: arrayToEnumResult.invalid_intersection_types
        }), p);
      };
    return n.common.async ? Promise.all([this._def.left._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    })]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
};
M.create = (e, t, n) => new M({
  left: e,
  right: t,
  typeName: q.ZodIntersection,
  ...y(n)
});
var N = class e extends b {
  _parse(e) {
    let {
      status: t,
      ctx: n
    } = this._processInputParams(e);
    if (n.parsedType !== arrayToEnum.array) return d(n, {
      code: arrayToEnumResult.invalid_type,
      expected: arrayToEnum.array,
      received: n.parsedType
    }), p;
    if (n.data.length < this._def.items.length) return d(n, {
      code: arrayToEnumResult.too_small,
      minimum: this._def.items.length,
      inclusive: true,
      exact: false,
      type: `array`
    }), p;
    !this._def.rest && n.data.length > this._def.items.length && (d(n, {
      code: arrayToEnumResult.too_big,
      maximum: this._def.items.length,
      inclusive: true,
      exact: false,
      type: `array`
    }), t.dirty());
    let filtered = [...n.data].map((item, t) => {
      let fallbackValue = this._def.items[t] || this._def.rest;
      return fallbackValue ? fallbackValue._parse(new v(n, item, n.path, t)) : null;
    }).filter(item => !!item);
    return n.common.async ? Promise.all(filtered).then(result => f.mergeArray(t, result)) : f.mergeArray(t, filtered);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new e({
      ...this._def,
      rest: t
    });
  }
};
N.create = (e, t) => {
  if (!Array.isArray(e)) throw Error(`You must pass an array of schemas to z.tuple([ ... ])`);
  return new N({
    items: e,
    typeName: q.ZodTuple,
    rest: null,
    ...y(t)
  });
};
var Be = class e extends b {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let {
        status: t,
        ctx: n
      } = this._processInputParams(e);
      if (n.parsedType !== arrayToEnum.object) return d(n, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.object,
        received: n.parsedType
      }), p;
      let emptyItems = [],
        keyType = this._def.keyType,
        valueType = this._def.valueType;
      for (let value in n.data) emptyItems.push({
        key: keyType._parse(new v(n, value, n.path, value)),
        value: valueType._parse(new v(n, n.data[value], n.path, value)),
        alwaysSet: value in n.data
      });
      return n.common.async ? f.mergeObjectAsync(t, emptyItems) : f.mergeObjectSync(t, emptyItems);
    }
    get element() {
      return this._def.valueType;
    }
    static create(createValue, createInput, r) {
      return createInput instanceof b ? new e({
        keyType: createValue,
        valueType: createInput,
        typeName: q.ZodRecord,
        ...y(r)
      }) : new e({
        keyType: x.create(),
        valueType: createValue,
        typeName: q.ZodRecord,
        ...y(createInput)
      });
    }
  },
  P = class extends b {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let {
        status: t,
        ctx: n
      } = this._processInputParams(e);
      if (n.parsedType !== arrayToEnum.map) return d(n, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.map,
        received: n.parsedType
      }), p;
      let keyType = this._def.keyType,
        valueType = this._def.valueType,
        mapped = [...n.data.entries()].map(([e, t], item) => ({
          key: keyType._parse(new v(n, e, n.path, [item, `key`])),
          value: valueType._parse(new v(n, t, n.path, [item, `value`]))
        }));
      if (n.common.async) {
        let e = new Map();
        return Promise.resolve().then(async () => {
          for (let resolvedValue of mapped) {
            let r = await resolvedValue.key,
              i = await resolvedValue.value;
            if (r.status === `aborted` || i.status === `aborted`) return p;
            (r.status === `dirty` || i.status === `dirty`) && t.dirty(), e.set(r.value, i.value);
          }
          return {
            status: t.value,
            value: e
          };
        });
      }
      {
        let e = new Map();
        for (let resolvedValue of mapped) {
          let r = resolvedValue.key,
            i = resolvedValue.value;
          if (r.status === `aborted` || i.status === `aborted`) return p;
          (r.status === `dirty` || i.status === `dirty`) && t.dirty(), e.set(r.value, i.value);
        }
        return {
          status: t.value,
          value: e
        };
      }
    }
  };
P.create = (e, t, n) => new P({
  valueType: t,
  keyType: e,
  typeName: q.ZodMap,
  ...y(n)
});
var F = class e extends b {
  _parse(e) {
    let {
      status: t,
      ctx: n
    } = this._processInputParams(e);
    if (n.parsedType !== arrayToEnum.set) return d(n, {
      code: arrayToEnumResult.invalid_type,
      expected: arrayToEnum.set,
      received: n.parsedType
    }), p;
    let _def = this._def;
    _def.minSize !== null && n.data.size < _def.minSize.value && (d(n, {
      code: arrayToEnumResult.too_small,
      minimum: _def.minSize.value,
      type: `set`,
      inclusive: true,
      exact: false,
      message: _def.minSize.message
    }), t.dirty()), _def.maxSize !== null && n.data.size > _def.maxSize.value && (d(n, {
      code: arrayToEnumResult.too_big,
      maximum: _def.maxSize.value,
      type: `set`,
      inclusive: true,
      exact: false,
      message: _def.maxSize.message
    }), t.dirty());
    let valueType = this._def.valueType;
    function a(e) {
      let n = new Set();
      for (let r of e) {
        if (r.status === `aborted`) return p;
        r.status === `dirty` && t.dirty(), n.add(r.value);
      }
      return {
        status: t.value,
        value: n
      };
    }
    let mapped = [...n.data.values()].map((item, t) => valueType._parse(new v(n, item, n.path, t)));
    return n.common.async ? Promise.all(mapped).then(result => a(result)) : a(mapped);
  }
  min(t, n) {
    return new e({
      ...this._def,
      minSize: {
        value: t,
        message: _.toString(n)
      }
    });
  }
  max(t, n) {
    return new e({
      ...this._def,
      maxSize: {
        value: t,
        message: _.toString(n)
      }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(nonempty) {
    return this.min(1, nonempty);
  }
};
F.create = (e, t) => new F({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: q.ZodSet,
  ...y(t)
});
var Ve = class e extends b {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      let {
        ctx: t
      } = this._processInputParams(e);
      if (t.parsedType !== arrayToEnum.function) return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.function,
        received: t.parsedType
      }), p;
      function n(e, n) {
        return ne({
          data: e,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, te(), u].filter(item => !!item),
          issueData: {
            code: arrayToEnumResult.invalid_arguments,
            argumentsError: n
          }
        });
      }
      function r(e, n) {
        return ne({
          data: e,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, te(), u].filter(item => !!item),
          issueData: {
            code: arrayToEnumResult.invalid_return_type,
            returnTypeError: n
          }
        });
      }
      let i = {
          errorMap: t.common.contextualErrorMap
        },
        a = t.data;
      if (this._def.returns instanceof B) {
        let e = this;
        return m(async function (...t) {
          let o = new l([]),
            s = await e._def.args.parseAsync(t, i).catch(err => {
              throw o.addIssue(n(t, err)), o;
            }),
            c = await Reflect.apply(a, this, s);
          return await e._def.returns._def.type.parseAsync(c, i).catch(err => {
            throw o.addIssue(r(c, err)), o;
          });
        });
      }
      {
        let e = this;
        return m(function (...t) {
          let safeParse = e._def.args.safeParse(t, i);
          if (!safeParse.success) throw new l([n(t, safeParse.error)]);
          let s = Reflect.apply(a, this, safeParse.data),
            safeParseResult = e._def.returns.safeParse(s, i);
          if (!safeParseResult.success) throw new l([r(s, safeParseResult.error)]);
          return safeParseResult.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new e({
        ...this._def,
        args: N.create(t).rest(w.create())
      });
    }
    returns(returns) {
      return new e({
        ...this._def,
        returns: returns
      });
    }
    implement(implement) {
      return this.parse(implement);
    }
    strictImplement(strict) {
      return this.parse(strict);
    }
    static create(createValue, createInput, r) {
      return new e({
        args: createValue || N.create([]).rest(w.create()),
        returns: createInput || w.create(),
        typeName: q.ZodFunction,
        ...y(r)
      });
    }
  },
  I = class extends b {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let {
        ctx: t
      } = this._processInputParams(e);
      return this._def.getter()._parse({
        data: t.data,
        path: t.path,
        parent: t
      });
    }
  };
I.create = (e, t) => new I({
  getter: e,
  typeName: q.ZodLazy,
  ...y(t)
});
var L = class extends b {
  _parse(e) {
    if (e.data !== this._def.value) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        received: t.data,
        code: arrayToEnumResult.invalid_literal,
        expected: this._def.value
      }), p;
    }
    return {
      status: `valid`,
      value: e.data
    };
  }
  get value() {
    return this._def.value;
  }
};
L.create = (e, t) => new L({
  value: e,
  typeName: q.ZodLiteral,
  ...y(t)
});
function He(e, t) {
  return new R({
    values: e,
    typeName: q.ZodEnum,
    ...y(t)
  });
}
var R = class e extends b {
  _parse(e) {
    if (typeof e.data != `string`) {
      let t = this._getOrReturnCtx(e),
        values = this._def.values;
      return d(t, {
        expected: payload.joinValues(values),
        received: t.parsedType,
        code: arrayToEnumResult.invalid_type
      }), p;
    }
    if (this._cache ||= new Set(this._def.values), !this._cache.has(e.data)) {
      let t = this._getOrReturnCtx(e),
        values = this._def.values;
      return d(t, {
        received: t.data,
        code: arrayToEnumResult.invalid_enum_value,
        options: values
      }), p;
    }
    return m(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    let e = {};
    for (let value of this._def.values) e[value] = value;
    return e;
  }
  get Values() {
    let e = {};
    for (let value of this._def.values) e[value] = value;
    return e;
  }
  get Enum() {
    let e = {};
    for (let value of this._def.values) e[value] = value;
    return e;
  }
  extract(extract, n = this._def) {
    return e.create(extract, {
      ...this._def,
      ...n
    });
  }
  exclude(items, n = this._def) {
    return e.create(this.options.filter(item => !items.includes(item)), {
      ...this._def,
      ...n
    });
  }
};
R.create = He;
var z = class extends b {
  _parse(e) {
    let validEnumValues = payload.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(e);
    if (n.parsedType !== arrayToEnum.string && n.parsedType !== arrayToEnum.number) {
      let objectValues = payload.objectValues(validEnumValues);
      return d(n, {
        expected: payload.joinValues(objectValues),
        received: n.parsedType,
        code: arrayToEnumResult.invalid_type
      }), p;
    }
    if (this._cache ||= new Set(payload.getValidEnumValues(this._def.values)), !this._cache.has(e.data)) {
      let objectValues = payload.objectValues(validEnumValues);
      return d(n, {
        received: n.data,
        code: arrayToEnumResult.invalid_enum_value,
        options: objectValues
      }), p;
    }
    return m(e.data);
  }
  get enum() {
    return this._def.values;
  }
};
z.create = (e, t) => new z({
  values: e,
  typeName: q.ZodNativeEnum,
  ...y(t)
});
var B = class extends b {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    let {
      ctx: t
    } = this._processInputParams(e);
    return t.parsedType !== arrayToEnum.promise && t.common.async === false ? (d(t, {
      code: arrayToEnumResult.invalid_type,
      expected: arrayToEnum.promise,
      received: t.parsedType
    }), p) : m((t.parsedType === arrayToEnum.promise ? t.data : Promise.resolve(t.data)).then(result => this._def.type.parseAsync(result, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
};
B.create = (e, t) => new B({
  type: e,
  typeName: q.ZodPromise,
  ...y(t)
});
var V = class extends b {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === q.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(state) {
    let {
        status: t,
        ctx: n
      } = this._processInputParams(state),
      fallbackValue = this._def.effect || null,
      a = {
        addIssue: e => {
          d(n, e), e.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return n.path;
        }
      };
    if (a.addIssue = a.addIssue.bind(a), fallbackValue.type === `preprocess`) {
      let transform = fallbackValue.transform(n.data, a);
      if (n.common.async) return Promise.resolve(transform).then(async result => {
        if (t.value === `aborted`) return p;
        let r = await this._def.schema._parseAsync({
          data: result,
          path: n.path,
          parent: n
        });
        return r.status === `aborted` ? p : r.status === `dirty` || t.value === `dirty` ? re(r.value) : r;
      });
      {
        if (t.value === `aborted`) return p;
        let r = this._def.schema._parseSync({
          data: transform,
          path: n.path,
          parent: n
        });
        return r.status === `aborted` ? p : r.status === `dirty` || t.value === `dirty` ? re(r.value) : r;
      }
    }
    if (fallbackValue.type === `refinement`) {
      let e = e => {
        let refinement = fallbackValue.refinement(e, a);
        if (n.common.async) return Promise.resolve(refinement);
        if (refinement instanceof Promise) throw Error(`Async refinement encountered during synchronous parse operation. Use .parseAsync instead.`);
        return e;
      };
      if (n.common.async === false) {
        let r = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return r.status === `aborted` ? p : (r.status === `dirty` && t.dirty(), e(r.value), {
          status: t.value,
          value: r.value
        });
      }
      return this._def.schema._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }).then(result => result.status === `aborted` ? p : (result.status === `dirty` && t.dirty(), e(result.value).then(() => ({
        status: t.value,
        value: result.value
      }))));
    }
    if (fallbackValue.type === `transform`) {
      if (n.common.async === false) {
        let e = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!h(e)) return p;
        let transform = fallbackValue.transform(e.value, a);
        if (transform instanceof Promise) throw Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        return {
          status: t.value,
          value: transform
        };
      }
      return this._def.schema._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }).then(result => h(result) ? Promise.resolve(fallbackValue.transform(result.value, a)).then(e => ({
        status: t.value,
        value: e
      })) : p);
    }
    payload.assertNever(fallbackValue);
  }
};
V.create = (e, t, n) => new V({
  schema: e,
  typeName: q.ZodEffects,
  effect: t,
  ...y(n)
}), V.createWithPreprocess = (e, t, n) => new V({
  schema: t,
  effect: {
    type: `preprocess`,
    transform: e
  },
  typeName: q.ZodEffects,
  ...y(n)
});
var H = class extends b {
  _parse(e) {
    return this._getType(e) === arrayToEnum.undefined ? m(undefined) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
H.create = (e, t) => new H({
  innerType: e,
  typeName: q.ZodOptional,
  ...y(t)
});
var U = class extends b {
  _parse(e) {
    return this._getType(e) === arrayToEnum.null ? m(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
U.create = (e, t) => new U({
  innerType: e,
  typeName: q.ZodNullable,
  ...y(t)
});
var W = class extends b {
  _parse(e) {
    let {
        ctx: t
      } = this._processInputParams(e),
      n = t.data;
    return t.parsedType === arrayToEnum.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
W.create = (e, t) => new W({
  innerType: e,
  typeName: q.ZodDefault,
  defaultValue: typeof t.default == `function` ? t.default : () => t.default,
  ...y(t)
});
var G = class extends b {
  _parse(state) {
    let {
        ctx: t
      } = this._processInputParams(state),
      n = {
        ...t,
        common: {
          ...t.common,
          issues: []
        }
      },
      r = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: {
          ...n
        }
      });
    return g(r) ? r.then(result => ({
      status: `valid`,
      value: result.status === `valid` ? result.value : this._def.catchValue({
        get error() {
          return new l(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: `valid`,
      value: r.status === `valid` ? r.value : this._def.catchValue({
        get error() {
          return new l(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
G.create = (e, t) => new G({
  innerType: e,
  typeName: q.ZodCatch,
  catchValue: typeof t.catch == `function` ? t.catch : () => t.catch,
  ...y(t)
});
var Ue = class extends b {
  _parse(e) {
    if (this._getType(e) !== arrayToEnum.nan) {
      let t = this._getOrReturnCtx(e);
      return d(t, {
        code: arrayToEnumResult.invalid_type,
        expected: arrayToEnum.nan,
        received: t.parsedType
      }), p;
    }
    return {
      status: `valid`,
      value: e.data
    };
  }
};
Ue.create = e => new Ue({
  typeName: q.ZodNaN,
  ...y(e)
});
var We = class extends b {
    _parse(e) {
      let {
          ctx: t
        } = this._processInputParams(e),
        n = t.data;
      return this._def.type._parse({
        data: n,
        path: t.path,
        parent: t
      });
    }
    unwrap() {
      return this._def.type;
    }
  },
  Ge = class e extends b {
    _parse(state) {
      let {
        status: t,
        ctx: n
      } = this._processInputParams(state);
      if (n.common.async) return (async () => {
        let e = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return e.status === `aborted` ? p : e.status === `dirty` ? (t.dirty(), re(e.value)) : this._def.out._parseAsync({
          data: e.value,
          path: n.path,
          parent: n
        });
      })();
      {
        let e = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return e.status === `aborted` ? p : e.status === `dirty` ? (t.dirty(), {
          status: `dirty`,
          value: e.value
        }) : this._def.out._parseSync({
          data: e.value,
          path: n.path,
          parent: n
        });
      }
    }
    static create(createValue, createInput) {
      return new e({
        in: createValue,
        out: createInput,
        typeName: q.ZodPipeline
      });
    }
  },
  K = class extends b {
    _parse(state) {
      let t = this._def.innerType._parse(state),
        n = e => (h(e) && (e.value = Object.freeze(e.value)), e);
      return g(t) ? t.then(result => n(result)) : n(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
K.create = (e, t) => new K({
  innerType: e,
  typeName: q.ZodReadonly,
  ...y(t)
}), O.lazycreate;
var q;
(function (e) {
  e.ZodString = `ZodString`, e.ZodNumber = `ZodNumber`, e.ZodNaN = `ZodNaN`, e.ZodBigInt = `ZodBigInt`, e.ZodBoolean = `ZodBoolean`, e.ZodDate = `ZodDate`, e.ZodSymbol = `ZodSymbol`, e.ZodUndefined = `ZodUndefined`, e.ZodNull = `ZodNull`, e.ZodAny = `ZodAny`, e.ZodUnknown = `ZodUnknown`, e.ZodNever = `ZodNever`, e.ZodVoid = `ZodVoid`, e.ZodArray = `ZodArray`, e.ZodObject = `ZodObject`, e.ZodUnion = `ZodUnion`, e.ZodDiscriminatedUnion = `ZodDiscriminatedUnion`, e.ZodIntersection = `ZodIntersection`, e.ZodTuple = `ZodTuple`, e.ZodRecord = `ZodRecord`, e.ZodMap = `ZodMap`, e.ZodSet = `ZodSet`, e.ZodFunction = `ZodFunction`, e.ZodLazy = `ZodLazy`, e.ZodLiteral = `ZodLiteral`, e.ZodEnum = `ZodEnum`, e.ZodEffects = `ZodEffects`, e.ZodNativeEnum = `ZodNativeEnum`, e.ZodOptional = `ZodOptional`, e.ZodNullable = `ZodNullable`, e.ZodDefault = `ZodDefault`, e.ZodCatch = `ZodCatch`, e.ZodPromise = `ZodPromise`, e.ZodBranded = `ZodBranded`, e.ZodPipeline = `ZodPipeline`, e.ZodReadonly = `ZodReadonly`;
})(q ||= {});
var create = x.create,
  Ke = Me.create;
Ue.create, Ne.create;
var Y = Pe.create;
Fe.create, Ie.create, S.create, C.create, Le.create, w.create, T.create, Re.create;
var qe = E.create,
  Je = O.create;
O.strictCreate;
var Ye = k.create,
  Xe = ze.create;
M.create, N.create, Be.create, P.create, F.create, Ve.create, I.create;
var Ze = L.create,
  Qe = R.create;
z.create, B.create, V.create, H.create, U.create, V.createWithPreprocess, Ge.create;
var $e = create().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  et = qe(Ke().int().min(0).max(6)),
  transform = Je({
    enabled: Y(),
    mode: Qe([`selected`, `all`]).default(`selected`),
    rules: qe(Je({
      id: create().min(1).max(100),
      enabled: Y(),
      type: Qe([`record`, `exclude`]),
      days: et.min(1).max(7),
      anchorMonday: create().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      secondWeekDays: et.max(7).optional(),
      allDay: Y().optional(),
      start: $e,
      end: $e
    }).refine(e => e.allDay || e.start !== e.end, `开始和结束时间不能相同`)).max(51)
  }).transform(options => {
    if (options.mode !== `all`) return {
      ...options,
      mode: `selected`
    };
    let t = [...options.rules];
    if (!t.some(item => item.enabled && item.type === `record` && item.allDay && new Set(item.days).size === 7)) {
      let e = `legacy-all-day`;
      for (; t.some(item => item.id === e);) e += `-`;
      t.unshift({
        id: e,
        enabled: true,
        type: `record`,
        days: [0, 1, 2, 3, 4, 5, 6],
        allDay: true,
        start: `00:00`,
        end: `00:00`
      });
    }
    return {
      ...options,
      mode: `selected`,
      rules: t
    };
  }),
  options = {
    enabled: false,
    mode: `selected`,
    rules: []
  },
  rt = 6048e5;
function it(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate() - (e.getDay() + 6) % 7);
}
function at(e) {
  let t = it(e);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, `0`)}-${String(t.getDate()).padStart(2, `0`)}`;
}
function ot(e, t) {
  if (!e.anchorMonday || !e.secondWeekDays) return e.days;
  let [n, r, i] = e.anchorMonday.split(`-`).map(Number),
    date = new Date(n, r - 1, i);
  return Number.isNaN(date.getTime()) || Math.round((it(t).getTime() - it(date).getTime()) / rt) % 2 == 0 ? e.days : e.secondWeekDays;
}
function X(e, t) {
  return ot(e, t).includes(t.getDay());
}
function st(items, t = new Date()) {
  if (!items.enabled) return true;
  let filtered = items.rules.filter(options => options.enabled),
    r = filtered.some(item => item.type === `record`),
    i = t.getHours() * 60 + t.getMinutes(),
    date = new Date(t.getFullYear(), t.getMonth(), t.getDate() - 1),
    o = e => Number(e.slice(0, 2)) * 60 + Number(e.slice(3)),
    s = filtered.filter(item => {
      if (item.allDay) return X(item, t);
      let n = o(item.start),
        r = o(item.end);
      return n < r ? X(item, t) && i >= n && i < r : X(item, t) && i >= n || X(item, date) && i < r;
    });
  return !s.some(item => item.type === `exclude`) && (!r || s.some(item => item.type === `record`));
}
function ct(items, t = new Date()) {
  if (!items.enabled) return null;
  let n = st(items, t),
    r = new Set();
  for (let n = -1; n <= 15; n++) {
    let date = new Date(t.getFullYear(), t.getMonth(), t.getDate() + n);
    for (let resolvedValue of items.rules) if (resolvedValue.enabled && X(resolvedValue, date)) for (let [e, a] of [[resolvedValue.allDay ? `00:00` : resolvedValue.start, 0], [resolvedValue.allDay ? `00:00` : resolvedValue.end, resolvedValue.allDay || resolvedValue.end < resolvedValue.start ? 1 : 0]]) {
      let n = new Date(date.getFullYear(), date.getMonth(), date.getDate() + a, Number(e.slice(0, 2)), Number(e.slice(3)));
      n.getTime() > t.getTime() && r.add(n.getTime());
    }
  }
  for (let value of [...r].sort((left, right) => left - right)) if (st(items, new Date(value)) !== n) return new Date(value);
  return null;
}
var lt = [2, 3, 4, 5, 6],
  ut = [`today`, `week`, `month`],
  dt = [`graphite`, `slate`, `silver`, `forest`, `cocoa`, `ivory`],
  ft = [`¥`, `$`, `€`, `£`, `HK$`, `NT$`, `₩`, `RM`],
  pt = 1e8;
function mt(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, `0`)}-${String(e.getDate()).padStart(2, `0`)}`;
}
var ht = {
    salaryMode: `monthly`,
    salaryAmount: 1e4,
    monthBasis: `standard`,
    customMonthDays: 22,
    currency: `¥`,
    decimals: 3,
    startTime: `09:00`,
    endTime: `18:00`,
    lunchEnabled: true,
    lunchStart: `12:00`,
    lunchEnd: `13:00`,
    weekPattern: `double`,
    bigWeekMonday: ``,
    overtime: `stop`,
    customOvertimeFactor: 3,
    payday: 10,
    countdownShown: `weekend`,
    countdowns: [],
    wishes: [],
    activeWishId: ``,
    expanded: true,
    alwaysOnTop: true,
    opacity: 100,
    size: `medium`,
    finish: `graphite`,
    earnedRange: `today`,
    locked: false,
    clickThrough: false,
    amountHidden: false,
    hideShortcut: ``,
    celebrate: true,
    celebrateAmount: 50,
    notifyOffWork: true
  },
  gt = /^([01]\d|2[0-3]):[0-5]\d$/,
  _t = /^\d{4}-\d{2}-\d{2}$/;
function Z(e, t) {
  return typeof e == `string` && gt.test(e) ? e : t;
}
function vt(text, t) {
  if (typeof text != `string` || !_t.test(text)) return t;
  let [n, r, i] = text.split(`-`).map(Number),
    date = new Date(n, r - 1, i);
  return date.getFullYear() === n && date.getMonth() === r - 1 && date.getDate() === i ? text : t;
}
function yt(e, t) {
  return typeof e != `number` || !Number.isFinite(e) || e < 0 ? t : Math.min(Math.round(e * 100) / 100, pt);
}
function bt(e, t) {
  return typeof e != `number` || !Number.isFinite(e) || e < 1 || e > 31 ? t : Math.round(e * 10) / 10;
}
var xt = .1;
function St(e, t) {
  return typeof e != `number` || !Number.isFinite(e) || e < .1 || e > 10 ? t : Math.round(e * 100) / 100;
}
function Ct(e, t) {
  if (typeof e != `number` || !Number.isFinite(e)) return t;
  let n = Math.round(e * 100) / 100;
  return n > 0 && n <= 1e8 ? n : t;
}
function wt(text) {
  return typeof text == `string` ? Array.from(text.trim()).slice(0, 24).join(``) : ``;
}
function Q(e) {
  return typeof e == `string` && /^[\w-]{1,64}$/.test(e) ? e : ``;
}
function $(e, items, n) {
  return items.includes(e) ? e : n;
}
function Tt(row) {
  if (!Array.isArray(row)) return [];
  let t = new Set(),
    n = mt(new Date()),
    emptyItems = [];
  for (let i of row) {
    if (!i || typeof i != `object`) continue;
    let e = i,
      a = Q(e.id),
      o = wt(e.name),
      s = yt(e.amount, 0);
    if (!(!a || t.has(a) || !o || s <= 0) && (t.add(a), emptyItems.push({
      id: a,
      name: o,
      amount: s,
      savedAmount: yt(e.savedAmount, 0),
      startDate: vt(e.startDate, n),
      createdAt: typeof e.createdAt == `string` ? e.createdAt.slice(0, 40) : ``,
      completedAt: typeof e.completedAt == `string` ? e.completedAt.slice(0, 40) : ``
    }), emptyItems.length >= 20)) break;
  }
  return emptyItems;
}
function Et(e) {
  if (!Array.isArray(e)) return [];
  let t = new Set(),
    emptyItems = [];
  for (let r of e) {
    if (!r || typeof r != `object`) continue;
    let e = r,
      i = Q(e.id),
      a = wt(e.name),
      o = vt(e.date, ``);
    if (i && !t.has(i) && a && o && (t.add(i), emptyItems.push({
      id: i,
      name: a,
      date: o
    }), emptyItems.length >= 20)) break;
  }
  return emptyItems;
}
function Dt(e) {
  let t = ht,
    n = e && typeof e == `object` ? e : {},
    r = Et(n.countdowns),
    i = Tt(n.wishes),
    a = typeof n.countdownShown == `string` ? n.countdownShown : t.countdownShown,
    o = a === `none` || a === `weekend` || a === `payday` || a.startsWith(`custom:`) && r.some(item => `custom:${item.id}` === a) ? a : t.countdownShown,
    s = Q(n.activeWishId),
    c = typeof n.opacity == `number` && Number.isFinite(n.opacity) ? Math.min(100, Math.max(40, Math.round(n.opacity))) : t.opacity,
    l = typeof n.payday == `number` && Number.isInteger(n.payday) && n.payday >= 1 && n.payday <= 31 ? n.payday : t.payday,
    u = e => typeof n[e] == `boolean` ? n[e] : t[e];
  return {
    salaryMode: $(n.salaryMode, [`monthly`, `daily`, `hourly`], t.salaryMode),
    salaryAmount: yt(n.salaryAmount, t.salaryAmount),
    monthBasis: $(n.monthBasis, [`standard`, `actual`, `custom`], t.monthBasis),
    customMonthDays: bt(n.customMonthDays, t.customMonthDays),
    currency: typeof n.currency == `string` && ft.includes(n.currency) ? n.currency : t.currency,
    decimals: lt.includes(n.decimals) ? n.decimals : t.decimals,
    startTime: Z(n.startTime, t.startTime),
    endTime: Z(n.endTime, t.endTime),
    lunchEnabled: u(`lunchEnabled`),
    lunchStart: Z(n.lunchStart, t.lunchStart),
    lunchEnd: Z(n.lunchEnd, t.lunchEnd),
    weekPattern: $(n.weekPattern, [`double`, `single`, `alternate`], t.weekPattern),
    bigWeekMonday: vt(n.bigWeekMonday, ``),
    overtime: $(n.overtime, [`stop`, `1`, `1.5`, `2`, `custom`], t.overtime),
    customOvertimeFactor: St(n.customOvertimeFactor, t.customOvertimeFactor),
    payday: l,
    countdownShown: o,
    countdowns: r,
    wishes: i,
    activeWishId: i.some(item => item.id === s) ? s : ``,
    expanded: u(`expanded`),
    alwaysOnTop: u(`alwaysOnTop`),
    opacity: c,
    size: $(n.size, [`small`, `medium`, `large`], t.size),
    finish: $(n.finish, dt, t.finish),
    earnedRange: $(n.earnedRange, ut, t.earnedRange),
    locked: u(`locked`),
    clickThrough: u(`clickThrough`),
    amountHidden: u(`amountHidden`),
    hideShortcut: typeof n.hideShortcut == `string` ? n.hideShortcut.slice(0, 40) : t.hideShortcut,
    celebrate: u(`celebrate`),
    celebrateAmount: Ct(n.celebrateAmount, t.celebrateAmount),
    notifyOffWork: u(`notifyOffWork`)
  };
}
var Ot = {
  small: .85,
  medium: 1,
  large: 1.2
};
export { create as C, n as D, r as E, t as O, Je as S, arrayToEnumResult as T, Y as _, dt as a, Ze as b, Dt as c, st as d, ct as f, qe as g, at as h, ut as i, mt as l, transform as m, ft as n, xt as o, ot as p, lt as r, Ot as s, ht as t, options as u, Xe as v, Ye as w, Ke as x, Qe as y };