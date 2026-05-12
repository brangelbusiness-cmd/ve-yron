import { c as createLucideIcon, r as reactExports, b as useParams, d as useCartStore, j as jsxRuntimeExports, L as Link, g as getProductPrice, f as formatPrice, M as Minus, P as Plus, e as ShoppingBag, X, C as ChevronDown } from "./index-DctbPH3p.js";
import { d as useShopifyProduct, c as useAllProducts, S as SEO, P as ProductCard } from "./useShopifyProducts-DA3f9_pN.js";
import { m as motion } from "./proxy-Cno1h6QO.js";
import { S as Shield } from "./shield-Bh5mHz9f.js";
import { T as Truck } from "./truck-C-LscQoT.js";
import { R as RotateCcw } from "./rotate-ccw-CMWWrYJL.js";
import { C as ChevronRight } from "./chevron-right-BgNi98n5.js";
import "./shopify-CzRTDa7w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode);
function isObject$1(subject) {
  return Object.prototype.toString.call(subject) === "[object Object]";
}
function isRecord(subject) {
  return isObject$1(subject) || Array.isArray(subject);
}
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function areOptionsEqual(optionsA, optionsB) {
  const optionsAKeys = Object.keys(optionsA);
  const optionsBKeys = Object.keys(optionsB);
  if (optionsAKeys.length !== optionsBKeys.length) return false;
  const breakpointsA = JSON.stringify(Object.keys(optionsA.breakpoints || {}));
  const breakpointsB = JSON.stringify(Object.keys(optionsB.breakpoints || {}));
  if (breakpointsA !== breakpointsB) return false;
  return optionsAKeys.every((key) => {
    const valueA = optionsA[key];
    const valueB = optionsB[key];
    if (typeof valueA === "function") return `${valueA}` === `${valueB}`;
    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB;
    return areOptionsEqual(valueA, valueB);
  });
}
function sortAndMapPluginToOptions(plugins) {
  return plugins.concat().sort((a, b) => a.name > b.name ? 1 : -1).map((plugin) => plugin.options);
}
function arePluginsEqual(pluginsA, pluginsB) {
  if (pluginsA.length !== pluginsB.length) return false;
  const optionsA = sortAndMapPluginToOptions(pluginsA);
  const optionsB = sortAndMapPluginToOptions(pluginsB);
  return optionsA.every((optionA, index) => {
    const optionB = optionsB[index];
    return areOptionsEqual(optionA, optionB);
  });
}
function isNumber(subject) {
  return typeof subject === "number";
}
function isString(subject) {
  return typeof subject === "string";
}
function isBoolean(subject) {
  return typeof subject === "boolean";
}
function isObject(subject) {
  return Object.prototype.toString.call(subject) === "[object Object]";
}
function mathAbs(n) {
  return Math.abs(n);
}
function mathSign(n) {
  return Math.sign(n);
}
function deltaAbs(valueB, valueA) {
  return mathAbs(valueB - valueA);
}
function factorAbs(valueB, valueA) {
  if (valueB === 0 || valueA === 0) return 0;
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0;
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA));
  return mathAbs(diff / valueB);
}
function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}
function arrayKeys(array) {
  return objectKeys(array).map(Number);
}
function arrayLast(array) {
  return array[arrayLastIndex(array)];
}
function arrayLastIndex(array) {
  return Math.max(0, array.length - 1);
}
function arrayIsLastIndex(array, index) {
  return index === arrayLastIndex(array);
}
function arrayFromNumber(n, startAt = 0) {
  return Array.from(Array(n), (_, i) => startAt + i);
}
function objectKeys(object) {
  return Object.keys(object);
}
function objectsMergeDeep(objectA, objectB) {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach((key) => {
      const valueA = mergedObjects[key];
      const valueB = currentObject[key];
      const areObjects = isObject(valueA) && isObject(valueB);
      mergedObjects[key] = areObjects ? objectsMergeDeep(valueA, valueB) : valueB;
    });
    return mergedObjects;
  }, {});
}
function isMouseEvent(evt, ownerWindow) {
  return typeof ownerWindow.MouseEvent !== "undefined" && evt instanceof ownerWindow.MouseEvent;
}
function Alignment(align, viewSize) {
  const predefined = {
    start,
    center,
    end
  };
  function start() {
    return 0;
  }
  function center(n) {
    return end(n) / 2;
  }
  function end(n) {
    return viewSize - n;
  }
  function measure(n, index) {
    if (isString(align)) return predefined[align](n);
    return align(viewSize, n, index);
  }
  const self = {
    measure
  };
  return self;
}
function EventStore() {
  let listeners = [];
  function add(node, type, handler, options = {
    passive: true
  }) {
    let removeListener;
    if ("addEventListener" in node) {
      node.addEventListener(type, handler, options);
      removeListener = () => node.removeEventListener(type, handler, options);
    } else {
      const legacyMediaQueryList = node;
      legacyMediaQueryList.addListener(handler);
      removeListener = () => legacyMediaQueryList.removeListener(handler);
    }
    listeners.push(removeListener);
    return self;
  }
  function clear() {
    listeners = listeners.filter((remove) => remove());
  }
  const self = {
    add,
    clear
  };
  return self;
}
function Animations(ownerDocument, ownerWindow, update, render) {
  const documentVisibleHandler = EventStore();
  const fixedTimeStep = 1e3 / 60;
  let lastTimeStamp = null;
  let accumulatedTime = 0;
  let animationId = 0;
  function init() {
    documentVisibleHandler.add(ownerDocument, "visibilitychange", () => {
      if (ownerDocument.hidden) reset();
    });
  }
  function destroy() {
    stop();
    documentVisibleHandler.clear();
  }
  function animate(timeStamp) {
    if (!animationId) return;
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp;
      update();
      update();
    }
    const timeElapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    accumulatedTime += timeElapsed;
    while (accumulatedTime >= fixedTimeStep) {
      update();
      accumulatedTime -= fixedTimeStep;
    }
    const alpha = accumulatedTime / fixedTimeStep;
    render(alpha);
    if (animationId) {
      animationId = ownerWindow.requestAnimationFrame(animate);
    }
  }
  function start() {
    if (animationId) return;
    animationId = ownerWindow.requestAnimationFrame(animate);
  }
  function stop() {
    ownerWindow.cancelAnimationFrame(animationId);
    lastTimeStamp = null;
    accumulatedTime = 0;
    animationId = 0;
  }
  function reset() {
    lastTimeStamp = null;
    accumulatedTime = 0;
  }
  const self = {
    init,
    destroy,
    start,
    stop,
    update,
    render
  };
  return self;
}
function Axis(axis, contentDirection) {
  const isRightToLeft = contentDirection === "rtl";
  const isVertical = axis === "y";
  const scroll = isVertical ? "y" : "x";
  const cross = isVertical ? "x" : "y";
  const sign = !isVertical && isRightToLeft ? -1 : 1;
  const startEdge = getStartEdge();
  const endEdge = getEndEdge();
  function measureSize(nodeRect) {
    const {
      height,
      width
    } = nodeRect;
    return isVertical ? height : width;
  }
  function getStartEdge() {
    if (isVertical) return "top";
    return isRightToLeft ? "right" : "left";
  }
  function getEndEdge() {
    if (isVertical) return "bottom";
    return isRightToLeft ? "left" : "right";
  }
  function direction(n) {
    return n * sign;
  }
  const self = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  };
  return self;
}
function Limit(min = 0, max = 0) {
  const length = mathAbs(min - max);
  function reachedMin(n) {
    return n < min;
  }
  function reachedMax(n) {
    return n > max;
  }
  function reachedAny(n) {
    return reachedMin(n) || reachedMax(n);
  }
  function constrain(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? min : max;
  }
  function removeOffset(n) {
    if (!length) return n;
    return n - length * Math.ceil((n - max) / length);
  }
  const self = {
    length,
    max,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  };
  return self;
}
function Counter(max, start, loop) {
  const {
    constrain
  } = Limit(0, max);
  const loopEnd = max + 1;
  let counter = withinLimit(start);
  function withinLimit(n) {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd);
  }
  function get() {
    return counter;
  }
  function set(n) {
    counter = withinLimit(n);
    return self;
  }
  function add(n) {
    return clone().set(get() + n);
  }
  function clone() {
    return Counter(max, get(), loop);
  }
  const self = {
    get,
    set,
    add,
    clone
  };
  return self;
}
function DragHandler(axis, rootNode, ownerDocument, ownerWindow, target, dragTracker, location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, baseFriction, watchDrag) {
  const {
    cross: crossAxis,
    direction
  } = axis;
  const focusNodes = ["INPUT", "SELECT", "TEXTAREA"];
  const nonPassiveEvent = {
    passive: false
  };
  const initEvents = EventStore();
  const dragEvents = EventStore();
  const goToNextThreshold = Limit(50, 225).constrain(percentOfView.measure(20));
  const snapForceBoost = {
    mouse: 300,
    touch: 400
  };
  const freeForceBoost = {
    mouse: 500,
    touch: 600
  };
  const baseSpeed = dragFree ? 43 : 25;
  let isMoving = false;
  let startScroll = 0;
  let startCross = 0;
  let pointerIsDown = false;
  let preventScroll = false;
  let preventClick = false;
  let isMouse = false;
  function init(emblaApi) {
    if (!watchDrag) return;
    function downIfAllowed(evt) {
      if (isBoolean(watchDrag) || watchDrag(emblaApi, evt)) down(evt);
    }
    const node = rootNode;
    initEvents.add(node, "dragstart", (evt) => evt.preventDefault(), nonPassiveEvent).add(node, "touchmove", () => void 0, nonPassiveEvent).add(node, "touchend", () => void 0).add(node, "touchstart", downIfAllowed).add(node, "mousedown", downIfAllowed).add(node, "touchcancel", up).add(node, "contextmenu", up).add(node, "click", click, true);
  }
  function destroy() {
    initEvents.clear();
    dragEvents.clear();
  }
  function addDragEvents() {
    const node = isMouse ? ownerDocument : rootNode;
    dragEvents.add(node, "touchmove", move, nonPassiveEvent).add(node, "touchend", up).add(node, "mousemove", move, nonPassiveEvent).add(node, "mouseup", up);
  }
  function isFocusNode(node) {
    const nodeName = node.nodeName || "";
    return focusNodes.includes(nodeName);
  }
  function forceBoost() {
    const boost = dragFree ? freeForceBoost : snapForceBoost;
    const type = isMouse ? "mouse" : "touch";
    return boost[type];
  }
  function allowedForce(force, targetChanged) {
    const next = index.add(mathSign(force) * -1);
    const baseForce = scrollTarget.byDistance(force, !dragFree).distance;
    if (dragFree || mathAbs(force) < goToNextThreshold) return baseForce;
    if (skipSnaps && targetChanged) return baseForce * 0.5;
    return scrollTarget.byIndex(next.get(), 0).distance;
  }
  function down(evt) {
    const isMouseEvt = isMouseEvent(evt, ownerWindow);
    isMouse = isMouseEvt;
    preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving;
    isMoving = deltaAbs(target.get(), location.get()) >= 2;
    if (isMouseEvt && evt.button !== 0) return;
    if (isFocusNode(evt.target)) return;
    pointerIsDown = true;
    dragTracker.pointerDown(evt);
    scrollBody.useFriction(0).useDuration(0);
    target.set(location);
    addDragEvents();
    startScroll = dragTracker.readPoint(evt);
    startCross = dragTracker.readPoint(evt, crossAxis);
    eventHandler.emit("pointerDown");
  }
  function move(evt) {
    const isTouchEvt = !isMouseEvent(evt, ownerWindow);
    if (isTouchEvt && evt.touches.length >= 2) return up(evt);
    const lastScroll = dragTracker.readPoint(evt);
    const lastCross = dragTracker.readPoint(evt, crossAxis);
    const diffScroll = deltaAbs(lastScroll, startScroll);
    const diffCross = deltaAbs(lastCross, startCross);
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt);
      preventScroll = diffScroll > diffCross;
      if (!preventScroll) return up(evt);
    }
    const diff = dragTracker.pointerMove(evt);
    if (diffScroll > dragThreshold) preventClick = true;
    scrollBody.useFriction(0.3).useDuration(0.75);
    animation.start();
    target.add(direction(diff));
    evt.preventDefault();
  }
  function up(evt) {
    const currentLocation = scrollTarget.byDistance(0, false);
    const targetChanged = currentLocation.index !== index.get();
    const rawForce = dragTracker.pointerUp(evt) * forceBoost();
    const force = allowedForce(direction(rawForce), targetChanged);
    const forceFactor = factorAbs(rawForce, force);
    const speed = baseSpeed - 10 * forceFactor;
    const friction = baseFriction + forceFactor / 50;
    preventScroll = false;
    pointerIsDown = false;
    dragEvents.clear();
    scrollBody.useDuration(speed).useFriction(friction);
    scrollTo.distance(force, !dragFree);
    isMouse = false;
    eventHandler.emit("pointerUp");
  }
  function click(evt) {
    if (preventClick) {
      evt.stopPropagation();
      evt.preventDefault();
      preventClick = false;
    }
  }
  function pointerDown() {
    return pointerIsDown;
  }
  const self = {
    init,
    destroy,
    pointerDown
  };
  return self;
}
function DragTracker(axis, ownerWindow) {
  const logInterval = 170;
  let startEvent;
  let lastEvent;
  function readTime(evt) {
    return evt.timeStamp;
  }
  function readPoint(evt, evtAxis) {
    const property = evtAxis || axis.scroll;
    const coord = `client${property === "x" ? "X" : "Y"}`;
    return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord];
  }
  function pointerDown(evt) {
    startEvent = evt;
    lastEvent = evt;
    return readPoint(evt);
  }
  function pointerMove(evt) {
    const diff = readPoint(evt) - readPoint(lastEvent);
    const expired = readTime(evt) - readTime(startEvent) > logInterval;
    lastEvent = evt;
    if (expired) startEvent = evt;
    return diff;
  }
  function pointerUp(evt) {
    if (!startEvent || !lastEvent) return 0;
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent);
    const diffTime = readTime(evt) - readTime(startEvent);
    const expired = readTime(evt) - readTime(lastEvent) > logInterval;
    const force = diffDrag / diffTime;
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1;
    return isFlick ? force : 0;
  }
  const self = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint
  };
  return self;
}
function NodeRects() {
  function measure(node) {
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight
    } = node;
    const offset = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    };
    return offset;
  }
  const self = {
    measure
  };
  return self;
}
function PercentOfView(viewSize) {
  function measure(n) {
    return viewSize * (n / 100);
  }
  const self = {
    measure
  };
  return self;
}
function ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects) {
  const observeNodes = [container].concat(slides);
  let resizeObserver;
  let containerSize;
  let slideSizes = [];
  let destroyed = false;
  function readSize(node) {
    return axis.measureSize(nodeRects.measure(node));
  }
  function init(emblaApi) {
    if (!watchResize) return;
    containerSize = readSize(container);
    slideSizes = slides.map(readSize);
    function defaultCallback(entries) {
      for (const entry of entries) {
        if (destroyed) return;
        const isContainer = entry.target === container;
        const slideIndex = slides.indexOf(entry.target);
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
        const newSize = readSize(isContainer ? container : slides[slideIndex]);
        const diffSize = mathAbs(newSize - lastSize);
        if (diffSize >= 0.5) {
          emblaApi.reInit();
          eventHandler.emit("resize");
          break;
        }
      }
    }
    resizeObserver = new ResizeObserver((entries) => {
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries);
      }
    });
    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach((node) => resizeObserver.observe(node));
    });
  }
  function destroy() {
    destroyed = true;
    if (resizeObserver) resizeObserver.disconnect();
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function ScrollBody(location, offsetLocation, previousLocation, target, baseDuration, baseFriction) {
  let scrollVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek() {
    const displacement = target.get() - location.get();
    const isInstant = !scrollDuration;
    let scrollDistance = 0;
    if (isInstant) {
      scrollVelocity = 0;
      previousLocation.set(target);
      location.set(target);
      scrollDistance = displacement;
    } else {
      previousLocation.set(location);
      scrollVelocity += displacement / scrollDuration;
      scrollVelocity *= scrollFriction;
      rawLocation += scrollVelocity;
      location.add(scrollVelocity);
      scrollDistance = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign(scrollDistance);
    rawLocationPrevious = rawLocation;
    return self;
  }
  function settled() {
    const diff = target.get() - offsetLocation.get();
    return mathAbs(diff) < 1e-3;
  }
  function duration() {
    return scrollDuration;
  }
  function direction() {
    return scrollDirection;
  }
  function velocity() {
    return scrollVelocity;
  }
  function useBaseDuration() {
    return useDuration(baseDuration);
  }
  function useBaseFriction() {
    return useFriction(baseFriction);
  }
  function useDuration(n) {
    scrollDuration = n;
    return self;
  }
  function useFriction(n) {
    scrollFriction = n;
    return self;
  }
  const self = {
    direction,
    duration,
    velocity,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration
  };
  return self;
}
function ScrollBounds(limit, location, target, scrollBody, percentOfView) {
  const pullBackThreshold = percentOfView.measure(10);
  const edgeOffsetTolerance = percentOfView.measure(50);
  const frictionLimit = Limit(0.1, 0.99);
  let disabled = false;
  function shouldConstrain() {
    if (disabled) return false;
    if (!limit.reachedAny(target.get())) return false;
    if (!limit.reachedAny(location.get())) return false;
    return true;
  }
  function constrain(pointerDown) {
    if (!shouldConstrain()) return;
    const edge = limit.reachedMin(location.get()) ? "min" : "max";
    const diffToEdge = mathAbs(limit[edge] - location.get());
    const diffToTarget = target.get() - location.get();
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance);
    target.subtract(diffToTarget * friction);
    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()));
      scrollBody.useDuration(25).useBaseFriction();
    }
  }
  function toggleActive(active) {
    disabled = !active;
  }
  const self = {
    shouldConstrain,
    constrain,
    toggleActive
  };
  return self;
}
function ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance) {
  const scrollBounds = Limit(-contentSize + viewSize, 0);
  const snapsBounded = measureBounded();
  const scrollContainLimit = findScrollContainLimit();
  const snapsContained = measureContained();
  function usePixelTolerance(bound, snap) {
    return deltaAbs(bound, snap) <= 1;
  }
  function findScrollContainLimit() {
    const startSnap = snapsBounded[0];
    const endSnap = arrayLast(snapsBounded);
    const min = snapsBounded.lastIndexOf(startSnap);
    const max = snapsBounded.indexOf(endSnap) + 1;
    return Limit(min, max);
  }
  function measureBounded() {
    return snapsAligned.map((snapAligned, index) => {
      const {
        min,
        max
      } = scrollBounds;
      const snap = scrollBounds.constrain(snapAligned);
      const isFirst = !index;
      const isLast = arrayIsLastIndex(snapsAligned, index);
      if (isFirst) return max;
      if (isLast) return min;
      if (usePixelTolerance(min, snap)) return min;
      if (usePixelTolerance(max, snap)) return max;
      return snap;
    }).map((scrollBound) => parseFloat(scrollBound.toFixed(3)));
  }
  function measureContained() {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max];
    if (containScroll === "keepSnaps") return snapsBounded;
    const {
      min,
      max
    } = scrollContainLimit;
    return snapsBounded.slice(min, max);
  }
  const self = {
    snapsContained,
    scrollContainLimit
  };
  return self;
}
function ScrollLimit(contentSize, scrollSnaps, loop) {
  const max = scrollSnaps[0];
  const min = loop ? max - contentSize : arrayLast(scrollSnaps);
  const limit = Limit(min, max);
  const self = {
    limit
  };
  return self;
}
function ScrollLooper(contentSize, limit, location, vectors) {
  const jointSafety = 0.1;
  const min = limit.min + jointSafety;
  const max = limit.max + jointSafety;
  const {
    reachedMin,
    reachedMax
  } = Limit(min, max);
  function shouldLoop(direction) {
    if (direction === 1) return reachedMax(location.get());
    if (direction === -1) return reachedMin(location.get());
    return false;
  }
  function loop(direction) {
    if (!shouldLoop(direction)) return;
    const loopDistance = contentSize * (direction * -1);
    vectors.forEach((v) => v.add(loopDistance));
  }
  const self = {
    loop
  };
  return self;
}
function ScrollProgress(limit) {
  const {
    max,
    length
  } = limit;
  function get(n) {
    const currentLocation = n - max;
    return length ? currentLocation / -length : 0;
  }
  const self = {
    get
  };
  return self;
}
function ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll) {
  const {
    startEdge,
    endEdge
  } = axis;
  const {
    groupSlides
  } = slidesToScroll;
  const alignments = measureSizes().map(alignment.measure);
  const snaps = measureUnaligned();
  const snapsAligned = measureAligned();
  function measureSizes() {
    return groupSlides(slideRects).map((rects) => arrayLast(rects)[endEdge] - rects[0][startEdge]).map(mathAbs);
  }
  function measureUnaligned() {
    return slideRects.map((rect) => containerRect[startEdge] - rect[startEdge]).map((snap) => -mathAbs(snap));
  }
  function measureAligned() {
    return groupSlides(snaps).map((g) => g[0]).map((snap, index) => snap + alignments[index]);
  }
  const self = {
    snaps,
    snapsAligned
  };
  return self;
}
function SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes) {
  const {
    groupSlides
  } = slidesToScroll;
  const {
    min,
    max
  } = scrollContainLimit;
  const slideRegistry = createSlideRegistry();
  function createSlideRegistry() {
    const groupedSlideIndexes = groupSlides(slideIndexes);
    const doNotContain = !containSnaps || containScroll === "keepSnaps";
    if (scrollSnaps.length === 1) return [slideIndexes];
    if (doNotContain) return groupedSlideIndexes;
    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(groups, index);
      if (isFirst) {
        const range = arrayLast(groups[0]) + 1;
        return arrayFromNumber(range);
      }
      if (isLast) {
        const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1;
        return arrayFromNumber(range, arrayLast(groups)[0]);
      }
      return group;
    });
  }
  const self = {
    slideRegistry
  };
  return self;
}
function ScrollTarget(loop, scrollSnaps, contentSize, limit, targetVector) {
  const {
    reachedAny,
    removeOffset,
    constrain
  } = limit;
  function minDistance(distances) {
    return distances.concat().sort((a, b) => mathAbs(a) - mathAbs(b))[0];
  }
  function findTargetSnap(target) {
    const distance = loop ? removeOffset(target) : constrain(target);
    const ascDiffsToSnaps = scrollSnaps.map((snap, index2) => ({
      diff: shortcut(snap - distance, 0),
      index: index2
    })).sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff));
    const {
      index
    } = ascDiffsToSnaps[0];
    return {
      index,
      distance
    };
  }
  function shortcut(target, direction) {
    const targets = [target, target + contentSize, target - contentSize];
    if (!loop) return target;
    if (!direction) return minDistance(targets);
    const matchingTargets = targets.filter((t) => mathSign(t) === direction);
    if (matchingTargets.length) return minDistance(matchingTargets);
    return arrayLast(targets) - contentSize;
  }
  function byIndex(index, direction) {
    const diffToSnap = scrollSnaps[index] - targetVector.get();
    const distance = shortcut(diffToSnap, direction);
    return {
      index,
      distance
    };
  }
  function byDistance(distance, snap) {
    const target = targetVector.get() + distance;
    const {
      index,
      distance: targetSnapDistance
    } = findTargetSnap(target);
    const reachedBound = !loop && reachedAny(target);
    if (!snap || reachedBound) return {
      index,
      distance
    };
    const diffToSnap = scrollSnaps[index] - targetSnapDistance;
    const snapDistance = distance + shortcut(diffToSnap, 0);
    return {
      index,
      distance: snapDistance
    };
  }
  const self = {
    byDistance,
    byIndex,
    shortcut
  };
  return self;
}
function ScrollTo(animation, indexCurrent, indexPrevious, scrollBody, scrollTarget, targetVector, eventHandler) {
  function scrollTo(target) {
    const distanceDiff = target.distance;
    const indexDiff = target.index !== indexCurrent.get();
    targetVector.add(distanceDiff);
    if (distanceDiff) {
      if (scrollBody.duration()) {
        animation.start();
      } else {
        animation.update();
        animation.render(1);
        animation.update();
      }
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get());
      indexCurrent.set(target.index);
      eventHandler.emit("select");
    }
  }
  function distance(n, snap) {
    const target = scrollTarget.byDistance(n, snap);
    scrollTo(target);
  }
  function index(n, direction) {
    const targetIndex = indexCurrent.clone().set(n);
    const target = scrollTarget.byIndex(targetIndex.get(), direction);
    scrollTo(target);
  }
  const self = {
    distance,
    index
  };
  return self;
}
function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus) {
  const focusListenerOptions = {
    passive: true,
    capture: true
  };
  let lastTabPressTime = 0;
  function init(emblaApi) {
    if (!watchFocus) return;
    function defaultCallback(index) {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      eventHandler.emit("slideFocusStart");
      root.scrollLeft = 0;
      const group = slideRegistry.findIndex((group2) => group2.includes(index));
      if (!isNumber(group)) return;
      scrollBody.useDuration(0);
      scrollTo.index(group, 0);
      eventHandler.emit("slideFocus");
    }
    eventStore.add(document, "keydown", registerTabPress, false);
    slides.forEach((slide, slideIndex) => {
      eventStore.add(slide, "focus", (evt) => {
        if (isBoolean(watchFocus) || watchFocus(emblaApi, evt)) {
          defaultCallback(slideIndex);
        }
      }, focusListenerOptions);
    });
  }
  function registerTabPress(event) {
    if (event.code === "Tab") lastTabPressTime = (/* @__PURE__ */ new Date()).getTime();
  }
  const self = {
    init
  };
  return self;
}
function Vector1D(initialValue) {
  let value = initialValue;
  function get() {
    return value;
  }
  function set(n) {
    value = normalizeInput(n);
  }
  function add(n) {
    value += normalizeInput(n);
  }
  function subtract(n) {
    value -= normalizeInput(n);
  }
  function normalizeInput(n) {
    return isNumber(n) ? n : n.get();
  }
  const self = {
    get,
    set,
    add,
    subtract
  };
  return self;
}
function Translate(axis, container) {
  const translate = axis.scroll === "x" ? x : y;
  const containerStyle = container.style;
  let previousTarget = null;
  let disabled = false;
  function x(n) {
    return `translate3d(${n}px,0px,0px)`;
  }
  function y(n) {
    return `translate3d(0px,${n}px,0px)`;
  }
  function to(target) {
    if (disabled) return;
    const newTarget = roundToTwoDecimals(axis.direction(target));
    if (newTarget === previousTarget) return;
    containerStyle.transform = translate(newTarget);
    previousTarget = newTarget;
  }
  function toggleActive(active) {
    disabled = !active;
  }
  function clear() {
    if (disabled) return;
    containerStyle.transform = "";
    if (!container.getAttribute("style")) container.removeAttribute("style");
  }
  const self = {
    clear,
    to,
    toggleActive
  };
  return self;
}
function SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, location, slides) {
  const roundingSafety = 0.5;
  const ascItems = arrayKeys(slideSizesWithGaps);
  const descItems = arrayKeys(slideSizesWithGaps).reverse();
  const loopPoints = startPoints().concat(endPoints());
  function removeSlideSizes(indexes, from) {
    return indexes.reduce((a, i) => {
      return a - slideSizesWithGaps[i];
    }, from);
  }
  function slidesInGap(indexes, gap) {
    return indexes.reduce((a, i) => {
      const remainingGap = removeSlideSizes(a, gap);
      return remainingGap > 0 ? a.concat([i]) : a;
    }, []);
  }
  function findSlideBounds(offset) {
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }));
  }
  function findLoopPoints(indexes, offset, isEndEdge) {
    const slideBounds = findSlideBounds(offset);
    return indexes.map((index) => {
      const initial = isEndEdge ? 0 : -contentSize;
      const altered = isEndEdge ? contentSize : 0;
      const boundEdge = isEndEdge ? "end" : "start";
      const loopPoint = slideBounds[index][boundEdge];
      return {
        index,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: Translate(axis, slides[index]),
        target: () => location.get() > loopPoint ? initial : altered
      };
    });
  }
  function startPoints() {
    const gap = scrollSnaps[0];
    const indexes = slidesInGap(descItems, gap);
    return findLoopPoints(indexes, contentSize, false);
  }
  function endPoints() {
    const gap = viewSize - scrollSnaps[0] - 1;
    const indexes = slidesInGap(ascItems, gap);
    return findLoopPoints(indexes, -contentSize, true);
  }
  function canLoop() {
    return loopPoints.every(({
      index
    }) => {
      const otherIndexes = ascItems.filter((i) => i !== index);
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1;
    });
  }
  function loop() {
    loopPoints.forEach((loopPoint) => {
      const {
        target,
        translate,
        slideLocation
      } = loopPoint;
      const shiftLocation = target();
      if (shiftLocation === slideLocation.get()) return;
      translate.to(shiftLocation);
      slideLocation.set(shiftLocation);
    });
  }
  function clear() {
    loopPoints.forEach((loopPoint) => loopPoint.translate.clear());
  }
  const self = {
    canLoop,
    clear,
    loop,
    loopPoints
  };
  return self;
}
function SlidesHandler(container, eventHandler, watchSlides) {
  let mutationObserver;
  let destroyed = false;
  function init(emblaApi) {
    if (!watchSlides) return;
    function defaultCallback(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          emblaApi.reInit();
          eventHandler.emit("slidesChanged");
          break;
        }
      }
    }
    mutationObserver = new MutationObserver((mutations) => {
      if (destroyed) return;
      if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
        defaultCallback(mutations);
      }
    });
    mutationObserver.observe(container, {
      childList: true
    });
  }
  function destroy() {
    if (mutationObserver) mutationObserver.disconnect();
    destroyed = true;
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function SlidesInView(container, slides, eventHandler, threshold) {
  const intersectionEntryMap = {};
  let inViewCache = null;
  let notInViewCache = null;
  let intersectionObserver;
  let destroyed = false;
  function init() {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (destroyed) return;
      entries.forEach((entry) => {
        const index = slides.indexOf(entry.target);
        intersectionEntryMap[index] = entry;
      });
      inViewCache = null;
      notInViewCache = null;
      eventHandler.emit("slidesInView");
    }, {
      root: container.parentElement,
      threshold
    });
    slides.forEach((slide) => intersectionObserver.observe(slide));
  }
  function destroy() {
    if (intersectionObserver) intersectionObserver.disconnect();
    destroyed = true;
  }
  function createInViewList(inView) {
    return objectKeys(intersectionEntryMap).reduce((list, slideIndex) => {
      const index = parseInt(slideIndex);
      const {
        isIntersecting
      } = intersectionEntryMap[index];
      const inViewMatch = inView && isIntersecting;
      const notInViewMatch = !inView && !isIntersecting;
      if (inViewMatch || notInViewMatch) list.push(index);
      return list;
    }, []);
  }
  function get(inView = true) {
    if (inView && inViewCache) return inViewCache;
    if (!inView && notInViewCache) return notInViewCache;
    const slideIndexes = createInViewList(inView);
    if (inView) inViewCache = slideIndexes;
    if (!inView) notInViewCache = slideIndexes;
    return slideIndexes;
  }
  const self = {
    init,
    destroy,
    get
  };
  return self;
}
function SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow) {
  const {
    measureSize,
    startEdge,
    endEdge
  } = axis;
  const withEdgeGap = slideRects[0] && readEdgeGap;
  const startGap = measureStartGap();
  const endGap = measureEndGap();
  const slideSizes = slideRects.map(measureSize);
  const slideSizesWithGaps = measureWithGaps();
  function measureStartGap() {
    if (!withEdgeGap) return 0;
    const slideRect = slideRects[0];
    return mathAbs(containerRect[startEdge] - slideRect[startEdge]);
  }
  function measureEndGap() {
    if (!withEdgeGap) return 0;
    const style = ownerWindow.getComputedStyle(arrayLast(slides));
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`));
  }
  function measureWithGaps() {
    return slideRects.map((rect, index, rects) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(rects, index);
      if (isFirst) return slideSizes[index] + startGap;
      if (isLast) return slideSizes[index] + endGap;
      return rects[index + 1][startEdge] - rect[startEdge];
    }).map(mathAbs);
  }
  const self = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  };
  return self;
}
function SlidesToScroll(axis, viewSize, slidesToScroll, loop, containerRect, slideRects, startGap, endGap, pixelTolerance) {
  const {
    startEdge,
    endEdge,
    direction
  } = axis;
  const groupByNumber = isNumber(slidesToScroll);
  function byNumber(array, groupSize) {
    return arrayKeys(array).filter((i) => i % groupSize === 0).map((i) => array.slice(i, i + groupSize));
  }
  function bySize(array) {
    if (!array.length) return [];
    return arrayKeys(array).reduce((groups, rectB, index) => {
      const rectA = arrayLast(groups) || 0;
      const isFirst = rectA === 0;
      const isLast = rectB === arrayLastIndex(array);
      const edgeA = containerRect[startEdge] - slideRects[rectA][startEdge];
      const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge];
      const gapA = !loop && isFirst ? direction(startGap) : 0;
      const gapB = !loop && isLast ? direction(endGap) : 0;
      const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA));
      if (index && chunkSize > viewSize + pixelTolerance) groups.push(rectB);
      if (isLast) groups.push(array.length);
      return groups;
    }, []).map((currentSize, index, groups) => {
      const previousSize = Math.max(groups[index - 1] || 0);
      return array.slice(previousSize, currentSize);
    });
  }
  function groupSlides(array) {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array);
  }
  const self = {
    groupSlides
  };
  return self;
}
function Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler) {
  const {
    align,
    axis: scrollAxis,
    direction,
    startIndex,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    watchResize,
    watchSlides,
    watchDrag,
    watchFocus
  } = options;
  const pixelTolerance = 2;
  const nodeRects = NodeRects();
  const containerRect = nodeRects.measure(container);
  const slideRects = slides.map(nodeRects.measure);
  const axis = Axis(scrollAxis, direction);
  const viewSize = axis.measureSize(containerRect);
  const percentOfView = PercentOfView(viewSize);
  const alignment = Alignment(align, viewSize);
  const containSnaps = !loop && !!containScroll;
  const readEdgeGap = loop || !!containScroll;
  const {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  } = SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow);
  const slidesToScroll = SlidesToScroll(axis, viewSize, groupSlides, loop, containerRect, slideRects, startGap, endGap, pixelTolerance);
  const {
    snaps,
    snapsAligned
  } = ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll);
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);
  const {
    snapsContained,
    scrollContainLimit
  } = ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance);
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned;
  const {
    limit
  } = ScrollLimit(contentSize, scrollSnaps, loop);
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop);
  const indexPrevious = index.clone();
  const slideIndexes = arrayKeys(slides);
  const update = ({
    dragHandler,
    scrollBody: scrollBody2,
    scrollBounds,
    options: {
      loop: loop2
    }
  }) => {
    if (!loop2) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody2.seek();
  };
  const render = ({
    scrollBody: scrollBody2,
    translate,
    location: location2,
    offsetLocation: offsetLocation2,
    previousLocation: previousLocation2,
    scrollLooper,
    slideLooper,
    dragHandler,
    animation: animation2,
    eventHandler: eventHandler2,
    scrollBounds,
    options: {
      loop: loop2
    }
  }, alpha) => {
    const shouldSettle = scrollBody2.settled();
    const withinBounds = !scrollBounds.shouldConstrain();
    const hasSettled = loop2 ? shouldSettle : shouldSettle && withinBounds;
    const hasSettledAndIdle = hasSettled && !dragHandler.pointerDown();
    if (hasSettledAndIdle) animation2.stop();
    const interpolatedLocation = location2.get() * alpha + previousLocation2.get() * (1 - alpha);
    offsetLocation2.set(interpolatedLocation);
    if (loop2) {
      scrollLooper.loop(scrollBody2.direction());
      slideLooper.loop();
    }
    translate.to(offsetLocation2.get());
    if (hasSettledAndIdle) eventHandler2.emit("settle");
    if (!hasSettled) eventHandler2.emit("scroll");
  };
  const animation = Animations(ownerDocument, ownerWindow, () => update(engine), (alpha) => render(engine, alpha));
  const friction = 0.68;
  const startLocation = scrollSnaps[index.get()];
  const location = Vector1D(startLocation);
  const previousLocation = Vector1D(startLocation);
  const offsetLocation = Vector1D(startLocation);
  const target = Vector1D(startLocation);
  const scrollBody = ScrollBody(location, offsetLocation, previousLocation, target, duration, friction);
  const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
  const scrollTo = ScrollTo(animation, index, indexPrevious, scrollBody, scrollTarget, target, eventHandler);
  const scrollProgress = ScrollProgress(limit);
  const eventStore = EventStore();
  const slidesInView = SlidesInView(container, slides, eventHandler, inViewThreshold);
  const {
    slideRegistry
  } = SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes);
  const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus);
  const engine = {
    ownerDocument,
    ownerWindow,
    eventHandler,
    containerRect,
    slideRects,
    animation,
    axis,
    dragHandler: DragHandler(axis, root, ownerDocument, ownerWindow, target, DragTracker(axis, ownerWindow), location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, friction, watchDrag),
    eventStore,
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    previousLocation,
    options,
    resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects),
    scrollBody,
    scrollBounds: ScrollBounds(limit, offsetLocation, target, scrollBody, percentOfView),
    scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [location, offsetLocation, previousLocation, target]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides),
    slideFocus,
    slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    target,
    translate: Translate(axis, container)
  };
  return engine;
}
function EventHandler() {
  let listeners = {};
  let api;
  function init(emblaApi) {
    api = emblaApi;
  }
  function getListeners(evt) {
    return listeners[evt] || [];
  }
  function emit(evt) {
    getListeners(evt).forEach((e) => e(api, evt));
    return self;
  }
  function on(evt, cb) {
    listeners[evt] = getListeners(evt).concat([cb]);
    return self;
  }
  function off(evt, cb) {
    listeners[evt] = getListeners(evt).filter((e) => e !== cb);
    return self;
  }
  function clear() {
    listeners = {};
  }
  const self = {
    init,
    emit,
    off,
    on,
    clear
  };
  return self;
}
const defaultOptions = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true
};
function OptionsHandler(ownerWindow) {
  function mergeOptions(optionsA, optionsB) {
    return objectsMergeDeep(optionsA, optionsB || {});
  }
  function optionsAtMedia(options) {
    const optionsAtMedia2 = options.breakpoints || {};
    const matchedMediaOptions = objectKeys(optionsAtMedia2).filter((media) => ownerWindow.matchMedia(media).matches).map((media) => optionsAtMedia2[media]).reduce((a, mediaOption) => mergeOptions(a, mediaOption), {});
    return mergeOptions(options, matchedMediaOptions);
  }
  function optionsMediaQueries(optionsList) {
    return optionsList.map((options) => objectKeys(options.breakpoints || {})).reduce((acc, mediaQueries) => acc.concat(mediaQueries), []).map(ownerWindow.matchMedia);
  }
  const self = {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  };
  return self;
}
function PluginsHandler(optionsHandler) {
  let activePlugins = [];
  function init(emblaApi, plugins) {
    activePlugins = plugins.filter(({
      options
    }) => optionsHandler.optionsAtMedia(options).active !== false);
    activePlugins.forEach((plugin) => plugin.init(emblaApi, optionsHandler));
    return plugins.reduce((map, plugin) => Object.assign(map, {
      [plugin.name]: plugin
    }), {});
  }
  function destroy() {
    activePlugins = activePlugins.filter((plugin) => plugin.destroy());
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function EmblaCarousel(root, userOptions, userPlugins) {
  const ownerDocument = root.ownerDocument;
  const ownerWindow = ownerDocument.defaultView;
  const optionsHandler = OptionsHandler(ownerWindow);
  const pluginsHandler = PluginsHandler(optionsHandler);
  const mediaHandlers = EventStore();
  const eventHandler = EventHandler();
  const {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  } = optionsHandler;
  const {
    on,
    off,
    emit
  } = eventHandler;
  const reInit = reActivate;
  let destroyed = false;
  let engine;
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions);
  let options = mergeOptions(optionsBase);
  let pluginList = [];
  let pluginApis;
  let container;
  let slides;
  function storeElements() {
    const {
      container: userContainer,
      slides: userSlides
    } = options;
    const customContainer = isString(userContainer) ? root.querySelector(userContainer) : userContainer;
    container = customContainer || root.children[0];
    const customSlides = isString(userSlides) ? container.querySelectorAll(userSlides) : userSlides;
    slides = [].slice.call(customSlides || container.children);
  }
  function createEngine(options2) {
    const engine2 = Engine(root, container, slides, ownerDocument, ownerWindow, options2, eventHandler);
    if (options2.loop && !engine2.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options2, {
        loop: false
      });
      return createEngine(optionsWithoutLoop);
    }
    return engine2;
  }
  function activate(withOptions, withPlugins) {
    if (destroyed) return;
    optionsBase = mergeOptions(optionsBase, withOptions);
    options = optionsAtMedia(optionsBase);
    pluginList = withPlugins || pluginList;
    storeElements();
    engine = createEngine(options);
    optionsMediaQueries([optionsBase, ...pluginList.map(({
      options: options2
    }) => options2)]).forEach((query) => mediaHandlers.add(query, "change", reActivate));
    if (!options.active) return;
    engine.translate.to(engine.location.get());
    engine.animation.init();
    engine.slidesInView.init();
    engine.slideFocus.init(self);
    engine.eventHandler.init(self);
    engine.resizeHandler.init(self);
    engine.slidesHandler.init(self);
    if (engine.options.loop) engine.slideLooper.loop();
    if (container.offsetParent && slides.length) engine.dragHandler.init(self);
    pluginApis = pluginsHandler.init(self, pluginList);
  }
  function reActivate(withOptions, withPlugins) {
    const startIndex = selectedScrollSnap();
    deActivate();
    activate(mergeOptions({
      startIndex
    }, withOptions), withPlugins);
    eventHandler.emit("reInit");
  }
  function deActivate() {
    engine.dragHandler.destroy();
    engine.eventStore.clear();
    engine.translate.clear();
    engine.slideLooper.clear();
    engine.resizeHandler.destroy();
    engine.slidesHandler.destroy();
    engine.slidesInView.destroy();
    engine.animation.destroy();
    pluginsHandler.destroy();
    mediaHandlers.clear();
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    mediaHandlers.clear();
    deActivate();
    eventHandler.emit("destroy");
    eventHandler.clear();
  }
  function scrollTo(index, jump, direction) {
    if (!options.active || destroyed) return;
    engine.scrollBody.useBaseFriction().useDuration(jump === true ? 0 : options.duration);
    engine.scrollTo.index(index, direction || 0);
  }
  function scrollNext(jump) {
    const next = engine.index.add(1).get();
    scrollTo(next, jump, -1);
  }
  function scrollPrev(jump) {
    const prev = engine.index.add(-1).get();
    scrollTo(prev, jump, 1);
  }
  function canScrollNext() {
    const next = engine.index.add(1).get();
    return next !== selectedScrollSnap();
  }
  function canScrollPrev() {
    const prev = engine.index.add(-1).get();
    return prev !== selectedScrollSnap();
  }
  function scrollSnapList() {
    return engine.scrollSnapList;
  }
  function scrollProgress() {
    return engine.scrollProgress.get(engine.offsetLocation.get());
  }
  function selectedScrollSnap() {
    return engine.index.get();
  }
  function previousScrollSnap() {
    return engine.indexPrevious.get();
  }
  function slidesInView() {
    return engine.slidesInView.get();
  }
  function slidesNotInView() {
    return engine.slidesInView.get(false);
  }
  function plugins() {
    return pluginApis;
  }
  function internalEngine() {
    return engine;
  }
  function rootNode() {
    return root;
  }
  function containerNode() {
    return container;
  }
  function slideNodes() {
    return slides;
  }
  const self = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy,
    off,
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  };
  activate(userOptions, userPlugins);
  setTimeout(() => eventHandler.emit("init"), 0);
  return self;
}
EmblaCarousel.globalOptions = void 0;
function useEmblaCarousel(options = {}, plugins = []) {
  const storedOptions = reactExports.useRef(options);
  const storedPlugins = reactExports.useRef(plugins);
  const [emblaApi, setEmblaApi] = reactExports.useState();
  const [viewport, setViewport] = reactExports.useState();
  const reInit = reactExports.useCallback(() => {
    if (emblaApi) emblaApi.reInit(storedOptions.current, storedPlugins.current);
  }, [emblaApi]);
  reactExports.useEffect(() => {
    if (areOptionsEqual(storedOptions.current, options)) return;
    storedOptions.current = options;
    reInit();
  }, [options, reInit]);
  reactExports.useEffect(() => {
    if (arePluginsEqual(storedPlugins.current, plugins)) return;
    storedPlugins.current = plugins;
    reInit();
  }, [plugins, reInit]);
  reactExports.useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions;
      const newEmblaApi = EmblaCarousel(viewport, storedOptions.current, storedPlugins.current);
      setEmblaApi(newEmblaApi);
      return () => newEmblaApi.destroy();
    } else {
      setEmblaApi(void 0);
    }
  }, [viewport, setEmblaApi]);
  return [setViewport, emblaApi];
}
useEmblaCarousel.globalOptions = void 0;
const isColorOption = (name) => /colou?r|shade|tint|hue|finish/i.test(name.trim());
const isSizeOption = (name) => /^sizes?$/i.test(name.trim());
function isValidCssColor(value) {
  if (!value) return false;
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) return true;
  if (/^(rgb|hsl)a?\(/.test(value)) return true;
  const namedColors = [
    "red",
    "blue",
    "green",
    "black",
    "white",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "grey",
    "navy",
    "teal",
    "olive",
    "maroon",
    "beige",
    "coral",
    "cyan",
    "magenta",
    "silver",
    "gold"
  ];
  return namedColors.includes(value.toLowerCase());
}
const BADGE_LABELS = {
  "new-arrival": "New Arrival",
  "limited-edition": "Limited Edition",
  bestseller: "Bestseller"
};
const SIZE_ORDER = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "2XL",
  "3XL",
  "4XL",
  "5XL"
];
const SIZE_CHARTS = {
  // ── MEN'S TRACKPANTS ──
  "mens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S TRACKPANTS",
    columns: ["Size", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      {
        Size: "S",
        "Waist (in)": "28–30",
        "Hip (in)": "36–38",
        "Length (in)": "40"
      },
      {
        Size: "M",
        "Waist (in)": "30–32",
        "Hip (in)": "38–40",
        "Length (in)": "41"
      },
      {
        Size: "L",
        "Waist (in)": "32–34",
        "Hip (in)": "40–42",
        "Length (in)": "42"
      },
      {
        Size: "XL",
        "Waist (in)": "34–36",
        "Hip (in)": "42–44",
        "Length (in)": "43"
      },
      {
        Size: "XXL",
        "Waist (in)": "36–38",
        "Hip (in)": "44–46",
        "Length (in)": "44"
      }
    ],
    fitNote: `Relaxed straight fit. Model is 6'0" wearing size M.`,
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the widest point of your hips."
  },
  // ── MEN'S SHORTS ──
  "mens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S SHORTS",
    columns: [
      "Size",
      "Waist Relaxed",
      "Waist Stretch",
      "Hip",
      "Length",
      "Leg Opening"
    ],
    rows: [
      {
        Size: "S",
        "Waist Relaxed": "28",
        "Waist Stretch": "32",
        Hip: "36",
        Length: "18",
        "Leg Opening": "22"
      },
      {
        Size: "M",
        "Waist Relaxed": "30",
        "Waist Stretch": "34",
        Hip: "38",
        Length: "18.5",
        "Leg Opening": "23"
      },
      {
        Size: "L",
        "Waist Relaxed": "32",
        "Waist Stretch": "36",
        Hip: "40",
        Length: "19",
        "Leg Opening": "24"
      },
      {
        Size: "XL",
        "Waist Relaxed": "34",
        "Waist Stretch": "38",
        Hip: "42",
        Length: "19.5",
        "Leg Opening": "25"
      },
      {
        Size: "XXL",
        "Waist Relaxed": "36",
        "Waist Stretch": "40",
        Hip: "44",
        Length: "20",
        "Leg Opening": "26"
      }
    ],
    fitNote: `Relaxed fit. Inseam length: 7". Model is 5'11" wearing size M.`,
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the widest point of your hips."
  },
  // ── MEN'S PLUS SIZE TRACKPANTS (same chart as mens-trackpants extended) ──
  "plus-mens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S PLUS SIZE TRACKPANTS",
    columns: ["Size", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      {
        Size: "XL",
        "Waist (in)": "34–36",
        "Hip (in)": "42–44",
        "Length (in)": "43"
      },
      {
        Size: "XXL",
        "Waist (in)": "36–38",
        "Hip (in)": "44–46",
        "Length (in)": "44"
      },
      {
        Size: "2XL",
        "Waist (in)": "38–40",
        "Hip (in)": "46–48",
        "Length (in)": "45"
      },
      {
        Size: "3XL",
        "Waist (in)": "40–42",
        "Hip (in)": "48–50",
        "Length (in)": "46"
      },
      {
        Size: "4XL",
        "Waist (in)": "42–44",
        "Hip (in)": "50–52",
        "Length (in)": "47"
      },
      {
        Size: "5XL",
        "Waist (in)": "44–46",
        "Hip (in)": "52–54",
        "Length (in)": "48"
      }
    ],
    fitNote: "Relaxed straight fit.",
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the widest point of your hips."
  },
  // ── MEN'S PLUS SIZE SHORTS ──
  "plus-mens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S PLUS SIZE SHORTS",
    columns: [
      "Size",
      "Waist Relaxed",
      "Waist Stretch",
      "Hip",
      "Length",
      "Leg Opening"
    ],
    rows: [
      {
        Size: "XL",
        "Waist Relaxed": "34",
        "Waist Stretch": "38",
        Hip: "42",
        Length: "19.5",
        "Leg Opening": "25"
      },
      {
        Size: "XXL",
        "Waist Relaxed": "36",
        "Waist Stretch": "40",
        Hip: "44",
        Length: "20",
        "Leg Opening": "26"
      },
      {
        Size: "2XL",
        "Waist Relaxed": "38",
        "Waist Stretch": "42",
        Hip: "46",
        Length: "20.5",
        "Leg Opening": "27"
      },
      {
        Size: "3XL",
        "Waist Relaxed": "40",
        "Waist Stretch": "44",
        Hip: "48",
        Length: "21",
        "Leg Opening": "28"
      },
      {
        Size: "4XL",
        "Waist Relaxed": "42",
        "Waist Stretch": "46",
        Hip: "50",
        Length: "21.5",
        "Leg Opening": "29"
      },
      {
        Size: "5XL",
        "Waist Relaxed": "44",
        "Waist Stretch": "48",
        Hip: "52",
        Length: "22",
        "Leg Opening": "30"
      }
    ],
    fitNote: 'Relaxed fit. Inseam length: 7".',
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the widest point of your hips."
  },
  // ── WOMEN'S TRACKPANTS ──
  "womens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S TRACKPANTS",
    columns: [
      "Size",
      "Waist (in)",
      "Hip (in)",
      "Outer Length (in)",
      "Leg Opening (in)"
    ],
    rows: [
      {
        Size: "S",
        "Waist (in)": "26–27",
        "Hip (in)": "35–36",
        "Outer Length (in)": "39",
        "Leg Opening (in)": "14"
      },
      {
        Size: "M",
        "Waist (in)": "28–29",
        "Hip (in)": "37–38",
        "Outer Length (in)": "40",
        "Leg Opening (in)": "14.5"
      },
      {
        Size: "L",
        "Waist (in)": "30–31",
        "Hip (in)": "39–40",
        "Outer Length (in)": "41",
        "Leg Opening (in)": "15"
      },
      {
        Size: "XL",
        "Waist (in)": "32–33",
        "Hip (in)": "41–42",
        "Outer Length (in)": "42",
        "Leg Opening (in)": "15.5"
      },
      {
        Size: "XXL",
        "Waist (in)": "34–35",
        "Hip (in)": "43–44",
        "Outer Length (in)": "43",
        "Leg Opening (in)": "16"
      }
    ],
    fitNote: `Relaxed straight fit. Model is 5'7" wearing size S.`,
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the fullest part of your hips."
  },
  // ── WOMEN'S SHORTS ──
  "womens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S SHORTS",
    columns: [],
    rows: [],
    fitNote: "",
    howToMeasure: void 0
  },
  // ── WOMEN'S PLUS SIZE TRACKPANTS ──
  "plus-womens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S PLUS SIZE TRACKPANTS",
    columns: [
      "Size",
      "Waist (in)",
      "Hip (in)",
      "Outer Length (in)",
      "Leg Opening (in)"
    ],
    rows: [
      {
        Size: "XL",
        "Waist (in)": "32–33",
        "Hip (in)": "41–42",
        "Outer Length (in)": "42",
        "Leg Opening (in)": "15.5"
      },
      {
        Size: "XXL",
        "Waist (in)": "34–35",
        "Hip (in)": "43–44",
        "Outer Length (in)": "43",
        "Leg Opening (in)": "16"
      },
      {
        Size: "2XL",
        "Waist (in)": "36–38",
        "Hip (in)": "46–48",
        "Outer Length (in)": "44",
        "Leg Opening (in)": "16.5"
      },
      {
        Size: "3XL",
        "Waist (in)": "38–40",
        "Hip (in)": "48–50",
        "Outer Length (in)": "45",
        "Leg Opening (in)": "17"
      },
      {
        Size: "4XL",
        "Waist (in)": "40–42",
        "Hip (in)": "50–52",
        "Outer Length (in)": "46",
        "Leg Opening (in)": "17.5"
      },
      {
        Size: "5XL",
        "Waist (in)": "42–44",
        "Hip (in)": "52–54",
        "Outer Length (in)": "47",
        "Leg Opening (in)": "18"
      }
    ],
    fitNote: `Relaxed straight fit. Model is 5'5" wearing size 4XL.`,
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the fullest part of your hips."
  },
  // ── WOMEN'S PLUS SIZE SHORTS ──
  "plus-womens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S PLUS SIZE SHORTS",
    columns: ["Size", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      {
        Size: "2XL",
        "Waist (in)": "38–40",
        "Hip (in)": "46–48",
        "Length (in)": "18"
      },
      {
        Size: "3XL",
        "Waist (in)": "40–42",
        "Hip (in)": "48–50",
        "Length (in)": "18.5"
      },
      {
        Size: "4XL",
        "Waist (in)": "42–44",
        "Hip (in)": "50–52",
        "Length (in)": "19"
      },
      {
        Size: "5XL",
        "Waist (in)": "44–46",
        "Hip (in)": "52–54",
        "Length (in)": "19.5"
      }
    ],
    fitNote: `Relaxed fit. Model is 5'5" wearing size 4XL.`,
    howToMeasure: "Waist: measure around your natural waist. Hip: measure at the fullest part of your hips."
  }
};
function getSizeChart(genderCategory, category) {
  if (!genderCategory) return null;
  const key = `${genderCategory}-${category}`;
  return SIZE_CHARTS[key] ?? null;
}
function SizeGuideModal({
  open,
  onClose,
  genderCategory,
  category
}) {
  const chart = getSizeChart(genderCategory, category);
  const [activeTab, setActiveTab] = reactExports.useState("chart");
  const sizeGuideImage = (() => {
    if (!genderCategory) return null;
    const map = {
      "mens-trackpants": "/size-guide-mens-trackpants.jpg",
      "mens-shorts": "/size-guide-mens-shorts.jpg",
      "womens-trackpants": "/size-guide-womens-trackpants.jpg",
      "plus-womens-shorts": "/size-guide-womens-plus-shorts.jpg"
    };
    const key = `${genderCategory}-${category}`;
    return map[key] ?? null;
  })();
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (open) setActiveTab("chart");
  }, [open]);
  if (!open) return null;
  const isWomensShortsFallback = genderCategory === "womens" && category === "shorts";
  const hasChart = !!chart && chart.columns.length > 0;
  const showTabs = sizeGuideImage !== null;
  return (
    // biome-ignore lint/a11y/useSemanticElements: dialog cannot be used here due to layout constraints
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Size Guide",
        className: "fixed inset-0 z-[200] flex items-end sm:items-center justify-center",
        "data-ocid": "product_detail.size_guide.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "fixed inset-0 bg-black/75 backdrop-blur-sm",
              onClick: onClose,
              onKeyDown: (e) => e.key === "Escape" && onClose(),
              "aria-hidden": "true",
              role: "presentation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 32 },
              transition: { duration: 0.28, ease: "easeOut" },
              className: "relative z-10 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-xl overflow-hidden flex flex-col bg-background border border-border",
              style: { maxHeight: "92vh" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between px-5 sm:px-7 py-5 shrink-0 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.35em] font-black text-primary", children: "VE YRON" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base md:text-lg text-foreground tracking-wide uppercase", children: chart ? chart.subtitle : "SIZE GUIDE" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mt-0.5 text-muted-foreground", children: "All measurements in inches" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "data-ocid": "product_detail.size_guide.close_button",
                      "aria-label": "Close size guide",
                      className: "w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 shrink-0 ml-4 hover:text-foreground hover:bg-muted",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15, strokeWidth: 2 })
                    }
                  )
                ] }),
                showTabs && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveTab("chart"),
                      "data-ocid": "product_detail.size_guide.chart_tab",
                      className: `flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${activeTab === "chart" ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`,
                      children: "Size Chart"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveTab("image"),
                      "data-ocid": "product_detail.size_guide.image_tab",
                      className: `flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${activeTab === "image" ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`,
                      children: "Size Guide Image"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto overscroll-contain", children: [
                  showTabs && activeTab === "image" && sizeGuideImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 sm:px-7 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: sizeGuideImage,
                      alt: "Size guide",
                      className: "w-full h-auto rounded-sm",
                      style: {
                        objectFit: "contain",
                        maxWidth: "100%",
                        display: "block"
                      }
                    }
                  ) }),
                  (!showTabs || activeTab === "chart") && (isWomensShortsFallback ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 sm:px-7 py-10 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 22, className: "text-primary", strokeWidth: 1.5 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2 text-foreground", children: "Women's Shorts" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-muted-foreground max-w-xs mx-auto", children: [
                      "Women's Shorts size guide will be available soon. For size assistance, please contact us at",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "mailto:brangelbusiness@gmail.com",
                          className: "text-primary underline underline-offset-2",
                          children: "brangelbusiness@gmail.com"
                        }
                      )
                    ] })
                  ] }) : hasChart ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 sm:px-7 py-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-1 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "table",
                      {
                        className: "w-full",
                        style: { borderCollapse: "collapse" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted", children: chart.columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              className: "text-left px-4 py-3 text-muted-foreground border-b border-border",
                              style: {
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap"
                              },
                              children: col
                            },
                            col
                          )) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: chart.rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "tr",
                            {
                              className: idx % 2 === 0 ? "bg-background" : "bg-muted/40",
                              children: chart.columns.map((col, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "td",
                                {
                                  className: "px-4 py-3 text-sm",
                                  style: {
                                    fontWeight: ci === 0 ? 700 : 400,
                                    whiteSpace: "nowrap"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: ci === 0 ? "text-foreground" : "text-muted-foreground",
                                      children: row[col]
                                    }
                                  )
                                },
                                col
                              ))
                            },
                            row.Size
                          )) })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic mt-5 text-muted-foreground", children: chart.fitNote }),
                    chart.howToMeasure && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-lg bg-muted border border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest font-semibold mb-2 text-primary", children: "How to Measure" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: chart.howToMeasure })
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 sm:px-7 py-10 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 22, className: "text-primary", strokeWidth: 1.5 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2 text-foreground", children: "Size guide coming soon" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-muted-foreground", children: [
                      "For sizing help, contact us at",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "mailto:brangelbusiness@gmail.com",
                          className: "underline underline-offset-2 text-primary",
                          children: "brangelbusiness@gmail.com"
                        }
                      )
                    ] })
                  ] }))
                ] })
              ]
            }
          )
        ]
      }
    )
  );
}
function sortSizes(sizes) {
  return [...sizes].sort((a, b) => {
    const ai = SIZE_ORDER.indexOf(a.toUpperCase());
    const bi = SIZE_ORDER.indexOf(b.toUpperCase());
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}
function AddedToast({ visible }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24, scale: 0.96 },
      animate: {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 24,
        scale: visible ? 1 : 0.96
      },
      transition: { duration: 0.22 },
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none",
      "aria-live": "polite",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-5 py-3 bg-card border border-border shadow-lg text-foreground text-xs uppercase tracking-widest font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14, className: "text-primary" }),
        "Added to bag"
      ] })
    }
  );
}
function ImageGallery({ images, badge }) {
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const thumbStripRef = reactExports.useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false
  });
  const scrollPrev = reactExports.useCallback(() => emblaApi == null ? void 0 : emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = reactExports.useCallback(() => emblaApi == null ? void 0 : emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = reactExports.useCallback(
    (index) => emblaApi == null ? void 0 : emblaApi.scrollTo(index),
    [emblaApi]
  );
  reactExports.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0, true);
    const onSelect = () => {
      var _a;
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      if (thumbStripRef.current) {
        const thumbs = thumbStripRef.current.querySelectorAll("button");
        (_a = thumbs[idx]) == null ? void 0 : _a.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);
  const canScrollPrev = selectedIndex > 0;
  const canScrollNext = selectedIndex < images.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: emblaRef,
          className: "overflow-hidden w-full",
          style: {
            background: "oklch(97% 0 0)",
            border: "1px solid oklch(var(--border))",
            borderRadius: "4px"
          },
          "data-ocid": "product_detail.image_carousel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", style: { willChange: "transform" }, children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                flex: "0 0 100%",
                minWidth: 0,
                position: "relative",
                paddingBottom: "100%"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img.src,
                  alt: img.alt || `Product image ${idx + 1}`,
                  style: {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    padding: "16px",
                    display: "block"
                  },
                  loading: idx === 0 ? "eager" : "lazy",
                  draggable: false
                }
              )
            },
            img.src || `slide-${idx}`
          )) })
        }
      ),
      images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: scrollPrev,
            disabled: !canScrollPrev,
            "data-ocid": "product_detail.gallery_prev.button",
            "aria-label": "Previous image",
            className: `absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground transition-smooth ${canScrollPrev ? "opacity-100 hover:bg-card hover:border-foreground/40" : "opacity-0 pointer-events-none"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18, strokeWidth: 1.5 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: scrollNext,
            disabled: !canScrollNext,
            "data-ocid": "product_detail.gallery_next.button",
            "aria-label": "Next image",
            className: `absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground transition-smooth ${canScrollNext ? "opacity-100 hover:bg-card hover:border-foreground/40" : "opacity-0 pointer-events-none"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, strokeWidth: 1.5 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-widest text-white/80 font-mono rounded-sm", children: [
          selectedIndex + 1,
          " / ",
          images.length
        ] })
      ] }),
      badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-primary text-primary-foreground", children: BADGE_LABELS[badge] ?? badge }) })
    ] }),
    images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: thumbStripRef,
        className: "flex gap-2 overflow-x-auto scrollbar-none pb-1",
        "aria-label": "Image thumbnails",
        children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => scrollTo(idx),
            "data-ocid": `product_detail.gallery_thumb.${idx + 1}`,
            "aria-label": `View image ${idx + 1}`,
            className: `shrink-0 w-[68px] h-[68px] overflow-hidden transition-smooth ${selectedIndex === idx ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : "opacity-55 hover:opacity-100 ring-1 ring-border"}`,
            style: { background: "oklch(97% 0 0)", borderRadius: "2px" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img.src,
                alt: img.alt || `Thumbnail ${idx + 1}`,
                className: "w-full h-full",
                style: { objectFit: "contain", padding: "4px" }
              }
            )
          },
          img.src || `thumb-${idx}`
        ))
      }
    )
  ] });
}
function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  ocid,
  icon
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        "data-ocid": ocid,
        className: "w-full flex items-center justify-between py-4 text-xs uppercase tracking-widest font-semibold text-foreground hover:text-primary transition-colors duration-200",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            icon,
            title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 15,
              className: `transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: false,
        animate: { height: open ? "auto" : 0, opacity: open ? 1 : 0 },
        transition: { duration: 0.28, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-5", children })
      }
    )
  ] });
}
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted/50 rounded-sm w-32 animate-pulse" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[55fr_45fr] gap-8 md:gap-16 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full bg-muted/30 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-[68px] h-[68px] bg-muted/30 rounded-sm shrink-0"
          },
          k
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted/30 rounded-sm w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted/40 rounded-sm w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-primary/20 rounded-sm w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pt-2", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-3 bg-muted/20 rounded-sm",
            style: { width: `${100 - k * 10}%` }
          },
          k
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-2", children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-12 bg-muted/30 rounded-sm" }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 bg-primary/20 rounded-sm w-full" })
      ] })
    ] }) })
  ] });
}
function getCategoryLabel(genderCategory, category) {
  const gcMap = {
    mens: "MEN'S",
    womens: "WOMEN'S",
    "plus-mens": "MEN'S PLUS SIZE",
    "plus-womens": "WOMEN'S PLUS SIZE"
  };
  const catMap = {
    trackpants: "TRACKPANTS",
    shorts: "SHORTS"
  };
  return `${gcMap[genderCategory]} ${catMap[category]}`;
}
function ProductDetail() {
  const { handle } = useParams({ from: "/products/$handle" });
  const { product, isLoading } = useShopifyProduct(handle);
  const { products: allProducts } = useAllProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = reactExports.useState(
    void 0
  );
  const [selectedColor, setSelectedColor] = reactExports.useState(
    void 0
  );
  const [quantity, setQuantity] = reactExports.useState(1);
  const [toastVisible, setToastVisible] = reactExports.useState(false);
  const [descExpanded, setDescExpanded] = reactExports.useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = reactExports.useState(false);
  const toastTimerRef = reactExports.useRef(null);
  const closeSizeGuide = reactExports.useCallback(() => setSizeGuideOpen(false), []);
  const sizeOptions = product ? sortSizes([
    ...new Set(
      product.variants.flatMap(
        (v) => v.selectedOptions.filter((o) => isSizeOption(o.name)).map((o) => o.value)
      ).filter((v) => typeof v === "string" && v.length > 0)
    )
  ]) : [];
  const colorOptions = product ? [
    ...new Set(
      product.variants.flatMap(
        (v) => v.selectedOptions.filter((o) => isColorOption(o.name)).map((o) => o.value)
      ).filter((v) => typeof v === "string" && v.length > 0)
    )
  ] : [];
  const resolvedVariant = (() => {
    if (!product) return void 0;
    const variants = product.variants;
    if (!variants.length) return void 0;
    const matches = variants.filter((v) => {
      const sizeMatch = !sizeOptions.length || !selectedSize || v.selectedOptions.some(
        (o) => isSizeOption(o.name) && o.value === selectedSize
      );
      const colorMatch = !colorOptions.length || !selectedColor || v.selectedOptions.some(
        (o) => isColorOption(o.name) && o.value === selectedColor
      );
      return sizeMatch && colorMatch;
    });
    return matches.find((v) => v.available) ?? matches[0] ?? variants.find((v) => v.available) ?? variants[0];
  })();
  reactExports.useEffect(() => {
    var _a, _b;
    if (!(product == null ? void 0 : product.variants.length)) return;
    const first = product.variants.find((v) => v.available) ?? product.variants[0];
    if (sizeOptions.length) {
      setSelectedSize(
        (_a = first.selectedOptions.find((o) => isSizeOption(o.name))) == null ? void 0 : _a.value
      );
    }
    if (colorOptions.length) {
      setSelectedColor(
        (_b = first.selectedOptions.find((o) => isColorOption(o.name))) == null ? void 0 : _b.value
      );
    }
    setQuantity(1);
  }, [product == null ? void 0 : product.id]);
  function showToast() {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastVisible(true);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 2200);
  }
  function handleAddToCart() {
    if (!resolvedVariant || !product || !resolvedVariant.available) return;
    addItem(product, resolvedVariant, quantity);
    showToast();
  }
  const relatedProducts = product ? allProducts.filter(
    (p) => p.id !== product.id && p.genderCategory === product.genderCategory && p.category === product.category
  ).slice(0, 4) : [];
  reactExports.useEffect(() => {
    var _a;
    if (!product) return;
    for (const s of document.querySelectorAll("script[data-veyron-ld]"))
      s.remove();
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.description || `Premium ${product.category} by VE YRON`,
      brand: { "@type": "Brand", name: "VE YRON" },
      image: ((_a = product.images[0]) == null ? void 0 : _a.src) ?? "",
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: product.variants.some((v) => v.available) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        seller: { "@type": "Organization", name: "VE YRON" }
      }
    };
    const gcMap = {
      mens: "Men's",
      womens: "Women's",
      "plus-mens": "Plus Size Men's",
      "plus-womens": "Plus Size Women's"
    };
    const catMap = {
      trackpants: "Trackpants",
      shorts: "Shorts"
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://veyron.in"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: gcMap[product.genderCategory] ?? "Shop",
          item: `https://veyron.in/shop?gender=${product.genderCategory}`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: catMap[product.category] ?? product.category,
          item: `https://veyron.in/shop?gender=${product.genderCategory}&sub=${product.category}`
        },
        {
          "@type": "ListItem",
          position: 4,
          name: product.title,
          item: `https://veyron.in/products/${product.handle}`
        }
      ]
    };
    for (const schema of [productSchema, breadcrumbSchema]) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-veyron-ld", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    return () => {
      for (const s of document.querySelectorAll("script[data-veyron-ld]"))
        s.remove();
    };
  }, [product]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "product_detail.not_found.section",
        className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-background px-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground text-center", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm", children: "This piece is no longer available." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              "data-ocid": "product_detail.back_to_shop.link",
              className: "text-xs text-primary border border-primary/30 px-6 py-3 hover:bg-primary/10 transition-colors duration-200 uppercase tracking-widest",
              children: "Return to Shop"
            }
          )
        ]
      }
    );
  }
  const galleryImages = product.images.length > 0 ? product.images : [{ src: "", alt: product.title }];
  const priceToShow = (() => {
    if (resolvedVariant && Number.isFinite(resolvedVariant.price) && resolvedVariant.price > 0) {
      return resolvedVariant.price;
    }
    return getProductPrice(product);
  })();
  const shortDesc = product.description.length > 160 ? `${product.description.slice(0, 160).trim()}…` : product.description;
  const descIsTruncated = product.description.length > 160;
  const variantLabel = (resolvedVariant == null ? void 0 : resolvedVariant.title) && resolvedVariant.title !== "Default Title" ? resolvedVariant.title : null;
  const categoryLabel = getCategoryLabel(
    product.genderCategory,
    product.category
  );
  const hasSizeGuide = product.genderCategory === "womens" && product.category === "shorts" ? true : !!getSizeChart(product.genderCategory, product.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: product ? `${product.title} | VE YRON` : "Product | VE YRON",
        description: product ? `Shop ${product.title} — premium ${product.category} by VE YRON. Free delivery across India.` : "Premium activewear by VE YRON."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddedToast, { visible: toastVisible }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SizeGuideModal,
      {
        open: sizeGuideOpen,
        onClose: closeSizeGuide,
        genderCategory: product.genderCategory,
        category: product.category
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-3.5 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            "data-ocid": "product_detail.breadcrumb_home.link",
            className: "hover:text-foreground transition-colors duration-200",
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-30", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/shop",
            "data-ocid": "product_detail.breadcrumb_shop.link",
            className: "hover:text-foreground transition-colors duration-200",
            children: "Shop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-30", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70 truncate max-w-[140px] md:max-w-xs", children: product.title })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "product_detail.section",
          className: "max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[55fr_45fr] gap-6 md:gap-12 lg:gap-18", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -16 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.5 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, { images: galleryImages, badge: product.badge })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 16 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.5, delay: 0.08 },
                  className: "flex flex-col gap-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/shop",
                        "data-ocid": "product_detail.back.link",
                        className: "md:hidden flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors w-fit",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 13 }),
                          " Back"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary uppercase tracking-[0.3em] font-bold", children: "VE YRON" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-muted text-muted-foreground", children: categoryLabel }),
                      product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary", children: BADGE_LABELS[product.badge] ?? product.badge })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl lg:text-[2rem] text-foreground tracking-tight leading-tight", children: product.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 pt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            "data-ocid": "product_detail.price",
                            className: "font-display font-bold text-2xl md:text-3xl text-primary",
                            children: formatPrice(priceToShow)
                          }
                        ),
                        product.compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground line-through text-base", children: formatPrice(product.compareAtPrice) })
                      ] })
                    ] }),
                    shortDesc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: shortDesc }),
                    colorOptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.color_selector", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3", children: [
                        "COLOR",
                        selectedColor && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-foreground", children: selectedColor })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: colorOptions.map((color) => {
                        const variantsForColor = product.variants.filter(
                          (v) => v.selectedOptions.some(
                            (o) => isColorOption(o.name) && o.value === color
                          )
                        );
                        const isSelected = selectedColor === color;
                        const hasAvailable = variantsForColor.some(
                          (v) => v.available
                        );
                        const isCssColor = isValidCssColor(color);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSelectedColor(color),
                            "data-ocid": `product_detail.color.${color.toLowerCase().replace(/\s+/g, "-")}.button`,
                            disabled: !hasAvailable,
                            title: color,
                            className: `flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider border transition-smooth ${isSelected ? "border-primary bg-primary text-primary-foreground" : hasAvailable ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground" : "border-border/30 text-muted-foreground/30 cursor-not-allowed opacity-40"}`,
                            children: [
                              isCssColor && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "w-3 h-3 rounded-full border border-border/50 shrink-0",
                                  style: { backgroundColor: color }
                                }
                              ),
                              color
                            ]
                          },
                          color
                        );
                      }) })
                    ] }),
                    sizeOptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.size_selector", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground", children: [
                          "SIZE",
                          selectedSize && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-foreground font-bold", children: selectedSize })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSizeGuideOpen(true),
                            "data-ocid": "product_detail.size_guide.toggle",
                            className: "flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-primary hover:opacity-75 transition-opacity",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 11, strokeWidth: 2 }),
                              "Size Guide"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sizeOptions.map((size) => {
                        const variantsForSize = product.variants.filter(
                          (v) => v.selectedOptions.some(
                            (o) => isSizeOption(o.name) && o.value === size
                          )
                        );
                        const isSelected = selectedSize === size;
                        const hasAvailable = variantsForSize.some(
                          (v) => v.available
                        );
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSelectedSize(size),
                            "data-ocid": `product_detail.size.${size.toLowerCase()}.button`,
                            disabled: !hasAvailable,
                            className: `relative min-w-[48px] h-11 px-3 text-xs uppercase tracking-wider border transition-smooth ${isSelected ? "border-primary bg-primary/10 text-primary font-bold" : hasAvailable ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground" : "border-border/30 text-muted-foreground/30 cursor-not-allowed"}`,
                            children: [
                              !hasAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                                  "aria-hidden": "true",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "w-full h-px bg-border/40 absolute",
                                      style: { transform: "rotate(-20deg)" }
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: !hasAvailable ? "line-through opacity-40" : "",
                                  children: size
                                }
                              )
                            ]
                          },
                          size
                        );
                      }) }),
                      !hasSizeGuide && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[10px] text-muted-foreground", children: [
                        "Need help with sizing?",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: "mailto:brangelbusiness@gmail.com",
                            className: "text-primary underline underline-offset-2",
                            children: "Contact us"
                          }
                        )
                      ] })
                    ] }),
                    variantLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "-mt-1 text-[10px] text-muted-foreground uppercase tracking-widest", children: [
                      "Selected:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: variantLabel })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.quantity_selector", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3", children: "QUANTITY" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center border border-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "product_detail.quantity_decrease.button",
                            "aria-label": "Decrease quantity",
                            onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                            disabled: quantity <= 1,
                            className: "w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors duration-200 border-r border-border",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 13 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            "data-ocid": "product_detail.quantity_display",
                            className: "w-12 h-11 flex items-center justify-center text-sm font-semibold text-foreground font-mono select-none",
                            children: quantity
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "product_detail.quantity_increase.button",
                            "aria-label": "Increase quantity",
                            onClick: () => setQuantity((q) => Math.min(10, q + 1)),
                            disabled: quantity >= 10,
                            className: "w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors duration-200 border-l border-border",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleAddToCart,
                        disabled: !(resolvedVariant == null ? void 0 : resolvedVariant.available),
                        "data-ocid": "product_detail.add_to_cart.primary_button",
                        className: `w-full h-[54px] flex items-center justify-center gap-3 font-bold text-xs tracking-[0.2em] uppercase transition-smooth ${!(resolvedVariant == null ? void 0 : resolvedVariant.available) ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]"}`,
                        children: !(resolvedVariant == null ? void 0 : resolvedVariant.available) ? "SOLD OUT" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16 }),
                          "ADD TO BAG"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 py-4 border-t border-border", children: [
                      { icon: Shield, text: "100% Authentic" },
                      { icon: Truck, text: "5–7 Day Delivery" },
                      { icon: RotateCcw, text: "7-Day Returns" }
                    ].map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center gap-1.5 text-center",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              size: 14,
                              className: "text-primary",
                              strokeWidth: 1.5
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground uppercase tracking-wider leading-tight", children: text })
                        ]
                      },
                      text
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      CollapsibleSection,
                      {
                        title: "Product Details",
                        ocid: "product_detail.details.toggle",
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 12, strokeWidth: 2 }),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: product.description ? descIsTruncated && !descExpanded ? shortDesc : product.description : "Premium activewear crafted for performance and style. Designed for the modern athlete who demands excellence in every movement." }),
                          descIsTruncated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setDescExpanded((v) => !v),
                              "data-ocid": "product_detail.description.expand_button",
                              className: "mt-2 text-xs text-primary uppercase tracking-widest hover:underline",
                              children: descExpanded ? "Show less" : "Show more"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CollapsibleSection,
                      {
                        title: "Delivery & Shipping",
                        ocid: "product_detail.delivery.toggle",
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 12, strokeWidth: 2 }),
                        defaultOpen: true,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Truck,
                              {
                                size: 13,
                                className: "text-primary mt-0.5 shrink-0",
                                strokeWidth: 1.5
                              }
                            ),
                            "Free delivery across India. Estimated 5–7 business days."
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Shield,
                              {
                                size: 13,
                                className: "text-primary mt-0.5 shrink-0",
                                strokeWidth: 1.5
                              }
                            ),
                            "Secure packaging. Handled with care."
                          ] })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      CollapsibleSection,
                      {
                        title: "Returns & Exchanges",
                        ocid: "product_detail.returns.toggle",
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 12, strokeWidth: 2 }),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm text-muted-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                RotateCcw,
                                {
                                  size: 13,
                                  className: "text-primary mt-0.5 shrink-0",
                                  strokeWidth: 1.5
                                }
                              ),
                              "Easy returns within 7 days of delivery."
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Shield,
                                {
                                  size: 13,
                                  className: "text-primary mt-0.5 shrink-0",
                                  strokeWidth: 1.5
                                }
                              ),
                              "Return shipping charges are borne by the customer."
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                RotateCcw,
                                {
                                  size: 13,
                                  className: "text-primary mt-0.5 shrink-0",
                                  strokeWidth: 1.5
                                }
                              ),
                              "Refund or exchange processed after item is received and inspected."
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/policies",
                              "data-ocid": "product_detail.view_policies.link",
                              className: "mt-4 inline-flex items-center gap-1 text-[10px] text-primary uppercase tracking-widest hover:opacity-80 transition-opacity",
                              children: "View full policies →"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ] }),
            relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "section",
              {
                "data-ocid": "product_detail.related.section",
                className: "mt-16 lg:mt-24",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-4 mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl lg:text-2xl text-foreground tracking-tight", children: "You May Also Like" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: categoryLabel })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 14 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 0.4, delay: i * 0.07 },
                      "data-ocid": `product_detail.related.item.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p })
                    },
                    p.id
                  )) })
                ] })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  ProductDetail as default
};
