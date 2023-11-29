(function (React, styled, designSystem, react) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var offerWalls = [{
    wallUrl: "https://www.ayetstudios.com/offers/web_offerwall/4622?external_identifier=[USERID]",
    wallName: "Ayet Studios",
    wallId: 1,
    simple: "ayetstudio"
  }, {
    wallUrl: "https://wall.lootably.com/?placementID=ckrw6b5gd001z01wy2cre0uga&sid=[USERID]",
    wallName: "Lootably",
    wallId: 2,
    simple: "lootably"
  }, {
    wallUrl: "https://offertoro.com/ifr/show/20243/[USERID]/8023",
    wallName: "OfferToro",
    wallId: 3,
    simple: "offertoro"
  }, {
    wallUrl: "https://api.adgem.com/v1/wall?appid=18228&playerid=[USERID]",
    wallName: "AdGem",
    wallId: 4,
    simple: "adgem"
  }, {
    wallUrl: "https://wall.revenueuniverse.com/499/offers/[USERID]",
    wallName: "Revenue Universe",
    wallId: 5,
    simple: "revu"
  }, {
    wallUrl: "https://wall.adgaterewards.com/n6-VsA/[USERID]",
    wallName: "AdGate",
    wallId: 6,
    simple: "adgate"
  }, {
    wallUrl: "https://asmwall.com/adwall/publisher/115580/profile/18172?subid1=JEARN-[USERID]",
    wallName: "Adscend",
    wallId: 7,
    simple: "adscend"
  }, {
    wallUrl: "https://offers.cpx-research.com/index.php?app_id=10045&ext_user_id=[USERID]",
    wallName: "CPX Research",
    wallId: 8,
    simple: "cpxresearch"
  }, {
    wallUrl: "https://web.bitlabs.ai/?token=83435de8-0a3f-4bc7-8418-c2ed6ab82a66&uid=[USERID]",
    wallName: "BitLabs",
    wallId: 9,
    simple: "bitlabs"
  }, {
    wallUrl: "https://www.surveyb.in/configuration?params=d09LZVE4eXduR3RNZzRNbDRQbTJ2SWpVU041NzdKTStNQkhSbUZsVGRDUnMra0g0MUxYYi9ibVd5ZGQ4MDFCU21pMWx0MXR2SThPOWExVlBMVG1PMUtILzVseTdvVHN4eksydEdpc2pjcTBYUjRXQk5SeElTSDFpNXlrODhINTh1d3IzVS9TdnFKS25BT09iUHA3ZUg5NVF5K3l4cm5OanBVR1JGQlFJam03SmZiZHRPSnRmalZTUERmSk5BTGorMW1QOEprV2VIRDlqeWx4dWoxWkxYdz09&app_uid=[USERID]",
    wallName: "Inbrain",
    wallId: 10,
    simple: "inbrain"
  }, {
    wallUrl: "https://offers.monlix.com/?appid=1915&userid=[USERID]",
    wallName: "Monlix",
    wallId: 11,
    simple: "monlix"
  }, {
    wallUrl: "https://notik.me/coins?api_key=0nppFUgJObiHsbYm1INxmvENmod98EuF&pub_id=riHlIe&app_id=ReY37rkNzq&user_id=[USERID]",
    wallName: "Notik",
    wallId: 12,
    simple: "notik"
  }, {
    wallUrl: "https://timewall.io/users/login?oid=3c8e86c44eca02f1&uid=[USERID]&tab=tasks",
    wallName: "Timewall",
    wallId: 13,
    simple: "timewall"
  }, {
    wallUrl: "https://wall.make-money.top/?p=567&u=[USERID]",
    wallName: "MM Wall",
    wallId: 14,
    simple: "mmwall"
  }];

  var _templateObject, _templateObject2, _templateObject3;
  var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n"])));
  var Select = styled__default["default"].select(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  padding: 7px;\n  border: 0;\n  font-size: 16px;\n"])));
  var SubmitForm = styled__default["default"](designSystem.Button)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  cursor: pointer;\n"])));
  var FeaturedOfferComponent = function FeaturedOfferComponent(props) {
    var _useState = React.useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      offerId = _useState2[0],
      setOfferId = _useState2[1];
    var _useState3 = React.useState(offerWalls[0].wallId),
      _useState4 = _slicedToArray(_useState3, 2),
      offerWall = _useState4[0],
      setOfferWall = _useState4[1];
    var _useResourceAction = react.useResourceAction({
        resourceId: props.resource.id,
        actionName: "addAnother"
      }),
      _useResourceAction2 = _slicedToArray(_useResourceAction, 2),
      myCustomAction = _useResourceAction2[0];
      _useResourceAction2[1].loading;
    var refForm = React.useRef();
    var submitForm = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var found, i, offerWallId;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(offerId.length < 1)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              found = false;
              for (i = 0; i < offerWalls.length; i++) {
                offerWallId = offerWalls[i].wallId.toString();
                if (offerWallId == offerWall) {
                  found = true;
                }
              }
              if (found) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return");
            case 6:
              console.log("hi");
              _context.next = 9;
              return myCustomAction(new FormData(refForm));
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function submitForm() {
        return _ref.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Input, {
      type: "text",
      placeholder: "Offer Id",
      onChange: function onChange(e) {
        return setOfferId(e.target.value);
      },
      value: offerId
    }), /*#__PURE__*/React__default["default"].createElement(Select, {
      onChange: function onChange(e) {
        return setOfferWall(e.target.value);
      },
      value: offerWall
    }, offerWalls.map(function (offerwall, i) {
      return /*#__PURE__*/React__default["default"].createElement("option", {
        key: offerwall.simple,
        value: offerwall.wallId
      }, offerwall.wallName);
    })), /*#__PURE__*/React__default["default"].createElement("form", {
      method: "POST",
      ref: refForm
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "hidden",
      name: "offerId",
      value: offerId
    }), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "hidden",
      name: "offerWallId",
      value: offerWall
    })), /*#__PURE__*/React__default["default"].createElement(SubmitForm, {
      variant: "contained",
      size: "lg",
      color: "primary",
      onClick: function onClick() {
        return submitForm();
      }
    }, "Add Featured Offer"));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.FeaturedOfferComponent = FeaturedOfferComponent;

})(React, styled, AdminJSDesignSystem, react);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbGliL29mZmVyV2FsbHMuanMiLCIuLi9hZG1pbi9GZWF0dXJlZE9mZmVyQ29tcG9uZW50LmpzeCIsIi5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgb2ZmZXJXYWxscyA9IFtcclxuICB7XHJcbiAgICB3YWxsVXJsOlxyXG4gICAgICBcImh0dHBzOi8vd3d3LmF5ZXRzdHVkaW9zLmNvbS9vZmZlcnMvd2ViX29mZmVyd2FsbC80NjIyP2V4dGVybmFsX2lkZW50aWZpZXI9W1VTRVJJRF1cIixcclxuICAgIHdhbGxOYW1lOiBcIkF5ZXQgU3R1ZGlvc1wiLFxyXG4gICAgd2FsbElkOiAxLFxyXG4gICAgc2ltcGxlOiBcImF5ZXRzdHVkaW9cIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6XHJcbiAgICAgIFwiaHR0cHM6Ly93YWxsLmxvb3RhYmx5LmNvbS8/cGxhY2VtZW50SUQ9Y2tydzZiNWdkMDAxejAxd3kyY3JlMHVnYSZzaWQ9W1VTRVJJRF1cIixcclxuICAgIHdhbGxOYW1lOiBcIkxvb3RhYmx5XCIsXHJcbiAgICB3YWxsSWQ6IDIsXHJcbiAgICBzaW1wbGU6IFwibG9vdGFibHlcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6IFwiaHR0cHM6Ly9vZmZlcnRvcm8uY29tL2lmci9zaG93LzIwMjQzL1tVU0VSSURdLzgwMjNcIixcclxuICAgIHdhbGxOYW1lOiBcIk9mZmVyVG9yb1wiLFxyXG4gICAgd2FsbElkOiAzLFxyXG4gICAgc2ltcGxlOiBcIm9mZmVydG9yb1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgd2FsbFVybDogXCJodHRwczovL2FwaS5hZGdlbS5jb20vdjEvd2FsbD9hcHBpZD0xODIyOCZwbGF5ZXJpZD1bVVNFUklEXVwiLFxyXG4gICAgd2FsbE5hbWU6IFwiQWRHZW1cIixcclxuICAgIHdhbGxJZDogNCxcclxuICAgIHNpbXBsZTogXCJhZGdlbVwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgd2FsbFVybDogXCJodHRwczovL3dhbGwucmV2ZW51ZXVuaXZlcnNlLmNvbS80OTkvb2ZmZXJzL1tVU0VSSURdXCIsXHJcbiAgICB3YWxsTmFtZTogXCJSZXZlbnVlIFVuaXZlcnNlXCIsXHJcbiAgICB3YWxsSWQ6IDUsXHJcbiAgICBzaW1wbGU6IFwicmV2dVwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgd2FsbFVybDogXCJodHRwczovL3dhbGwuYWRnYXRlcmV3YXJkcy5jb20vbjYtVnNBL1tVU0VSSURdXCIsXHJcbiAgICB3YWxsTmFtZTogXCJBZEdhdGVcIixcclxuICAgIHdhbGxJZDogNixcclxuICAgIHNpbXBsZTogXCJhZGdhdGVcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6XHJcbiAgICAgIFwiaHR0cHM6Ly9hc213YWxsLmNvbS9hZHdhbGwvcHVibGlzaGVyLzExNTU4MC9wcm9maWxlLzE4MTcyP3N1YmlkMT1KRUFSTi1bVVNFUklEXVwiLFxyXG4gICAgd2FsbE5hbWU6IFwiQWRzY2VuZFwiLFxyXG4gICAgd2FsbElkOiA3LFxyXG4gICAgc2ltcGxlOiBcImFkc2NlbmRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6XHJcbiAgICAgIFwiaHR0cHM6Ly9vZmZlcnMuY3B4LXJlc2VhcmNoLmNvbS9pbmRleC5waHA/YXBwX2lkPTEwMDQ1JmV4dF91c2VyX2lkPVtVU0VSSURdXCIsXHJcbiAgICB3YWxsTmFtZTogXCJDUFggUmVzZWFyY2hcIixcclxuICAgIHdhbGxJZDogOCxcclxuICAgIHNpbXBsZTogXCJjcHhyZXNlYXJjaFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgd2FsbFVybDpcclxuICAgICAgXCJodHRwczovL3dlYi5iaXRsYWJzLmFpLz90b2tlbj04MzQzNWRlOC0wYTNmLTRiYzctODQxOC1jMmVkNmFiODJhNjYmdWlkPVtVU0VSSURdXCIsXHJcbiAgICB3YWxsTmFtZTogXCJCaXRMYWJzXCIsXHJcbiAgICB3YWxsSWQ6IDksXHJcbiAgICBzaW1wbGU6IFwiYml0bGFic1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgd2FsbFVybDpcclxuICAgICAgXCJodHRwczovL3d3dy5zdXJ2ZXliLmluL2NvbmZpZ3VyYXRpb24/cGFyYW1zPWQwOUxaVkU0ZVhkdVIzUk5aelJOYkRSUWJUSjJTV3BWVTA0MU56ZEtUU3ROUWtoU2JVWnNWR1JEVW5NcmEwZzBNVXhZWWk5aWJWZDVaR1E0TURGQ1UyMXBNV3gwTVhSMlNUaFBPV0V4VmxCTVZHMVBNVXRJTHpWc2VUZHZWSE40ZWtzeWRFZHBjMnBqY1RCWVVqUlhRazVTZUVsVFNERnBOWGxyT0RoSU5UaDFkM0l6VlM5VGRuRktTMjVCVDA5aVVIQTNaVWc1TlZGNUszbDRjbTVPYW5CVlIxSkdRbEZKYW0wM1NtWmlaSFJQU25SbWFsWlRVRVJtU2s1QlRHb3JNVzFRT0VwclYyVklSRGxxZVd4NGRXb3hXa3hZZHowOSZhcHBfdWlkPVtVU0VSSURdXCIsXHJcbiAgICB3YWxsTmFtZTogXCJJbmJyYWluXCIsXHJcbiAgICB3YWxsSWQ6IDEwLFxyXG4gICAgc2ltcGxlOiBcImluYnJhaW5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6IFwiaHR0cHM6Ly9vZmZlcnMubW9ubGl4LmNvbS8/YXBwaWQ9MTkxNSZ1c2VyaWQ9W1VTRVJJRF1cIixcclxuICAgIHdhbGxOYW1lOiBcIk1vbmxpeFwiLFxyXG4gICAgd2FsbElkOiAxMSxcclxuICAgIHNpbXBsZTogXCJtb25saXhcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6XHJcbiAgICAgIFwiaHR0cHM6Ly9ub3Rpay5tZS9jb2lucz9hcGlfa2V5PTBucHBGVWdKT2JpSHNiWW0xSU54bXZFTm1vZDk4RXVGJnB1Yl9pZD1yaUhsSWUmYXBwX2lkPVJlWTM3cmtOenEmdXNlcl9pZD1bVVNFUklEXVwiLFxyXG4gICAgd2FsbE5hbWU6IFwiTm90aWtcIixcclxuICAgIHdhbGxJZDogMTIsXHJcbiAgICBzaW1wbGU6IFwibm90aWtcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHdhbGxVcmw6XHJcbiAgICAgIFwiaHR0cHM6Ly90aW1ld2FsbC5pby91c2Vycy9sb2dpbj9vaWQ9M2M4ZTg2YzQ0ZWNhMDJmMSZ1aWQ9W1VTRVJJRF0mdGFiPXRhc2tzXCIsXHJcbiAgICB3YWxsTmFtZTogXCJUaW1ld2FsbFwiLFxyXG4gICAgd2FsbElkOiAxMyxcclxuICAgIHNpbXBsZTogXCJ0aW1ld2FsbFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgd2FsbFVybDogXCJodHRwczovL3dhbGwubWFrZS1tb25leS50b3AvP3A9NTY3JnU9W1VTRVJJRF1cIixcclxuICAgIHdhbGxOYW1lOiBcIk1NIFdhbGxcIixcclxuICAgIHdhbGxJZDogMTQsXHJcbiAgICBzaW1wbGU6IFwibW13YWxsXCIsXHJcbiAgfSxcclxuXTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgb2ZmZXJXYWxscyB9IGZyb20gXCIuLi9zcmMvbGliL29mZmVyV2FsbHNcIjtcclxuaW1wb3J0IHsgQnV0dG9uLCBJbnB1dCB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcbmltcG9ydCB7IHVzZVJlc291cmNlQWN0aW9uIH0gZnJvbSBcIkBhZG1pbmpzL3JlYWN0XCI7XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxcmVtO1xyXG5gO1xyXG5cclxuY29uc3QgU2VsZWN0ID0gc3R5bGVkLnNlbGVjdGBcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiA3cHg7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuYDtcclxuXHJcbmNvbnN0IFN1Ym1pdEZvcm0gPSBzdHlsZWQoQnV0dG9uKWBcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbmA7XHJcblxyXG5jb25zdCBGZWF0dXJlZE9mZmVyQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgW29mZmVySWQsIHNldE9mZmVySWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29mZmVyV2FsbCwgc2V0T2ZmZXJXYWxsXSA9IHVzZVN0YXRlKG9mZmVyV2FsbHNbMF0ud2FsbElkKTtcclxuICBjb25zdCBbbXlDdXN0b21BY3Rpb24sIHsgbG9hZGluZyB9XSA9IHVzZVJlc291cmNlQWN0aW9uKHtcclxuICAgIHJlc291cmNlSWQ6IHByb3BzLnJlc291cmNlLmlkLFxyXG4gICAgYWN0aW9uTmFtZTogXCJhZGRBbm90aGVyXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlZkZvcm0gPSB1c2VSZWYoKTtcclxuXHJcbiAgY29uc3Qgc3VibWl0Rm9ybSA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmIChvZmZlcklkLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2ZmZXJXYWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBvZmZlcldhbGxJZCA9IG9mZmVyV2FsbHNbaV0ud2FsbElkLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBpZiAob2ZmZXJXYWxsSWQgPT0gb2ZmZXJXYWxsKSB7XHJcbiAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiaGlcIik7XHJcbiAgICBhd2FpdCBteUN1c3RvbUFjdGlvbihuZXcgRm9ybURhdGEocmVmRm9ybSkpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8V3JhcHBlcj5cclxuICAgICAgPElucHV0XHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiT2ZmZXIgSWRcIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0T2ZmZXJJZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgdmFsdWU9e29mZmVySWR9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxTZWxlY3Qgb25DaGFuZ2U9eyhlKSA9PiBzZXRPZmZlcldhbGwoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17b2ZmZXJXYWxsfT5cclxuICAgICAgICB7b2ZmZXJXYWxscy5tYXAoKG9mZmVyd2FsbCwgaSkgPT4gKFxyXG4gICAgICAgICAgPG9wdGlvbiBrZXk9e29mZmVyd2FsbC5zaW1wbGV9IHZhbHVlPXtvZmZlcndhbGwud2FsbElkfT5cclxuICAgICAgICAgICAge29mZmVyd2FsbC53YWxsTmFtZX1cclxuICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L1NlbGVjdD5cclxuXHJcbiAgICAgIDxmb3JtIG1ldGhvZD1cIlBPU1RcIiByZWY9e3JlZkZvcm19PlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIm9mZmVySWRcIiB2YWx1ZT17b2ZmZXJJZH0gLz5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJvZmZlcldhbGxJZFwiIHZhbHVlPXtvZmZlcldhbGx9IC8+XHJcbiAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgIDxTdWJtaXRGb3JtXHJcbiAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXHJcbiAgICAgICAgc2l6ZT1cImxnXCJcclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHN1Ym1pdEZvcm0oKX1cclxuICAgICAgPlxyXG4gICAgICAgIEFkZCBGZWF0dXJlZCBPZmZlclxyXG4gICAgICA8L1N1Ym1pdEZvcm0+XHJcbiAgICA8L1dyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVkT2ZmZXJDb21wb25lbnQ7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEZlYXR1cmVkT2ZmZXJDb21wb25lbnQgZnJvbSAnLi4vYWRtaW4vRmVhdHVyZWRPZmZlckNvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRmVhdHVyZWRPZmZlckNvbXBvbmVudCA9IEZlYXR1cmVkT2ZmZXJDb21wb25lbnQiXSwibmFtZXMiOlsib2ZmZXJXYWxscyIsIndhbGxVcmwiLCJ3YWxsTmFtZSIsIndhbGxJZCIsInNpbXBsZSIsIldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsIiwiU2VsZWN0Iiwic2VsZWN0IiwiX3RlbXBsYXRlT2JqZWN0MiIsIlN1Ym1pdEZvcm0iLCJCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QzIiwiRmVhdHVyZWRPZmZlckNvbXBvbmVudCIsInByb3BzIiwiX3VzZVN0YXRlIiwidXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJvZmZlcklkIiwic2V0T2ZmZXJJZCIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0Iiwib2ZmZXJXYWxsIiwic2V0T2ZmZXJXYWxsIiwiX3VzZVJlc291cmNlQWN0aW9uIiwidXNlUmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwicmVzb3VyY2UiLCJpZCIsImFjdGlvbk5hbWUiLCJfdXNlUmVzb3VyY2VBY3Rpb24yIiwibXlDdXN0b21BY3Rpb24iLCJsb2FkaW5nIiwicmVmRm9ybSIsInVzZVJlZiIsInN1Ym1pdEZvcm0iLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJmb3VuZCIsImkiLCJvZmZlcldhbGxJZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJsZW5ndGgiLCJhYnJ1cHQiLCJ0b1N0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJGb3JtRGF0YSIsInN0b3AiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIklucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJtYXAiLCJvZmZlcndhbGwiLCJrZXkiLCJtZXRob2QiLCJyZWYiLCJuYW1lIiwidmFyaWFudCIsInNpemUiLCJjb2xvciIsIm9uQ2xpY2siLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLElBQU1BLFVBQVUsR0FBRyxDQUN4QjtFQUNFQyxFQUFBQSxPQUFPLEVBQ0wsb0ZBQW9GO0VBQ3RGQyxFQUFBQSxRQUFRLEVBQUUsY0FBYztFQUN4QkMsRUFBQUEsTUFBTSxFQUFFLENBQUM7RUFDVEMsRUFBQUEsTUFBTSxFQUFFLFlBQUE7RUFDVixDQUFDLEVBQ0Q7RUFDRUgsRUFBQUEsT0FBTyxFQUNMLCtFQUErRTtFQUNqRkMsRUFBQUEsUUFBUSxFQUFFLFVBQVU7RUFD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
