import {
  DOCUMENT
} from "./chunk-J4JGYWXM.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-JWDLASIP.js";
import {
  Observable,
  ReplaySubject,
  Subject,
  combineLatest,
  count,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  mergeMap,
  pairwise,
  share,
  startWith,
  take,
  takeLast,
  takeUntil
} from "./chunk-4J2EDNPA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-UXQ2CSKB.js";

// node_modules/@mattlewis92/dom-autoscroller/dist/bundle.es.js
function getDef(f, d) {
  if (typeof f === "undefined") {
    return typeof d === "undefined" ? f : d;
  }
  return f;
}
function boolean(func, def) {
  func = getDef(func, def);
  if (typeof func === "function") {
    return function f() {
      var arguments$1 = arguments;
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments$1[_key];
      }
      return !!func.apply(this, args);
    };
  }
  return !!func ? function() {
    return true;
  } : function() {
    return false;
  };
}
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var isElement$1 = function(input) {
  return input != null && (typeof input === "undefined" ? "undefined" : _typeof(input)) === "object" && input.nodeType === 1 && _typeof(input.style) === "object" && _typeof(input.ownerDocument) === "object";
};
function indexOfElement(elements, element) {
  element = resolveElement(element, true);
  if (!isElement$1(element)) {
    return -1;
  }
  for (var i = 0; i < elements.length; i++) {
    if (elements[i] === element) {
      return i;
    }
  }
  return -1;
}
function hasElement(elements, element) {
  return -1 !== indexOfElement(elements, element);
}
function pushElements(elements, toAdd) {
  for (var i = 0; i < toAdd.length; i++) {
    if (!hasElement(elements, toAdd[i])) {
      elements.push(toAdd[i]);
    }
  }
  return toAdd;
}
function addElements(elements) {
  var arguments$1 = arguments;
  var toAdd = [], len = arguments.length - 1;
  while (len-- > 0) {
    toAdd[len] = arguments$1[len + 1];
  }
  toAdd = toAdd.map(resolveElement);
  return pushElements(elements, toAdd);
}
function removeElements(elements) {
  var arguments$1 = arguments;
  var toRemove = [], len = arguments.length - 1;
  while (len-- > 0) {
    toRemove[len] = arguments$1[len + 1];
  }
  return toRemove.map(resolveElement).reduce(function(last, e) {
    var index = indexOfElement(elements, e);
    if (index !== -1) {
      return last.concat(elements.splice(index, 1));
    }
    return last;
  }, []);
}
function resolveElement(element, noThrow) {
  if (typeof element === "string") {
    try {
      return document.querySelector(element);
    } catch (e) {
      throw e;
    }
  }
  if (!isElement$1(element) && !noThrow) {
    throw new TypeError(element + " is not a DOM element.");
  }
  return element;
}
function createPointCB(object, options) {
  options = options || {};
  var allowUpdate = boolean(options.allowUpdate, true);
  return function pointCB(event) {
    event = event || window.event;
    object.target = event.target || event.srcElement || event.originalTarget;
    object.element = this;
    object.type = event.type;
    if (!allowUpdate(event)) {
      return;
    }
    if (event.targetTouches) {
      object.x = event.targetTouches[0].clientX;
      object.y = event.targetTouches[0].clientY;
      object.pageX = event.targetTouches[0].pageX;
      object.pageY = event.targetTouches[0].pageY;
      object.screenX = event.targetTouches[0].screenX;
      object.screenY = event.targetTouches[0].screenY;
    } else {
      if (event.pageX === null && event.clientX !== null) {
        var eventDoc = event.target && event.target.ownerDocument || document;
        var doc = eventDoc.documentElement;
        var body = eventDoc.body;
        object.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        object.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
      } else {
        object.pageX = event.pageX;
        object.pageY = event.pageY;
      }
      object.x = event.clientX;
      object.y = event.clientY;
      object.screenX = event.screenX;
      object.screenY = event.screenY;
    }
    object.clientX = object.x;
    object.clientY = object.y;
  };
}
function createWindowRect() {
  var props = {
    top: {
      value: 0,
      enumerable: true
    },
    left: {
      value: 0,
      enumerable: true
    },
    right: {
      value: window.innerWidth,
      enumerable: true
    },
    bottom: {
      value: window.innerHeight,
      enumerable: true
    },
    width: {
      value: window.innerWidth,
      enumerable: true
    },
    height: {
      value: window.innerHeight,
      enumerable: true
    },
    x: {
      value: 0,
      enumerable: true
    },
    y: {
      value: 0,
      enumerable: true
    }
  };
  if (Object.create) {
    return Object.create({}, props);
  } else {
    var rect = {};
    Object.defineProperties(rect, props);
    return rect;
  }
}
function getClientRect(el) {
  if (el === window) {
    return createWindowRect();
  } else {
    try {
      var rect = el.getBoundingClientRect();
      if (rect.x === void 0) {
        rect.x = rect.left;
        rect.y = rect.top;
      }
      return rect;
    } catch (e) {
      throw new TypeError("Can't call getBoundingClientRect on " + el);
    }
  }
}
function pointInside(point, el) {
  var rect = getClientRect(el);
  return point.y > rect.top && point.y < rect.bottom && point.x > rect.left && point.x < rect.right;
}
var objectCreate = void 0;
if (typeof Object.create != "function") {
  objectCreate = /* @__PURE__ */ function(undefined$1) {
    var Temp = function Temp2() {
    };
    return function(prototype, propertiesObject) {
      if (prototype !== Object(prototype) && prototype !== null) {
        throw TypeError("Argument must be an object, or null");
      }
      Temp.prototype = prototype || {};
      var result = new Temp();
      Temp.prototype = null;
      if (propertiesObject !== undefined$1) {
        Object.defineProperties(result, propertiesObject);
      }
      if (prototype === null) {
        result.__proto__ = null;
      }
      return result;
    };
  }();
} else {
  objectCreate = Object.create;
}
var objectCreate$1 = objectCreate;
var mouseEventProps = ["altKey", "button", "buttons", "clientX", "clientY", "ctrlKey", "metaKey", "movementX", "movementY", "offsetX", "offsetY", "pageX", "pageY", "region", "relatedTarget", "screenX", "screenY", "shiftKey", "which", "x", "y"];
function createDispatcher(element) {
  var defaultSettings = {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    button: 0,
    buttons: 1,
    relatedTarget: null,
    region: null
  };
  if (element !== void 0) {
    element.addEventListener("mousemove", onMove);
  }
  function onMove(e) {
    for (var i = 0; i < mouseEventProps.length; i++) {
      defaultSettings[mouseEventProps[i]] = e[mouseEventProps[i]];
    }
  }
  var dispatch = function() {
    if (MouseEvent) {
      return function m1(element2, initMove, data) {
        var evt = new MouseEvent("mousemove", createMoveInit(defaultSettings, initMove));
        setSpecial(evt, data);
        return element2.dispatchEvent(evt);
      };
    } else if (typeof document.createEvent === "function") {
      return function m2(element2, initMove, data) {
        var settings = createMoveInit(defaultSettings, initMove);
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(
          "mousemove",
          true,
          //can bubble
          true,
          //cancelable
          window,
          //view
          0,
          //detail
          settings.screenX,
          //0, //screenX
          settings.screenY,
          //0, //screenY
          settings.clientX,
          //80, //clientX
          settings.clientY,
          //20, //clientY
          settings.ctrlKey,
          //false, //ctrlKey
          settings.altKey,
          //false, //altKey
          settings.shiftKey,
          //false, //shiftKey
          settings.metaKey,
          //false, //metaKey
          settings.button,
          //0, //button
          settings.relatedTarget
          //null //relatedTarget
        );
        setSpecial(evt, data);
        return element2.dispatchEvent(evt);
      };
    } else if (typeof document.createEventObject === "function") {
      return function m3(element2, initMove, data) {
        var evt = document.createEventObject();
        var settings = createMoveInit(defaultSettings, initMove);
        for (var name in settings) {
          evt[name] = settings[name];
        }
        setSpecial(evt, data);
        return element2.dispatchEvent(evt);
      };
    }
  }();
  function destroy() {
    if (element) {
      element.removeEventListener("mousemove", onMove, false);
    }
    defaultSettings = null;
  }
  return {
    destroy,
    dispatch
  };
}
function createMoveInit(defaultSettings, initMove) {
  initMove = initMove || {};
  var settings = objectCreate$1(defaultSettings);
  for (var i = 0; i < mouseEventProps.length; i++) {
    if (initMove[mouseEventProps[i]] !== void 0) {
      settings[mouseEventProps[i]] = initMove[mouseEventProps[i]];
    }
  }
  return settings;
}
function setSpecial(e, data) {
  console.log("data ", data);
  e.data = data || {};
  e.dispatched = "mousemove";
}
var prefix = ["webkit", "moz", "ms", "o"];
var requestFrame = function() {
  if (typeof window === "undefined") {
    return function() {
    };
  }
  for (var i = 0, limit = prefix.length; i < limit && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[prefix[i] + "RequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
      var now = (/* @__PURE__ */ new Date()).getTime();
      var ttc = Math.max(0, 16 - now - lastTime);
      var timer = window.setTimeout(function() {
        return callback(now + ttc);
      }, ttc);
      lastTime = now + ttc;
      return timer;
    };
  }
  return window.requestAnimationFrame.bind(window);
}();
var cancelFrame = function() {
  if (typeof window === "undefined") {
    return function() {
    };
  }
  for (var i = 0, limit = prefix.length; i < limit && !window.cancelAnimationFrame; ++i) {
    window.cancelAnimationFrame = window[prefix[i] + "CancelAnimationFrame"] || window[prefix[i] + "CancelRequestAnimationFrame"];
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(timer) {
      window.clearTimeout(timer);
    };
  }
  return window.cancelAnimationFrame.bind(window);
}();
function AutoScroller(elements, options) {
  if (options === void 0) options = {};
  var self = this;
  var maxSpeed = 4, scrolling = false;
  if (typeof options.margin !== "object") {
    var margin = options.margin || -1;
    this.margin = {
      left: margin,
      right: margin,
      top: margin,
      bottom: margin
    };
  } else {
    this.margin = options.margin;
  }
  this.scrollWhenOutside = options.scrollWhenOutside || false;
  var point = {}, pointCB = createPointCB(point), dispatcher = createDispatcher(), down = false;
  window.addEventListener("mousemove", pointCB, false);
  window.addEventListener("touchmove", pointCB, false);
  if (!isNaN(options.maxSpeed)) {
    maxSpeed = options.maxSpeed;
  }
  if (typeof maxSpeed !== "object") {
    maxSpeed = {
      left: maxSpeed,
      right: maxSpeed,
      top: maxSpeed,
      bottom: maxSpeed
    };
  }
  this.autoScroll = boolean(options.autoScroll);
  this.syncMove = boolean(options.syncMove, false);
  this.destroy = function(forceCleanAnimation) {
    window.removeEventListener("mousemove", pointCB, false);
    window.removeEventListener("touchmove", pointCB, false);
    window.removeEventListener("mousedown", onDown, false);
    window.removeEventListener("touchstart", onDown, false);
    window.removeEventListener("mouseup", onUp, false);
    window.removeEventListener("touchend", onUp, false);
    window.removeEventListener("pointerup", onUp, false);
    window.removeEventListener("mouseleave", onMouseOut, false);
    window.removeEventListener("mousemove", onMove, false);
    window.removeEventListener("touchmove", onMove, false);
    window.removeEventListener("scroll", setScroll, true);
    elements = [];
    if (forceCleanAnimation) {
      cleanAnimation();
    }
  };
  this.add = function() {
    var element = [], len = arguments.length;
    while (len--) element[len] = arguments[len];
    addElements.apply(void 0, [elements].concat(element));
    return this;
  };
  this.remove = function() {
    var element = [], len = arguments.length;
    while (len--) element[len] = arguments[len];
    return removeElements.apply(void 0, [elements].concat(element));
  };
  var hasWindow = null, windowAnimationFrame;
  if (Object.prototype.toString.call(elements) !== "[object Array]") {
    elements = [elements];
  }
  (function(temp) {
    elements = [];
    temp.forEach(function(element) {
      if (element === window) {
        hasWindow = window;
      } else {
        self.add(element);
      }
    });
  })(elements);
  Object.defineProperties(this, {
    down: {
      get: function() {
        return down;
      }
    },
    maxSpeed: {
      get: function() {
        return maxSpeed;
      }
    },
    point: {
      get: function() {
        return point;
      }
    },
    scrolling: {
      get: function() {
        return scrolling;
      }
    }
  });
  var current = null, animationFrame;
  window.addEventListener("mousedown", onDown, false);
  window.addEventListener("touchstart", onDown, false);
  window.addEventListener("mouseup", onUp, false);
  window.addEventListener("touchend", onUp, false);
  window.addEventListener("pointerup", onUp, false);
  window.addEventListener("mousemove", onMove, false);
  window.addEventListener("touchmove", onMove, false);
  window.addEventListener("mouseleave", onMouseOut, false);
  window.addEventListener("scroll", setScroll, true);
  function setScroll(e) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === e.target) {
        scrolling = true;
        break;
      }
    }
    if (scrolling) {
      requestFrame(function() {
        return scrolling = false;
      });
    }
  }
  function onDown() {
    down = true;
  }
  function onUp() {
    down = false;
    cleanAnimation();
  }
  function cleanAnimation() {
    cancelFrame(animationFrame);
    cancelFrame(windowAnimationFrame);
  }
  function onMouseOut() {
    down = false;
  }
  function getTarget(target) {
    if (!target) {
      return null;
    }
    if (current === target) {
      return target;
    }
    if (hasElement(elements, target)) {
      return target;
    }
    while (target = target.parentNode) {
      if (hasElement(elements, target)) {
        return target;
      }
    }
    return null;
  }
  function getElementUnderPoint() {
    var underPoint = null;
    for (var i = 0; i < elements.length; i++) {
      if (inside(point, elements[i])) {
        underPoint = elements[i];
      }
    }
    return underPoint;
  }
  function onMove(event) {
    if (!self.autoScroll()) {
      return;
    }
    if (event["dispatched"]) {
      return;
    }
    var target = event.target, body = document.body;
    if (current && !inside(point, current)) {
      if (!self.scrollWhenOutside) {
        current = null;
      }
    }
    if (target && target.parentNode === body) {
      target = getElementUnderPoint();
    } else {
      target = getTarget(target);
      if (!target) {
        target = getElementUnderPoint();
      }
    }
    if (target && target !== current) {
      current = target;
    }
    if (hasWindow) {
      cancelFrame(windowAnimationFrame);
      windowAnimationFrame = requestFrame(scrollWindow);
    }
    if (!current) {
      return;
    }
    cancelFrame(animationFrame);
    animationFrame = requestFrame(scrollTick);
  }
  function scrollWindow() {
    autoScroll(hasWindow);
    cancelFrame(windowAnimationFrame);
    windowAnimationFrame = requestFrame(scrollWindow);
  }
  function scrollTick() {
    if (!current) {
      return;
    }
    autoScroll(current);
    cancelFrame(animationFrame);
    animationFrame = requestFrame(scrollTick);
  }
  function autoScroll(el) {
    var rect = getClientRect(el), scrollx, scrolly;
    if (point.x < rect.left + self.margin.left) {
      scrollx = Math.floor(Math.max(-1, (point.x - rect.left) / self.margin.left - 1) * self.maxSpeed.left);
    } else if (point.x > rect.right - self.margin.right) {
      scrollx = Math.ceil(Math.min(1, (point.x - rect.right) / self.margin.right + 1) * self.maxSpeed.right);
    } else {
      scrollx = 0;
    }
    if (point.y < rect.top + self.margin.top) {
      scrolly = Math.floor(Math.max(-1, (point.y - rect.top) / self.margin.top - 1) * self.maxSpeed.top);
    } else if (point.y > rect.bottom - self.margin.bottom) {
      scrolly = Math.ceil(Math.min(1, (point.y - rect.bottom) / self.margin.bottom + 1) * self.maxSpeed.bottom);
    } else {
      scrolly = 0;
    }
    if (self.syncMove()) {
      dispatcher.dispatch(el, {
        pageX: point.pageX + scrollx,
        pageY: point.pageY + scrolly,
        clientX: point.x + scrollx,
        clientY: point.y + scrolly
      });
    }
    setTimeout(function() {
      if (scrolly) {
        scrollY(el, scrolly);
      }
      if (scrollx) {
        scrollX(el, scrollx);
      }
    });
  }
  function scrollY(el, amount) {
    if (el === window) {
      window.scrollTo(el.pageXOffset, el.pageYOffset + amount);
    } else {
      el.scrollTop += amount;
    }
  }
  function scrollX(el, amount) {
    if (el === window) {
      window.scrollTo(el.pageXOffset + amount, el.pageYOffset);
    } else {
      el.scrollLeft += amount;
    }
  }
}
function AutoScrollerFactory(element, options) {
  return new AutoScroller(element, options);
}
function inside(point, el, rect) {
  if (!rect) {
    return pointInside(point, el);
  } else {
    return point.y > rect.top && point.y < rect.bottom && point.x > rect.left && point.x < rect.right;
  }
}
var bundle_es_default = AutoScrollerFactory;

