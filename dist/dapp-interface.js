/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPLETE_NOTIFICATION: () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   createNotification: () => (/* binding */ createNotification),
/* harmony export */   errorNotification: () => (/* binding */ errorNotification),
/* harmony export */   nextNotification: () => (/* binding */ nextNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!*************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subject.js":
/*!**********************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subject.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnonymousSubject: () => (/* binding */ AnonymousSubject),
/* harmony export */   Subject: () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/errorContext.js");






var Subject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(function () {
            _this.currentObservers = null;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new _Observable__WEBPACK_IMPORTED_MODULE_5__.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_5__.Observable));

var AnonymousSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!*************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_OBSERVER: () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   SafeSubscriber: () => (/* binding */ SafeSubscriber),
/* harmony export */   Subscriber: () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function handleUnhandledError(error) {
    if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
    }
    else {
        (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!***************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_SUBSCRIPTION: () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   Subscription: () => (/* binding */ Subscription),
/* harmony export */   isSubscription: () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/config.js":
/*!*********************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/config.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js":
/*!****************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lastValueFrom: () => (/* binding */ lastValueFrom)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/EmptyError */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js");

function lastValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__.EmptyError());
                }
            },
        });
    });
}
//# sourceMappingURL=lastValueFrom.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/empty.js":
/*!*******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/empty.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY: () => (/* binding */ EMPTY),
/* harmony export */   empty: () => (/* binding */ empty)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Observable.js");

var EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
/*!***********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromEvent: () => (/* binding */ fromEvent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../observable/innerFrom */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/mergeMap */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isArrayLike */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js");







var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(resultSelector));
    }
    var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(target)) {
            return (0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(function (subTarget) { return fromEvent(subTarget, eventName, options); })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.innerFrom)(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.on) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.off);
}
function isEventTarget(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addEventListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeEventListener);
}
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
/*!***********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromArrayLike: () => (/* binding */ fromArrayLike),
/* harmony export */   fromAsyncIterable: () => (/* binding */ fromAsyncIterable),
/* harmony export */   fromInteropObservable: () => (/* binding */ fromInteropObservable),
/* harmony export */   fromIterable: () => (/* binding */ fromIterable),
/* harmony export */   fromPromise: () => (/* binding */ fromPromise),
/* harmony export */   fromReadableStreamLike: () => (/* binding */ fromReadableStreamLike),
/* harmony export */   innerFrom: () => (/* binding */ innerFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isPromise */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isInteropObservable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isAsyncIterable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/throwUnobservableError */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isIterable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/reportUnhandledError */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/observable.js");












function innerFrom(input) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return input;
    }
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable]();
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function () {
        var value, e_2_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!*******************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OperatorSubscriber: () => (/* binding */ OperatorSubscriber),
/* harmony export */   createOperatorSubscriber: () => (/* binding */ createOperatorSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscriber.js");


function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!*******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function filter(predicate, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js":
/*!****************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   map: () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function map(project, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
/*!***************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeInternals: () => (/* binding */ mergeInternals)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(project(value, index++)).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
}
//# sourceMappingURL=mergeInternals.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
/*!*********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeMap: () => (/* binding */ mergeMap)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/lift */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeInternals */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(resultSelector)) {
        return mergeMap(function (a, i) { return (0,_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (b, ii) { return resultSelector(a, b, i, ii); })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (source, subscriber) { return (0,_mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(source, subscriber, project, concurrent); });
}
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/share.js":
/*!******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/share.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   share: () => (/* binding */ share)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observable/innerFrom */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subject */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subject.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js");





function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(on.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__read)(args)))).subscribe(onSubscriber);
}
//# sourceMappingURL=share.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/take.js":
/*!*****************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/take.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   take: () => (/* binding */ take)
/* harmony export */ });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/empty */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function take(count) {
    return count <= 0
        ?
            function () { return _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY; }
        : (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            var seen = 0;
            source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
//# sourceMappingURL=take.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!****************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timeoutProvider: () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSymbolIterator: () => (/* binding */ getSymbolIterator),
/* harmony export */   iterator: () => (/* binding */ iterator)
/* harmony export */ });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observable: () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js":
/*!******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmptyError: () => (/* binding */ EmptyError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var EmptyError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });
//# sourceMappingURL=EmptyError.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":
/*!*******************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ObjectUnsubscribedError: () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!***************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnsubscriptionError: () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!*****************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrRemove: () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createErrorClass: () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureError: () => (/* binding */ captureError),
/* harmony export */   errorContext: () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
/*!***********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeSchedule: () => (/* binding */ executeSchedule)
/* harmony export */ });
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!****************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   identity: () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!*******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArrayLike: () => (/* binding */ isArrayLike)
/* harmony export */ });
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!***********************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAsyncIterable: () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!***************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInteropObservable: () => (/* binding */ isInteropObservable)
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!******************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIterable: () => (/* binding */ isIterable)
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}
//# sourceMappingURL=isIterable.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!*****************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPromise: () => (/* binding */ isPromise)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!****************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isReadableStreamLike: () => (/* binding */ isReadableStreamLike),
/* harmony export */   readableStreamLikeToAsyncGenerator: () => (/* binding */ readableStreamLikeToAsyncGenerator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasLift: () => (/* binding */ hasLift),
/* harmony export */   operate: () => (/* binding */ operate)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
/*!************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapOneOrManyArgs: () => (/* binding */ mapOneOrManyArgs)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/map */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js");


var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return (0,_operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (args) { return callOrApply(fn, args); });
}
//# sourceMappingURL=mapOneOrManyArgs.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: () => (/* binding */ noop)
/* harmony export */ });
function noop() { }
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   pipeFromArray: () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!****************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reportUnhandledError: () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!******************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInvalidObservableTypeError: () => (/* binding */ createInvalidObservableTypeError)
/* harmony export */ });
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map

/***/ }),

/***/ "./dapp-interface/WalletStandardInterface.ts":
/*!***************************************************!*\
  !*** ./dapp-interface/WalletStandardInterface.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuiWallet: () => (/* binding */ SuiWallet)
/* harmony export */ });
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _messages */ "./shared/messaging/messages/index.ts");
/* harmony import */ var _messaging_WindowMessageStream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! _messaging/WindowMessageStream */ "./shared/messaging/WindowMessageStream.ts");
/* harmony import */ var _payloads_permissions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! _payloads/permissions */ "./shared/messaging/messages/payloads/permissions/index.ts");
/* harmony import */ var _src_shared_api_env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! _src/shared/api-env */ "./shared/api-env.ts");
/* harmony import */ var _src_shared_messaging_messages_payloads_QredoConnect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! _src/shared/messaging/messages/payloads/QredoConnect */ "./shared/messaging/messages/payloads/QredoConnect.ts");
/* harmony import */ var _src_shared_messaging_messages_payloads_wallet_status_change__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! _src/shared/messaging/messages/payloads/wallet-status-change */ "./shared/messaging/messages/payloads/wallet-status-change/index.ts");
/* harmony import */ var _mysten_sui_bcs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mysten/sui/bcs */ "../../../sdk/typescript/src/bcs/index.ts");
/* harmony import */ var _mysten_sui_transactions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mysten/sui/transactions */ "../../../sdk/typescript/src/transactions/Transaction.ts");
/* harmony import */ var _mysten_sui_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mysten/sui/utils */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mysten/wallet-standard */ "../../../sdk/wallet-standard/src/chains.ts");
/* harmony import */ var _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mysten/wallet-standard */ "../../../node_modules/.pnpm/@wallet-standard+wallet@1.0.1/node_modules/@wallet-standard/wallet/lib/esm/util.js");
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mitt */ "../../../node_modules/.pnpm/mitt@3.0.1/node_modules/mitt/dist/mitt.mjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./dapp-interface/utils.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SuiWallet_instances, _SuiWallet_events, _SuiWallet_version, _SuiWallet_name, _SuiWallet_accounts, _SuiWallet_messagesStream, _SuiWallet_activeChain, _SuiWallet_setAccounts, _SuiWallet_on, _SuiWallet_connected, _SuiWallet_connect, _SuiWallet_disconnect, _SuiWallet_signTransactionBlock, _SuiWallet_signTransaction, _SuiWallet_signAndExecuteTransactionBlock, _SuiWallet_signAndExecuteTransaction, _SuiWallet_signMessage, _SuiWallet_signPersonalMessage, _SuiWallet_hasPermissions, _SuiWallet_getAccounts, _SuiWallet_getActiveNetwork, _SuiWallet_setActiveChain, _SuiWallet_qredoConnect, _SuiWallet_send;













// NOTE: Because this runs in a content script, we can't fetch the manifest.
const name = "Sui Wallet (DEV)" || 0;
const API_ENV_TO_CHAIN = {
    [_src_shared_api_env__WEBPACK_IMPORTED_MODULE_3__.API_ENV.local]: _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_8__.SUI_LOCALNET_CHAIN,
    [_src_shared_api_env__WEBPACK_IMPORTED_MODULE_3__.API_ENV.devNet]: _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_8__.SUI_DEVNET_CHAIN,
    [_src_shared_api_env__WEBPACK_IMPORTED_MODULE_3__.API_ENV.testNet]: _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_8__.SUI_TESTNET_CHAIN,
    [_src_shared_api_env__WEBPACK_IMPORTED_MODULE_3__.API_ENV.mainnet]: _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_8__.SUI_MAINNET_CHAIN,
};
class SuiWallet {
    get version() {
        return __classPrivateFieldGet(this, _SuiWallet_version, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _SuiWallet_name, "f");
    }
    get icon() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iIzRDQTNGRiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC44MzI3IDEyLjM0MTNWMTIuMzQyMkMxOS42NDgyIDEzLjM2NTMgMjAuMTM2IDE0LjY2MTMgMjAuMTM2IDE2LjA3MDVDMjAuMTM2IDE3LjQ3OTggMTkuNjMzNyAxOC44MTQzIDE4Ljc5NTcgMTkuODQ0M0wxOC43MjM1IDE5LjkzM0wxOC43MDQ1IDE5LjgyMDNDMTguNjg4MiAxOS43MjQ1IDE4LjY2OSAxOS42Mjc1IDE4LjY0NyAxOS41M0MxOC4yMjc3IDE3LjY4NzUgMTYuODYxMiAxNi4xMDc1IDE0LjYxMjUgMTQuODI4MkMxMy4wOTQgMTMuOTY2OCAxMi4yMjQ3IDEyLjkyOTIgMTEuOTk2NSAxMS43NTA4QzExLjg0OSAxMC45ODg1IDExLjk1ODcgMTAuMjIzIDEyLjE3MDUgOS41NjcyNUMxMi4zODIyIDguOTExNzUgMTIuNjk3MiA4LjM2MjUgMTIuOTY0NyA4LjAzMkwxMy44Mzk1IDYuOTYyMjVDMTMuOTkzIDYuNzc0NzUgMTQuMjggNi43NzQ3NSAxNC40MzM1IDYuOTYyMjVMMTguODMzIDEyLjM0MTVMMTguODMyNyAxMi4zNDEzWk0yMC4yMTY1IDExLjI3MjVWMTEuMjcyTDE0LjM1MyA0LjEwMjc1QzE0LjI0MSAzLjk2NTc1IDE0LjAzMTUgMy45NjU3NSAxMy45MTk1IDQuMTAyNzVMOC4wNTYgMTEuMjcyM1YxMS4yNzI4TDguMDM3IDExLjI5NjVDNi45NTgyNSAxMi42MzUzIDYuMzEyNSAxNC4zMzY4IDYuMzEyNSAxNi4xODlDNi4zMTI1IDIwLjUwMjggOS44MTUyNSAyNCAxNC4xMzYzIDI0QzE4LjQ1NzIgMjQgMjEuOTYgMjAuNTAyOCAyMS45NiAxNi4xODlDMjEuOTYgMTQuMzM2OCAyMS4zMTQyIDEyLjYzNTMgMjAuMjM1MiAxMS4yOTYzTDIwLjIxNiAxMS4yNzI1SDIwLjIxNjVaTTkuNDU5MjUgMTIuMzE4TDkuOTgzNzUgMTEuNjc2NUw5Ljk5OTUgMTEuNzk1QzEwLjAxMiAxMS44ODg3IDEwLjAyNzIgMTEuOTgzIDEwLjA0NTIgMTIuMDc3OEMxMC4zODQ1IDEzLjg1ODIgMTEuNTk2NyAxNS4zNDI4IDEzLjYyMzUgMTYuNDkyNUMxNS4zODUyIDE3LjQ5NSAxNi40MTEgMTguNjQ4IDE2LjcwNjUgMTkuOTEyNUMxNi44Mjk4IDIwLjQ0MDMgMTYuODUxNyAyMC45NTk1IDE2Ljc5ODUgMjEuNDEzNUwxNi43OTUyIDIxLjQ0MTVMMTYuNzY5NyAyMS40NTRDMTUuOTc0NyAyMS44NDI1IDE1LjA4MDcgMjIuMDYwNSAxNC4xMzYgMjIuMDYwNUMxMC44MjI1IDIyLjA2MDUgOC4xMzYyNSAxOS4zNzg4IDguMTM2MjUgMTYuMDcwNUM4LjEzNjI1IDE0LjY1MDMgOC42MzE1IDEzLjM0NSA5LjQ1OSAxMi4zMTgzTDkuNDU5MjUgMTIuMzE4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
    }
    get chains() {
        // TODO: Extract chain from wallet:
        return _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_8__.SUI_CHAINS;
    }
    get features() {
        return {
            'standard:connect': {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _SuiWallet_connect, "f"),
            },
            'standard:events': {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _SuiWallet_on, "f"),
            },
            'standard:disconnect': {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _SuiWallet_disconnect, "f"),
            },
            'sui:signTransactionBlock': {
                version: '1.0.0',
                signTransactionBlock: __classPrivateFieldGet(this, _SuiWallet_signTransactionBlock, "f"),
            },
            'sui:signTransaction': {
                version: '2.0.0',
                signTransaction: __classPrivateFieldGet(this, _SuiWallet_signTransaction, "f"),
            },
            'sui:signAndExecuteTransactionBlock': {
                version: '1.0.0',
                signAndExecuteTransactionBlock: __classPrivateFieldGet(this, _SuiWallet_signAndExecuteTransactionBlock, "f"),
            },
            'sui:signAndExecuteTransaction': {
                version: '2.0.0',
                signAndExecuteTransaction: __classPrivateFieldGet(this, _SuiWallet_signAndExecuteTransaction, "f"),
            },
            'sui:signMessage': {
                version: '1.0.0',
                signMessage: __classPrivateFieldGet(this, _SuiWallet_signMessage, "f"),
            },
            'sui:signPersonalMessage': {
                version: '1.0.0',
                signPersonalMessage: __classPrivateFieldGet(this, _SuiWallet_signPersonalMessage, "f"),
            },
            'qredo:connect': {
                version: '0.0.1',
                qredoConnect: __classPrivateFieldGet(this, _SuiWallet_qredoConnect, "f"),
            },
        };
    }
    get accounts() {
        return __classPrivateFieldGet(this, _SuiWallet_accounts, "f");
    }
    constructor() {
        _SuiWallet_instances.add(this);
        _SuiWallet_events.set(this, void 0);
        _SuiWallet_version.set(this, '1.0.0');
        _SuiWallet_name.set(this, name);
        _SuiWallet_accounts.set(this, void 0);
        _SuiWallet_messagesStream.set(this, void 0);
        _SuiWallet_activeChain.set(this, null);
        _SuiWallet_on.set(this, (event, listener) => {
            __classPrivateFieldGet(this, _SuiWallet_events, "f").on(event, listener);
            return () => __classPrivateFieldGet(this, _SuiWallet_events, "f").off(event, listener);
        });
        _SuiWallet_connected.set(this, async () => {
            __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_setActiveChain).call(this, await __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_getActiveNetwork).call(this));
            if (!(await __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_hasPermissions).call(this, ['viewAccount']))) {
                return;
            }
            const accounts = await __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_getAccounts).call(this);
            __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_setAccounts).call(this, accounts);
            if (__classPrivateFieldGet(this, _SuiWallet_accounts, "f").length) {
                __classPrivateFieldGet(this, _SuiWallet_events, "f").emit('change', { accounts: this.accounts });
            }
        });
        _SuiWallet_connect.set(this, async (input) => {
            if (!input?.silent) {
                await (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                    type: 'acquire-permissions-request',
                    permissions: _payloads_permissions__WEBPACK_IMPORTED_MODULE_2__.ALL_PERMISSION_TYPES,
                }), (response) => response.result);
            }
            await __classPrivateFieldGet(this, _SuiWallet_connected, "f").call(this);
            return { accounts: this.accounts };
        });
        _SuiWallet_disconnect.set(this, async () => {
            __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'disconnect-app',
                origin: '', // origin is auto-discovered for wallet's disconnect.
            });
        });
        _SuiWallet_signTransactionBlock.set(this, async ({ transactionBlock, account, ...input }) => {
            if (!(0,_mysten_sui_transactions__WEBPACK_IMPORTED_MODULE_9__.isTransaction)(transactionBlock)) {
                throw new Error('Unexpected transaction format found. Ensure that you are using the `Transaction` class.');
            }
            return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'sign-transaction-request',
                transaction: {
                    ...input,
                    // account might be undefined if previous version of adapters is used
                    // in that case use the first account address
                    account: account?.address || __classPrivateFieldGet(this, _SuiWallet_accounts, "f")[0]?.address || '',
                    transaction: transactionBlock.serialize(),
                },
            }), (response) => response.result);
        });
        _SuiWallet_signTransaction.set(this, async ({ transaction, account, ...input }) => {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'sign-transaction-request',
                transaction: {
                    ...input,
                    // account might be undefined if previous version of adapters is used
                    // in that case use the first account address
                    account: account?.address || __classPrivateFieldGet(this, _SuiWallet_accounts, "f")[0]?.address || '',
                    transaction: await transaction.toJSON(),
                },
            }), ({ result: { signature, transactionBlockBytes: bytes } }) => ({
                signature,
                bytes,
            }));
        });
        _SuiWallet_signAndExecuteTransactionBlock.set(this, async (input) => {
            if (!(0,_mysten_sui_transactions__WEBPACK_IMPORTED_MODULE_9__.isTransaction)(input.transactionBlock)) {
                throw new Error('Unexpected transaction format found. Ensure that you are using the `Transaction` class.');
            }
            return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'execute-transaction-request',
                transaction: {
                    type: 'transaction',
                    data: input.transactionBlock.serialize(),
                    options: input.options,
                    // account might be undefined if previous version of adapters is used
                    // in that case use the first account address
                    account: input.account?.address || __classPrivateFieldGet(this, _SuiWallet_accounts, "f")[0]?.address || '',
                },
            }), (response) => response.result);
        });
        _SuiWallet_signAndExecuteTransaction.set(this, async (input) => {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'execute-transaction-request',
                transaction: {
                    type: 'transaction',
                    data: await input.transaction.toJSON(),
                    options: {
                        showRawEffects: true,
                        showRawInput: true,
                    },
                    // account might be undefined if previous version of adapters is used
                    // in that case use the first account address
                    account: input.account?.address || __classPrivateFieldGet(this, _SuiWallet_accounts, "f")[0]?.address || '',
                },
            }), ({ result: { rawEffects, rawTransaction, digest } }) => {
                const [{ txSignatures: [signature], intentMessage: { value: bcsTransaction }, },] = _mysten_sui_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.SenderSignedData.parse((0,_mysten_sui_utils__WEBPACK_IMPORTED_MODULE_11__.fromBase64)(rawTransaction));
                const bytes = _mysten_sui_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.TransactionData.serialize(bcsTransaction).toBase64();
                return {
                    digest,
                    signature,
                    bytes,
                    effects: (0,_mysten_sui_utils__WEBPACK_IMPORTED_MODULE_11__.toBase64)(new Uint8Array(rawEffects)),
                };
            });
        });
        _SuiWallet_signMessage.set(this, async ({ message, account }) => {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'sign-message-request',
                args: {
                    message: (0,_mysten_sui_utils__WEBPACK_IMPORTED_MODULE_11__.toBase64)(message),
                    accountAddress: account.address,
                },
            }), (response) => {
                if (!response.return) {
                    throw new Error('Invalid sign message response');
                }
                return response.return;
            });
        });
        _SuiWallet_signPersonalMessage.set(this, async ({ message, account }) => {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'sign-message-request',
                args: {
                    message: (0,_mysten_sui_utils__WEBPACK_IMPORTED_MODULE_11__.toBase64)(message),
                    accountAddress: account.address,
                },
            }), (response) => {
                if (!response.return) {
                    throw new Error('Invalid sign message response');
                }
                return {
                    bytes: response.return.messageBytes,
                    signature: response.return.signature,
                };
            });
        });
        _SuiWallet_qredoConnect.set(this, async (input) => {
            const allowed = await (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
                type: 'qredo-connect',
                method: 'connect',
                args: { ...input },
            }), (response) => {
                if (!(0,_src_shared_messaging_messages_payloads_QredoConnect__WEBPACK_IMPORTED_MODULE_4__.isQredoConnectPayload)(response, 'connectResponse')) {
                    throw new Error('Invalid qredo connect response');
                }
                return response.args.allowed;
            });
            if (!allowed) {
                throw new Error('Rejected by user');
            }
        });
        __classPrivateFieldSet(this, _SuiWallet_events, (0,mitt__WEBPACK_IMPORTED_MODULE_6__["default"])(), "f");
        __classPrivateFieldSet(this, _SuiWallet_accounts, [], "f");
        __classPrivateFieldSet(this, _SuiWallet_messagesStream, new _messaging_WindowMessageStream__WEBPACK_IMPORTED_MODULE_1__.WindowMessageStream('sui_in-page', 'sui_content-script'), "f");
        __classPrivateFieldGet(this, _SuiWallet_messagesStream, "f").messages.subscribe(({ payload }) => {
            if ((0,_src_shared_messaging_messages_payloads_wallet_status_change__WEBPACK_IMPORTED_MODULE_5__.isWalletStatusChangePayload)(payload)) {
                const { network, accounts } = payload;
                if (network) {
                    __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_setActiveChain).call(this, network);
                    if (!accounts) {
                        // in case an accounts change exists skip updating chains of current accounts
                        // accounts will be updated in the if block below
                        __classPrivateFieldSet(this, _SuiWallet_accounts, __classPrivateFieldGet(this, _SuiWallet_accounts, "f").map(({ address, features, icon, label, publicKey }) => new _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_12__.ReadonlyWalletAccount({
                            address,
                            publicKey,
                            chains: __classPrivateFieldGet(this, _SuiWallet_activeChain, "f") ? [__classPrivateFieldGet(this, _SuiWallet_activeChain, "f")] : [],
                            features,
                            label,
                            icon,
                        })), "f");
                    }
                }
                if (accounts) {
                    __classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_setAccounts).call(this, accounts);
                }
                __classPrivateFieldGet(this, _SuiWallet_events, "f").emit('change', { accounts: this.accounts });
            }
        });
    }
}
_SuiWallet_events = new WeakMap(), _SuiWallet_version = new WeakMap(), _SuiWallet_name = new WeakMap(), _SuiWallet_accounts = new WeakMap(), _SuiWallet_messagesStream = new WeakMap(), _SuiWallet_activeChain = new WeakMap(), _SuiWallet_on = new WeakMap(), _SuiWallet_connected = new WeakMap(), _SuiWallet_connect = new WeakMap(), _SuiWallet_disconnect = new WeakMap(), _SuiWallet_signTransactionBlock = new WeakMap(), _SuiWallet_signTransaction = new WeakMap(), _SuiWallet_signAndExecuteTransactionBlock = new WeakMap(), _SuiWallet_signAndExecuteTransaction = new WeakMap(), _SuiWallet_signMessage = new WeakMap(), _SuiWallet_signPersonalMessage = new WeakMap(), _SuiWallet_qredoConnect = new WeakMap(), _SuiWallet_instances = new WeakSet(), _SuiWallet_setAccounts = function _SuiWallet_setAccounts(accounts) {
    __classPrivateFieldSet(this, _SuiWallet_accounts, accounts.map(({ address, publicKey, nickname }) => new _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_12__.ReadonlyWalletAccount({
        address,
        label: nickname || undefined,
        publicKey: publicKey ? (0,_mysten_sui_utils__WEBPACK_IMPORTED_MODULE_11__.fromBase64)(publicKey) : new Uint8Array(),
        chains: __classPrivateFieldGet(this, _SuiWallet_activeChain, "f") ? [__classPrivateFieldGet(this, _SuiWallet_activeChain, "f")] : [],
        features: ['sui:signAndExecuteTransaction'],
    })), "f");
}, _SuiWallet_hasPermissions = function _SuiWallet_hasPermissions(permissions) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
        type: 'has-permissions-request',
        permissions: permissions,
    }), ({ result }) => result);
}, _SuiWallet_getAccounts = function _SuiWallet_getAccounts() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
        type: 'get-account',
    }), (response) => response.accounts);
}, _SuiWallet_getActiveNetwork = function _SuiWallet_getActiveNetwork() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_7__.mapToPromise)(__classPrivateFieldGet(this, _SuiWallet_instances, "m", _SuiWallet_send).call(this, {
        type: 'get-network',
    }), ({ network }) => network);
}, _SuiWallet_setActiveChain = function _SuiWallet_setActiveChain({ env }) {
    __classPrivateFieldSet(this, _SuiWallet_activeChain, env === _src_shared_api_env__WEBPACK_IMPORTED_MODULE_3__.API_ENV.customRPC ? 'sui:unknown' : API_ENV_TO_CHAIN[env], "f");
}, _SuiWallet_send = function _SuiWallet_send(payload, responseForID) {
    const msg = (0,_messages__WEBPACK_IMPORTED_MODULE_0__.createMessage)(payload, responseForID);
    __classPrivateFieldGet(this, _SuiWallet_messagesStream, "f").send(msg);
    return __classPrivateFieldGet(this, _SuiWallet_messagesStream, "f").messages.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.filter)(({ id }) => id === msg.id), (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.map)((msg) => msg.payload));
};


/***/ }),

/***/ "./dapp-interface/utils.ts":
/*!*********************************!*\
  !*** ./dapp-interface/utils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapToPromise: () => (/* binding */ mapToPromise)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/take.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


function mapToPromise(stream, project) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.lastValueFrom)(stream.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)((response) => {
        if (response && (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isErrorPayload)(response)) {
            // TODO: throw proper error
            throw new Error(response.message);
        }
        return project(response);
    })));
}


/***/ }),

/***/ "./shared/api-env.ts":
/*!***************************!*\
  !*** ./shared/api-env.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_ENV: () => (/* binding */ API_ENV),
/* harmony export */   ENV_TO_API: () => (/* binding */ ENV_TO_API),
/* harmony export */   networkNames: () => (/* binding */ networkNames)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var API_ENV;
(function (API_ENV) {
    API_ENV["mainnet"] = "mainnet";
    API_ENV["devNet"] = "devNet";
    API_ENV["testNet"] = "testNet";
    API_ENV["local"] = "local";
    API_ENV["customRPC"] = "customRPC";
})(API_ENV || (API_ENV = {}));
const networkNames = {
    [API_ENV.local]: 'Local',
    [API_ENV.testNet]: 'Testnet',
    [API_ENV.devNet]: 'Devnet',
    [API_ENV.mainnet]: 'Mainnet',
    [API_ENV.customRPC]: 'Custom RPC',
};
const ENV_TO_API = {
    [API_ENV.customRPC]: null,
    [API_ENV.local]: "http://127.0.0.1:9000/" || 0,
    [API_ENV.devNet]: "https://wallet-rpc.devnet.sui.io/" || 0,
    [API_ENV.testNet]: "https://wallet-rpc.testnet.sui.io/" || 0,
    [API_ENV.mainnet]: "https://wallet-rpc.mainnet.sui.io/" || 0,
};


/***/ }),

/***/ "./shared/messaging/WindowMessageStream.ts":
/*!*************************************************!*\
  !*** ./shared/messaging/WindowMessageStream.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WindowMessageStream: () => (/* binding */ WindowMessageStream)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm5/internal/operators/share.js");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

class WindowMessageStream {
    constructor(name, target) {
        if (name === target) {
            throw new Error('[WindowMessageStream] name and target must be different');
        }
        this._name = name;
        this._target = target;
        this.messages = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(window, 'message').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.filter)((message) => message.source === window && message.data.target === this._name), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)((message) => message.data.payload), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.share)());
    }
    send(payload) {
        const msg = {
            target: this._target,
            payload,
        };
        window.postMessage(msg);
    }
}


/***/ }),

/***/ "./shared/messaging/messages/Message.ts":
/*!**********************************************!*\
  !*** ./shared/messaging/messages/Message.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMessage: () => (/* binding */ createMessage)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/v4.js");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function createMessage(payload, id) {
    return {
        id: id || (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
        payload,
    };
}


/***/ }),

/***/ "./shared/messaging/messages/index.ts":
/*!********************************************!*\
  !*** ./shared/messaging/messages/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMessage: () => (/* reexport safe */ _Message__WEBPACK_IMPORTED_MODULE_0__.createMessage)
/* harmony export */ });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Message */ "./shared/messaging/messages/Message.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0



/***/ }),

/***/ "./shared/messaging/messages/payloads/BasePayload.ts":
/*!***********************************************************!*\
  !*** ./shared/messaging/messages/payloads/BasePayload.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBasePayload: () => (/* binding */ isBasePayload)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
function isBasePayload(payload) {
    return 'type' in payload && typeof payload.type !== 'undefined';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/ErrorPayload.ts":
/*!************************************************************!*\
  !*** ./shared/messaging/messages/payloads/ErrorPayload.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isErrorPayload: () => (/* binding */ isErrorPayload)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
function isErrorPayload(payload) {
    return 'error' in payload && payload.error === true;
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/Payload.ts":
/*!*******************************************************!*\
  !*** ./shared/messaging/messages/payloads/Payload.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0



/***/ }),

/***/ "./shared/messaging/messages/payloads/QredoConnect.ts":
/*!************************************************************!*\
  !*** ./shared/messaging/messages/payloads/QredoConnect.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isQredoConnectPayload: () => (/* binding */ isQredoConnectPayload)
/* harmony export */ });
/* harmony import */ var _BasePayload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasePayload */ "./shared/messaging/messages/payloads/BasePayload.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isQredoConnectPayload(payload, method) {
    return ((0,_BasePayload__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) &&
        payload.type === 'qredo-connect' &&
        'method' in payload &&
        payload.method === method &&
        'args' in payload &&
        !!payload.args);
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/index.ts":
/*!*****************************************************!*\
  !*** ./shared/messaging/messages/payloads/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBasePayload: () => (/* reexport safe */ _BasePayload__WEBPACK_IMPORTED_MODULE_0__.isBasePayload),
/* harmony export */   isErrorPayload: () => (/* reexport safe */ _ErrorPayload__WEBPACK_IMPORTED_MODULE_1__.isErrorPayload)
/* harmony export */ });
/* harmony import */ var _BasePayload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasePayload */ "./shared/messaging/messages/payloads/BasePayload.ts");
/* harmony import */ var _ErrorPayload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorPayload */ "./shared/messaging/messages/payloads/ErrorPayload.ts");
/* harmony import */ var _Payload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Payload */ "./shared/messaging/messages/payloads/Payload.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0





/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsRequest.ts":
/*!*************************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/AcquirePermissionsRequest.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAcquirePermissionsRequest: () => (/* binding */ isAcquirePermissionsRequest)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isAcquirePermissionsRequest(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'acquire-permissions-request';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsResponse.ts":
/*!**************************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/AcquirePermissionsResponse.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAcquirePermissionsResponse: () => (/* binding */ isAcquirePermissionsResponse)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isAcquirePermissionsResponse(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'acquire-permissions-response';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/GetPermissionRequests.ts":
/*!*********************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/GetPermissionRequests.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isGetPermissionRequests: () => (/* binding */ isGetPermissionRequests)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isGetPermissionRequests(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'get-permission-requests';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/HasPermissionsRequest.ts":
/*!*********************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/HasPermissionsRequest.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isHasPermissionRequest: () => (/* binding */ isHasPermissionRequest)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isHasPermissionRequest(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'has-permissions-request';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/HasPermissionsResponse.ts":
/*!**********************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/HasPermissionsResponse.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isHasPermissionResponse: () => (/* binding */ isHasPermissionResponse)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isHasPermissionResponse(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'has-permissions-response';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/Permission.ts":
/*!**********************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/Permission.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0



/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/PermissionRequests.ts":
/*!******************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/PermissionRequests.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPermissionRequests: () => (/* binding */ isPermissionRequests)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isPermissionRequests(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'permission-request';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/PermissionResponse.ts":
/*!******************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/PermissionResponse.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPermissionResponse: () => (/* binding */ isPermissionResponse)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isPermissionResponse(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'permission-response';
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/PermissionType.ts":
/*!**************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/PermissionType.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_PERMISSION_TYPES: () => (/* binding */ ALL_PERMISSION_TYPES),
/* harmony export */   isValidPermissionTypes: () => (/* binding */ isValidPermissionTypes)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
const ALL_PERMISSION_TYPES = ['viewAccount', 'suggestTransactions'];
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function isValidPermissionTypes(types) {
    return (Array.isArray(types) &&
        !!types.length &&
        types.every((aType) => ALL_PERMISSION_TYPES.includes(aType)));
}


/***/ }),

/***/ "./shared/messaging/messages/payloads/permissions/index.ts":
/*!*****************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/index.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_PERMISSION_TYPES: () => (/* reexport safe */ _PermissionType__WEBPACK_IMPORTED_MODULE_3__.ALL_PERMISSION_TYPES),
/* harmony export */   isAcquirePermissionsRequest: () => (/* reexport safe */ _AcquirePermissionsRequest__WEBPACK_IMPORTED_MODULE_7__.isAcquirePermissionsRequest),
/* harmony export */   isAcquirePermissionsResponse: () => (/* reexport safe */ _AcquirePermissionsResponse__WEBPACK_IMPORTED_MODULE_8__.isAcquirePermissionsResponse),
/* harmony export */   isGetPermissionRequests: () => (/* reexport safe */ _GetPermissionRequests__WEBPACK_IMPORTED_MODULE_0__.isGetPermissionRequests),
/* harmony export */   isHasPermissionRequest: () => (/* reexport safe */ _HasPermissionsRequest__WEBPACK_IMPORTED_MODULE_5__.isHasPermissionRequest),
/* harmony export */   isHasPermissionResponse: () => (/* reexport safe */ _HasPermissionsResponse__WEBPACK_IMPORTED_MODULE_6__.isHasPermissionResponse),
/* harmony export */   isPermissionRequests: () => (/* reexport safe */ _PermissionRequests__WEBPACK_IMPORTED_MODULE_1__.isPermissionRequests),
/* harmony export */   isPermissionResponse: () => (/* reexport safe */ _PermissionResponse__WEBPACK_IMPORTED_MODULE_2__.isPermissionResponse),
/* harmony export */   isValidPermissionTypes: () => (/* reexport safe */ _PermissionType__WEBPACK_IMPORTED_MODULE_3__.isValidPermissionTypes)
/* harmony export */ });
/* harmony import */ var _GetPermissionRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetPermissionRequests */ "./shared/messaging/messages/payloads/permissions/GetPermissionRequests.ts");
/* harmony import */ var _PermissionRequests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PermissionRequests */ "./shared/messaging/messages/payloads/permissions/PermissionRequests.ts");
/* harmony import */ var _PermissionResponse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PermissionResponse */ "./shared/messaging/messages/payloads/permissions/PermissionResponse.ts");
/* harmony import */ var _PermissionType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PermissionType */ "./shared/messaging/messages/payloads/permissions/PermissionType.ts");
/* harmony import */ var _Permission__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Permission */ "./shared/messaging/messages/payloads/permissions/Permission.ts");
/* harmony import */ var _HasPermissionsRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HasPermissionsRequest */ "./shared/messaging/messages/payloads/permissions/HasPermissionsRequest.ts");
/* harmony import */ var _HasPermissionsResponse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HasPermissionsResponse */ "./shared/messaging/messages/payloads/permissions/HasPermissionsResponse.ts");
/* harmony import */ var _AcquirePermissionsRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AcquirePermissionsRequest */ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsRequest.ts");
/* harmony import */ var _AcquirePermissionsResponse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AcquirePermissionsResponse */ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsResponse.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0











/***/ }),

/***/ "./shared/messaging/messages/payloads/wallet-status-change/index.ts":
/*!**************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/wallet-status-change/index.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isWalletStatusChangePayload: () => (/* binding */ isWalletStatusChangePayload)
/* harmony export */ });
/* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! _payloads */ "./shared/messaging/messages/payloads/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function isWalletStatusChangePayload(payload) {
    return (0,_payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(payload) && payload.type === 'wallet-status-changed';
}


/***/ }),

/***/ "../../../sdk/bcs/src/b58.ts":
/*!***********************************!*\
  !*** ../../../sdk/bcs/src/b58.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromB58: () => (/* binding */ fromB58),
/* harmony export */   fromBase58: () => (/* binding */ fromBase58),
/* harmony export */   toB58: () => (/* binding */ toB58),
/* harmony export */   toBase58: () => (/* binding */ toBase58)
/* harmony export */ });
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58 */ "../../../node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const toBase58 = (buffer) => bs58__WEBPACK_IMPORTED_MODULE_0__["default"].encode(buffer);
const fromBase58 = (str) => bs58__WEBPACK_IMPORTED_MODULE_0__["default"].decode(str);
/** @deprecated use toBase58 instead */
const toB58 = toBase58;
/** @deprecated use fromBase58 instead */
const fromB58 = fromBase58;


/***/ }),

/***/ "../../../sdk/bcs/src/b64.ts":
/*!***********************************!*\
  !*** ../../../sdk/bcs/src/b64.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromB64: () => (/* binding */ fromB64),
/* harmony export */   fromBase64: () => (/* binding */ fromBase64),
/* harmony export */   toB64: () => (/* binding */ toB64),
/* harmony export */   toBase64: () => (/* binding */ toBase64)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
function fromBase64(base64String) {
    return Uint8Array.from(atob(base64String), (char) => char.charCodeAt(0));
}
const CHUNK_SIZE = 8192;
function toBase64(bytes) {
    // Special-case the simple case for speed's sake.
    if (bytes.length < CHUNK_SIZE) {
        return btoa(String.fromCharCode(...bytes));
    }
    let output = '';
    for (var i = 0; i < bytes.length; i += CHUNK_SIZE) {
        const chunk = bytes.slice(i, i + CHUNK_SIZE);
        output += String.fromCharCode(...chunk);
    }
    return btoa(output);
}
/** @deprecated use toBase64 instead */
const toB64 = toBase64;
/** @deprecated use fromBase64 instead */
const fromB64 = fromBase64;


/***/ }),

/***/ "../../../sdk/bcs/src/bcs-type.ts":
/*!****************************************!*\
  !*** ../../../sdk/bcs/src/bcs-type.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BcsType: () => (/* binding */ BcsType),
