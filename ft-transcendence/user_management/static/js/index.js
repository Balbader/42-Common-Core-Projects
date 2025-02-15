// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e5, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e5;
  }
  get styleSheet() {
    let t4 = this.o;
    const s6 = this.t;
    if (e && void 0 === t4) {
      const e5 = void 0 !== s6 && 1 === s6.length;
      e5 && (t4 = o.get(s6)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s6, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e5) => {
  const o6 = 1 === t4.length ? t4[0] : e5.reduce((e6, s6, o7) => e6 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s6) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s6, o6) => {
  if (e) s6.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e5 of o6) {
    const o7 = document.createElement("style"), n4 = t.litNonce;
    void 0 !== n4 && o7.setAttribute("nonce", n4), o7.textContent = e5.cssText, s6.appendChild(o7);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e5 = "";
  for (const s6 of t5.cssRules) e5 += s6.cssText;
  return r(e5);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s6) => t4;
var u = { toAttribute(t4, s6) {
  switch (s6) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s6) {
  let i7 = t4;
  switch (s6) {
    case Boolean:
      i7 = null !== t4;
      break;
    case Number:
      i7 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i7 = JSON.parse(t4);
      } catch (t5) {
        i7 = null;
      }
  }
  return i7;
} };
var f = (t4, s6) => !i2(t4, s6);
var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ??= []).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s6 = y) {
    if (s6.state && (s6.attribute = false), this._$Ei(), this.elementProperties.set(t4, s6), !s6.noAccessor) {
      const i7 = Symbol(), r6 = this.getPropertyDescriptor(t4, i7, s6);
      void 0 !== r6 && e2(this.prototype, t4, r6);
    }
  }
  static getPropertyDescriptor(t4, s6, i7) {
    const { get: e5, set: h4 } = r2(this.prototype, t4) ?? { get() {
      return this[s6];
    }, set(t5) {
      this[s6] = t5;
    } };
    return { get() {
      return e5?.call(this);
    }, set(s7) {
      const r6 = e5?.call(this);
      h4.call(this, s7), this.requestUpdate(t4, r6, i7);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s6 = [...h(t5), ...o2(t5)];
      for (const i7 of s6) this.createProperty(i7, t5[i7]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s6 = litPropertyMetadata.get(t4);
      if (void 0 !== s6) for (const [t5, i7] of s6) this.elementProperties.set(t5, i7);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s6] of this.elementProperties) {
      const i7 = this._$Eu(t5, s6);
      void 0 !== i7 && this._$Eh.set(i7, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s6) {
    const i7 = [];
    if (Array.isArray(s6)) {
      const e5 = new Set(s6.flat(1 / 0).reverse());
      for (const s7 of e5) i7.unshift(c(s7));
    } else void 0 !== s6 && i7.push(c(s6));
    return i7;
  }
  static _$Eu(t4, s6) {
    const i7 = s6.attribute;
    return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
    for (const i7 of s6.keys()) this.hasOwnProperty(i7) && (t4.set(i7, this[i7]), delete this[i7]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s6, i7) {
    this._$AK(t4, i7);
  }
  _$EC(t4, s6) {
    const i7 = this.constructor.elementProperties.get(t4), e5 = this.constructor._$Eu(t4, i7);
    if (void 0 !== e5 && true === i7.reflect) {
      const r6 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s6, i7.type);
      this._$Em = t4, null == r6 ? this.removeAttribute(e5) : this.setAttribute(e5, r6), this._$Em = null;
    }
  }
  _$AK(t4, s6) {
    const i7 = this.constructor, e5 = i7._$Eh.get(t4);
    if (void 0 !== e5 && this._$Em !== e5) {
      const t5 = i7.getPropertyOptions(e5), r6 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e5, this[e5] = r6.fromAttribute(s6, t5.type), this._$Em = null;
    }
  }
  requestUpdate(t4, s6, i7) {
    if (void 0 !== t4) {
      if (i7 ??= this.constructor.getPropertyOptions(t4), !(i7.hasChanged ?? f)(this[t4], s6)) return;
      this.P(t4, s6, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t4, s6, i7) {
    this._$AL.has(t4) || this._$AL.set(t4, s6), true === i7.reflect && this._$Em !== t4 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t4);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t6, s7] of this._$Ep) this[t6] = s7;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s7, i7] of t5) true !== i7.wrapped || this._$AL.has(s7) || void 0 === this[s7] || this.P(s7, this[s7], i7);
    }
    let t4 = false;
    const s6 = this._$AL;
    try {
      t4 = this.shouldUpdate(s6), t4 ? (this.willUpdate(s6), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s6)) : this._$EU();
    } catch (s7) {
      throw t4 = false, this._$EU(), s7;
    }
    t4 && this._$AE(s6);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Ej &&= this._$Ej.forEach((t5) => this._$EC(t5, this[t5])), this._$EU();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var a2 = Array.isArray;