// node_modules/angular-draggable-droppable/fesm2020/angular-draggable-droppable.mjs
function addClass(renderer, element, classToAdd) {
  if (classToAdd) {
    classToAdd.split(" ").forEach((className) => renderer.addClass(element.nativeElement, className));
  }
}
function removeClass(renderer, element, classToRemove) {
  if (classToRemove) {
    classToRemove.split(" ").forEach((className) => renderer.removeClass(element.nativeElement, className));
  }
}
var DraggableHelper = class {
  constructor() {
    this.currentDrag = new Subject();
  }
};
DraggableHelper.ɵfac = function DraggableHelper_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DraggableHelper)();
};
DraggableHelper.ɵprov = ɵɵdefineInjectable({
  token: DraggableHelper,
  factory: DraggableHelper.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableHelper, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DraggableScrollContainerDirective = class {
  /**
   * @hidden
   */
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
};
DraggableScrollContainerDirective.ɵfac = function DraggableScrollContainerDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DraggableScrollContainerDirective)(ɵɵdirectiveInject(ElementRef));
};
DraggableScrollContainerDirective.ɵdir = ɵɵdefineDirective({
  type: DraggableScrollContainerDirective,
  selectors: [["", "mwlDraggableScrollContainer", ""]],
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableScrollContainerDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlDraggableScrollContainer]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, null);
})();
var DraggableDirective = class {
  /**
   * @hidden
   */
  constructor(element, renderer, draggableHelper, zone, vcr, scrollContainer, document2) {
    this.element = element;
    this.renderer = renderer;
    this.draggableHelper = draggableHelper;
    this.zone = zone;
    this.vcr = vcr;
    this.scrollContainer = scrollContainer;
    this.document = document2;
    this.dragAxis = {
      x: true,
      y: true
    };
    this.dragSnapGrid = {};
    this.ghostDragEnabled = true;
    this.showOriginalElementWhileDragging = false;
    this.dragCursor = "";
    this.autoScroll = {
      margin: 20
    };
    this.dragPointerDown = new EventEmitter();
    this.dragStart = new EventEmitter();
    this.ghostElementCreated = new EventEmitter();
    this.dragging = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.pointerDown$ = new Subject();
    this.pointerMove$ = new Subject();
    this.pointerUp$ = new Subject();
    this.eventListenerSubscriptions = {};
    this.destroy$ = new Subject();
    this.timeLongPress = {
      timerBegin: 0,
      timerEnd: 0
    };
  }
  ngOnInit() {
    this.checkEventListeners();
    const pointerDragged$ = this.pointerDown$.pipe(filter(() => this.canDrag()), mergeMap((pointerDownEvent) => {
      if (pointerDownEvent.event.stopPropagation && !this.scrollContainer) {
        pointerDownEvent.event.stopPropagation();
      }
      const globalDragStyle = this.renderer.createElement("style");
      this.renderer.setAttribute(globalDragStyle, "type", "text/css");
      this.renderer.appendChild(globalDragStyle, this.renderer.createText(`
          body * {
           -moz-user-select: none;
           -ms-user-select: none;
           -webkit-user-select: none;
           user-select: none;
          }
        `));
      requestAnimationFrame(() => {
        this.document.head.appendChild(globalDragStyle);
      });
      const startScrollPosition = this.getScrollPosition();
      const scrollContainerScroll$ = new Observable((observer) => {
        const scrollContainer = this.scrollContainer ? this.scrollContainer.elementRef.nativeElement : "window";
        return this.renderer.listen(scrollContainer, "scroll", (e) => observer.next(e));
      }).pipe(startWith(startScrollPosition), map(() => this.getScrollPosition()));
      const currentDrag$ = new Subject();
      const cancelDrag$ = new ReplaySubject();
      if (this.dragPointerDown.observers.length > 0) {
        this.zone.run(() => {
          this.dragPointerDown.next({
            x: 0,
            y: 0
          });
        });
      }
      const dragComplete$ = merge(this.pointerUp$, this.pointerDown$, cancelDrag$, this.destroy$).pipe(share());
      const pointerMove = combineLatest([this.pointerMove$, scrollContainerScroll$]).pipe(map(([pointerMoveEvent, scroll]) => {
        return {
          currentDrag$,
          transformX: pointerMoveEvent.clientX - pointerDownEvent.clientX,
          transformY: pointerMoveEvent.clientY - pointerDownEvent.clientY,
          clientX: pointerMoveEvent.clientX,
          clientY: pointerMoveEvent.clientY,
          scrollLeft: scroll.left,
          scrollTop: scroll.top,
          target: pointerMoveEvent.event.target
        };
      }), map((moveData) => {
        if (this.dragSnapGrid.x) {
          moveData.transformX = Math.round(moveData.transformX / this.dragSnapGrid.x) * this.dragSnapGrid.x;
        }
        if (this.dragSnapGrid.y) {
          moveData.transformY = Math.round(moveData.transformY / this.dragSnapGrid.y) * this.dragSnapGrid.y;
        }
        return moveData;
      }), map((moveData) => {
        if (!this.dragAxis.x) {
          moveData.transformX = 0;
        }
        if (!this.dragAxis.y) {
          moveData.transformY = 0;
        }
        return moveData;
      }), map((moveData) => {
        const scrollX = moveData.scrollLeft - startScrollPosition.left;
        const scrollY = moveData.scrollTop - startScrollPosition.top;
        return __spreadProps(__spreadValues({}, moveData), {
          x: moveData.transformX + scrollX,
          y: moveData.transformY + scrollY
        });
      }), filter(({
        x,
        y,
        transformX,
        transformY
      }) => !this.validateDrag || this.validateDrag({
        x,
        y,
        transform: {
          x: transformX,
          y: transformY
        }
      })), takeUntil(dragComplete$), share());
      const dragStarted$ = pointerMove.pipe(take(1), share());
      const dragEnded$ = pointerMove.pipe(takeLast(1), share());
      dragStarted$.subscribe(({
        clientX,
        clientY,
        x,
        y
      }) => {
        if (this.dragStart.observers.length > 0) {
          this.zone.run(() => {
            this.dragStart.next({
              cancelDrag$
            });
          });
        }
        this.scroller = bundle_es_default([this.scrollContainer ? this.scrollContainer.elementRef.nativeElement : this.document.defaultView], __spreadProps(__spreadValues({}, this.autoScroll), {
          autoScroll() {
            return true;
          }
        }));
        addClass(this.renderer, this.element, this.dragActiveClass);
        if (this.ghostDragEnabled) {
          const rect = this.element.nativeElement.getBoundingClientRect();
          const clone = this.element.nativeElement.cloneNode(true);
          if (!this.showOriginalElementWhileDragging) {
            this.renderer.setStyle(this.element.nativeElement, "visibility", "hidden");
          }
          if (this.ghostElementAppendTo) {
            this.ghostElementAppendTo.appendChild(clone);
          } else {
            this.element.nativeElement.parentNode.insertBefore(clone, this.element.nativeElement.nextSibling);
          }
          this.ghostElement = clone;
          this.document.body.style.cursor = this.dragCursor;
          this.setElementStyles(clone, {
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            cursor: this.dragCursor,
            margin: "0",
            willChange: "transform",
            pointerEvents: "none"
          });
          if (this.ghostElementTemplate) {
            const viewRef = this.vcr.createEmbeddedView(this.ghostElementTemplate);
            clone.innerHTML = "";
            viewRef.rootNodes.filter((node) => node instanceof Node).forEach((node) => {
              clone.appendChild(node);
            });
            dragEnded$.subscribe(() => {
              this.vcr.remove(this.vcr.indexOf(viewRef));
            });
          }
          if (this.ghostElementCreated.observers.length > 0) {
            this.zone.run(() => {
              this.ghostElementCreated.emit({
                clientX: clientX - x,
                clientY: clientY - y,
                element: clone
              });
            });
          }
          dragEnded$.subscribe(() => {
            clone.parentElement.removeChild(clone);
            this.ghostElement = null;
            this.renderer.setStyle(this.element.nativeElement, "visibility", "");
          });
        }
        this.draggableHelper.currentDrag.next(currentDrag$);
      });
      dragEnded$.pipe(mergeMap((dragEndData) => {
        const dragEndData$ = cancelDrag$.pipe(count(), take(1), map((calledCount) => __spreadProps(__spreadValues({}, dragEndData), {
          dragCancelled: calledCount > 0
        })));
        cancelDrag$.complete();
        return dragEndData$;
      })).subscribe(({
        x,
        y,
        dragCancelled
      }) => {
        this.scroller.destroy();
        if (this.dragEnd.observers.length > 0) {
          this.zone.run(() => {
            this.dragEnd.next({
              x,
              y,
              dragCancelled
            });
          });
        }
        removeClass(this.renderer, this.element, this.dragActiveClass);
        currentDrag$.complete();
      });
      merge(dragComplete$, dragEnded$).pipe(take(1)).subscribe(() => {
        requestAnimationFrame(() => {
          this.document.head.removeChild(globalDragStyle);
        });
      });
      return pointerMove;
    }), share());
    merge(pointerDragged$.pipe(take(1), map((value) => [, value])), pointerDragged$.pipe(pairwise())).pipe(filter(([previous, next]) => {
      if (!previous) {
        return true;
      }
      return previous.x !== next.x || previous.y !== next.y;
    }), map(([previous, next]) => next)).subscribe(({
      x,
      y,
      currentDrag$,
      clientX,
      clientY,
      transformX,
      transformY,
      target
    }) => {
      if (this.dragging.observers.length > 0) {
        this.zone.run(() => {
          this.dragging.next({
            x,
            y
          });
        });
      }
      requestAnimationFrame(() => {
        if (this.ghostElement) {
          const transform = `translate3d(${transformX}px, ${transformY}px, 0px)`;
          this.setElementStyles(this.ghostElement, {
            transform,
            "-webkit-transform": transform,
            "-ms-transform": transform,
            "-moz-transform": transform,
            "-o-transform": transform
          });
        }
      });
      currentDrag$.next({
        clientX,
        clientY,
        dropData: this.dropData,
        target
      });
    });
  }
  ngOnChanges(changes) {
    if (changes.dragAxis) {
      this.checkEventListeners();
    }
  }
  ngOnDestroy() {
    this.unsubscribeEventListeners();
    this.pointerDown$.complete();
    this.pointerMove$.complete();
    this.pointerUp$.complete();
    this.destroy$.next();
  }
  checkEventListeners() {
    const canDrag = this.canDrag();
    const hasEventListeners = Object.keys(this.eventListenerSubscriptions).length > 0;
    if (canDrag && !hasEventListeners) {
      this.zone.runOutsideAngular(() => {
        this.eventListenerSubscriptions.mousedown = this.renderer.listen(this.element.nativeElement, "mousedown", (event) => {
          this.onMouseDown(event);
        });
        this.eventListenerSubscriptions.mouseup = this.renderer.listen("document", "mouseup", (event) => {
          this.onMouseUp(event);
        });
        this.eventListenerSubscriptions.touchstart = this.renderer.listen(this.element.nativeElement, "touchstart", (event) => {
          this.onTouchStart(event);
        });
        this.eventListenerSubscriptions.touchend = this.renderer.listen("document", "touchend", (event) => {
          this.onTouchEnd(event);
        });
        this.eventListenerSubscriptions.touchcancel = this.renderer.listen("document", "touchcancel", (event) => {
          this.onTouchEnd(event);
        });
        this.eventListenerSubscriptions.mouseenter = this.renderer.listen(this.element.nativeElement, "mouseenter", () => {
          this.onMouseEnter();
        });
        this.eventListenerSubscriptions.mouseleave = this.renderer.listen(this.element.nativeElement, "mouseleave", () => {
          this.onMouseLeave();
        });
      });
    } else if (!canDrag && hasEventListeners) {
      this.unsubscribeEventListeners();
    }
  }
  onMouseDown(event) {
    if (event.button === 0) {
      if (!this.eventListenerSubscriptions.mousemove) {
        this.eventListenerSubscriptions.mousemove = this.renderer.listen("document", "mousemove", (mouseMoveEvent) => {
          this.pointerMove$.next({
            event: mouseMoveEvent,
            clientX: mouseMoveEvent.clientX,
            clientY: mouseMoveEvent.clientY
          });
        });
      }
      this.pointerDown$.next({
        event,
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
  }
  onMouseUp(event) {
    if (event.button === 0) {
      if (this.eventListenerSubscriptions.mousemove) {
        this.eventListenerSubscriptions.mousemove();
        delete this.eventListenerSubscriptions.mousemove;
      }
      this.pointerUp$.next({
        event,
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
  }
  onTouchStart(event) {
    let startScrollPosition;
    let isDragActivated;
    let hasContainerScrollbar;
    if (this.touchStartLongPress) {
      this.timeLongPress.timerBegin = Date.now();
      isDragActivated = false;
      hasContainerScrollbar = this.hasScrollbar();
      startScrollPosition = this.getScrollPosition();
    }
    if (!this.eventListenerSubscriptions.touchmove) {
      const contextMenuListener = fromEvent(this.document, "contextmenu").subscribe((e) => {
        e.preventDefault();
      });
      const touchMoveListener = fromEvent(this.document, "touchmove", {
        passive: false
      }).subscribe((touchMoveEvent) => {
        if (this.touchStartLongPress && !isDragActivated && hasContainerScrollbar) {
          isDragActivated = this.shouldBeginDrag(event, touchMoveEvent, startScrollPosition);
        }
        if (!this.touchStartLongPress || !hasContainerScrollbar || isDragActivated) {
          touchMoveEvent.preventDefault();
          this.pointerMove$.next({
            event: touchMoveEvent,
            clientX: touchMoveEvent.targetTouches[0].clientX,
            clientY: touchMoveEvent.targetTouches[0].clientY
          });
        }
      });
      this.eventListenerSubscriptions.touchmove = () => {
        contextMenuListener.unsubscribe();
        touchMoveListener.unsubscribe();
      };
    }
    this.pointerDown$.next({
      event,
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY
    });
  }
  onTouchEnd(event) {
    if (this.eventListenerSubscriptions.touchmove) {
      this.eventListenerSubscriptions.touchmove();
      delete this.eventListenerSubscriptions.touchmove;
      if (this.touchStartLongPress) {
        this.enableScroll();
      }
    }
    this.pointerUp$.next({
      event,
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY
    });
  }
  onMouseEnter() {
    this.setCursor(this.dragCursor);
  }
  onMouseLeave() {
    this.setCursor("");
  }
  canDrag() {
    return this.dragAxis.x || this.dragAxis.y;
  }
  setCursor(value) {
    if (!this.eventListenerSubscriptions.mousemove) {
      this.renderer.setStyle(this.element.nativeElement, "cursor", value);
    }
  }
  unsubscribeEventListeners() {
    Object.keys(this.eventListenerSubscriptions).forEach((type) => {
      this.eventListenerSubscriptions[type]();
      delete this.eventListenerSubscriptions[type];
    });
  }
  setElementStyles(element, styles) {
    Object.keys(styles).forEach((key) => {
      this.renderer.setStyle(element, key, styles[key]);
    });
  }
  getScrollElement() {
    if (this.scrollContainer) {
      return this.scrollContainer.elementRef.nativeElement;
    } else {
      return this.document.body;
    }
  }
  getScrollPosition() {
    if (this.scrollContainer) {
      return {
        top: this.scrollContainer.elementRef.nativeElement.scrollTop,
        left: this.scrollContainer.elementRef.nativeElement.scrollLeft
      };
    } else {
      return {
        top: window.pageYOffset || this.document.documentElement.scrollTop,
        left: window.pageXOffset || this.document.documentElement.scrollLeft
      };
    }
  }
  shouldBeginDrag(event, touchMoveEvent, startScrollPosition) {
    const moveScrollPosition = this.getScrollPosition();
    const deltaScroll = {
      top: Math.abs(moveScrollPosition.top - startScrollPosition.top),
      left: Math.abs(moveScrollPosition.left - startScrollPosition.left)
    };
    const deltaX = Math.abs(touchMoveEvent.targetTouches[0].clientX - event.touches[0].clientX) - deltaScroll.left;
    const deltaY = Math.abs(touchMoveEvent.targetTouches[0].clientY - event.touches[0].clientY) - deltaScroll.top;
    const deltaTotal = deltaX + deltaY;
    const longPressConfig = this.touchStartLongPress;
    if (deltaTotal > longPressConfig.delta || deltaScroll.top > 0 || deltaScroll.left > 0) {
      this.timeLongPress.timerBegin = Date.now();
    }
    this.timeLongPress.timerEnd = Date.now();
    const duration = this.timeLongPress.timerEnd - this.timeLongPress.timerBegin;
    if (duration >= longPressConfig.delay) {
      this.disableScroll();
      return true;
    }
    return false;
  }
  enableScroll() {
    if (this.scrollContainer) {
      this.renderer.setStyle(this.scrollContainer.elementRef.nativeElement, "overflow", "");
    }
    this.renderer.setStyle(this.document.body, "overflow", "");
  }
  disableScroll() {
    if (this.scrollContainer) {
      this.renderer.setStyle(this.scrollContainer.elementRef.nativeElement, "overflow", "hidden");
    }
    this.renderer.setStyle(this.document.body, "overflow", "hidden");
  }
  hasScrollbar() {
    const scrollContainer = this.getScrollElement();
    const containerHasHorizontalScroll = scrollContainer.scrollWidth > scrollContainer.clientWidth;
    const containerHasVerticalScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight;
    return containerHasHorizontalScroll || containerHasVerticalScroll;
  }
};
DraggableDirective.ɵfac = function DraggableDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DraggableDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DraggableHelper), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(DraggableScrollContainerDirective, 8), ɵɵdirectiveInject(DOCUMENT));
};
DraggableDirective.ɵdir = ɵɵdefineDirective({
  type: DraggableDirective,
  selectors: [["", "mwlDraggable", ""]],
  inputs: {
    dropData: "dropData",
    dragAxis: "dragAxis",
    dragSnapGrid: "dragSnapGrid",
    ghostDragEnabled: "ghostDragEnabled",
    showOriginalElementWhileDragging: "showOriginalElementWhileDragging",
    validateDrag: "validateDrag",
    dragCursor: "dragCursor",
    dragActiveClass: "dragActiveClass",
    ghostElementAppendTo: "ghostElementAppendTo",
    ghostElementTemplate: "ghostElementTemplate",
    touchStartLongPress: "touchStartLongPress",
    autoScroll: "autoScroll"
  },
  outputs: {
    dragPointerDown: "dragPointerDown",
    dragStart: "dragStart",
    ghostElementCreated: "ghostElementCreated",
    dragging: "dragging",
    dragEnd: "dragEnd"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlDraggable]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: DraggableHelper
    }, {
      type: NgZone
    }, {
      type: ViewContainerRef
    }, {
      type: DraggableScrollContainerDirective,
      decorators: [{
        type: Optional
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, {
    dropData: [{
      type: Input
    }],
    dragAxis: [{
      type: Input
    }],
    dragSnapGrid: [{
      type: Input
    }],
    ghostDragEnabled: [{
      type: Input
    }],
    showOriginalElementWhileDragging: [{
      type: Input
    }],
    validateDrag: [{
      type: Input
    }],
    dragCursor: [{
      type: Input
    }],
    dragActiveClass: [{
      type: Input
    }],
    ghostElementAppendTo: [{
      type: Input
    }],
    ghostElementTemplate: [{
      type: Input
    }],
    touchStartLongPress: [{
      type: Input
    }],
    autoScroll: [{
      type: Input
    }],
    dragPointerDown: [{
      type: Output
    }],
    dragStart: [{
      type: Output
    }],
    ghostElementCreated: [{
      type: Output
    }],
    dragging: [{
      type: Output
    }],
    dragEnd: [{
      type: Output
    }]
  });
})();
function isCoordinateWithinRectangle(clientX, clientY, rect) {
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}
var DroppableDirective = class {
  constructor(element, draggableHelper, zone, renderer, scrollContainer) {
    this.element = element;
    this.draggableHelper = draggableHelper;
    this.zone = zone;
    this.renderer = renderer;
    this.scrollContainer = scrollContainer;
    this.dragEnter = new EventEmitter();
    this.dragLeave = new EventEmitter();
    this.dragOver = new EventEmitter();
    this.drop = new EventEmitter();
  }
  ngOnInit() {
    this.currentDragSubscription = this.draggableHelper.currentDrag.subscribe((drag$) => {
      addClass(this.renderer, this.element, this.dragActiveClass);
      const droppableElement = {
        updateCache: true
      };
      const deregisterScrollListener = this.renderer.listen(this.scrollContainer ? this.scrollContainer.elementRef.nativeElement : "window", "scroll", () => {
        droppableElement.updateCache = true;
      });
      let currentDragEvent;
      const overlaps$ = drag$.pipe(map(({
        clientX,
        clientY,
        dropData,
        target
      }) => {
        currentDragEvent = {
          clientX,
          clientY,
          dropData,
          target
        };
        if (droppableElement.updateCache) {
          droppableElement.rect = this.element.nativeElement.getBoundingClientRect();
          if (this.scrollContainer) {
            droppableElement.scrollContainerRect = this.scrollContainer.elementRef.nativeElement.getBoundingClientRect();
          }
          droppableElement.updateCache = false;
        }
        const isWithinElement = isCoordinateWithinRectangle(clientX, clientY, droppableElement.rect);
        const isDropAllowed = !this.validateDrop || this.validateDrop({
          clientX,
          clientY,
          target,
          dropData
        });
        if (droppableElement.scrollContainerRect) {
          return isWithinElement && isDropAllowed && isCoordinateWithinRectangle(clientX, clientY, droppableElement.scrollContainerRect);
        } else {
          return isWithinElement && isDropAllowed;
        }
      }));
      const overlapsChanged$ = overlaps$.pipe(distinctUntilChanged());
      let dragOverActive;
      overlapsChanged$.pipe(filter((overlapsNow) => overlapsNow)).subscribe(() => {
        dragOverActive = true;
        addClass(this.renderer, this.element, this.dragOverClass);
        if (this.dragEnter.observers.length > 0) {
          this.zone.run(() => {
            this.dragEnter.next(currentDragEvent);
          });
        }
      });
      overlaps$.pipe(filter((overlapsNow) => overlapsNow)).subscribe(() => {
        if (this.dragOver.observers.length > 0) {
          this.zone.run(() => {
            this.dragOver.next(currentDragEvent);
          });
        }
      });
      overlapsChanged$.pipe(pairwise(), filter(([didOverlap, overlapsNow]) => didOverlap && !overlapsNow)).subscribe(() => {
        dragOverActive = false;
        removeClass(this.renderer, this.element, this.dragOverClass);
        if (this.dragLeave.observers.length > 0) {
          this.zone.run(() => {
            this.dragLeave.next(currentDragEvent);
          });
        }
      });
      drag$.subscribe({
        complete: () => {
          deregisterScrollListener();
          removeClass(this.renderer, this.element, this.dragActiveClass);
          if (dragOverActive) {
            removeClass(this.renderer, this.element, this.dragOverClass);
            if (this.drop.observers.length > 0) {
              this.zone.run(() => {
                this.drop.next(currentDragEvent);
              });
            }
          }
        }
      });
    });
  }
  ngOnDestroy() {
    if (this.currentDragSubscription) {
      this.currentDragSubscription.unsubscribe();
    }
  }
};
DroppableDirective.ɵfac = function DroppableDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DroppableDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DraggableHelper), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DraggableScrollContainerDirective, 8));
};
DroppableDirective.ɵdir = ɵɵdefineDirective({
  type: DroppableDirective,
  selectors: [["", "mwlDroppable", ""]],
  inputs: {
    dragOverClass: "dragOverClass",
    dragActiveClass: "dragActiveClass",
    validateDrop: "validateDrop"
  },
  outputs: {
    dragEnter: "dragEnter",
    dragLeave: "dragLeave",
    dragOver: "dragOver",
    drop: "drop"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DroppableDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlDroppable]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: DraggableHelper
    }, {
      type: NgZone
    }, {
      type: Renderer2
    }, {
      type: DraggableScrollContainerDirective,
      decorators: [{
        type: Optional
      }]
    }];
  }, {
    dragOverClass: [{
      type: Input
    }],
    dragActiveClass: [{
      type: Input
    }],
    validateDrop: [{
      type: Input
    }],
    dragEnter: [{
      type: Output
    }],
    dragLeave: [{
      type: Output
    }],
    dragOver: [{
      type: Output
    }],
    drop: [{
      type: Output
    }]
  });
})();
var DragAndDropModule = class {
};
DragAndDropModule.ɵfac = function DragAndDropModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DragAndDropModule)();
};
DragAndDropModule.ɵmod = ɵɵdefineNgModule({
  type: DragAndDropModule,
  declarations: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective],
  exports: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective]
});
DragAndDropModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragAndDropModule, [{
    type: NgModule,
    args: [{
      declarations: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective],
      exports: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective]
    }]
  }], null, null);
})();

export {
  DraggableScrollContainerDirective,
  DraggableDirective,
  DroppableDirective,
  DragAndDropModule
};
//# sourceMappingURL=chunk-4WJPQZ3M.js.map