/* harmony export */   SerializedBcs: () => (/* binding */ SerializedBcs),
/* harmony export */   bigUIntBcsType: () => (/* binding */ bigUIntBcsType),
/* harmony export */   dynamicSizeBcsType: () => (/* binding */ dynamicSizeBcsType),
/* harmony export */   fixedSizeBcsType: () => (/* binding */ fixedSizeBcsType),
/* harmony export */   isSerializedBcs: () => (/* binding */ isSerializedBcs),
/* harmony export */   lazyBcsType: () => (/* binding */ lazyBcsType),
/* harmony export */   stringLikeBcsType: () => (/* binding */ stringLikeBcsType),
/* harmony export */   uIntBcsType: () => (/* binding */ uIntBcsType)
/* harmony export */ });
/* harmony import */ var _b58_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./b58.js */ "../../../sdk/bcs/src/b58.ts");
/* harmony import */ var _b64_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./b64.js */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hex.js */ "../../../sdk/bcs/src/hex.ts");
/* harmony import */ var _reader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reader.js */ "../../../sdk/bcs/src/reader.ts");
/* harmony import */ var _uleb_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uleb.js */ "../../../sdk/bcs/src/uleb.ts");
/* harmony import */ var _writer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./writer.js */ "../../../sdk/bcs/src/writer.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BcsType_write, _BcsType_serialize, _SerializedBcs_schema, _SerializedBcs_bytes;






class BcsType {
    constructor(options) {
        _BcsType_write.set(this, void 0);
        _BcsType_serialize.set(this, void 0);
        this.name = options.name;
        this.read = options.read;
        this.serializedSize = options.serializedSize ?? (() => null);
        __classPrivateFieldSet(this, _BcsType_write, options.write, "f");
        __classPrivateFieldSet(this, _BcsType_serialize, options.serialize ??
            ((value, options) => {
                const writer = new _writer_js__WEBPACK_IMPORTED_MODULE_0__.BcsWriter({
                    initialSize: this.serializedSize(value) ?? undefined,
                    ...options,
                });
                __classPrivateFieldGet(this, _BcsType_write, "f").call(this, value, writer);
                return writer.toBytes();
            }), "f");
        this.validate = options.validate ?? (() => { });
    }
    write(value, writer) {
        this.validate(value);
        __classPrivateFieldGet(this, _BcsType_write, "f").call(this, value, writer);
    }
    serialize(value, options) {
        this.validate(value);
        return new SerializedBcs(this, __classPrivateFieldGet(this, _BcsType_serialize, "f").call(this, value, options));
    }
    parse(bytes) {
        const reader = new _reader_js__WEBPACK_IMPORTED_MODULE_1__.BcsReader(bytes);
        return this.read(reader);
    }
    fromHex(hex) {
        return this.parse((0,_hex_js__WEBPACK_IMPORTED_MODULE_2__.fromHex)(hex));
    }
    fromBase58(b64) {
        return this.parse((0,_b58_js__WEBPACK_IMPORTED_MODULE_3__.fromBase58)(b64));
    }
    fromBase64(b64) {
        return this.parse((0,_b64_js__WEBPACK_IMPORTED_MODULE_4__.fromBase64)(b64));
    }
    transform({ name, input, output, validate, }) {
        return new BcsType({
            name: name ?? this.name,
            read: (reader) => output(this.read(reader)),
            write: (value, writer) => __classPrivateFieldGet(this, _BcsType_write, "f").call(this, input(value), writer),
            serializedSize: (value) => this.serializedSize(input(value)),
            serialize: (value, options) => __classPrivateFieldGet(this, _BcsType_serialize, "f").call(this, input(value), options),
            validate: (value) => {
                validate?.(value);
                this.validate(input(value));
            },
        });
    }
}
_BcsType_write = new WeakMap(), _BcsType_serialize = new WeakMap();
const SERIALIZED_BCS_BRAND = Symbol.for('@mysten/serialized-bcs');
function isSerializedBcs(obj) {
    return !!obj && typeof obj === 'object' && obj[SERIALIZED_BCS_BRAND] === true;
}
class SerializedBcs {
    // Used to brand SerializedBcs so that they can be identified, even between multiple copies
    // of the @mysten/bcs package are installed
    get [(_SerializedBcs_schema = new WeakMap(), _SerializedBcs_bytes = new WeakMap(), SERIALIZED_BCS_BRAND)]() {
        return true;
    }
    constructor(type, schema) {
        _SerializedBcs_schema.set(this, void 0);
        _SerializedBcs_bytes.set(this, void 0);
        __classPrivateFieldSet(this, _SerializedBcs_schema, type, "f");
        __classPrivateFieldSet(this, _SerializedBcs_bytes, schema, "f");
    }
    toBytes() {
        return __classPrivateFieldGet(this, _SerializedBcs_bytes, "f");
    }
    toHex() {
        return (0,_hex_js__WEBPACK_IMPORTED_MODULE_2__.toHex)(__classPrivateFieldGet(this, _SerializedBcs_bytes, "f"));
    }
    toBase64() {
        return (0,_b64_js__WEBPACK_IMPORTED_MODULE_4__.toBase64)(__classPrivateFieldGet(this, _SerializedBcs_bytes, "f"));
    }
    toBase58() {
        return (0,_b58_js__WEBPACK_IMPORTED_MODULE_3__.toBase58)(__classPrivateFieldGet(this, _SerializedBcs_bytes, "f"));
    }
    parse() {
        return __classPrivateFieldGet(this, _SerializedBcs_schema, "f").parse(__classPrivateFieldGet(this, _SerializedBcs_bytes, "f"));
    }
}
function fixedSizeBcsType({ size, ...options }) {
    return new BcsType({
        ...options,
        serializedSize: () => size,
    });
}
function uIntBcsType({ readMethod, writeMethod, ...options }) {
    return fixedSizeBcsType({
        ...options,
        read: (reader) => reader[readMethod](),
        write: (value, writer) => writer[writeMethod](value),
        validate: (value) => {
            if (value < 0 || value > options.maxValue) {
                throw new TypeError(`Invalid ${options.name} value: ${value}. Expected value in range 0-${options.maxValue}`);
            }
            options.validate?.(value);
        },
    });
}
function bigUIntBcsType({ readMethod, writeMethod, ...options }) {
    return fixedSizeBcsType({
        ...options,
        read: (reader) => reader[readMethod](),
        write: (value, writer) => writer[writeMethod](BigInt(value)),
        validate: (val) => {
            const value = BigInt(val);
            if (value < 0 || value > options.maxValue) {
                throw new TypeError(`Invalid ${options.name} value: ${value}. Expected value in range 0-${options.maxValue}`);
            }
            options.validate?.(value);
        },
    });
}
function dynamicSizeBcsType({ serialize, ...options }) {
    const type = new BcsType({
        ...options,
        serialize,
        write: (value, writer) => {
            for (const byte of type.serialize(value).toBytes()) {
                writer.write8(byte);
            }
        },
    });
    return type;
}
function stringLikeBcsType({ toBytes, fromBytes, ...options }) {
    return new BcsType({
        ...options,
        read: (reader) => {
            const length = reader.readULEB();
            const bytes = reader.readBytes(length);
            return fromBytes(bytes);
        },
        write: (hex, writer) => {
            const bytes = toBytes(hex);
            writer.writeULEB(bytes.length);
            for (let i = 0; i < bytes.length; i++) {
                writer.write8(bytes[i]);
            }
        },
        serialize: (value) => {
            const bytes = toBytes(value);
            const size = (0,_uleb_js__WEBPACK_IMPORTED_MODULE_5__.ulebEncode)(bytes.length);
            const result = new Uint8Array(size.length + bytes.length);
            result.set(size, 0);
            result.set(bytes, size.length);
            return result;
        },
        validate: (value) => {
            if (typeof value !== 'string') {
                throw new TypeError(`Invalid ${options.name} value: ${value}. Expected string`);
            }
            options.validate?.(value);
        },
    });
}
function lazyBcsType(cb) {
    let lazyType = null;
    function getType() {
        if (!lazyType) {
            lazyType = cb();
        }
        return lazyType;
    }
    return new BcsType({
        name: 'lazy',
        read: (data) => getType().read(data),
        serializedSize: (value) => getType().serializedSize(value),
        write: (value, writer) => getType().write(value, writer),
        serialize: (value, options) => getType().serialize(value, options).toBytes(),
    });
}


/***/ }),

/***/ "../../../sdk/bcs/src/bcs.ts":
/*!***********************************!*\
  !*** ../../../sdk/bcs/src/bcs.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bcs: () => (/* binding */ bcs)
/* harmony export */ });
/* harmony import */ var _bcs_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bcs-type.js */ "../../../sdk/bcs/src/bcs-type.ts");
/* harmony import */ var _uleb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uleb.js */ "../../../sdk/bcs/src/uleb.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


const bcs = {
    /**
     * Creates a BcsType that can be used to read and write an 8-bit unsigned integer.
     * @example
     * bcs.u8().serialize(255).toBytes() // Uint8Array [ 255 ]
     */
    u8(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.uIntBcsType)({
            name: 'u8',
            readMethod: 'read8',
            writeMethod: 'write8',
            size: 1,
            maxValue: 2 ** 8 - 1,
            ...options,
        });
    },
    /**
     * Creates a BcsType that can be used to read and write a 16-bit unsigned integer.
     * @example
     * bcs.u16().serialize(65535).toBytes() // Uint8Array [ 255, 255 ]
     */
    u16(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.uIntBcsType)({
            name: 'u16',
            readMethod: 'read16',
            writeMethod: 'write16',
            size: 2,
            maxValue: 2 ** 16 - 1,
            ...options,
        });
    },
    /**
     * Creates a BcsType that can be used to read and write a 32-bit unsigned integer.
     * @example
     * bcs.u32().serialize(4294967295).toBytes() // Uint8Array [ 255, 255, 255, 255 ]
     */
    u32(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.uIntBcsType)({
            name: 'u32',
            readMethod: 'read32',
            writeMethod: 'write32',
            size: 4,
            maxValue: 2 ** 32 - 1,
            ...options,
        });
    },
    /**
     * Creates a BcsType that can be used to read and write a 64-bit unsigned integer.
     * @example
     * bcs.u64().serialize(1).toBytes() // Uint8Array [ 1, 0, 0, 0, 0, 0, 0, 0 ]
     */
    u64(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.bigUIntBcsType)({
            name: 'u64',
            readMethod: 'read64',
            writeMethod: 'write64',
            size: 8,
            maxValue: 2n ** 64n - 1n,
            ...options,
        });
    },
    /**
     * Creates a BcsType that can be used to read and write a 128-bit unsigned integer.
     * @example
     * bcs.u128().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
     */
    u128(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.bigUIntBcsType)({
            name: 'u128',
            readMethod: 'read128',
            writeMethod: 'write128',
            size: 16,
            maxValue: 2n ** 128n - 1n,
            ...options,
        });
    },
    /**
     * Creates a BcsType that can be used to read and write a 256-bit unsigned integer.
     * @example
     * bcs.u256().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
     */
    u256(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.bigUIntBcsType)({
            name: 'u256',
            readMethod: 'read256',
            writeMethod: 'write256',
            size: 32,
            maxValue: 2n ** 256n - 1n,
            ...options,
        });
    },
    /**
     * Creates a BcsType that can be used to read and write boolean values.
     * @example
     * bcs.bool().serialize(true).toBytes() // Uint8Array [ 1 ]
     */
    bool(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.fixedSizeBcsType)({
            name: 'bool',
            size: 1,
            read: (reader) => reader.read8() === 1,
            write: (value, writer) => writer.write8(value ? 1 : 0),
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (typeof value !== 'boolean') {
                    throw new TypeError(`Expected boolean, found ${typeof value}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType that can be used to read and write unsigned LEB encoded integers
     * @example
     *
     */
    uleb128(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.dynamicSizeBcsType)({
            name: 'uleb128',
            read: (reader) => reader.readULEB(),
            serialize: (value) => {
                return Uint8Array.from((0,_uleb_js__WEBPACK_IMPORTED_MODULE_1__.ulebEncode)(value));
            },
            ...options,
        });
    },
    /**
     * Creates a BcsType representing a fixed length byte array
     * @param size The number of bytes this types represents
     * @example
     * bcs.bytes(3).serialize(new Uint8Array([1, 2, 3])).toBytes() // Uint8Array [1, 2, 3]
     */
    bytes(size, options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.fixedSizeBcsType)({
            name: `bytes[${size}]`,
            size,
            read: (reader) => reader.readBytes(size),
            write: (value, writer) => {
                const array = new Uint8Array(value);
                for (let i = 0; i < size; i++) {
                    writer.write8(array[i] ?? 0);
                }
            },
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (!value || typeof value !== 'object' || !('length' in value)) {
                    throw new TypeError(`Expected array, found ${typeof value}`);
                }
                if (value.length !== size) {
                    throw new TypeError(`Expected array of length ${size}, found ${value.length}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType that can ser/de string values.  Strings will be UTF-8 encoded
     * @example
     * bcs.string().serialize('a').toBytes() // Uint8Array [ 1, 97 ]
     */
    string(options) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.stringLikeBcsType)({
            name: 'string',
            toBytes: (value) => new TextEncoder().encode(value),
            fromBytes: (bytes) => new TextDecoder().decode(bytes),
            ...options,
        });
    },
    /**
     * Creates a BcsType that represents a fixed length array of a given type
     * @param size The number of elements in the array
     * @param type The BcsType of each element in the array
     * @example
     * bcs.fixedArray(3, bcs.u8()).serialize([1, 2, 3]).toBytes() // Uint8Array [ 1, 2, 3 ]
     */
    fixedArray(size, type, options) {
        return new _bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.BcsType({
            name: `${type.name}[${size}]`,
            read: (reader) => {
                const result = new Array(size);
                for (let i = 0; i < size; i++) {
                    result[i] = type.read(reader);
                }
                return result;
            },
            write: (value, writer) => {
                for (const item of value) {
                    type.write(item, writer);
                }
            },
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (!value || typeof value !== 'object' || !('length' in value)) {
                    throw new TypeError(`Expected array, found ${typeof value}`);
                }
                if (value.length !== size) {
                    throw new TypeError(`Expected array of length ${size}, found ${value.length}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType representing an optional value
     * @param type The BcsType of the optional value
     * @example
     * bcs.option(bcs.u8()).serialize(null).toBytes() // Uint8Array [ 0 ]
     * bcs.option(bcs.u8()).serialize(1).toBytes() // Uint8Array [ 1, 1 ]
     */
    option(type) {
        return bcs
            .enum(`Option<${type.name}>`, {
            None: null,
            Some: type,
        })
            .transform({
            input: (value) => {
                if (value == null) {
                    return { None: true };
                }
                return { Some: value };
            },
            output: (value) => {
                if (value.$kind === 'Some') {
                    return value.Some;
                }
                return null;
            },
        });
    },
    /**
     * Creates a BcsType representing a variable length vector of a given type
     * @param type The BcsType of each element in the vector
     *
     * @example
     * bcs.vector(bcs.u8()).toBytes([1, 2, 3]) // Uint8Array [ 3, 1, 2, 3 ]
     */
    vector(type, options) {
        return new _bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.BcsType({
            name: `vector<${type.name}>`,
            read: (reader) => {
                const length = reader.readULEB();
                const result = new Array(length);
                for (let i = 0; i < length; i++) {
                    result[i] = type.read(reader);
                }
                return result;
            },
            write: (value, writer) => {
                writer.writeULEB(value.length);
                for (const item of value) {
                    type.write(item, writer);
                }
            },
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (!value || typeof value !== 'object' || !('length' in value)) {
                    throw new TypeError(`Expected array, found ${typeof value}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType representing a tuple of a given set of types
     * @param types The BcsTypes for each element in the tuple
     *
     * @example
     * const tuple = bcs.tuple([bcs.u8(), bcs.string(), bcs.bool()])
     * tuple.serialize([1, 'a', true]).toBytes() // Uint8Array [ 1, 1, 97, 1 ]
     */
    tuple(types, options) {
        return new _bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.BcsType({
            name: `(${types.map((t) => t.name).join(', ')})`,
            serializedSize: (values) => {
                let total = 0;
                for (let i = 0; i < types.length; i++) {
                    const size = types[i].serializedSize(values[i]);
                    if (size == null) {
                        return null;
                    }
                    total += size;
                }
                return total;
            },
            read: (reader) => {
                const result = [];
                for (const type of types) {
                    result.push(type.read(reader));
                }
                return result;
            },
            write: (value, writer) => {
                for (let i = 0; i < types.length; i++) {
                    types[i].write(value[i], writer);
                }
            },
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (!Array.isArray(value)) {
                    throw new TypeError(`Expected array, found ${typeof value}`);
                }
                if (value.length !== types.length) {
                    throw new TypeError(`Expected array of length ${types.length}, found ${value.length}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType representing a struct of a given set of fields
     * @param name The name of the struct
     * @param fields The fields of the struct. The order of the fields affects how data is serialized and deserialized
     *
     * @example
     * const struct = bcs.struct('MyStruct', {
     *  a: bcs.u8(),
     *  b: bcs.string(),
     * })
     * struct.serialize({ a: 1, b: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
     */
    struct(name, fields, options) {
        const canonicalOrder = Object.entries(fields);
        return new _bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.BcsType({
            name,
            serializedSize: (values) => {
                let total = 0;
                for (const [field, type] of canonicalOrder) {
                    const size = type.serializedSize(values[field]);
                    if (size == null) {
                        return null;
                    }
                    total += size;
                }
                return total;
            },
            read: (reader) => {
                const result = {};
                for (const [field, type] of canonicalOrder) {
                    result[field] = type.read(reader);
                }
                return result;
            },
            write: (value, writer) => {
                for (const [field, type] of canonicalOrder) {
                    type.write(value[field], writer);
                }
            },
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (typeof value !== 'object' || value == null) {
                    throw new TypeError(`Expected object, found ${typeof value}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType representing an enum of a given set of options
     * @param name The name of the enum
     * @param values The values of the enum. The order of the values affects how data is serialized and deserialized.
     * null can be used to represent a variant with no data.
     *
     * @example
     * const enum = bcs.enum('MyEnum', {
     *   A: bcs.u8(),
     *   B: bcs.string(),
     *   C: null,
     * })
     * enum.serialize({ A: 1 }).toBytes() // Uint8Array [ 0, 1 ]
     * enum.serialize({ B: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
     * enum.serialize({ C: true }).toBytes() // Uint8Array [ 2 ]
     */
    enum(name, values, options) {
        const canonicalOrder = Object.entries(values);
        return new _bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.BcsType({
            name,
            read: (reader) => {
                const index = reader.readULEB();
                const enumEntry = canonicalOrder[index];
                if (!enumEntry) {
                    throw new TypeError(`Unknown value ${index} for enum ${name}`);
                }
                const [kind, type] = enumEntry;
                return {
                    [kind]: type?.read(reader) ?? true,
                    $kind: kind,
                };
            },
            write: (value, writer) => {
                const [name, val] = Object.entries(value).filter(([name]) => Object.hasOwn(values, name))[0];
                for (let i = 0; i < canonicalOrder.length; i++) {
                    const [optionName, optionType] = canonicalOrder[i];
                    if (optionName === name) {
                        writer.writeULEB(i);
                        optionType?.write(val, writer);
                        return;
                    }
                }
            },
            ...options,
            validate: (value) => {
                options?.validate?.(value);
                if (typeof value !== 'object' || value == null) {
                    throw new TypeError(`Expected object, found ${typeof value}`);
                }
                const keys = Object.keys(value).filter((k) => value[k] !== undefined && Object.hasOwn(values, k));
                if (keys.length !== 1) {
                    throw new TypeError(`Expected object with one key, but found ${keys.length} for type ${name}}`);
                }
                const [variant] = keys;
                if (!Object.hasOwn(values, variant)) {
                    throw new TypeError(`Invalid enum variant ${variant}`);
                }
            },
        });
    },
    /**
     * Creates a BcsType representing a map of a given key and value type
     * @param keyType The BcsType of the key
     * @param valueType The BcsType of the value
     * @example
     * const map = bcs.map(bcs.u8(), bcs.string())
     * map.serialize(new Map([[2, 'a']])).toBytes() // Uint8Array [ 1, 2, 1, 97 ]
     */
    map(keyType, valueType) {
        return bcs.vector(bcs.tuple([keyType, valueType])).transform({
            name: `Map<${keyType.name}, ${valueType.name}>`,
            input: (value) => {
                return [...value.entries()];
            },
            output: (value) => {
                const result = new Map();
                for (const [key, val] of value) {
                    result.set(key, val);
                }
                return result;
            },
        });
    },
    /**
     * Creates a BcsType that wraps another BcsType which is lazily evaluated. This is useful for creating recursive types.
     * @param cb A callback that returns the BcsType
     */
    lazy(cb) {
        return (0,_bcs_type_js__WEBPACK_IMPORTED_MODULE_0__.lazyBcsType)(cb);
    },
};


/***/ }),

/***/ "../../../sdk/bcs/src/hex.ts":
/*!***********************************!*\
  !*** ../../../sdk/bcs/src/hex.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromHEX: () => (/* binding */ fromHEX),
/* harmony export */   fromHex: () => (/* binding */ fromHex),
/* harmony export */   toHEX: () => (/* binding */ toHEX),
/* harmony export */   toHex: () => (/* binding */ toHex)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
function fromHex(hexStr) {
    const normalized = hexStr.startsWith('0x') ? hexStr.slice(2) : hexStr;
    const padded = normalized.length % 2 === 0 ? normalized : `0${normalized}`;
    const intArr = padded.match(/[0-9a-fA-F]{2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
    if (intArr.length !== padded.length / 2) {
        throw new Error(`Invalid hex string ${hexStr}`);
    }
    return Uint8Array.from(intArr);
}
function toHex(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}
/** @deprecated use toHex instead */
const toHEX = toHex;
/** @deprecated use fromHex instead */
const fromHEX = fromHex;


/***/ }),

/***/ "../../../sdk/bcs/src/reader.ts":
/*!**************************************!*\
  !*** ../../../sdk/bcs/src/reader.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BcsReader: () => (/* binding */ BcsReader)
/* harmony export */ });
/* harmony import */ var _uleb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uleb.js */ "../../../sdk/bcs/src/uleb.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/**
 * Class used for reading BCS data chunk by chunk. Meant to be used
 * by some wrapper, which will make sure that data is valid and is
 * matching the desired format.
 *
 * @example
 * // data for this example is:
 * // { a: u8, b: u32, c: bool, d: u64 }
 *
 * let reader = new BcsReader("647f1a060001ffffe7890423c78a050102030405");
 * let field1 = reader.read8();
 * let field2 = reader.read32();
 * let field3 = reader.read8() === '1'; // bool
 * let field4 = reader.read64();
 * // ....
 *
 * Reading vectors is another deal in bcs. To read a vector, you first need to read
 * its length using {@link readULEB}. Here's an example:
 * @example
 * // data encoded: { field: [1, 2, 3, 4, 5] }
 * let reader = new BcsReader("050102030405");
 * let vec_length = reader.readULEB();
 * let elements = [];
 * for (let i = 0; i < vec_length; i++) {
 *   elements.push(reader.read8());
 * }
 * console.log(elements); // [1,2,3,4,5]
 *
 * @param {String} data HEX-encoded data (serialized BCS)
 */
class BcsReader {
    /**
     * @param {Uint8Array} data Data to use as a buffer.
     */
    constructor(data) {
        this.bytePosition = 0;
        this.dataView = new DataView(data.buffer);
    }
    /**
     * Shift current cursor position by `bytes`.
     *
     * @param {Number} bytes Number of bytes to
     * @returns {this} Self for possible chaining.
     */
    shift(bytes) {
        this.bytePosition += bytes;
        return this;
    }
    /**
     * Read U8 value from the buffer and shift cursor by 1.
     * @returns
     */
    read8() {
        let value = this.dataView.getUint8(this.bytePosition);
        this.shift(1);
        return value;
    }
    /**
     * Read U16 value from the buffer and shift cursor by 2.
     * @returns
     */
    read16() {
        let value = this.dataView.getUint16(this.bytePosition, true);
        this.shift(2);
        return value;
    }
    /**
     * Read U32 value from the buffer and shift cursor by 4.
     * @returns
     */
    read32() {
        let value = this.dataView.getUint32(this.bytePosition, true);
        this.shift(4);
        return value;
    }
    /**
     * Read U64 value from the buffer and shift cursor by 8.
     * @returns
     */
    read64() {
        let value1 = this.read32();
        let value2 = this.read32();
        let result = value2.toString(16) + value1.toString(16).padStart(8, '0');
        return BigInt('0x' + result).toString(10);
    }
    /**
     * Read U128 value from the buffer and shift cursor by 16.
     */
    read128() {
        let value1 = BigInt(this.read64());
        let value2 = BigInt(this.read64());
        let result = value2.toString(16) + value1.toString(16).padStart(16, '0');
        return BigInt('0x' + result).toString(10);
    }
    /**
     * Read U128 value from the buffer and shift cursor by 32.
     * @returns
     */
    read256() {
        let value1 = BigInt(this.read128());
        let value2 = BigInt(this.read128());
        let result = value2.toString(16) + value1.toString(16).padStart(32, '0');
        return BigInt('0x' + result).toString(10);
    }
    /**
     * Read `num` number of bytes from the buffer and shift cursor by `num`.
     * @param num Number of bytes to read.
     */
    readBytes(num) {
        let start = this.bytePosition + this.dataView.byteOffset;
        let value = new Uint8Array(this.dataView.buffer, start, num);
        this.shift(num);
        return value;
    }
    /**
     * Read ULEB value - an integer of varying size. Used for enum indexes and
     * vector lengths.
     * @returns {Number} The ULEB value.
     */
    readULEB() {
        let start = this.bytePosition + this.dataView.byteOffset;
        let buffer = new Uint8Array(this.dataView.buffer, start);
        let { value, length } = (0,_uleb_js__WEBPACK_IMPORTED_MODULE_0__.ulebDecode)(buffer);
        this.shift(length);
        return value;
    }
    /**
     * Read a BCS vector: read a length and then apply function `cb` X times
     * where X is the length of the vector, defined as ULEB in BCS bytes.
     * @param cb Callback to process elements of vector.
     * @returns {Array<Any>} Array of the resulting values, returned by callback.
     */
    readVec(cb) {
        let length = this.readULEB();
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push(cb(this, i, length));
        }
        return result;
    }
}


/***/ }),

/***/ "../../../sdk/bcs/src/uleb.ts":
/*!************************************!*\
  !*** ../../../sdk/bcs/src/uleb.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ulebDecode: () => (/* binding */ ulebDecode),
/* harmony export */   ulebEncode: () => (/* binding */ ulebEncode)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
// Helper utility: write number as an ULEB array.
// Original code is taken from: https://www.npmjs.com/package/uleb128 (no longer exists)
function ulebEncode(num) {
    let arr = [];
    let len = 0;
    if (num === 0) {
        return [0];
    }
    while (num > 0) {
        arr[len] = num & 0x7f;
        if ((num >>= 7)) {
            arr[len] |= 0x80;
        }
        len += 1;
    }
    return arr;
}
// Helper utility: decode ULEB as an array of numbers.
// Original code is taken from: https://www.npmjs.com/package/uleb128 (no longer exists)
function ulebDecode(arr) {
    let total = 0;
    let shift = 0;
    let len = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let byte = arr[len];
        len += 1;
        total |= (byte & 0x7f) << shift;
        if ((byte & 0x80) === 0) {
            break;
        }
        shift += 7;
    }
    return {
        value: total,
        length: len,
    };
}


/***/ }),

/***/ "../../../sdk/bcs/src/utils.ts":
/*!*************************************!*\
  !*** ../../../sdk/bcs/src/utils.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeStr: () => (/* binding */ decodeStr),
/* harmony export */   encodeStr: () => (/* binding */ encodeStr),
/* harmony export */   splitGenericParameters: () => (/* binding */ splitGenericParameters)
/* harmony export */ });
/* harmony import */ var _b58_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./b58.js */ "../../../sdk/bcs/src/b58.ts");
/* harmony import */ var _b64_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./b64.js */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hex.js */ "../../../sdk/bcs/src/hex.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0



/**
 * Encode data with either `hex` or `base64`.
 *
 * @param {Uint8Array} data Data to encode.
 * @param {String} encoding Encoding to use: base64 or hex
 * @return {String} Encoded value.
 */
function encodeStr(data, encoding) {
    switch (encoding) {
        case 'base58':
            return (0,_b58_js__WEBPACK_IMPORTED_MODULE_0__.toBase58)(data);
        case 'base64':
            return (0,_b64_js__WEBPACK_IMPORTED_MODULE_1__.toBase64)(data);
        case 'hex':
            return (0,_hex_js__WEBPACK_IMPORTED_MODULE_2__.toHex)(data);
        default:
            throw new Error('Unsupported encoding, supported values are: base64, hex');
    }
}
/**
 * Decode either `base64` or `hex` data.
 *
 * @param {String} data Data to encode.
 * @param {String} encoding Encoding to use: base64 or hex
 * @return {Uint8Array} Encoded value.
 */
function decodeStr(data, encoding) {
    switch (encoding) {
        case 'base58':
            return (0,_b58_js__WEBPACK_IMPORTED_MODULE_0__.fromBase58)(data);
        case 'base64':
            return (0,_b64_js__WEBPACK_IMPORTED_MODULE_1__.fromBase64)(data);
        case 'hex':
            return (0,_hex_js__WEBPACK_IMPORTED_MODULE_2__.fromHex)(data);
        default:
            throw new Error('Unsupported encoding, supported values are: base64, hex');
    }
}
function splitGenericParameters(str, genericSeparators = ['<', '>']) {
    const [left, right] = genericSeparators;
    const tok = [];
    let word = '';
    let nestedAngleBrackets = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === left) {
            nestedAngleBrackets++;
        }
        if (char === right) {
            nestedAngleBrackets--;
        }
        if (nestedAngleBrackets === 0 && char === ',') {
            tok.push(word.trim());
            word = '';
            continue;
        }
        word += char;
    }
    tok.push(word.trim());
    return tok;
}


/***/ }),

/***/ "../../../sdk/bcs/src/writer.ts":
/*!**************************************!*\
  !*** ../../../sdk/bcs/src/writer.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BcsWriter: () => (/* binding */ BcsWriter)
/* harmony export */ });
/* harmony import */ var _uleb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uleb.js */ "../../../sdk/bcs/src/uleb.ts");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../../sdk/bcs/src/utils.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


/**
 * Class used to write BCS data into a buffer. Initializer requires
 * some size of a buffer to init; default value for this buffer is 1KB.
 *
 * Most methods are chainable, so it is possible to write them in one go.
 *
 * @example
 * let serialized = new BcsWriter()
 *   .write8(10)
 *   .write32(1000000)
 *   .write64(10000001000000)
 *   .hex();
 */
/**
 * Set of methods that allows data encoding/decoding as standalone
 * BCS value or a part of a composed structure/vector.
 */
class BcsWriter {
    constructor({ initialSize = 1024, maxSize = Infinity, allocateSize = 1024, } = {}) {
        this.bytePosition = 0;
        this.size = initialSize;
        this.maxSize = maxSize;
        this.allocateSize = allocateSize;
        this.dataView = new DataView(new ArrayBuffer(initialSize));
    }
    ensureSizeOrGrow(bytes) {
        const requiredSize = this.bytePosition + bytes;
        if (requiredSize > this.size) {
            const nextSize = Math.min(this.maxSize, this.size + this.allocateSize);
            if (requiredSize > nextSize) {
                throw new Error(`Attempting to serialize to BCS, but buffer does not have enough size. Allocated size: ${this.size}, Max size: ${this.maxSize}, Required size: ${requiredSize}`);
            }
            this.size = nextSize;
            const nextBuffer = new ArrayBuffer(this.size);
            new Uint8Array(nextBuffer).set(new Uint8Array(this.dataView.buffer));
            this.dataView = new DataView(nextBuffer);
        }
    }
    /**
     * Shift current cursor position by `bytes`.
     *
     * @param {Number} bytes Number of bytes to
     * @returns {this} Self for possible chaining.
     */
    shift(bytes) {
        this.bytePosition += bytes;
        return this;
    }
    /**
     * Write a U8 value into a buffer and shift cursor position by 1.
     * @param {Number} value Value to write.
     * @returns {this}
     */
    write8(value) {
        this.ensureSizeOrGrow(1);
        this.dataView.setUint8(this.bytePosition, Number(value));
        return this.shift(1);
    }
    /**
     * Write a U16 value into a buffer and shift cursor position by 2.
     * @param {Number} value Value to write.
     * @returns {this}
     */
    write16(value) {
        this.ensureSizeOrGrow(2);
        this.dataView.setUint16(this.bytePosition, Number(value), true);
        return this.shift(2);
    }
    /**
     * Write a U32 value into a buffer and shift cursor position by 4.
     * @param {Number} value Value to write.
     * @returns {this}
     */
    write32(value) {
        this.ensureSizeOrGrow(4);
        this.dataView.setUint32(this.bytePosition, Number(value), true);
        return this.shift(4);
    }
    /**
     * Write a U64 value into a buffer and shift cursor position by 8.
     * @param {bigint} value Value to write.
     * @returns {this}
     */
    write64(value) {
        toLittleEndian(BigInt(value), 8).forEach((el) => this.write8(el));
        return this;
    }
    /**
     * Write a U128 value into a buffer and shift cursor position by 16.
     *
     * @param {bigint} value Value to write.
     * @returns {this}
     */
    write128(value) {
        toLittleEndian(BigInt(value), 16).forEach((el) => this.write8(el));
        return this;
    }
    /**
     * Write a U256 value into a buffer and shift cursor position by 16.
     *
     * @param {bigint} value Value to write.
     * @returns {this}
     */
    write256(value) {
        toLittleEndian(BigInt(value), 32).forEach((el) => this.write8(el));
        return this;
    }
    /**
     * Write a ULEB value into a buffer and shift cursor position by number of bytes
     * written.
     * @param {Number} value Value to write.
     * @returns {this}
     */
    writeULEB(value) {
        (0,_uleb_js__WEBPACK_IMPORTED_MODULE_0__.ulebEncode)(value).forEach((el) => this.write8(el));
        return this;
    }
    /**
     * Write a vector into a buffer by first writing the vector length and then calling
     * a callback on each passed value.
     *
     * @param {Array<Any>} vector Array of elements to write.
     * @param {WriteVecCb} cb Callback to call on each element of the vector.
     * @returns {this}
     */
    writeVec(vector, cb) {
        this.writeULEB(vector.length);
        Array.from(vector).forEach((el, i) => cb(this, el, i, vector.length));
        return this;
    }
    /**
     * Adds support for iterations over the object.
     * @returns {Uint8Array}
     */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.bytePosition; i++) {
            yield this.dataView.getUint8(i);
        }
        return this.toBytes();
    }
    /**
     * Get underlying buffer taking only value bytes (in case initial buffer size was bigger).
     * @returns {Uint8Array} Resulting bcs.
     */
    toBytes() {
        return new Uint8Array(this.dataView.buffer.slice(0, this.bytePosition));
    }
    /**
     * Represent data as 'hex' or 'base64'
     * @param encoding Encoding to use: 'base64' or 'hex'
     */
    toString(encoding) {
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.encodeStr)(this.toBytes(), encoding);
    }
}
function toLittleEndian(bigint, size) {
    let result = new Uint8Array(size);
    let i = 0;
    while (bigint > 0) {
        result[i] = Number(bigint % BigInt(256));
        bigint = bigint / BigInt(256);
        i += 1;
    }
    return result;
}


/***/ }),

/***/ "../../../sdk/typescript/src/bcs/bcs.ts":
/*!**********************************************!*\
  !*** ../../../sdk/typescript/src/bcs/bcs.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Address: () => (/* binding */ Address),
/* harmony export */   AppId: () => (/* binding */ AppId),
/* harmony export */   Argument: () => (/* binding */ Argument),
/* harmony export */   CallArg: () => (/* binding */ CallArg),
/* harmony export */   Command: () => (/* binding */ Command),
/* harmony export */   CompressedSignature: () => (/* binding */ CompressedSignature),
/* harmony export */   GasData: () => (/* binding */ GasData),
/* harmony export */   Intent: () => (/* binding */ Intent),
/* harmony export */   IntentMessage: () => (/* binding */ IntentMessage),
/* harmony export */   IntentScope: () => (/* binding */ IntentScope),
/* harmony export */   IntentVersion: () => (/* binding */ IntentVersion),
/* harmony export */   MultiSig: () => (/* binding */ MultiSig),
/* harmony export */   MultiSigPkMap: () => (/* binding */ MultiSigPkMap),
/* harmony export */   MultiSigPublicKey: () => (/* binding */ MultiSigPublicKey),
/* harmony export */   ObjectArg: () => (/* binding */ ObjectArg),
/* harmony export */   ObjectDigest: () => (/* binding */ ObjectDigest),
/* harmony export */   PasskeyAuthenticator: () => (/* binding */ PasskeyAuthenticator),
/* harmony export */   ProgrammableMoveCall: () => (/* binding */ ProgrammableMoveCall),
/* harmony export */   ProgrammableTransaction: () => (/* binding */ ProgrammableTransaction),
/* harmony export */   PublicKey: () => (/* binding */ PublicKey),
/* harmony export */   SenderSignedData: () => (/* binding */ SenderSignedData),
/* harmony export */   SenderSignedTransaction: () => (/* binding */ SenderSignedTransaction),
/* harmony export */   SharedObjectRef: () => (/* binding */ SharedObjectRef),
/* harmony export */   StructTag: () => (/* binding */ StructTag),
/* harmony export */   SuiObjectRef: () => (/* binding */ SuiObjectRef),
/* harmony export */   TransactionData: () => (/* binding */ TransactionData),
/* harmony export */   TransactionDataV1: () => (/* binding */ TransactionDataV1),
/* harmony export */   TransactionExpiration: () => (/* binding */ TransactionExpiration),
/* harmony export */   TransactionKind: () => (/* binding */ TransactionKind),
/* harmony export */   TypeTag: () => (/* binding */ TypeTag),
/* harmony export */   base64String: () => (/* binding */ base64String)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/bcs.ts");
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/hex.ts");
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b58.ts");
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
/* harmony import */ var _type_tag_serializer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./type-tag-serializer.js */ "../../../sdk/typescript/src/bcs/type-tag-serializer.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0



