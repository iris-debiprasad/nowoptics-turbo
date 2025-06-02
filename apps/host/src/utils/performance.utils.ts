/**
 * Removes unwanted input noise from buttons, switches or other user input.
 * Debouncing prevents extra activations or slow functions from triggering too often.
 *
 * @param cb Function that is going to be run
 * @param wait debounce delay in MS
 * @returns debounced function
 */
export const debounce = <T extends Function>(cb: T, wait = 20) => {
  let h: NodeJS.Timer;

  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };

  return callable;
};

/**
 * function or technique used to limit the rate at which a particular function is executed,
 * typically in response to events like scrolling, resizing, or keyboard input. Throttling
 * helps ensure that a function is called at a controlled and reduced frequency, which can
 * be useful for optimizing performance and preventing excessive resource consumption.
 *
 * @param fn Function to throttle
 * @param wait delay for the throttled function to execute again
 * @returns throttled function
 */
export const throttle = (fn: Function, wait: number = 300) => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number;

  return function(this: any) {
    const context = this,
      args = arguments;

    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);

      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0),
      );
    }
  };
};
