import React from "react";
import useWindowWidthBreakpoints from "../dist/index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

function makeDummyBreakpointComponent(breakpoints) {
  return function DummyBreakpointComponent() {
    const breakpoint = useWindowWidthBreakpoints(breakpoints);
    return <div>{JSON.stringify(breakpoint)}</div>;
  };
}

export function shallowDummyBreakpointComponent(breakpoints) {
  const Component = makeDummyBreakpointComponent(breakpoints);
  return shallow(<Component />);
}

export function mountDummyBreakpointComponent(breakpoints) {
  const Component = makeDummyBreakpointComponent(breakpoints);
  return mount(<Component />);
}

export function getBreakpointResults(wrapper) {
  const jsonResults = wrapper.text();
  return JSON.parse(jsonResults);
}