function unsafe_u64(options) {
    return _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs
        .u64({
        name: 'unsafe_u64',
        ...options,
    })
        .transform({
        input: (val) => val,
        output: (val) => Number(val),
    });
}
function optionEnum(type) {
    return _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('Option', {
        None: null,
        Some: type,
    });
}
const Address = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.bytes(_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.SUI_ADDRESS_LENGTH).transform({
    validate: (val) => {
        const address = typeof val === 'string' ? val : (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toHex)(val);
        if (!address || !(0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.isValidSuiAddress)((0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)(address))) {
            throw new Error(`Invalid Sui address ${address}`);
        }
    },
    input: (val) => typeof val === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.fromHex)((0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)(val)) : val,
    output: (val) => (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toHex)(val)),
});
const ObjectDigest = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()).transform({
    name: 'ObjectDigest',
    input: (value) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_3__.fromBase58)(value),
    output: (value) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_3__.toBase58)(new Uint8Array(value)),
    validate: (value) => {
        if ((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_3__.fromBase58)(value).length !== 32) {
            throw new Error('ObjectDigest must be 32 bytes');
        }
    },
});
const SuiObjectRef = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('SuiObjectRef', {
    objectId: Address,
    version: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    digest: ObjectDigest,
});
const SharedObjectRef = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('SharedObjectRef', {
    objectId: Address,
    initialSharedVersion: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    mutable: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.bool(),
});
const ObjectArg = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('ObjectArg', {
    ImmOrOwnedObject: SuiObjectRef,
    SharedObject: SharedObjectRef,
    Receiving: SuiObjectRef,
});
const CallArg = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('CallArg', {
    Pure: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('Pure', {
        bytes: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()).transform({
            input: (val) => (typeof val === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.fromBase64)(val) : val),
            output: (val) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.toBase64)(new Uint8Array(val)),
        }),
    }),
    Object: ObjectArg,
});
const InnerTypeTag = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('TypeTag', {
    bool: null,
    u8: null,
    u64: null,
    u128: null,
    address: null,
    signer: null,
    vector: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.lazy(() => InnerTypeTag),
    struct: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.lazy(() => StructTag),
    u16: null,
    u32: null,
    u256: null,
});
const TypeTag = InnerTypeTag.transform({
    input: (typeTag) => typeof typeTag === 'string' ? _type_tag_serializer_js__WEBPACK_IMPORTED_MODULE_5__.TypeTagSerializer.parseFromStr(typeTag, true) : typeTag,
    output: (typeTag) => _type_tag_serializer_js__WEBPACK_IMPORTED_MODULE_5__.TypeTagSerializer.tagToString(typeTag),
});
const Argument = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('Argument', {
    GasCoin: null,
    Input: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    Result: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    NestedResult: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(), _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16()]),
});
const ProgrammableMoveCall = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('ProgrammableMoveCall', {
    package: Address,
    module: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
    function: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
    typeArguments: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(TypeTag),
    arguments: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Argument),
});
const Command = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('Command', {
    /**
     * A Move Call - any public Move function can be called via
     * this transaction. The results can be used that instant to pass
     * into the next transaction.
     */
    MoveCall: ProgrammableMoveCall,
    /**
     * Transfer vector of objects to a receiver.
     */
    TransferObjects: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('TransferObjects', {
        objects: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Argument),
        address: Argument,
    }),
    // /**
    //  * Split `amount` from a `coin`.
    //  */
    SplitCoins: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('SplitCoins', {
        coin: Argument,
        amounts: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Argument),
    }),
    // /**
    //  * Merge Vector of Coins (`sources`) into a `destination`.
    //  */
    MergeCoins: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MergeCoins', {
        destination: Argument,
        sources: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Argument),
    }),
    // /**
    //  * Publish a Move module.
    //  */
    Publish: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('Publish', {
        modules: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()).transform({
            input: (val) => (typeof val === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.fromBase64)(val) : val),
            output: (val) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.toBase64)(new Uint8Array(val)),
        })),
        dependencies: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Address),
    }),
    // /**
    //  * Build a vector of objects using the input arguments.
    //  * It is impossible to export construct a `vector<T: key>` otherwise,
    //  * so this call serves a utility function.
    //  */
    MakeMoveVec: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MakeMoveVec', {
        type: optionEnum(TypeTag).transform({
            input: (val) => val === null
                ? {
                    None: true,
                }
                : {
                    Some: val,
                },
            output: (val) => val.Some ?? null,
        }),
        elements: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Argument),
    }),
    Upgrade: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('Upgrade', {
        modules: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()).transform({
            input: (val) => (typeof val === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.fromBase64)(val) : val),
            output: (val) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.toBase64)(new Uint8Array(val)),
        })),
        dependencies: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Address),
        package: Address,
        ticket: Argument,
    }),
});
const ProgrammableTransaction = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('ProgrammableTransaction', {
    inputs: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(CallArg),
    commands: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(Command),
});
const TransactionKind = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('TransactionKind', {
    ProgrammableTransaction: ProgrammableTransaction,
    ChangeEpoch: null,
    Genesis: null,
    ConsensusCommitPrologue: null,
});
const TransactionExpiration = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('TransactionExpiration', {
    None: null,
    Epoch: unsafe_u64(),
});
const StructTag = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('StructTag', {
    address: Address,
    module: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
    name: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
    typeParams: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(InnerTypeTag),
});
const GasData = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('GasData', {
    payment: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(SuiObjectRef),
    owner: Address,
    price: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    budget: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
});
const TransactionDataV1 = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('TransactionDataV1', {
    kind: TransactionKind,
    sender: Address,
    gasData: GasData,
    expiration: TransactionExpiration,
});
const TransactionData = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('TransactionData', {
    V1: TransactionDataV1,
});
const IntentScope = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('IntentScope', {
    TransactionData: null,
    TransactionEffects: null,
    CheckpointSummary: null,
    PersonalMessage: null,
});
const IntentVersion = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('IntentVersion', {
    V0: null,
});
const AppId = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('AppId', {
    Sui: null,
});
const Intent = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('Intent', {
    scope: IntentScope,
    version: IntentVersion,
    appId: AppId,
});
function IntentMessage(T) {
    return _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct(`IntentMessage<${T.name}>`, {
        intent: Intent,
        value: T,
    });
}
const CompressedSignature = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('CompressedSignature', {
    ED25519: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.fixedArray(64, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    Secp256k1: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.fixedArray(64, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    Secp256r1: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.fixedArray(64, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    ZkLogin: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
});
const PublicKey = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('PublicKey', {
    ED25519: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.fixedArray(32, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    Secp256k1: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.fixedArray(33, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    Secp256r1: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.fixedArray(33, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    ZkLogin: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
});
const MultiSigPkMap = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MultiSigPkMap', {
    pubKey: PublicKey,
    weight: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8(),
});
const MultiSigPublicKey = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MultiSigPublicKey', {
    pk_map: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(MultiSigPkMap),
    threshold: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
});
const MultiSig = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MultiSig', {
    sigs: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(CompressedSignature),
    bitmap: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    multisig_pk: MultiSigPublicKey,
});
const base64String = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()).transform({
    input: (val) => (typeof val === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.fromBase64)(val) : val),
    output: (val) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_4__.toBase64)(new Uint8Array(val)),
});
const SenderSignedTransaction = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('SenderSignedTransaction', {
    intentMessage: IntentMessage(TransactionData),
    txSignatures: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(base64String),
});
const SenderSignedData = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(SenderSignedTransaction, {
    name: 'SenderSignedData',
});
const PasskeyAuthenticator = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('PasskeyAuthenticator', {
    authenticatorData: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
    clientDataJson: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
    userSignature: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()),
});


/***/ }),

/***/ "../../../sdk/typescript/src/bcs/effects.ts":
/*!**************************************************!*\
  !*** ../../../sdk/typescript/src/bcs/effects.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionEffects: () => (/* binding */ TransactionEffects)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/bcs.ts");
/* harmony import */ var _bcs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bcs.js */ "../../../sdk/typescript/src/bcs/bcs.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


const PackageUpgradeError = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('PackageUpgradeError', {
    UnableToFetchPackage: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('UnableToFetchPackage', { packageId: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address }),
    NotAPackage: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('NotAPackage', { objectId: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address }),
    IncompatibleUpgrade: null,
    DigestDoesNotMatch: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('DigestDoesNotMatch', { digest: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8()) }),
    UnknownUpgradePolicy: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('UnknownUpgradePolicy', { policy: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u8() }),
    PackageIDDoesNotMatch: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('PackageIDDoesNotMatch', {
        packageId: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address,
        ticketId: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address,
    }),
});
const ModuleId = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('ModuleId', {
    address: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address,
    name: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
});
const MoveLocation = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MoveLocation', {
    module: ModuleId,
    function: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    instruction: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    functionName: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string()),
});
const CommandArgumentError = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('CommandArgumentError', {
    TypeMismatch: null,
    InvalidBCSBytes: null,
    InvalidUsageOfPureArg: null,
    InvalidArgumentToPrivateEntryFunction: null,
    IndexOutOfBounds: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('IndexOutOfBounds', { idx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16() }),
    SecondaryIndexOutOfBounds: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('SecondaryIndexOutOfBounds', {
        resultIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
        secondaryIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    }),
    InvalidResultArity: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('InvalidResultArity', { resultIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16() }),
    InvalidGasCoinUsage: null,
    InvalidValueUsage: null,
    InvalidObjectByValue: null,
    InvalidObjectByMutRef: null,
    SharedObjectOperationNotAllowed: null,
});
const TypeArgumentError = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('TypeArgumentError', {
    TypeNotFound: null,
    ConstraintNotSatisfied: null,
});
const ExecutionFailureStatus = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('ExecutionFailureStatus', {
    InsufficientGas: null,
    InvalidGasObject: null,
    InvariantViolation: null,
    FeatureNotYetSupported: null,
    MoveObjectTooBig: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MoveObjectTooBig', {
        objectSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
        maxObjectSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    }),
    MovePackageTooBig: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('MovePackageTooBig', {
        objectSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
        maxObjectSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    }),
    CircularObjectOwnership: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('CircularObjectOwnership', { object: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address }),
    InsufficientCoinBalance: null,
    CoinBalanceOverflow: null,
    PublishErrorNonZeroAddress: null,
    SuiMoveVerificationError: null,
    MovePrimitiveRuntimeError: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(MoveLocation),
    MoveAbort: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([MoveLocation, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64()]),
    VMVerificationOrDeserializationError: null,
    VMInvariantViolation: null,
    FunctionNotFound: null,
    ArityMismatch: null,
    TypeArityMismatch: null,
    NonEntryFunctionInvoked: null,
    CommandArgumentError: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('CommandArgumentError', {
        argIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
        kind: CommandArgumentError,
    }),
    TypeArgumentError: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('TypeArgumentError', {
        argumentIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
        kind: TypeArgumentError,
    }),
    UnusedValueWithoutDrop: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('UnusedValueWithoutDrop', {
        resultIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
        secondaryIdx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    }),
    InvalidPublicFunctionReturnType: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('InvalidPublicFunctionReturnType', {
        idx: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u16(),
    }),
    InvalidTransferObject: null,
    EffectsTooLarge: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('EffectsTooLarge', { currentSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(), maxSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64() }),
    PublishUpgradeMissingDependency: null,
    PublishUpgradeDependencyDowngrade: null,
    PackageUpgradeError: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('PackageUpgradeError', { upgradeError: PackageUpgradeError }),
    WrittenObjectsTooLarge: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('WrittenObjectsTooLarge', {
        currentSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
        maxSize: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    }),
    CertificateDenied: null,
    SuiMoveVerificationTimedout: null,
    SharedObjectOperationNotAllowed: null,
    InputObjectDeleted: null,
    ExecutionCancelledDueToSharedObjectCongestion: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('ExecutionCancelledDueToSharedObjectCongestion', {
        congestedObjects: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address),
    }),
    AddressDeniedForCoin: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('AddressDeniedForCoin', {
        address: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address,
        coinType: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string(),
    }),
    CoinTypeGlobalPause: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('CoinTypeGlobalPause', { coinType: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.string() }),
    ExecutionCancelledDueToRandomnessUnavailable: null,
});
const ExecutionStatus = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('ExecutionStatus', {
    Success: null,
    Failed: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('ExecutionFailed', {
        error: ExecutionFailureStatus,
        command: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64()),
    }),
});
const GasCostSummary = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('GasCostSummary', {
    computationCost: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    storageCost: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    storageRebate: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    nonRefundableStorageFee: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
});
const Owner = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('Owner', {
    AddressOwner: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address,
    ObjectOwner: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address,
    Shared: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('Shared', {
        initialSharedVersion: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    }),
    Immutable: null,
});
const TransactionEffectsV1 = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('TransactionEffectsV1', {
    status: ExecutionStatus,
    executedEpoch: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    gasUsed: GasCostSummary,
    modifiedAtVersions: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address, _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64()])),
    sharedObjects: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef),
    transactionDigest: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest,
    created: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef, Owner])),
    mutated: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef, Owner])),
    unwrapped: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef, Owner])),
    deleted: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef),
    unwrappedThenDeleted: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef),
    wrapped: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef),
    gasObject: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.SuiObjectRef, Owner]),
    eventsDigest: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest),
    dependencies: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest),
});
const VersionDigest = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(), _bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest]);
const ObjectIn = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('ObjectIn', {
    NotExist: null,
    Exist: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([VersionDigest, Owner]),
});
const ObjectOut = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('ObjectOut', {
    NotExist: null,
    ObjectWrite: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest, Owner]),
    PackageWrite: VersionDigest,
});
const IDOperation = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('IDOperation', {
    None: null,
    Created: null,
    Deleted: null,
});
const EffectsObjectChange = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('EffectsObjectChange', {
    inputState: ObjectIn,
    outputState: ObjectOut,
    idOperation: IDOperation,
});
const UnchangedSharedKind = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('UnchangedSharedKind', {
    ReadOnlyRoot: VersionDigest,
    MutateDeleted: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    ReadDeleted: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    Cancelled: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    PerEpochConfig: null,
});
const TransactionEffectsV2 = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.struct('TransactionEffectsV2', {
    status: ExecutionStatus,
    executedEpoch: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    gasUsed: GasCostSummary,
    transactionDigest: _bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest,
    gasObjectIndex: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u32()),
    eventsDigest: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest),
    dependencies: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest),
    lamportVersion: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.u64(),
    changedObjects: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address, EffectsObjectChange])),
    unchangedSharedObjects: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.vector(_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.tuple([_bcs_js__WEBPACK_IMPORTED_MODULE_1__.Address, UnchangedSharedKind])),
    auxDataDigest: _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.option(_bcs_js__WEBPACK_IMPORTED_MODULE_1__.ObjectDigest),
});
const TransactionEffects = _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.bcs.enum('TransactionEffects', {
    V1: TransactionEffectsV1,
    V2: TransactionEffectsV2,
});


/***/ }),

/***/ "../../../sdk/typescript/src/bcs/index.ts":
/*!************************************************!*\
  !*** ../../../sdk/typescript/src/bcs/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BcsType: () => (/* reexport safe */ _mysten_bcs__WEBPACK_IMPORTED_MODULE_1__.BcsType),
/* harmony export */   TypeTagSerializer: () => (/* reexport safe */ _type_tag_serializer_js__WEBPACK_IMPORTED_MODULE_0__.TypeTagSerializer),
/* harmony export */   bcs: () => (/* binding */ suiBcs)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/bcs.ts");
/* harmony import */ var _bcs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bcs.js */ "../../../sdk/typescript/src/bcs/bcs.ts");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./effects.js */ "../../../sdk/typescript/src/bcs/effects.ts");
/* harmony import */ var _type_tag_serializer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-tag-serializer.js */ "../../../sdk/typescript/src/bcs/type-tag-serializer.ts");
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/bcs-type.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0





const suiBcs = {
    ..._mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs,
    U8: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.u8(),
    U16: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.u16(),
    U32: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.u32(),
    U64: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.u64(),
    U128: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.u128(),
    U256: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.u256(),
    ULEB128: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.uleb128(),
    Bool: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.bool(),
    String: _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.bcs.string(),
    Address: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.Address,
    AppId: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.AppId,
    Argument: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.Argument,
    CallArg: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.CallArg,
    CompressedSignature: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.CompressedSignature,
    GasData: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.GasData,
    Intent: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.Intent,
    IntentMessage: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.IntentMessage,
    IntentScope: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.IntentScope,
    IntentVersion: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.IntentVersion,
    MultiSig: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.MultiSig,
    MultiSigPkMap: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.MultiSigPkMap,
    MultiSigPublicKey: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.MultiSigPublicKey,
    ObjectArg: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.ObjectArg,
    ObjectDigest: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.ObjectDigest,
    ProgrammableMoveCall: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.ProgrammableMoveCall,
    ProgrammableTransaction: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.ProgrammableTransaction,
    PublicKey: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.PublicKey,
    SenderSignedData: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.SenderSignedData,
    SenderSignedTransaction: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.SenderSignedTransaction,
    SharedObjectRef: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.SharedObjectRef,
    StructTag: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.StructTag,
    SuiObjectRef: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.SuiObjectRef,
    Command: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.Command,
    TransactionData: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.TransactionData,
    TransactionDataV1: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.TransactionDataV1,
    TransactionExpiration: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.TransactionExpiration,
    TransactionKind: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.TransactionKind,
    TypeTag: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.TypeTag,
    TransactionEffects: _effects_js__WEBPACK_IMPORTED_MODULE_4__.TransactionEffects,
    PasskeyAuthenticator: _bcs_js__WEBPACK_IMPORTED_MODULE_3__.PasskeyAuthenticator,
};



/***/ }),

/***/ "../../../sdk/typescript/src/bcs/type-tag-serializer.ts":
/*!**************************************************************!*\
  !*** ../../../sdk/typescript/src/bcs/type-tag-serializer.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeTagSerializer: () => (/* binding */ TypeTagSerializer)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/utils.ts");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


const VECTOR_REGEX = /^vector<(.+)>$/;
const STRUCT_REGEX = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/;
class TypeTagSerializer {
    static parseFromStr(str, normalizeAddress = false) {
        if (str === 'address') {
            return { address: null };
        }
        else if (str === 'bool') {
            return { bool: null };
        }
        else if (str === 'u8') {
            return { u8: null };
        }
        else if (str === 'u16') {
            return { u16: null };
        }
        else if (str === 'u32') {
            return { u32: null };
        }
        else if (str === 'u64') {
            return { u64: null };
        }
        else if (str === 'u128') {
            return { u128: null };
        }
        else if (str === 'u256') {
            return { u256: null };
        }
        else if (str === 'signer') {
            return { signer: null };
        }
        const vectorMatch = str.match(VECTOR_REGEX);
        if (vectorMatch) {
            return {
                vector: TypeTagSerializer.parseFromStr(vectorMatch[1], normalizeAddress),
            };
        }
        const structMatch = str.match(STRUCT_REGEX);
        if (structMatch) {
            const address = normalizeAddress ? (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(structMatch[1]) : structMatch[1];
            return {
                struct: {
                    address,
                    module: structMatch[2],
                    name: structMatch[3],
                    typeParams: structMatch[5] === undefined
                        ? []
                        : TypeTagSerializer.parseStructTypeArgs(structMatch[5], normalizeAddress),
                },
            };
        }
        throw new Error(`Encountered unexpected token when parsing type args for ${str}`);
    }
    static parseStructTypeArgs(str, normalizeAddress = false) {
        return (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_1__.splitGenericParameters)(str).map((tok) => TypeTagSerializer.parseFromStr(tok, normalizeAddress));
    }
    static tagToString(tag) {
        if ('bool' in tag) {
            return 'bool';
        }
        if ('u8' in tag) {
            return 'u8';
        }
        if ('u16' in tag) {
            return 'u16';
        }
        if ('u32' in tag) {
            return 'u32';
        }
        if ('u64' in tag) {
            return 'u64';
        }
        if ('u128' in tag) {
            return 'u128';
        }
        if ('u256' in tag) {
            return 'u256';
        }
        if ('address' in tag) {
            return 'address';
        }
        if ('signer' in tag) {
            return 'signer';
        }
        if ('vector' in tag) {
            return `vector<${TypeTagSerializer.tagToString(tag.vector)}>`;
        }
        if ('struct' in tag) {
            const struct = tag.struct;
            const typeParams = struct.typeParams.map(TypeTagSerializer.tagToString).join(', ');
            return `${struct.address}::${struct.module}::${struct.name}${typeParams ? `<${typeParams}>` : ''}`;
        }
        throw new Error('Invalid TypeTag');
    }
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/Commands.ts":
/*!************************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/Commands.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Commands: () => (/* binding */ Commands),
/* harmony export */   UpgradePolicy: () => (/* binding */ UpgradePolicy)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
/* harmony import */ var _data_internal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/internal.js */ "../../../sdk/typescript/src/transactions/data/internal.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0




// Keep in sync with constants in
// crates/sui-framework/packages/sui-framework/sources/package.move
var UpgradePolicy;
(function (UpgradePolicy) {
    UpgradePolicy[UpgradePolicy["COMPATIBLE"] = 0] = "COMPATIBLE";
    UpgradePolicy[UpgradePolicy["ADDITIVE"] = 128] = "ADDITIVE";
    UpgradePolicy[UpgradePolicy["DEP_ONLY"] = 192] = "DEP_ONLY";
})(UpgradePolicy || (UpgradePolicy = {}));
/**
 * Simple helpers used to construct transactions:
 */
const Commands = {
    MoveCall(input) {
        const [pkg, mod = '', fn = ''] = 'target' in input ? input.target.split('::') : [input.package, input.module, input.function];
        return {
            $kind: 'MoveCall',
            MoveCall: {
                package: pkg,
                module: mod,
                function: fn,
                typeArguments: input.typeArguments ?? [],
                arguments: input.arguments ?? [],
            },
        };
    },
    TransferObjects(objects, address) {
        return {
            $kind: 'TransferObjects',
            TransferObjects: {
                objects: objects.map((o) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, o)),
                address: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, address),
            },
        };
    },
    SplitCoins(coin, amounts) {
        return {
            $kind: 'SplitCoins',
            SplitCoins: {
                coin: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, coin),
                amounts: amounts.map((o) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, o)),
            },
        };
    },
    MergeCoins(destination, sources) {
        return {
            $kind: 'MergeCoins',
            MergeCoins: {
                destination: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, destination),
                sources: sources.map((o) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, o)),
            },
        };
    },
    Publish({ modules, dependencies, }) {
        return {
            $kind: 'Publish',
            Publish: {
                modules: modules.map((module) => typeof module === 'string' ? module : (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toBase64)(new Uint8Array(module))),
                dependencies: dependencies.map((dep) => (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_3__.normalizeSuiObjectId)(dep)),
            },
        };
    },
    Upgrade({ modules, dependencies, package: packageId, ticket, }) {
        return {
            $kind: 'Upgrade',
            Upgrade: {
                modules: modules.map((module) => typeof module === 'string' ? module : (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toBase64)(new Uint8Array(module))),
                dependencies: dependencies.map((dep) => (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_3__.normalizeSuiObjectId)(dep)),
                package: packageId,
                ticket: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, ticket),
            },
        };
    },
    MakeMoveVec({ type, elements, }) {
        return {
            $kind: 'MakeMoveVec',
            MakeMoveVec: {
                type: type ?? null,
                elements: elements.map((o) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, o)),
            },
        };
    },
    Intent({ name, inputs = {}, data = {}, }) {
        return {
            $kind: '$Intent',
            $Intent: {
                name,
                inputs: Object.fromEntries(Object.entries(inputs).map(([key, value]) => [
                    key,
                    Array.isArray(value) ? value.map((o) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, o)) : (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_1__.Argument, value),
                ])),
                data,
            },
        };
    },
};


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/Inputs.ts":
/*!**********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/Inputs.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Inputs: () => (/* binding */ Inputs)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


function Pure(data) {
    return {
        $kind: 'Pure',
        Pure: {
            bytes: data instanceof Uint8Array ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.toBase64)(data) : data.toBase64(),
        },
    };
}
const Inputs = {
    Pure,
    ObjectRef({ objectId, digest, version }) {
        return {
            $kind: 'Object',
            Object: {
                $kind: 'ImmOrOwnedObject',
                ImmOrOwnedObject: {
                    digest,
                    version,
                    objectId: (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)(objectId),
                },
            },
        };
    },
    SharedObjectRef({ objectId, mutable, initialSharedVersion, }) {
        return {
            $kind: 'Object',
            Object: {
                $kind: 'SharedObject',
                SharedObject: {
                    mutable,
                    initialSharedVersion,
                    objectId: (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)(objectId),
                },
            },
        };
    },
    ReceivingRef({ objectId, digest, version }) {
        return {
            $kind: 'Object',
            Object: {
                $kind: 'Receiving',
                Receiving: {
                    digest,
                    version,
                    objectId: (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)(objectId),
                },
            },
        };
    },
};


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/Transaction.ts":
/*!***************************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/Transaction.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transaction: () => (/* binding */ Transaction),
/* harmony export */   isTransaction: () => (/* binding */ isTransaction)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/bcs-type.ts");
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
/* harmony import */ var _Commands_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Commands.js */ "../../../sdk/typescript/src/transactions/Commands.ts");
/* harmony import */ var _data_internal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/internal.js */ "../../../sdk/typescript/src/transactions/data/internal.ts");
/* harmony import */ var _data_v1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/v1.js */ "../../../sdk/typescript/src/transactions/data/v1.ts");
/* harmony import */ var _data_v2_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./data/v2.js */ "../../../sdk/typescript/src/transactions/data/v2.ts");
/* harmony import */ var _Inputs_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Inputs.js */ "../../../sdk/typescript/src/transactions/Inputs.ts");
/* harmony import */ var _json_rpc_resolver_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./json-rpc-resolver.js */ "../../../sdk/typescript/src/transactions/json-rpc-resolver.ts");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./object.js */ "../../../sdk/typescript/src/transactions/object.ts");
/* harmony import */ var _pure_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pure.js */ "../../../sdk/typescript/src/transactions/pure.ts");
/* harmony import */ var _TransactionData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransactionData.js */ "../../../sdk/typescript/src/transactions/TransactionData.ts");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils.js */ "../../../sdk/typescript/src/transactions/utils.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Transaction_instances, _Transaction_serializationPlugins, _Transaction_buildPlugins, _Transaction_intentResolvers, _Transaction_data, _Transaction_normalizeTransactionArgument, _Transaction_resolveArgument, _Transaction_prepareBuild, _Transaction_runPlugins;













function createTransactionResult(index, length = Infinity) {
    const baseResult = { $kind: 'Result', Result: index };
    const nestedResults = [];
    const nestedResultFor = (resultIndex) => (nestedResults[resultIndex] ?? (nestedResults[resultIndex] = {
        $kind: 'NestedResult',
        NestedResult: [index, resultIndex],
    }));
    return new Proxy(baseResult, {
        set() {
            throw new Error('The transaction result is a proxy, and does not support setting properties directly');
        },
        // TODO: Instead of making this return a concrete argument, we should ideally
        // make it reference-based (so that this gets resolved at build-time), which
        // allows re-ordering transactions.
        get(target, property) {
            // This allows this transaction argument to be used in the singular form:
            if (property in target) {
                return Reflect.get(target, property);
            }
            // Support destructuring:
            if (property === Symbol.iterator) {
                return function* () {
                    let i = 0;
                    while (i < length) {
                        yield nestedResultFor(i);
                        i++;
                    }
                };
            }
            if (typeof property === 'symbol')
                return;
            const resultIndex = parseInt(property, 10);
            if (Number.isNaN(resultIndex) || resultIndex < 0)
                return;
            return nestedResultFor(resultIndex);
        },
    });
}
const TRANSACTION_BRAND = Symbol.for('@mysten/transaction');
function isTransaction(obj) {
    return !!obj && typeof obj === 'object' && obj[TRANSACTION_BRAND] === true;
}
const modulePluginRegistry = {
    buildPlugins: new Map(),
    serializationPlugins: new Map(),
};
const TRANSACTION_REGISTRY_KEY = Symbol.for('@mysten/transaction/registry');
function getGlobalPluginRegistry() {
    try {
        const target = globalThis;
        if (!target[TRANSACTION_REGISTRY_KEY]) {
            target[TRANSACTION_REGISTRY_KEY] = modulePluginRegistry;
        }
        return target[TRANSACTION_REGISTRY_KEY];
    }
    catch (e) {
        return modulePluginRegistry;
    }
}
/**
 * Transaction Builder
 */
class Transaction {
    /**
     * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
     * Supports either a byte array, or base64-encoded bytes.
     */
    static fromKind(serialized) {
        const tx = new Transaction();
        __classPrivateFieldSet(tx, _Transaction_data, _TransactionData_js__WEBPACK_IMPORTED_MODULE_0__.TransactionDataBuilder.fromKindBytes(typeof serialized === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_1__.fromBase64)(serialized) : serialized), "f");
        return tx;
    }
    /**
     * Converts from a serialized transaction format to a `Transaction` class.
     * There are two supported serialized formats:
     * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
     * - A byte array (or base64-encoded bytes) containing BCS transaction data.
     */
    static from(transaction) {
        const newTransaction = new Transaction();
        if (isTransaction(transaction)) {
            __classPrivateFieldSet(newTransaction, _Transaction_data, new _TransactionData_js__WEBPACK_IMPORTED_MODULE_0__.TransactionDataBuilder(transaction.getData()), "f");
        }
        else if (typeof transaction !== 'string' || !transaction.startsWith('{')) {
            __classPrivateFieldSet(newTransaction, _Transaction_data, _TransactionData_js__WEBPACK_IMPORTED_MODULE_0__.TransactionDataBuilder.fromBytes(typeof transaction === 'string' ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_1__.fromBase64)(transaction) : transaction), "f");
        }
        else {
            __classPrivateFieldSet(newTransaction, _Transaction_data, _TransactionData_js__WEBPACK_IMPORTED_MODULE_0__.TransactionDataBuilder.restore(JSON.parse(transaction)), "f");
        }
        return newTransaction;
    }
    static registerGlobalSerializationPlugin(stepOrStep, step) {
        getGlobalPluginRegistry().serializationPlugins.set(stepOrStep, step ?? stepOrStep);
    }
    static unregisterGlobalSerializationPlugin(name) {
        getGlobalPluginRegistry().serializationPlugins.delete(name);
    }
    static registerGlobalBuildPlugin(stepOrStep, step) {
        getGlobalPluginRegistry().buildPlugins.set(stepOrStep, step ?? stepOrStep);
    }
    static unregisterGlobalBuildPlugin(name) {
        getGlobalPluginRegistry().buildPlugins.delete(name);
    }
    addSerializationPlugin(step) {
        __classPrivateFieldGet(this, _Transaction_serializationPlugins, "f").push(step);
    }
    addBuildPlugin(step) {
        __classPrivateFieldGet(this, _Transaction_buildPlugins, "f").push(step);
    }
    addIntentResolver(intent, resolver) {
        if (__classPrivateFieldGet(this, _Transaction_intentResolvers, "f").has(intent) && __classPrivateFieldGet(this, _Transaction_intentResolvers, "f").get(intent) !== resolver) {
            throw new Error(`Intent resolver for ${intent} already exists`);
        }
        __classPrivateFieldGet(this, _Transaction_intentResolvers, "f").set(intent, resolver);
    }
    setSender(sender) {
        __classPrivateFieldGet(this, _Transaction_data, "f").sender = sender;
    }
    /**
     * Sets the sender only if it has not already been set.
     * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
     */
    setSenderIfNotSet(sender) {
        if (!__classPrivateFieldGet(this, _Transaction_data, "f").sender) {
            __classPrivateFieldGet(this, _Transaction_data, "f").sender = sender;
        }
    }
    setExpiration(expiration) {
        __classPrivateFieldGet(this, _Transaction_data, "f").expiration = expiration ? (0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.TransactionExpiration, expiration) : null;
    }
    setGasPrice(price) {
        __classPrivateFieldGet(this, _Transaction_data, "f").gasConfig.price = String(price);
    }
    setGasBudget(budget) {
        __classPrivateFieldGet(this, _Transaction_data, "f").gasConfig.budget = String(budget);
    }
    setGasBudgetIfNotSet(budget) {
        if (__classPrivateFieldGet(this, _Transaction_data, "f").gasData.budget == null) {
            __classPrivateFieldGet(this, _Transaction_data, "f").gasConfig.budget = String(budget);
        }
    }
    setGasOwner(owner) {
        __classPrivateFieldGet(this, _Transaction_data, "f").gasConfig.owner = owner;
    }
    setGasPayment(payments) {
        __classPrivateFieldGet(this, _Transaction_data, "f").gasConfig.payment = payments.map((payment) => (0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.ObjectRef, payment));
    }
    /** @deprecated Use `getData()` instead. */
    get blockData() {
        return (0,_data_v1_js__WEBPACK_IMPORTED_MODULE_4__.serializeV1TransactionData)(__classPrivateFieldGet(this, _Transaction_data, "f").snapshot());
    }
    /** Get a snapshot of the transaction data, in JSON form: */
    getData() {
        return __classPrivateFieldGet(this, _Transaction_data, "f").snapshot();
    }
    // Used to brand transaction classes so that they can be identified, even between multiple copies
    // of the builder.
    get [(_Transaction_serializationPlugins = new WeakMap(), _Transaction_buildPlugins = new WeakMap(), _Transaction_intentResolvers = new WeakMap(), _Transaction_data = new WeakMap(), _Transaction_instances = new WeakSet(), TRANSACTION_BRAND)]() {
        return true;
    }
    // Temporary workaround for the wallet interface accidentally serializing transactions via postMessage
    get pure() {
        Object.defineProperty(this, 'pure', {
            enumerable: false,
            value: (0,_pure_js__WEBPACK_IMPORTED_MODULE_5__.createPure)((value) => {
                if ((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_6__.isSerializedBcs)(value)) {
                    return __classPrivateFieldGet(this, _Transaction_data, "f").addInput('pure', {
                        $kind: 'Pure',
                        Pure: {
                            bytes: value.toBase64(),
                        },
                    });
                }
                // TODO: we can also do some deduplication here
                return __classPrivateFieldGet(this, _Transaction_data, "f").addInput('pure', (0,valibot__WEBPACK_IMPORTED_MODULE_2__.is)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.NormalizedCallArg, value)
                    ? (0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.NormalizedCallArg, value)
                    : value instanceof Uint8Array
                        ? _Inputs_js__WEBPACK_IMPORTED_MODULE_7__.Inputs.Pure(value)
                        : { $kind: 'UnresolvedPure', UnresolvedPure: { value } });
            }),
        });
        return this.pure;
    }
    constructor() {
        _Transaction_instances.add(this);
        _Transaction_serializationPlugins.set(this, void 0);
        _Transaction_buildPlugins.set(this, void 0);
        _Transaction_intentResolvers.set(this, new Map());
        _Transaction_data.set(this, void 0);
        /**
         * Add a new object input to the transaction.
         */
        this.object = (0,_object_js__WEBPACK_IMPORTED_MODULE_8__.createObjectMethods)((value) => {
            if (typeof value === 'function') {
                return this.object(value(this));
            }
            if (typeof value === 'object' && (0,valibot__WEBPACK_IMPORTED_MODULE_2__.is)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.Argument, value)) {
                return value;
            }
            const id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.getIdFromCallArg)(value);
            const inserted = __classPrivateFieldGet(this, _Transaction_data, "f").inputs.find((i) => id === (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.getIdFromCallArg)(i));
            // Upgrade shared object inputs to mutable if needed:
            if (inserted?.Object?.SharedObject &&
                typeof value === 'object' &&
                value.Object?.SharedObject) {
                inserted.Object.SharedObject.mutable =
                    inserted.Object.SharedObject.mutable || value.Object.SharedObject.mutable;
            }
            return inserted
                ? { $kind: 'Input', Input: __classPrivateFieldGet(this, _Transaction_data, "f").inputs.indexOf(inserted), type: 'object' }
                : __classPrivateFieldGet(this, _Transaction_data, "f").addInput('object', typeof value === 'string'
                    ? {
                        $kind: 'UnresolvedObject',
                        UnresolvedObject: { objectId: (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_10__.normalizeSuiAddress)(value) },
                    }
                    : value);
        });
        const globalPlugins = getGlobalPluginRegistry();
        __classPrivateFieldSet(this, _Transaction_data, new _TransactionData_js__WEBPACK_IMPORTED_MODULE_0__.TransactionDataBuilder(), "f");
        __classPrivateFieldSet(this, _Transaction_buildPlugins, [...globalPlugins.buildPlugins.values()], "f");
        __classPrivateFieldSet(this, _Transaction_serializationPlugins, [...globalPlugins.serializationPlugins.values()], "f");
    }
    /** Returns an argument for the gas coin, to be used in a transaction. */
    get gas() {
        return { $kind: 'GasCoin', GasCoin: true };
    }
    /**
     * Add a new object input to the transaction using the fully-resolved object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    objectRef(...args) {
        return this.object(_Inputs_js__WEBPACK_IMPORTED_MODULE_7__.Inputs.ObjectRef(...args));
    }
    /**
     * Add a new receiving input to the transaction using the fully-resolved object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    receivingRef(...args) {
        return this.object(_Inputs_js__WEBPACK_IMPORTED_MODULE_7__.Inputs.ReceivingRef(...args));
    }
    /**
     * Add a new shared object input to the transaction using the fully-resolved shared object reference.
     * If you only have an object ID, use `builder.object(id)` instead.
     */
    sharedObjectRef(...args) {
        return this.object(_Inputs_js__WEBPACK_IMPORTED_MODULE_7__.Inputs.SharedObjectRef(...args));
    }
    /** Add a transaction to the transaction */
    add(command) {
        if (typeof command === 'function') {
            return command(this);
        }
        const index = __classPrivateFieldGet(this, _Transaction_data, "f").commands.push(command);
        return createTransactionResult(index - 1);
    }
    // Method shorthands:
    splitCoins(coin, amounts) {
        const command = _Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.SplitCoins(typeof coin === 'string' ? this.object(coin) : __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_resolveArgument).call(this, coin), amounts.map((amount) => typeof amount === 'number' || typeof amount === 'bigint' || typeof amount === 'string'
            ? this.pure.u64(amount)
            : __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_normalizeTransactionArgument).call(this, amount)));
        const index = __classPrivateFieldGet(this, _Transaction_data, "f").commands.push(command);
        return createTransactionResult(index - 1, amounts.length);
    }
    mergeCoins(destination, sources) {
        return this.add(_Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.MergeCoins(this.object(destination), sources.map((src) => this.object(src))));
    }
    publish({ modules, dependencies }) {
        return this.add(_Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.Publish({
            modules,
            dependencies,
        }));
    }
    upgrade({ modules, dependencies, package: packageId, ticket, }) {
        return this.add(_Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.Upgrade({
            modules,
            dependencies,
            package: packageId,
            ticket: this.object(ticket),
        }));
    }
    moveCall({ arguments: args, ...input }) {
        return this.add(_Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.MoveCall({
            ...input,
            arguments: args?.map((arg) => __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_normalizeTransactionArgument).call(this, arg)),
        }));
    }
    transferObjects(objects, address) {
        return this.add(_Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.TransferObjects(objects.map((obj) => this.object(obj)), typeof address === 'string'
            ? this.pure.address(address)
            : __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_normalizeTransactionArgument).call(this, address)));
    }
    makeMoveVec({ type, elements, }) {
        return this.add(_Commands_js__WEBPACK_IMPORTED_MODULE_11__.Commands.MakeMoveVec({
            type,
            elements: elements.map((obj) => this.object(obj)),
        }));
    }
    /**
     * @deprecated Use toJSON instead.
     * For synchronous serialization, you can use `getData()`
     * */
    serialize() {
        return JSON.stringify((0,_data_v1_js__WEBPACK_IMPORTED_MODULE_4__.serializeV1TransactionData)(__classPrivateFieldGet(this, _Transaction_data, "f").snapshot()));
    }
    async toJSON(options = {}) {
        await this.prepareForSerialization(options);
        return JSON.stringify((0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_v2_js__WEBPACK_IMPORTED_MODULE_12__.SerializedTransactionDataV2, __classPrivateFieldGet(this, _Transaction_data, "f").snapshot()), (_key, value) => (typeof value === 'bigint' ? value.toString() : value), 2);
    }
    /** Build the transaction to BCS bytes, and sign it with the provided keypair. */
    async sign(options) {
        const { signer, ...buildOptions } = options;
        const bytes = await this.build(buildOptions);
        return signer.signTransaction(bytes);
    }
    /** Build the transaction to BCS bytes. */
    async build(options = {}) {
        await this.prepareForSerialization(options);
        await __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_prepareBuild).call(this, options);
        return __classPrivateFieldGet(this, _Transaction_data, "f").build({
            onlyTransactionKind: options.onlyTransactionKind,
        });
    }
    /** Derive transaction digest */
    async getDigest(options = {}) {
        await __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_prepareBuild).call(this, options);
        return __classPrivateFieldGet(this, _Transaction_data, "f").getDigest();
    }
    async prepareForSerialization(options) {
        const intents = new Set();
        for (const command of __classPrivateFieldGet(this, _Transaction_data, "f").commands) {
            if (command.$Intent) {
                intents.add(command.$Intent.name);
            }
        }
        const steps = [...__classPrivateFieldGet(this, _Transaction_serializationPlugins, "f")];
        for (const intent of intents) {
            if (options.supportedIntents?.includes(intent)) {
                continue;
            }
            if (!__classPrivateFieldGet(this, _Transaction_intentResolvers, "f").has(intent)) {
                throw new Error(`Missing intent resolver for ${intent}`);
            }
            steps.push(__classPrivateFieldGet(this, _Transaction_intentResolvers, "f").get(intent));
        }
        await __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_runPlugins).call(this, steps, options);
    }
}
_Transaction_normalizeTransactionArgument = function _Transaction_normalizeTransactionArgument(arg) {
    if ((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_6__.isSerializedBcs)(arg)) {
        return this.pure(arg);
    }
    return __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_resolveArgument).call(this, arg);
}, _Transaction_resolveArgument = function _Transaction_resolveArgument(arg) {
    if (typeof arg === 'function') {
        return (0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.Argument, arg(this));
    }
    return (0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.Argument, arg);
}, _Transaction_prepareBuild = 
/**
 * Prepare the transaction by validating the transaction data and resolving all inputs
 * so that it can be built into bytes.
 */
