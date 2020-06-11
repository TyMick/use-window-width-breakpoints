import { shallowDummyBreakpointComponent } from "./dummyBreakpointComponents";

describe("Valid inputs", () => {
  it("should accept no arguments", () => {
    expect(() => {
      shallowDummyBreakpointComponent();
    }).not.toThrowError();
  });

  it("should accept valid sm & lg breakpoints", () => {
    expect(() => {
      shallowDummyBreakpointComponent({ sm: 0, lg: 10 });
    }).not.toThrowError();
  });

  it("should accept valid xs, sm, md, lg, & xl breakpoints", () => {
    expect(() => {
      shallowDummyBreakpointComponent({
        xs: 0,
        sm: 10,
        md: 20,
        lg: 30,
        xl: 40,
      });
    }).not.toThrowError();
  });

  it("should not accept breakpoints without sm", () => {
    expect(() => {
      shallowDummyBreakpointComponent({ xs: 0, md: 10, lg: 20 });
    }).toThrow(new TypeError("sm breakpoint is required."));
  });

  it("should not accept breakpoints without lg", () => {
    expect(() => {
      shallowDummyBreakpointComponent({ xs: 0, sm: 10, md: 20 });
    }).toThrow(new TypeError("lg breakpoint is required."));
  });

  it("should not accept breakpoints that aren't numbers", () => {
    expect(() => {
      shallowDummyBreakpointComponent({
        xs: "frank",
        sm: 10,
        md: 20,
        lg: 30,
      });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      shallowDummyBreakpointComponent({
        sm: null,
        md: 20,
        lg: 30,
      });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      shallowDummyBreakpointComponent({
        sm: 0,
        md: true,
        lg: 30,
      });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      shallowDummyBreakpointComponent({
        sm: 0,
        md: 20,
        lg: [30],
      });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      shallowDummyBreakpointComponent({
        sm: 0,
        md: 20,
        lg: 30,
        xl: { xl: 40 },
      });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
  });

  it("should require the smallest breakpoint to be 0", () => {
    expect(() => {
      shallowDummyBreakpointComponent({
        xs: 10,
        sm: 20,
        lg: 30,
      });
    }).toThrow(new RangeError("Smallest breakpoint must be 0."));
    expect(() => {
      shallowDummyBreakpointComponent({ sm: 20, lg: 30 });
    }).toThrow(new RangeError("Smallest breakpoint must be 0."));
  });

  it("should require each breakpoint to be larger than the previous", () => {
    expect(() => {
      shallowDummyBreakpointComponent({ xs: 0, sm: 0, lg: 20 });
    }).toThrow(
      new RangeError("sm breakpoint must be larger than xs breakpoint.")
    );
    expect(() => {
      shallowDummyBreakpointComponent({
        xs: 0,
        sm: 10,
        md: 0,
        lg: 20,
      });
    }).toThrow(
      new RangeError("md breakpoint must be larger than sm breakpoint.")
    );
    expect(() => {
      shallowDummyBreakpointComponent({ sm: 0, md: 20, lg: 10 });
    }).toThrow(
      new RangeError("lg breakpoint must be larger than md breakpoint.")
    );
    expect(() => {
      shallowDummyBreakpointComponent({ xs: 0, sm: 30, lg: 20 });
    }).toThrow(
      new RangeError("lg breakpoint must be larger than sm breakpoint.")
    );
    expect(() => {
      shallowDummyBreakpointComponent({ sm: 0, lg: 20, xl: 10 });
    }).toThrow(
      new RangeError("xl breakpoint must be larger than lg breakpoint.")
    );
  });
});