var u2 = (t4) => a2(t4) || "function" == typeof t4?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t4) => (i7, ...s6) => ({ _$litType$: t4, strings: i7, values: s6 });
var x = y2(1);
var b2 = y2(2);
var w = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var E = r3.createTreeWalker(r3, 129);
function C(t4, i7) {
  if (!Array.isArray(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i7) : i7;
}
var P = (t4, i7) => {
  const s6 = t4.length - 1, o6 = [];
  let r6, l3 = 2 === i7 ? "<svg>" : "", c4 = f2;
  for (let i8 = 0; i8 < s6; i8++) {
    const s7 = t4[i8];
    let a3, u3, d3 = -1, y3 = 0;
    for (; y3 < s7.length && (c4.lastIndex = y3, u3 = c4.exec(s7), null !== u3); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r6 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r6 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r6 = void 0);
    const x2 = c4 === m && t4[i8 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === f2 ? s7 + n3 : d3 >= 0 ? (o6.push(a3), s7.slice(0, d3) + e3 + s7.slice(d3) + h2 + x2) : s7 + h2 + (-2 === d3 ? i8 : x2);
  }
  return [C(t4, l3 + (t4[s6] || "<?>") + (2 === i7 ? "</svg>" : "")), o6];
};
var V = class _V {
  constructor({ strings: t4, _$litType$: s6 }, n4) {
    let r6;
    this.parts = [];
    let c4 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = P(t4, s6);
    if (this.el = _V.createElement(f3, n4), E.currentNode = this.el.content, 2 === s6) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = E.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(e3)) {
          const i7 = v2[a3++], s7 = r6.getAttribute(t5).split(h2), e5 = /([.?@])?(.*)/.exec(i7);
          d3.push({ type: 1, index: c4, name: e5[2], strings: s7, ctor: "." === e5[1] ? k : "?" === e5[1] ? H : "@" === e5[1] ? I : R }), r6.removeAttribute(t5);
        } else t5.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r6.removeAttribute(t5));
        if ($.test(r6.tagName)) {
          const t5 = r6.textContent.split(h2), s7 = t5.length - 1;
          if (s7 > 0) {
            r6.textContent = i3 ? i3.emptyScript : "";
            for (let i7 = 0; i7 < s7; i7++) r6.append(t5[i7], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
            r6.append(t5[s7], l2());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === o3) d3.push({ type: 2, index: c4 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r6.data.indexOf(h2, t5 + 1)); ) d3.push({ type: 7, index: c4 }), t5 += h2.length - 1;
      }
      c4++;
    }
  }
  static createElement(t4, i7) {
    const s6 = r3.createElement("template");
    return s6.innerHTML = t4, s6;
  }
};
function N(t4, i7, s6 = t4, e5) {
  if (i7 === w) return i7;
  let h4 = void 0 !== e5 ? s6._$Co?.[e5] : s6._$Cl;
  const o6 = c3(i7) ? void 0 : i7._$litDirective$;
  return h4?.constructor !== o6 && (h4?._$AO?.(false), void 0 === o6 ? h4 = void 0 : (h4 = new o6(t4), h4._$AT(t4, s6, e5)), void 0 !== e5 ? (s6._$Co ??= [])[e5] = h4 : s6._$Cl = h4), void 0 !== h4 && (i7 = N(t4, h4._$AS(t4, i7.values), h4, e5)), i7;
}
var S2 = class {
  constructor(t4, i7) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i7 }, parts: s6 } = this._$AD, e5 = (t4?.creationScope ?? r3).importNode(i7, true);
    E.currentNode = e5;
    let h4 = E.nextNode(), o6 = 0, n4 = 0, l3 = s6[0];
    for (; void 0 !== l3; ) {
      if (o6 === l3.index) {
        let i8;
        2 === l3.type ? i8 = new M(h4, h4.nextSibling, this, t4) : 1 === l3.type ? i8 = new l3.ctor(h4, l3.name, l3.strings, this, t4) : 6 === l3.type && (i8 = new L(h4, this, t4)), this._$AV.push(i8), l3 = s6[++n4];
      }
      o6 !== l3?.index && (h4 = E.nextNode(), o6++);
    }
    return E.currentNode = r3, e5;
  }
  p(t4) {
    let i7 = 0;
    for (const s6 of this._$AV) void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t4, s6, i7), i7 += s6.strings.length - 2) : s6._$AI(t4[i7])), i7++;
  }
};
var M = class _M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i7, s6, e5) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t4, this._$AB = i7, this._$AM = s6, this.options = e5, this._$Cv = e5?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i7 = this._$AM;
    return void 0 !== i7 && 11 === t4?.nodeType && (t4 = i7.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i7 = this) {
    t4 = N(this, t4, i7), c3(t4) ? t4 === T || null == t4 || "" === t4 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t4 !== this._$AH && t4 !== w && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : u2(t4) ? this.k(t4) : this._(t4);
  }
  S(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.S(t4));
  }
  _(t4) {
    this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(r3.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i7, _$litType$: s6 } = t4, e5 = "number" == typeof s6 ? this._$AC(t4) : (void 0 === s6.el && (s6.el = V.createElement(C(s6.h, s6.h[0]), this.options)), s6);
    if (this._$AH?._$AD === e5) this._$AH.p(i7);
    else {
      const t5 = new S2(e5, this), s7 = t5.u(this.options);
      t5.p(i7), this.T(s7), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i7 = A.get(t4.strings);
    return void 0 === i7 && A.set(t4.strings, i7 = new V(t4)), i7;
  }
  k(t4) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s6, e5 = 0;
    for (const h4 of t4) e5 === i7.length ? i7.push(s6 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s6 = i7[e5], s6._$AI(h4), e5++;
    e5 < i7.length && (this._$AR(s6 && s6._$AB.nextSibling, e5), i7.length = e5);
  }
  _$AR(t4 = this._$AA.nextSibling, i7) {
    for (this._$AP?.(false, true, i7); t4 && t4 !== this._$AB; ) {
      const i8 = t4.nextSibling;
      t4.remove(), t4 = i8;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var R = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i7, s6, e5, h4) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t4, this.name = i7, this._$AM = e5, this.options = h4, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T;
  }
  _$AI(t4, i7 = this, s6, e5) {
    const h4 = this.strings;
    let o6 = false;
    if (void 0 === h4) t4 = N(this, t4, i7, 0), o6 = !c3(t4) || t4 !== this._$AH && t4 !== w, o6 && (this._$AH = t4);
    else {
      const e6 = t4;
      let n4, r6;
      for (t4 = h4[0], n4 = 0; n4 < h4.length - 1; n4++) r6 = N(this, e6[s6 + n4], i7, n4), r6 === w && (r6 = this._$AH[n4]), o6 ||= !c3(r6) || r6 !== this._$AH[n4], r6 === T ? t4 = T : t4 !== T && (t4 += (r6 ?? "") + h4[n4 + 1]), this._$AH[n4] = r6;
    }
    o6 && !e5 && this.j(t4);
  }
  j(t4) {
    t4 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var k = class extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === T ? void 0 : t4;
  }
};
var H = class extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== T);
  }
};
var I = class extends R {
  constructor(t4, i7, s6, e5, h4) {
    super(t4, i7, s6, e5, h4), this.type = 5;
  }
  _$AI(t4, i7 = this) {
    if ((t4 = N(this, t4, i7, 0) ?? T) === w) return;
    const s6 = this._$AH, e5 = t4 === T && s6 !== T || t4.capture !== s6.capture || t4.once !== s6.once || t4.passive !== s6.passive, h4 = t4 !== T && (s6 === T || e5);
    e5 && this.element.removeEventListener(this.name, this, s6), h4 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var L = class {
  constructor(t4, i7, s6) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s6;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    N(this, t4);
  }
};
var Z = t2.litHtmlPolyfillSupport;
Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.4");
var j = (t4, i7, s6) => {
  const e5 = s6?.renderBefore ?? i7;
  let h4 = e5._$litPart$;
  if (void 0 === h4) {
    const t5 = s6?.renderBefore ?? null;
    e5._$litPart$ = h4 = new M(i7.insertBefore(l2(), t5), t5, void 0, s6 ?? {});
  }
  return h4._$AI(t4), h4;
};

// node_modules/lit-element/lit-element.js
var s3 = class extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t4 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t4.firstChild, t4;
  }
  update(t4) {
    const i7 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = j(i7, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return w;
  }
};
s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
var r4 = globalThis.litElementPolyfillSupport;
r4?.({ LitElement: s3 });
(globalThis.litElementVersions ??= []).push("4.0.6");