async function _Transaction_prepareBuild(options) {
    if (!options.onlyTransactionKind && !__classPrivateFieldGet(this, _Transaction_data, "f").sender) {
        throw new Error('Missing transaction sender');
    }
    await __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_runPlugins).call(this, [...__classPrivateFieldGet(this, _Transaction_buildPlugins, "f"), _json_rpc_resolver_js__WEBPACK_IMPORTED_MODULE_13__.resolveTransactionData], options);
}, _Transaction_runPlugins = async function _Transaction_runPlugins(plugins, options) {
    const createNext = (i) => {
        if (i >= plugins.length) {
            return () => { };
        }
        const plugin = plugins[i];
        return async () => {
            const next = createNext(i + 1);
            let calledNext = false;
            let nextResolved = false;
            await plugin(__classPrivateFieldGet(this, _Transaction_data, "f"), options, async () => {
                if (calledNext) {
                    throw new Error(`next() was call multiple times in TransactionPlugin ${i}`);
                }
                calledNext = true;
                await next();
                nextResolved = true;
            });
            if (!calledNext) {
                throw new Error(`next() was not called in TransactionPlugin ${i}`);
            }
            if (!nextResolved) {
                throw new Error(`next() was not awaited in TransactionPlugin ${i}`);
            }
        };
    };
    await createNext(0)();
};


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/TransactionData.ts":
/*!*******************************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/TransactionData.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionDataBuilder: () => (/* binding */ TransactionDataBuilder)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b58.ts");
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../bcs/index.js */ "../../../sdk/typescript/src/bcs/index.ts");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
/* harmony import */ var _data_internal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/internal.js */ "../../../sdk/typescript/src/transactions/data/internal.ts");
/* harmony import */ var _data_v1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/v1.js */ "../../../sdk/typescript/src/transactions/data/v1.ts");
/* harmony import */ var _hash_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hash.js */ "../../../sdk/typescript/src/transactions/hash.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0







function prepareSuiAddress(address) {
    return (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(address).replace('0x', '');
}
class TransactionDataBuilder {
    static fromKindBytes(bytes) {
        const kind = _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.TransactionKind.parse(bytes);
        const programmableTx = kind.ProgrammableTransaction;
        if (!programmableTx) {
            throw new Error('Unable to deserialize from bytes.');
        }
        return TransactionDataBuilder.restore({
            version: 2,
            sender: null,
            expiration: null,
            gasData: {
                budget: null,
                owner: null,
                payment: null,
                price: null,
            },
            inputs: programmableTx.inputs,
            commands: programmableTx.commands,
        });
    }
    static fromBytes(bytes) {
        const rawData = _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.TransactionData.parse(bytes);
        const data = rawData?.V1;
        const programmableTx = data.kind.ProgrammableTransaction;
        if (!data || !programmableTx) {
            throw new Error('Unable to deserialize from bytes.');
        }
        return TransactionDataBuilder.restore({
            version: 2,
            sender: data.sender,
            expiration: data.expiration,
            gasData: data.gasData,
            inputs: programmableTx.inputs,
            commands: programmableTx.commands,
        });
    }
    static restore(data) {
        if (data.version === 2) {
            return new TransactionDataBuilder((0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.TransactionData, data));
        }
        else {
            return new TransactionDataBuilder((0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.TransactionData, (0,_data_v1_js__WEBPACK_IMPORTED_MODULE_4__.transactionDataFromV1)(data)));
        }
    }
    /**
     * Generate transaction digest.
     *
     * @param bytes BCS serialized transaction data
     * @returns transaction digest.
     */
    static getDigestFromBytes(bytes) {
        const hash = (0,_hash_js__WEBPACK_IMPORTED_MODULE_5__.hashTypedData)('TransactionData', bytes);
        return (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_6__.toBase58)(hash);
    }
    // @deprecated use gasData instead
    get gasConfig() {
        return this.gasData;
    }
    // @deprecated use gasData instead
    set gasConfig(value) {
        this.gasData = value;
    }
    constructor(clone) {
        this.version = 2;
        this.sender = clone?.sender ?? null;
        this.expiration = clone?.expiration ?? null;
        this.inputs = clone?.inputs ?? [];
        this.commands = clone?.commands ?? [];
        this.gasData = clone?.gasData ?? {
            budget: null,
            price: null,
            owner: null,
            payment: null,
        };
    }
    build({ maxSizeBytes = Infinity, overrides, onlyTransactionKind, } = {}) {
        // TODO validate that inputs and intents are actually resolved
        const inputs = this.inputs;
        const commands = this.commands;
        const kind = {
            ProgrammableTransaction: {
                inputs,
                commands,
            },
        };
        if (onlyTransactionKind) {
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.TransactionKind.serialize(kind, { maxSize: maxSizeBytes }).toBytes();
        }
        const expiration = overrides?.expiration ?? this.expiration;
        const sender = overrides?.sender ?? this.sender;
        const gasData = { ...this.gasData, ...overrides?.gasConfig, ...overrides?.gasData };
        if (!sender) {
            throw new Error('Missing transaction sender');
        }
        if (!gasData.budget) {
            throw new Error('Missing gas budget');
        }
        if (!gasData.payment) {
            throw new Error('Missing gas payment');
        }
        if (!gasData.price) {
            throw new Error('Missing gas price');
        }
        const transactionData = {
            sender: prepareSuiAddress(sender),
            expiration: expiration ? expiration : { None: true },
            gasData: {
                payment: gasData.payment,
                owner: prepareSuiAddress(this.gasData.owner ?? sender),
                price: BigInt(gasData.price),
                budget: BigInt(gasData.budget),
            },
            kind: {
                ProgrammableTransaction: {
                    inputs,
                    commands,
                },
            },
        };
        return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.TransactionData.serialize({ V1: transactionData }, { maxSize: maxSizeBytes }).toBytes();
    }
    addInput(type, arg) {
        const index = this.inputs.length;
        this.inputs.push(arg);
        return { Input: index, type, $kind: 'Input' };
    }
    getInputUses(index, fn) {
        this.mapArguments((arg, command) => {
            if (arg.$kind === 'Input' && arg.Input === index) {
                fn(arg, command);
            }
            return arg;
        });
    }
    mapArguments(fn) {
        for (const command of this.commands) {
            switch (command.$kind) {
                case 'MoveCall':
                    command.MoveCall.arguments = command.MoveCall.arguments.map((arg) => fn(arg, command));
                    break;
                case 'TransferObjects':
                    command.TransferObjects.objects = command.TransferObjects.objects.map((arg) => fn(arg, command));
                    command.TransferObjects.address = fn(command.TransferObjects.address, command);
                    break;
                case 'SplitCoins':
                    command.SplitCoins.coin = fn(command.SplitCoins.coin, command);
                    command.SplitCoins.amounts = command.SplitCoins.amounts.map((arg) => fn(arg, command));
                    break;
                case 'MergeCoins':
                    command.MergeCoins.destination = fn(command.MergeCoins.destination, command);
                    command.MergeCoins.sources = command.MergeCoins.sources.map((arg) => fn(arg, command));
                    break;
                case 'MakeMoveVec':
                    command.MakeMoveVec.elements = command.MakeMoveVec.elements.map((arg) => fn(arg, command));
                    break;
                case 'Upgrade':
                    command.Upgrade.ticket = fn(command.Upgrade.ticket, command);
                    break;
                case '$Intent':
                    const inputs = command.$Intent.inputs;
                    command.$Intent.inputs = {};
                    for (const [key, value] of Object.entries(inputs)) {
                        command.$Intent.inputs[key] = Array.isArray(value)
                            ? value.map((arg) => fn(arg, command))
                            : fn(value, command);
                    }
                    break;
                case 'Publish':
                    break;
                default:
                    throw new Error(`Unexpected transaction kind: ${command.$kind}`);
            }
        }
    }
    replaceCommand(index, replacement) {
        if (!Array.isArray(replacement)) {
            this.commands[index] = replacement;
            return;
        }
        const sizeDiff = replacement.length - 1;
        this.commands.splice(index, 1, ...replacement);
        if (sizeDiff !== 0) {
            this.mapArguments((arg) => {
                switch (arg.$kind) {
                    case 'Result':
                        if (arg.Result > index) {
                            arg.Result += sizeDiff;
                        }
                        break;
                    case 'NestedResult':
                        if (arg.NestedResult[0] > index) {
                            arg.NestedResult[0] += sizeDiff;
                        }
                        break;
                }
                return arg;
            });
        }
    }
    getDigest() {
        const bytes = this.build({ onlyTransactionKind: false });
        return TransactionDataBuilder.getDigestFromBytes(bytes);
    }
    snapshot() {
        return (0,valibot__WEBPACK_IMPORTED_MODULE_2__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_3__.TransactionData, this);
    }
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/data/internal.ts":
/*!*****************************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/data/internal.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Intent: () => (/* binding */ $Intent),
/* harmony export */   Argument: () => (/* binding */ Argument),
/* harmony export */   BCSBytes: () => (/* binding */ BCSBytes),
/* harmony export */   Command: () => (/* binding */ Command),
/* harmony export */   GasData: () => (/* binding */ GasData),
/* harmony export */   JsonU64: () => (/* binding */ JsonU64),
/* harmony export */   NormalizedCallArg: () => (/* binding */ NormalizedCallArg),
/* harmony export */   ObjectArg: () => (/* binding */ ObjectArg),
/* harmony export */   ObjectID: () => (/* binding */ ObjectID),
/* harmony export */   ObjectRef: () => (/* binding */ ObjectRef),
/* harmony export */   OpenMoveTypeSignature: () => (/* binding */ OpenMoveTypeSignature),
/* harmony export */   OpenMoveTypeSignatureBody: () => (/* binding */ OpenMoveTypeSignatureBody),
/* harmony export */   StructTag: () => (/* binding */ StructTag),
/* harmony export */   SuiAddress: () => (/* binding */ SuiAddress),
/* harmony export */   TransactionData: () => (/* binding */ TransactionData),
/* harmony export */   TransactionExpiration: () => (/* binding */ TransactionExpiration),
/* harmony export */   safeEnum: () => (/* binding */ safeEnum)
/* harmony export */ });
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


function safeEnum(options) {
    const unionOptions = Object.entries(options).map(([key, value]) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ [key]: value }));
    return (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)(unionOptions), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.transform)((value) => ({
        ...value,
        $kind: Object.keys(value)[0],
    })));
}
const SuiAddress = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.transform)((value) => (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.normalizeSuiAddress)(value)), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.check)(_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_1__.isValidSuiAddress));
const ObjectID = SuiAddress;
const BCSBytes = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)();
const JsonU64 = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)())]), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.check)((val) => {
    try {
        BigInt(val);
        return BigInt(val) >= 0 && BigInt(val) <= 18446744073709551615n;
    }
    catch {
        return false;
    }
}, 'Invalid u64'));
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/base_types.rs#L138
// Implemented as a tuple in rust
const ObjectRef = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    objectId: SuiAddress,
    version: JsonU64,
    digest: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L690-L702
const Argument = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ GasCoin: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ Input: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()), type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('pure')) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ Input: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()), type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('object')) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ Result: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ NestedResult: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.tuple)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)())]) }),
]), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.transform)((value) => ({
    ...value,
    $kind: Object.keys(value)[0],
})));
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L1387-L1392
const GasData = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    budget: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(JsonU64),
    price: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(JsonU64),
    owner: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(SuiAddress),
    payment: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(ObjectRef)),
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/external-crates/move/crates/move-core-types/src/language_storage.rs#L140-L147
const StructTag = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    address: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    module: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    name: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    // type_params in rust, should be updated to use camelCase
    typeParams: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
});
const OpenMoveTypeSignatureBody = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('address'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('bool'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('u8'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('u16'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('u32'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('u64'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('u128'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('u256'),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ vector: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => OpenMoveTypeSignatureBody) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        datatype: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
            package: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
            module: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
            type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
            typeParameters: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => OpenMoveTypeSignatureBody)),
        }),
    }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ typeParameter: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()) }),
]);
// https://github.com/MystenLabs/sui/blob/cea8742e810142a8145fd83c4c142d61e561004a/crates/sui-graphql-rpc/schema/current_progress_schema.graphql#L1609-L1612
const OpenMoveTypeSignature = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    ref: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('&'), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('&mut')])),
    body: OpenMoveTypeSignatureBody,
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L707-L718
const ProgrammableMoveCall = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    package: ObjectID,
    module: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    function: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    // snake case in rust
    typeArguments: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
    arguments: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    _argumentTypes: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(OpenMoveTypeSignature))),
});
const $Intent = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    name: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    inputs: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.record)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([Argument, (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument)])),
    data: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.record)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.unknown)()),
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L657-L685
const Command = safeEnum({
    MoveCall: ProgrammableMoveCall,
    TransferObjects: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objects: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
        address: Argument,
    }),
    SplitCoins: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        coin: Argument,
        amounts: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    }),
    MergeCoins: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        destination: Argument,
        sources: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    }),
    Publish: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        modules: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(BCSBytes),
        dependencies: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(ObjectID),
    }),
    MakeMoveVec: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
        elements: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    }),
    Upgrade: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        modules: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(BCSBytes),
        dependencies: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(ObjectID),
        package: ObjectID,
        ticket: Argument,
    }),
    $Intent,
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L102-L114
const ObjectArg = safeEnum({
    ImmOrOwnedObject: ObjectRef,
    SharedObject: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objectId: ObjectID,
        // snake case in rust
        initialSharedVersion: JsonU64,
        mutable: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.boolean)(),
    }),
    Receiving: ObjectRef,
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L75-L80
const CallArg = safeEnum({
    Object: ObjectArg,
    Pure: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        bytes: BCSBytes,
    }),
    UnresolvedPure: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        value: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.unknown)(),
    }),
    UnresolvedObject: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objectId: ObjectID,
        version: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(JsonU64)),
        digest: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)())),
        initialSharedVersion: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(JsonU64)),
    }),
});
const NormalizedCallArg = safeEnum({
    Object: ObjectArg,
    Pure: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        bytes: BCSBytes,
    }),
});
const TransactionExpiration = safeEnum({
    None: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true),
    Epoch: JsonU64,
});
const TransactionData = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    version: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(2),
    sender: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullish)(SuiAddress),
    expiration: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullish)(TransactionExpiration),
    gasData: GasData,
    inputs: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(CallArg),
    commands: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Command),
});


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/data/v1.ts":
/*!***********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/data/v1.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NormalizedCallArg: () => (/* binding */ NormalizedCallArg),
/* harmony export */   ObjectRef: () => (/* binding */ ObjectRef),
/* harmony export */   SerializedTransactionDataV1: () => (/* binding */ SerializedTransactionDataV1),
/* harmony export */   StructTag: () => (/* binding */ StructTag),
/* harmony export */   TransactionArgument: () => (/* binding */ TransactionArgument),
/* harmony export */   TypeTag: () => (/* binding */ TypeTag),
/* harmony export */   serializeV1TransactionData: () => (/* binding */ serializeV1TransactionData),
/* harmony export */   transactionDataFromV1: () => (/* binding */ transactionDataFromV1)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b64.ts");
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _bcs_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../bcs/index.js */ "../../../sdk/typescript/src/bcs/type-tag-serializer.ts");
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal.js */ "../../../sdk/typescript/src/transactions/data/internal.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0




const ObjectRef = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    digest: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    objectId: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    version: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.bigint)()]),
});
const ObjectArg = (0,_internal_js__WEBPACK_IMPORTED_MODULE_1__.safeEnum)({
    ImmOrOwned: ObjectRef,
    Shared: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objectId: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID,
        initialSharedVersion: _internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64,
        mutable: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.boolean)(),
    }),
    Receiving: ObjectRef,
});
const NormalizedCallArg = (0,_internal_js__WEBPACK_IMPORTED_MODULE_1__.safeEnum)({
    Object: ObjectArg,
    Pure: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)())),
});
const TransactionInput = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('Input'),
        index: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()),
        value: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.unknown)(),
        type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('object')),
    }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('Input'),
        index: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()),
        value: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.unknown)(),
        type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('pure'),
    }),
]);
const TransactionExpiration = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ Epoch: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ None: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
]);
const StringEncodedBigint = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.bigint)()]), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.check)((val) => {
    if (!['string', 'number', 'bigint'].includes(typeof val))
        return false;
    try {
        BigInt(val);
        return true;
    }
    catch {
        return false;
    }
}));
const TypeTag = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ bool: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ u8: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ u64: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ u128: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ address: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ signer: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ vector: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => TypeTag) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ struct: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => StructTag) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ u16: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ u32: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ u256: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) }),
]);
// https://github.com/MystenLabs/sui/blob/cea8742e810142a8145fd83c4c142d61e561004a/external-crates/move/crates/move-core-types/src/language_storage.rs#L140-L147
const StructTag = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    address: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    module: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    name: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    typeParams: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TypeTag),
});
const GasConfig = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    budget: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)(StringEncodedBigint),
    price: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)(StringEncodedBigint),
    payment: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(ObjectRef)),
    owner: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
});
const TransactionArgumentTypes = [
    TransactionInput,
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('GasCoin') }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('Result'), index: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()) }),
    (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('NestedResult'),
        index: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()),
        resultIndex: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()),
    }),
];
// Generic transaction argument
const TransactionArgument = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([...TransactionArgumentTypes]);
const MoveCallTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('MoveCall'),
    target: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.check)((target) => target.split('::').length === 3)),
    typeArguments: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
    arguments: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionArgument),
});
const TransferObjectsTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('TransferObjects'),
    objects: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionArgument),
    address: TransactionArgument,
});
const SplitCoinsTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('SplitCoins'),
    coin: TransactionArgument,
    amounts: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionArgument),
});
const MergeCoinsTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('MergeCoins'),
    destination: TransactionArgument,
    sources: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionArgument),
});
const MakeMoveVecTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('MakeMoveVec'),
    type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ Some: TypeTag }), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ None: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true)) })]),
    objects: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionArgument),
});
const PublishTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('Publish'),
    modules: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()))),
    dependencies: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
});
const UpgradeTransaction = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    kind: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)('Upgrade'),
    modules: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()))),
    dependencies: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
    packageId: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    ticket: TransactionArgument,
});
const TransactionTypes = [
    MoveCallTransaction,
    TransferObjectsTransaction,
    SplitCoinsTransaction,
    MergeCoinsTransaction,
    PublishTransaction,
    UpgradeTransaction,
    MakeMoveVecTransaction,
];
const TransactionType = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([...TransactionTypes]);
const SerializedTransactionDataV1 = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    version: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(1),
    sender: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
    expiration: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullish)(TransactionExpiration),
    gasConfig: GasConfig,
    inputs: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionInput),
    transactions: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(TransactionType),
});
function serializeV1TransactionData(transactionData) {
    const inputs = transactionData.inputs.map((input, index) => {
        if (input.Object) {
            return {
                kind: 'Input',
                index,
                value: {
                    Object: input.Object.ImmOrOwnedObject
                        ? {
                            ImmOrOwned: input.Object.ImmOrOwnedObject,
                        }
                        : input.Object.Receiving
                            ? {
                                Receiving: {
                                    digest: input.Object.Receiving.digest,
                                    version: input.Object.Receiving.version,
                                    objectId: input.Object.Receiving.objectId,
                                },
                            }
                            : {
                                Shared: {
                                    mutable: input.Object.SharedObject.mutable,
                                    initialSharedVersion: input.Object.SharedObject.initialSharedVersion,
                                    objectId: input.Object.SharedObject.objectId,
                                },
                            },
                },
                type: 'object',
            };
        }
        if (input.Pure) {
            return {
                kind: 'Input',
                index,
                value: {
                    Pure: Array.from((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.fromBase64)(input.Pure.bytes)),
                },
                type: 'pure',
            };
        }
        if (input.UnresolvedPure) {
            return {
                kind: 'Input',
                type: 'pure',
                index,
                value: input.UnresolvedPure.value,
            };
        }
        if (input.UnresolvedObject) {
            return {
                kind: 'Input',
                type: 'object',
                index,
                value: input.UnresolvedObject.objectId,
            };
        }
        throw new Error('Invalid input');
    });
    return {
        version: 1,
        sender: transactionData.sender ?? undefined,
        expiration: transactionData.expiration?.$kind === 'Epoch'
            ? { Epoch: Number(transactionData.expiration.Epoch) }
            : transactionData.expiration
                ? { None: true }
                : null,
        gasConfig: {
            owner: transactionData.gasData.owner ?? undefined,
            budget: transactionData.gasData.budget ?? undefined,
            price: transactionData.gasData.price ?? undefined,
            payment: transactionData.gasData.payment ?? undefined,
        },
        inputs,
        transactions: transactionData.commands.map((command) => {
            if (command.MakeMoveVec) {
                return {
                    kind: 'MakeMoveVec',
                    type: command.MakeMoveVec.type === null
                        ? { None: true }
                        : { Some: _bcs_index_js__WEBPACK_IMPORTED_MODULE_3__.TypeTagSerializer.parseFromStr(command.MakeMoveVec.type) },
                    objects: command.MakeMoveVec.elements.map((arg) => convertTransactionArgument(arg, inputs)),
                };
            }
            if (command.MergeCoins) {
                return {
                    kind: 'MergeCoins',
                    destination: convertTransactionArgument(command.MergeCoins.destination, inputs),
                    sources: command.MergeCoins.sources.map((arg) => convertTransactionArgument(arg, inputs)),
                };
            }
            if (command.MoveCall) {
                return {
                    kind: 'MoveCall',
                    target: `${command.MoveCall.package}::${command.MoveCall.module}::${command.MoveCall.function}`,
                    typeArguments: command.MoveCall.typeArguments,
                    arguments: command.MoveCall.arguments.map((arg) => convertTransactionArgument(arg, inputs)),
                };
            }
            if (command.Publish) {
                return {
                    kind: 'Publish',
                    modules: command.Publish.modules.map((mod) => Array.from((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.fromBase64)(mod))),
                    dependencies: command.Publish.dependencies,
                };
            }
            if (command.SplitCoins) {
                return {
                    kind: 'SplitCoins',
                    coin: convertTransactionArgument(command.SplitCoins.coin, inputs),
                    amounts: command.SplitCoins.amounts.map((arg) => convertTransactionArgument(arg, inputs)),
                };
            }
            if (command.TransferObjects) {
                return {
                    kind: 'TransferObjects',
                    objects: command.TransferObjects.objects.map((arg) => convertTransactionArgument(arg, inputs)),
                    address: convertTransactionArgument(command.TransferObjects.address, inputs),
                };
            }
            if (command.Upgrade) {
                return {
                    kind: 'Upgrade',
                    modules: command.Upgrade.modules.map((mod) => Array.from((0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.fromBase64)(mod))),
                    dependencies: command.Upgrade.dependencies,
                    packageId: command.Upgrade.package,
                    ticket: convertTransactionArgument(command.Upgrade.ticket, inputs),
                };
            }
            throw new Error(`Unknown transaction ${Object.keys(command)}`);
        }),
    };
}
function convertTransactionArgument(arg, inputs) {
    if (arg.$kind === 'GasCoin') {
        return { kind: 'GasCoin' };
    }
    if (arg.$kind === 'Result') {
        return { kind: 'Result', index: arg.Result };
    }
    if (arg.$kind === 'NestedResult') {
        return { kind: 'NestedResult', index: arg.NestedResult[0], resultIndex: arg.NestedResult[1] };
    }
    if (arg.$kind === 'Input') {
        return inputs[arg.Input];
    }
    throw new Error(`Invalid argument ${Object.keys(arg)}`);
}
function transactionDataFromV1(data) {
    return (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.TransactionData, {
        version: 2,
        sender: data.sender ?? null,
        expiration: data.expiration
            ? 'Epoch' in data.expiration
                ? { Epoch: data.expiration.Epoch }
                : { None: true }
            : null,
        gasData: {
            owner: data.gasConfig.owner ?? null,
            budget: data.gasConfig.budget?.toString() ?? null,
            price: data.gasConfig.price?.toString() ?? null,
            payment: data.gasConfig.payment?.map((ref) => ({
                digest: ref.digest,
                objectId: ref.objectId,
                version: ref.version.toString(),
            })) ?? null,
        },
        inputs: data.inputs.map((input) => {
            if (input.kind === 'Input') {
                if ((0,valibot__WEBPACK_IMPORTED_MODULE_0__.is)(NormalizedCallArg, input.value)) {
                    const value = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.parse)(NormalizedCallArg, input.value);
                    if (value.Object) {
                        if (value.Object.ImmOrOwned) {
                            return {
                                Object: {
                                    ImmOrOwnedObject: {
                                        objectId: value.Object.ImmOrOwned.objectId,
                                        version: String(value.Object.ImmOrOwned.version),
                                        digest: value.Object.ImmOrOwned.digest,
                                    },
                                },
                            };
                        }
                        if (value.Object.Shared) {
                            return {
                                Object: {
                                    SharedObject: {
                                        mutable: value.Object.Shared.mutable ?? null,
                                        initialSharedVersion: value.Object.Shared.initialSharedVersion,
                                        objectId: value.Object.Shared.objectId,
                                    },
                                },
                            };
                        }
                        if (value.Object.Receiving) {
                            return {
                                Object: {
                                    Receiving: {
                                        digest: value.Object.Receiving.digest,
                                        version: String(value.Object.Receiving.version),
                                        objectId: value.Object.Receiving.objectId,
                                    },
                                },
                            };
                        }
                        throw new Error('Invalid object input');
                    }
                    return {
                        Pure: {
                            bytes: (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toBase64)(new Uint8Array(value.Pure)),
                        },
                    };
                }
                if (input.type === 'object') {
                    return {
                        UnresolvedObject: {
                            objectId: input.value,
                        },
                    };
                }
                return {
                    UnresolvedPure: {
                        value: input.value,
                    },
                };
            }
            throw new Error('Invalid input');
        }),
        commands: data.transactions.map((transaction) => {
            switch (transaction.kind) {
                case 'MakeMoveVec':
                    return {
                        MakeMoveVec: {
                            type: 'Some' in transaction.type
                                ? _bcs_index_js__WEBPACK_IMPORTED_MODULE_3__.TypeTagSerializer.tagToString(transaction.type.Some)
                                : null,
                            elements: transaction.objects.map((arg) => parseV1TransactionArgument(arg)),
                        },
                    };
                case 'MergeCoins': {
                    return {
                        MergeCoins: {
                            destination: parseV1TransactionArgument(transaction.destination),
                            sources: transaction.sources.map((arg) => parseV1TransactionArgument(arg)),
                        },
                    };
                }
                case 'MoveCall': {
                    const [pkg, mod, fn] = transaction.target.split('::');
                    return {
                        MoveCall: {
                            package: pkg,
                            module: mod,
                            function: fn,
                            typeArguments: transaction.typeArguments,
                            arguments: transaction.arguments.map((arg) => parseV1TransactionArgument(arg)),
                        },
                    };
                }
                case 'Publish': {
                    return {
                        Publish: {
                            modules: transaction.modules.map((mod) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toBase64)(Uint8Array.from(mod))),
                            dependencies: transaction.dependencies,
                        },
                    };
                }
                case 'SplitCoins': {
                    return {
                        SplitCoins: {
                            coin: parseV1TransactionArgument(transaction.coin),
                            amounts: transaction.amounts.map((arg) => parseV1TransactionArgument(arg)),
                        },
                    };
                }
                case 'TransferObjects': {
                    return {
                        TransferObjects: {
                            objects: transaction.objects.map((arg) => parseV1TransactionArgument(arg)),
                            address: parseV1TransactionArgument(transaction.address),
                        },
                    };
                }
                case 'Upgrade': {
                    return {
                        Upgrade: {
                            modules: transaction.modules.map((mod) => (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_2__.toBase64)(Uint8Array.from(mod))),
                            dependencies: transaction.dependencies,
                            package: transaction.packageId,
                            ticket: parseV1TransactionArgument(transaction.ticket),
                        },
                    };
                }
            }
            throw new Error(`Unknown transaction ${Object.keys(transaction)}`);
        }),
    });
}
function parseV1TransactionArgument(arg) {
    switch (arg.kind) {
        case 'GasCoin': {
            return { GasCoin: true };
        }
        case 'Result':
            return { Result: arg.index };
        case 'NestedResult': {
            return { NestedResult: [arg.index, arg.resultIndex] };
        }
        case 'Input': {
            return { Input: arg.index };
        }
    }
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/data/v2.ts":
/*!***********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/data/v2.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SerializedTransactionDataV2: () => (/* binding */ SerializedTransactionDataV2)
/* harmony export */ });
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal.js */ "../../../sdk/typescript/src/transactions/data/internal.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


function enumUnion(options) {
    return (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)(Object.entries(options).map(([key, value]) => (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({ [key]: value })));
}
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L690-L702
const Argument = enumUnion({
    GasCoin: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true),
    Input: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()),
    Result: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()),
    NestedResult: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.tuple)([(0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)()), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.number)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.integer)())]),
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L1387-L1392
const GasData = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    budget: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64),
    price: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64),
    owner: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.SuiAddress),
    payment: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectRef)),
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L707-L718
const ProgrammableMoveCall = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    package: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID,
    module: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    function: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    // snake case in rust
    typeArguments: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
    arguments: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
});
const $Intent = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    name: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(),
    inputs: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.record)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.union)([Argument, (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument)])),
    data: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.record)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)(), (0,valibot__WEBPACK_IMPORTED_MODULE_0__.unknown)()),
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L657-L685
const Command = enumUnion({
    MoveCall: ProgrammableMoveCall,
    TransferObjects: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objects: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
        address: Argument,
    }),
    SplitCoins: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        coin: Argument,
        amounts: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    }),
    MergeCoins: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        destination: Argument,
        sources: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    }),
    Publish: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        modules: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.BCSBytes),
        dependencies: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID),
    }),
    MakeMoveVec: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        type: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)()),
        elements: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Argument),
    }),
    Upgrade: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        modules: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.BCSBytes),
        dependencies: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID),
        package: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID,
        ticket: Argument,
    }),
    $Intent,
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L102-L114
const ObjectArg = enumUnion({
    ImmOrOwnedObject: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectRef,
    SharedObject: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objectId: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID,
        // snake case in rust
        initialSharedVersion: _internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64,
        mutable: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.boolean)(),
    }),
    Receiving: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectRef,
});
// https://github.com/MystenLabs/sui/blob/df41d5fa8127634ff4285671a01ead00e519f806/crates/sui-types/src/transaction.rs#L75-L80
const CallArg = enumUnion({
    Object: ObjectArg,
    Pure: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        bytes: _internal_js__WEBPACK_IMPORTED_MODULE_1__.BCSBytes,
    }),
    UnresolvedPure: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        value: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.unknown)(),
    }),
    UnresolvedObject: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
        objectId: _internal_js__WEBPACK_IMPORTED_MODULE_1__.ObjectID,
        version: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64)),
        digest: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.string)())),
        initialSharedVersion: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.optional)((0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullable)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64)),
    }),
});
const TransactionExpiration = enumUnion({
    None: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(true),
    Epoch: _internal_js__WEBPACK_IMPORTED_MODULE_1__.JsonU64,
});
const SerializedTransactionDataV2 = (0,valibot__WEBPACK_IMPORTED_MODULE_0__.object)({
    version: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.literal)(2),
    sender: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullish)(_internal_js__WEBPACK_IMPORTED_MODULE_1__.SuiAddress),
    expiration: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.nullish)(TransactionExpiration),
    gasData: GasData,
    inputs: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(CallArg),
    commands: (0,valibot__WEBPACK_IMPORTED_MODULE_0__.array)(Command),
});


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/hash.ts":
/*!********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/hash.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hashTypedData: () => (/* binding */ hashTypedData)
/* harmony export */ });
/* harmony import */ var _noble_hashes_blake2b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/hashes/blake2b */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/blake2b.js");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/**
 * Generates a Blake2b hash of typed data as a base64 string.
 *
 * @param typeTag type tag (e.g. TransactionData, SenderSignedData)
 * @param data data to hash
 */
function hashTypedData(typeTag, data) {
    const typeTagBytes = Array.from(`${typeTag}::`).map((e) => e.charCodeAt(0));
    const dataWithTag = new Uint8Array(typeTagBytes.length + data.length);
    dataWithTag.set(typeTagBytes);
    dataWithTag.set(data, typeTagBytes.length);
    return (0,_noble_hashes_blake2b__WEBPACK_IMPORTED_MODULE_0__.blake2b)(dataWithTag, { dkLen: 32 });
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/json-rpc-resolver.ts":
/*!*********************************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/json-rpc-resolver.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClient: () => (/* binding */ getClient),
/* harmony export */   resolveTransactionData: () => (/* binding */ resolveTransactionData)
/* harmony export */ });
/* harmony import */ var valibot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! valibot */ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js");
/* harmony import */ var _bcs_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../bcs/index.js */ "../../../sdk/typescript/src/bcs/index.ts");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index.js */ "../../../sdk/typescript/src/utils/constants.ts");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
/* harmony import */ var _data_internal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/internal.js */ "../../../sdk/typescript/src/transactions/data/internal.ts");
/* harmony import */ var _Inputs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Inputs.js */ "../../../sdk/typescript/src/transactions/Inputs.ts");
/* harmony import */ var _serializer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./serializer.js */ "../../../sdk/typescript/src/transactions/serializer.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0






