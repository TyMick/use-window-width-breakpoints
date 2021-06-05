import { renderHook } from "@testing-library/react-hooks";
import useWindowWidthBreakpoints from "../index";

describe("Valid inputs", () => {
  it("should accept no arguments", () => {
    const { result } = renderHook(() => useWindowWidthBreakpoints());
    expect(result.error).toBeUndefined();
  });

  it("should accept valid sm & lg breakpoints", () => {
    const { result } = renderHook(() =>
      useWindowWidthBreakpoints({ sm: 0, lg: 10 })
    );
    expect(result.error).toBeUndefined();
  });

  it("should accept valid xs, sm, md, lg, & xl breakpoints", () => {
    const { result } = renderHook(() =>
      useWindowWidthBreakpoints({ xs: 0, sm: 10, md: 20, lg: 30, xl: 40 })
    );
    expect(result.error).toBeUndefined();
  });

  it("should not accept breakpoints without sm", () => {
    const { result } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ xs: 0, md: 10, lg: 20 })
    );
    expect(result.error).toEqual(new TypeError("sm breakpoint is required."));
  });

  it("should not accept breakpoints without lg", () => {
    const { result } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ xs: 0, sm: 10, md: 20 })
    );
    expect(result.error).toEqual(new TypeError("lg breakpoint is required."));
  });

  it("should not accept breakpoints that aren't numbers", () => {
    const { result: result1 } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ xs: "frank", sm: 10, md: 20, lg: 30 })
    );
    expect(result1.error).toEqual(
      new TypeError("Breakpoints must be numbers.")
    );
    const { result: result2 } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ sm: null, md: 20, lg: 30 })
    );
    expect(result2.error).toEqual(
      new TypeError("Breakpoints must be numbers.")
    );
    const { result: result3 } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ sm: 0, md: true, lg: 30 })
    );
    expect(result3.error).toEqual(
      new TypeError("Breakpoints must be numbers.")
    );
    const { result: result4 } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ sm: 0, md: 20, lg: [30] })
    );
    expect(result4.error).toEqual(
      new TypeError("Breakpoints must be numbers.")
    );
    const { result: result5 } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ sm: 0, md: 20, lg: 30, xl: { xl: 40 } })
    );
    expect(result5.error).toEqual(
      new TypeError("Breakpoints must be numbers.")
    );
  });

  it("should require the smallest breakpoint to be 0", () => {
    const { result: result1 } = renderHook(() =>
      // @ts-expect-error
      useWindowWidthBreakpoints({ xs: 10, sm: 20, lg: 30 })
    );
    expect(result1.error).toEqual(
      new RangeError("Smallest breakpoint must be 0.")
    );
    const { result: result2 } = renderHook(() =>
      useWindowWidthBreakpoints({ sm: 20, lg: 30 })
    );
    expect(result2.error).toEqual(
      new RangeError("Smallest breakpoint must be 0.")
    );
  });

  it("should require each breakpoint to be larger than the previous", () => {
    const { result: result1 } = renderHook(() =>
      useWindowWidthBreakpoints({ xs: 0, sm: 0, lg: 20 })
    );
    expect(result1.error).toEqual(
      new RangeError("sm breakpoint must be larger than xs breakpoint.")
    );
    const { result: result2 } = renderHook(() =>
      useWindowWidthBreakpoints({ xs: 0, sm: 10, md: 0, lg: 20 })
    );
    expect(result2.error).toEqual(
      new RangeError("md breakpoint must be larger than sm breakpoint.")
    );
    const { result: result3 } = renderHook(() =>
      useWindowWidthBreakpoints({ sm: 0, md: 20, lg: 10 })
    );
    expect(result3.error).toEqual(
      new RangeError("lg breakpoint must be larger than md breakpoint.")
    );
    const { result: result4 } = renderHook(() =>
      useWindowWidthBreakpoints({ xs: 0, sm: 30, lg: 20 })
    );
    expect(result4.error).toEqual(
      new RangeError("lg breakpoint must be larger than sm breakpoint.")
    );
    const { result: result5 } = renderHook(() =>
      useWindowWidthBreakpoints({ sm: 0, lg: 20, xl: 10 })
    );
    expect(result5.error).toEqual(
      new RangeError("xl breakpoint must be larger than lg breakpoint.")
    );
  });
});