// node_modules/@lit-labs/router/routes.js
var t3 = /* @__PURE__ */ new WeakMap();
var s4 = (s6) => {
  if (((t4) => void 0 !== t4.pattern)(s6)) return s6.pattern;
  let i7 = t3.get(s6);
  return void 0 === i7 && t3.set(s6, i7 = new URLPattern({ pathname: s6.path })), i7;
};
var i4 = class {
  constructor(t4, s6, i7) {
    this.routes = [], this.o = [], this.t = {}, this.i = (t5) => {
      if (t5.routes === this) return;
      const s7 = t5.routes;
      this.o.push(s7), s7.h = this, t5.stopImmediatePropagation(), t5.onDisconnect = () => {
        this.o?.splice(this.o.indexOf(s7) >>> 0, 1);
      };
      const i8 = o4(this.t);
      void 0 !== i8 && s7.goto(i8);
    }, (this.l = t4).addController(this), this.routes = [...s6], this.fallback = i7?.fallback;
  }
  link(t4) {
    if (t4?.startsWith("/")) return t4;
    if (t4?.startsWith(".")) throw Error("Not implemented");
    return t4 ??= this.u, (this.h?.link() ?? "") + t4;
  }
  async goto(t4) {
    let i7;
    if (0 === this.routes.length && void 0 === this.fallback) i7 = t4, this.u = "", this.t = { 0: i7 };
    else {
      const e5 = this.p(t4);
      if (void 0 === e5) throw Error("No route found for " + t4);
      const h4 = s4(e5).exec({ pathname: t4 }), n4 = h4?.pathname.groups ?? {};
      if (i7 = o4(n4), "function" == typeof e5.enter && false === await e5.enter(n4)) return;
      this.v = e5, this.t = n4, this.u = void 0 === i7 ? t4 : t4.substring(0, t4.length - i7.length);
    }
    if (void 0 !== i7) for (const t5 of this.o) t5.goto(i7);
    this.l.requestUpdate();
  }
  outlet() {
    return this.v?.render?.(this.t);
  }
  get params() {
    return this.t;
  }
  p(t4) {
    const i7 = this.routes.find((i8) => s4(i8).test({ pathname: t4 }));
    return i7 || void 0 === this.fallback ? i7 : this.fallback ? { ...this.fallback, path: "/*" } : void 0;
  }
  hostConnected() {
    this.l.addEventListener(e4.eventName, this.i);
    const t4 = new e4(this);
    this.l.dispatchEvent(t4), this._ = t4.onDisconnect;
  }
  hostDisconnected() {
    this._?.(), this.h = void 0;
  }
};
var o4 = (t4) => {
  let s6;
  for (const i7 of Object.keys(t4)) /\d+/.test(i7) && (void 0 === s6 || i7 > s6) && (s6 = i7);
  return s6 && t4[s6];
};
var e4 = class _e extends Event {
  constructor(t4) {
    super(_e.eventName, { bubbles: true, composed: true, cancelable: false }), this.routes = t4;
  }
};
e4.eventName = "lit-routes-connected";

// node_modules/@lit-labs/router/router.js
var o5 = location.origin || location.protocol + "//" + location.host;
var i5 = class extends i4 {
  constructor() {
    super(...arguments), this.m = (t4) => {
      const i7 = 0 !== t4.button || t4.metaKey || t4.ctrlKey || t4.shiftKey;
      if (t4.defaultPrevented || i7) return;
      const s6 = t4.composedPath().find((t5) => "A" === t5.tagName);
      if (void 0 === s6 || "" !== s6.target || s6.hasAttribute("download") || "external" === s6.getAttribute("rel")) return;
      const n4 = s6.href;
      if ("" === n4 || n4.startsWith("mailto:")) return;
      const e5 = window.location;
      s6.origin === o5 && (t4.preventDefault(), n4 !== e5.href && (window.history.pushState({}, "", n4), this.goto(s6.pathname)));
    }, this.R = (t4) => {
      this.goto(window.location.pathname);
    };
  }
  hostConnected() {
    super.hostConnected(), window.addEventListener("click", this.m), window.addEventListener("popstate", this.R), this.goto(window.location.pathname);
  }
  hostDisconnected() {
    super.hostDisconnected(), window.removeEventListener("click", this.m), window.removeEventListener("popstate", this.R);
  }
};

