"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var bootstrapBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};
/**
 * React hook for using window width breakpoints.
 * @param {Breakpoints} [breakpoints] - Set of window width breakpoints to be used
 * @param {0} [breakpoints.xs] - Lower bound of extra-small window widths, in pixels
 * @param {number} breakpoints.sm - Lower bound of small window widths, in pixels
 * @param {number} [breakpoints.md] - Lower bound of medium window widths, in pixels
 * @param {number} breakpoints.lg - Lower bound of large window widths, in pixels
 * @param {number} [breakpoints.xs] - Lower bound of extra-large window widths, in pixels
 * @returns {BreakpointResults} A full set of breakpoint queries and their boolean values
 */
function useWindowWidthBreakpoints(breakpoints) {
    if (breakpoints === void 0) { breakpoints = bootstrapBreakpoints; }
    // Validate breakpoint inputs
    if (breakpoints.sm === undefined)
        throw new TypeError("sm breakpoint is required.");
    if (breakpoints.lg === undefined)
        throw new TypeError("lg breakpoint is required.");
    if ((breakpoints.xs !== undefined && typeof breakpoints.xs !== "number") ||
        typeof breakpoints.sm !== "number" ||
        (breakpoints.md !== undefined && typeof breakpoints.md !== "number") ||
        typeof breakpoints.lg !== "number" ||
        (breakpoints.xl !== undefined && typeof breakpoints.xl !== "number"))
        throw new TypeError("Breakpoints must be numbers.");
    if (!(breakpoints.xs === 0))
        if (breakpoints.sm !== 0)
            throw new RangeError("Smallest breakpoint must be 0.");
    if (breakpoints.xs === 0 && breakpoints.sm <= breakpoints.xs)
        throw new RangeError("sm breakpoint must be larger than xs breakpoint.");
    if (breakpoints.md !== undefined) {
        if (breakpoints.md <= breakpoints.sm)
            throw new RangeError("md breakpoint must be larger than sm breakpoint.");
        if (breakpoints.lg <= breakpoints.md)
            throw new RangeError("lg breakpoint must be larger than md breakpoint.");
    }
    else if (breakpoints.lg <= breakpoints.sm) {
        throw new RangeError("lg breakpoint must be larger than sm breakpoint.");
    }
    if (breakpoints.xl !== undefined && breakpoints.xl <= breakpoints.lg)
        throw new RangeError("xl breakpoint must be larger than lg breakpoint.");
    // Track window width
    var _a = react_1.useState(0), windowWidth = _a[0], setWindowWidth = _a[1];
    react_1.useEffect(function () {
        var handleResize = function () {
            setWindowWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", lodash_debounce_1.default(handleResize, 400));
        return function () {
            window.removeEventListener("resize", lodash_debounce_1.default(handleResize, 400));
        };
    }, []);
    // Determine current breakpoint
    var currentBreakpoint;
    if (breakpoints.xl && windowWidth >= breakpoints.xl) {
        currentBreakpoint = "xl";
    }
    else if (windowWidth >= breakpoints.lg) {
        currentBreakpoint = "lg";
    }
    else if (breakpoints.md && windowWidth >= breakpoints.md) {
        currentBreakpoint = "md";
    }
    else if (windowWidth >= breakpoints.sm) {
        currentBreakpoint = "sm";
    }
    else {
        currentBreakpoint = "xs";
    }
    // Return full set of breakpoint queries
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (breakpoints.xs === 0 && { xs: currentBreakpoint === "xs" })), { sm: currentBreakpoint === "sm" }), (breakpoints.md && { md: currentBreakpoint === "md" })), { lg: currentBreakpoint === "lg" }), (breakpoints.xl && { xl: currentBreakpoint === "xl" })), { only: __assign(__assign(__assign(__assign(__assign({}, (breakpoints.xs === 0 && { xs: currentBreakpoint === "xs" })), { sm: currentBreakpoint === "sm" }), (breakpoints.md && { md: currentBreakpoint === "md" })), { lg: currentBreakpoint === "lg" }), (breakpoints.xl && { xl: currentBreakpoint === "xl" })), up: __assign(__assign(__assign(__assign(__assign({}, (breakpoints.xs === 0 && { xs: true })), { sm: ["sm", "md", "lg", "xl"].includes(currentBreakpoint) }), (breakpoints.md && {
            md: ["md", "lg", "xl"].includes(currentBreakpoint),
        })), { lg: ["lg", "xl"].includes(currentBreakpoint) }), (breakpoints.xl && { xl: ["xl"].includes(currentBreakpoint) })), down: __assign(__assign(__assign(__assign(__assign({}, (breakpoints.xs === 0 && { xs: ["xs"].includes(currentBreakpoint) })), { sm: ["xs", "sm"].includes(currentBreakpoint) }), (breakpoints.md && {
            md: ["xs", "sm", "md"].includes(currentBreakpoint),
        })), { lg: ["xs", "sm", "md", "lg"].includes(currentBreakpoint) }), (breakpoints.xl && { xl: true })), between: __assign(__assign(__assign(__assign({}, (breakpoints.xs === 0 && {
            xs: __assign(__assign(__assign({ sm: ["xs", "sm"].includes(currentBreakpoint) }, (breakpoints.md && {
                md: ["xs", "sm", "md"].includes(currentBreakpoint),
            })), { lg: ["xs", "sm", "md", "lg"].includes(currentBreakpoint) }), (breakpoints.xl && { xl: true })),
        })), { sm: __assign(__assign(__assign({}, (breakpoints.md && { md: ["sm", "md"].includes(currentBreakpoint) })), { lg: ["sm", "md", "lg"].includes(currentBreakpoint) }), (breakpoints.xl && {
                xl: ["sm", "md", "lg", "xl"].includes(currentBreakpoint),
            })) }), (breakpoints.md && {
            md: __assign({ lg: ["md", "lg"].includes(currentBreakpoint) }, (breakpoints.xl && {
                xl: ["md", "lg", "xl"].includes(currentBreakpoint),
            })),
        })), (breakpoints.xl && {
            lg: {
                xl: ["lg", "xl"].includes(currentBreakpoint),
            },
        })) });
}
exports.default = useWindowWidthBreakpoints;
