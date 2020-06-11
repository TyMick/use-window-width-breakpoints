import renderDummyBreakpointComponent from "./renderDummyBreakpointComponent";

describe("Valid inputs", () => {
  it("should accept no arguments", () => {
    expect(() => {
      renderDummyBreakpointComponent();
    }).not.toThrowError();
  });

  it("should accept valid sm & lg breakpoints", () => {
    expect(() => {
      renderDummyBreakpointComponent({ sm: 0, lg: 10 });
    }).not.toThrowError();
  });

  it("should accept valid xs, sm, md, lg, & xl breakpoints", () => {
    expect(() => {
      renderDummyBreakpointComponent({ xs: 0, sm: 10, md: 20, lg: 30, xl: 40 });
    }).not.toThrowError();
  });

  it("should not accept breakpoints without sm", () => {
    expect(() => {
      renderDummyBreakpointComponent({ xs: 0, md: 10, lg: 20 });
    }).toThrow(new TypeError("sm breakpoint is required."));
  });

  it("should not accept breakpoints without lg", () => {
    expect(() => {
      renderDummyBreakpointComponent({ xs: 0, sm: 10, md: 20 });
    }).toThrow(new TypeError("lg breakpoint is required."));
  });

  it("should not accept breakpoints that aren't numbers", () => {
    expect(() => {
      renderDummyBreakpointComponent({ xs: "frank", sm: 10, md: 20, lg: 30 });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      renderDummyBreakpointComponent({ sm: null, md: 20, lg: 30 });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      renderDummyBreakpointComponent({ sm: 0, md: true, lg: 30 });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      renderDummyBreakpointComponent({ sm: 0, md: 20, lg: [30] });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
    expect(() => {
      renderDummyBreakpointComponent({ sm: 0, md: 20, lg: 30, xl: { xl: 40 } });
    }).toThrow(new TypeError("Breakpoints must be numbers."));
  });

  it("should require the smallest breakpoint to be 0", () => {
    expect(() => {
      renderDummyBreakpointComponent({ xs: 10, sm: 20, lg: 30 });
    }).toThrow(new RangeError("Smallest breakpoint must be 0."));
    expect(() => {
      renderDummyBreakpointComponent({ sm: 20, lg: 30 });
    }).toThrow(new RangeError("Smallest breakpoint must be 0."));
  });

  it("should require each breakpoint to be larger than the previous", () => {
    expect(() => {
      renderDummyBreakpointComponent({ xs: 0, sm: 0, lg: 20 });
    }).toThrow(
      new RangeError("sm breakpoint must be larger than xs breakpoint.")
    );
    expect(() => {
      renderDummyBreakpointComponent({ xs: 0, sm: 10, md: 0, lg: 20 });
    }).toThrow(
      new RangeError("md breakpoint must be larger than sm breakpoint.")
    );
    expect(() => {
      renderDummyBreakpointComponent({ sm: 0, md: 20, lg: 10 });
    }).toThrow(
      new RangeError("lg breakpoint must be larger than md breakpoint.")
    );
    expect(() => {
      renderDummyBreakpointComponent({ xs: 0, sm: 30, lg: 20 });
    }).toThrow(
      new RangeError("lg breakpoint must be larger than sm breakpoint.")
    );
    expect(() => {
      renderDummyBreakpointComponent({ sm: 0, lg: 20, xl: 10 });
    }).toThrow(
      new RangeError("xl breakpoint must be larger than lg breakpoint.")
    );
  });
});
