import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import { render } from "@testing-library/react";
import Text from "..";


describe("Text component test suite", () => {
  test("Render text component", async () => {

    render(
        <Text
          SectionIndex={1}
          QuestionIndex={1}
          questionType={QuestionTypeEnum.RADIOLIST}
        />
    );

  });
});
