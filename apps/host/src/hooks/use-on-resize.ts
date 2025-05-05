import React from "react";
import { throttle } from "@/utils/performance.utils";

export interface Params {
    /** Corresponds to a breakpoint value where when matched, will trigger a toggle value change */
    breakpoint: number;
    /**
     * Throttle time defined in Milliseconds for the resize event
     * @default 300
     */
    throttle?: number;
}

const DEFAULT_THROTTLE_TIME = 300;

/**
 * Resize hook that receives two params to determine when the returned value will change,
 * this hook returns a boolean value that describes if the breakpoint and window.innerWidth
 * have been matched, this hook works as mobile first approach when validating breakpoint
 * provided.
 *
 * Hook will return false when window.innerWidth is lower than the specified breakpoint
 * Hook will return true when window.innerWidth is greater or equal than the specified breakpoint
 */
export const useOnResize = ({
    breakpoint,
    throttle: throttleTime,
}: Params): boolean => {
    const [doMatched, setDoMatched] = React.useState<boolean>(false);

    React.useEffect(() => {
        const activateHoverBasedOnResize = throttle(
            () => setDoMatched(window.innerWidth >= breakpoint),
            throttleTime || DEFAULT_THROTTLE_TIME,
        );

        activateHoverBasedOnResize();
        window.addEventListener("resize", activateHoverBasedOnResize);

        return () =>
            window.removeEventListener("resize", activateHoverBasedOnResize);
    }, []);

    return doMatched;
};
