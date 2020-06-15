interface Breakpoints {
    xs?: 0;
    sm: number;
    md?: number;
    lg: number;
    xl?: number;
}
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
            xl: boolean;
        };
    };
}
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
export default function useWindowWidthBreakpoints(breakpoints?: Breakpoints): BreakpointResults;
export {};
