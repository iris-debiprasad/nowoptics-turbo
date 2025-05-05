import React, {useEffect, useState} from "react";

export const useInfiniteScroll = (pageChange: () => void, enableFooterAsObserver: boolean) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const observerTarget = React.useRef(null);

    useEffect(() => {
        if(scrollPosition > 0) {
            pageChange()
        }
    }, [scrollPosition]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setScrollPosition(prev => prev+1)
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            const subFooter = document.getElementById('footer-main-box');
            const footerBox = document.getElementById('sub-footer');
            observer.observe(observerTarget.current);

            if(subFooter && enableFooterAsObserver) {
                observer.observe(subFooter)
            }

            if(footerBox && enableFooterAsObserver) {
                observer.observe(footerBox)
            }
            
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget]);

    return observerTarget;
};
