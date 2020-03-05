"use strict";

import { useState, useEffect } from "react";

const bootstrapBreakpoints: {
  xs?: 0;
  sm: number;
  md?: number;
  lg: number;
  xl?: number;
} = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

interface BreakpointResults {
  xs?: boolean;
  sm: boolean;
  md?: boolean;
  lg: boolean;
  xl?: boolean;
  only: {
    xs?: boolean;
    sm: boolean;
    md?: boolean;
    lg: boolean;
    xl?: boolean;
  };
  up: {
    xs?: true;
    sm: boolean;
    md?: boolean;
    lg: boolean;
    xl?: boolean;
  };
  down: {
    xs?: boolean;
    sm: boolean;
    md?: boolean;
    lg: boolean;
    xl?: true;
  };
  between: {
    xs?: {
      sm: boolean;
      md?: boolean;
      lg: boolean;
      xl?: true;
    };
    sm: {
      md?: boolean;
      lg: boolean;
      xl?: boolean;
    };
    md?: {
      lg: boolean;
      xl?: boolean;
    };
    lg?: {
      xl?: boolean;
    };
  };
}

export default function(breakpoints = bootstrapBreakpoints): BreakpointResults {
  const xs = breakpoints.hasOwnProperty("xs");
  const md = breakpoints.hasOwnProperty("md");
  const xl = breakpoints.hasOwnProperty("xl");

  // Validate breakpoint inputs
  // Smallest breakpoint must be 0
  if (!xs) {
    if (breakpoints.sm !== 0) {
      throw new RangeError("Smallest breakpoint must be 0.");
    }
  }
  // Each breakpoint must be larger than the previous
  if (xs && breakpoints.sm <= breakpoints.xs) {
    throw new RangeError("sm breakpoint must be larger than xs breakpoint.");
  }
  if (md) {
    if (breakpoints.md <= breakpoints.sm) {
      throw new RangeError("md breakpoint must be larger than sm breakpoint.");
    }
    if (breakpoints.lg <= breakpoints.md) {
      throw new RangeError("lg breakpoint must be larger than md breakpoint.");
    }
  } else {
    if (breakpoints.lg <= breakpoints.sm) {
      throw new RangeError("lg breakpoint must be larger than sm breakpoint.");
    }
  }
  if (xl && breakpoints.xl <= breakpoints.lg) {
    throw new RangeError("xl breakpoint must be larger than lg breakpoint.");
  }

  // Track window width
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine current breakpoint
  let currentBreakpoint: "xs" | "sm" | "md" | "lg" | "xl";
  if (xl && windowWidth >= breakpoints.xl) {
    currentBreakpoint = "xl";
  } else if (windowWidth >= breakpoints.lg) {
    currentBreakpoint = "lg";
  } else if (windowWidth >= breakpoints.md) {
    currentBreakpoint = "md";
  } else if (windowWidth >= breakpoints.sm) {
    currentBreakpoint = "sm";
  } else {
    currentBreakpoint = "xs";
  }

  // Return full set of breakpoint queries
  return {
    ...(xs && { xs: currentBreakpoint === "xs" }),
    sm: currentBreakpoint === "sm",
    ...(md && { md: currentBreakpoint === "md" }),
    lg: currentBreakpoint === "lg",
    ...(xl && { xl: currentBreakpoint === "xl" }),
    only: {
      ...(xs && { xs: currentBreakpoint === "xs" }),
      sm: currentBreakpoint === "sm",
      ...(md && { md: currentBreakpoint === "md" }),
      lg: currentBreakpoint === "lg",
      ...(xl && { xl: currentBreakpoint === "xl" })
    },
    up: {
      ...(xs && { xs: true }),
      sm: ["sm", "md", "lg", "xl"].includes(currentBreakpoint),
      ...(md && { md: ["md", "lg", "xl"].includes(currentBreakpoint) }),
      lg: ["lg", "xl"].includes(currentBreakpoint),
      ...(xl && { xl: ["xl"].includes(currentBreakpoint) })
    },
    down: {
      ...(xs && { xs: ["xs"].includes(currentBreakpoint) }),
      sm: ["xs", "sm"].includes(currentBreakpoint),
      ...(md && { md: ["xs", "sm", "md"].includes(currentBreakpoint) }),
      lg: ["xs", "sm", "md", "lg"].includes(currentBreakpoint),
      ...(xl && { xl: true })
    },
    between: {
      ...(xs && {
        xs: {
          sm: ["xs", "sm"].includes(currentBreakpoint),
          ...(md && { md: ["xs", "sm", "md"].includes(currentBreakpoint) }),
          lg: ["xs", "sm", "md", "lg"].includes(currentBreakpoint),
          ...(xl && { xl: true })
        }
      }),
      sm: {
        ...(md && { md: ["sm", "md"].includes(currentBreakpoint) }),
        lg: ["sm", "md", "lg"].includes(currentBreakpoint),
        ...(xl && { xl: ["sm", "md", "lg", "xl"].includes(currentBreakpoint) })
      },
      ...(md && {
        md: {
          lg: ["md", "lg"].includes(currentBreakpoint),
          ...(xl && { xl: ["md", "lg", "xl"].includes(currentBreakpoint) })
        }
      }),
      ...(xl && {
        lg: {
          xl: ["lg", "xl"].includes(currentBreakpoint)
        }
      })
    }
  };
}
