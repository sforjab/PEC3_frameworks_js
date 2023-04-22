/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/todo.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/todo.controller.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoController": () => (/* binding */ TodoController)
/* harmony export */ });
class TodoController {
    constructor(service, view) {
        this.onTodoListChanged = (todos) => {
            this.view.displayTodos(todos);
        };
        this.handleAddTodo = (todoText) => {
            this.service.addTodo(todoText);
        };
        this.handleEditTodo = (id, todoText) => {
            this.service.editTodo(id, todoText);
        };
        this.handleDeleteTodo = (id) => {
            this.service.deleteTodo(id);
        };
        this.handleToggleTodo = (id) => {
            this.service.toggleTodo(id);
        };
        this.service = service;
        this.view = view;
        // Explicit this binding
        this.service.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        // Display initial todos
        this.onTodoListChanged(this.service.todos);
    }
}


/***/ }),

/***/ "./src/models/todo.model.ts":
/*!**********************************!*\
  !*** ./src/models/todo.model.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todo": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../../../../../node_modules/uuid/dist/esm-browser/v4.js");
/**
 * @class Model
 *
 * Manages the data of the application.
 */

class Todo {
    constructor({ text, complete } = { text: '', complete: false }) {
        this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.text = text;
        this.complete = complete !== null && complete !== void 0 ? complete : false;
    }
}


/***/ }),

/***/ "./src/services/todo.service.ts":
/*!**************************************!*\
  !*** ./src/services/todo.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoService": () => (/* binding */ TodoService)
/* harmony export */ });
/* harmony import */ var _models_todo_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo.model */ "./src/models/todo.model.ts");
/**
 * @class Service
 *
 * Manages the data of the application.
 */

class TodoService {
    constructor() {
        this.onTodoListChanged = () => { };
        const todoLS = localStorage.getItem('todos');
        this.todos = (todoLS ? JSON.parse(todoLS) : []).map((todo) => new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(todo));
    }
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    _commit(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    addTodo(text) {
        this.todos.push(new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo({ text }));
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map(todo => todo.id === id
            ? new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(Object.assign(Object.assign({}, todo), { text: updatedText }))
            : todo);
        this._commit(this.todos);
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this._commit(this.todos);
    }
    toggleTodo(id) {
        this.todos = this.todos.map(todo => todo.id === id ? new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(Object.assign(Object.assign({}, todo), { complete: !todo.complete })) : todo);
        this._commit(this.todos);
    }
}


/***/ }),

/***/ "./src/views/todo.views.ts":
/*!*********************************!*\
  !*** ./src/views/todo.views.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoView": () => (/* binding */ TodoView)
/* harmony export */ });
class TodoView {
    constructor() {
        this.app = this.getElement('#root');
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.form.append(this.input, this.submitButton);
        this.title = this.createElement('h1');
        this.title.textContent = 'Todos';
        this.todoList = this.createElement('ul', 'todo-list');
        this.app.append(this.title, this.form, this.todoList);
        this._temporaryTodoText = '';
        this._initLocalListeners();
    }
    _todoText() {
        return this.input.value;
    }
    _resetInput() {
        this.input.value = '';
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    displayTodos(todos) {
        // Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        // Show default message
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.todoList.append(p);
        }
        else {
            // Create nodes
            todos.forEach(todo => {
                var _a, _b;
                const li = this.createElement('li');
                li.id = todo.id;
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;
                const span = this.createElement('span');
                span.contentEditable = 'true';
                span.classList.add('editable');
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = (_a = todo.text) !== null && _a !== void 0 ? _a : null;
                    span.append(strike);
                }
                else {
                    span.textContent = (_b = todo.text) !== null && _b !== void 0 ? _b : null;
                }
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);
                // Append nodes
                this.todoList.append(li);
            });
        }
        // Debugging
        console.log(todos);
    }
    _initLocalListeners() {
        this.todoList.addEventListener('input', event => {
            if (event.target instanceof HTMLElement && event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText;
            }
        });
    }
    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText());
                this._resetInput();
            }
        });
    }
    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', (event) => {
            var _a;
            const target = event.target;
            if (target.className === 'delete') {
                const id = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                if (id) {
                    handler(id);
                }
            }
        });
    }
    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', (event) => {
            var _a;
            const target = event.target;
            if (this._temporaryTodoText && target.classList.contains('editable')) {
                const id = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                if (id) {
                    handler(id, this._temporaryTodoText);
                    this._temporaryTodoText = '';
                }
            }
        });
    }
    // REVISAR
    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', (event) => {
            var _a;
            const target = event.target;
            if (target.type === 'checkbox' && target.tagName === 'INPUT') {
                const id = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                if (id) {
                    handler(id);
                }
            }
        });
    }
}


