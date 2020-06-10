# useMediaBreakpoints

[![npm version](https://img.shields.io/npm/v/@tywmick/use-media-breakpoints.svg)](https://npmjs.org/package/@tywmick/use-media-breakpoints "View this package on npm")
[![npm bundle size](https://img.shields.io/bundlephobia/min/@tywmick/use-media-breakpoints)](https://npmjs.org/package/@tywmick/use-media-breakpoints "View this package on npm")
[![MIT license](https://img.shields.io/npm/l/@tywmick/use-media-breakpoints.svg)](/LICENSE.md)

A React hook for using screen width breakpoints.

I essentially wanted to duplicate the logic of [Bootstrap's `media-breakpoint` Sass mixins](https://getbootstrap.com/docs/4.5/layout/overview/#responsive-breakpoints) within my React code.

## Installation

```sh
npm install @tywmick/use-media-breakpoints
# OR
yarn add @tywmick/use-media-breakpoints
```

## Usage

After importing the hook...

```js
import useMediaBreakpoints from "@tymick/use-media-breakpoints";
```

...call it from the top level of your React function.

```js
const breakpoint = useMediaBreakpoints({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});
```

The hook has one optional parameter: an object containing the set of screen width breakpoints (in pixels) you wish to use. If this parameter is omitted, [Bootstrap's default breakpoints](https://getbootstrap.com/docs/4.5/layout/overview/#containers) will be used. If you choose to specify your own set of breakpoints, `sm` and `lg` breakpoints are required, while `xs`, `md`, and `xl` breakpoints are optional.

This hook returns an object containing the boolean results of several media queries. For example, if the width of the window is `800px`, the value of `breakpoint` (as defined above) will be

```js
{
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
}
```

What's that good for? Say you have a React component you only want to display on `md`-sized screens. Thow this into your JSX:

```jsx
{breakpoint.md && <MyComponent />}
{/* OR */}
{breakpoint.only.md && <MyComponent />}
```

Or maybe you want to use one component on larger screens and a different one on smaller screens:

```jsx
{breakpoint.up.lg ? <LargerVersion /> : <SmallerVersion />}
```

Or maybe you want to describe the size of the screen in paragraph form with an odd sort of precision:

```jsx
<p>
  This screen is {breakpoint.between.sm.lg ? "" : "pretty "}
  {breakpoint.down.sm ? "small" : breakpoint.up.lg ? "big" : "average"}.
</p>
```

But that's up to you.

Have fun!
