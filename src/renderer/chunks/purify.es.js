import { r as e } from "../ui/icons/lucide-icons.js";
var t = e(`bold`, [[`path`, {
    d: `M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8`,
    key: `mg9rjx`
  }]]),
  n = e(`ellipsis`, [[`circle`, {
    cx: `12`,
    cy: `12`,
    r: `1`,
    key: `41hilf`
  }], [`circle`, {
    cx: `19`,
    cy: `12`,
    r: `1`,
    key: `1wjl8i`
  }], [`circle`, {
    cx: `5`,
    cy: `12`,
    r: `1`,
    key: `1pcz8c`
  }]]),
  r = e(`list`, [[`path`, {
    d: `M3 5h.01`,
    key: `18ugdj`
  }], [`path`, {
    d: `M3 12h.01`,
    key: `nlz23k`
  }], [`path`, {
    d: `M3 19h.01`,
    key: `noohij`
  }], [`path`, {
    d: `M8 5h13`,
    key: `1pao27`
  }], [`path`, {
    d: `M8 12h13`,
    key: `1za7za`
  }], [`path`, {
    d: `M8 19h13`,
    key: `m83p4d`
  }]]);
function i(count, t) {
  (t == null || t > count.length) && (t = count.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = count[n];
  return r;
}
function a(e) {
  if (Array.isArray(e)) return e;
}
function o(e, t) {
  var n = e == null ? null : typeof Symbol < `u` && e[Symbol.iterator] || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      next,
      o,
      emptyItems = [],
      c = true,
      l = false;
    try {
      if (next = (n = n.call(e)).next, t !== 0) for (; !(c = (r = next.call(n)).done) && (emptyItems.push(r.value), emptyItems.length !== t); c = true);
    } catch (e) {
      l = true, i = e;
    } finally {
      try {
        if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return emptyItems;
  }
}
function s() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function c(e, t) {
  return a(e) || o(e, t) || l(e, t) || s();
}
function l(e, t) {
  if (e) {
    if (typeof e == `string`) return i(e, t);
    var part = {}.toString.call(e).slice(8, -1);
    return part === `Object` && e.constructor && (part = e.constructor.name), part === `Map` || part === `Set` ? Array.from(e) : part === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(part) ? i(e, t) : undefined;
  }
}
var entries = Object.entries,
  setPrototypeOf = Object.setPrototypeOf,
  isFrozen = Object.isFrozen,
  getPrototypeOf = Object.getPrototypeOf,
  getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
  freeze = Object.freeze,
  seal = Object.seal,
  create = Object.create,
  ne = typeof Reflect < `u` && Reflect,
  re = ne.apply,
  construct = ne.construct;
freeze ||= function (e) {
  return e;
}, seal ||= function (e) {
  return e;
}, re ||= function (e, t) {
  var part = [...arguments].slice(2);
  return e.apply(t, part);
}, construct ||= function (e) {
  return new e(...[...arguments].slice(1));
};
var _ = T(Array.prototype.forEach),
  ie = T(Array.prototype.lastIndexOf),
  ae = T(Array.prototype.pop),
  oe = T(Array.prototype.push),
  se = T(Array.prototype.splice),
  isArray = Array.isArray,
  ce = T(String.prototype.toLowerCase),
  le = T(String.prototype.toString),
  ue = T(String.prototype.match),
  de = T(String.prototype.replace),
  fe = T(String.prototype.indexOf),
  pe = T(String.prototype.trim),
  y = T(Number.prototype.toString),
  me = T(Boolean.prototype.toString),
  he = typeof BigInt > `u` ? null : T(BigInt.prototype.toString),
  b = typeof Symbol > `u` ? null : T(Symbol.prototype.toString),
  x = T(Object.prototype.hasOwnProperty),
  S = T(Object.prototype.toString),
  C = T(RegExp.prototype.test),
  w = E(TypeError);
function T(e) {
  return function (t) {
    t instanceof RegExp && (t.lastIndex = 0);
    var part = [...arguments].slice(1);
    return re(e, t, part);
  };
}
function E(e) {
  return function () {
    return construct(e, [...arguments]);
  };
}
function D(e, count) {
  let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ce;
  if (setPrototypeOf && setPrototypeOf(e, null), !isArray(count)) return e;
  let r = count.length;
  for (; r--;) {
    let i = count[r];
    if (typeof i == `string`) {
      let e = n(i);
      e !== i && (isFrozen(count) || (count[r] = e), i = e);
    }
    e[i] = true;
  }
  return e;
}
function ge(count) {
  for (let t = 0; t < count.length; t++) x(count, t) || (count[t] = null);
  return count;
}
function O(e) {
  let t = create(null);
  for (let r of entries(e)) {
    var n = c(r, 2);
    let i = n[0],
      a = n[1];
    x(e, i) && (t[i] = isArray(a) ? ge(a) : a && typeof a == `object` && a.constructor === Object ? O(a) : a);
  }
  return t;
}
function _e(e) {
  switch (typeof e) {
    case `string`:
      return e;
    case `number`:
      return y(e);
    case `boolean`:
      return me(e);
    case `bigint`:
      return he ? he(e) : `0`;
    case `symbol`:
      return b ? b(e) : `Symbol()`;
    case `undefined`:
      return S(e);
    case `function`:
    case `object`:
      {
        if (e === null) return S(e);
        let t = e,
          n = k(t, `toString`);
        if (typeof n == `function`) {
          let e = n(t);
          return typeof e == `string` ? e : S(e);
        }
        return S(e);
      }
    default:
      return S(e);
  }
}
function k(e, t) {
  for (; e !== null;) {
    let ownPropertyDescriptor = getOwnPropertyDescriptor(e, t);
    if (ownPropertyDescriptor) {
      if (ownPropertyDescriptor.get) return T(ownPropertyDescriptor.get);
      if (typeof ownPropertyDescriptor.value == `function`) return T(ownPropertyDescriptor.value);
    }
    e = getPrototypeOf(e);
  }
  function n() {
    return null;
  }
  return n;
}
function ve(e) {
  try {
    return C(e, ``), true;
  } catch {
    return false;
  }
}
var ye = freeze(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),
  be = freeze(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),
  xe = freeze([`feBlend`, `feColorMatrix`, `feComponentTransfer`, `feComposite`, `feConvolveMatrix`, `feDiffuseLighting`, `feDisplacementMap`, `feDistantLight`, `feDropShadow`, `feFlood`, `feFuncA`, `feFuncB`, `feFuncG`, `feFuncR`, `feGaussianBlur`, `feImage`, `feMerge`, `feMergeNode`, `feMorphology`, `feOffset`, `fePointLight`, `feSpecularLighting`, `feSpotLight`, `feTile`, `feTurbulence`]),
  Se = freeze([`animate`, `color-profile`, `cursor`, `discard`, `font-face`, `font-face-format`, `font-face-name`, `font-face-src`, `font-face-uri`, `foreignobject`, `hatch`, `hatchpath`, `mesh`, `meshgradient`, `meshpatch`, `meshrow`, `missing-glyph`, `script`, `set`, `solidcolor`, `unknown`, `use`]),
  Ce = freeze(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),
  we = freeze([`maction`, `maligngroup`, `malignmark`, `mlongdiv`, `mscarries`, `mscarry`, `msgroup`, `mstack`, `msline`, `msrow`, `semantics`, `annotation`, `annotation-xml`, `mprescripts`, `none`]),
  Te = freeze([`#text`]),
  Ee = freeze(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),
  De = freeze(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),
  Oe = freeze(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),
  ke = freeze([`xlink:href`, `xml:id`, `xlink:title`, `xml:space`, `xmlns:xlink`]),
  Ae = seal(/{{[\w\W]*|^[\w\W]*}}/g),
  je = seal(/<%[\w\W]*|^[\w\W]*%>/g),
  Me = seal(/\${[\w\W]*/g),
  Ne = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/),
  Pe = seal(/^aria-[\-\w]+$/),
  Fe = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
  Ie = seal(/^(?:\w+script|data):/i),
  Le = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  Re = seal(/^html$/i),
  ze = seal(/^[a-z][.\w]*(-[.\w]+)+$/i),
  Be = seal(/<[/\w!]/g),
  Ve = seal(/<[/\w]/g),
  He = seal(/<\/no(script|embed|frames)/i),
  Ue = seal(/\/>/i),
  options = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    entityNode: 6,
    processingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
  },
  j = [`style`, `script`, `xmp`, `iframe`, `noembed`, `noframes`, `plaintext`, `noscript`],
  We = freeze(D({}, j)),
  Ge = function () {
    let e = {};
    return _(j, t => {
      e[t] = seal(RegExp(`</` + t + `(?=[\\t\\n\\f\\r />])`, `i`));
    }), freeze(e);
  }(),
  Ke = function () {
    return typeof window > `u` ? null : window;
  },
  qe = function (e, el) {
    if (typeof e != `object` || typeof e.createPolicy != `function`) return null;
    let ownerDocument = null,
      r = `data-tt-policy-suffix`;
    el && el.hasAttribute(r) && (ownerDocument = el.getAttribute(r));
    let i = `dompurify` + (ownerDocument ? `#` + ownerDocument : ``);
    try {
      return e.createPolicy(i, {
        createHTML(e) {
          return e;
        },
        createScriptURL(script) {
          return script;
        }
      });
    } catch {
      return console.warn(`TrustedTypes policy ` + i + ` could not be created.`), null;
    }
  },
  Je = function () {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  },
  M = function (e, t, n, r) {
    return x(e, t) && isArray(e[t]) ? D(r.base ? O(r.base) : {}, e[t], r.transform) : n;
  },
  Ye = function (e, t, fn) {
    let r = x(e, t) ? e[t] : undefined;
    return r && typeof r == `object` ? O(r) : fn();
  };
function Xe() {
  let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Ke(),
    handler = e => Xe(e);
  if (handler.version = `3.4.15`, handler.removed = [], !e || !e.document || e.document.nodeType !== options.document || !e.Element) return handler.isSupported = false, handler;
  let n = e.document,
    r = n,
    currentScript = r.currentScript;
  e.DocumentFragment;
  let hTMLTemplateElement = e.HTMLTemplateElement,
    node = e.Node,
    element = e.Element,
    nodeFilter = e.NodeFilter;
  e.NamedNodeMap === undefined && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  let dOMParser = e.DOMParser,
    trustedTypes = e.trustedTypes,
    f = element.prototype,
    ee = k(f, `cloneNode`),
    te = k(f, `remove`),
    ne = k(f, `removeAttributeNode`),
    re = k(f, `nextSibling`),
    g = k(f, `childNodes`),
    y = k(f, `parentNode`),
    me = k(f, `shadowRoot`),
    he = k(f, `attributes`),
    b = node && node.prototype ? k(node.prototype, `nodeType`) : null,
    S = node && node.prototype ? k(node.prototype, `nodeName`) : null,
    T = node && node.prototype ? k(node.prototype, `ownerDocument`) : null,
    E = function (e) {
      return b ? b(e) : e.nodeType;
    },
    ge = function (e) {
      return S ? S(e) : e.nodeName;
    };
  if (typeof hTMLTemplateElement == `function`) {
    let elementResult = n.createElement(`template`);
    elementResult.content && elementResult.content.ownerDocument && (n = elementResult.content.ownerDocument);
  }
  let j,
    N = ``,
    Ze,
    Qe = false,
    $e = 0,
    et = function () {
      if ($e > 0) throw w(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`);
    },
    P = function (e) {
      et(), $e++;
      try {
        return j.createHTML(e);
      } finally {
        $e--;
      }
    },
    tt = function (e) {
      et(), $e++;
      try {
        return j.createScriptURL(e);
      } finally {
        $e--;
      }
    },
    nt = function () {
      return Qe ||= (Ze = qe(trustedTypes, currentScript), true), Ze;
    },
    rt = n,
    implementation = rt.implementation,
    createNodeIterator = rt.createNodeIterator,
    createDocumentFragment = rt.createDocumentFragment,
    getElementsByTagName = rt.getElementsByTagName,
    importNode = r.importNode,
    F = Je();
  handler.isSupported = typeof entries == `function` && typeof y == `function` && implementation && implementation.createHTMLDocument !== undefined;
  let lt = Ae,
    ut = je,
    dt = Me,
    ft = Ne,
    pt = Pe,
    mt = Ie,
    ht = Le,
    gt = ze,
    _t = Fe,
    I = null,
    vt = D({}, [...ye, ...be, ...xe, ...Ce, ...Te]),
    L = null,
    yt = D({}, [...Ee, ...De, ...Oe, ...ke]),
    R = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    })),
    bt = null,
    xt = null,
    z = Object.seal(create(null, {
      tagCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      }
    })),
    St = true,
    Ct = true,
    wt = false,
    Tt = true,
    B = false,
    V = true,
    H = false,
    Et = false,
    Dt = null,
    Ot = null,
    kt = false,
    U = false,
    At = false,
    jt = false,
    Mt = true,
    Nt = false,
    Pt = `user-content-`,
    Ft = true,
    It = false,
    W = {},
    G = null,
    Lt = D({}, `annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),
    Rt = null,
    zt = D({}, [`audio`, `video`, `img`, `source`, `image`, `track`]),
    Bt = null,
    Vt = D({}, [`alt`, `class`, `for`, `id`, `label`, `name`, `pattern`, `placeholder`, `role`, `summary`, `title`, `value`, `style`, `xmlns`]),
    Ht = `http://www.w3.org/1998/Math/MathML`,
    Ut = `http://www.w3.org/2000/svg`,
    K = `http://www.w3.org/1999/xhtml`,
    q = K,
    Wt = false,
    Gt = null,
    Kt = D({}, [Ht, Ut, K], le),
    qt = freeze([`mi`, `mo`, `mn`, `ms`, `mtext`]),
    Jt = D({}, qt),
    Yt = freeze([`annotation-xml`]),
    Xt = D({}, Yt),
    Zt = D({}, [`title`, `style`, `font`, `a`, `script`]),
    Qt = null,
    $t = [`application/xhtml+xml`, `text/html`],
    resolvedValue = null,
    Y = null,
    elementResult = n.createElement(`form`),
    tn = function (e) {
      return e instanceof RegExp || e instanceof Function;
    },
    nn = function () {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (Y && Y === e) return;
      (!e || typeof e != `object`) && (e = {}), e = O(e), Qt = $t.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? `text/html` : e.PARSER_MEDIA_TYPE, resolvedValue = Qt === `application/xhtml+xml` ? le : ce, I = M(e, `ALLOWED_TAGS`, vt, {
        transform: resolvedValue
      }), L = M(e, `ALLOWED_ATTR`, yt, {
        transform: resolvedValue
      }), Gt = M(e, `ALLOWED_NAMESPACES`, Kt, {
        transform: le
      }), Bt = M(e, `ADD_URI_SAFE_ATTR`, Vt, {
        transform: resolvedValue,
        base: Vt
      }), Rt = M(e, `ADD_DATA_URI_TAGS`, zt, {
        transform: resolvedValue,
        base: zt
      }), G = M(e, `FORBID_CONTENTS`, Lt, {
        transform: resolvedValue
      }), bt = M(e, `FORBID_TAGS`, O({}), {
        transform: resolvedValue
      }), xt = M(e, `FORBID_ATTR`, O({}), {
        transform: resolvedValue
      }), W = x(e, `USE_PROFILES`) ? e.USE_PROFILES && typeof e.USE_PROFILES == `object` ? O(e.USE_PROFILES) : e.USE_PROFILES : false, St = e.ALLOW_ARIA_ATTR !== false, Ct = e.ALLOW_DATA_ATTR !== false, wt = e.ALLOW_UNKNOWN_PROTOCOLS || false, Tt = e.ALLOW_SELF_CLOSE_IN_ATTR !== false, B = e.SAFE_FOR_TEMPLATES || false, V = e.SAFE_FOR_XML !== false, H = e.WHOLE_DOCUMENT || false, U = e.RETURN_DOM || false, At = e.RETURN_DOM_FRAGMENT || false, jt = e.RETURN_TRUSTED_TYPE || false, kt = e.FORCE_BODY || false, Mt = e.SANITIZE_DOM !== false, Nt = e.SANITIZE_NAMED_PROPS || false, Ft = e.KEEP_CONTENT !== false, It = e.IN_PLACE || false, _t = ve(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : Fe, q = typeof e.NAMESPACE == `string` ? e.NAMESPACE : K, Jt = Ye(e, `MATHML_TEXT_INTEGRATION_POINTS`, () => D({}, qt)), Xt = Ye(e, `HTML_INTEGRATION_POINTS`, () => D({}, Yt));
      let t = Ye(e, `CUSTOM_ELEMENT_HANDLING`, () => create(null));
      if (R = create(null), x(t, `tagNameCheck`) && tn(t.tagNameCheck) && (R.tagNameCheck = t.tagNameCheck), x(t, `attributeNameCheck`) && tn(t.attributeNameCheck) && (R.attributeNameCheck = t.attributeNameCheck), x(t, `allowCustomizedBuiltInElements`) && typeof t.allowCustomizedBuiltInElements == `boolean` && (R.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), seal(R), B && (Ct = false), At && (U = true), W && (I = D({}, Te), L = create(null), W.html === true && (D(I, ye), D(L, Ee)), W.svg === true && (D(I, be), D(L, De), D(L, ke)), W.svgFilters === true && (D(I, xe), D(L, De), D(L, ke)), W.mathMl === true && (D(I, Ce), D(L, Oe), D(L, ke))), z.tagCheck = null, z.attributeCheck = null, x(e, `ADD_TAGS`) && (typeof e.ADD_TAGS == `function` ? z.tagCheck = e.ADD_TAGS : isArray(e.ADD_TAGS) && (I === vt && (I = O(I)), D(I, e.ADD_TAGS, resolvedValue))), x(e, `ADD_ATTR`) && (typeof e.ADD_ATTR == `function` ? z.attributeCheck = e.ADD_ATTR : isArray(e.ADD_ATTR) && (L === yt && (L = O(L)), D(L, e.ADD_ATTR, resolvedValue))), x(e, `ADD_FORBID_CONTENTS`) && isArray(e.ADD_FORBID_CONTENTS) && (G === Lt && (G = O(G)), D(G, e.ADD_FORBID_CONTENTS, resolvedValue)), Ft && (I[`#text`] = true), H && D(I, [`html`, `head`, `body`]), I.table && (D(I, [`tbody`]), delete bt.tbody), e.TRUSTED_TYPES_POLICY) {
        if (typeof e.TRUSTED_TYPES_POLICY.createHTML != `function`) throw w(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);
        if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != `function`) throw w(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);
        let t = j;
        j = e.TRUSTED_TYPES_POLICY;
        try {
          N = P(``);
        } catch (e) {
          throw j = t, e;
        }
      } else e.TRUSTED_TYPES_POLICY === null ? (j = undefined, N = ``) : (j === undefined && (j = nt()), j && typeof N == `string` && (N = P(``)));
      freeze && freeze(e), Y = e;
    },
    rn = D({}, [...be, ...xe, ...Se]),
    an = D({}, [...Ce, ...we]),
    on = function (e, t, n) {
      return t.namespaceURI === K ? e === `svg` : t.namespaceURI === Ht ? e === `svg` && (n === `annotation-xml` || Jt[n]) : !!rn[e];
    },
    sn = function (e, t, n) {
      return t.namespaceURI === K ? e === `math` : t.namespaceURI === Ut ? e === `math` && Xt[n] : !!an[e];
    },
    cn = function (e, t, n) {
      return t.namespaceURI === Ut && !Xt[n] || t.namespaceURI === Ht && !Jt[n] ? false : !an[e] && (Zt[e] || !rn[e]);
    },
    ln = function (e) {
      let t = y(e);
      (!t || !t.tagName) && (t = {
        namespaceURI: q,
        tagName: `template`
      });
      let n = ce(e.tagName),
        r = ce(t.tagName);
      return Gt[e.namespaceURI] ? e.namespaceURI === Ut ? on(n, t, r) : e.namespaceURI === Ht ? sn(n, t, r) : e.namespaceURI === K ? cn(n, t, r) : !!(Qt === `application/xhtml+xml` && Gt[e.namespaceURI]) : false;
    },
    X = function (e) {
      oe(handler.removed, {
        element: e
      });
      try {
        y(e).removeChild(e);
      } catch {
        if (te(e), !y(e)) throw w(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`);
      }
    },
    un = function (e, t, n) {
      try {
        ne(e, t);
      } catch {
        try {
          e.removeAttribute(n);
        } catch {}
      }
    },
    dn = function (e) {
      pn(e);
      let t = g(e);
      if (t) {
        let emptyItems = [];
        _(t, t => {
          oe(emptyItems, t);
        }), _(emptyItems, e => {
          try {
            te(e);
          } catch {}
        });
      }
      let n = he(e);
      if (n) for (let t = n.length - 1; t >= 0; --t) {
        let r = n[t],
          i = r && r.name;
        typeof i == `string` && un(e, r, i);
      }
    },
    Z = function (e, el, r) {
      if (!r) try {
        r = el.getAttributeNode(e);
      } catch {
        r = null;
      }
      oe(handler.removed, {
        attribute: r || null,
        from: el
      });
      try {
        r ? ne(el, r) : el.removeAttribute(e);
      } catch {
        try {
          el.removeAttribute(e);
        } catch {}
      }
      if (e === `is`) {
        if (U || At) try {
          X(el);
        } catch {} else try {
          el.setAttribute(e, ``);
        } catch {}
      }
    },
    fn = function (e) {
      let t = he(e);
      if (t) for (let n = t.length - 1; n >= 0; --n) {
        let r = t[n],
          i = r && r.name;
        typeof i != `string` || L[resolvedValue(i)] || un(e, r, i);
      }
    },
    pn = function (e) {
      let t = [e];
      for (; t.length > 0;) {
        let e = t.pop();
        E(e) === options.element && fn(e);
        let n = g(e);
        if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
      }
    },
    mn = function (e, t) {
      return V ? e === `patchsrc` || e === `for` && t !== `label` && t !== `output` : false;
    },
    hn = function (e) {
      if (!V) return;
      let t = [e];
      for (; t.length > 0;) {
        let e = t.pop(),
          n = E(e);
        if (n === options.processingInstruction || n === options.comment && C(Ve, e.data)) {
          try {
            te(e);
          } catch {}
          continue;
        }
        if (n === options.element) {
          let t = e,
            resolvedValueResult = resolvedValue(ge(e));
          try {
            t.hasAttribute && t.hasAttribute(`patchsrc`) && t.removeAttribute(`patchsrc`), t.hasAttribute && t.hasAttribute(`for`) && mn(`for`, resolvedValueResult) && t.removeAttribute(`for`);
          } catch {}
        }
        let r = g(e);
        if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
      }
    },
    gn = function (e) {
      let length = null,
        r = null;
      if (kt) e = `<remove></remove>` + e;else {
        let t = ue(e, /^[\r\n\t ]+/);
        r = t && t[0];
      }
      Qt === `application/xhtml+xml` && q === K && (e = `<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>` + e + `</body></html>`);
      let i = j ? P(e) : e;
      if (q === K) try {
        length = new dOMParser().parseFromString(i, Qt);
      } catch {}
      if (!length || !length.documentElement) {
        length = implementation.createDocument(q, `template`, null);
        try {
          length.documentElement.innerHTML = Wt ? N : i;
        } catch {}
      }
      let fallbackValue = length.body || length.documentElement;
      return e && r && fallbackValue.insertBefore(n.createTextNode(r), fallbackValue.childNodes[0] || null), q === K ? getElementsByTagName.call(length, H ? `html` : `body`)[0] : H ? length.documentElement : fallbackValue;
    },
    _n = function (e) {
      let t = T ? T(e) : e.ownerDocument;
      return createNodeIterator.call(t || e, e, nodeFilter.SHOW_ELEMENT | nodeFilter.SHOW_COMMENT | nodeFilter.SHOW_TEXT | nodeFilter.SHOW_PROCESSING_INSTRUCTION | nodeFilter.SHOW_CDATA_SECTION, null);
    },
    vn = function (e) {
      return e = de(e, lt, ` `), e = de(e, ut, ` `), e = de(e, dt, ` `), e;
    },
    yn = function (e) {
      e.normalize();
      let t = T ? T(e) : e.ownerDocument,
        n = createNodeIterator.call(t || e, e, nodeFilter.SHOW_TEXT | nodeFilter.SHOW_COMMENT | nodeFilter.SHOW_CDATA_SECTION | nodeFilter.SHOW_PROCESSING_INSTRUCTION, null),
        nextNode = n.nextNode();
      for (; nextNode;) nextNode.data = vn(nextNode.data), nextNode = n.nextNode();
      let i = e.querySelectorAll?.call(e, `template`);
      i && _(i, e => {
        Q(e.content) && yn(e.content);
      });
    },
    bn = function (el) {
      let t = S ? S(el) : null;
      return typeof t != `string` || resolvedValue(t) !== `form` ? false : typeof el.nodeName != `string` || typeof el.textContent != `string` || typeof el.removeChild != `function` || el.attributes !== he(el) || typeof el.removeAttribute != `function` || typeof el.removeAttributeNode != `function` || typeof el.getAttributeNode != `function` || typeof el.setAttribute != `function` || typeof el.namespaceURI != `string` || typeof el.insertBefore != `function` || typeof el.hasChildNodes != `function` || el.nodeType !== b(el) || el.childNodes !== g(el);
    },
    Q = function (e) {
      if (!b || typeof e != `object` || !e) return false;
      try {
        return b(e) === options.documentFragment;
      } catch {
        return false;
      }
    },
    xn = function (e) {
      if (!b || typeof e != `object` || !e) return false;
      try {
        return typeof b(e) == `number`;
      } catch {
        return false;
      }
    };
  function $(count, n, r) {
    count.length !== 0 && _(count, e => {
      e.call(handler, n, r, Y);
    });
  }
  let Sn = function (el, t) {
      return !!(V && el.hasChildNodes() && !xn(el.firstElementChild) && C(Be, el.textContent) && C(Be, el.innerHTML) || V && el.namespaceURI === K && We[t] && (xn(el.firstElementChild) || typeof el.textContent == `string` && C(Ge[t], el.textContent)) || el.nodeType === options.processingInstruction || V && el.nodeType === options.comment && C(Ve, el.data));
    },
    Cn = function (e, t) {
      return e instanceof RegExp ? C(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
    },
    wn = function (e, t, n) {
      if (!bt[t] && An(t) && Cn(R.tagNameCheck, t)) return false;
      if (Ft && !G[t]) {
        let t = y(e),
          r = g(e);
        if (r && t) {
          let i = r.length;
          for (let a = i - 1; a >= 0; --a) {
            let i = e === n ? ee(r[a], true) : r[a];
            t.insertBefore(i, re(e));
          }
        }
      }
      return X(e), true;
    },
    Tn = function (count, t, n, r) {
      return count.length === 0 ? t : t === n || t === r ? O(t) : t;
    },
    En = function (e, t) {
      return e === t || y(e) !== null ? false : (It && pn(e), true);
    },
    Dn = function (el, n) {
      if ($(F.beforeSanitizeElements, el, null), En(el, n)) return true;
      if (bn(el)) return X(el), true;
      let resolvedValueResult = resolvedValue(ge(el));
      if (I = Tn(F.uponSanitizeElement, I, vt, Dt), $(F.uponSanitizeElement, el, {
        tagName: resolvedValueResult,
        allowedTags: I
      }), En(el, n)) return true;
      if (Sn(el, resolvedValueResult)) return X(el), true;
      if (bt[resolvedValueResult] || !(z.tagCheck instanceof Function && z.tagCheck(resolvedValueResult)) && !I[resolvedValueResult]) {
        let t = wn(el, resolvedValueResult, n);
        return t === false && $(F.afterSanitizeElements, el, null), t;
      }
      if (E(el) === options.element && !ln(el) || (resolvedValueResult === `noscript` || resolvedValueResult === `noembed` || resolvedValueResult === `noframes`) && C(He, el.innerHTML)) return X(el), true;
      if (B && el.nodeType === options.text) {
        let n = vn(el.textContent);
        el.textContent !== n && (oe(handler.removed, {
          element: el.cloneNode()
        }), el.textContent = n);
      }
      return $(F.afterSanitizeElements, el, null), false;
    },
    On = function (e, t, r) {
      if (xt[t] || mn(t, e) || Mt && (t === `id` || t === `name`) && (r in n || r in elementResult)) return false;
      let fallbackValue = L[t] || z.attributeCheck instanceof Function && z.attributeCheck(t, e);
      return Ct && C(ft, t) || St && C(pt, t) ? true : fallbackValue ? Bt[t] || C(_t, de(r, ht, ``)) || (t === `src` || t === `xlink:href` || t === `href`) && e !== `script` && fe(r, `data:`) === 0 && Rt[e] || wt && !C(mt, de(r, ht, ``)) ? true : !r : An(e) && Cn(R.tagNameCheck, e) && Cn(R.attributeNameCheck, t, e) || t === `is` && R.allowCustomizedBuiltInElements && Cn(R.tagNameCheck, r);
    },
    kn = D({}, [`annotation-xml`, `color-profile`, `font-face`, `font-face-format`, `font-face-name`, `font-face-src`, `font-face-uri`, `missing-glyph`]),
    An = function (e) {
      return !kn[ce(e)] && C(gt, e);
    },
    jn = function (e, t, n, r) {
      if (j && typeof trustedTypes == `object` && typeof trustedTypes.getAttributeType == `function` && !n) switch (trustedTypes.getAttributeType(e, t)) {
        case `TrustedHTML`:
          return P(r);
        case `TrustedScriptURL`:
          return tt(r);
      }
      return r;
    },
    Mn = function (el, t, n, r) {
      try {
        return n ? el.setAttributeNS(n, t, r) : el.setAttribute(t, r), !bn(el) || (X(el), false);
      } catch {
        return Z(t, el), false;
      }
    },
    Nn = function (e) {
      $(F.beforeSanitizeAttributes, e, null);
      let attributes = e.attributes;
      if (!attributes || bn(e)) return;
      L = Tn(F.uponSanitizeAttribute, L, yt, Ot);
      let r = {
          attrName: ``,
          attrValue: ``,
          keepAttr: true,
          allowedAttributes: L,
          forceKeepAttr: undefined
        },
        i = attributes.length,
        resolvedValueResult = resolvedValue(e.nodeName);
      for (; i--;) {
        let o = attributes[i],
          s = o.name,
          namespaceURI = o.namespaceURI,
          l = o.value,
          u = resolvedValue(s),
          d = l,
          f = s === `value` ? d : pe(d),
          ee = false;
        if (r.attrName = u, r.attrValue = f, r.keepAttr = true, r.forceKeepAttr = undefined, $(F.uponSanitizeAttribute, e, r), f = r.attrValue, Nt && (u === `id` || u === `name`) && fe(f, Pt) !== 0 && (Z(s, e, o), f = Pt + f, ee = true), V && C(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, f)) {
          Z(s, e, o);
          continue;
        }
        if (u === `attributename` && ue(f, `href`)) {
          Z(s, e, o);
          continue;
        }
        if (!r.forceKeepAttr) {
          if (!r.keepAttr) {
            Z(s, e, o);
            continue;
          }
          if (!Tt && C(Ue, f)) {
            Z(s, e, o);
            continue;
          }
          if (B && (f = vn(f)), !On(resolvedValueResult, u, f)) {
            Z(s, e, o);
            continue;
          }
          f = jn(resolvedValueResult, u, namespaceURI, f), f !== d && Mn(e, s, namespaceURI, f) && ee && ae(handler.removed);
        }
      }
      $(F.afterSanitizeAttributes, e, null);
    },
    Pn = function (e) {
      let length = null,
        n = _n(e);
      for ($(F.beforeSanitizeShadowDOM, e, null); length = n.nextNode();) if ($(F.uponSanitizeShadowNode, length, null), Dn(length, e), Nn(length), Q(length.content) && Pn(length.content), E(length) === options.element) {
        let e = me(length);
        Q(e) && (Fn(e), Pn(e));
      }
      $(F.afterSanitizeShadowDOM, e, null);
    },
    Fn = function (e) {
      let t = [{
        node: e,
        shadow: null
      }];
      for (; t.length > 0;) {
        let e = t.pop();
        if (e.shadow) {
          Pn(e.shadow);
          continue;
        }
        let n = e.node,
          r = E(n) === options.element,
          i = g(n);
        if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
          node: i[e],
          shadow: null
        });
        if (r) {
          let e = S ? S(n) : null;
          if (typeof e == `string` && resolvedValue(e) === `template`) {
            let content = n.content;
            Q(content) && t.push({
              node: content,
              shadow: null
            });
          }
        }
        if (r) {
          let e = me(n);
          Q(e) && t.push({
            node: null,
            shadow: e
          }, {
            node: e,
            shadow: null
          });
        }
      }
    };
  return handler.sanitize = function (items) {
    let n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      i = null,
      next = null,
      o = null,
      s = null;
    if (Wt = !items, Wt && (items = `<!-->`), typeof items != `string` && !xn(items) && (items = _e(items), typeof items != `string`)) throw w(`dirty is not a string, aborting`);
    if (!handler.isSupported) return items;
    Et ? (I = Dt, L = Ot) : nn(n), (F.uponSanitizeElement.length > 0 || F.uponSanitizeAttribute.length > 0) && (I = O(I)), F.uponSanitizeAttribute.length > 0 && (L = O(L)), handler.removed = [];
    let c = It && typeof items != `string` && xn(items);
    if (c) {
      hn(items);
      let t = ge(items);
      if (typeof t == `string`) {
        let resolvedValueResult = resolvedValue(t);
        if (!I[resolvedValueResult] || bt[resolvedValueResult]) throw dn(items), w(`root node is forbidden and cannot be sanitized in-place`);
      }
      if (bn(items)) throw dn(items), w(`root node is clobbered and cannot be sanitized in-place`);
      try {
        Fn(items);
      } catch (t) {
        throw dn(items), t;
      }
    } else if (xn(items)) i = gn(`<!---->`), next = i.ownerDocument.importNode(items, true), next.nodeType === options.element && next.nodeName === `BODY` || next.nodeName === `HTML` ? i = next : i.appendChild(next), Fn(i);else {
      if (!U && !B && !H && items.indexOf(`<`) === -1) return j && jt ? P(items) : items;
      if (i = gn(items), !i) return U ? null : jt ? N : ``;
    }
    i && kt && X(i.firstChild);
    let l = c ? items : i;
    try {
      let e = _n(l);
      for (; o = e.nextNode();) Dn(o, l), Nn(o), Q(o.content) && Pn(o.content);
    } catch (n) {
      throw c && (dn(items), _(handler.removed, e => {
        e.element && pn(e.element);
      })), n;
    }
    if (c) return _(handler.removed, e => {
      e.element && pn(e.element);
    }), B && yn(items), items;
    if (U) {
      if (B && yn(i), At) for (s = createDocumentFragment.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);else s = i;
      return (L.shadowroot || L.shadowrootmode) && (s = importNode.call(r, s, true)), s;
    }
    let u = H ? i.outerHTML : i.innerHTML;
    return H && I[`!doctype`] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && C(Re, i.ownerDocument.doctype.name) && (u = `<!DOCTYPE ` + i.ownerDocument.doctype.name + `>
` + u), B && (u = vn(u)), j && jt ? P(u) : u;
  }, handler.setConfig = function () {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    nn(e), Et = true, Dt = I, Ot = L;
  }, handler.clearConfig = function () {
    Y = null, Et = false, Dt = null, Ot = null, j = Ze, N = ``;
  }, handler.isValidAttribute = function (e, t, n) {
    Y || nn({});
    let resolvedValueResult = resolvedValue(e),
      i = resolvedValue(t);
    return On(resolvedValueResult, i, n);
  }, handler.addHook = function (e, t) {
    typeof t == `function` && x(F, e) && oe(F[e], t);
  }, handler.removeHook = function (e, t) {
    if (x(F, e)) {
      if (t !== undefined) {
        let n = ie(F[e], t);
        return n === -1 ? undefined : se(F[e], n, 1)[0];
      }
      return ae(F[e]);
    }
  }, handler.removeHooks = function (e) {
    x(F, e) && (F[e] = []);
  }, handler.removeAllHooks = function () {
    F = Je();
  }, handler;
}
var N = Xe();
export { t as i, r as n, n as r, N as t };