// The maximum objects that can be fetched at once using multiGetObjects.
const MAX_OBJECTS_PER_FETCH = 50;
// An amount of gas (in gas units) that is added to transactions as an overhead to ensure transactions do not fail.
const GAS_SAFE_OVERHEAD = 1000n;
const MAX_GAS = 50000000000;
async function resolveTransactionData(transactionData, options, next) {
    await normalizeInputs(transactionData, options);
    await resolveObjectReferences(transactionData, options);
    if (!options.onlyTransactionKind) {
        await setGasPrice(transactionData, options);
        await setGasBudget(transactionData, options);
        await setGasPayment(transactionData, options);
    }
    await validate(transactionData);
    return await next();
}
async function setGasPrice(transactionData, options) {
    if (!transactionData.gasConfig.price) {
        transactionData.gasConfig.price = String(await getClient(options).getReferenceGasPrice());
    }
}
async function setGasBudget(transactionData, options) {
    if (transactionData.gasConfig.budget) {
        return;
    }
    const dryRunResult = await getClient(options).dryRunTransactionBlock({
        transactionBlock: transactionData.build({
            overrides: {
                gasData: {
                    budget: String(MAX_GAS),
                    payment: [],
                },
            },
        }),
    });
    if (dryRunResult.effects.status.status !== 'success') {
        throw new Error(`Dry run failed, could not automatically determine a budget: ${dryRunResult.effects.status.error}`, { cause: dryRunResult });
    }
    const safeOverhead = GAS_SAFE_OVERHEAD * BigInt(transactionData.gasConfig.price || 1n);
    const baseComputationCostWithOverhead = BigInt(dryRunResult.effects.gasUsed.computationCost) + safeOverhead;
    const gasBudget = baseComputationCostWithOverhead +
        BigInt(dryRunResult.effects.gasUsed.storageCost) -
        BigInt(dryRunResult.effects.gasUsed.storageRebate);
    transactionData.gasConfig.budget = String(gasBudget > baseComputationCostWithOverhead ? gasBudget : baseComputationCostWithOverhead);
}
// The current default is just picking _all_ coins we can which may not be ideal.
async function setGasPayment(transactionData, options) {
    if (!transactionData.gasConfig.payment) {
        const coins = await getClient(options).getCoins({
            owner: transactionData.gasConfig.owner || transactionData.sender,
            coinType: _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.SUI_TYPE_ARG,
        });
        const paymentCoins = coins.data
            // Filter out coins that are also used as input:
            .filter((coin) => {
            const matchingInput = transactionData.inputs.find((input) => {
                if (input.Object?.ImmOrOwnedObject) {
                    return coin.coinObjectId === input.Object.ImmOrOwnedObject.objectId;
                }
                return false;
            });
            return !matchingInput;
        })
            .map((coin) => ({
            objectId: coin.coinObjectId,
            digest: coin.digest,
            version: coin.version,
        }));
        if (!paymentCoins.length) {
            throw new Error('No valid gas coins found for the transaction.');
        }
        transactionData.gasConfig.payment = paymentCoins.map((payment) => (0,valibot__WEBPACK_IMPORTED_MODULE_1__.parse)(_data_internal_js__WEBPACK_IMPORTED_MODULE_2__.ObjectRef, payment));
    }
}
async function resolveObjectReferences(transactionData, options) {
    // Keep track of the object references that will need to be resolved at the end of the transaction.
    // We keep the input by-reference to avoid needing to re-resolve it:
    const objectsToResolve = transactionData.inputs.filter((input) => {
        return (input.UnresolvedObject &&
            !(input.UnresolvedObject.version || input.UnresolvedObject?.initialSharedVersion));
    });
    const dedupedIds = [
        ...new Set(objectsToResolve.map((input) => (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeSuiObjectId)(input.UnresolvedObject.objectId))),
    ];
    const objectChunks = dedupedIds.length ? chunk(dedupedIds, MAX_OBJECTS_PER_FETCH) : [];
    const resolved = (await Promise.all(objectChunks.map((chunk) => getClient(options).multiGetObjects({
        ids: chunk,
        options: { showOwner: true },
    })))).flat();
    const responsesById = new Map(dedupedIds.map((id, index) => {
        return [id, resolved[index]];
    }));
    const invalidObjects = Array.from(responsesById)
        .filter(([_, obj]) => obj.error)
        .map(([_, obj]) => JSON.stringify(obj.error));
    if (invalidObjects.length) {
        throw new Error(`The following input objects are invalid: ${invalidObjects.join(', ')}`);
    }
    const objects = resolved.map((object) => {
        if (object.error || !object.data) {
            throw new Error(`Failed to fetch object: ${object.error}`);
        }
        const owner = object.data.owner;
        const initialSharedVersion = owner && typeof owner === 'object' && 'Shared' in owner
            ? owner.Shared.initial_shared_version
            : null;
        return {
            objectId: object.data.objectId,
            digest: object.data.digest,
            version: object.data.version,
            initialSharedVersion,
        };
    });
    const objectsById = new Map(dedupedIds.map((id, index) => {
        return [id, objects[index]];
    }));
    for (const [index, input] of transactionData.inputs.entries()) {
        if (!input.UnresolvedObject) {
            continue;
        }
        let updated;
        const id = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeSuiAddress)(input.UnresolvedObject.objectId);
        const object = objectsById.get(id);
        if (input.UnresolvedObject.initialSharedVersion ?? object?.initialSharedVersion) {
            updated = _Inputs_js__WEBPACK_IMPORTED_MODULE_4__.Inputs.SharedObjectRef({
                objectId: id,
                initialSharedVersion: input.UnresolvedObject.initialSharedVersion || object?.initialSharedVersion,
                mutable: isUsedAsMutable(transactionData, index),
            });
        }
        else if (isUsedAsReceiving(transactionData, index)) {
            updated = _Inputs_js__WEBPACK_IMPORTED_MODULE_4__.Inputs.ReceivingRef({
                objectId: id,
                digest: input.UnresolvedObject.digest ?? object?.digest,
                version: input.UnresolvedObject.version ?? object?.version,
            });
        }
        transactionData.inputs[transactionData.inputs.indexOf(input)] =
            updated ??
                _Inputs_js__WEBPACK_IMPORTED_MODULE_4__.Inputs.ObjectRef({
                    objectId: id,
                    digest: input.UnresolvedObject.digest ?? object?.digest,
                    version: input.UnresolvedObject.version ?? object?.version,
                });
    }
}
async function normalizeInputs(transactionData, options) {
    const { inputs, commands } = transactionData;
    const moveCallsToResolve = [];
    const moveFunctionsToResolve = new Set();
    commands.forEach((command) => {
        // Special case move call:
        if (command.MoveCall) {
            // Determine if any of the arguments require encoding.
            // - If they don't, then this is good to go.
            // - If they do, then we need to fetch the normalized move module.
            // If we already know the argument types, we don't need to resolve them again
            if (command.MoveCall._argumentTypes) {
                return;
            }
            const inputs = command.MoveCall.arguments.map((arg) => {
                if (arg.$kind === 'Input') {
                    return transactionData.inputs[arg.Input];
                }
                return null;
            });
            const needsResolution = inputs.some((input) => input?.UnresolvedPure || input?.UnresolvedObject);
            if (needsResolution) {
                const functionName = `${command.MoveCall.package}::${command.MoveCall.module}::${command.MoveCall.function}`;
                moveFunctionsToResolve.add(functionName);
                moveCallsToResolve.push(command.MoveCall);
            }
        }
        // Special handling for values that where previously encoded using the wellKnownEncoding pattern.
        // This should only happen when transaction data was hydrated from an old version of the SDK
        switch (command.$kind) {
            case 'SplitCoins':
                command.SplitCoins.amounts.forEach((amount) => {
                    normalizeRawArgument(amount, _bcs_index_js__WEBPACK_IMPORTED_MODULE_5__.bcs.U64, transactionData);
                });
                break;
            case 'TransferObjects':
                normalizeRawArgument(command.TransferObjects.address, _bcs_index_js__WEBPACK_IMPORTED_MODULE_5__.bcs.Address, transactionData);
                break;
        }
    });
    const moveFunctionParameters = new Map();
    if (moveFunctionsToResolve.size > 0) {
        const client = getClient(options);
        await Promise.all([...moveFunctionsToResolve].map(async (functionName) => {
            const [packageId, moduleId, functionId] = functionName.split('::');
            const def = await client.getNormalizedMoveFunction({
                package: packageId,
                module: moduleId,
                function: functionId,
            });
            moveFunctionParameters.set(functionName, def.parameters.map((param) => (0,_serializer_js__WEBPACK_IMPORTED_MODULE_6__.normalizedTypeToMoveTypeSignature)(param)));
        }));
    }
    if (moveCallsToResolve.length) {
        await Promise.all(moveCallsToResolve.map(async (moveCall) => {
            const parameters = moveFunctionParameters.get(`${moveCall.package}::${moveCall.module}::${moveCall.function}`);
            if (!parameters) {
                return;
            }
            // Entry functions can have a mutable reference to an instance of the TxContext
            // struct defined in the TxContext module as the last parameter. The caller of
            // the function does not need to pass it in as an argument.
            const hasTxContext = parameters.length > 0 && (0,_serializer_js__WEBPACK_IMPORTED_MODULE_6__.isTxContext)(parameters.at(-1));
            const params = hasTxContext ? parameters.slice(0, parameters.length - 1) : parameters;
            moveCall._argumentTypes = params;
        }));
    }
    commands.forEach((command) => {
        if (!command.MoveCall) {
            return;
        }
        const moveCall = command.MoveCall;
        const fnName = `${moveCall.package}::${moveCall.module}::${moveCall.function}`;
        const params = moveCall._argumentTypes;
        if (!params) {
            return;
        }
        if (params.length !== command.MoveCall.arguments.length) {
            throw new Error(`Incorrect number of arguments for ${fnName}`);
        }
        params.forEach((param, i) => {
            const arg = moveCall.arguments[i];
            if (arg.$kind !== 'Input')
                return;
            const input = inputs[arg.Input];
            // Skip if the input is already resolved
            if (!input.UnresolvedPure && !input.UnresolvedObject) {
                return;
            }
            const inputValue = input.UnresolvedPure?.value ?? input.UnresolvedObject?.objectId;
            const schema = (0,_serializer_js__WEBPACK_IMPORTED_MODULE_6__.getPureBcsSchema)(param.body);
            if (schema) {
                arg.type = 'pure';
                inputs[inputs.indexOf(input)] = _Inputs_js__WEBPACK_IMPORTED_MODULE_4__.Inputs.Pure(schema.serialize(inputValue));
                return;
            }
            if (typeof inputValue !== 'string') {
                throw new Error(`Expect the argument to be an object id string, got ${JSON.stringify(inputValue, null, 2)}`);
            }
            arg.type = 'object';
            const unresolvedObject = input.UnresolvedPure
                ? {
                    $kind: 'UnresolvedObject',
                    UnresolvedObject: {
                        objectId: inputValue,
                    },
                }
                : input;
            inputs[arg.Input] = unresolvedObject;
        });
    });
}
function validate(transactionData) {
    transactionData.inputs.forEach((input, index) => {
        if (input.$kind !== 'Object' && input.$kind !== 'Pure') {
            throw new Error(`Input at index ${index} has not been resolved.  Expected a Pure or Object input, but found ${JSON.stringify(input)}`);
        }
    });
}
function normalizeRawArgument(arg, schema, transactionData) {
    if (arg.$kind !== 'Input') {
        return;
    }
    const input = transactionData.inputs[arg.Input];
    if (input.$kind !== 'UnresolvedPure') {
        return;
    }
    transactionData.inputs[arg.Input] = _Inputs_js__WEBPACK_IMPORTED_MODULE_4__.Inputs.Pure(schema.serialize(input.UnresolvedPure.value));
}
function isUsedAsMutable(transactionData, index) {
    let usedAsMutable = false;
    transactionData.getInputUses(index, (arg, tx) => {
        if (tx.MoveCall && tx.MoveCall._argumentTypes) {
            const argIndex = tx.MoveCall.arguments.indexOf(arg);
            usedAsMutable = tx.MoveCall._argumentTypes[argIndex].ref !== '&' || usedAsMutable;
        }
        if (tx.$kind === 'MakeMoveVec' || tx.$kind === 'MergeCoins' || tx.$kind === 'SplitCoins') {
            usedAsMutable = true;
        }
    });
    return usedAsMutable;
}
function isUsedAsReceiving(transactionData, index) {
    let usedAsReceiving = false;
    transactionData.getInputUses(index, (arg, tx) => {
        if (tx.MoveCall && tx.MoveCall._argumentTypes) {
            const argIndex = tx.MoveCall.arguments.indexOf(arg);
            usedAsReceiving = isReceivingType(tx.MoveCall._argumentTypes[argIndex]) || usedAsReceiving;
        }
    });
    return usedAsReceiving;
}
function isReceivingType(type) {
    if (typeof type.body !== 'object' || !('datatype' in type.body)) {
        return false;
    }
    return (type.body.datatype.package === '0x2' &&
        type.body.datatype.module === 'transfer' &&
        type.body.datatype.type === 'Receiving');
}
function getClient(options) {
    if (!options.client) {
        throw new Error(`No sui client passed to Transaction#build, but transaction data was not sufficient to build offline.`);
    }
    return options.client;
}
function chunk(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/object.ts":
/*!**********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/object.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createObjectMethods: () => (/* binding */ createObjectMethods)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
function createObjectMethods(makeObject) {
    function object(value) {
        return makeObject(value);
    }
    object.system = () => object('0x5');
    object.clock = () => object('0x6');
    object.random = () => object('0x8');
    object.denyList = () => object('0x403');
    object.option =
        ({ type, value }) => (tx) => tx.moveCall({
            typeArguments: [type],
            target: `0x1::option::${value === null ? 'none' : 'some'}`,
            arguments: value === null ? [] : [tx.object(value)],
        });
    return object;
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/pure.ts":
/*!********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/pure.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPure: () => (/* binding */ createPure)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/bcs-type.ts");
/* harmony import */ var _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../bcs/index.js */ "../../../sdk/typescript/src/bcs/index.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


function createPure(makePure) {
    function pure(typeOrSerializedValue, value) {
        if (typeof typeOrSerializedValue === 'string') {
            return makePure(schemaFromName(typeOrSerializedValue).serialize(value));
        }
        if (typeOrSerializedValue instanceof Uint8Array || (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.isSerializedBcs)(typeOrSerializedValue)) {
            return makePure(typeOrSerializedValue);
        }
        throw new Error('tx.pure must be called either a bcs type name, or a serialized bcs value');
    }
    pure.u8 = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U8.serialize(value));
    pure.u16 = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U16.serialize(value));
    pure.u32 = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U32.serialize(value));
    pure.u64 = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U64.serialize(value));
    pure.u128 = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U128.serialize(value));
    pure.u256 = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U256.serialize(value));
    pure.bool = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Bool.serialize(value));
    pure.string = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.String.serialize(value));
    pure.address = (value) => makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Address.serialize(value));
    pure.id = pure.address;
    pure.vector = (type, value) => {
        return makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.vector(schemaFromName(type)).serialize(value));
    };
    pure.option = (type, value) => {
        return makePure(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.option(schemaFromName(type)).serialize(value));
    };
    return pure;
}
function schemaFromName(name) {
    switch (name) {
        case 'u8':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.u8();
        case 'u16':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.u16();
        case 'u32':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.u32();
        case 'u64':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.u64();
        case 'u128':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.u128();
        case 'u256':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.u256();
        case 'bool':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.bool();
        case 'string':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.string();
        case 'id':
        case 'address':
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Address;
    }
    const generic = name.match(/^(vector|option)<(.+)>$/);
    if (generic) {
        const [kind, inner] = generic.slice(1);
        if (kind === 'vector') {
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.vector(schemaFromName(inner));
        }
        else {
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.option(schemaFromName(inner));
        }
    }
    throw new Error(`Invalid Pure type name: ${name}`);
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/serializer.ts":
/*!**************************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/serializer.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPureBcsSchema: () => (/* binding */ getPureBcsSchema),
/* harmony export */   isTxContext: () => (/* binding */ isTxContext),
/* harmony export */   normalizedTypeToMoveTypeSignature: () => (/* binding */ normalizedTypeToMoveTypeSignature),
/* harmony export */   pureBcsSchemaFromOpenMoveTypeSignatureBody: () => (/* binding */ pureBcsSchemaFromOpenMoveTypeSignatureBody)
/* harmony export */ });
/* harmony import */ var _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../bcs/index.js */ "../../../sdk/typescript/src/bcs/index.ts");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/index.js */ "../../../sdk/typescript/src/utils/constants.ts");
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0



const OBJECT_MODULE_NAME = 'object';
const ID_STRUCT_NAME = 'ID';
const STD_ASCII_MODULE_NAME = 'ascii';
const STD_ASCII_STRUCT_NAME = 'String';
const STD_UTF8_MODULE_NAME = 'string';
const STD_UTF8_STRUCT_NAME = 'String';
const STD_OPTION_MODULE_NAME = 'option';
const STD_OPTION_STRUCT_NAME = 'Option';
function isTxContext(param) {
    const struct = typeof param.body === 'object' && 'datatype' in param.body ? param.body.datatype : null;
    return (!!struct &&
        (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(struct.package) === (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)('0x2') &&
        struct.module === 'tx_context' &&
        struct.type === 'TxContext');
}
function getPureBcsSchema(typeSignature) {
    if (typeof typeSignature === 'string') {
        switch (typeSignature) {
            case 'address':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Address;
            case 'bool':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Bool;
            case 'u8':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U8;
            case 'u16':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U16;
            case 'u32':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U32;
            case 'u64':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U64;
            case 'u128':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U128;
            case 'u256':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U256;
            default:
                throw new Error(`Unknown type signature ${typeSignature}`);
        }
    }
    if ('vector' in typeSignature) {
        if (typeSignature.vector === 'u8') {
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.vector(_bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U8).transform({
                input: (val) => typeof val === 'string' ? new TextEncoder().encode(val) : val,
                output: (val) => val,
            });
        }
        const type = getPureBcsSchema(typeSignature.vector);
        return type ? _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.vector(type) : null;
    }
    if ('datatype' in typeSignature) {
        const pkg = (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(typeSignature.datatype.package);
        if (pkg === (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.MOVE_STDLIB_ADDRESS)) {
            if (typeSignature.datatype.module === STD_ASCII_MODULE_NAME &&
                typeSignature.datatype.type === STD_ASCII_STRUCT_NAME) {
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.String;
            }
            if (typeSignature.datatype.module === STD_UTF8_MODULE_NAME &&
                typeSignature.datatype.type === STD_UTF8_STRUCT_NAME) {
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.String;
            }
            if (typeSignature.datatype.module === STD_OPTION_MODULE_NAME &&
                typeSignature.datatype.type === STD_OPTION_STRUCT_NAME) {
                const type = getPureBcsSchema(typeSignature.datatype.typeParameters[0]);
                return type ? _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.vector(type) : null;
            }
        }
        if (pkg === (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.SUI_FRAMEWORK_ADDRESS) &&
            typeSignature.datatype.module === OBJECT_MODULE_NAME &&
            typeSignature.datatype.type === ID_STRUCT_NAME) {
            return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Address;
        }
    }
    return null;
}
function normalizedTypeToMoveTypeSignature(type) {
    if (typeof type === 'object' && 'Reference' in type) {
        return {
            ref: '&',
            body: normalizedTypeToMoveTypeSignatureBody(type.Reference),
        };
    }
    if (typeof type === 'object' && 'MutableReference' in type) {
        return {
            ref: '&mut',
            body: normalizedTypeToMoveTypeSignatureBody(type.MutableReference),
        };
    }
    return {
        ref: null,
        body: normalizedTypeToMoveTypeSignatureBody(type),
    };
}
function normalizedTypeToMoveTypeSignatureBody(type) {
    if (typeof type === 'string') {
        switch (type) {
            case 'Address':
                return 'address';
            case 'Bool':
                return 'bool';
            case 'U8':
                return 'u8';
            case 'U16':
                return 'u16';
            case 'U32':
                return 'u32';
            case 'U64':
                return 'u64';
            case 'U128':
                return 'u128';
            case 'U256':
                return 'u256';
            default:
                throw new Error(`Unexpected type ${type}`);
        }
    }
    if ('Vector' in type) {
        return { vector: normalizedTypeToMoveTypeSignatureBody(type.Vector) };
    }
    if ('Struct' in type) {
        return {
            datatype: {
                package: type.Struct.address,
                module: type.Struct.module,
                type: type.Struct.name,
                typeParameters: type.Struct.typeArguments.map(normalizedTypeToMoveTypeSignatureBody),
            },
        };
    }
    if ('TypeParameter' in type) {
        return { typeParameter: type.TypeParameter };
    }
    throw new Error(`Unexpected type ${JSON.stringify(type)}`);
}
function pureBcsSchemaFromOpenMoveTypeSignatureBody(typeSignature) {
    if (typeof typeSignature === 'string') {
        switch (typeSignature) {
            case 'address':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Address;
            case 'bool':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.Bool;
            case 'u8':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U8;
            case 'u16':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U16;
            case 'u32':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U32;
            case 'u64':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U64;
            case 'u128':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U128;
            case 'u256':
                return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.U256;
            default:
                throw new Error(`Unknown type signature ${typeSignature}`);
        }
    }
    if ('vector' in typeSignature) {
        return _bcs_index_js__WEBPACK_IMPORTED_MODULE_1__.bcs.vector(pureBcsSchemaFromOpenMoveTypeSignatureBody(typeSignature.vector));
    }
    throw new Error(`Expected pure typeSignature, but got ${JSON.stringify(typeSignature)}`);
}


/***/ }),

/***/ "../../../sdk/typescript/src/transactions/utils.ts":
/*!*********************************************************!*\
  !*** ../../../sdk/typescript/src/transactions/utils.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractMutableReference: () => (/* binding */ extractMutableReference),
/* harmony export */   extractReference: () => (/* binding */ extractReference),
/* harmony export */   extractStructTag: () => (/* binding */ extractStructTag),
/* harmony export */   getIdFromCallArg: () => (/* binding */ getIdFromCallArg)
/* harmony export */ });
/* harmony import */ var _utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

function extractMutableReference(normalizedType) {
    return typeof normalizedType === 'object' && 'MutableReference' in normalizedType
        ? normalizedType.MutableReference
        : undefined;
}
function extractReference(normalizedType) {
    return typeof normalizedType === 'object' && 'Reference' in normalizedType
        ? normalizedType.Reference
        : undefined;
}
function extractStructTag(normalizedType) {
    if (typeof normalizedType === 'object' && 'Struct' in normalizedType) {
        return normalizedType;
    }
    const ref = extractReference(normalizedType);
    const mutRef = extractMutableReference(normalizedType);
    if (typeof ref === 'object' && 'Struct' in ref) {
        return ref;
    }
    if (typeof mutRef === 'object' && 'Struct' in mutRef) {
        return mutRef;
    }
    return undefined;
}
function getIdFromCallArg(arg) {
    if (typeof arg === 'string') {
        return (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(arg);
    }
    if (arg.Object) {
        if (arg.Object.ImmOrOwnedObject) {
            return (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(arg.Object.ImmOrOwnedObject.objectId);
        }
        if (arg.Object.Receiving) {
            return (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(arg.Object.Receiving.objectId);
        }
        return (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(arg.Object.SharedObject.objectId);
    }
    if (arg.UnresolvedObject) {
        return (0,_utils_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiAddress)(arg.UnresolvedObject.objectId);
    }
    return undefined;
}


/***/ }),

/***/ "../../../sdk/typescript/src/utils/constants.ts":
/*!******************************************************!*\
  !*** ../../../sdk/typescript/src/utils/constants.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MIST_PER_SUI: () => (/* binding */ MIST_PER_SUI),
/* harmony export */   MOVE_STDLIB_ADDRESS: () => (/* binding */ MOVE_STDLIB_ADDRESS),
/* harmony export */   SUI_CLOCK_OBJECT_ID: () => (/* binding */ SUI_CLOCK_OBJECT_ID),
/* harmony export */   SUI_DECIMALS: () => (/* binding */ SUI_DECIMALS),
/* harmony export */   SUI_FRAMEWORK_ADDRESS: () => (/* binding */ SUI_FRAMEWORK_ADDRESS),
/* harmony export */   SUI_SYSTEM_ADDRESS: () => (/* binding */ SUI_SYSTEM_ADDRESS),
/* harmony export */   SUI_SYSTEM_MODULE_NAME: () => (/* binding */ SUI_SYSTEM_MODULE_NAME),
/* harmony export */   SUI_SYSTEM_STATE_OBJECT_ID: () => (/* binding */ SUI_SYSTEM_STATE_OBJECT_ID),
/* harmony export */   SUI_TYPE_ARG: () => (/* binding */ SUI_TYPE_ARG)
/* harmony export */ });
/* harmony import */ var _sui_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sui-types.js */ "../../../sdk/typescript/src/utils/sui-types.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const SUI_DECIMALS = 9;
const MIST_PER_SUI = BigInt(1000000000);
const MOVE_STDLIB_ADDRESS = '0x1';
const SUI_FRAMEWORK_ADDRESS = '0x2';
const SUI_SYSTEM_ADDRESS = '0x3';
const SUI_CLOCK_OBJECT_ID = (0,_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiObjectId)('0x6');
const SUI_SYSTEM_MODULE_NAME = 'sui_system';
const SUI_TYPE_ARG = `${SUI_FRAMEWORK_ADDRESS}::sui::SUI`;
const SUI_SYSTEM_STATE_OBJECT_ID = (0,_sui_types_js__WEBPACK_IMPORTED_MODULE_0__.normalizeSuiObjectId)('0x5');


/***/ }),

/***/ "../../../sdk/typescript/src/utils/sui-types.ts":
/*!******************************************************!*\
  !*** ../../../sdk/typescript/src/utils/sui-types.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SUI_ADDRESS_LENGTH: () => (/* binding */ SUI_ADDRESS_LENGTH),
/* harmony export */   isValidSuiAddress: () => (/* binding */ isValidSuiAddress),
/* harmony export */   isValidSuiObjectId: () => (/* binding */ isValidSuiObjectId),
/* harmony export */   isValidTransactionDigest: () => (/* binding */ isValidTransactionDigest),
/* harmony export */   normalizeStructTag: () => (/* binding */ normalizeStructTag),
/* harmony export */   normalizeSuiAddress: () => (/* binding */ normalizeSuiAddress),
/* harmony export */   normalizeSuiObjectId: () => (/* binding */ normalizeSuiObjectId),
/* harmony export */   parseStructTag: () => (/* binding */ parseStructTag)
/* harmony export */ });
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/b58.ts");
/* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mysten/bcs */ "../../../sdk/bcs/src/utils.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const TX_DIGEST_LENGTH = 32;
/** Returns whether the tx digest is valid based on the serialization format */
function isValidTransactionDigest(value) {
    try {
        const buffer = (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_0__.fromBase58)(value);
        return buffer.length === TX_DIGEST_LENGTH;
    }
    catch (e) {
        return false;
    }
}
// TODO - can we automatically sync this with rust length definition?
// Source of truth is
// https://github.com/MystenLabs/sui/blob/acb2b97ae21f47600e05b0d28127d88d0725561d/crates/sui-types/src/base_types.rs#L67
// which uses the Move account address length
// https://github.com/move-language/move/blob/67ec40dc50c66c34fd73512fcc412f3b68d67235/language/move-core/types/src/account_address.rs#L23 .
const SUI_ADDRESS_LENGTH = 32;
function isValidSuiAddress(value) {
    return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}
function isValidSuiObjectId(value) {
    return isValidSuiAddress(value);
}
function parseTypeTag(type) {
    if (!type.includes('::'))
        return type;
    return parseStructTag(type);
}
function parseStructTag(type) {
    const [address, module] = type.split('::');
    const rest = type.slice(address.length + module.length + 4);
    const name = rest.includes('<') ? rest.slice(0, rest.indexOf('<')) : rest;
    const typeParams = rest.includes('<')
        ? (0,_mysten_bcs__WEBPACK_IMPORTED_MODULE_1__.splitGenericParameters)(rest.slice(rest.indexOf('<') + 1, rest.lastIndexOf('>'))).map((typeParam) => parseTypeTag(typeParam.trim()))
        : [];
    return {
        address: normalizeSuiAddress(address),
        module,
        name,
        typeParams,
    };
}
function normalizeStructTag(type) {
    const { address, module, name, typeParams } = typeof type === 'string' ? parseStructTag(type) : type;
    const formattedTypeParams = typeParams?.length > 0
        ? `<${typeParams
            .map((typeParam) => typeof typeParam === 'string' ? typeParam : normalizeStructTag(typeParam))
            .join(',')}>`
        : '';
    return `${address}::${module}::${name}${formattedTypeParams}`;
}
/**
 * Perform the following operations:
 * 1. Make the address lower case
 * 2. Prepend `0x` if the string does not start with `0x`.
 * 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
 *
 * WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
 * is to treat the first `0x` not as part of the address. The default behavior can be overridden by
 * setting `forceAdd0x` to true
 *
 */
function normalizeSuiAddress(value, forceAdd0x = false) {
    let address = value.toLowerCase();
    if (!forceAdd0x && address.startsWith('0x')) {
        address = address.slice(2);
    }
    return `0x${address.padStart(SUI_ADDRESS_LENGTH * 2, '0')}`;
}
function normalizeSuiObjectId(value, forceAdd0x = false) {
    return normalizeSuiAddress(value, forceAdd0x);
}
function isHex(value) {
    return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
    return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}


/***/ }),

/***/ "../../../sdk/wallet-standard/src/chains.ts":
/*!**************************************************!*\
  !*** ../../../sdk/wallet-standard/src/chains.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SUI_CHAINS: () => (/* binding */ SUI_CHAINS),
/* harmony export */   SUI_DEVNET_CHAIN: () => (/* binding */ SUI_DEVNET_CHAIN),
/* harmony export */   SUI_LOCALNET_CHAIN: () => (/* binding */ SUI_LOCALNET_CHAIN),
/* harmony export */   SUI_MAINNET_CHAIN: () => (/* binding */ SUI_MAINNET_CHAIN),
/* harmony export */   SUI_TESTNET_CHAIN: () => (/* binding */ SUI_TESTNET_CHAIN),
/* harmony export */   isSuiChain: () => (/* binding */ isSuiChain)
/* harmony export */ });
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
/** Sui Devnet */
const SUI_DEVNET_CHAIN = 'sui:devnet';
/** Sui Testnet */
const SUI_TESTNET_CHAIN = 'sui:testnet';
/** Sui Localnet */
const SUI_LOCALNET_CHAIN = 'sui:localnet';
/** Sui Mainnet */
const SUI_MAINNET_CHAIN = 'sui:mainnet';
const SUI_CHAINS = [
    SUI_DEVNET_CHAIN,
    SUI_TESTNET_CHAIN,
    SUI_LOCALNET_CHAIN,
    SUI_MAINNET_CHAIN,
];
/**
 * Utility that returns whether or not a chain identifier is a valid Sui chain.
 * @param chain a chain identifier in the form of `${string}:{$string}`
 */
function isSuiChain(chain) {
    return SUI_CHAINS.includes(chain);
}


/***/ }),

/***/ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/native.js":
/*!*******************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/native.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/regex.js":
/*!******************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/regex.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/rng.js":
/*!****************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/rng.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/stringify.js":
/*!**********************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/stringify.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/v4.js":
/*!***************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/v4.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/validate.js":
/*!*********************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/validate.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../../node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_assert.js":
/*!*************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_assert.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bool: () => (/* binding */ bool),
/* harmony export */   bytes: () => (/* binding */ bytes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   output: () => (/* binding */ output)
/* harmony export */ });
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`positive integer expected, not ${n}`);
}
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`boolean expected, not ${b}`);
}
// copied from utils
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
function bytes(b, ...lengths) {
    if (!isBytes(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function hash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(h.outputLen);
    number(h.blockLen);
}
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}

const assert = { number, bool, bytes, hash, exists, output };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assert);
//# sourceMappingURL=_assert.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_blake.js":
/*!************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_blake.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLAKE: () => (/* binding */ BLAKE),
/* harmony export */   SIGMA: () => (/* binding */ SIGMA)
/* harmony export */ });
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_assert.js */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_assert.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/utils.js");


// Blake is based on ChaCha permutation.
// For BLAKE2b, the two extra permutations for rounds 10 and 11 are SIGMA[10..11] = SIGMA[0..1].
// prettier-ignore
const SIGMA = /* @__PURE__ */ new Uint8Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
    11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
    7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
    9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
    2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
    12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
    13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
    6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
    10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
]);
class BLAKE extends _utils_js__WEBPACK_IMPORTED_MODULE_0__.Hash {
    constructor(blockLen, outputLen, opts = {}, keyLen, saltLen, persLen) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.length = 0;
        this.pos = 0;
        this.finished = false;
        this.destroyed = false;
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_1__.number)(blockLen);
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_1__.number)(outputLen);
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_1__.number)(keyLen);
        if (outputLen < 0 || outputLen > keyLen)
            throw new Error('outputLen bigger than keyLen');
        if (opts.key !== undefined && (opts.key.length < 1 || opts.key.length > keyLen))
            throw new Error(`key must be up 1..${keyLen} byte long or undefined`);
        if (opts.salt !== undefined && opts.salt.length !== saltLen)
            throw new Error(`salt must be ${saltLen} byte long or undefined`);
        if (opts.personalization !== undefined && opts.personalization.length !== persLen)
            throw new Error(`personalization must be ${persLen} byte long or undefined`);
        this.buffer32 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.u32)((this.buffer = new Uint8Array(blockLen)));
    }
    update(data) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_1__.exists)(this);
        // Main difference with other hashes: there is flag for last block,
        // so we cannot process current block before we know that there
        // is the next one. This significantly complicates logic and reduces ability
        // to do zero-copy processing
        const { blockLen, buffer, buffer32 } = this;
        data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.toBytes)(data);
        const len = data.length;
        const offset = data.byteOffset;
        const buf = data.buffer;
        for (let pos = 0; pos < len;) {
            // If buffer is full and we still have input (don't process last block, same as blake2s)
            if (this.pos === blockLen) {
                if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__.isLE)
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwap32)(buffer32);
                this.compress(buffer32, 0, false);
                if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__.isLE)
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwap32)(buffer32);
                this.pos = 0;
            }
            const take = Math.min(blockLen - this.pos, len - pos);
            const dataOffset = offset + pos;
            // full block && aligned to 4 bytes && not last in input
            if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
                const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
                if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__.isLE)
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwap32)(data32);
                for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
                    this.length += blockLen;
                    this.compress(data32, pos32, false);
                }
                if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__.isLE)
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwap32)(data32);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            this.length += take;
            pos += take;
        }
        return this;
    }
    digestInto(out) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_1__.exists)(this);
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_1__.output)(out, this);
        const { pos, buffer32 } = this;
        this.finished = true;
        // Padding
        this.buffer.subarray(pos).fill(0);
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__.isLE)
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwap32)(buffer32);
        this.compress(buffer32, 0, true);
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__.isLE)
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwap32)(buffer32);
        const out32 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.u32)(out);
        this.get().forEach((v, i) => (out32[i] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.byteSwapIfBE)(v)));
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        const { buffer, length, finished, destroyed, outputLen, pos } = this;
        to || (to = new this.constructor({ dkLen: outputLen }));
        to.set(...this.get());
        to.length = length;
        to.finished = finished;
        to.destroyed = destroyed;
        to.outputLen = outputLen;
        to.buffer.set(buffer);
        to.pos = pos;
        return to;
    }
}
//# sourceMappingURL=_blake.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_u64.js":
/*!**********************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_u64.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   add3H: () => (/* binding */ add3H),
/* harmony export */   add3L: () => (/* binding */ add3L),
/* harmony export */   add4H: () => (/* binding */ add4H),
/* harmony export */   add4L: () => (/* binding */ add4L),
/* harmony export */   add5H: () => (/* binding */ add5H),
/* harmony export */   add5L: () => (/* binding */ add5L),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromBig: () => (/* binding */ fromBig),
/* harmony export */   rotlBH: () => (/* binding */ rotlBH),
/* harmony export */   rotlBL: () => (/* binding */ rotlBL),
/* harmony export */   rotlSH: () => (/* binding */ rotlSH),
/* harmony export */   rotlSL: () => (/* binding */ rotlSL),
/* harmony export */   rotr32H: () => (/* binding */ rotr32H),
/* harmony export */   rotr32L: () => (/* binding */ rotr32L),
/* harmony export */   rotrBH: () => (/* binding */ rotrBH),
/* harmony export */   rotrBL: () => (/* binding */ rotrBL),
/* harmony export */   rotrSH: () => (/* binding */ rotrSH),
/* harmony export */   rotrSL: () => (/* binding */ rotrSL),
/* harmony export */   shrSH: () => (/* binding */ shrSH),
/* harmony export */   shrSL: () => (/* binding */ shrSL),
/* harmony export */   split: () => (/* binding */ split),
/* harmony export */   toBig: () => (/* binding */ toBig)
/* harmony export */ });
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le)
        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
}
const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s) => h >>> s;
const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l) => l;
const rotr32L = (h, _l) => h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
// prettier-ignore

// prettier-ignore
const u64 = {
    fromBig, split, toBig,
    shrSH, shrSL,
    rotrSH, rotrSL, rotrBH, rotrBL,
    rotr32H, rotr32L,
    rotlSH, rotlSL, rotlBH, rotlBL,
    add, add3L, add3H, add4L, add4H, add5H, add5L,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (u64);
//# sourceMappingURL=_u64.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/blake2b.js":
/*!*************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/blake2b.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blake2b: () => (/* binding */ blake2b)
/* harmony export */ });
/* harmony import */ var _blake_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_blake.js */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_blake.js");
/* harmony import */ var _u64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_u64.js */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_u64.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/utils.js");



