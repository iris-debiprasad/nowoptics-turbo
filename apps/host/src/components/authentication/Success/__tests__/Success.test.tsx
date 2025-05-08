import { render } from "@testing-library/react"
import Success from "../Success"
import { SuccessPropsDTO } from "@root/host/src/types/auth.type"

describe("", () => {
    const props : SuccessPropsDTO ={
        content: ""
    }
    it("renders the component", () => {
        (render(<Success {...props} />))
    })
})