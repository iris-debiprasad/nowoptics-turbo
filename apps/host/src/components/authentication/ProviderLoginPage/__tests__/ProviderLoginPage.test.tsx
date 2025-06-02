import { fireEvent, render } from "@testing-library/react"
import ProviderLoginPage from "../ProviderLoginPage"
import { AuthPropsDTO, SuccessPropsDTO } from "@root/host/src/types/auth.type"

describe("", () => {

    const props: AuthPropsDTO = {
        providers: {
           providers: {
            "id": {
                id : "azure-ad",
                name: "",
                signinUrl: "",
                type: ""
            }
           }
        },
    }

    it("renders the component", () => {
        (render(<ProviderLoginPage  {...props} />))
    })

    // TODO - need to add this later for handle click
    // it("handle click", () => {
    //     const handleClick = jest.fn();
    //     const {getByTestId} = (render(<ProviderLoginPage  {...props} />))
    //     const signInButton = getByTestId("sign-in");
    //     fireEvent.click(signInButton)
    //     expect(handleClick).toHaveBeenCalled();
    // })
})