import { screen, render } from "@testing-library/react";
import { ResponsiveBanner } from "../responsive-banner";
import "@testing-library/jest-dom/extend-expect";

const PROPS = {
    tabletAndDesktop: {
        alt: "Kittens",
        src: "https://placekitten.com/1230",
    },
    mobile: { alt: "Kittens", src: "https://placekitten.com/600" },
};

describe("<ResponsiveBanner />", () => {
    beforeEach(() => render(<ResponsiveBanner {...PROPS} />));

    it("Should render the images correctly", () => {
        const images = screen.getAllByRole("img");
        const [mobile, tabletAndDesktop] = images;

        expect(images).toHaveLength(2);

        expect(mobile.getAttribute("alt")).toBe(PROPS.mobile.alt);
        expect(tabletAndDesktop.getAttribute("alt")).toBe(
            PROPS.tabletAndDesktop.alt,
        );
        expect(mobile).toHaveClass("banner banner--mobile");
        expect(tabletAndDesktop).toHaveClass("banner banner--tablet-and-desktop");
    });
});
