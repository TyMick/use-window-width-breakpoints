import {
  mountDummyBreakpointComponent,
  getBreakpointResults,
} from "./dummyBreakpointComponents";
import { act } from "react-dom/test-utils";

function resizeWindow(newWidth) {
  window.innerWidth = newWidth;
  window.dispatchEvent(new Event("resize"));
}

describe("Valid outputs", () => {
  describe("Five breakpoints", () => {
    let component;

    beforeAll(() => {
      component = mountDummyBreakpointComponent({
        xs: 0,
        sm: 10,
        md: 20,
        lg: 30,
        xl: 40,
      });
    });

    it("should return the correct media query results for a xs screen", () => {
      act(() => {
        resizeWindow(5);
      });
      expect(getBreakpointResults(component)).toEqual({
        xs: true,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        only: {
          xs: true,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
        up: {
          xs: true,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
        down: {
          xs: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
        },
        between: {
          xs: {
            sm: true,
            md: true,
            lg: true,
            xl: true,
          },
          sm: {
            md: false,
            lg: false,
            xl: false,
          },
          md: {
            lg: false,
            xl: false,
          },
          lg: {
            xl: false,
          },
        },
      });
    });

    it("should return the correct media query results for a sm screen", () => {
      act(() => {
        resizeWindow(15);
      });
      expect(getBreakpointResults(component)).toEqual({
        xs: false,
        sm: true,
        md: false,
        lg: false,
        xl: false,
        only: {
          xs: false,
          sm: true,
          md: false,
          lg: false,
          xl: false,
        },
        up: {
          xs: true,
          sm: true,
          md: false,
          lg: false,
          xl: false,
        },
        down: {
          xs: false,
          sm: true,
          md: true,
          lg: true,
          xl: true,
        },
        between: {
          xs: {
            sm: true,
            md: true,
            lg: true,
            xl: true,
          },
          sm: {
            md: true,
            lg: true,
            xl: true,
          },
          md: {
            lg: false,
            xl: false,
          },
          lg: {
            xl: false,
          },
        },
      });
    });

    it("should return the correct media query results for a md screen", () => {
      act(() => {
        resizeWindow(25);
      });
      expect(getBreakpointResults(component)).toEqual({
        xs: false,
        sm: false,
        md: true,
        lg: false,
        xl: false,
        only: {
          xs: false,
          sm: false,
          md: true,
          lg: false,
          xl: false,
        },
        up: {
          xs: true,
          sm: true,
          md: true,
          lg: false,
          xl: false,
        },
        down: {
          xs: false,
          sm: false,
          md: true,
          lg: true,
          xl: true,
        },
        between: {
          xs: {
            sm: false,
            md: true,
            lg: true,
            xl: true,
          },
          sm: {
            md: true,
            lg: true,
            xl: true,
          },
          md: {
            lg: true,
            xl: true,
          },
          lg: {
            xl: false,
          },
        },
      });
    });

    it("should return the correct media query results for a lg screen", () => {
      act(() => {
        resizeWindow(35);
      });
      expect(getBreakpointResults(component)).toEqual({
        xs: false,
        sm: false,
        md: false,
        lg: true,
        xl: false,
        only: {
          xs: false,
          sm: false,
          md: false,
          lg: true,
          xl: false,
        },
        up: {
          xs: true,
          sm: true,
          md: true,
          lg: true,
          xl: false,
        },
        down: {
          xs: false,
          sm: false,
          md: false,
          lg: true,
          xl: true,
        },
        between: {
          xs: {
            sm: false,
            md: false,
            lg: true,
            xl: true,
          },
          sm: {
            md: false,
            lg: true,
            xl: true,
          },
          md: {
            lg: true,
            xl: true,
          },
          lg: {
            xl: true,
          },
        },
      });
    });

    it("should return the correct media query results for a xl screen", () => {
      act(() => {
        resizeWindow(45);
      });
      expect(getBreakpointResults(component)).toEqual({
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: true,
        only: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: true,
        },
        up: {
          xs: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
        },
        down: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: true,
        },
        between: {
          xs: {
            sm: false,
            md: false,
            lg: false,
            xl: true,
          },
          sm: {
            md: false,
            lg: false,
            xl: true,
          },
          md: {
            lg: false,
            xl: true,
          },
          lg: {
            xl: true,
          },
        },
      });
    });
  });

  describe("Two breakpoints", () => {
    let component;

    beforeAll(() => {
      component = mountDummyBreakpointComponent({ sm: 0, lg: 30 });
    });

    it("should return the correct media query results for a sm screen", () => {
      act(() => {
        resizeWindow(15);
      });
      expect(getBreakpointResults(component)).toEqual({
        sm: true,
        lg: false,
        only: {
          sm: true,
          lg: false,
        },
        up: {
          sm: true,
          lg: false,
        },
        down: {
          sm: true,
          lg: true,
        },
        between: {
          sm: {
            lg: true,
          },
        },
      });
    });

    it("should return the correct media query results for a lg screen", () => {
      act(() => {
        resizeWindow(35);
      });
      expect(getBreakpointResults(component)).toEqual({
        sm: false,
        lg: true,
        only: {
          sm: false,
          lg: true,
        },
        up: {
          sm: true,
          lg: true,
        },
        down: {
          sm: false,
          lg: true,
        },
        between: {
          sm: {
            lg: true,
          },
        },
      });
    });
  });
});