// node_modules/@lit/task/task.js
var i6 = Symbol();
var h3 = class {
  get taskComplete() {
    return this.t || (1 === this.i ? this.t = new Promise((t4, s6) => {
      this.o = t4, this.h = s6;
    }) : 3 === this.i ? this.t = Promise.reject(this.l) : this.t = Promise.resolve(this.u)), this.t;
  }
  constructor(t4, s6, i7) {
    this.p = 0, this.i = 0, (this._ = t4).addController(this);
    const h4 = "object" == typeof s6 ? s6 : { task: s6, args: i7 };
    this.v = h4.task, this.j = h4.args, this.m = h4.argsEqual ?? r5, this.k = h4.onComplete, this.A = h4.onError, this.autoRun = h4.autoRun ?? true, "initialValue" in h4 && (this.u = h4.initialValue, this.i = 2, this.O = this.T?.());
  }
  hostUpdate() {
    true === this.autoRun && this.S();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this.S();
  }
  T() {
    if (void 0 === this.j) return;
    const t4 = this.j();
    if (!Array.isArray(t4)) throw Error("The args function must return an array");
    return t4;
  }
  async S() {
    const t4 = this.T(), s6 = this.O;
    this.O = t4, t4 === s6 || void 0 === t4 || void 0 !== s6 && this.m(s6, t4) || await this.run(t4);
  }
  async run(t4) {
    let s6, h4;
    t4 ??= this.T(), this.O = t4, 1 === this.i ? this.q?.abort() : (this.t = void 0, this.o = void 0, this.h = void 0), this.i = 1, "afterUpdate" === this.autoRun ? queueMicrotask(() => this._.requestUpdate()) : this._.requestUpdate();
    const r6 = ++this.p;
    this.q = new AbortController();
    let e5 = false;
    try {
      s6 = await this.v(t4, { signal: this.q.signal });
    } catch (t5) {
      e5 = true, h4 = t5;
    }
    if (this.p === r6) {
      if (s6 === i6) this.i = 0;
      else {
        if (false === e5) {
          try {
            this.k?.(s6);
          } catch {
          }
          this.i = 2, this.o?.(s6);
        } else {
          try {
            this.A?.(h4);
          } catch {
          }
          this.i = 3, this.h?.(h4);
        }
        this.u = s6, this.l = h4;
      }
      this._.requestUpdate();
    }
  }
  abort(t4) {
    1 === this.i && this.q?.abort(t4);
  }
  get value() {
    return this.u;
  }
  get error() {
    return this.l;
  }
  get status() {
    return this.i;
  }
  render(t4) {
    switch (this.i) {
      case 0:
        return t4.initial?.();
      case 1:
        return t4.pending?.();
      case 2:
        return t4.complete?.(this.value);
      case 3:
        return t4.error?.(this.error);
      default:
        throw Error("Unexpected status: " + this.i);
    }
  }
};
var r5 = (s6, i7) => s6 === i7 || s6.length === i7.length && s6.every((s7, h4) => !f(s7, i7[h4]));

// src/utils/rest.js
import ky from "https://esm.sh/ky@1";
var rest = ky.extend({
  mode: "same-origin",
  timeout: 3e4,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          location.assign(
            "/login?next=" + encodeURIComponent(location.pathname)
          );
        }
      }
    ]
  }
});
var getMe = (options = {}) => {
  return rest.get("/user/me", options).json();
};