// Same as SHA-512 but LE
// prettier-ignore
const B2B_IV = /* @__PURE__ */ new Uint32Array([
    0xf3bcc908, 0x6a09e667, 0x84caa73b, 0xbb67ae85, 0xfe94f82b, 0x3c6ef372, 0x5f1d36f1, 0xa54ff53a,
    0xade682d1, 0x510e527f, 0x2b3e6c1f, 0x9b05688c, 0xfb41bd6b, 0x1f83d9ab, 0x137e2179, 0x5be0cd19
]);
// Temporary buffer
const BBUF = /* @__PURE__ */ new Uint32Array(32);
// Mixing function G splitted in two halfs
function G1b(a, b, c, d, msg, x) {
    // NOTE: V is LE here
    const Xl = msg[x], Xh = msg[x + 1]; // prettier-ignore
    let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1]; // prettier-ignore
    let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1]; // prettier-ignore
    let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1]; // prettier-ignore
    let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1]; // prettier-ignore
    // v[a] = (v[a] + v[b] + x) | 0;
    let ll = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].add3L(Al, Bl, Xl);
    Ah = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].add3H(ll, Ah, Bh, Xh);
    Al = ll | 0;
    // v[d] = rotr(v[d] ^ v[a], 32)
    ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
    ({ Dh, Dl } = { Dh: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotr32H(Dh, Dl), Dl: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotr32L(Dh, Dl) });
    // v[c] = (v[c] + v[d]) | 0;
    ({ h: Ch, l: Cl } = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(Ch, Cl, Dh, Dl));
    // v[b] = rotr(v[b] ^ v[c], 24)
    ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
    ({ Bh, Bl } = { Bh: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotrSH(Bh, Bl, 24), Bl: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotrSL(Bh, Bl, 24) });
    (BBUF[2 * a] = Al), (BBUF[2 * a + 1] = Ah);
    (BBUF[2 * b] = Bl), (BBUF[2 * b + 1] = Bh);
    (BBUF[2 * c] = Cl), (BBUF[2 * c + 1] = Ch);
    (BBUF[2 * d] = Dl), (BBUF[2 * d + 1] = Dh);
}
function G2b(a, b, c, d, msg, x) {
    // NOTE: V is LE here
    const Xl = msg[x], Xh = msg[x + 1]; // prettier-ignore
    let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1]; // prettier-ignore
    let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1]; // prettier-ignore
    let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1]; // prettier-ignore
    let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1]; // prettier-ignore
    // v[a] = (v[a] + v[b] + x) | 0;
    let ll = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].add3L(Al, Bl, Xl);
    Ah = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].add3H(ll, Ah, Bh, Xh);
    Al = ll | 0;
    // v[d] = rotr(v[d] ^ v[a], 16)
    ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
    ({ Dh, Dl } = { Dh: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotrSH(Dh, Dl, 16), Dl: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotrSL(Dh, Dl, 16) });
    // v[c] = (v[c] + v[d]) | 0;
    ({ h: Ch, l: Cl } = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(Ch, Cl, Dh, Dl));
    // v[b] = rotr(v[b] ^ v[c], 63)
    ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
    ({ Bh, Bl } = { Bh: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotrBH(Bh, Bl, 63), Bl: _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].rotrBL(Bh, Bl, 63) });
    (BBUF[2 * a] = Al), (BBUF[2 * a + 1] = Ah);
    (BBUF[2 * b] = Bl), (BBUF[2 * b + 1] = Bh);
    (BBUF[2 * c] = Cl), (BBUF[2 * c + 1] = Ch);
    (BBUF[2 * d] = Dl), (BBUF[2 * d + 1] = Dh);
}
class BLAKE2b extends _blake_js__WEBPACK_IMPORTED_MODULE_1__.BLAKE {
    constructor(opts = {}) {
        super(128, opts.dkLen === undefined ? 64 : opts.dkLen, opts, 64, 16, 16);
        // Same as SHA-512, but LE
        this.v0l = B2B_IV[0] | 0;
        this.v0h = B2B_IV[1] | 0;
        this.v1l = B2B_IV[2] | 0;
        this.v1h = B2B_IV[3] | 0;
        this.v2l = B2B_IV[4] | 0;
        this.v2h = B2B_IV[5] | 0;
        this.v3l = B2B_IV[6] | 0;
        this.v3h = B2B_IV[7] | 0;
        this.v4l = B2B_IV[8] | 0;
        this.v4h = B2B_IV[9] | 0;
        this.v5l = B2B_IV[10] | 0;
        this.v5h = B2B_IV[11] | 0;
        this.v6l = B2B_IV[12] | 0;
        this.v6h = B2B_IV[13] | 0;
        this.v7l = B2B_IV[14] | 0;
        this.v7h = B2B_IV[15] | 0;
        const keyLength = opts.key ? opts.key.length : 0;
        this.v0l ^= this.outputLen | (keyLength << 8) | (0x01 << 16) | (0x01 << 24);
        if (opts.salt) {
            const salt = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.u32)((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.toBytes)(opts.salt));
            this.v4l ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(salt[0]);
            this.v4h ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(salt[1]);
            this.v5l ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(salt[2]);
            this.v5h ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(salt[3]);
        }
        if (opts.personalization) {
            const pers = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.u32)((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.toBytes)(opts.personalization));
            this.v6l ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(pers[0]);
            this.v6h ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(pers[1]);
            this.v7l ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(pers[2]);
            this.v7h ^= (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.byteSwapIfBE)(pers[3]);
        }
        if (opts.key) {
            // Pad to blockLen and update
            const tmp = new Uint8Array(this.blockLen);
            tmp.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.toBytes)(opts.key));
            this.update(tmp);
        }
    }
    // prettier-ignore
    get() {
        let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
        return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
    }
    // prettier-ignore
    set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
        this.v0l = v0l | 0;
        this.v0h = v0h | 0;
        this.v1l = v1l | 0;
        this.v1h = v1h | 0;
        this.v2l = v2l | 0;
        this.v2h = v2h | 0;
        this.v3l = v3l | 0;
        this.v3h = v3h | 0;
        this.v4l = v4l | 0;
        this.v4h = v4h | 0;
        this.v5l = v5l | 0;
        this.v5h = v5h | 0;
        this.v6l = v6l | 0;
        this.v6h = v6h | 0;
        this.v7l = v7l | 0;
        this.v7h = v7h | 0;
    }
    compress(msg, offset, isLast) {
        this.get().forEach((v, i) => (BBUF[i] = v)); // First half from state.
        BBUF.set(B2B_IV, 16); // Second half from IV.
        let { h, l } = _u64_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromBig(BigInt(this.length));
        BBUF[24] = B2B_IV[8] ^ l; // Low word of the offset.
        BBUF[25] = B2B_IV[9] ^ h; // High word.
        // Invert all bits for last block
        if (isLast) {
            BBUF[28] = ~BBUF[28];
            BBUF[29] = ~BBUF[29];
        }
        let j = 0;
        const s = _blake_js__WEBPACK_IMPORTED_MODULE_1__.SIGMA;
        for (let i = 0; i < 12; i++) {
            G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
            G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
            G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
            G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
            G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
            G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
            G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
            G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
            G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
            G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
            G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
            G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
            G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
            G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
            G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
            G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
        }
        this.v0l ^= BBUF[0] ^ BBUF[16];
        this.v0h ^= BBUF[1] ^ BBUF[17];
        this.v1l ^= BBUF[2] ^ BBUF[18];
        this.v1h ^= BBUF[3] ^ BBUF[19];
        this.v2l ^= BBUF[4] ^ BBUF[20];
        this.v2h ^= BBUF[5] ^ BBUF[21];
        this.v3l ^= BBUF[6] ^ BBUF[22];
        this.v3h ^= BBUF[7] ^ BBUF[23];
        this.v4l ^= BBUF[8] ^ BBUF[24];
        this.v4h ^= BBUF[9] ^ BBUF[25];
        this.v5l ^= BBUF[10] ^ BBUF[26];
        this.v5h ^= BBUF[11] ^ BBUF[27];
        this.v6l ^= BBUF[12] ^ BBUF[28];
        this.v6h ^= BBUF[13] ^ BBUF[29];
        this.v7l ^= BBUF[14] ^ BBUF[30];
        this.v7h ^= BBUF[15] ^ BBUF[31];
        BBUF.fill(0);
    }
    destroy() {
        this.destroyed = true;
        this.buffer32.fill(0);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
/**
 * BLAKE2b - optimized for 64-bit platforms. JS doesn't have uint64, so it's slower than BLAKE2s.
 * @param msg - message that would be hashed
 * @param opts - dkLen, key, salt, personalization
 */
const blake2b = /* @__PURE__ */ (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.wrapConstructorWithOpts)((opts) => new BLAKE2b(opts));
//# sourceMappingURL=blake2b.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/crypto.js":
/*!************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/crypto.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   crypto: () => (/* binding */ crypto)
/* harmony export */ });
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
//# sourceMappingURL=crypto.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/utils.js":
/*!***********************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/utils.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hash: () => (/* binding */ Hash),
/* harmony export */   asyncLoop: () => (/* binding */ asyncLoop),
/* harmony export */   byteSwap: () => (/* binding */ byteSwap),
/* harmony export */   byteSwap32: () => (/* binding */ byteSwap32),
/* harmony export */   byteSwapIfBE: () => (/* binding */ byteSwapIfBE),
/* harmony export */   bytesToHex: () => (/* binding */ bytesToHex),
/* harmony export */   checkOpts: () => (/* binding */ checkOpts),
/* harmony export */   concatBytes: () => (/* binding */ concatBytes),
/* harmony export */   createView: () => (/* binding */ createView),
/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   isLE: () => (/* binding */ isLE),
/* harmony export */   nextTick: () => (/* binding */ nextTick),
/* harmony export */   randomBytes: () => (/* binding */ randomBytes),
/* harmony export */   rotl: () => (/* binding */ rotl),
/* harmony export */   rotr: () => (/* binding */ rotr),
/* harmony export */   toBytes: () => (/* binding */ toBytes),
/* harmony export */   u32: () => (/* binding */ u32),
/* harmony export */   u8: () => (/* binding */ u8),
/* harmony export */   utf8ToBytes: () => (/* binding */ utf8ToBytes),
/* harmony export */   wrapConstructor: () => (/* binding */ wrapConstructor),
/* harmony export */   wrapConstructorWithOpts: () => (/* binding */ wrapConstructorWithOpts),
/* harmony export */   wrapXOFConstructorWithOpts: () => (/* binding */ wrapXOFConstructorWithOpts)
/* harmony export */ });
/* harmony import */ var _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/crypto */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/crypto.js");
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_assert.js */ "../../../node_modules/.pnpm/@noble+hashes@1.4.0/node_modules/@noble/hashes/esm/_assert.js");
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.


// export { isBytes } from './_assert.js';
// We can't reuse isBytes from _assert, because somehow this causes huge perf issues
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
// Cast array to different type
const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
// The rotate left (circular left shift) operation for uint32
const rotl = (word, shift) => (word << shift) | ((word >>> (32 - shift)) >>> 0);
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
// The byte swap operation for uint32
const byteSwap = (word) => ((word << 24) & 0xff000000) |
    ((word << 8) & 0xff0000) |
    ((word >>> 8) & 0xff00) |
    ((word >>> 24) & 0xff);
// Conditionally byte swap if on a big-endian platform
const byteSwapIfBE = isLE ? (n) => n : (n) => byteSwap(n);
// In place byte swap for Uint32Array
function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
    }
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex(bytes) {
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const nextTick = async () => { };
// Returns control to thread each 'tick' ms to avoid blocking
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for (let i = 0; i < iters; i++) {
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
            continue;
        await nextTick();
        ts += diff;
    }
}
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(data);
    return data;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
const toStr = {}.toString;
function checkOpts(defaults, opts) {
    if (opts !== undefined && toStr.call(opts) !== '[object Object]')
        throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */
function randomBytes(bytesLength = 32) {
    if (_noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto && typeof _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto.getRandomValues === 'function') {
        return _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@wallet-standard+wallet@1.0.1/node_modules/@wallet-standard/wallet/lib/esm/register.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@wallet-standard+wallet@1.0.1/node_modules/@wallet-standard/wallet/lib/esm/register.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEPRECATED_registerWallet: () => (/* binding */ DEPRECATED_registerWallet),
/* harmony export */   registerWallet: () => (/* binding */ registerWallet)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RegisterWalletEvent_detail;
/**
 * Register a {@link "@wallet-standard/base".Wallet} as a Standard Wallet with the app.
 *
 * This dispatches a {@link "@wallet-standard/base".WindowRegisterWalletEvent} to notify the app that the Wallet is
 * ready to be registered.
 *
 * This also adds a listener for {@link "@wallet-standard/base".WindowAppReadyEvent} to listen for a notification from
 * the app that the app is ready to register the Wallet.
 *
 * This combination of event dispatch and listener guarantees that the Wallet will be registered synchronously as soon
 * as the app is ready whether the Wallet loads before or after the app.
 *
 * @param wallet Wallet to register.
 *
 * @group Wallet
 */
function registerWallet(wallet) {
    const callback = ({ register }) => register(wallet);
    try {
        window.dispatchEvent(new RegisterWalletEvent(callback));
    }
    catch (error) {
        console.error('wallet-standard:register-wallet event could not be dispatched\n', error);
    }
    try {
        window.addEventListener('wallet-standard:app-ready', ({ detail: api }) => callback(api));
    }
    catch (error) {
        console.error('wallet-standard:app-ready event listener could not be added\n', error);
    }
}
class RegisterWalletEvent extends Event {
    constructor(callback) {
        super('wallet-standard:register-wallet', {
            bubbles: false,
            cancelable: false,
            composed: false,
        });
        _RegisterWalletEvent_detail.set(this, void 0);
        __classPrivateFieldSet(this, _RegisterWalletEvent_detail, callback, "f");
    }
    get detail() {
        return __classPrivateFieldGet(this, _RegisterWalletEvent_detail, "f");
    }
    get type() {
        return 'wallet-standard:register-wallet';
    }
    /** @deprecated */
    preventDefault() {
        throw new Error('preventDefault cannot be called');
    }
    /** @deprecated */
    stopImmediatePropagation() {
        throw new Error('stopImmediatePropagation cannot be called');
    }
    /** @deprecated */
    stopPropagation() {
        throw new Error('stopPropagation cannot be called');
    }
}
_RegisterWalletEvent_detail = new WeakMap();
/**
 * @deprecated Use {@link registerWallet} instead.
 *
 * @group Deprecated
 */
function DEPRECATED_registerWallet(wallet) {
    var _a;
    registerWallet(wallet);
    try {
        ((_a = window.navigator).wallets || (_a.wallets = [])).push(({ register }) => register(wallet));
    }
    catch (error) {
        console.error('window.navigator.wallets could not be pushed\n', error);
    }
}
//# sourceMappingURL=register.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/@wallet-standard+wallet@1.0.1/node_modules/@wallet-standard/wallet/lib/esm/util.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@wallet-standard+wallet@1.0.1/node_modules/@wallet-standard/wallet/lib/esm/util.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReadonlyWalletAccount: () => (/* binding */ ReadonlyWalletAccount),
/* harmony export */   arraysEqual: () => (/* binding */ arraysEqual),
/* harmony export */   bytesEqual: () => (/* binding */ bytesEqual),
/* harmony export */   concatBytes: () => (/* binding */ concatBytes),
/* harmony export */   guard: () => (/* binding */ guard),
/* harmony export */   pick: () => (/* binding */ pick)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReadonlyWalletAccount_address, _ReadonlyWalletAccount_publicKey, _ReadonlyWalletAccount_chains, _ReadonlyWalletAccount_features, _ReadonlyWalletAccount_label, _ReadonlyWalletAccount_icon;
/**
 * Base implementation of a {@link "@wallet-standard/base".WalletAccount} to be used or extended by a
 * {@link "@wallet-standard/base".Wallet}.
 *
 * `WalletAccount` properties must be read-only. This class enforces this by making all properties
 * [truly private](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) and
 * read-only, using getters for access, returning copies instead of references, and calling
 * [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
 * on the instance.
 *
 * @group Account
 */
class ReadonlyWalletAccount {
    /**
     * Create and freeze a read-only account.
     *
     * @param account Account to copy properties from.
     */
    constructor(account) {
        _ReadonlyWalletAccount_address.set(this, void 0);
        _ReadonlyWalletAccount_publicKey.set(this, void 0);
        _ReadonlyWalletAccount_chains.set(this, void 0);
        _ReadonlyWalletAccount_features.set(this, void 0);
        _ReadonlyWalletAccount_label.set(this, void 0);
        _ReadonlyWalletAccount_icon.set(this, void 0);
        if (new.target === ReadonlyWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _ReadonlyWalletAccount_address, account.address, "f");
        __classPrivateFieldSet(this, _ReadonlyWalletAccount_publicKey, account.publicKey.slice(), "f");
        __classPrivateFieldSet(this, _ReadonlyWalletAccount_chains, account.chains.slice(), "f");
        __classPrivateFieldSet(this, _ReadonlyWalletAccount_features, account.features.slice(), "f");
        __classPrivateFieldSet(this, _ReadonlyWalletAccount_label, account.label, "f");
        __classPrivateFieldSet(this, _ReadonlyWalletAccount_icon, account.icon, "f");
    }
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.address | WalletAccount::address} */
    get address() {
        return __classPrivateFieldGet(this, _ReadonlyWalletAccount_address, "f");
    }
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.publicKey | WalletAccount::publicKey} */
    get publicKey() {
        return __classPrivateFieldGet(this, _ReadonlyWalletAccount_publicKey, "f").slice();
    }
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.chains | WalletAccount::chains} */
    get chains() {
        return __classPrivateFieldGet(this, _ReadonlyWalletAccount_chains, "f").slice();
    }
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.features | WalletAccount::features} */
    get features() {
        return __classPrivateFieldGet(this, _ReadonlyWalletAccount_features, "f").slice();
    }
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.label | WalletAccount::label} */
    get label() {
        return __classPrivateFieldGet(this, _ReadonlyWalletAccount_label, "f");
    }
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.icon | WalletAccount::icon} */
    get icon() {
        return __classPrivateFieldGet(this, _ReadonlyWalletAccount_icon, "f");
    }
}
_ReadonlyWalletAccount_address = new WeakMap(), _ReadonlyWalletAccount_publicKey = new WeakMap(), _ReadonlyWalletAccount_chains = new WeakMap(), _ReadonlyWalletAccount_features = new WeakMap(), _ReadonlyWalletAccount_label = new WeakMap(), _ReadonlyWalletAccount_icon = new WeakMap();
/**
 * Efficiently compare {@link Indexed} arrays (e.g. `Array` and `Uint8Array`).
 *
 * @param a An array.
 * @param b Another array.
 *
 * @return `true` if the arrays have the same length and elements, `false` otherwise.
 *
 * @group Util
 */
function arraysEqual(a, b) {
    if (a === b)
        return true;
    const length = a.length;
    if (length !== b.length)
        return false;
    for (let i = 0; i < length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
/**
 * Efficiently compare byte arrays, using {@link arraysEqual}.
 *
 * @param a A byte array.
 * @param b Another byte array.
 *
 * @return `true` if the byte arrays have the same length and bytes, `false` otherwise.
 *
 * @group Util
 */
function bytesEqual(a, b) {
    return arraysEqual(a, b);
}
/**
 * Efficiently concatenate byte arrays without modifying them.
 *
 * @param first  A byte array.
 * @param others Additional byte arrays.
 *
 * @return New byte array containing the concatenation of all the byte arrays.
 *
 * @group Util
 */
function concatBytes(first, ...others) {
    const length = others.reduce((length, bytes) => length + bytes.length, first.length);
    const bytes = new Uint8Array(length);
    bytes.set(first, 0);
    for (const other of others) {
        bytes.set(other, bytes.length);
    }
    return bytes;
}
/**
 * Create a new object with a subset of fields from a source object.
 *
 * @param source Object to pick fields from.
 * @param keys   Names of fields to pick.
 *
 * @return New object with only the picked fields.
 *
 * @group Util
 */
function pick(source, ...keys) {
    const picked = {};
    for (const key of keys) {
        picked[key] = source[key];
    }
    return picked;
}
/**
 * Call a callback function, catch an error if it throws, and log the error without rethrowing.
 *
 * @param callback Function to call.
 *
 * @group Util
 */
function guard(callback) {
    try {
        callback();
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../../../node_modules/.pnpm/base-x@5.0.0/node_modules/base-x/src/esm/index.js":
/*!*************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/base-x@5.0.0/node_modules/base-x/src/esm/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
function base (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  const BASE_MAP = new Uint8Array(256)
  for (let j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255
  }
  for (let i = 0; i < ALPHABET.length; i++) {
    const x = ALPHABET.charAt(i)
    const xc = x.charCodeAt(0)
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i
  }
  const BASE = ALPHABET.length
  const LEADER = ALPHABET.charAt(0)
  const FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up
  const iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up
  function encode (source) {
    // eslint-disable-next-line no-empty
    if (source instanceof Uint8Array) { } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength)
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source)
    }
    if (!(source instanceof Uint8Array)) { throw new TypeError('Expected Uint8Array') }
    if (source.length === 0) { return '' }
    // Skip & count leading zeroes.
    let zeroes = 0
    let length = 0
    let pbegin = 0
    const pend = source.length
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++
      zeroes++
    }
    // Allocate enough space in big-endian base58 representation.
    const size = ((pend - pbegin) * iFACTOR + 1) >>> 0
    const b58 = new Uint8Array(size)
    // Process the bytes.
    while (pbegin !== pend) {
      let carry = source[pbegin]
      // Apply "b58 = b58 * 256 + ch".
      let i = 0
      for (let it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0
        b58[it1] = (carry % BASE) >>> 0
        carry = (carry / BASE) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      pbegin++
    }
    // Skip leading zeroes in base58 result.
    let it2 = size - length
    while (it2 !== size && b58[it2] === 0) {
      it2++
    }
    // Translate the result into a string.
    let str = LEADER.repeat(zeroes)
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return new Uint8Array() }
    let psz = 0
    // Skip and count leading '1's.
    let zeroes = 0
    let length = 0
    while (source[psz] === LEADER) {
      zeroes++
      psz++
    }
    // Allocate enough space in big-endian base256 representation.
    const size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.
    const b256 = new Uint8Array(size)
    // Process the characters.
    while (source[psz]) {
      // Decode character
      let carry = BASE_MAP[source.charCodeAt(psz)]
      // Invalid character
      if (carry === 255) { return }
      let i = 0
      for (let it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0
        b256[it3] = (carry % 256) >>> 0
        carry = (carry / 256) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      psz++
    }
    // Skip leading zeroes in b256.
    let it4 = size - length
    while (it4 !== size && b256[it4] === 0) {
      it4++
    }
    const vch = new Uint8Array(zeroes + (size - it4))
    let j = zeroes
    while (it4 !== size) {
      vch[j++] = b256[it4++]
    }
    return vch
  }
  function decode (string) {
    const buffer = decodeUnsafe(string)
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode,
    decodeUnsafe,
    decode
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (base);


/***/ }),

/***/ "../../../node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js":
/*!*********************************************************************************!*\
  !*** ../../../node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var base_x__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base-x */ "../../../node_modules/.pnpm/base-x@5.0.0/node_modules/base-x/src/esm/index.js");

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,base_x__WEBPACK_IMPORTED_MODULE_0__["default"])(ALPHABET));


/***/ }),

/***/ "../../../node_modules/.pnpm/mitt@3.0.1/node_modules/mitt/dist/mitt.mjs":
/*!******************************************************************************!*\
  !*** ../../../node_modules/.pnpm/mitt@3.0.1/node_modules/mitt/dist/mitt.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n){return{all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e])},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]))},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e)}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e)})}}}
//# sourceMappingURL=mitt.mjs.map


/***/ }),

/***/ "../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs":
/*!********************************************************************************!*\
  !*** ../../../node_modules/.pnpm/tslib@2.6.0/node_modules/tslib/tslib.es6.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ }),

/***/ "../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js":
/*!*************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/valibot@0.36.0/node_modules/valibot/dist/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BIC_REGEX: () => (/* binding */ BIC_REGEX),
/* harmony export */   CUID2_REGEX: () => (/* binding */ CUID2_REGEX),
/* harmony export */   DECIMAL_REGEX: () => (/* binding */ DECIMAL_REGEX),
/* harmony export */   EMAIL_REGEX: () => (/* binding */ EMAIL_REGEX),
/* harmony export */   EMOJI_REGEX: () => (/* binding */ EMOJI_REGEX),
/* harmony export */   HEXADECIMAL_REGEX: () => (/* binding */ HEXADECIMAL_REGEX),
/* harmony export */   HEX_COLOR_REGEX: () => (/* binding */ HEX_COLOR_REGEX),
/* harmony export */   IMEI_REGEX: () => (/* binding */ IMEI_REGEX),
/* harmony export */   IPV4_REGEX: () => (/* binding */ IPV4_REGEX),
/* harmony export */   IPV6_REGEX: () => (/* binding */ IPV6_REGEX),
/* harmony export */   IP_REGEX: () => (/* binding */ IP_REGEX),
/* harmony export */   ISO_DATE_REGEX: () => (/* binding */ ISO_DATE_REGEX),
/* harmony export */   ISO_DATE_TIME_REGEX: () => (/* binding */ ISO_DATE_TIME_REGEX),
/* harmony export */   ISO_TIMESTAMP_REGEX: () => (/* binding */ ISO_TIMESTAMP_REGEX),
/* harmony export */   ISO_TIME_REGEX: () => (/* binding */ ISO_TIME_REGEX),
/* harmony export */   ISO_TIME_SECOND_REGEX: () => (/* binding */ ISO_TIME_SECOND_REGEX),
/* harmony export */   ISO_WEEK_REGEX: () => (/* binding */ ISO_WEEK_REGEX),
/* harmony export */   MAC48_REGEX: () => (/* binding */ MAC48_REGEX),
/* harmony export */   MAC64_REGEX: () => (/* binding */ MAC64_REGEX),
/* harmony export */   MAC_REGEX: () => (/* binding */ MAC_REGEX),
/* harmony export */   OCTAL_REGEX: () => (/* binding */ OCTAL_REGEX),
/* harmony export */   ULID_REGEX: () => (/* binding */ ULID_REGEX),
/* harmony export */   UUID_REGEX: () => (/* binding */ UUID_REGEX),
/* harmony export */   ValiError: () => (/* binding */ ValiError),
/* harmony export */   _addIssue: () => (/* binding */ _addIssue),
/* harmony export */   _isLuhnAlgo: () => (/* binding */ _isLuhnAlgo),
/* harmony export */   _isValidObjectKey: () => (/* binding */ _isValidObjectKey),
/* harmony export */   _stringify: () => (/* binding */ _stringify),
/* harmony export */   any: () => (/* binding */ any),
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   arrayAsync: () => (/* binding */ arrayAsync),
/* harmony export */   awaitAsync: () => (/* binding */ awaitAsync),
/* harmony export */   bic: () => (/* binding */ bic),
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   blob: () => (/* binding */ blob),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   brand: () => (/* binding */ brand),
/* harmony export */   bytes: () => (/* binding */ bytes),
/* harmony export */   check: () => (/* binding */ check),
/* harmony export */   checkAsync: () => (/* binding */ checkAsync),
/* harmony export */   checkItems: () => (/* binding */ checkItems),
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   creditCard: () => (/* binding */ creditCard),
/* harmony export */   cuid2: () => (/* binding */ cuid2),
/* harmony export */   custom: () => (/* binding */ custom),
/* harmony export */   customAsync: () => (/* binding */ customAsync),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   decimal: () => (/* binding */ decimal),
/* harmony export */   deleteGlobalConfig: () => (/* binding */ deleteGlobalConfig),
/* harmony export */   deleteGlobalMessage: () => (/* binding */ deleteGlobalMessage),
/* harmony export */   deleteSchemaMessage: () => (/* binding */ deleteSchemaMessage),
/* harmony export */   deleteSpecificMessage: () => (/* binding */ deleteSpecificMessage),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   emoji: () => (/* binding */ emoji),
/* harmony export */   empty: () => (/* binding */ empty),
/* harmony export */   endsWith: () => (/* binding */ endsWith),
/* harmony export */   entriesFromList: () => (/* binding */ entriesFromList),
/* harmony export */   "enum": () => (/* binding */ enum_),
/* harmony export */   enum_: () => (/* binding */ enum_),
/* harmony export */   everyItem: () => (/* binding */ everyItem),
/* harmony export */   excludes: () => (/* binding */ excludes),
/* harmony export */   fallback: () => (/* binding */ fallback),
/* harmony export */   fallbackAsync: () => (/* binding */ fallbackAsync),
/* harmony export */   file: () => (/* binding */ file),
/* harmony export */   filterItems: () => (/* binding */ filterItems),
/* harmony export */   findItem: () => (/* binding */ findItem),
/* harmony export */   finite: () => (/* binding */ finite),
/* harmony export */   flatten: () => (/* binding */ flatten),
/* harmony export */   forward: () => (/* binding */ forward),
/* harmony export */   forwardAsync: () => (/* binding */ forwardAsync),
/* harmony export */   "function": () => (/* binding */ function_),
/* harmony export */   function_: () => (/* binding */ function_),
/* harmony export */   getDefault: () => (/* binding */ getDefault),
/* harmony export */   getDefaults: () => (/* binding */ getDefaults),
/* harmony export */   getDefaultsAsync: () => (/* binding */ getDefaultsAsync),
/* harmony export */   getDotPath: () => (/* binding */ getDotPath),
/* harmony export */   getFallback: () => (/* binding */ getFallback),
/* harmony export */   getFallbacks: () => (/* binding */ getFallbacks),
/* harmony export */   getFallbacksAsync: () => (/* binding */ getFallbacksAsync),
/* harmony export */   getGlobalConfig: () => (/* binding */ getGlobalConfig),
/* harmony export */   getGlobalMessage: () => (/* binding */ getGlobalMessage),
/* harmony export */   getSchemaMessage: () => (/* binding */ getSchemaMessage),
/* harmony export */   getSpecificMessage: () => (/* binding */ getSpecificMessage),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   hexColor: () => (/* binding */ hexColor),
/* harmony export */   hexadecimal: () => (/* binding */ hexadecimal),
/* harmony export */   imei: () => (/* binding */ imei),
/* harmony export */   includes: () => (/* binding */ includes),
/* harmony export */   instance: () => (/* binding */ instance),
/* harmony export */   integer: () => (/* binding */ integer),
/* harmony export */   intersect: () => (/* binding */ intersect),
/* harmony export */   intersectAsync: () => (/* binding */ intersectAsync),
/* harmony export */   ip: () => (/* binding */ ip),
/* harmony export */   ipv4: () => (/* binding */ ipv4),
/* harmony export */   ipv6: () => (/* binding */ ipv6),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   isOfKind: () => (/* binding */ isOfKind),
/* harmony export */   isOfType: () => (/* binding */ isOfType),
/* harmony export */   isValiError: () => (/* binding */ isValiError),
/* harmony export */   isoDate: () => (/* binding */ isoDate),
/* harmony export */   isoDateTime: () => (/* binding */ isoDateTime),
/* harmony export */   isoTime: () => (/* binding */ isoTime),
/* harmony export */   isoTimeSecond: () => (/* binding */ isoTimeSecond),
/* harmony export */   isoTimestamp: () => (/* binding */ isoTimestamp),
/* harmony export */   isoWeek: () => (/* binding */ isoWeek),
/* harmony export */   keyof: () => (/* binding */ keyof),
/* harmony export */   lazy: () => (/* binding */ lazy),
/* harmony export */   lazyAsync: () => (/* binding */ lazyAsync),
/* harmony export */   length: () => (/* binding */ length),
/* harmony export */   literal: () => (/* binding */ literal),
/* harmony export */   looseObject: () => (/* binding */ looseObject),
/* harmony export */   looseObjectAsync: () => (/* binding */ looseObjectAsync),
/* harmony export */   looseTuple: () => (/* binding */ looseTuple),
/* harmony export */   looseTupleAsync: () => (/* binding */ looseTupleAsync),
/* harmony export */   mac: () => (/* binding */ mac),
/* harmony export */   mac48: () => (/* binding */ mac48),
/* harmony export */   mac64: () => (/* binding */ mac64),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   mapAsync: () => (/* binding */ mapAsync),
/* harmony export */   mapItems: () => (/* binding */ mapItems),
/* harmony export */   maxBytes: () => (/* binding */ maxBytes),
/* harmony export */   maxLength: () => (/* binding */ maxLength),
/* harmony export */   maxSize: () => (/* binding */ maxSize),
/* harmony export */   maxValue: () => (/* binding */ maxValue),
/* harmony export */   mimeType: () => (/* binding */ mimeType),
/* harmony export */   minBytes: () => (/* binding */ minBytes),
/* harmony export */   minLength: () => (/* binding */ minLength),
/* harmony export */   minSize: () => (/* binding */ minSize),
/* harmony export */   minValue: () => (/* binding */ minValue),
/* harmony export */   multipleOf: () => (/* binding */ multipleOf),
/* harmony export */   nan: () => (/* binding */ nan),
/* harmony export */   never: () => (/* binding */ never),
/* harmony export */   nonEmpty: () => (/* binding */ nonEmpty),
/* harmony export */   nonNullable: () => (/* binding */ nonNullable),
/* harmony export */   nonNullableAsync: () => (/* binding */ nonNullableAsync),
/* harmony export */   nonNullish: () => (/* binding */ nonNullish),
/* harmony export */   nonNullishAsync: () => (/* binding */ nonNullishAsync),
/* harmony export */   nonOptional: () => (/* binding */ nonOptional),
/* harmony export */   nonOptionalAsync: () => (/* binding */ nonOptionalAsync),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   notBytes: () => (/* binding */ notBytes),
/* harmony export */   notLength: () => (/* binding */ notLength),
/* harmony export */   notSize: () => (/* binding */ notSize),
/* harmony export */   notValue: () => (/* binding */ notValue),
/* harmony export */   "null": () => (/* binding */ null_),
/* harmony export */   null_: () => (/* binding */ null_),
/* harmony export */   nullable: () => (/* binding */ nullable),
/* harmony export */   nullableAsync: () => (/* binding */ nullableAsync),
/* harmony export */   nullish: () => (/* binding */ nullish),
/* harmony export */   nullishAsync: () => (/* binding */ nullishAsync),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   object: () => (/* binding */ object),
/* harmony export */   objectAsync: () => (/* binding */ objectAsync),
/* harmony export */   objectWithRest: () => (/* binding */ objectWithRest),
/* harmony export */   objectWithRestAsync: () => (/* binding */ objectWithRestAsync),
/* harmony export */   octal: () => (/* binding */ octal),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   optional: () => (/* binding */ optional),
/* harmony export */   optionalAsync: () => (/* binding */ optionalAsync),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseAsync: () => (/* binding */ parseAsync),
/* harmony export */   parser: () => (/* binding */ parser),
/* harmony export */   parserAsync: () => (/* binding */ parserAsync),
/* harmony export */   partial: () => (/* binding */ partial),
/* harmony export */   partialAsync: () => (/* binding */ partialAsync),
/* harmony export */   partialCheck: () => (/* binding */ partialCheck),
/* harmony export */   partialCheckAsync: () => (/* binding */ partialCheckAsync),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   picklist: () => (/* binding */ picklist),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   pipeAsync: () => (/* binding */ pipeAsync),
/* harmony export */   promise: () => (/* binding */ promise),
/* harmony export */   rawCheck: () => (/* binding */ rawCheck),
/* harmony export */   rawCheckAsync: () => (/* binding */ rawCheckAsync),
/* harmony export */   rawTransform: () => (/* binding */ rawTransform),
/* harmony export */   rawTransformAsync: () => (/* binding */ rawTransformAsync),
/* harmony export */   readonly: () => (/* binding */ readonly),
/* harmony export */   record: () => (/* binding */ record),
/* harmony export */   recordAsync: () => (/* binding */ recordAsync),
/* harmony export */   reduceItems: () => (/* binding */ reduceItems),
/* harmony export */   regex: () => (/* binding */ regex),
/* harmony export */   required: () => (/* binding */ required),
/* harmony export */   requiredAsync: () => (/* binding */ requiredAsync),
/* harmony export */   safeInteger: () => (/* binding */ safeInteger),
/* harmony export */   safeParse: () => (/* binding */ safeParse),
/* harmony export */   safeParseAsync: () => (/* binding */ safeParseAsync),
/* harmony export */   safeParser: () => (/* binding */ safeParser),
/* harmony export */   safeParserAsync: () => (/* binding */ safeParserAsync),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   setAsync: () => (/* binding */ setAsync),
/* harmony export */   setGlobalConfig: () => (/* binding */ setGlobalConfig),
/* harmony export */   setGlobalMessage: () => (/* binding */ setGlobalMessage),
/* harmony export */   setSchemaMessage: () => (/* binding */ setSchemaMessage),
/* harmony export */   setSpecificMessage: () => (/* binding */ setSpecificMessage),
/* harmony export */   size: () => (/* binding */ size),
/* harmony export */   someItem: () => (/* binding */ someItem),
/* harmony export */   sortItems: () => (/* binding */ sortItems),
/* harmony export */   startsWith: () => (/* binding */ startsWith),
/* harmony export */   strictObject: () => (/* binding */ strictObject),
/* harmony export */   strictObjectAsync: () => (/* binding */ strictObjectAsync),
/* harmony export */   strictTuple: () => (/* binding */ strictTuple),
/* harmony export */   strictTupleAsync: () => (/* binding */ strictTupleAsync),
/* harmony export */   string: () => (/* binding */ string),
/* harmony export */   symbol: () => (/* binding */ symbol),
/* harmony export */   toLowerCase: () => (/* binding */ toLowerCase),
/* harmony export */   toMaxValue: () => (/* binding */ toMaxValue),
/* harmony export */   toMinValue: () => (/* binding */ toMinValue),
/* harmony export */   toUpperCase: () => (/* binding */ toUpperCase),
/* harmony export */   transform: () => (/* binding */ transform),
/* harmony export */   transformAsync: () => (/* binding */ transformAsync),
/* harmony export */   trim: () => (/* binding */ trim),
/* harmony export */   trimEnd: () => (/* binding */ trimEnd),
/* harmony export */   trimStart: () => (/* binding */ trimStart),
/* harmony export */   tuple: () => (/* binding */ tuple),
/* harmony export */   tupleAsync: () => (/* binding */ tupleAsync),
/* harmony export */   tupleWithRest: () => (/* binding */ tupleWithRest),
/* harmony export */   tupleWithRestAsync: () => (/* binding */ tupleWithRestAsync),
/* harmony export */   ulid: () => (/* binding */ ulid),
/* harmony export */   undefined: () => (/* binding */ undefined_),
/* harmony export */   undefined_: () => (/* binding */ undefined_),
/* harmony export */   union: () => (/* binding */ union),
/* harmony export */   unionAsync: () => (/* binding */ unionAsync),
/* harmony export */   unknown: () => (/* binding */ unknown),
/* harmony export */   unwrap: () => (/* binding */ unwrap),
/* harmony export */   url: () => (/* binding */ url),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   value: () => (/* binding */ value),
/* harmony export */   variant: () => (/* binding */ variant),
/* harmony export */   variantAsync: () => (/* binding */ variantAsync),
/* harmony export */   "void": () => (/* binding */ void_),
/* harmony export */   void_: () => (/* binding */ void_)
/* harmony export */ });
// src/actions/await/awaitAsync.ts
function awaitAsync() {
  return {
    kind: "transformation",
    type: "await",
    reference: awaitAsync,
    async: true,
    async _run(dataset) {
      dataset.value = await dataset.value;
      return dataset;
    }
  };
}

// src/regex.ts
var BIC_REGEX = /^[A-Z]{6}(?!00)[A-Z\d]{2}(?:[A-Z\d]{3})?$/u;
var CUID2_REGEX = /^[a-z][\da-z]*$/u;
var DECIMAL_REGEX = /^\d+$/u;
var EMAIL_REGEX = /^[\w+-]+(?:\.[\w+-]+)*@[\da-z]+(?:[.-][\da-z]+)*\.[a-z]{2,}$/iu;
var EMOJI_REGEX = /^[\p{Extended_Pictographic}\p{Emoji_Component}]+$/u;
var HEXADECIMAL_REGEX = /^(?:0h|0x)?[\da-f]+$/iu;
var HEX_COLOR_REGEX = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/iu;
var IMEI_REGEX = /^\d{15}$|^\d{2}-\d{6}-\d{6}-\d$/u;
var IPV4_REGEX = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive
  /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$/u
);
var IPV6_REGEX = /^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
var IP_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$|^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
var ISO_DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;
var ISO_DATE_TIME_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
var ISO_TIME_REGEX = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
var ISO_TIME_SECOND_REGEX = /^(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u;
var ISO_TIMESTAMP_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}(?:\.\d{1,9})?(?:Z|[+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?)$/u;
var ISO_WEEK_REGEX = /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/u;
var MAC48_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$/iu;
var MAC64_REGEX = /^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
var MAC_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$|^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
var OCTAL_REGEX = /^(?:0o)?[0-7]+$/iu;
var ULID_REGEX = /^[\da-hjkmnp-tv-z]{26}$/iu;
var UUID_REGEX = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;

// src/storages/globalConfig/globalConfig.ts
var store;
function setGlobalConfig(config2) {
  store = { ...store, ...config2 };
}
function getGlobalConfig(config2) {
  return {
    lang: config2?.lang ?? store?.lang,
    message: config2?.message,
    abortEarly: config2?.abortEarly ?? store?.abortEarly,
    abortPipeEarly: config2?.abortPipeEarly ?? store?.abortPipeEarly
  };
}
function deleteGlobalConfig() {
  store = void 0;
}

// src/storages/globalMessage/globalMessage.ts
var store2;
function setGlobalMessage(message, lang) {
  if (!store2) store2 = /* @__PURE__ */ new Map();
  store2.set(lang, message);
}
function getGlobalMessage(lang) {
  return store2?.get(lang);
}
function deleteGlobalMessage(lang) {
  store2?.delete(lang);
}

// src/storages/schemaMessage/schemaMessage.ts
var store3;
function setSchemaMessage(message, lang) {
  if (!store3) store3 = /* @__PURE__ */ new Map();
  store3.set(lang, message);
}
function getSchemaMessage(lang) {
  return store3?.get(lang);
}
function deleteSchemaMessage(lang) {
  store3?.delete(lang);
}

// src/storages/specificMessage/specificMessage.ts
var store4;
function setSpecificMessage(reference, message, lang) {
  if (!store4) store4 = /* @__PURE__ */ new Map();
  if (!store4.get(reference)) store4.set(reference, /* @__PURE__ */ new Map());
  store4.get(reference).set(lang, message);
}
function getSpecificMessage(reference, lang) {
  return store4?.get(reference)?.get(lang);
}
function deleteSpecificMessage(reference, lang) {
  store4?.get(reference)?.delete(lang);
}

// src/utils/_stringify/_stringify.ts
function _stringify(input) {
  const type = typeof input;
  if (type === "string") {
    return `"${input}"`;
  }
  if (type === "number" || type === "bigint" || type === "boolean") {
    return `${input}`;
  }
  if (type === "object" || type === "function") {
    return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
  }
  return type;
}

// src/utils/_addIssue/_addIssue.ts
function _addIssue(context, label, dataset, config2, other) {
  const input = other && "input" in other ? other.input : dataset.value;
  const expected = other?.expected ?? context.expects ?? null;
  const received = other?.received ?? _stringify(input);
  const issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    // @ts-expect-error
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config2.lang,
    abortEarly: config2.abortEarly,
    abortPipeEarly: config2.abortPipeEarly
  };
  const isSchema = context.kind === "schema";
  const message = other?.message ?? // @ts-expect-error
  context.message ?? getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? getSchemaMessage(issue.lang) : null) ?? config2.message ?? getGlobalMessage(issue.lang);
  if (message) {
    issue.message = typeof message === "function" ? message(issue) : message;
  }
  if (isSchema) {
    dataset.typed = false;
  }
  if (dataset.issues) {
    dataset.issues.push(issue);
  } else {
    dataset.issues = [issue];
  }
}

