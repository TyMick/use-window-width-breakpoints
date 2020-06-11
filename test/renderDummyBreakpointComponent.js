import React from "react";
import useMediaBreakpoints from "../dist/index";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export default function renderDummyBreakpointComponent(breakpoints) {
  function DummyBreakpointComponent() {
    const breakpoint = useMediaBreakpoints(breakpoints);
    return <div>{JSON.stringify(breakpoint)}</div>;
  }

  return shallow(<DummyBreakpointComponent />);
}
