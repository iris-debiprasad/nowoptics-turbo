import { useEffect, EffectCallback, DependencyList, useRef } from "react";

type NonInitialCb = void | (() => void | undefined)
/**
 * This hook gets called only when the dependencies change but not during initial render.
 *
 * @param {EffectCallback} effect The `useEffect` callback function.
 * @param {DependencyList} deps An array of dependencies.
 *
 * @example
 * ```
 *  useNonInitialEffect(()=>{
 *      alert("Dependency changed!");
 * },[dependency]);
 * ```
 */
const useNonInitialEffect = (effect: EffectCallback, deps?: DependencyList) => {
	const initialRender = useRef(true);

	useEffect(() => {
		let effectReturns: NonInitialCb = () => {};

        if (initialRender.current) {
			initialRender.current = false;
		} else {
			effectReturns = effect() as NonInitialCb;
		}

		if (effectReturns && typeof effectReturns === "function") {
			return effectReturns;
		}
	}, deps);
};

export default useNonInitialEffect;