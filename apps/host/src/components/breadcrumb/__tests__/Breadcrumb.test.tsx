import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "../Breadcrumb";
import { BreadcrumbLink, BreadcrumbProps } from "@/types/Breadcrumb.types";
import "@testing-library/jest-dom";

describe("Breadcrumb component", () => {
  const props: BreadcrumbProps = {
    links: [{ href: "", label: "" }] as BreadcrumbLink[],
  };
  it("renders without errors", () => {
    render(<Breadcrumb {...props} />);
  });

  test("should render breadcrumbs with correct links", () => {
    const links = [
      { label: "Home", href: "/home" },
      { label: "Products", href: "/products" },
      { label: "Shirts", href: "/products/shirts" },
    ];

    render(<Breadcrumb links={links} />);

    const homeLink = screen.getByText("Home");
    const productsLink = screen.getByText("Products");
    const shirtsLink = screen.getByText("Shirts");

    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(shirtsLink).toBeInTheDocument();

    expect(homeLink.getAttribute("href")).toBe("/home");
    expect(productsLink.getAttribute("href")).toBe("/products");
  });
});
