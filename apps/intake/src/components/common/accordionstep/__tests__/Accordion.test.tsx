import { store } from "@root/host/src/store/store";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import AccordionStep from "..";

describe("AccordionStep test suite", () => {
  test("Renders the AccordionStep component", () => {
    render(
      <Provider store={store}>
        <AccordionStep SectionIndex={1} index={1} title="Test" Code="dfsdf">
          <span>Test</span>
        </AccordionStep>
      </Provider>
    );
  });

  test("Tests the delete button", () => {
    const { getAllByRole, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <AccordionStep SectionIndex={1} index={1} title="Test" Code="dfsdf">
          <span>Test</span>
        </AccordionStep>
      </Provider>
    );
    const deleteButton = getByTestId("delete-step-button") as HTMLButtonElement;
    fireEvent.click(deleteButton);

    const yesButton = getByLabelText("yes-button") as HTMLButtonElement;
    fireEvent.click(yesButton);
  });

  test("Step title input", () => {
    const { getAllByRole, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <AccordionStep SectionIndex={1} index={1} title="Test" Code="dfsdf">
          <span>Test</span>
        </AccordionStep>
      </Provider>
    );
    const stepTitleInput = getByLabelText(
      "step-title-input"
    ) as HTMLInputElement;
    fireEvent.change(stepTitleInput, { target: { value: "Test Title" } });
    fireEvent.click(stepTitleInput);
  });

  test("Rendering children", () => {
    const { getAllByRole, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <AccordionStep SectionIndex={1} index={1} title="Test" Code="dfsdf">
          <span>Test</span>
        </AccordionStep>
      </Provider>
    );
  });

  test("Tests the no button", () => {
    const { getAllByRole, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <AccordionStep SectionIndex={1} index={1} title="Test" Code="dfsdf">
          <span>Test</span>
        </AccordionStep>
      </Provider>
    );
    const deleteButton = getByTestId("delete-step-button") as HTMLButtonElement;
    fireEvent.click(deleteButton);

    const noButton = getByLabelText("no-button") as HTMLButtonElement;
    fireEvent.click(noButton);
  });

  test("Tests accordion close/open", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AccordionStep SectionIndex={1} index={1} title="Test" Code="dfsdf">
          <span>Test</span>
        </AccordionStep>
      </Provider>
    );
    const stepSpanElement = getByLabelText("step-label") as HTMLSpanElement;
    fireEvent.click(stepSpanElement);
  });
});