/***/ }),

/***/ "../../../../../../node_modules/uuid/dist/esm-browser/native.js":
/*!**********************************************************************!*\
  !*** ../../../../../../node_modules/uuid/dist/esm-browser/native.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "../../../../../../node_modules/uuid/dist/esm-browser/regex.js":
/*!*********************************************************************!*\
  !*** ../../../../../../node_modules/uuid/dist/esm-browser/regex.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../../../../../node_modules/uuid/dist/esm-browser/rng.js":
/*!*******************************************************************!*\
  !*** ../../../../../../node_modules/uuid/dist/esm-browser/rng.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "../../../../../../node_modules/uuid/dist/esm-browser/stringify.js":
/*!*************************************************************************!*\
  !*** ../../../../../../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../../../../../node_modules/uuid/dist/esm-browser/validate.js");

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
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
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

/***/ "../../../../../../node_modules/uuid/dist/esm-browser/v4.js":
/*!******************************************************************!*\
  !*** ../../../../../../node_modules/uuid/dist/esm-browser/v4.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "../../../../../../node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "../../../../../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "../../../../../../node_modules/uuid/dist/esm-browser/stringify.js");




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

/***/ "../../../../../../node_modules/uuid/dist/esm-browser/validate.js":
/*!************************************************************************!*\
  !*** ../../../../../../node_modules/uuid/dist/esm-browser/validate.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../../../../../node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_todo_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/todo.controller */ "./src/controllers/todo.controller.ts");
/* harmony import */ var _services_todo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/todo.service */ "./src/services/todo.service.ts");
/* harmony import */ var _views_todo_views__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/todo.views */ "./src/views/todo.views.ts");



