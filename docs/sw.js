const rr = () => {
  self.addEventListener("error", nr, !0), self.addEventListener("unhandledrejection", ar, !0);
}, nr = (u) => {
  Ze(u.type, u.error.stack);
}, ar = (u) => {
  Ze(u.type, u.reason.stack);
}, Ze = (u, r) => {
  self.clients.matchAll().then(function(i) {
    if (i)
      for (const c of i)
        c.postMessage({
          type: "PANIC",
          panic: { type: u, stack: r }
        });
  });
};
rr();
try {
  self["workbox:core:7.0.0"] && _();
} catch {
}
const or = (u, ...r) => {
  let i = u;
  return r.length > 0 && (i += ` :: ${JSON.stringify(r)}`), i;
}, ir = or;
class K extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(r, i) {
    const c = ir(r, i);
    super(c), this.name = r, this.details = i;
  }
}
const G = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, Te = (u) => [G.prefix, u, G.suffix].filter((r) => r && r.length > 0).join("-"), sr = (u) => {
  for (const r of Object.keys(G))
    u(r);
}, pe = {
  updateDetails: (u) => {
    sr((r) => {
      typeof u[r] == "string" && (G[r] = u[r]);
    });
  },
  getGoogleAnalyticsName: (u) => u || Te(G.googleAnalytics),
  getPrecacheName: (u) => u || Te(G.precache),
  getPrefix: () => G.prefix,
  getRuntimeName: (u) => u || Te(G.runtime),
  getSuffix: () => G.suffix
};
function Qe(u, r) {
  const i = r();
  return u.waitUntil(i), i;
}
try {
  self["workbox:precaching:7.0.0"] && _();
} catch {
}
const cr = "__WB_REVISION__";
function ur(u) {
  if (!u)
    throw new K("add-to-cache-list-unexpected-type", { entry: u });
  if (typeof u == "string") {
    const d = new URL(u, location.href);
    return {
      cacheKey: d.href,
      url: d.href
    };
  }
  const { revision: r, url: i } = u;
  if (!i)
    throw new K("add-to-cache-list-unexpected-type", { entry: u });
  if (!r) {
    const d = new URL(i, location.href);
    return {
      cacheKey: d.href,
      url: d.href
    };
  }
  const c = new URL(i, location.href), h = new URL(i, location.href);
  return c.searchParams.set(cr, r), {
    cacheKey: c.href,
    url: h.href
  };
}
class fr {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: r, state: i }) => {
      i && (i.originalRequest = r);
    }, this.cachedResponseWillBeUsed = async ({ event: r, state: i, cachedResponse: c }) => {
      if (r.type === "install" && i && i.originalRequest && i.originalRequest instanceof Request) {
        const h = i.originalRequest.url;
        c ? this.notUpdatedURLs.push(h) : this.updatedURLs.push(h);
      }
      return c;
    };
  }
}
class lr {
  constructor({ precacheController: r }) {
    this.cacheKeyWillBeUsed = async ({ request: i, params: c }) => {
      const h = (c == null ? void 0 : c.cacheKey) || this._precacheController.getCacheKeyForURL(i.url);
      return h ? new Request(h, { headers: i.headers }) : i;
    }, this._precacheController = r;
  }
}
let oe;
function hr() {
  if (oe === void 0) {
    const u = new Response("");
    if ("body" in u)
      try {
        new Response(u.body), oe = !0;
      } catch {
        oe = !1;
      }
    oe = !1;
  }
  return oe;
}
async function dr(u, r) {
  let i = null;
  if (u.url && (i = new URL(u.url).origin), i !== self.location.origin)
    throw new K("cross-origin-copy-response", { origin: i });
  const c = u.clone(), h = {
    headers: new Headers(c.headers),
    status: c.status,
    statusText: c.statusText
  }, d = r ? r(h) : h, g = hr() ? c.body : await c.blob();
  return new Response(g, d);
}
const vr = (u) => new URL(String(u), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function Xe(u, r) {
  const i = new URL(u);
  for (const c of r)
    i.searchParams.delete(c);
  return i.href;
}
async function pr(u, r, i, c) {
  const h = Xe(r.url, i);
  if (r.url === h)
    return u.match(r, c);
  const d = Object.assign(Object.assign({}, c), { ignoreSearch: !0 }), g = await u.keys(r, d);
  for (const m of g) {
    const C = Xe(m.url, i);
    if (h === C)
      return u.match(m, c);
  }
}
class gr {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((r, i) => {
      this.resolve = r, this.reject = i;
    });
  }
}
const yr = /* @__PURE__ */ new Set();
async function mr() {
  for (const u of yr)
    await u();
}
function _r(u) {
  return new Promise((r) => setTimeout(r, u));
}
try {
  self["workbox:strategies:7.0.0"] && _();
} catch {
}
function le(u) {
  return typeof u == "string" ? new Request(u) : u;
}
class wr {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(r, i) {
    this._cacheKeys = {}, Object.assign(this, i), this.event = i.event, this._strategy = r, this._handlerDeferred = new gr(), this._extendLifetimePromises = [], this._plugins = [...r.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const c of this._plugins)
      this._pluginStateMap.set(c, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(r) {
    const { event: i } = this;
    let c = le(r);
    if (c.mode === "navigate" && i instanceof FetchEvent && i.preloadResponse) {
      const g = await i.preloadResponse;
      if (g)
        return g;
    }
    const h = this.hasCallback("fetchDidFail") ? c.clone() : null;
    try {
      for (const g of this.iterateCallbacks("requestWillFetch"))
        c = await g({ request: c.clone(), event: i });
    } catch (g) {
      if (g instanceof Error)
        throw new K("plugin-error-request-will-fetch", {
          thrownErrorMessage: g.message
        });
    }
    const d = c.clone();
    try {
      let g;
      g = await fetch(c, c.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const m of this.iterateCallbacks("fetchDidSucceed"))
        g = await m({
          event: i,
          request: d,
          response: g
        });
      return g;
    } catch (g) {
      throw h && await this.runCallbacks("fetchDidFail", {
        error: g,
        event: i,
        originalRequest: h.clone(),
        request: d.clone()
      }), g;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(r) {
    const i = await this.fetch(r), c = i.clone();
    return this.waitUntil(this.cachePut(r, c)), i;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(r) {
    const i = le(r);
    let c;
    const { cacheName: h, matchOptions: d } = this._strategy, g = await this.getCacheKey(i, "read"), m = Object.assign(Object.assign({}, d), { cacheName: h });
    c = await caches.match(g, m);
    for (const C of this.iterateCallbacks("cachedResponseWillBeUsed"))
      c = await C({
        cacheName: h,
        matchOptions: d,
        cachedResponse: c,
        request: g,
        event: this.event
      }) || void 0;
    return c;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(r, i) {
    const c = le(r);
    await _r(0);
    const h = await this.getCacheKey(c, "write");
    if (!i)
      throw new K("cache-put-with-no-response", {
        url: vr(h.url)
      });
    const d = await this._ensureResponseSafeToCache(i);
    if (!d)
      return !1;
    const { cacheName: g, matchOptions: m } = this._strategy, C = await self.caches.open(g), L = this.hasCallback("cacheDidUpdate"), M = L ? await pr(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      C,
      h.clone(),
      ["__WB_REVISION__"],
      m
    ) : null;
    try {
      await C.put(h, L ? d.clone() : d);
    } catch (w) {
      if (w instanceof Error)
        throw w.name === "QuotaExceededError" && await mr(), w;
    }
    for (const w of this.iterateCallbacks("cacheDidUpdate"))
      await w({
        cacheName: g,
        oldResponse: M,
        newResponse: d.clone(),
        request: h,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(r, i) {
    const c = `${r.url} | ${i}`;
    if (!this._cacheKeys[c]) {
      let h = r;
      for (const d of this.iterateCallbacks("cacheKeyWillBeUsed"))
        h = le(await d({
          mode: i,
          request: h,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[c] = h;
    }
    return this._cacheKeys[c];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(r) {
    for (const i of this._strategy.plugins)
      if (r in i)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(r, i) {
    for (const c of this.iterateCallbacks(r))
      await c(i);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(r) {
    for (const i of this._strategy.plugins)
      if (typeof i[r] == "function") {
        const c = this._pluginStateMap.get(i);
        yield (d) => {
          const g = Object.assign(Object.assign({}, d), { state: c });
          return i[r](g);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(r) {
    return this._extendLifetimePromises.push(r), r;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let r;
    for (; r = this._extendLifetimePromises.shift(); )
      await r;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(r) {
    let i = r, c = !1;
    for (const h of this.iterateCallbacks("cacheWillUpdate"))
      if (i = await h({
        request: this.request,
        response: i,
        event: this.event
      }) || void 0, c = !0, !i)
        break;
    return c || i && i.status !== 200 && (i = void 0), i;
  }
}
class br {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(r = {}) {
    this.cacheName = pe.getRuntimeName(r.cacheName), this.plugins = r.plugins || [], this.fetchOptions = r.fetchOptions, this.matchOptions = r.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(r) {
    const [i] = this.handleAll(r);
    return i;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(r) {
    r instanceof FetchEvent && (r = {
      event: r,
      request: r.request
    });
    const i = r.event, c = typeof r.request == "string" ? new Request(r.request) : r.request, h = "params" in r ? r.params : void 0, d = new wr(this, { event: i, request: c, params: h }), g = this._getResponse(d, c, i), m = this._awaitComplete(g, d, c, i);
    return [g, m];
  }
  async _getResponse(r, i, c) {
    await r.runCallbacks("handlerWillStart", { event: c, request: i });
    let h;
    try {
      if (h = await this._handle(i, r), !h || h.type === "error")
        throw new K("no-response", { url: i.url });
    } catch (d) {
      if (d instanceof Error) {
        for (const g of r.iterateCallbacks("handlerDidError"))
          if (h = await g({ error: d, event: c, request: i }), h)
            break;
      }
      if (!h)
        throw d;
    }
    for (const d of r.iterateCallbacks("handlerWillRespond"))
      h = await d({ event: c, request: i, response: h });
    return h;
  }
  async _awaitComplete(r, i, c, h) {
    let d, g;
    try {
      d = await r;
    } catch {
    }
    try {
      await i.runCallbacks("handlerDidRespond", {
        event: h,
        request: c,
        response: d
      }), await i.doneWaiting();
    } catch (m) {
      m instanceof Error && (g = m);
    }
    if (await i.runCallbacks("handlerDidComplete", {
      event: h,
      request: c,
      response: d,
      error: g
    }), i.destroy(), g)
      throw g;
  }
}
class J extends br {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(r = {}) {
    r.cacheName = pe.getPrecacheName(r.cacheName), super(r), this._fallbackToNetwork = r.fallbackToNetwork !== !1, this.plugins.push(J.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(r, i) {
    const c = await i.cacheMatch(r);
    return c || (i.event && i.event.type === "install" ? await this._handleInstall(r, i) : await this._handleFetch(r, i));
  }
  async _handleFetch(r, i) {
    let c;
    const h = i.params || {};
    if (this._fallbackToNetwork) {
      const d = h.integrity, g = r.integrity, m = !g || g === d;
      c = await i.fetch(new Request(r, {
        integrity: r.mode !== "no-cors" ? g || d : void 0
      })), d && m && r.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await i.cachePut(r, c.clone()));
    } else
      throw new K("missing-precache-entry", {
        cacheName: this.cacheName,
        url: r.url
      });
    return c;
  }
  async _handleInstall(r, i) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const c = await i.fetch(r);
    if (!await i.cachePut(r, c.clone()))
      throw new K("bad-precaching-response", {
        url: r.url,
        status: c.status
      });
    return c;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let r = null, i = 0;
    for (const [c, h] of this.plugins.entries())
      h !== J.copyRedirectedCacheableResponsesPlugin && (h === J.defaultPrecacheCacheabilityPlugin && (r = c), h.cacheWillUpdate && i++);
    i === 0 ? this.plugins.push(J.defaultPrecacheCacheabilityPlugin) : i > 1 && r !== null && this.plugins.splice(r, 1);
  }
}
J.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: u }) {
    return !u || u.status >= 400 ? null : u;
  }
};
J.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: u }) {
    return u.redirected ? await dr(u) : u;
  }
};
class Rr {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: r, plugins: i = [], fallbackToNetwork: c = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new J({
      cacheName: pe.getPrecacheName(r),
      plugins: [
        ...i,
        new lr({ precacheController: this })
      ],
      fallbackToNetwork: c
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(r) {
    this.addToCacheList(r), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(r) {
    const i = [];
    for (const c of r) {
      typeof c == "string" ? i.push(c) : c && c.revision === void 0 && i.push(c.url);
      const { cacheKey: h, url: d } = ur(c), g = typeof c != "string" && c.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(d) && this._urlsToCacheKeys.get(d) !== h)
        throw new K("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(d),
          secondEntry: h
        });
      if (typeof c != "string" && c.integrity) {
        if (this._cacheKeysToIntegrities.has(h) && this._cacheKeysToIntegrities.get(h) !== c.integrity)
          throw new K("add-to-cache-list-conflicting-integrities", {
            url: d
          });
        this._cacheKeysToIntegrities.set(h, c.integrity);
      }
      if (this._urlsToCacheKeys.set(d, h), this._urlsToCacheModes.set(d, g), i.length > 0) {
        const m = `Workbox is precaching URLs without revision info: ${i.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(m);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(r) {
    return Qe(r, async () => {
      const i = new fr();
      this.strategy.plugins.push(i);
      for (const [d, g] of this._urlsToCacheKeys) {
        const m = this._cacheKeysToIntegrities.get(g), C = this._urlsToCacheModes.get(d), L = new Request(d, {
          integrity: m,
          cache: C,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: g },
          request: L,
          event: r
        }));
      }
      const { updatedURLs: c, notUpdatedURLs: h } = i;
      return { updatedURLs: c, notUpdatedURLs: h };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(r) {
    return Qe(r, async () => {
      const i = await self.caches.open(this.strategy.cacheName), c = await i.keys(), h = new Set(this._urlsToCacheKeys.values()), d = [];
      for (const g of c)
        h.has(g.url) || (await i.delete(g), d.push(g.url));
      return { deletedURLs: d };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(r) {
    const i = new URL(r, location.href);
    return this._urlsToCacheKeys.get(i.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(r) {
    return this._cacheKeysToIntegrities.get(r);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(r) {
    const i = r instanceof Request ? r.url : r, c = this.getCacheKeyForURL(i);
    if (c)
      return (await self.caches.open(this.strategy.cacheName)).match(c);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(r) {
    const i = this.getCacheKeyForURL(r);
    if (!i)
      throw new K("non-precached-url", { url: r });
    return (c) => (c.request = new Request(r), c.params = Object.assign({ cacheKey: i }, c.params), this.strategy.handle(c));
  }
}
let Ne;
const et = () => (Ne || (Ne = new Rr()), Ne);
try {
  self["workbox:routing:7.0.0"] && _();
} catch {
}
const tt = "GET", ve = (u) => u && typeof u == "object" ? u : { handle: u };
class se {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(r, i, c = tt) {
    this.handler = ve(i), this.match = r, this.method = c;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(r) {
    this.catchHandler = ve(r);
  }
}
class Er extends se {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(r, i, c) {
    const h = ({ url: d }) => {
      const g = r.exec(d.href);
      if (g && !(d.origin !== location.origin && g.index !== 0))
        return g.slice(1);
    };
    super(h, i, c);
  }
}
class Cr {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (r) => {
      const { request: i } = r, c = this.handleRequest({ request: i, event: r });
      c && r.respondWith(c);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (r) => {
      if (r.data && r.data.type === "CACHE_URLS") {
        const { payload: i } = r.data, c = Promise.all(i.urlsToCache.map((h) => {
          typeof h == "string" && (h = [h]);
          const d = new Request(...h);
          return this.handleRequest({ request: d, event: r });
        }));
        r.waitUntil(c), r.ports && r.ports[0] && c.then(() => r.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: r, event: i }) {
    const c = new URL(r.url, location.href);
    if (!c.protocol.startsWith("http"))
      return;
    const h = c.origin === location.origin, { params: d, route: g } = this.findMatchingRoute({
      event: i,
      request: r,
      sameOrigin: h,
      url: c
    });
    let m = g && g.handler;
    const C = r.method;
    if (!m && this._defaultHandlerMap.has(C) && (m = this._defaultHandlerMap.get(C)), !m)
      return;
    let L;
    try {
      L = m.handle({ url: c, request: r, event: i, params: d });
    } catch (w) {
      L = Promise.reject(w);
    }
    const M = g && g.catchHandler;
    return L instanceof Promise && (this._catchHandler || M) && (L = L.catch(async (w) => {
      if (M)
        try {
          return await M.handle({ url: c, request: r, event: i, params: d });
        } catch (E) {
          E instanceof Error && (w = E);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: c, request: r, event: i });
      throw w;
    })), L;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: r, sameOrigin: i, request: c, event: h }) {
    const d = this._routes.get(c.method) || [];
    for (const g of d) {
      let m;
      const C = g.match({ url: r, sameOrigin: i, request: c, event: h });
      if (C)
        return m = C, (Array.isArray(m) && m.length === 0 || C.constructor === Object && // eslint-disable-line
        Object.keys(C).length === 0 || typeof C == "boolean") && (m = void 0), { route: g, params: m };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(r, i = tt) {
    this._defaultHandlerMap.set(i, ve(r));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(r) {
    this._catchHandler = ve(r);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(r) {
    this._routes.has(r.method) || this._routes.set(r.method, []), this._routes.get(r.method).push(r);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(r) {
    if (!this._routes.has(r.method))
      throw new K("unregister-route-but-not-found-with-method", {
        method: r.method
      });
    const i = this._routes.get(r.method).indexOf(r);
    if (i > -1)
      this._routes.get(r.method).splice(i, 1);
    else
      throw new K("unregister-route-route-not-registered");
  }
}
let ie;
const Ir = () => (ie || (ie = new Cr(), ie.addFetchListener(), ie.addCacheListener()), ie);
function Sr(u, r, i) {
  let c;
  if (typeof u == "string") {
    const d = new URL(u, location.href), g = ({ url: m }) => m.href === d.href;
    c = new se(g, r, i);
  } else if (u instanceof RegExp)
    c = new Er(u, r, i);
  else if (typeof u == "function")
    c = new se(u, r, i);
  else if (u instanceof se)
    c = u;
  else
    throw new K("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return Ir().registerRoute(c), c;
}
function Tr(u, r = []) {
  for (const i of [...u.searchParams.keys()])
    r.some((c) => c.test(i)) && u.searchParams.delete(i);
  return u;
}
function* Nr(u, { ignoreURLParametersMatching: r = [/^utm_/, /^fbclid$/], directoryIndex: i = "index.html", cleanURLs: c = !0, urlManipulation: h } = {}) {
  const d = new URL(u, location.href);
  d.hash = "", yield d.href;
  const g = Tr(d, r);
  if (yield g.href, i && g.pathname.endsWith("/")) {
    const m = new URL(g.href);
    m.pathname += i, yield m.href;
  }
  if (c) {
    const m = new URL(g.href);
    m.pathname += ".html", yield m.href;
  }
  if (h) {
    const m = h({ url: d });
    for (const C of m)
      yield C.href;
  }
}
class Lr extends se {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(r, i) {
    const c = ({ request: h }) => {
      const d = r.getURLsToCacheKeys();
      for (const g of Nr(h.url, i)) {
        const m = d.get(g);
        if (m) {
          const C = r.getIntegrityForCacheKey(m);
          return { cacheKey: m, integrity: C };
        }
      }
    };
    super(c, r.strategy);
  }
}
function Ar(u) {
  const r = et(), i = new Lr(r, u);
  Sr(i);
}
const Dr = "-precache-", xr = async (u, r = Dr) => {
  const c = (await self.caches.keys()).filter((h) => h.includes(r) && h.includes(self.registration.scope) && h !== u);
  return await Promise.all(c.map((h) => self.caches.delete(h))), c;
};
function Pr() {
  self.addEventListener("activate", (u) => {
    const r = pe.getPrecacheName();
    u.waitUntil(xr(r).then((i) => {
    }));
  });
}
function Ur(u) {
  et().precache(u);
}
function Or(u, r) {
  Ur(u), Ar(r);
}
function Br() {
  self.addEventListener("activate", () => self.clients.claim());
}
const kr = "list";
var he = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Mr(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
function de(u) {
  throw new Error('Could not dynamically require "' + u + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var rt = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(u, r) {
  (function(i) {
    u.exports = i();
  })(function() {
    return function i(c, h, d) {
      function g(L, M) {
        if (!h[L]) {
          if (!c[L]) {
            var w = typeof de == "function" && de;
            if (!M && w)
              return w(L, !0);
            if (m)
              return m(L, !0);
            var E = new Error("Cannot find module '" + L + "'");
            throw E.code = "MODULE_NOT_FOUND", E;
          }
          var P = h[L] = { exports: {} };
          c[L][0].call(P.exports, function(O) {
            var $ = c[L][1][O];
            return g($ || O);
          }, P, P.exports, i, c, h, d);
        }
        return h[L].exports;
      }
      for (var m = typeof de == "function" && de, C = 0; C < d.length; C++)
        g(d[C]);
      return g;
    }({ 1: [function(i, c, h) {
      (function(d) {
        var g = d.MutationObserver || d.WebKitMutationObserver, m;
        if (g) {
          var C = 0, L = new g(O), M = d.document.createTextNode("");
          L.observe(M, {
            characterData: !0
          }), m = function() {
            M.data = C = ++C % 2;
          };
        } else if (!d.setImmediate && typeof d.MessageChannel < "u") {
          var w = new d.MessageChannel();
          w.port1.onmessage = O, m = function() {
            w.port2.postMessage(0);
          };
        } else
          "document" in d && "onreadystatechange" in d.document.createElement("script") ? m = function() {
            var B = d.document.createElement("script");
            B.onreadystatechange = function() {
              O(), B.onreadystatechange = null, B.parentNode.removeChild(B), B = null;
            }, d.document.documentElement.appendChild(B);
          } : m = function() {
            setTimeout(O, 0);
          };
        var E, P = [];
        function O() {
          E = !0;
          for (var B, q, k = P.length; k; ) {
            for (q = P, P = [], B = -1; ++B < k; )
              q[B]();
            k = P.length;
          }
          E = !1;
        }
        c.exports = $;
        function $(B) {
          P.push(B) === 1 && !E && m();
        }
      }).call(this, typeof he < "u" ? he : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 2: [function(i, c, h) {
      var d = i(1);
      function g() {
      }
      var m = {}, C = ["REJECTED"], L = ["FULFILLED"], M = ["PENDING"];
      c.exports = w;
      function w(b) {
        if (typeof b != "function")
          throw new TypeError("resolver must be a function");
        this.state = M, this.queue = [], this.outcome = void 0, b !== g && $(this, b);
      }
      w.prototype.catch = function(b) {
        return this.then(null, b);
      }, w.prototype.then = function(b, T) {
        if (typeof b != "function" && this.state === L || typeof T != "function" && this.state === C)
          return this;
        var S = new this.constructor(g);
        if (this.state !== M) {
          var D = this.state === L ? b : T;
          P(S, D, this.outcome);
        } else
          this.queue.push(new E(S, b, T));
        return S;
      };
      function E(b, T, S) {
        this.promise = b, typeof T == "function" && (this.onFulfilled = T, this.callFulfilled = this.otherCallFulfilled), typeof S == "function" && (this.onRejected = S, this.callRejected = this.otherCallRejected);
      }
      E.prototype.callFulfilled = function(b) {
        m.resolve(this.promise, b);
      }, E.prototype.otherCallFulfilled = function(b) {
        P(this.promise, this.onFulfilled, b);
      }, E.prototype.callRejected = function(b) {
        m.reject(this.promise, b);
      }, E.prototype.otherCallRejected = function(b) {
        P(this.promise, this.onRejected, b);
      };
      function P(b, T, S) {
        d(function() {
          var D;
          try {
            D = T(S);
          } catch (F) {
            return m.reject(b, F);
          }
          D === b ? m.reject(b, new TypeError("Cannot resolve promise with itself")) : m.resolve(b, D);
        });
      }
      m.resolve = function(b, T) {
        var S = B(O, T);
        if (S.status === "error")
          return m.reject(b, S.value);
        var D = S.value;
        if (D)
          $(b, D);
        else {
          b.state = L, b.outcome = T;
          for (var F = -1, W = b.queue.length; ++F < W; )
            b.queue[F].callFulfilled(T);
        }
        return b;
      }, m.reject = function(b, T) {
        b.state = C, b.outcome = T;
        for (var S = -1, D = b.queue.length; ++S < D; )
          b.queue[S].callRejected(T);
        return b;
      };
      function O(b) {
        var T = b && b.then;
        if (b && (typeof b == "object" || typeof b == "function") && typeof T == "function")
          return function() {
            T.apply(b, arguments);
          };
      }
      function $(b, T) {
        var S = !1;
        function D(j) {
          S || (S = !0, m.reject(b, j));
        }
        function F(j) {
          S || (S = !0, m.resolve(b, j));
        }
        function W() {
          T(F, D);
        }
        var H = B(W);
        H.status === "error" && D(H.value);
      }
      function B(b, T) {
        var S = {};
        try {
          S.value = b(T), S.status = "success";
        } catch (D) {
          S.status = "error", S.value = D;
        }
        return S;
      }
      w.resolve = q;
      function q(b) {
        return b instanceof this ? b : m.resolve(new this(g), b);
      }
      w.reject = k;
      function k(b) {
        var T = new this(g);
        return m.reject(T, b);
      }
      w.all = ge;
      function ge(b) {
        var T = this;
        if (Object.prototype.toString.call(b) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var S = b.length, D = !1;
        if (!S)
          return this.resolve([]);
        for (var F = new Array(S), W = 0, H = -1, j = new this(g); ++H < S; )
          z(b[H], H);
        return j;
        function z(re, ce) {
          T.resolve(re).then(ye, function(ee) {
            D || (D = !0, m.reject(j, ee));
          });
          function ye(ee) {
            F[ce] = ee, ++W === S && !D && (D = !0, m.resolve(j, F));
          }
        }
      }
      w.race = Z;
      function Z(b) {
        var T = this;
        if (Object.prototype.toString.call(b) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var S = b.length, D = !1;
        if (!S)
          return this.resolve([]);
        for (var F = -1, W = new this(g); ++F < S; )
          H(b[F]);
        return W;
        function H(j) {
          T.resolve(j).then(function(z) {
            D || (D = !0, m.resolve(W, z));
          }, function(z) {
            D || (D = !0, m.reject(W, z));
          });
        }
      }
    }, { 1: 1 }], 3: [function(i, c, h) {
      (function(d) {
        typeof d.Promise != "function" && (d.Promise = i(2));
      }).call(this, typeof he < "u" ? he : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { 2: 2 }], 4: [function(i, c, h) {
      var d = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e;
      } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      };
      function g(e, n) {
        if (!(e instanceof n))
          throw new TypeError("Cannot call a class as a function");
      }
      function m() {
        try {
          if (typeof indexedDB < "u")
            return indexedDB;
          if (typeof webkitIndexedDB < "u")
            return webkitIndexedDB;
          if (typeof mozIndexedDB < "u")
            return mozIndexedDB;
          if (typeof OIndexedDB < "u")
            return OIndexedDB;
          if (typeof msIndexedDB < "u")
            return msIndexedDB;
        } catch {
          return;
        }
      }
      var C = m();
      function L() {
        try {
          if (!C || !C.open)
            return !1;
          var e = typeof openDatabase < "u" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), n = typeof fetch == "function" && fetch.toString().indexOf("[native code") !== -1;
          return (!e || n) && typeof indexedDB < "u" && // some outdated implementations of IDB that appear on Samsung
          // and HTC Android devices <4.4 are missing IDBKeyRange
          // See: https://github.com/mozilla/localForage/issues/128
          // See: https://github.com/mozilla/localForage/issues/272
          typeof IDBKeyRange < "u";
        } catch {
          return !1;
        }
      }
      function M(e, n) {
        e = e || [], n = n || {};
        try {
          return new Blob(e, n);
        } catch (a) {
          if (a.name !== "TypeError")
            throw a;
          for (var t = typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder, o = new t(), s = 0; s < e.length; s += 1)
            o.append(e[s]);
          return o.getBlob(n.type);
        }
      }
      typeof Promise > "u" && i(3);
      var w = Promise;
      function E(e, n) {
        n && e.then(function(t) {
          n(null, t);
        }, function(t) {
          n(t);
        });
      }
      function P(e, n, t) {
        typeof n == "function" && e.then(n), typeof t == "function" && e.catch(t);
      }
      function O(e) {
        return typeof e != "string" && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e;
      }
      function $() {
        if (arguments.length && typeof arguments[arguments.length - 1] == "function")
          return arguments[arguments.length - 1];
      }
      var B = "local-forage-detect-blob-support", q = void 0, k = {}, ge = Object.prototype.toString, Z = "readonly", b = "readwrite";
      function T(e) {
        for (var n = e.length, t = new ArrayBuffer(n), o = new Uint8Array(t), s = 0; s < n; s++)
          o[s] = e.charCodeAt(s);
        return t;
      }
      function S(e) {
        return new w(function(n) {
          var t = e.transaction(B, b), o = M([""]);
          t.objectStore(B).put(o, "key"), t.onabort = function(s) {
            s.preventDefault(), s.stopPropagation(), n(!1);
          }, t.oncomplete = function() {
            var s = navigator.userAgent.match(/Chrome\/(\d+)/), a = navigator.userAgent.match(/Edge\//);
            n(a || !s || parseInt(s[1], 10) >= 43);
          };
        }).catch(function() {
          return !1;
        });
      }
      function D(e) {
        return typeof q == "boolean" ? w.resolve(q) : S(e).then(function(n) {
          return q = n, q;
        });
      }
      function F(e) {
        var n = k[e.name], t = {};
        t.promise = new w(function(o, s) {
          t.resolve = o, t.reject = s;
        }), n.deferredOperations.push(t), n.dbReady ? n.dbReady = n.dbReady.then(function() {
          return t.promise;
        }) : n.dbReady = t.promise;
      }
      function W(e) {
        var n = k[e.name], t = n.deferredOperations.pop();
        if (t)
          return t.resolve(), t.promise;
      }
      function H(e, n) {
        var t = k[e.name], o = t.deferredOperations.pop();
        if (o)
          return o.reject(n), o.promise;
      }
      function j(e, n) {
        return new w(function(t, o) {
          if (k[e.name] = k[e.name] || Ae(), e.db)
            if (n)
              F(e), e.db.close();
            else
              return t(e.db);
          var s = [e.name];
          n && s.push(e.version);
          var a = C.open.apply(C, s);
          n && (a.onupgradeneeded = function(f) {
            var l = a.result;
            try {
              l.createObjectStore(e.storeName), f.oldVersion <= 1 && l.createObjectStore(B);
            } catch (v) {
              if (v.name === "ConstraintError")
                console.warn('The database "' + e.name + '" has been upgraded from version ' + f.oldVersion + " to version " + f.newVersion + ', but the storage "' + e.storeName + '" already exists.');
              else
                throw v;
            }
          }), a.onerror = function(f) {
            f.preventDefault(), o(a.error);
          }, a.onsuccess = function() {
            var f = a.result;
            f.onversionchange = function(l) {
              l.target.close();
            }, t(f), W(e);
          };
        });
      }
      function z(e) {
        return j(e, !1);
      }
      function re(e) {
        return j(e, !0);
      }
      function ce(e, n) {
        if (!e.db)
          return !0;
        var t = !e.db.objectStoreNames.contains(e.storeName), o = e.version < e.db.version, s = e.version > e.db.version;
        if (o && (e.version !== n && console.warn('The database "' + e.name + `" can't be downgraded from version ` + e.db.version + " to version " + e.version + "."), e.version = e.db.version), s || t) {
          if (t) {
            var a = e.db.version + 1;
            a > e.version && (e.version = a);
          }
          return !0;
        }
        return !1;
      }
      function ye(e) {
        return new w(function(n, t) {
          var o = new FileReader();
          o.onerror = t, o.onloadend = function(s) {
            var a = btoa(s.target.result || "");
            n({
              __local_forage_encoded_blob: !0,
              data: a,
              type: e.type
            });
          }, o.readAsBinaryString(e);
        });
      }
      function ee(e) {
        var n = T(atob(e.data));
        return M([n], { type: e.type });
      }
      function Le(e) {
        return e && e.__local_forage_encoded_blob;
      }
      function nt(e) {
        var n = this, t = n._initReady().then(function() {
          var o = k[n._dbInfo.name];
          if (o && o.dbReady)
            return o.dbReady;
        });
        return P(t, e, e), t;
      }
      function at(e) {
        F(e);
        for (var n = k[e.name], t = n.forages, o = 0; o < t.length; o++) {
          var s = t[o];
          s._dbInfo.db && (s._dbInfo.db.close(), s._dbInfo.db = null);
        }
        return e.db = null, z(e).then(function(a) {
          return e.db = a, ce(e) ? re(e) : a;
        }).then(function(a) {
          e.db = n.db = a;
          for (var f = 0; f < t.length; f++)
            t[f]._dbInfo.db = a;
        }).catch(function(a) {
          throw H(e, a), a;
        });
      }
      function V(e, n, t, o) {
        o === void 0 && (o = 1);
        try {
          var s = e.db.transaction(e.storeName, n);
          t(null, s);
        } catch (a) {
          if (o > 0 && (!e.db || a.name === "InvalidStateError" || a.name === "NotFoundError"))
            return w.resolve().then(function() {
              if (!e.db || a.name === "NotFoundError" && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version)
                return e.db && (e.version = e.db.version + 1), re(e);
            }).then(function() {
              return at(e).then(function() {
                V(e, n, t, o - 1);
              });
            }).catch(t);
          t(a);
        }
      }
      function Ae() {
        return {
          // Running localForages sharing a database.
          forages: [],
          // Shared database.
          db: null,
          // Database readiness (promise).
          dbReady: null,
          // Deferred operations on the database.
          deferredOperations: []
        };
      }
      function ot(e) {
        var n = this, t = {
          db: null
        };
        if (e)
          for (var o in e)
            t[o] = e[o];
        var s = k[t.name];
        s || (s = Ae(), k[t.name] = s), s.forages.push(n), n._initReady || (n._initReady = n.ready, n.ready = nt);
        var a = [];
        function f() {
          return w.resolve();
        }
        for (var l = 0; l < s.forages.length; l++) {
          var v = s.forages[l];
          v !== n && a.push(v._initReady().catch(f));
        }
        var p = s.forages.slice(0);
        return w.all(a).then(function() {
          return t.db = s.db, z(t);
        }).then(function(y) {
          return t.db = y, ce(t, n._defaultConfig.version) ? re(t) : y;
        }).then(function(y) {
          t.db = s.db = y, n._dbInfo = t;
          for (var R = 0; R < p.length; R++) {
            var I = p[R];
            I !== n && (I._dbInfo.db = t.db, I._dbInfo.version = t.version);
          }
        });
      }
      function it(e, n) {
        var t = this;
        e = O(e);
        var o = new w(function(s, a) {
          t.ready().then(function() {
            V(t._dbInfo, Z, function(f, l) {
              if (f)
                return a(f);
              try {
                var v = l.objectStore(t._dbInfo.storeName), p = v.get(e);
                p.onsuccess = function() {
                  var y = p.result;
                  y === void 0 && (y = null), Le(y) && (y = ee(y)), s(y);
                }, p.onerror = function() {
                  a(p.error);
                };
              } catch (y) {
                a(y);
              }
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function st(e, n) {
        var t = this, o = new w(function(s, a) {
          t.ready().then(function() {
            V(t._dbInfo, Z, function(f, l) {
              if (f)
                return a(f);
              try {
                var v = l.objectStore(t._dbInfo.storeName), p = v.openCursor(), y = 1;
                p.onsuccess = function() {
                  var R = p.result;
                  if (R) {
                    var I = R.value;
                    Le(I) && (I = ee(I));
                    var N = e(I, R.key, y++);
                    N !== void 0 ? s(N) : R.continue();
                  } else
                    s();
                }, p.onerror = function() {
                  a(p.error);
                };
              } catch (R) {
                a(R);
              }
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function ct(e, n, t) {
        var o = this;
        e = O(e);
        var s = new w(function(a, f) {
          var l;
          o.ready().then(function() {
            return l = o._dbInfo, ge.call(n) === "[object Blob]" ? D(l.db).then(function(v) {
              return v ? n : ye(n);
            }) : n;
          }).then(function(v) {
            V(o._dbInfo, b, function(p, y) {
              if (p)
                return f(p);
              try {
                var R = y.objectStore(o._dbInfo.storeName);
                v === null && (v = void 0);
                var I = R.put(v, e);
                y.oncomplete = function() {
                  v === void 0 && (v = null), a(v);
                }, y.onabort = y.onerror = function() {
                  var N = I.error ? I.error : I.transaction.error;
                  f(N);
                };
              } catch (N) {
                f(N);
              }
            });
          }).catch(f);
        });
        return E(s, t), s;
      }
      function ut(e, n) {
        var t = this;
        e = O(e);
        var o = new w(function(s, a) {
          t.ready().then(function() {
            V(t._dbInfo, b, function(f, l) {
              if (f)
                return a(f);
              try {
                var v = l.objectStore(t._dbInfo.storeName), p = v.delete(e);
                l.oncomplete = function() {
                  s();
                }, l.onerror = function() {
                  a(p.error);
                }, l.onabort = function() {
                  var y = p.error ? p.error : p.transaction.error;
                  a(y);
                };
              } catch (y) {
                a(y);
              }
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function ft(e) {
        var n = this, t = new w(function(o, s) {
          n.ready().then(function() {
            V(n._dbInfo, b, function(a, f) {
              if (a)
                return s(a);
              try {
                var l = f.objectStore(n._dbInfo.storeName), v = l.clear();
                f.oncomplete = function() {
                  o();
                }, f.onabort = f.onerror = function() {
                  var p = v.error ? v.error : v.transaction.error;
                  s(p);
                };
              } catch (p) {
                s(p);
              }
            });
          }).catch(s);
        });
        return E(t, e), t;
      }
      function lt(e) {
        var n = this, t = new w(function(o, s) {
          n.ready().then(function() {
            V(n._dbInfo, Z, function(a, f) {
              if (a)
                return s(a);
              try {
                var l = f.objectStore(n._dbInfo.storeName), v = l.count();
                v.onsuccess = function() {
                  o(v.result);
                }, v.onerror = function() {
                  s(v.error);
                };
              } catch (p) {
                s(p);
              }
            });
          }).catch(s);
        });
        return E(t, e), t;
      }
      function ht(e, n) {
        var t = this, o = new w(function(s, a) {
          if (e < 0) {
            s(null);
            return;
          }
          t.ready().then(function() {
            V(t._dbInfo, Z, function(f, l) {
              if (f)
                return a(f);
              try {
                var v = l.objectStore(t._dbInfo.storeName), p = !1, y = v.openKeyCursor();
                y.onsuccess = function() {
                  var R = y.result;
                  if (!R) {
                    s(null);
                    return;
                  }
                  e === 0 || p ? s(R.key) : (p = !0, R.advance(e));
                }, y.onerror = function() {
                  a(y.error);
                };
              } catch (R) {
                a(R);
              }
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function dt(e) {
        var n = this, t = new w(function(o, s) {
          n.ready().then(function() {
            V(n._dbInfo, Z, function(a, f) {
              if (a)
                return s(a);
              try {
                var l = f.objectStore(n._dbInfo.storeName), v = l.openKeyCursor(), p = [];
                v.onsuccess = function() {
                  var y = v.result;
                  if (!y) {
                    o(p);
                    return;
                  }
                  p.push(y.key), y.continue();
                }, v.onerror = function() {
                  s(v.error);
                };
              } catch (y) {
                s(y);
              }
            });
          }).catch(s);
        });
        return E(t, e), t;
      }
      function vt(e, n) {
        n = $.apply(this, arguments);
        var t = this.config();
        e = typeof e != "function" && e || {}, e.name || (e.name = e.name || t.name, e.storeName = e.storeName || t.storeName);
        var o = this, s;
        if (!e.name)
          s = w.reject("Invalid arguments");
        else {
          var a = e.name === t.name && o._dbInfo.db, f = a ? w.resolve(o._dbInfo.db) : z(e).then(function(l) {
            var v = k[e.name], p = v.forages;
            v.db = l;
            for (var y = 0; y < p.length; y++)
              p[y]._dbInfo.db = l;
            return l;
          });
          e.storeName ? s = f.then(function(l) {
            if (l.objectStoreNames.contains(e.storeName)) {
              var v = l.version + 1;
              F(e);
              var p = k[e.name], y = p.forages;
              l.close();
              for (var R = 0; R < y.length; R++) {
                var I = y[R];
                I._dbInfo.db = null, I._dbInfo.version = v;
              }
              var N = new w(function(A, U) {
                var x = C.open(e.name, v);
                x.onerror = function(Y) {
                  var ae = x.result;
                  ae.close(), U(Y);
                }, x.onupgradeneeded = function() {
                  var Y = x.result;
                  Y.deleteObjectStore(e.storeName);
                }, x.onsuccess = function() {
                  var Y = x.result;
                  Y.close(), A(Y);
                };
              });
              return N.then(function(A) {
                p.db = A;
                for (var U = 0; U < y.length; U++) {
                  var x = y[U];
                  x._dbInfo.db = A, W(x._dbInfo);
                }
              }).catch(function(A) {
                throw (H(e, A) || w.resolve()).catch(function() {
                }), A;
              });
            }
          }) : s = f.then(function(l) {
            F(e);
            var v = k[e.name], p = v.forages;
            l.close();
            for (var y = 0; y < p.length; y++) {
              var R = p[y];
              R._dbInfo.db = null;
            }
            var I = new w(function(N, A) {
              var U = C.deleteDatabase(e.name);
              U.onerror = function() {
                var x = U.result;
                x && x.close(), A(U.error);
              }, U.onblocked = function() {
                console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed');
              }, U.onsuccess = function() {
                var x = U.result;
                x && x.close(), N(x);
              };
            });
            return I.then(function(N) {
              v.db = N;
              for (var A = 0; A < p.length; A++) {
                var U = p[A];
                W(U._dbInfo);
              }
            }).catch(function(N) {
              throw (H(e, N) || w.resolve()).catch(function() {
              }), N;
            });
          });
        }
        return E(s, n), s;
      }
      var pt = {
        _driver: "asyncStorage",
        _initStorage: ot,
        _support: L(),
        iterate: st,
        getItem: it,
        setItem: ct,
        removeItem: ut,
        clear: ft,
        length: lt,
        key: ht,
        keys: dt,
        dropInstance: vt
      };
      function gt() {
        return typeof openDatabase == "function";
      }
      var Q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", yt = "~~local_forage_type~", De = /^~~local_forage_type~([^~]+)~/, ue = "__lfsc__:", me = ue.length, _e = "arbf", we = "blob", xe = "si08", Pe = "ui08", Ue = "uic8", Oe = "si16", Be = "si32", ke = "ur16", Me = "ui32", Fe = "fl32", Ke = "fl64", We = me + _e.length, He = Object.prototype.toString;
      function je(e) {
        var n = e.length * 0.75, t = e.length, o, s = 0, a, f, l, v;
        e[e.length - 1] === "=" && (n--, e[e.length - 2] === "=" && n--);
        var p = new ArrayBuffer(n), y = new Uint8Array(p);
        for (o = 0; o < t; o += 4)
          a = Q.indexOf(e[o]), f = Q.indexOf(e[o + 1]), l = Q.indexOf(e[o + 2]), v = Q.indexOf(e[o + 3]), y[s++] = a << 2 | f >> 4, y[s++] = (f & 15) << 4 | l >> 2, y[s++] = (l & 3) << 6 | v & 63;
        return p;
      }
      function be(e) {
        var n = new Uint8Array(e), t = "", o;
        for (o = 0; o < n.length; o += 3)
          t += Q[n[o] >> 2], t += Q[(n[o] & 3) << 4 | n[o + 1] >> 4], t += Q[(n[o + 1] & 15) << 2 | n[o + 2] >> 6], t += Q[n[o + 2] & 63];
        return n.length % 3 === 2 ? t = t.substring(0, t.length - 1) + "=" : n.length % 3 === 1 && (t = t.substring(0, t.length - 2) + "=="), t;
      }
      function mt(e, n) {
        var t = "";
        if (e && (t = He.call(e)), e && (t === "[object ArrayBuffer]" || e.buffer && He.call(e.buffer) === "[object ArrayBuffer]")) {
          var o, s = ue;
          e instanceof ArrayBuffer ? (o = e, s += _e) : (o = e.buffer, t === "[object Int8Array]" ? s += xe : t === "[object Uint8Array]" ? s += Pe : t === "[object Uint8ClampedArray]" ? s += Ue : t === "[object Int16Array]" ? s += Oe : t === "[object Uint16Array]" ? s += ke : t === "[object Int32Array]" ? s += Be : t === "[object Uint32Array]" ? s += Me : t === "[object Float32Array]" ? s += Fe : t === "[object Float64Array]" ? s += Ke : n(new Error("Failed to get type for BinaryArray"))), n(s + be(o));
        } else if (t === "[object Blob]") {
          var a = new FileReader();
          a.onload = function() {
            var f = yt + e.type + "~" + be(this.result);
            n(ue + we + f);
          }, a.readAsArrayBuffer(e);
        } else
          try {
            n(JSON.stringify(e));
          } catch (f) {
            console.error("Couldn't convert value into a JSON string: ", e), n(null, f);
          }
      }
      function _t(e) {
        if (e.substring(0, me) !== ue)
          return JSON.parse(e);
        var n = e.substring(We), t = e.substring(me, We), o;
        if (t === we && De.test(n)) {
          var s = n.match(De);
          o = s[1], n = n.substring(s[0].length);
        }
        var a = je(n);
        switch (t) {
          case _e:
            return a;
          case we:
            return M([a], { type: o });
          case xe:
            return new Int8Array(a);
          case Pe:
            return new Uint8Array(a);
          case Ue:
            return new Uint8ClampedArray(a);
          case Oe:
            return new Int16Array(a);
          case ke:
            return new Uint16Array(a);
          case Be:
            return new Int32Array(a);
          case Me:
            return new Uint32Array(a);
          case Fe:
            return new Float32Array(a);
          case Ke:
            return new Float64Array(a);
          default:
            throw new Error("Unkown type: " + t);
        }
      }
      var Re = {
        serialize: mt,
        deserialize: _t,
        stringToBuffer: je,
        bufferToString: be
      };
      function Ye(e, n, t, o) {
        e.executeSql("CREATE TABLE IF NOT EXISTS " + n.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], t, o);
      }
      function wt(e) {
        var n = this, t = {
          db: null
        };
        if (e)
          for (var o in e)
            t[o] = typeof e[o] != "string" ? e[o].toString() : e[o];
        var s = new w(function(a, f) {
          try {
            t.db = openDatabase(t.name, String(t.version), t.description, t.size);
          } catch (l) {
            return f(l);
          }
          t.db.transaction(function(l) {
            Ye(l, t, function() {
              n._dbInfo = t, a();
            }, function(v, p) {
              f(p);
            });
          }, f);
        });
        return t.serializer = Re, s;
      }
      function X(e, n, t, o, s, a) {
        e.executeSql(t, o, s, function(f, l) {
          l.code === l.SYNTAX_ERR ? f.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [n.storeName], function(v, p) {
            p.rows.length ? a(v, l) : Ye(v, n, function() {
              v.executeSql(t, o, s, a);
            }, a);
          }, a) : a(f, l);
        }, a);
      }
      function bt(e, n) {
        var t = this;
        e = O(e);
        var o = new w(function(s, a) {
          t.ready().then(function() {
            var f = t._dbInfo;
            f.db.transaction(function(l) {
              X(l, f, "SELECT * FROM " + f.storeName + " WHERE key = ? LIMIT 1", [e], function(v, p) {
                var y = p.rows.length ? p.rows.item(0).value : null;
                y && (y = f.serializer.deserialize(y)), s(y);
              }, function(v, p) {
                a(p);
              });
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function Rt(e, n) {
        var t = this, o = new w(function(s, a) {
          t.ready().then(function() {
            var f = t._dbInfo;
            f.db.transaction(function(l) {
              X(l, f, "SELECT * FROM " + f.storeName, [], function(v, p) {
                for (var y = p.rows, R = y.length, I = 0; I < R; I++) {
                  var N = y.item(I), A = N.value;
                  if (A && (A = f.serializer.deserialize(A)), A = e(A, N.key, I + 1), A !== void 0) {
                    s(A);
                    return;
                  }
                }
                s();
              }, function(v, p) {
                a(p);
              });
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function $e(e, n, t, o) {
        var s = this;
        e = O(e);
        var a = new w(function(f, l) {
          s.ready().then(function() {
            n === void 0 && (n = null);
            var v = n, p = s._dbInfo;
            p.serializer.serialize(n, function(y, R) {
              R ? l(R) : p.db.transaction(function(I) {
                X(I, p, "INSERT OR REPLACE INTO " + p.storeName + " (key, value) VALUES (?, ?)", [e, y], function() {
                  f(v);
                }, function(N, A) {
                  l(A);
                });
              }, function(I) {
                if (I.code === I.QUOTA_ERR) {
                  if (o > 0) {
                    f($e.apply(s, [e, v, t, o - 1]));
                    return;
                  }
                  l(I);
                }
              });
            });
          }).catch(l);
        });
        return E(a, t), a;
      }
      function Et(e, n, t) {
        return $e.apply(this, [e, n, t, 1]);
      }
      function Ct(e, n) {
        var t = this;
        e = O(e);
        var o = new w(function(s, a) {
          t.ready().then(function() {
            var f = t._dbInfo;
            f.db.transaction(function(l) {
              X(l, f, "DELETE FROM " + f.storeName + " WHERE key = ?", [e], function() {
                s();
              }, function(v, p) {
                a(p);
              });
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function It(e) {
        var n = this, t = new w(function(o, s) {
          n.ready().then(function() {
            var a = n._dbInfo;
            a.db.transaction(function(f) {
              X(f, a, "DELETE FROM " + a.storeName, [], function() {
                o();
              }, function(l, v) {
                s(v);
              });
            });
          }).catch(s);
        });
        return E(t, e), t;
      }
      function St(e) {
        var n = this, t = new w(function(o, s) {
          n.ready().then(function() {
            var a = n._dbInfo;
            a.db.transaction(function(f) {
              X(f, a, "SELECT COUNT(key) as c FROM " + a.storeName, [], function(l, v) {
                var p = v.rows.item(0).c;
                o(p);
              }, function(l, v) {
                s(v);
              });
            });
          }).catch(s);
        });
        return E(t, e), t;
      }
      function Tt(e, n) {
        var t = this, o = new w(function(s, a) {
          t.ready().then(function() {
            var f = t._dbInfo;
            f.db.transaction(function(l) {
              X(l, f, "SELECT key FROM " + f.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(v, p) {
                var y = p.rows.length ? p.rows.item(0).key : null;
                s(y);
              }, function(v, p) {
                a(p);
              });
            });
          }).catch(a);
        });
        return E(o, n), o;
      }
      function Nt(e) {
        var n = this, t = new w(function(o, s) {
          n.ready().then(function() {
            var a = n._dbInfo;
            a.db.transaction(function(f) {
              X(f, a, "SELECT key FROM " + a.storeName, [], function(l, v) {
                for (var p = [], y = 0; y < v.rows.length; y++)
                  p.push(v.rows.item(y).key);
                o(p);
              }, function(l, v) {
                s(v);
              });
            });
          }).catch(s);
        });
        return E(t, e), t;
      }
      function Lt(e) {
        return new w(function(n, t) {
          e.transaction(function(o) {
            o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(s, a) {
              for (var f = [], l = 0; l < a.rows.length; l++)
                f.push(a.rows.item(l).name);
              n({
                db: e,
                storeNames: f
              });
            }, function(s, a) {
              t(a);
            });
          }, function(o) {
            t(o);
          });
        });
      }
      function At(e, n) {
        n = $.apply(this, arguments);
        var t = this.config();
        e = typeof e != "function" && e || {}, e.name || (e.name = e.name || t.name, e.storeName = e.storeName || t.storeName);
        var o = this, s;
        return e.name ? s = new w(function(a) {
          var f;
          e.name === t.name ? f = o._dbInfo.db : f = openDatabase(e.name, "", "", 0), e.storeName ? a({
            db: f,
            storeNames: [e.storeName]
          }) : a(Lt(f));
        }).then(function(a) {
          return new w(function(f, l) {
            a.db.transaction(function(v) {
              function p(N) {
                return new w(function(A, U) {
                  v.executeSql("DROP TABLE IF EXISTS " + N, [], function() {
                    A();
                  }, function(x, Y) {
                    U(Y);
                  });
                });
              }
              for (var y = [], R = 0, I = a.storeNames.length; R < I; R++)
                y.push(p(a.storeNames[R]));
              w.all(y).then(function() {
                f();
              }).catch(function(N) {
                l(N);
              });
            }, function(v) {
              l(v);
            });
          });
        }) : s = w.reject("Invalid arguments"), E(s, n), s;
      }
      var Dt = {
        _driver: "webSQLStorage",
        _initStorage: wt,
        _support: gt(),
        iterate: Rt,
        getItem: bt,
        setItem: Et,
        removeItem: Ct,
        clear: It,
        length: St,
        key: Tt,
        keys: Nt,
        dropInstance: At
      };
      function xt() {
        try {
          return typeof localStorage < "u" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
          !!localStorage.setItem;
        } catch {
          return !1;
        }
      }
      function qe(e, n) {
        var t = e.name + "/";
        return e.storeName !== n.storeName && (t += e.storeName + "/"), t;
      }
      function Pt() {
        var e = "_localforage_support_test";
        try {
          return localStorage.setItem(e, !0), localStorage.removeItem(e), !1;
        } catch {
          return !0;
        }
      }
      function Ut() {
        return !Pt() || localStorage.length > 0;
      }
      function Ot(e) {
        var n = this, t = {};
        if (e)
          for (var o in e)
            t[o] = e[o];
        return t.keyPrefix = qe(e, n._defaultConfig), Ut() ? (n._dbInfo = t, t.serializer = Re, w.resolve()) : w.reject();
      }
      function Bt(e) {
        var n = this, t = n.ready().then(function() {
          for (var o = n._dbInfo.keyPrefix, s = localStorage.length - 1; s >= 0; s--) {
            var a = localStorage.key(s);
            a.indexOf(o) === 0 && localStorage.removeItem(a);
          }
        });
        return E(t, e), t;
      }
      function kt(e, n) {
        var t = this;
        e = O(e);
        var o = t.ready().then(function() {
          var s = t._dbInfo, a = localStorage.getItem(s.keyPrefix + e);
          return a && (a = s.serializer.deserialize(a)), a;
        });
        return E(o, n), o;
      }
      function Mt(e, n) {
        var t = this, o = t.ready().then(function() {
          for (var s = t._dbInfo, a = s.keyPrefix, f = a.length, l = localStorage.length, v = 1, p = 0; p < l; p++) {
            var y = localStorage.key(p);
            if (y.indexOf(a) === 0) {
              var R = localStorage.getItem(y);
              if (R && (R = s.serializer.deserialize(R)), R = e(R, y.substring(f), v++), R !== void 0)
                return R;
            }
          }
        });
        return E(o, n), o;
      }
      function Ft(e, n) {
        var t = this, o = t.ready().then(function() {
          var s = t._dbInfo, a;
          try {
            a = localStorage.key(e);
          } catch {
            a = null;
          }
          return a && (a = a.substring(s.keyPrefix.length)), a;
        });
        return E(o, n), o;
      }
      function Kt(e) {
        var n = this, t = n.ready().then(function() {
          for (var o = n._dbInfo, s = localStorage.length, a = [], f = 0; f < s; f++) {
            var l = localStorage.key(f);
            l.indexOf(o.keyPrefix) === 0 && a.push(l.substring(o.keyPrefix.length));
          }
          return a;
        });
        return E(t, e), t;
      }
      function Wt(e) {
        var n = this, t = n.keys().then(function(o) {
          return o.length;
        });
        return E(t, e), t;
      }
      function Ht(e, n) {
        var t = this;
        e = O(e);
        var o = t.ready().then(function() {
          var s = t._dbInfo;
          localStorage.removeItem(s.keyPrefix + e);
        });
        return E(o, n), o;
      }
      function jt(e, n, t) {
        var o = this;
        e = O(e);
        var s = o.ready().then(function() {
          n === void 0 && (n = null);
          var a = n;
          return new w(function(f, l) {
            var v = o._dbInfo;
            v.serializer.serialize(n, function(p, y) {
              if (y)
                l(y);
              else
                try {
                  localStorage.setItem(v.keyPrefix + e, p), f(a);
                } catch (R) {
                  (R.name === "QuotaExceededError" || R.name === "NS_ERROR_DOM_QUOTA_REACHED") && l(R), l(R);
                }
            });
          });
        });
        return E(s, t), s;
      }
      function Yt(e, n) {
        if (n = $.apply(this, arguments), e = typeof e != "function" && e || {}, !e.name) {
          var t = this.config();
          e.name = e.name || t.name, e.storeName = e.storeName || t.storeName;
        }
        var o = this, s;
        return e.name ? s = new w(function(a) {
          e.storeName ? a(qe(e, o._defaultConfig)) : a(e.name + "/");
        }).then(function(a) {
          for (var f = localStorage.length - 1; f >= 0; f--) {
            var l = localStorage.key(f);
            l.indexOf(a) === 0 && localStorage.removeItem(l);
          }
        }) : s = w.reject("Invalid arguments"), E(s, n), s;
      }
      var $t = {
        _driver: "localStorageWrapper",
        _initStorage: Ot,
        _support: xt(),
        iterate: Mt,
        getItem: kt,
        setItem: jt,
        removeItem: Ht,
        clear: Bt,
        length: Wt,
        key: Ft,
        keys: Kt,
        dropInstance: Yt
      }, qt = function(n, t) {
        return n === t || typeof n == "number" && typeof t == "number" && isNaN(n) && isNaN(t);
      }, zt = function(n, t) {
        for (var o = n.length, s = 0; s < o; ) {
          if (qt(n[s], t))
            return !0;
          s++;
        }
        return !1;
      }, ze = Array.isArray || function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
      }, ne = {}, Ve = {}, te = {
        INDEXEDDB: pt,
        WEBSQL: Dt,
        LOCALSTORAGE: $t
      }, Vt = [te.INDEXEDDB._driver, te.WEBSQL._driver, te.LOCALSTORAGE._driver], fe = ["dropInstance"], Ee = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(fe), Gt = {
        description: "",
        driver: Vt.slice(),
        name: "localforage",
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: "keyvaluepairs",
        version: 1
      };
      function Qt(e, n) {
        e[n] = function() {
          var t = arguments;
          return e.ready().then(function() {
            return e[n].apply(e, t);
          });
        };
      }
      function Ce() {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          if (n)
            for (var t in n)
              n.hasOwnProperty(t) && (ze(n[t]) ? arguments[0][t] = n[t].slice() : arguments[0][t] = n[t]);
        }
        return arguments[0];
      }
      var Xt = function() {
        function e(n) {
          g(this, e);
          for (var t in te)
            if (te.hasOwnProperty(t)) {
              var o = te[t], s = o._driver;
              this[t] = s, ne[s] || this.defineDriver(o);
            }
          this._defaultConfig = Ce({}, Gt), this._config = Ce({}, this._defaultConfig, n), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {
          });
        }
        return e.prototype.config = function(t) {
          if ((typeof t > "u" ? "undefined" : d(t)) === "object") {
            if (this._ready)
              return new Error("Can't call config() after localforage has been used.");
            for (var o in t) {
              if (o === "storeName" && (t[o] = t[o].replace(/\W/g, "_")), o === "version" && typeof t[o] != "number")
                return new Error("Database version must be a number.");
              this._config[o] = t[o];
            }
            return "driver" in t && t.driver ? this.setDriver(this._config.driver) : !0;
          } else
            return typeof t == "string" ? this._config[t] : this._config;
        }, e.prototype.defineDriver = function(t, o, s) {
          var a = new w(function(f, l) {
            try {
              var v = t._driver, p = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
              if (!t._driver) {
                l(p);
                return;
              }
              for (var y = Ee.concat("_initStorage"), R = 0, I = y.length; R < I; R++) {
                var N = y[R], A = !zt(fe, N);
                if ((A || t[N]) && typeof t[N] != "function") {
                  l(p);
                  return;
                }
              }
              var U = function() {
                for (var ae = function(er) {
                  return function() {
                    var tr = new Error("Method " + er + " is not implemented by the current driver"), Ge = w.reject(tr);
                    return E(Ge, arguments[arguments.length - 1]), Ge;
                  };
                }, Ie = 0, Zt = fe.length; Ie < Zt; Ie++) {
                  var Se = fe[Ie];
                  t[Se] || (t[Se] = ae(Se));
                }
              };
              U();
              var x = function(ae) {
                ne[v] && console.info("Redefining LocalForage driver: " + v), ne[v] = t, Ve[v] = ae, f();
              };
              "_support" in t ? t._support && typeof t._support == "function" ? t._support().then(x, l) : x(!!t._support) : x(!0);
            } catch (Y) {
              l(Y);
            }
          });
          return P(a, o, s), a;
        }, e.prototype.driver = function() {
          return this._driver || null;
        }, e.prototype.getDriver = function(t, o, s) {
          var a = ne[t] ? w.resolve(ne[t]) : w.reject(new Error("Driver not found."));
          return P(a, o, s), a;
        }, e.prototype.getSerializer = function(t) {
          var o = w.resolve(Re);
          return P(o, t), o;
        }, e.prototype.ready = function(t) {
          var o = this, s = o._driverSet.then(function() {
            return o._ready === null && (o._ready = o._initDriver()), o._ready;
          });
          return P(s, t, t), s;
        }, e.prototype.setDriver = function(t, o, s) {
          var a = this;
          ze(t) || (t = [t]);
          var f = this._getSupportedDrivers(t);
          function l() {
            a._config.driver = a.driver();
          }
          function v(R) {
            return a._extend(R), l(), a._ready = a._initStorage(a._config), a._ready;
          }
          function p(R) {
            return function() {
              var I = 0;
              function N() {
                for (; I < R.length; ) {
                  var A = R[I];
                  return I++, a._dbInfo = null, a._ready = null, a.getDriver(A).then(v).catch(N);
                }
                l();
                var U = new Error("No available storage method found.");
                return a._driverSet = w.reject(U), a._driverSet;
              }
              return N();
            };
          }
          var y = this._driverSet !== null ? this._driverSet.catch(function() {
            return w.resolve();
          }) : w.resolve();
          return this._driverSet = y.then(function() {
            var R = f[0];
            return a._dbInfo = null, a._ready = null, a.getDriver(R).then(function(I) {
              a._driver = I._driver, l(), a._wrapLibraryMethodsWithReady(), a._initDriver = p(f);
            });
          }).catch(function() {
            l();
            var R = new Error("No available storage method found.");
            return a._driverSet = w.reject(R), a._driverSet;
          }), P(this._driverSet, o, s), this._driverSet;
        }, e.prototype.supports = function(t) {
          return !!Ve[t];
        }, e.prototype._extend = function(t) {
          Ce(this, t);
        }, e.prototype._getSupportedDrivers = function(t) {
          for (var o = [], s = 0, a = t.length; s < a; s++) {
            var f = t[s];
            this.supports(f) && o.push(f);
          }
          return o;
        }, e.prototype._wrapLibraryMethodsWithReady = function() {
          for (var t = 0, o = Ee.length; t < o; t++)
            Qt(this, Ee[t]);
        }, e.prototype.createInstance = function(t) {
          return new e(t);
        }, e;
      }(), Jt = new Xt();
      c.exports = Jt;
    }, { 3: 3 }] }, {}, [4])(4);
  });
})(rt);
var Fr = rt.exports;
const Kr = /* @__PURE__ */ Mr(Fr), Je = {
  [kr]: jr
}, Wr = () => {
  self.addEventListener("fetch", Hr);
}, Hr = async (u) => {
  const r = u.request.url.split("/").pop();
  r in Je && u.respondWith(
    (async () => {
      const i = {};
      try {
        i.data = await Je[r]();
      } catch (c) {
        i.error = c.message;
      }
      return new Response(JSON.stringify(i));
    })()
  );
};
async function jr() {
  if (await Kr.getItem("access_token"))
    return [];
}
const Yr = async () => {
  self.skipWaiting(), Br(), Pr(), Or([{"revision":null,"url":"assets/index-ad4bc86e.js"},{"revision":"33571a81cc88e9d1b389018f0223b2e3","url":"index.html"}]), Wr();
};
Yr();