// src/components/dashboard/dashboard-component.js
var DashboardComponent = class extends s3 {
  static properties = {
    user: {},
    link: { type: String },
    data: { type: Array }
  };
  _userTask = new h3(this, {
    task: async ([user], { signal }) => {
      const response = await getMe({ signal });
      console.log("Ky got user:", response);
      if (response.image?.link) {
        this.link = response.image.link;
        return response;
      }
      const storedAvatar = this.getStoredAvatarSrc(response.email);
      if (storedAvatar) {
        this.link = storedAvatar;
      } else {
        const random = this.getRandomAvatarSrc();
        this.storeAvatarSrc(response.email, random);
        this.link = random;
      }
      return response;
    },
    args: () => [this.user]
  });
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  constructor() {
    super();
    this.link = "";
    this.data = [];
    this.images = [
      "https://cdn-icons-png.flaticon.com/128/8034/8034504.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034557.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034553.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034539.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034535.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034525.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034520.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034518.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034514.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034492.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034484.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034478.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034474.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034468.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034455.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034451.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034448.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034441.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034439.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034561.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034500.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034545.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034530.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034508.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034444.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034550.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034489.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034464.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034459.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034559.png"
    ];
  }
  // connectedCallback() {
  // 	super.connectedCallback();
  // 	this.fetchData();
  // }
  // async fetchData() {
  // 	try {
  // 		const response = await fetch('http://localhost:8000/api/mymodels/');
  // 		if (response.ok) {
  // 			this.data = await response.json();
  // 		} else {
  // 			console.error('Failed to fetch data');
  // 		}
  // 	} catch (error) {
  // 		console.error('Error fetching data:', error);
  // 	}
  // }
  getRandomAvatarSrc = () => {
    const randomSrc = Math.floor(Math.random() * this.images.length);
    return this.images[randomSrc];
  };
  storeAvatarSrc = (email, src) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    if (!src || typeof src !== "string") {
      throw new Error(
        "Unable to store avatar without a src, got: " + src
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    parsed[email] = src;
    const stringified = JSON.stringify(parsed);
    localStorage.setItem("avatars", stringified);
  };
  getStoredAvatarSrc = (email) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    return parsed[email] || "";
  };
  render() {
    return this._userTask.render({
      pending: () => x`<p>Loading dashboard...</p>`,
      complete: (user) => x`
				<div class="container container-fluid h-100">
					<section class="bg-light py-3 py-md-5 py-xl-8">
						<div class="container container-fluid w-100">
							<div class="row gy-4 gy-lg-0">
								<div class="col-12 col-lg-4 col-xl-3">
									<div class="row gy-4">
										<div class="col-12">
											<div
												class="card widget-card shadow-sm"
											>
												<div
													class="card-header text-bg-dark"
												>
													Hello, ${user.first_name}!
												</div>

												<div class="card-body">
													<div
														class="text-center mb-3"
													>
														<img
															src="${this.link}"
															class="img-fluid rounded-circle"
															alt="${user.login ? user.login : user.first_name}"
														/>
													</div>
													<h5
														class="text-center mb-1"
													>
														${user.login ? user.login : user.first_name + " " + user.last_name}
													</h5>
												</div>
											</div>

											<div
												class="card-header text-bg-dark mt-3"
											>
												Online Friends
											</div>
											${this.images.map(
        (img) => x`
													<div
														href="#"
														class="list-group-item list-group-item-action border-0 mt-3 shadow-sm"
													>
														<div
															class="d-flex align-items-start col-12"
														>
															<img
																src="${img}"
																class="rounded-circle mr-1"
																alt="Vanessa Tucker"
																width="40"
																height="40"
															/>
															<div
																class="flex-grow-1 ml-3"
															>
																Vanessa Tucker
																<div
																	class="small"
																>
																	<span
																		class="fas fa-circle chat-online"
																	></span>
																	Online
																</div>
															</div>
														</div>
													</div>
												`
      )}
										</div>
									</div>
								</div>

								<div class="col-12 col-lg-9 ">
									<div class="card widget-card shadow-sm">
										<div
											class="card-body container container-xxl"
										>
											<div
												class="tab-content "
												id="profileTabContent"
											>
												<div
													class="tab-pane fade show active"
													id="overview-tab-pane"
													role="tabpanel"
													aria-labelledby="overview-tab"
													tabindex="0"
												>
													<h5
														style="text-decoration: underline;"
														class="mb-3"
													>
														Let's Play Pong!
													</h5>
													<button
														type="submit"
														class="btn btn-primary mt-3"
													>
														Play With A Friend
													</button>
													<button
														type="submit"
														class="btn btn-primary mt-3"
													>
														Play Tournament
													</button>
												</div>

												<h5
													style="text-decoration: underline;"
													class="mb-3 pt-5"
												>
													My Dashboard
												</h5>
												<div class="container">
													<div
														class="row justify-content-center"
													>
														<div
															class="card widget-card border-light shadow-sm"
														>
															<div
																class="card-body p-4"
															>
																<div
																	class="table-responsive"
																>
																	<table
																		class="table table-borderless bsb-table-xl text-nowrap align-middle m-0"
																	>
																		<thead>
																			<tr>
																				<th>
																					Game
																				</th>
																				<th>
																					Date
																				</th>
																				<th>
																					Player
																					1
																				</th>
																				<th>
																					Score
																					P1
																				</th>
																				<th>
																					Player
																					2
																				</th>
																				<th>
																					Score
																					P2
																				</th>
																				<th>
																					Winner
																				</th>
																				<th>
																					Looser
																				</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#1
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						12
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						La
																						Mere
																						Noel
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						777
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>La
																						Mere
																						Noel</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>${user.first_name}</span
																					>
																				</td>
																			</tr>

																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#2
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						54
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						Le
																						Chat
																						Potte
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						125
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>Le
																						Chat
																						Potte</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>${user.first_name}</span
																					>
																				</td>
																			</tr>

																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#3
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						32
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						Sophie
																						Lacoste
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						36
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>${user.first_name}</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>Sophie</span
																					>
																				</td>
																			</tr>

																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#3
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						12
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						Shtrouphette
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						12
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>${user.first_name}</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>Tie</span
																					>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<br />

													<h5
														style="text-decoration: underline;"
														class="mb-3 pt-5"
													>
														Tournament Dashboard
													</h5>
													<div class="container">
														<div
															class="row justify-content-center"
														>
															<div
																class="card widget-card border-light shadow-sm"
															>
																<div
																	class="card-body p-4"
																>
																	<div
																		class="table-responsive"
																	>
																		<table
																			class="table table-borderless bsb-table-xl text-nowrap align-middle m-0"
																		>
																			<thead>
																				<tr>
																					<th>
																						Game
																					</th>
																					<th>
																						Date
																					</th>
																					<th>
																						Player
																						1
																					</th>
																					<th>
																						Score
																						P1
																					</th>
																					<th>
																						Player
																						2
																					</th>
																					<th>
																						Score
																						P2
																					</th>
																					<th>
																						Winner
																					</th>
																					<th>
																						Looser
																					</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#1
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							12
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							La
																							Mere
																							Noel
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							777
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>La
																							Mere
																							Noel</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>${user.first_name}</span
																						>
																					</td>
																				</tr>

																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#2
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							54
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							Le
																							Chat
																							Potte
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							125
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>Le
																							Chat
																							Potte</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>${user.first_name}</span
																						>
																					</td>
																				</tr>

																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#3
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							32
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							Sophie
																							Lacoste
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							36
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>${user.first_name}</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>Sophie</span
																						>
																					</td>
																				</tr>

																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#3
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							12
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							Shtrouphette
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							12
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>${user.first_name}</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>Tie</span
																						>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														<br />
														<h5
															style="text-decoration: underline;"
															class="mb-2 pt-3"
														>
															Profile
														</h5>
														<div
															class="card widget-card border-light shadow-sm"
														>
															<div
																class="card-body p-4 widget-card row justify-content-center"
															>
																<div
																	class="tab-content pt-2"
																	id="profileTabContent"
																>
																	<div
																		class="tab-pane fade show active"
																		id="overview-tab-pane"
																		role="tabpanel"
																		aria-labelledby="overview-tab"
																		tabindex="0"
																	>
																		<div
																			class="row g-0"
																		>
																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					First
																					Name
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.first_name}
																				</div>
																			</div>

																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					Last
																					Name
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.last_name}
																				</div>
																			</div>

																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					Username
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.login ? user.login : user.first_name + " " + user.last_name}
																				</div>
																			</div>

																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					Email
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.email}
																				</div>
																			</div>
																			<div>
																				<a
																					type="button"
																					aria-current="page"
																					class="nav-link btn btn-primary mt-3"
																					href="/app/settings"
																				>
																					Update
																					Profile
																					Info
																				</a>
																			</div>
																		</div>
																	</div>
																	<div
																		class="tab-pane fade"
																		id="profile-tab-pane"
																		role="tabpanel"
																		aria-labelledby="profile-tab"
																		tabindex="0"
																	></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			`,
      error: (e5) => x`<p>Error: ${e5}</p>`
    });
  }
};
customElements.define("dashboard-component", DashboardComponent);

