# useWindowWidthBreakpoints

[![npm version](https://img.shields.io/npm/v/use-window-width-breakpoints)](https://www.npmjs.com/package/use-window-width-breakpoints "View this package on npm")
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/use-window-width-breakpoints/peer/react)](https://www.npmjs.com/package/use-window-width-breakpoints "View this package on npm")
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-window-width-breakpoints)](https://bundlephobia.com/result?p=use-window-width-breakpoints "View this package on BundlePhobia")
[![License: Apache-2.0](https://img.shields.io/npm/l/use-window-width-breakpoints)](/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg)](/CODE_OF_CONDUCT.md)

- **[Installation](#installation)**
- **[Usage](#usage)**
- **[Contributing](#contributing)**
- **[Related projects](#related-projects)**

A React hook for using window width breakpoints.

I essentially wanted to duplicate the logic of [Bootstrap's `media-breakpoint` Sass mixins](https://getbootstrap.com/docs/4.5/layout/overview/#responsive-breakpoints) within my React code.

<h2 id="installation">Installation</h2>

```sh
npm install use-window-width-breakpoints
# OR
yarn add use-window-width-breakpoints
```

<h2 id="usage">Usage</h2>

After importing the hook...

```js
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
```

...call it from the top level of your React function.

```js
const breakpoint = useWindowWidthBreakpoints({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});
```

The hook has one optional parameter: an object containing the set of window width breakpoints (in pixels) you wish to use. If this parameter is omitted, [Bootstrap's default breakpoints](https://getbootstrap.com/docs/4.5/layout/overview/#containers) will be used. If you choose to specify your own set of breakpoints, `sm` and `lg` breakpoints are required, while `xs`, `md`, and `xl` breakpoints are optional.

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

Or maybe you want to describe the size of the window in paragraph form with an odd sort of precision:

```jsx
<p>
  This window is {breakpoint.between.sm.lg ? "" : "pretty "}
  {breakpoint.down.sm ? "small" : breakpoint.up.lg ? "big" : "average"}.
</p>
```

But that's up to you.

Have fun!

<h2 id="contributing">Contributing</h2>

If you'd like to contribute to this project (which would be awesome), here's how to set it up:

1. [Fork this repository](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) to your own GitHub account.

2. Clone it to your device.

   ```sh
   git clone https://github.com/YOUR_USERNAME/use-window-width-breakpoints.git
   ```

3. Add this repository as a remote, so you can pull upstream changes in the future with `git pull upstream master`.

   ```sh
   cd use-window-width-breakpoints
   git remote add upstream https://github.com/tywmick/use-window-width-breakpoints.git
   ```

4. Install dependencies.

   ```sh
   npm install
   ```

Now, you can build the package with `npm run build`, build _and_ watch for changes with `npm run dev` (automatically rebuilding on each change in the source), and run the test suite with `npm run test`.

After building the package, you can test it in another project on your machine by [adding the local path](https://docs.npmjs.com/files/package.json#local-paths) as a dependency (e.g., by running `npm install /path/to/local/use-window-width-breakpoints` in that other project).

<h2 id="related-projects">Related projects</h2>

- [useWindowOrientation](https://github.com/tywmick/use-window-orientation)
