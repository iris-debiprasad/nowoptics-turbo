import { render } from "@testing-library/react"
import Success from "../Success"
import { SuccessPropsDTO } from "@/types/auth.type"

describe("", () => {
    const props : SuccessPropsDTO ={
        content: ""
    }
    it("renders the component", () => {
        (render(<Success {...props} />))
    })
})