// src/views/dashboard-page/dashboard-page.js
var DashboardPage = class extends s3 {
  constructor() {
    super();
  }
  render() {
    return x`
			<dashboard-component class="flex-fill"></dashboard-component>
		`;
  }
};
customElements.define("dashboard-page", DashboardPage);

// src/views/profile-page/profile-page.js
var ProfilePage = class extends s3 {
  constructor() {
    super();
  }
  render() {
    return x` <dashboard-page></dashboard-page> `;
  }
};
customElements.define("profile-page", ProfilePage);

// src/components/settings/settings-component.js
var SettingsComponent = class extends s3 {
  static properties = {
    user: {},
    link: { type: String },
    profilePicture: { type: String }
  };
  _userTask = new h3(this, {
    task: async ([user], { signal }) => {
      const response = await getMe({ signal });
      console.log("Ky got user:", response);
      if (response.image?.link) {
        this.link = response.image.link;
        return response;
      }
      const storedAvatar = this.getStoredAvatarSrc(response.email);
      if (storedAvatar) {
        this.link = storedAvatar;
      } else {
        const random = this.getRandomAvatarSrc();
        this.storeAvatarSrc(response.email, random);
        this.link = random;
      }
      return response;
    },
    args: () => [this.user]
  });
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  constructor() {
    super();
    this.link = "";
    this.profilePicture = "";
  }
  storeAvatarSrc = (email, src) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    if (!src || typeof src !== "string") {
      throw new Error(
        "Unable to store avatar without a src, got: " + src
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    parsed[email] = src;
    const stringified = JSON.stringify(parsed);
    localStorage.setItem("avatars", stringified);
  };
  getStoredAvatarSrc = (email) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    return parsed[email] || "";
  };
  render() {
    return this._userTask.render({
      pending: () => x`<p>Loading settings...</p>`,
      complete: (user) => x`
				<div class="container container-xxl h-100">
					<section class="bg-light py-3 py-md-5 py-xl-8">
						<div class="container">
							<div class="row gy-4 gy-lg-0">
								<div class="col-12 col-lg-4 col-xl-3">
									<div class="row gy-4">
										<div class="col-12">
											<div
												class="card widget-card shadow-sm"
											>
												<div
													class="card-header text-bg-dark"
												>
													Hello,
													${user.displayname ? user.displayname : user.first_name}!
												</div>

												<div class="card-body">
													<div
														class="text-center mb-3"
													>
														<img
															src="${this.link}"
															class="img-fluid rounded-circle"
															alt="${user.displayname ? user.displayname : user.first_name}"
														/>
													</div>

													<h5
														class="text-center mb-1"
													>
														${user.displayname ? user.displayname : user.first_name + " " + user.last_name}
													</h5>

													<div
														class="d-grid m-0"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-8 col-xl-9">
									<div class="card widget-card shadow-sm">
										<div class="card-body">
											<div
												class="tab-content"
												id="profileTabContent"
											>
												<div
													class="tab-pane fade show active"
													id="overview-tab-pane"
													role="tabpanel"
													aria-labelledby="overview-tab"
													tabindex="0"
												>
													<h5
														style="text-decoration: underline"
														class="mb-3 text-lg"
													>
														Settings
													</h5>
													<form
														action="#!"
														class="row gy-3 gy-xxl-4"
													>
														<div
															class="col-12 col-md-6"
														>
															<label
																for="inputFirstName"
																class="form-label"
																>First
																Name</label
															>
															<input
																type="text"
																class="form-control"
																id="inputFirstName"
																value="${user.first_name}"
															/>
														</div>

														<div
															class="col-12 col-md-6"
														>
															<label
																for="inputLastName"
																class="form-label"
																>Last
																Name</label
															>
															<input
																type="text"
																class="form-control"
																id="inputLastName"
																value="${user.last_name}"
															/>
														</div>

														<div
															class="col-12 col-md-6"
														>
															<label
																for="inputEmail"
																class="form-label"
																>Email</label
															>
															<input
																type="email"
																class="form-control"
																id="inputEmail"
																value="example@example.com"
															/>
														</div>

														<div
															class="col-12 col-md-6"
														>
															<label
																for="inputEmail"
																class="form-label"
																>Confirm
																Email</label
															>
															<input
																type="email"
																class="form-control"
																id="inputEmail"
																value="example@example.com"
															/>
														</div>

														<div class="col-12">
															<button
																type="submit"
																class="btn btn-primary"
															>
																Save Changes
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			`,
      error: (e5) => x`<p>Error: ${e5}</p>`
    });
  }
};
customElements.define("settings-component", SettingsComponent);