const app = new _controllers_todo_controller__WEBPACK_IMPORTED_MODULE_0__.TodoController(new _services_todo_service__WEBPACK_IMPORTED_MODULE_1__.TodoService(), new _views_todo_views__WEBPACK_IMPORTED_MODULE_2__.TodoView());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sNkRBQWlCO0FBQ3ZCLFdBQVcsNkRBQWlCO0FBQzVCOztBQUVBO0FBQ0EsaURBQWlELCtDQUFHLEtBQUs7O0FBRXpEO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTLDhEQUFlO0FBQ3hCOztBQUVBLGlFQUFlLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztBQzVCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsc0RBQVU7QUFDL0M7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7O1VDTnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04rRDtBQUNUO0FBQ1I7QUFDOUMsZ0JBQWdCLHdFQUFjLEtBQUssK0RBQVcsUUFBUSx1REFBUSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy90b2RvLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy90b2RvLm1vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy90b2RvLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RvZG8udmlld3MudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVG9kb0NvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2UsIHZpZXcpIHtcbiAgICAgICAgdGhpcy5vblRvZG9MaXN0Q2hhbmdlZCA9ICh0b2RvcykgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3LmRpc3BsYXlUb2Rvcyh0b2Rvcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlQWRkVG9kbyA9ICh0b2RvVGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFkZFRvZG8odG9kb1RleHQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhhbmRsZUVkaXRUb2RvID0gKGlkLCB0b2RvVGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmVkaXRUb2RvKGlkLCB0b2RvVGV4dCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlRGVsZXRlVG9kbyA9IChpZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZVRvZG8oaWQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhhbmRsZVRvZ2dsZVRvZG8gPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS50b2dnbGVUb2RvKGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICAgICAgdGhpcy52aWV3ID0gdmlldztcbiAgICAgICAgLy8gRXhwbGljaXQgdGhpcyBiaW5kaW5nXG4gICAgICAgIHRoaXMuc2VydmljZS5iaW5kVG9kb0xpc3RDaGFuZ2VkKHRoaXMub25Ub2RvTGlzdENoYW5nZWQpO1xuICAgICAgICB0aGlzLnZpZXcuYmluZEFkZFRvZG8odGhpcy5oYW5kbGVBZGRUb2RvKTtcbiAgICAgICAgdGhpcy52aWV3LmJpbmRFZGl0VG9kbyh0aGlzLmhhbmRsZUVkaXRUb2RvKTtcbiAgICAgICAgdGhpcy52aWV3LmJpbmREZWxldGVUb2RvKHRoaXMuaGFuZGxlRGVsZXRlVG9kbyk7XG4gICAgICAgIHRoaXMudmlldy5iaW5kVG9nZ2xlVG9kbyh0aGlzLmhhbmRsZVRvZ2dsZVRvZG8pO1xuICAgICAgICAvLyBEaXNwbGF5IGluaXRpYWwgdG9kb3NcbiAgICAgICAgdGhpcy5vblRvZG9MaXN0Q2hhbmdlZCh0aGlzLnNlcnZpY2UudG9kb3MpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzIE1vZGVsXG4gKlxuICogTWFuYWdlcyB0aGUgZGF0YSBvZiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmV4cG9ydCBjbGFzcyBUb2RvIHtcbiAgICBjb25zdHJ1Y3Rvcih7IHRleHQsIGNvbXBsZXRlIH0gPSB7IHRleHQ6ICcnLCBjb21wbGV0ZTogZmFsc2UgfSkge1xuICAgICAgICB0aGlzLmlkID0gdXVpZCgpO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmNvbXBsZXRlID0gY29tcGxldGUgIT09IG51bGwgJiYgY29tcGxldGUgIT09IHZvaWQgMCA/IGNvbXBsZXRlIDogZmFsc2U7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgU2VydmljZVxuICpcbiAqIE1hbmFnZXMgdGhlIGRhdGEgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5pbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi4vbW9kZWxzL3RvZG8ubW9kZWwnO1xuZXhwb3J0IGNsYXNzIFRvZG9TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vblRvZG9MaXN0Q2hhbmdlZCA9ICgpID0+IHsgfTtcbiAgICAgICAgY29uc3QgdG9kb0xTID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJyk7XG4gICAgICAgIHRoaXMudG9kb3MgPSAodG9kb0xTID8gSlNPTi5wYXJzZSh0b2RvTFMpIDogW10pLm1hcCgodG9kbykgPT4gbmV3IFRvZG8odG9kbykpO1xuICAgIH1cbiAgICBiaW5kVG9kb0xpc3RDaGFuZ2VkKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub25Ub2RvTGlzdENoYW5nZWQgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgX2NvbW1pdCh0b2Rvcykge1xuICAgICAgICB0aGlzLm9uVG9kb0xpc3RDaGFuZ2VkKHRvZG9zKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbiAgICB9XG4gICAgYWRkVG9kbyh0ZXh0KSB7XG4gICAgICAgIHRoaXMudG9kb3MucHVzaChuZXcgVG9kbyh7IHRleHQgfSkpO1xuICAgICAgICB0aGlzLl9jb21taXQodGhpcy50b2Rvcyk7XG4gICAgfVxuICAgIGVkaXRUb2RvKGlkLCB1cGRhdGVkVGV4dCkge1xuICAgICAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAodG9kbyA9PiB0b2RvLmlkID09PSBpZFxuICAgICAgICAgICAgPyBuZXcgVG9kbyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRvZG8pLCB7IHRleHQ6IHVwZGF0ZWRUZXh0IH0pKVxuICAgICAgICAgICAgOiB0b2RvKTtcbiAgICAgICAgdGhpcy5fY29tbWl0KHRoaXMudG9kb3MpO1xuICAgIH1cbiAgICBkZWxldGVUb2RvKGlkKSB7XG4gICAgICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uaWQgIT09IGlkKTtcbiAgICAgICAgdGhpcy5fY29tbWl0KHRoaXMudG9kb3MpO1xuICAgIH1cbiAgICB0b2dnbGVUb2RvKGlkKSB7XG4gICAgICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLm1hcCh0b2RvID0+IHRvZG8uaWQgPT09IGlkID8gbmV3IFRvZG8oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0b2RvKSwgeyBjb21wbGV0ZTogIXRvZG8uY29tcGxldGUgfSkpIDogdG9kbyk7XG4gICAgICAgIHRoaXMuX2NvbW1pdCh0aGlzLnRvZG9zKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVG9kb1ZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFwcCA9IHRoaXMuZ2V0RWxlbWVudCgnI3Jvb3QnKTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMuaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG9kbyc7XG4gICAgICAgIHRoaXMuaW5wdXQubmFtZSA9ICd0b2RvJztcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuICAgICAgICB0aGlzLmZvcm0uYXBwZW5kKHRoaXMuaW5wdXQsIHRoaXMuc3VibWl0QnV0dG9uKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9ICdUb2Rvcyc7XG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ3VsJywgJ3RvZG8tbGlzdCcpO1xuICAgICAgICB0aGlzLmFwcC5hcHBlbmQodGhpcy50aXRsZSwgdGhpcy5mb3JtLCB0aGlzLnRvZG9MaXN0KTtcbiAgICAgICAgdGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQgPSAnJztcbiAgICAgICAgdGhpcy5faW5pdExvY2FsTGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIF90b2RvVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7XG4gICAgfVxuICAgIF9yZXNldElucHV0KCkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XG4gICAgfVxuICAgIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWUpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSlcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0RWxlbWVudChzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICBkaXNwbGF5VG9kb3ModG9kb3MpIHtcbiAgICAgICAgLy8gRGVsZXRlIGFsbCBub2Rlc1xuICAgICAgICB3aGlsZSAodGhpcy50b2RvTGlzdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKHRoaXMudG9kb0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2hvdyBkZWZhdWx0IG1lc3NhZ2VcbiAgICAgICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IHRoaXMuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9ICdOb3RoaW5nIHRvIGRvISBBZGQgYSB0YXNrPyc7XG4gICAgICAgICAgICB0aGlzLnRvZG9MaXN0LmFwcGVuZChwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBub2Rlc1xuICAgICAgICAgICAgdG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gdGhpcy5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgIGxpLmlkID0gdG9kby5pZDtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdG9kby5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gdGhpcy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgc3Bhbi5jb250ZW50RWRpdGFibGUgPSAndHJ1ZSc7XG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgICAgIGlmICh0b2RvLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cmlrZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgncycpO1xuICAgICAgICAgICAgICAgICAgICBzdHJpa2UudGV4dENvbnRlbnQgPSAoX2EgPSB0b2RvLnRleHQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uYXBwZW5kKHN0cmlrZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gKF9iID0gdG9kby50ZXh0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICdkZWxldGUnKTtcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmQoY2hlY2tib3gsIHNwYW4sIGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIG5vZGVzXG4gICAgICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmQobGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVidWdnaW5nXG4gICAgICAgIGNvbnNvbGUubG9nKHRvZG9zKTtcbiAgICB9XG4gICAgX2luaXRMb2NhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdGFibGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYmluZEFkZFRvZG8oaGFuZGxlcikge1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl90b2RvVGV4dCkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIodGhpcy5fdG9kb1RleHQoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRJbnB1dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYmluZERlbGV0ZVRvZG8oaGFuZGxlcikge1xuICAgICAgICB0aGlzLnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IChfYSA9IHRhcmdldC5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQ7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIoaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGJpbmRFZGl0VG9kbyhoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmICh0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0YWJsZScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAoX2EgPSB0YXJnZXQucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGlkLCB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBvcmFyeVRvZG9UZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gUkVWSVNBUlxuICAgIGJpbmRUb2dnbGVUb2RvKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiB0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gKF9hID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZDtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvZG9Db250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy90b2RvLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgVG9kb1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RvZG8uc2VydmljZSc7XG5pbXBvcnQgeyBUb2RvVmlldyB9IGZyb20gJy4vdmlld3MvdG9kby52aWV3cyc7XG5jb25zdCBhcHAgPSBuZXcgVG9kb0NvbnRyb2xsZXIobmV3IFRvZG9TZXJ2aWNlKCksIG5ldyBUb2RvVmlldygpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==