// src/utils/_isLuhnAlgo/_isLuhnAlgo.ts
var NON_DIGIT_REGEX = /\D/gu;
function _isLuhnAlgo(input) {
  const number2 = input.replace(NON_DIGIT_REGEX, "");
  let length2 = number2.length;
  let bit = 1;
  let sum = 0;
  while (length2) {
    const value2 = +number2[--length2];
    bit ^= 1;
    sum += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value2] : value2;
  }
  return sum % 10 === 0;
}

// src/utils/_isValidObjectKey/_isValidObjectKey.ts
function _isValidObjectKey(object2, key) {
  return Object.hasOwn(object2, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
}

// src/utils/entriesFromList/entriesFromList.ts
function entriesFromList(list, schema) {
  const entries = {};
  for (const key of list) {
    entries[key] = schema;
  }
  return entries;
}

// src/utils/getDotPath/getDotPath.ts
function getDotPath(issue) {
  if (issue.path) {
    let key = "";
    for (const item of issue.path) {
      if (typeof item.key === "string" || typeof item.key === "number") {
        if (key) {
          key += `.${item.key}`;
        } else {
          key += item.key;
        }
      } else {
        return null;
      }
    }
    return key;
  }
  return null;
}

// src/utils/isOfKind/isOfKind.ts
function isOfKind(kind, object2) {
  return object2.kind === kind;
}

// src/utils/isOfType/isOfType.ts
function isOfType(type, object2) {
  return object2.type === type;
}

// src/utils/isValiError/isValiError.ts
function isValiError(error) {
  return error instanceof ValiError;
}

// src/utils/ValiError/ValiError.ts
var ValiError = class extends Error {
  /**
   * The error issues.
   */
  issues;
  /**
   * Creates a Valibot error with useful information.
   *
   * @param issues The error issues.
   */
  constructor(issues) {
    super(issues[0].message);
    this.name = "ValiError";
    this.issues = issues;
  }
};

// src/actions/bic/bic.ts
function bic(message) {
  return {
    kind: "validation",
    type: "bic",
    reference: bic,
    async: false,
    expects: null,
    requirement: BIC_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "BIC", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/brand/brand.ts
function brand(name) {
  return {
    kind: "transformation",
    type: "brand",
    reference: brand,
    async: false,
    name,
    _run(dataset) {
      return dataset;
    }
  };
}

// src/actions/bytes/bytes.ts
function bytes(requirement, message) {
  return {
    kind: "validation",
    type: "bytes",
    reference: bytes,
    async: false,
    expects: `${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed) {
        const length2 = new TextEncoder().encode(dataset.value).length;
        if (length2 !== this.requirement) {
          _addIssue(this, "bytes", dataset, config2, {
            received: `${length2}`
          });
        }
      }
      return dataset;
    }
  };
}

// src/actions/check/check.ts
function check(requirement, message) {
  return {
    kind: "validation",
    type: "check",
    reference: check,
    async: false,
    expects: null,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "input", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/check/checkAsync.ts
function checkAsync(requirement, message) {
  return {
    kind: "validation",
    type: "check",
    reference: checkAsync,
    async: true,
    expects: null,
    requirement,
    message,
    async _run(dataset, config2) {
      if (dataset.typed && !await this.requirement(dataset.value)) {
        _addIssue(this, "input", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/checkItems/checkItems.ts
function checkItems(requirement, message) {
  return {
    kind: "validation",
    type: "check_items",
    reference: checkItems,
    async: false,
    expects: null,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed) {
        for (let index = 0; index < dataset.value.length; index++) {
          const item = dataset.value[index];
          if (!this.requirement(item, index, dataset.value)) {
            _addIssue(this, "item", dataset, config2, {
              input: item,
              path: [
                {
                  type: "array",
                  origin: "value",
                  input: dataset.value,
                  key: index,
                  value: item
                }
              ]
            });
          }
        }
      }
      return dataset;
    }
  };
}

// src/actions/creditCard/creditCard.ts
var CREDIT_CARD_REGEX = /^(?:\d{14,19}|\d{4}(?: \d{3,6}){2,4}|\d{4}(?:-\d{3,6}){2,4})$/u;
var SANITIZE_REGEX = /[- ]/gu;
var PROVIDER_REGEX_LIST = [
  // American Express
  /^3[47]\d{13}$/u,
  // Diners Club
  /^3(?:0[0-5]|[68]\d)\d{11,13}$/u,
  // Discover
  /^6(?:011|5\d{2})\d{12,15}$/u,
  // JCB
  /^(?:2131|1800|35\d{3})\d{11}$/u,
  // Mastercard
  /^5[1-5]\d{2}|(?:222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u,
  // UnionPay
  /^(?:6[27]\d{14,17}|81\d{14,17})$/u,
  // Visa
  /^4\d{12}(?:\d{3,6})?$/u
];
function creditCard(message) {
  return {
    kind: "validation",
    type: "credit_card",
    reference: creditCard,
    async: false,
    expects: null,
    requirement(input) {
      let sanitized;
      return CREDIT_CARD_REGEX.test(input) && // Remove any hyphens and blanks
      (sanitized = input.replace(SANITIZE_REGEX, "")) && // Check if it matches a provider
      PROVIDER_REGEX_LIST.some((regex2) => regex2.test(sanitized)) && // Check if passes luhn algorithm
      _isLuhnAlgo(sanitized);
    },
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "credit card", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/cuid2/cuid2.ts
function cuid2(message) {
  return {
    kind: "validation",
    type: "cuid2",
    reference: cuid2,
    async: false,
    expects: null,
    requirement: CUID2_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "Cuid2", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/decimal/decimal.ts
function decimal(message) {
  return {
    kind: "validation",
    type: "decimal",
    reference: decimal,
    async: false,
    expects: null,
    requirement: DECIMAL_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "decimal", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/email/email.ts
function email(message) {
  return {
    kind: "validation",
    type: "email",
    reference: email,
    expects: null,
    async: false,
    requirement: EMAIL_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "email", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/emoji/emoji.ts
function emoji(message) {
  return {
    kind: "validation",
    type: "emoji",
    reference: emoji,
    async: false,
    expects: null,
    requirement: EMOJI_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "emoji", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/empty/empty.ts
function empty(message) {
  return {
    kind: "validation",
    type: "empty",
    reference: empty,
    async: false,
    expects: "0",
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.length > 0) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/endsWith/endsWith.ts
function endsWith(requirement, message) {
  return {
    kind: "validation",
    type: "ends_with",
    reference: endsWith,
    async: false,
    expects: `"${requirement}"`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !dataset.value.endsWith(this.requirement)) {
        _addIssue(this, "end", dataset, config2, {
          received: `"${dataset.value.slice(-this.requirement.length)}"`
        });
      }
      return dataset;
    }
  };
}

// src/actions/everyItem/everyItem.ts
function everyItem(requirement, message) {
  return {
    kind: "validation",
    type: "every_item",
    reference: everyItem,
    async: false,
    expects: null,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !dataset.value.every(this.requirement)) {
        _addIssue(this, "item", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/excludes/excludes.ts
function excludes(requirement, message) {
  const received = _stringify(requirement);
  return {
    kind: "validation",
    type: "excludes",
    reference: excludes,
    async: false,
    expects: `!${received}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.includes(this.requirement)) {
        _addIssue(this, "content", dataset, config2, { received });
      }
      return dataset;
    }
  };
}

// src/actions/filterItems/filterItems.ts
function filterItems(operation) {
  return {
    kind: "transformation",
    type: "filter_items",
    reference: filterItems,
    async: false,
    operation,
    _run(dataset) {
      dataset.value = dataset.value.filter(this.operation);
      return dataset;
    }
  };
}

// src/actions/findItem/findItem.ts
function findItem(operation) {
  return {
    kind: "transformation",
    type: "find_item",
    reference: findItem,
    async: false,
    operation,
    _run(dataset) {
      dataset.value = dataset.value.find(this.operation);
      return dataset;
    }
  };
}

// src/actions/finite/finite.ts
function finite(message) {
  return {
    kind: "validation",
    type: "finite",
    reference: finite,
    async: false,
    expects: null,
    requirement: Number.isFinite,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "finite", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/hash/hash.ts
var HASH_LENGTHS = {
  md4: 32,
  md5: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8,
  adler32: 8
};
function hash(types, message) {
  return {
    kind: "validation",
    type: "hash",
    reference: hash,
    expects: null,
    async: false,
    requirement: RegExp(
      types.map((type) => `^[a-f0-9]{${HASH_LENGTHS[type]}}$`).join("|"),
      "iu"
    ),
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "hash", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/hexadecimal/hexadecimal.ts
function hexadecimal(message) {
  return {
    kind: "validation",
    type: "hexadecimal",
    reference: hexadecimal,
    async: false,
    expects: null,
    requirement: HEXADECIMAL_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "hexadecimal", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/hexColor/hexColor.ts
function hexColor(message) {
  return {
    kind: "validation",
    type: "hex_color",
    reference: hexColor,
    async: false,
    expects: null,
    requirement: HEX_COLOR_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "hex color", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/imei/imei.ts
function imei(message) {
  return {
    kind: "validation",
    type: "imei",
    reference: imei,
    async: false,
    expects: null,
    requirement(input) {
      return IMEI_REGEX.test(input) && _isLuhnAlgo(input);
    },
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "IMEI", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/includes/includes.ts
function includes(requirement, message) {
  const expects = _stringify(requirement);
  return {
    kind: "validation",
    type: "includes",
    reference: includes,
    async: false,
    expects,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !dataset.value.includes(this.requirement)) {
        _addIssue(this, "content", dataset, config2, {
          received: `!${expects}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/integer/integer.ts
function integer(message) {
  return {
    kind: "validation",
    type: "integer",
    reference: integer,
    async: false,
    expects: null,
    requirement: Number.isInteger,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "integer", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/ip/ip.ts
function ip(message) {
  return {
    kind: "validation",
    type: "ip",
    reference: ip,
    async: false,
    expects: null,
    requirement: IP_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "IP", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/ipv4/ipv4.ts
function ipv4(message) {
  return {
    kind: "validation",
    type: "ipv4",
    reference: ipv4,
    async: false,
    expects: null,
    requirement: IPV4_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "IPv4", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/ipv6/ipv6.ts
function ipv6(message) {
  return {
    kind: "validation",
    type: "ipv6",
    reference: ipv6,
    async: false,
    expects: null,
    requirement: IPV6_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "IPv6", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/isoDate/isoDate.ts
function isoDate(message) {
  return {
    kind: "validation",
    type: "iso_date",
    reference: isoDate,
    async: false,
    expects: null,
    requirement: ISO_DATE_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "date", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/isoDateTime/isoDateTime.ts
function isoDateTime(message) {
  return {
    kind: "validation",
    type: "iso_date_time",
    reference: isoDateTime,
    async: false,
    expects: null,
    requirement: ISO_DATE_TIME_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "date-time", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/isoTime/isoTime.ts
function isoTime(message) {
  return {
    kind: "validation",
    type: "iso_time",
    reference: isoTime,
    async: false,
    expects: null,
    requirement: ISO_TIME_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "time", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/isoTimeSecond/isoTimeSecond.ts
function isoTimeSecond(message) {
  return {
    kind: "validation",
    type: "iso_time_second",
    reference: isoTimeSecond,
    async: false,
    expects: null,
    requirement: ISO_TIME_SECOND_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "time-second", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/isoTimestamp/isoTimestamp.ts
function isoTimestamp(message) {
  return {
    kind: "validation",
    type: "iso_timestamp",
    reference: isoTimestamp,
    async: false,
    expects: null,
    requirement: ISO_TIMESTAMP_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "timestamp", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/isoWeek/isoWeek.ts
function isoWeek(message) {
  return {
    kind: "validation",
    type: "iso_week",
    reference: isoWeek,
    async: false,
    expects: null,
    requirement: ISO_WEEK_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "week", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/length/length.ts
function length(requirement, message) {
  return {
    kind: "validation",
    type: "length",
    reference: length,
    async: false,
    expects: `${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.length !== this.requirement) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/mac/mac.ts
function mac(message) {
  return {
    kind: "validation",
    type: "mac",
    reference: mac,
    async: false,
    expects: null,
    requirement: MAC_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "MAC", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/mac48/mac48.ts
function mac48(message) {
  return {
    kind: "validation",
    type: "mac48",
    reference: mac48,
    async: false,
    expects: null,
    requirement: MAC48_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "48-bit MAC", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/mac64/mac64.ts
function mac64(message) {
  return {
    kind: "validation",
    type: "mac64",
    reference: mac64,
    async: false,
    expects: null,
    requirement: MAC64_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "64-bit MAC", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/mapItems/mapItems.ts
function mapItems(operation) {
  return {
    kind: "transformation",
    type: "map_items",
    reference: mapItems,
    async: false,
    operation,
    _run(dataset) {
      dataset.value = dataset.value.map(this.operation);
      return dataset;
    }
  };
}

// src/actions/maxBytes/maxBytes.ts
function maxBytes(requirement, message) {
  return {
    kind: "validation",
    type: "max_bytes",
    reference: maxBytes,
    async: false,
    expects: `<=${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed) {
        const length2 = new TextEncoder().encode(dataset.value).length;
        if (length2 > this.requirement) {
          _addIssue(this, "bytes", dataset, config2, {
            received: `${length2}`
          });
        }
      }
      return dataset;
    }
  };
}

// src/actions/maxLength/maxLength.ts
function maxLength(requirement, message) {
  return {
    kind: "validation",
    type: "max_length",
    reference: maxLength,
    async: false,
    expects: `<=${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.length > this.requirement) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/maxSize/maxSize.ts
function maxSize(requirement, message) {
  return {
    kind: "validation",
    type: "max_size",
    reference: maxSize,
    async: false,
    expects: `<=${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.size > this.requirement) {
        _addIssue(this, "size", dataset, config2, {
          received: `${dataset.value.size}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/maxValue/maxValue.ts
function maxValue(requirement, message) {
  return {
    kind: "validation",
    type: "max_value",
    reference: maxValue,
    async: false,
    expects: `<=${requirement instanceof Date ? requirement.toJSON() : _stringify(requirement)}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value > this.requirement) {
        _addIssue(this, "value", dataset, config2, {
          received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
        });
      }
      return dataset;
    }
  };
}

// src/actions/mimeType/mimeType.ts
function mimeType(requirement, message) {
  return {
    kind: "validation",
    type: "mime_type",
    reference: mimeType,
    async: false,
    expects: requirement.map((option) => `"${option}"`).join(" | ") || "never",
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.includes(dataset.value.type)) {
        _addIssue(this, "MIME type", dataset, config2, {
          received: `"${dataset.value.type}"`
        });
      }
      return dataset;
    }
  };
}

// src/actions/minBytes/minBytes.ts
function minBytes(requirement, message) {
  return {
    kind: "validation",
    type: "min_bytes",
    reference: minBytes,
    async: false,
    expects: `>=${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed) {
        const length2 = new TextEncoder().encode(dataset.value).length;
        if (length2 < this.requirement) {
          _addIssue(this, "bytes", dataset, config2, {
            received: `${length2}`
          });
        }
      }
      return dataset;
    }
  };
}

// src/actions/minLength/minLength.ts
function minLength(requirement, message) {
  return {
    kind: "validation",
    type: "min_length",
    reference: minLength,
    async: false,
    expects: `>=${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.length < this.requirement) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/minSize/minSize.ts
function minSize(requirement, message) {
  return {
    kind: "validation",
    type: "min_size",
    reference: minSize,
    async: false,
    expects: `>=${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.size < this.requirement) {
        _addIssue(this, "size", dataset, config2, {
          received: `${dataset.value.size}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/minValue/minValue.ts
function minValue(requirement, message) {
  return {
    kind: "validation",
    type: "min_value",
    reference: minValue,
    async: false,
    expects: `>=${requirement instanceof Date ? requirement.toJSON() : _stringify(requirement)}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value < this.requirement) {
        _addIssue(this, "value", dataset, config2, {
          received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
        });
      }
      return dataset;
    }
  };
}

// src/actions/multipleOf/multipleOf.ts
function multipleOf(requirement, message) {
  return {
    kind: "validation",
    type: "multiple_of",
    reference: multipleOf,
    async: false,
    expects: `%${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value % this.requirement !== 0) {
        _addIssue(this, "multiple", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/nonEmpty/nonEmpty.ts
function nonEmpty(message) {
  return {
    kind: "validation",
    type: "non_empty",
    reference: nonEmpty,
    async: false,
    expects: "!0",
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.length === 0) {
        _addIssue(this, "length", dataset, config2, {
          received: "0"
        });
      }
      return dataset;
    }
  };
}

// src/actions/normalize/normalize.ts
function normalize(form) {
  return {
    kind: "transformation",
    type: "normalize",
    reference: normalize,
    async: false,
    form,
    _run(dataset) {
      dataset.value = dataset.value.normalize(this.form);
      return dataset;
    }
  };
}

// src/actions/notBytes/notBytes.ts
function notBytes(requirement, message) {
  return {
    kind: "validation",
    type: "not_bytes",
    reference: notBytes,
    async: false,
    expects: `!${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed) {
        const length2 = new TextEncoder().encode(dataset.value).length;
        if (length2 === this.requirement) {
          _addIssue(this, "bytes", dataset, config2, {
            received: `${length2}`
          });
        }
      }
      return dataset;
    }
  };
}

// src/actions/notLength/notLength.ts
function notLength(requirement, message) {
  return {
    kind: "validation",
    type: "not_length",
    reference: notLength,
    async: false,
    expects: `!${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.length === this.requirement) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/notSize/notSize.ts
function notSize(requirement, message) {
  return {
    kind: "validation",
    type: "not_size",
    reference: notSize,
    async: false,
    expects: `!${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.size === this.requirement) {
        _addIssue(this, "size", dataset, config2, {
          received: `${dataset.value.size}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/notValue/notValue.ts
function notValue(requirement, message) {
  return {
    kind: "validation",
    type: "not_value",
    reference: notValue,
    async: false,
    expects: requirement instanceof Date ? `!${requirement.toJSON()}` : `!${_stringify(requirement)}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && this.requirement <= dataset.value && this.requirement >= dataset.value) {
        _addIssue(this, "value", dataset, config2, {
          received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
        });
      }
      return dataset;
    }
  };
}

// src/actions/octal/octal.ts
function octal(message) {
  return {
    kind: "validation",
    type: "octal",
    reference: octal,
    async: false,
    expects: null,
    requirement: OCTAL_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "octal", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/partialCheck/utils/_isPartiallyTyped/_isPartiallyTyped.ts
function _isPartiallyTyped(dataset, pathList) {
  if (dataset.issues) {
    for (const path of pathList) {
      for (const issue of dataset.issues) {
        let typed = false;
        const bound = Math.min(path.length, issue.path?.length ?? 0);
        for (let index = 0; index < bound; index++) {
          if (path[index] !== issue.path[index].key) {
            typed = true;
            break;
          }
        }
        if (!typed) {
          return false;
        }
      }
    }
  }
  return true;
}

// src/actions/partialCheck/partialCheck.ts
function partialCheck(pathList, requirement, message) {
  return {
    kind: "validation",
    type: "partial_check",
    reference: partialCheck,
    async: false,
    expects: null,
    requirement,
    message,
    _run(dataset, config2) {
      if (_isPartiallyTyped(dataset, pathList) && // @ts-expect-error
      !this.requirement(dataset.value)) {
        _addIssue(this, "input", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/partialCheck/partialCheckAsync.ts
function partialCheckAsync(pathList, requirement, message) {
  return {
    kind: "validation",
    type: "partial_check",
    reference: partialCheckAsync,
    async: true,
    expects: null,
    requirement,
    message,
    async _run(dataset, config2) {
      if (_isPartiallyTyped(dataset, pathList) && // @ts-expect-error
      !await this.requirement(dataset.value)) {
        _addIssue(this, "input", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/rawCheck/rawCheck.ts
function rawCheck(action) {
  return {
    kind: "validation",
    type: "raw_check",
    reference: rawCheck,
    async: false,
    expects: null,
    _run(dataset, config2) {
      action({
        dataset,
        config: config2,
        addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info)
      });
      return dataset;
    }
  };
}

// src/actions/rawCheck/rawCheckAsync.ts
function rawCheckAsync(action) {
  return {
    kind: "validation",
    type: "raw_check",
    reference: rawCheckAsync,
    async: true,
    expects: null,
    async _run(dataset, config2) {
      await action({
        dataset,
        config: config2,
        addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info)
      });
      return dataset;
    }
  };
}

// src/actions/rawTransform/rawTransform.ts
function rawTransform(action) {
  return {
    kind: "transformation",
    type: "raw_transform",
    reference: rawTransform,
    async: false,
    _run(dataset, config2) {
      const output = action({
        dataset,
        config: config2,
        addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info),
        NEVER: null
      });
      if (dataset.issues) {
        dataset.typed = false;
      } else {
        dataset.value = output;
      }
      return dataset;
    }
  };
}

// src/actions/rawTransform/rawTransformAsync.ts
function rawTransformAsync(action) {
  return {
    kind: "transformation",
    type: "raw_transform",
    reference: rawTransformAsync,
    async: true,
    async _run(dataset, config2) {
      const output = await action({
        dataset,
        config: config2,
        addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info),
        NEVER: null
      });
      if (dataset.issues) {
        dataset.typed = false;
      } else {
        dataset.value = output;
      }
      return dataset;
    }
  };
}

// src/actions/readonly/readonly.ts
function readonly() {
  return {
    kind: "transformation",
    type: "readonly",
    reference: readonly,
    async: false,
    _run(dataset) {
      return dataset;
    }
  };
}

// src/actions/reduceItems/reduceItems.ts
function reduceItems(operation, initial) {
  return {
    kind: "transformation",
    type: "reduce_items",
    reference: reduceItems,
    async: false,
    operation,
    initial,
    _run(dataset) {
      dataset.value = dataset.value.reduce(this.operation, this.initial);
      return dataset;
    }
  };
}

// src/actions/regex/regex.ts
function regex(requirement, message) {
  return {
    kind: "validation",
    type: "regex",
    reference: regex,
    async: false,
    expects: `${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "format", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/safeInteger/safeInteger.ts
function safeInteger(message) {
  return {
    kind: "validation",
    type: "safe_integer",
    reference: safeInteger,
    async: false,
    expects: null,
    requirement: Number.isSafeInteger,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "safe integer", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/size/size.ts
function size(requirement, message) {
  return {
    kind: "validation",
    type: "size",
    reference: size,
    async: false,
    expects: `${requirement}`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && dataset.value.size !== this.requirement) {
        _addIssue(this, "size", dataset, config2, {
          received: `${dataset.value.size}`
        });
      }
      return dataset;
    }
  };
}

// src/actions/someItem/someItem.ts
function someItem(requirement, message) {
  return {
    kind: "validation",
    type: "some_item",
    reference: someItem,
    async: false,
    expects: null,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !dataset.value.some(this.requirement)) {
        _addIssue(this, "item", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/sortItems/sortItems.ts
function sortItems(operation) {
  return {
    kind: "transformation",
    type: "sort_items",
    reference: sortItems,
    async: false,
    operation,
    _run(dataset) {
      dataset.value = dataset.value.sort(this.operation);
      return dataset;
    }
  };
}

// src/actions/startsWith/startsWith.ts
function startsWith(requirement, message) {
  return {
    kind: "validation",
    type: "starts_with",
    reference: startsWith,
    async: false,
    expects: `"${requirement}"`,
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !dataset.value.startsWith(this.requirement)) {
        _addIssue(this, "start", dataset, config2, {
          received: `"${dataset.value.slice(0, this.requirement.length)}"`
        });
      }
      return dataset;
    }
  };
}

// src/actions/toLowerCase/toLowerCase.ts
function toLowerCase() {
  return {
    kind: "transformation",
    type: "to_lower_case",
    reference: toLowerCase,
    async: false,
    _run(dataset) {
      dataset.value = dataset.value.toLowerCase();
      return dataset;
    }
  };
}

// src/actions/toMaxValue/toMaxValue.ts
function toMaxValue(requirement) {
  return {
    kind: "transformation",
    type: "to_max_value",
    reference: toMaxValue,
    async: false,
    requirement,
    _run(dataset) {
      dataset.value = dataset.value > this.requirement ? this.requirement : dataset.value;
      return dataset;
    }
  };
}

// src/actions/toMinValue/toMinValue.ts
function toMinValue(requirement) {
  return {
    kind: "transformation",
    type: "to_min_value",
    reference: toMinValue,
    async: false,
    requirement,
    _run(dataset) {
      dataset.value = dataset.value < this.requirement ? this.requirement : dataset.value;
      return dataset;
    }
  };
}

// src/actions/toUpperCase/toUpperCase.ts
function toUpperCase() {
  return {
    kind: "transformation",
    type: "to_upper_case",
    reference: toUpperCase,
    async: false,
    _run(dataset) {
      dataset.value = dataset.value.toUpperCase();
      return dataset;
    }
  };
}

// src/actions/transform/transform.ts
function transform(operation) {
  return {
    kind: "transformation",
    type: "transform",
    reference: transform,
    async: false,
    operation,
    _run(dataset) {
      dataset.value = this.operation(dataset.value);
      return dataset;
    }
  };
}

// src/actions/transform/transformAsync.ts
function transformAsync(operation) {
  return {
    kind: "transformation",
    type: "transform",
    reference: transformAsync,
    async: true,
    operation,
    async _run(dataset) {
      dataset.value = await this.operation(dataset.value);
      return dataset;
    }
  };
}

// src/actions/trim/trim.ts
function trim() {
  return {
    kind: "transformation",
    type: "trim",
    reference: trim,
    async: false,
    _run(dataset) {
      dataset.value = dataset.value.trim();
      return dataset;
    }
  };
}

// src/actions/trimEnd/trimEnd.ts
function trimEnd() {
  return {
    kind: "transformation",
    type: "trim_end",
    reference: trimEnd,
    async: false,
    _run(dataset) {
      dataset.value = dataset.value.trimEnd();
      return dataset;
    }
  };
}

// src/actions/trimStart/trimStart.ts
function trimStart() {
  return {
    kind: "transformation",
    type: "trim_start",
    reference: trimStart,
    async: false,
    _run(dataset) {
      dataset.value = dataset.value.trimStart();
      return dataset;
    }
  };
}

// src/actions/ulid/ulid.ts
function ulid(message) {
  return {
    kind: "validation",
    type: "ulid",
    reference: ulid,
    async: false,
    expects: null,
    requirement: ULID_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "ULID", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/url/url.ts
function url(message) {
  return {
    kind: "validation",
    type: "url",
    reference: url,
    async: false,
    expects: null,
    requirement(input) {
      try {
        new URL(input);
        return true;
      } catch {
        return false;
      }
    },
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "URL", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/uuid/uuid.ts
function uuid(message) {
  return {
    kind: "validation",
    type: "uuid",
    reference: uuid,
    async: false,
    expects: null,
    requirement: UUID_REGEX,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "UUID", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/actions/value/value.ts
function value(requirement, message) {
  return {
    kind: "validation",
    type: "value",
    reference: value,
    async: false,
    expects: requirement instanceof Date ? requirement.toJSON() : _stringify(requirement),
    requirement,
    message,
    _run(dataset, config2) {
      if (dataset.typed && !(this.requirement <= dataset.value && this.requirement >= dataset.value)) {
        _addIssue(this, "value", dataset, config2, {
          received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
        });
      }
      return dataset;
    }
  };
}

// src/methods/config/config.ts
function config(schema, config2) {
  return {
    ...schema,
    _run(dataset, config_) {
      return schema._run(dataset, { ...config_, ...config2 });
    }
  };
}

// src/methods/getFallback/getFallback.ts
function getFallback(schema, dataset, config2) {
  return typeof schema.fallback === "function" ? (
    // @ts-expect-error
    schema.fallback(dataset, config2)
  ) : (
    // @ts-expect-error
    schema.fallback
  );
}

// src/methods/fallback/fallback.ts
function fallback(schema, fallback2) {
  return {
    ...schema,
    fallback: fallback2,
    _run(dataset, config2) {
      schema._run(dataset, config2);
      return dataset.issues ? { typed: true, value: getFallback(this, dataset, config2) } : dataset;
    }
  };
}

// src/methods/fallback/fallbackAsync.ts
function fallbackAsync(schema, fallback2) {
  return {
    ...schema,
    fallback: fallback2,
    async: true,
    async _run(dataset, config2) {
      schema._run(dataset, config2);
      return dataset.issues ? (
        // @ts-expect-error
        { typed: true, value: await getFallback(this, dataset, config2) }
      ) : dataset;
    }
  };
}

// src/methods/flatten/flatten.ts
function flatten(issues) {
  const flatErrors = {};
  for (const issue of issues) {
    if (issue.path) {
      const dotPath = getDotPath(issue);
      if (dotPath) {
        if (!flatErrors.nested) {
          flatErrors.nested = {};
        }
        if (flatErrors.nested[dotPath]) {
          flatErrors.nested[dotPath].push(issue.message);
        } else {
          flatErrors.nested[dotPath] = [issue.message];
        }
      } else {
        if (flatErrors.other) {
          flatErrors.other.push(issue.message);
        } else {
          flatErrors.other = [issue.message];
        }
      }
    } else {
      if (flatErrors.root) {
        flatErrors.root.push(issue.message);
      } else {
        flatErrors.root = [issue.message];
      }
    }
  }
  return flatErrors;
}

// src/methods/forward/forward.ts
function forward(action, pathKeys) {
  return {
    ...action,
    _run(dataset, config2) {
      const prevIssues = dataset.issues && [...dataset.issues];
      action._run(dataset, config2);
      if (dataset.issues) {
        for (const issue of dataset.issues) {
          if (!prevIssues?.includes(issue)) {
            let pathInput = dataset.value;
            for (const key of pathKeys) {
              const pathValue = pathInput[key];
              const pathItem = {
                type: "unknown",
                origin: "value",
                input: pathInput,
                key,
                value: pathValue
              };
              if (issue.path) {
                issue.path.push(pathItem);
              } else {
                issue.path = [pathItem];
              }
              if (!pathValue) {
                break;
              }
              pathInput = pathValue;
            }
          }
        }
      }
      return dataset;
    }
  };
}

// src/methods/forward/forwardAsync.ts
function forwardAsync(action, pathKeys) {
  return {
    ...action,
    async: true,
    async _run(dataset, config2) {
      const prevIssues = dataset.issues && [...dataset.issues];
      await action._run(dataset, config2);
      if (dataset.issues) {
        for (const issue of dataset.issues) {
          if (!prevIssues?.includes(issue)) {
            let pathInput = dataset.value;
            for (const key of pathKeys) {
              const pathValue = pathInput[key];
              const pathItem = {
                type: "unknown",
                origin: "value",
                input: pathInput,
                key,
                value: pathValue
              };
              if (issue.path) {
                issue.path.push(pathItem);
              } else {
                issue.path = [pathItem];
              }
              if (!pathValue) {
                break;
              }
              pathInput = pathValue;
            }
          }
        }
      }
      return dataset;
    }
  };
}

// src/methods/getDefault/getDefault.ts
function getDefault(schema, dataset, config2) {
  return typeof schema.default === "function" ? (
    // @ts-expect-error
    schema.default(dataset, config2)
  ) : (
    // @ts-expect-error
    schema.default
  );
}

// src/methods/getDefaults/getDefaults.ts
function getDefaults(schema) {
  if ("entries" in schema) {
    const object2 = {};
    for (const key in schema.entries) {
      object2[key] = getDefaults(schema.entries[key]);
    }
    return object2;
  }
  if ("items" in schema) {
    return schema.items.map(getDefaults);
  }
  return getDefault(schema);
}

// src/methods/getDefaults/getDefaultsAsync.ts
async function getDefaultsAsync(schema) {
  if ("entries" in schema) {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(schema.entries).map(async ([key, value2]) => [
          key,
          await getDefaultsAsync(value2)
        ])
      )
    );
  }
  if ("items" in schema) {
    return Promise.all(schema.items.map(getDefaultsAsync));
  }
  return getDefault(schema);
}

// src/methods/getFallbacks/getFallbacks.ts
function getFallbacks(schema) {
  if ("entries" in schema) {
    const object2 = {};
    for (const key in schema.entries) {
      object2[key] = getFallbacks(schema.entries[key]);
    }
    return object2;
  }
  if ("items" in schema) {
    return schema.items.map(getFallbacks);
  }
  return getFallback(schema);
}

// src/methods/getFallbacks/getFallbacksAsync.ts
async function getFallbacksAsync(schema) {
  if ("entries" in schema) {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(schema.entries).map(async ([key, value2]) => [
          key,
          await getFallbacksAsync(value2)
        ])
      )
    );
  }
  if ("items" in schema) {
    return Promise.all(schema.items.map(getFallbacksAsync));
  }
  return getFallback(schema);
}

// src/methods/is/is.ts
function is(schema, input) {
  return !schema._run({ typed: false, value: input }, { abortEarly: true }).issues;
}

// src/schemas/any/any.ts
function any() {
  return {
    kind: "schema",
    type: "any",
    reference: any,
    expects: "any",
    async: false,
    _run(dataset) {
      dataset.typed = true;
      return dataset;
    }
  };
}

// src/schemas/array/array.ts
function array(item, message) {
  return {
    kind: "schema",
    type: "array",
    reference: array,
    expects: "Array",
    async: false,
    item,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < input.length; key++) {
          const value2 = input[key];
          const itemDataset = this.item._run({ typed: false, value: value2 }, config2);
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/array/arrayAsync.ts
function arrayAsync(item, message) {
  return {
    kind: "schema",
    type: "array",
    reference: arrayAsync,
    expects: "Array",
    async: true,
    item,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        const itemDatasets = await Promise.all(
          input.map((value2) => this.item._run({ typed: false, value: value2 }, config2))
        );
        for (let key = 0; key < itemDatasets.length; key++) {
          const itemDataset = itemDatasets[key];
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: input[key]
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/bigint/bigint.ts
function bigint(message) {
  return {
    kind: "schema",
    type: "bigint",
    reference: bigint,
    expects: "bigint",
    async: false,
    message,
    _run(dataset, config2) {
      if (typeof dataset.value === "bigint") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/blob/blob.ts
function blob(message) {
  return {
    kind: "schema",
    type: "blob",
    reference: blob,
    expects: "Blob",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value instanceof Blob) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/boolean/boolean.ts
function boolean(message) {
  return {
    kind: "schema",
    type: "boolean",
    reference: boolean,
    expects: "boolean",
    async: false,
    message,
    _run(dataset, config2) {
      if (typeof dataset.value === "boolean") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/custom/custom.ts
function custom(check2, message) {
  return {
    kind: "schema",
    type: "custom",
    reference: custom,
    expects: "unknown",
    async: false,
    check: check2,
    message,
    _run(dataset, config2) {
      if (this.check(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/custom/customAsync.ts
function customAsync(check2, message) {
  return {
    kind: "schema",
    type: "custom",
    reference: customAsync,
    expects: "unknown",
    async: true,
    check: check2,
    message,
    async _run(dataset, config2) {
      if (await this.check(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/date/date.ts
function date(message) {
  return {
    kind: "schema",
    type: "date",
    reference: date,
    expects: "Date",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value instanceof Date) {
        if (!isNaN(dataset.value)) {
          dataset.typed = true;
        } else {
          _addIssue(this, "type", dataset, config2, {
            received: '"Invalid Date"'
          });
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/enum/enum.ts
function enum_(enum__, message) {
  const options = Object.entries(enum__).filter(([key]) => isNaN(+key)).map(([, value2]) => value2);
  return {
    kind: "schema",
    type: "enum",
    reference: enum_,
    expects: options.map(_stringify).join(" | ") || "never",
    async: false,
    enum: enum__,
    options,
    message,
    _run(dataset, config2) {
      if (this.options.includes(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/file/file.ts
function file(message) {
  return {
    kind: "schema",
    type: "file",
    reference: file,
    expects: "File",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value instanceof File) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/function/function.ts
function function_(message) {
  return {
    kind: "schema",
    type: "function",
    reference: function_,
    expects: "Function",
    async: false,
    message,
    _run(dataset, config2) {
      if (typeof dataset.value === "function") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/instance/instance.ts
function instance(class_, message) {
  return {
    kind: "schema",
    type: "instance",
    reference: instance,
    expects: class_.name,
    async: false,
    class: class_,
    message,
    _run(dataset, config2) {
      if (dataset.value instanceof this.class) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/intersect/utils/_merge/_merge.ts
function _merge(value1, value2) {
  if (typeof value1 === typeof value2) {
    if (value1 === value2 || value1 instanceof Date && value2 instanceof Date && +value1 === +value2) {
      return { value: value1 };
    }
    if (value1 && value2 && value1.constructor === Object && value2.constructor === Object) {
      for (const key in value2) {
        if (key in value1) {
          const dataset = _merge(value1[key], value2[key]);
          if (dataset.issue) {
            return dataset;
          }
          value1[key] = dataset.value;
        } else {
          value1[key] = value2[key];
        }
      }
      return { value: value1 };
    }
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length === value2.length) {
        for (let index = 0; index < value1.length; index++) {
          const dataset = _merge(value1[index], value2[index]);
          if (dataset.issue) {
            return dataset;
          }
          value1[index] = dataset.value;
        }
        return { value: value1 };
      }
    }
  }
  return { issue: true };
}

// src/schemas/intersect/intersect.ts
function intersect(options, message) {
  return {
    kind: "schema",
    type: "intersect",
    reference: intersect,
    expects: [...new Set(options.map((option) => option.expects))].join(" & ") || "never",
    async: false,
    options,
    message,
    _run(dataset, config2) {
      if (this.options.length) {
        const input = dataset.value;
        let outputs;
        dataset.typed = true;
        for (const schema of this.options) {
          const optionDataset = schema._run(
            { typed: false, value: input },
            config2
          );
          if (optionDataset.issues) {
            if (dataset.issues) {
              dataset.issues.push(...optionDataset.issues);
            } else {
              dataset.issues = optionDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!optionDataset.typed) {
            dataset.typed = false;
          }
          if (dataset.typed) {
            if (outputs) {
              outputs.push(optionDataset.value);
            } else {
              outputs = [optionDataset.value];
            }
          }
        }
        if (dataset.typed) {
          dataset.value = outputs[0];
          for (let index = 1; index < outputs.length; index++) {
            const mergeDataset = _merge(dataset.value, outputs[index]);
            if (mergeDataset.issue) {
              _addIssue(this, "type", dataset, config2, {
                received: "unknown"
              });
              break;
            }
            dataset.value = mergeDataset.value;
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/intersect/intersectAsync.ts
function intersectAsync(options, message) {
  return {
    kind: "schema",
    type: "intersect",
    reference: intersectAsync,
    expects: [...new Set(options.map((option) => option.expects))].join(" & ") || "never",
    async: true,
    options,
    message,
    async _run(dataset, config2) {
      if (this.options.length) {
        const input = dataset.value;
        let outputs;
        dataset.typed = true;
        const optionDatasets = await Promise.all(
          this.options.map(
            (schema) => schema._run({ typed: false, value: input }, config2)
          )
        );
        for (const optionDataset of optionDatasets) {
          if (optionDataset.issues) {
            if (dataset.issues) {
              dataset.issues.push(...optionDataset.issues);
            } else {
              dataset.issues = optionDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!optionDataset.typed) {
            dataset.typed = false;
          }
          if (dataset.typed) {
            if (outputs) {
              outputs.push(optionDataset.value);
            } else {
              outputs = [optionDataset.value];
            }
          }
        }
        if (dataset.typed) {
          dataset.value = outputs[0];
          for (let index = 1; index < outputs.length; index++) {
            const mergeDataset = _merge(dataset.value, outputs[index]);
            if (mergeDataset.issue) {
              _addIssue(this, "type", dataset, config2, {
                received: "unknown"
              });
              break;
            }
            dataset.value = mergeDataset.value;
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/lazy/lazy.ts
function lazy(getter) {
  return {
    kind: "schema",
    type: "lazy",
    reference: lazy,
    expects: "unknown",
    async: false,
    getter,
    _run(dataset, config2) {
      return this.getter(dataset.value)._run(dataset, config2);
    }
  };
}

// src/schemas/lazy/lazyAsync.ts
function lazyAsync(getter) {
  return {
    kind: "schema",
    type: "lazy",
    reference: lazyAsync,
    expects: "unknown",
    async: true,
    getter,
    async _run(dataset, config2) {
      return (await this.getter(dataset.value))._run(dataset, config2);
    }
  };
}

// src/schemas/literal/literal.ts
function literal(literal_, message) {
  return {
    kind: "schema",
    type: "literal",
    reference: literal,
    expects: _stringify(literal_),
    async: false,
    literal: literal_,
    message,
    _run(dataset, config2) {
      if (dataset.value === this.literal) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/looseObject/looseObject.ts
function looseObject(entries, message) {
  return {
    kind: "schema",
    type: "loose_object",
    reference: looseObject,
    expects: "Object",
    async: false,
    entries,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const value2 = input[key];
          const valueDataset = this.entries[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const key in input) {
            if (_isValidObjectKey(input, key) && !(key in this.entries)) {
              dataset.value[key] = input[key];
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/looseObject/looseObjectAsync.ts
function looseObjectAsync(entries, message) {
  return {
    kind: "schema",
    type: "loose_object",
    reference: looseObjectAsync,
    expects: "Object",
    async: true,
    entries,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        const valueDatasets = await Promise.all(
          Object.entries(this.entries).map(async ([key, schema]) => {
            const value2 = input[key];
            return [
              key,
              value2,
              await schema._run({ typed: false, value: value2 }, config2)
            ];
          })
        );
        for (const [key, value2, valueDataset] of valueDatasets) {
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const key in input) {
            if (_isValidObjectKey(input, key) && !(key in this.entries)) {
              dataset.value[key] = input[key];
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/looseTuple/looseTuple.ts
function looseTuple(items, message) {
  return {
    kind: "schema",
    type: "loose_tuple",
    reference: looseTuple,
    expects: "Array",
    async: false,
    items,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < this.items.length; key++) {
          const value2 = input[key];
          const itemDataset = this.items[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (let key = this.items.length; key < input.length; key++) {
            dataset.value.push(input[key]);
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/looseTuple/looseTupleAsync.ts
function looseTupleAsync(items, message) {
  return {
    kind: "schema",
    type: "loose_tuple",
    reference: looseTupleAsync,
    expects: "Array",
    async: true,
    items,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        const itemDatasets = await Promise.all(
          this.items.map(async (item, key) => {
            const value2 = input[key];
            return [
              key,
              value2,
              await item._run({ typed: false, value: value2 }, config2)
            ];
          })
        );
        for (const [key, value2, itemDataset] of itemDatasets) {
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (let key = this.items.length; key < input.length; key++) {
            dataset.value.push(input[key]);
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/map/map.ts
function map(key, value2, message) {
  return {
    kind: "schema",
    type: "map",
    reference: map,
    expects: "Map",
    async: false,
    key,
    value: value2,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input instanceof Map) {
        dataset.typed = true;
        dataset.value = /* @__PURE__ */ new Map();
        for (const [inputKey, inputValue] of input) {
          const keyDataset = this.key._run(
            { typed: false, value: inputKey },
            config2
          );
          if (keyDataset.issues) {
            const pathItem = {
              type: "map",
              origin: "key",
              input,
              key: inputKey,
              value: inputValue
            };
            for (const issue of keyDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = keyDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          const valueDataset = this.value._run(
            { typed: false, value: inputValue },
            config2
          );
          if (valueDataset.issues) {
            const pathItem = {
              type: "map",
              origin: "value",
              input,
              key: inputKey,
              value: inputValue
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!keyDataset.typed || !valueDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.set(keyDataset.value, valueDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/map/mapAsync.ts
function mapAsync(key, value2, message) {
  return {
    kind: "schema",
    type: "map",
    reference: mapAsync,
    expects: "Map",
    async: true,
    key,
    value: value2,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input instanceof Map) {
        dataset.typed = true;
        dataset.value = /* @__PURE__ */ new Map();
        const datasets = await Promise.all(
          [...input].map(
            ([inputKey, inputValue]) => Promise.all([
              inputKey,
              inputValue,
              this.key._run({ typed: false, value: inputKey }, config2),
              this.value._run({ typed: false, value: inputValue }, config2)
            ])
          )
        );
        for (const [
          inputKey,
          inputValue,
          keyDataset,
          valueDataset
        ] of datasets) {
          if (keyDataset.issues) {
            const pathItem = {
              type: "map",
              origin: "key",
              input,
              key: inputKey,
              value: inputValue
            };
            for (const issue of keyDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = keyDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (valueDataset.issues) {
            const pathItem = {
              type: "map",
              origin: "value",
              input,
              key: inputKey,
              value: inputValue
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!keyDataset.typed || !valueDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.set(keyDataset.value, valueDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/nan/nan.ts
function nan(message) {
  return {
    kind: "schema",
    type: "nan",
    reference: nan,
    expects: "NaN",
    async: false,
    message,
    _run(dataset, config2) {
      if (Number.isNaN(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/never/never.ts
function never(message) {
  return {
    kind: "schema",
    type: "never",
    reference: never,
    expects: "never",
    async: false,
    message,
    _run(dataset, config2) {
      _addIssue(this, "type", dataset, config2);
      return dataset;
    }
  };
}

// src/schemas/nonNullable/nonNullable.ts
function nonNullable(wrapped, message) {
  return {
    kind: "schema",
    type: "non_nullable",
    reference: nonNullable,
    expects: "!null",
    async: false,
    wrapped,
    message,
    _run(dataset, config2) {
      if (dataset.value === null) {
        _addIssue(this, "type", dataset, config2);
        return dataset;
      }
      return this.wrapped._run(dataset, config2);
    }
  };
}

// src/schemas/nonNullable/nonNullableAsync.ts
function nonNullableAsync(wrapped, message) {
  return {
    kind: "schema",
    type: "non_nullable",
    reference: nonNullableAsync,
    expects: "!null",
    async: true,
    wrapped,
    message,
    async _run(dataset, config2) {
      if (dataset.value === null) {
        _addIssue(this, "type", dataset, config2);
        return dataset;
      }
      return this.wrapped._run(dataset, config2);
    }
  };
}

// src/schemas/nonNullish/nonNullish.ts
function nonNullish(wrapped, message) {
  return {
    kind: "schema",
    type: "non_nullish",
    reference: nonNullish,
    expects: "!null & !undefined",
    async: false,
    wrapped,
    message,
    _run(dataset, config2) {
      if (dataset.value === null || dataset.value === void 0) {
        _addIssue(this, "type", dataset, config2);
        return dataset;
      }
      return this.wrapped._run(dataset, config2);
    }
  };
}

// src/schemas/nonNullish/nonNullishAsync.ts
function nonNullishAsync(wrapped, message) {
  return {
    kind: "schema",
    type: "non_nullish",
    reference: nonNullishAsync,
    expects: "!null & !undefined",
    async: true,
    wrapped,
    message,
    async _run(dataset, config2) {
      if (dataset.value === null || dataset.value === void 0) {
        _addIssue(this, "type", dataset, config2);
        return dataset;
      }
      return this.wrapped._run(dataset, config2);
    }
  };
}

// src/schemas/nonOptional/nonOptional.ts
function nonOptional(wrapped, message) {
  return {
    kind: "schema",
    type: "non_optional",
    reference: nonOptional,
    expects: "!undefined",
    async: false,
    wrapped,
    message,
    _run(dataset, config2) {
      if (dataset.value === void 0) {
        _addIssue(this, "type", dataset, config2);
        return dataset;
      }
      return this.wrapped._run(dataset, config2);
    }
  };
}

// src/schemas/nonOptional/nonOptionalAsync.ts
function nonOptionalAsync(wrapped, message) {
  return {
    kind: "schema",
    type: "non_optional",
    reference: nonOptionalAsync,
    expects: "!undefined",
    async: true,
    wrapped,
    message,
    async _run(dataset, config2) {
      if (dataset.value === void 0) {
        _addIssue(this, "type", dataset, config2);
        return dataset;
      }
      return this.wrapped._run(dataset, config2);
    }
  };
}

// src/schemas/null/null.ts
function null_(message) {
  return {
    kind: "schema",
    type: "null",
    reference: null_,
    expects: "null",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value === null) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/nullable/nullable.ts
function nullable(wrapped, ...args) {
  const schema = {
    kind: "schema",
    type: "nullable",
    reference: nullable,
    expects: `${wrapped.expects} | null`,
    async: false,
    wrapped,
    _run(dataset, config2) {
      if (dataset.value === null) {
        if ("default" in this) {
          dataset.value = getDefault(
            this,
            dataset,
            config2
          );
        }
        if (dataset.value === null) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped._run(dataset, config2);
    }
  };
  if (0 in args) {
    schema.default = args[0];
  }
  return schema;
}

// src/schemas/nullable/nullableAsync.ts
function nullableAsync(wrapped, ...args) {
  const schema = {
    kind: "schema",
    type: "nullable",
    reference: nullableAsync,
    expects: `${wrapped.expects} | null`,
    async: true,
    wrapped,
    async _run(dataset, config2) {
      if (dataset.value === null) {
        if ("default" in this) {
          dataset.value = await getDefault(
            this,
            dataset,
            config2
          );
        }
        if (dataset.value === null) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped._run(dataset, config2);
    }
  };
  if (0 in args) {
    schema.default = args[0];
  }
  return schema;
}

// src/schemas/nullish/nullish.ts
function nullish(wrapped, ...args) {
  const schema = {
    kind: "schema",
    type: "nullish",
    reference: nullish,
    expects: `${wrapped.expects} | null | undefined`,
    async: false,
    wrapped,
    _run(dataset, config2) {
      if (dataset.value === null || dataset.value === void 0) {
        if ("default" in this) {
          dataset.value = getDefault(
            this,
            dataset,
            config2
          );
        }
        if (dataset.value === null || dataset.value === void 0) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped._run(dataset, config2);
    }
  };
  if (0 in args) {
    schema.default = args[0];
  }
  return schema;
}

// src/schemas/nullish/nullishAsync.ts
function nullishAsync(wrapped, ...args) {
  const schema = {
    kind: "schema",
    type: "nullish",
    reference: nullishAsync,
    expects: `${wrapped.expects} | null | undefined`,
    async: true,
    wrapped,
    async _run(dataset, config2) {
      if (dataset.value === null || dataset.value === void 0) {
        if ("default" in this) {
          dataset.value = await getDefault(
            this,
            dataset,
            config2
          );
        }
        if (dataset.value === null || dataset.value === void 0) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped._run(dataset, config2);
    }
  };
  if (0 in args) {
    schema.default = args[0];
  }
  return schema;
}

// src/schemas/number/number.ts
function number(message) {
  return {
    kind: "schema",
    type: "number",
    reference: number,
    expects: "number",
    async: false,
    message,
    _run(dataset, config2) {
      if (typeof dataset.value === "number" && !isNaN(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/object/object.ts
function object(entries, message) {
  return {
    kind: "schema",
    type: "object",
    reference: object,
    expects: "Object",
    async: false,
    entries,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const value2 = input[key];
          const valueDataset = this.entries[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/object/objectAsync.ts
function objectAsync(entries, message) {
  return {
    kind: "schema",
    type: "object",
    reference: objectAsync,
    expects: "Object",
    async: true,
    entries,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        const valueDatasets = await Promise.all(
          Object.entries(this.entries).map(async ([key, schema]) => {
            const value2 = input[key];
            return [
              key,
              value2,
              await schema._run({ typed: false, value: value2 }, config2)
            ];
          })
        );
        for (const [key, value2, valueDataset] of valueDatasets) {
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/objectWithRest/objectWithRest.ts
function objectWithRest(entries, rest, message) {
  return {
    kind: "schema",
    type: "object_with_rest",
    reference: objectWithRest,
    expects: "Object",
    async: false,
    entries,
    rest,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const value2 = input[key];
          const valueDataset = this.entries[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const key in input) {
            if (_isValidObjectKey(input, key) && !(key in this.entries)) {
              const value2 = input[key];
              const valueDataset = this.rest._run(
                { typed: false, value: value2 },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              dataset.value[key] = valueDataset.value;
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/objectWithRest/objectWithRestAsync.ts
function objectWithRestAsync(entries, rest, message) {
  return {
    kind: "schema",
    type: "object_with_rest",
    reference: objectWithRestAsync,
    expects: "Object",
    async: true,
    entries,
    rest,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        const [normalDatasets, restDatasets] = await Promise.all([
          // Parse schema of each normal entry
          Promise.all(
            Object.entries(this.entries).map(async ([key, schema]) => {
              const value2 = input[key];
              return [
                key,
                value2,
                await schema._run({ typed: false, value: value2 }, config2)
              ];
            })
          ),
          // Parse other entries with rest schema
          Promise.all(
            Object.entries(input).filter(
              ([key]) => _isValidObjectKey(input, key) && !(key in this.entries)
            ).map(
              async ([key, value2]) => [
                key,
                value2,
                await this.rest._run({ typed: false, value: value2 }, config2)
              ]
            )
          )
        ]);
        for (const [key, value2, valueDataset] of normalDatasets) {
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const [key, value2, valueDataset] of restDatasets) {
            if (valueDataset.issues) {
              const pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value2
              };
              for (const issue of valueDataset.issues) {
                if (issue.path) {
                  issue.path.unshift(pathItem);
                } else {
                  issue.path = [pathItem];
                }
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = valueDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!valueDataset.typed) {
              dataset.typed = false;
            }
            dataset.value[key] = valueDataset.value;
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/optional/optional.ts
function optional(wrapped, ...args) {
  const schema = {
    kind: "schema",
    type: "optional",
    reference: optional,
    expects: `${wrapped.expects} | undefined`,
    async: false,
    wrapped,
    _run(dataset, config2) {
      if (dataset.value === void 0) {
        if ("default" in this) {
          dataset.value = getDefault(
            this,
            dataset,
            config2
          );
        }
        if (dataset.value === void 0) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped._run(dataset, config2);
    }
  };
  if (0 in args) {
    schema.default = args[0];
  }
  return schema;
}

// src/schemas/optional/optionalAsync.ts
function optionalAsync(wrapped, ...args) {
  const schema = {
    kind: "schema",
    type: "optional",
    reference: optionalAsync,
    expects: `${wrapped.expects} | undefined`,
    async: true,
    wrapped,
    async _run(dataset, config2) {
      if (dataset.value === void 0) {
        if ("default" in this) {
          dataset.value = await getDefault(
            this,
            dataset,
            config2
          );
        }
        if (dataset.value === void 0) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped._run(dataset, config2);
    }
  };
  if (0 in args) {
    schema.default = args[0];
  }
  return schema;
}

// src/schemas/picklist/picklist.ts
function picklist(options, message) {
  return {
    kind: "schema",
    type: "picklist",
    reference: picklist,
    expects: options.map(_stringify).join(" | ") || "never",
    async: false,
    options,
    message,
    _run(dataset, config2) {
      if (this.options.includes(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/promise/promise.ts
function promise(message) {
  return {
    kind: "schema",
    type: "promise",
    reference: promise,
    expects: "Promise",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value instanceof Promise) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/record/record.ts
function record(key, value2, message) {
  return {
    kind: "schema",
    type: "record",
    reference: record,
    expects: "Object",
    async: false,
    key,
    value: value2,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const entryKey in input) {
          if (_isValidObjectKey(input, entryKey)) {
            const entryValue = input[entryKey];
            const keyDataset = this.key._run(
              { typed: false, value: entryKey },
              config2
            );
            if (keyDataset.issues) {
              const pathItem = {
                type: "object",
                origin: "key",
                input,
                key: entryKey,
                value: entryValue
              };
              for (const issue of keyDataset.issues) {
                issue.path = [pathItem];
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = keyDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            const valueDataset = this.value._run(
              { typed: false, value: entryValue },
              config2
            );
            if (valueDataset.issues) {
              const pathItem = {
                type: "object",
                origin: "value",
                input,
                key: entryKey,
                value: entryValue
              };
              for (const issue of valueDataset.issues) {
                if (issue.path) {
                  issue.path.unshift(pathItem);
                } else {
                  issue.path = [pathItem];
                }
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = valueDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!keyDataset.typed || !valueDataset.typed) {
              dataset.typed = false;
            }
            if (keyDataset.typed) {
              dataset.value[keyDataset.value] = valueDataset.value;
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/record/recordAsync.ts
function recordAsync(key, value2, message) {
  return {
    kind: "schema",
    type: "record",
    reference: recordAsync,
    expects: "Object",
    async: true,
    key,
    value: value2,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        const datasets = await Promise.all(
          Object.entries(input).filter(([key2]) => _isValidObjectKey(input, key2)).map(
            ([entryKey, entryValue]) => Promise.all([
              entryKey,
              entryValue,
              this.key._run({ typed: false, value: entryKey }, config2),
              this.value._run({ typed: false, value: entryValue }, config2)
            ])
          )
        );
        for (const [
          entryKey,
          entryValue,
          keyDataset,
          valueDataset
        ] of datasets) {
          if (keyDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "key",
              input,
              key: entryKey,
              value: entryValue
            };
            for (const issue of keyDataset.issues) {
              issue.path = [pathItem];
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = keyDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key: entryKey,
              value: entryValue
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!keyDataset.typed || !valueDataset.typed) {
            dataset.typed = false;
          }
          if (keyDataset.typed) {
            dataset.value[keyDataset.value] = valueDataset.value;
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/set/set.ts
function set(value2, message) {
  return {
    kind: "schema",
    type: "set",
    reference: set,
    expects: "Set",
    async: false,
    value: value2,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input instanceof Set) {
        dataset.typed = true;
        dataset.value = /* @__PURE__ */ new Set();
        for (const inputValue of input) {
          const valueDataset = this.value._run(
            { typed: false, value: inputValue },
            config2
          );
          if (valueDataset.issues) {
            const pathItem = {
              type: "set",
              origin: "value",
              input,
              key: null,
              value: inputValue
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.add(valueDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/set/setAsync.ts
function setAsync(value2, message) {
  return {
    kind: "schema",
    type: "set",
    reference: setAsync,
    expects: "Set",
    async: true,
    value: value2,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input instanceof Set) {
        dataset.typed = true;
        dataset.value = /* @__PURE__ */ new Set();
        const valueDatasets = await Promise.all(
          [...input].map(
            async (inputValue) => [
              inputValue,
              await this.value._run(
                { typed: false, value: inputValue },
                config2
              )
            ]
          )
        );
        for (const [inputValue, valueDataset] of valueDatasets) {
          if (valueDataset.issues) {
            const pathItem = {
              type: "set",
              origin: "value",
              input,
              key: null,
              value: inputValue
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.add(valueDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/strictObject/strictObject.ts
function strictObject(entries, message) {
  return {
    kind: "schema",
    type: "strict_object",
    reference: strictObject,
    expects: "Object",
    async: false,
    entries,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const value2 = input[key];
          const valueDataset = this.entries[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const key in input) {
            if (!(key in this.entries)) {
              const value2 = input[key];
              _addIssue(this, "type", dataset, config2, {
                input: value2,
                expected: "never",
                path: [
                  {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value2
                  }
                ]
              });
              break;
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/strictObject/strictObjectAsync.ts
function strictObjectAsync(entries, message) {
  return {
    kind: "schema",
    type: "strict_object",
    reference: strictObjectAsync,
    expects: "Object",
    async: true,
    entries,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        const valueDatasets = await Promise.all(
          Object.entries(this.entries).map(async ([key, schema]) => {
            const value2 = input[key];
            return [
              key,
              value2,
              await schema._run({ typed: false, value: value2 }, config2)
            ];
          })
        );
        for (const [key, value2, valueDataset] of valueDatasets) {
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = valueDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!valueDataset.typed) {
            dataset.typed = false;
          }
          if (valueDataset.value !== void 0 || key in input) {
            dataset.value[key] = valueDataset.value;
          }
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const key in input) {
            if (!(key in this.entries)) {
              const value2 = input[key];
              _addIssue(this, "type", dataset, config2, {
                input: value2,
                expected: "never",
                path: [
                  {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value2
                  }
                ]
              });
              break;
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/strictTuple/strictTuple.ts
function strictTuple(items, message) {
  return {
    kind: "schema",
    type: "strict_tuple",
    reference: strictTuple,
    expects: "Array",
    async: false,
    items,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < this.items.length; key++) {
          const value2 = input[key];
          const itemDataset = this.items[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
        if (!(dataset.issues && config2.abortEarly) && this.items.length < input.length) {
          const value2 = input[items.length];
          _addIssue(this, "type", dataset, config2, {
            input: value2,
            expected: "never",
            path: [
              {
                type: "array",
                origin: "value",
                input,
                key: this.items.length,
                value: value2
              }
            ]
          });
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/strictTuple/strictTupleAsync.ts
function strictTupleAsync(items, message) {
  return {
    kind: "schema",
    type: "strict_tuple",
    reference: strictTupleAsync,
    expects: "Array",
    async: true,
    items,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        const itemDatasets = await Promise.all(
          this.items.map(async (item, key) => {
            const value2 = input[key];
            return [
              key,
              value2,
              await item._run({ typed: false, value: value2 }, config2)
            ];
          })
        );
        for (const [key, value2, itemDataset] of itemDatasets) {
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
        if (!(dataset.issues && config2.abortEarly) && this.items.length < input.length) {
          const value2 = input[items.length];
          _addIssue(this, "type", dataset, config2, {
            input: value2,
            expected: "never",
            path: [
              {
                type: "array",
                origin: "value",
                input,
                key: this.items.length,
                value: value2
              }
            ]
          });
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/string/string.ts
function string(message) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: false,
    message,
    _run(dataset, config2) {
      if (typeof dataset.value === "string") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/symbol/symbol.ts
function symbol(message) {
  return {
    kind: "schema",
    type: "symbol",
    reference: symbol,
    expects: "symbol",
    async: false,
    message,
    _run(dataset, config2) {
      if (typeof dataset.value === "symbol") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/tuple/tuple.ts
function tuple(items, message) {
  return {
    kind: "schema",
    type: "tuple",
    reference: tuple,
    expects: "Array",
    async: false,
    items,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < this.items.length; key++) {
          const value2 = input[key];
          const itemDataset = this.items[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/tuple/tupleAsync.ts
function tupleAsync(items, message) {
  return {
    kind: "schema",
    type: "tuple",
    reference: tupleAsync,
    expects: "Array",
    async: true,
    items,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        const itemDatasets = await Promise.all(
          this.items.map(async (item, key) => {
            const value2 = input[key];
            return [
              key,
              value2,
              await item._run({ typed: false, value: value2 }, config2)
            ];
          })
        );
        for (const [key, value2, itemDataset] of itemDatasets) {
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/tupleWithRest/tupleWithRest.ts
function tupleWithRest(items, rest, message) {
  return {
    kind: "schema",
    type: "tuple_with_rest",
    reference: tupleWithRest,
    expects: "Array",
    async: false,
    items,
    rest,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < this.items.length; key++) {
          const value2 = input[key];
          const itemDataset = this.items[key]._run(
            { typed: false, value: value2 },
            config2
          );
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (let key = this.items.length; key < input.length; key++) {
            const value2 = input[key];
            const itemDataset = this.rest._run({ typed: false, value: value2 }, config2);
            if (itemDataset.issues) {
              const pathItem = {
                type: "array",
                origin: "value",
                input,
                key,
                value: value2
              };
              for (const issue of itemDataset.issues) {
                if (issue.path) {
                  issue.path.unshift(pathItem);
                } else {
                  issue.path = [pathItem];
                }
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = itemDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!itemDataset.typed) {
              dataset.typed = false;
            }
            dataset.value.push(itemDataset.value);
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/tupleWithRest/tupleWithRestAsync.ts
function tupleWithRestAsync(items, rest, message) {
  return {
    kind: "schema",
    type: "tuple_with_rest",
    reference: tupleWithRestAsync,
    expects: "Array",
    async: true,
    items,
    rest,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        const [normalDatasets, restDatasets] = await Promise.all([
          // Parse schema of each normal item
          Promise.all(
            this.items.map(async (item, key) => {
              const value2 = input[key];
              return [
                key,
                value2,
                await item._run({ typed: false, value: value2 }, config2)
              ];
            })
          ),
          // Parse other items with rest schema
          Promise.all(
            input.slice(this.items.length).map(async (value2, key) => {
              return [
                key + this.items.length,
                value2,
                await this.rest._run({ typed: false, value: value2 }, config2)
              ];
            })
          )
        ]);
        for (const [key, value2, itemDataset] of normalDatasets) {
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
        if (!dataset.issues || !config2.abortEarly) {
          for (const [key, value2, itemDataset] of restDatasets) {
            if (itemDataset.issues) {
              const pathItem = {
                type: "array",
                origin: "value",
                input,
                key,
                value: value2
              };
              for (const issue of itemDataset.issues) {
                if (issue.path) {
                  issue.path.unshift(pathItem);
                } else {
                  issue.path = [pathItem];
                }
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = itemDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!itemDataset.typed) {
              dataset.typed = false;
            }
            dataset.value.push(itemDataset.value);
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/undefined/undefined.ts
function undefined_(message) {
  return {
    kind: "schema",
    type: "undefined",
    reference: undefined_,
    expects: "undefined",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value === void 0) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/union/utils/_subIssues/_subIssues.ts
function _subIssues(datasets) {
  let issues;
  if (datasets) {
    for (const dataset of datasets) {
      if (issues) {
        issues.push(...dataset.issues);
      } else {
        issues = dataset.issues;
      }
    }
  }
  return issues;
}

// src/schemas/union/union.ts
function union(options, message) {
  return {
    kind: "schema",
    type: "union",
    reference: union,
    expects: [...new Set(options.map((option) => option.expects))].join(" | ") || "never",
    async: false,
    options,
    message,
    _run(dataset, config2) {
      let validDataset;
      let typedDatasets;
      let untypedDatasets;
      for (const schema of this.options) {
        const optionDataset = schema._run(
          { typed: false, value: dataset.value },
          config2
        );
        if (optionDataset.typed) {
          if (optionDataset.issues) {
            if (typedDatasets) {
              typedDatasets.push(optionDataset);
            } else {
              typedDatasets = [optionDataset];
            }
          } else {
            validDataset = optionDataset;
            break;
          }
        } else {
          if (untypedDatasets) {
            untypedDatasets.push(optionDataset);
          } else {
            untypedDatasets = [optionDataset];
          }
        }
      }
      if (validDataset) {
        return validDataset;
      }
      if (typedDatasets) {
        if (typedDatasets.length === 1) {
          return typedDatasets[0];
        }
        _addIssue(this, "type", dataset, config2, {
          issues: _subIssues(typedDatasets)
        });
        dataset.typed = true;
      } else if (untypedDatasets?.length === 1) {
        return untypedDatasets[0];
      } else {
        _addIssue(this, "type", dataset, config2, {
          issues: _subIssues(untypedDatasets)
        });
      }
      return dataset;
    }
  };
}

// src/schemas/union/unionAsync.ts
function unionAsync(options, message) {
  return {
    kind: "schema",
    type: "union",
    reference: unionAsync,
    expects: [...new Set(options.map((option) => option.expects))].join(" | ") || "never",
    async: true,
    options,
    message,
    async _run(dataset, config2) {
      let validDataset;
      let typedDatasets;
      let untypedDatasets;
      for (const schema of this.options) {
        const optionDataset = await schema._run(
          { typed: false, value: dataset.value },
          config2
        );
        if (optionDataset.typed) {
          if (optionDataset.issues) {
            if (typedDatasets) {
              typedDatasets.push(optionDataset);
            } else {
              typedDatasets = [optionDataset];
            }
          } else {
            validDataset = optionDataset;
            break;
          }
        } else {
          if (untypedDatasets) {
            untypedDatasets.push(optionDataset);
          } else {
            untypedDatasets = [optionDataset];
          }
        }
      }
      if (validDataset) {
        return validDataset;
      }
      if (typedDatasets) {
        if (typedDatasets.length === 1) {
          return typedDatasets[0];
        }
        _addIssue(this, "type", dataset, config2, {
          issues: _subIssues(typedDatasets)
        });
        dataset.typed = true;
      } else if (untypedDatasets?.length === 1) {
        return untypedDatasets[0];
      } else {
        _addIssue(this, "type", dataset, config2, {
          issues: _subIssues(untypedDatasets)
        });
      }
      return dataset;
    }
  };
}

// src/schemas/unknown/unknown.ts
function unknown() {
  return {
    kind: "schema",
    type: "unknown",
    reference: unknown,
    expects: "unknown",
    async: false,
    _run(dataset) {
      dataset.typed = true;
      return dataset;
    }
  };
}

// src/schemas/variant/utils/_discriminators/_discriminators.ts
function _discriminators(key, options, set2 = /* @__PURE__ */ new Set()) {
  for (const schema of options) {
    if (schema.type === "variant") {
      _discriminators(key, schema.options, set2);
    } else {
      set2.add(schema.entries[key].expects);
    }
  }
  return set2;
}

// src/schemas/variant/variant.ts
function variant(key, options, message) {
  let expectedDiscriminators;
  return {
    kind: "schema",
    type: "variant",
    reference: variant,
    expects: "Object",
    async: false,
    key,
    options,
    message,
    _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        const discriminator = input[this.key];
        if (this.key in input) {
          let outputDataset;
          for (const schema of this.options) {
            if (schema.type === "variant" || !schema.entries[this.key]._run(
              { typed: false, value: discriminator },
              config2
            ).issues) {
              const optionDataset = schema._run(
                { typed: false, value: input },
                config2
              );
              if (!optionDataset.issues) {
                return optionDataset;
              }
              if (!outputDataset || !outputDataset.typed && optionDataset.typed) {
                outputDataset = optionDataset;
              }
            }
          }
          if (outputDataset) {
            return outputDataset;
          }
        }
        if (!expectedDiscriminators) {
          expectedDiscriminators = [..._discriminators(this.key, this.options)].join(" | ") || "never";
        }
        _addIssue(this, "type", dataset, config2, {
          input: discriminator,
          expected: expectedDiscriminators,
          path: [
            {
              type: "object",
              origin: "value",
              input,
              key: this.key,
              value: discriminator
            }
          ]
        });
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/variant/variantAsync.ts
function variantAsync(key, options, message) {
  let expectedDiscriminators;
  return {
    kind: "schema",
    type: "variant",
    reference: variantAsync,
    expects: "Object",
    async: true,
    key,
    options,
    message,
    async _run(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        const discriminator = input[this.key];
        if (this.key in input) {
          let outputDataset;
          for (const schema of this.options) {
            if (schema.type === "variant" || !(await schema.entries[this.key]._run(
              { typed: false, value: discriminator },
              config2
            )).issues) {
              const optionDataset = await schema._run(
                { typed: false, value: input },
                config2
              );
              if (!optionDataset.issues) {
                return optionDataset;
              }
              if (!outputDataset || !outputDataset.typed && optionDataset.typed) {
                outputDataset = optionDataset;
              }
            }
          }
          if (outputDataset) {
            return outputDataset;
          }
        }
        if (!expectedDiscriminators) {
          expectedDiscriminators = [..._discriminators(this.key, this.options)].join(" | ") || "never";
        }
        _addIssue(this, "type", dataset, config2, {
          input: discriminator,
          expected: expectedDiscriminators,
          path: [
            {
              type: "object",
              origin: "value",
              input,
              key: this.key,
              value: discriminator
            }
          ]
        });
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/schemas/void/void.ts
function void_(message) {
  return {
    kind: "schema",
    type: "void",
    reference: void_,
    expects: "void",
    async: false,
    message,
    _run(dataset, config2) {
      if (dataset.value === void 0) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}

// src/methods/keyof/keyof.ts
function keyof(schema, message) {
  return picklist(Object.keys(schema.entries), message);
}

// src/methods/omit/omit.ts
function omit(schema, keys) {
  const entries = {
    ...schema.entries
  };
  for (const key of keys) {
    delete entries[key];
  }
  return { ...schema, entries };
}

// src/methods/parse/parse.ts
function parse(schema, input, config2) {
  const dataset = schema._run(
    { typed: false, value: input },
    getGlobalConfig(config2)
  );
  if (dataset.issues) {
    throw new ValiError(dataset.issues);
  }
  return dataset.value;
}

// src/methods/parse/parseAsync.ts
async function parseAsync(schema, input, config2) {
  const dataset = await schema._run(
    { typed: false, value: input },
    getGlobalConfig(config2)
  );
  if (dataset.issues) {
    throw new ValiError(dataset.issues);
  }
  return dataset.value;
}

// src/methods/parser/parser.ts
function parser(schema, config2) {
  const func = (input) => parse(schema, input, config2);
  func.schema = schema;
  func.config = config2;
  return func;
}

// src/methods/parser/parserAsync.ts
function parserAsync(schema, config2) {
  const func = (input) => parseAsync(schema, input, config2);
  func.schema = schema;
  func.config = config2;
  return func;
}

// src/methods/partial/partial.ts
function partial(schema, keys) {
  const entries = {};
  for (const key in schema.entries) {
    entries[key] = !keys || keys.includes(key) ? optional(schema.entries[key]) : schema.entries[key];
  }
  return { ...schema, entries };
}

// src/methods/partial/partialAsync.ts
function partialAsync(schema, keys) {
  const entries = {};
  for (const key in schema.entries) {
    entries[key] = !keys || keys.includes(key) ? optionalAsync(schema.entries[key]) : schema.entries[key];
  }
  return { ...schema, entries };
}

// src/methods/pick/pick.ts
function pick(schema, keys) {
  const entries = {};
  for (const key of keys) {
    entries[key] = schema.entries[key];
  }
  return { ...schema, entries };
}

// src/methods/pipe/pipe.ts
function pipe(...pipe2) {
  return {
    ...pipe2[0],
    pipe: pipe2,
    _run(dataset, config2) {
      for (let index = 0; index < pipe2.length; index++) {
        if (dataset.issues && (pipe2[index].kind === "schema" || pipe2[index].kind === "transformation")) {
          dataset.typed = false;
          break;
        }
        if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
          dataset = pipe2[index]._run(dataset, config2);
        }
      }
      return dataset;
    }
  };
}

// src/methods/pipe/pipeAsync.ts
function pipeAsync(...pipe2) {
  return {
    ...pipe2[0],
    pipe: pipe2,
    async: true,
    async _run(dataset, config2) {
      for (let index = 0; index < pipe2.length; index++) {
        if (dataset.issues && (pipe2[index].kind === "schema" || pipe2[index].kind === "transformation")) {
          dataset.typed = false;
          break;
        }
        if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
          dataset = await pipe2[index]._run(dataset, config2);
        }
      }
      return dataset;
    }
  };
}

// src/methods/required/required.ts
function required(schema, arg2, arg3) {
  const keys = Array.isArray(arg2) ? arg2 : void 0;
  const message = Array.isArray(arg2) ? arg3 : arg2;
  const entries = {};
  for (const key in schema.entries) {
    entries[key] = !keys || keys.includes(key) ? nonOptional(schema.entries[key], message) : schema.entries[key];
  }
  return { ...schema, entries };
}

// src/methods/required/requiredAsync.ts
function requiredAsync(schema, arg2, arg3) {
  const keys = Array.isArray(arg2) ? arg2 : void 0;
  const message = Array.isArray(arg2) ? arg3 : arg2;
  const entries = {};
  for (const key in schema.entries) {
    entries[key] = !keys || keys.includes(key) ? nonOptionalAsync(schema.entries[key], message) : schema.entries[key];
  }
  return { ...schema, entries };
}

// src/methods/safeParse/safeParse.ts
function safeParse(schema, input, config2) {
  const dataset = schema._run(
    { typed: false, value: input },
    getGlobalConfig(config2)
  );
  return {
    typed: dataset.typed,
    success: !dataset.issues,
    output: dataset.value,
    issues: dataset.issues
  };
}

// src/methods/safeParse/safeParseAsync.ts
async function safeParseAsync(schema, input, config2) {
  const dataset = await schema._run(
    { typed: false, value: input },
    getGlobalConfig(config2)
  );
  return {
    typed: dataset.typed,
    success: !dataset.issues,
    output: dataset.value,
    issues: dataset.issues
  };
}

// src/methods/safeParser/safeParser.ts
function safeParser(schema, config2) {
  const func = (input) => safeParse(schema, input, config2);
  func.schema = schema;
  func.config = config2;
  return func;
}

// src/methods/safeParser/safeParserAsync.ts
function safeParserAsync(schema, config2) {
  const func = (input) => safeParseAsync(schema, input, config2);
  func.schema = schema;
  func.config = config2;
  return func;
}

// src/methods/unwrap/unwrap.ts
function unwrap(schema) {
  return schema.wrapped;
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**********************************************************************************************************************************!*\
  !*** ../../../node_modules/.pnpm/@sentry+webpack-plugin@1.20.0/node_modules/@sentry/webpack-plugin/src/sentry-webpack.module.js ***!
  \**********************************************************************************************************************************/
var _global = (typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {}); _global.SENTRY_RELEASE={id:"25.5.22.0"};
      _global.SENTRY_RELEASES=_global.SENTRY_RELEASES || {};
      _global.SENTRY_RELEASES["wallet@mysten-labs"]={id:"25.5.22.0"};
      
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./dapp-interface/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mysten/wallet-standard */ "../../../node_modules/.pnpm/@wallet-standard+wallet@1.0.1/node_modules/@wallet-standard/wallet/lib/esm/register.js");
/* harmony import */ var _WalletStandardInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WalletStandardInterface */ "./dapp-interface/WalletStandardInterface.ts");
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


(0,_mysten_wallet_standard__WEBPACK_IMPORTED_MODULE_1__.registerWallet)(new _WalletStandardInterface__WEBPACK_IMPORTED_MODULE_0__.SuiWallet());

})();

/******/ })()
;
//# sourceMappingURL=dapp-interface.js.map