// src/components/friends/freinds-component.js
var FreindsComponent = class extends s3 {
  static properties = {
    user: {},
    link: { type: String }
  };
  _userTask = new h3(this, {
    task: async ([user], { signal }) => {
      const response = await getMe({ signal });
      console.log("Ky got user:", response);
      if (response.image?.link) {
        this.link = response.image.link;
        return response;
      }
      const storedAvatar = this.getStoredAvatarSrc(response.email);
      if (storedAvatar) {
        this.link = storedAvatar;
      } else {
        const random = this.getRandomAvatarSrc();
        this.storeAvatarSrc(response.email, random);
        this.link = random;
      }
      return response;
    },
    args: () => [this.user]
  });
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  constructor() {
    super();
    this.link = "";
    this.images = [
      "https://cdn-icons-png.flaticon.com/128/8034/8034504.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034557.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034553.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034539.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034535.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034525.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034520.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034518.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034514.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034492.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034484.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034478.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034474.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034468.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034455.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034451.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034448.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034441.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034439.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034561.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034500.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034545.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034530.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034508.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034444.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034550.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034489.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034464.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034459.png",
      "https://cdn-icons-png.flaticon.com/128/8034/8034559.png"
    ];
  }
  storeAvatarSrc = (email, src) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    if (!src || typeof src !== "string") {
      throw new Error(
        "Unable to store avatar without a src, got: " + src
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    parsed[email] = src;
    const stringified = JSON.stringify(parsed);
    localStorage.setItem("avatars", stringified);
  };
  getStoredAvatarSrc = (email) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    return parsed[email] || "";
  };
  render() {
    return this._userTask.render({
      pending: () => x`<p>Loading friends...</p>`,
      complete: (user) => x`
				<div class="container container-fluid h-100">
					<section class="bg-light py-3 py-md-5 py-xl-8 shadow-sm">
						<div class="container-xxl container-fluid">
							<div class="row gy-4 gy-lg-0">
								<div class="col-12 col-lg-4 col-xl-3">
									<div class="row gy-4">
										<div class="col-12">
											<div
												class="card widget-card shadow-sm"
											>
												<div
													class="card-header text-bg-dark"
												>
													Hello,
													${user.displayname ? user.displayname : user.first_name}!
													!
												</div>
												<div class="card-body">
													<div
														class="text-center mb-3"
													>
														<img
															src="${this.link}"
															class="img-fluid rounded-circle"
															alt="${user.displayname ? user.displayname : user.first_name}"
														/>
													</div>
													<div
														class="card-body border-dark shadow-sm"
													>
														<h5
															class="text-center mb-1"
														>
															${user.displayname ? user.displayname : user.first_name + " " + user.last_name}
														</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-8 col-xl-9">
									<div class="card widget-card shadow-sm p-3">
										<div class="row align-items-center">
											<div>
												<h5
													style="text-decoration: underline;"
													class=""
												>
													My Friends
												</h5>
												<!-- Bg -->
												<div class="py-6">
													<div class="row">
														${this.images.map(
        (img) => x`
																<div
																	class="col-lg-4 col-12"
																>
																	<div
																		class="card mt-5 rounded-3"
																	>
																		<div
																			class="avatar"
																		>
																			<img
																				src="${img}"
																				alt="Image"
																				class="avatar-text avatar-text-primary rounded-circle ml-3 mt-3"
																				style="width: 70px; height: 70px"
																			/>
																		</div>
																		<div
																			class="card-body d-flex justify-content-between"
																		>
																			<div>
																				<h4
																					class="mb-1"
																				>
																					Karina
																					Clark
																				</h4>
																				<span
																					>Online</span
																				>
																			</div>
																			<a
																				href="#!"
																				class="btn btn-sm btn-outline-danger"
																				style="height: 30px;"
																			>
																				Remove
																			</a>
																		</div>
																	</div>
																</div>
															`
      )}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			`,
      error: (e5) => x`<p>Error: ${e5}</p>`
    });
  }
};
customElements.define("freinds-component", FreindsComponent);

