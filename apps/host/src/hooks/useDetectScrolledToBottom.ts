import { useState, useEffect, useCallback, RefObject } from "react";

const useDetectScrolledToBottom = (node: RefObject<HTMLDivElement>) => {
  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = useCallback(() => {
    if (!node.current) return;
    const { scrollTop, scrollHeight, clientHeight, offsetHeight } = node.current;
    if (scrollTop + offsetHeight >= scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, [node]);
  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      return () => {
        if (node.current) {
          node.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [node.current, handleScroll]);
  return { isBottom };
};

export default useDetectScrolledToBottom;