// src/components/password/password-change-component.js
var PasswordChangeComponent = class extends s3 {
  static properties = {
    user: {},
    link: { type: String }
  };
  _userTask = new h3(this, {
    task: async ([user], { signal }) => {
      const response = await getMe({ signal });
      console.log("Ky got user:", response);
      if (response.image?.link) {
        this.link = response.image.link;
        return response;
      }
      const storedAvatar = this.getStoredAvatarSrc(response.email);
      if (storedAvatar) {
        this.link = storedAvatar;
      } else {
        const random = this.getRandomAvatarSrc();
        this.storeAvatarSrc(response.email, random);
        this.link = random;
      }
      return response;
    },
    args: () => [this.user]
  });
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  constructor() {
    super();
    this.link = "";
  }
  storeAvatarSrc = (email, src) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    if (!src || typeof src !== "string") {
      throw new Error(
        "Unable to store avatar without a src, got: " + src
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    parsed[email] = src;
    const stringified = JSON.stringify(parsed);
    localStorage.setItem("avatars", stringified);
  };
  getStoredAvatarSrc = (email) => {
    if (!email || typeof email !== "string") {
      throw new Error(
        "Unable to store avatar without an email, got: " + email
      );
    }
    const avatars = localStorage.getItem("avatars");
    const parsed = avatars ? JSON.parse(avatars) : {};
    return parsed[email] || "";
  };
  render() {
    return this._userTask.render({
      pending: () => x`<p>Loading password...</p>`,
      complete: (user) => x`
				<div class="container container-fluid h-100">
					<section class="bg-light py-3 py-md-5 py-xl-8 shadow-sm">
						<div class="container-xxl container-fluid">
							<div class="row gy-4 gy-lg-0">
								<div class="col-12 col-lg-4 col-xl-3">
									<div class="row gy-4">
										<div class="col-12">
											<div
												class="card widget-card shadow-sm"
											>
												<div
													class="card-header text-bg-dark"
												>
													Hello,
													${user.displayname ? user.displayname : user.first_name}!
												</div>

												<div class="card-body">
													<div
														class="text-center mb-3"
													>
														<img
															src="${this.link ? this.link : "https://bootdey.com/img/Content/avatar/avatar1.png"}"
															class="img-fluid rounded-circle"
															alt="${user.displayname}"
														/>
													</div>

													<div
														class="card-body border-dark shadow-sm"
													>
														<h5
															class="text-center mb-1"
														>
															${user.displayname ? user.displayname : user.first_name + " " + user.last_name}
														</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-8 col-xl-9">
									<div class="card widget-card shadow-sm">
										<div class="card-body">
											<div
												class="tab-pane fade show active"
												id="overview-tab-pane"
												role="tabpanel"
												aria-labelledby="overview-tab"
												tabindex="0"
											></div>
											<h5
												style="text-decoration: underline"
												class="mb-3 text-lg"
											>
												Password Reset
											</h5>
											<form action="#!">
												<div class="row gy-3 gy-xxl-4">
													<div class="col-12">
														<label
															for="currentPassword"
															class="form-label"
															>Current
															Password</label
														>
														<input
															type="password"
															class="form-control"
															id="currentPassword"
														/>
													</div>
													<div class="col-12">
														<label
															for="newPassword"
															class="form-label"
															>New Password</label
														>
														<input
															type="password"
															class="form-control"
															id="newPassword"
														/>
													</div>
													<div class="col-12">
														<label
															for="confirmPassword"
															class="form-label"
															>Confirm
															Password</label
														>
														<input
															type="password"
															class="form-control"
															id="confirmPassword"
														/>
													</div>
													<div class="col-12">
														<button
															type="submit"
															class="btn btn-primary"
														>
															Change Password
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			`,
      error: (e5) => x`<p>Error: ${e5}</p>`
    });
  }
};
customElements.define("password-change-component", PasswordChangeComponent);

// src/views/pwd-change-page/password-change-page.js
var PasswordChangePage = class extends s3 {
  render() {
    return x`
			<password-change-component
				class="flex-fill"></password-change-component>
		`;
  }
};
customElements.define("password-change-page", PasswordChangePage);

// src/components/nav-bar/nav-bar-out.js
var NavBarOut = class extends s3 {
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  constructor() {
    super();
    this.imgPath = {
      path: "./src/components/nav-bar/nav-bar-assets/ping-pong (1).png"
    };
  }
  render() {
    return x`
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container-fluid">
					<a
						class="navbar-brand"
						href="home"
					>
						<img
							src="${this.imgPath.path}"
							alt=""
							width="70"
							height="60"
							class="d-inline-block align-text-center navbar-brand"
						/>
						FT_TRANSCENDANCE
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>

					<div
						class="collapse navbar-collapse text-bg-dark"
						id="navbarTogglerDemo02"
					>
						<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li class="nav-item pe-3">
								<a
									class="nav-link"
									aria-current="page"
									href="home"
								>
									Home
								</a>
							</li>

							<li class="nav-item pe-3">
								<a
									class="nav-link"
									aria-current="page"
									href="about"
								>
									About
								</a>
							</li>

							<li class="nav-item pe-3">
								<a
									class="nav-link"
									aria-current="page"
									href="whoWeAre"
								>
									Who We Are
								</a>
							</li>

							<li class="nav-item pe-3">
								<button
									type="button"
									aria-current="page"
									class="btn btn-outline-light"
									href="login"
								>
									Login
								</button>
							</li>

							<li class="nav-item">
								<button
									type="button"
									aria-current="page"
									class="btn btn-warning"
									href="SignUp"
								>
									SignUp
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		`;
  }
};
customElements.define("nav-bar-out", NavBarOut);

// src/components/nav-bar/nav-bar-in.js
var NavBarIn = class extends s3 {
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  constructor() {
    super();
  }
  render() {
    return x`
			<nav class="bg-dark navbar navbar-expand-lg navbar-dark">
				<div class="container-fluid pl-5">
					<div
						class="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<a class="navbar-brand mt-lg-2" href="home">
							FT_TRANSCENDENCE
						</a>
					</div>

					<div class="d-flex align-items-center">
						<ul class="navbar-nav d-flex align-items-center">
							<li class="nav-item">
								<a class="nav-link" href="/app/dashboard"
									>Dashboard</a
								>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="/app/friends"
									>Friends</a
								>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="/app/settingsPage"
									>Settings</a
								>
							</li>

							<li class="nav-item">
								<a
									class="nav-link"
									href="/app/passwordChangePage"
									>Password</a
								>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="/logout">Logout</a>
							</li>
						</ul>
					</div>
						</a>
					</div>
				</div>
			</nav>
		`;
  }
};
customElements.define("nav-bar-in", NavBarIn);

// src/components/footer/footer-out.js
var FooterOut = class extends s3 {
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  render() {
    return x`
			<footer class="bg-dark text-white text-center text-lg-start">
				<div class="text-center p-3">
					© 2020 Copyright. The Transcendance Corporation,INC.
				</div>
			</footer>
		`;
  }
};
customElements.define("footer-out", FooterOut);

// src/components/footer/footer-in.js
var FooterIn = class extends s3 {
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = i([
      Object.values(cssRules).map((rule) => rule.cssText).join("\n")
    ]);
    return [globalStyle, i``];
  }
  render() {
    return x`
			<footer
				class="bg-dark text-white text-center text-lg-start flex-shrink-0"
			>
				<div class="container container-fluid text-center p-3">
					© 2020 Copyright. The Transcendance Corporation,INC.
				</div>
			</footer>
		`;
  }
};
customElements.define("footer-in", FooterIn);

// src/index.js
var AppRoot = class extends s3 {
  router = new i5(this, [
    { path: "/app/", render: () => x`<profile-page></profile-page>` },
    {
      path: "/app/dashboard",
      render: () => x`<profile-page></profile-page>`
    },
    {
      path: "/app/friends",
      render: () => x`<freinds-component></freinds-component>`
    },
    {
      path: "/app/settingsPage",
      render: () => x`<settings-component></settings-component>`
    },
    {
      path: "/app/passwordChangePage",
      render: () => x`<password-change-page></password-change-page>`
    },
    {
      path: "/logout",
      render: () => location.href = "/logout"
    }
  ]);
  render() {
    return x`
			<nav-bar-in></nav-bar-in>
			${this.router.outlet()}
		`;
  }
};
customElements.define("app-root", AppRoot);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/router/routes.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/router/router.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/task/task.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=index.js.map
