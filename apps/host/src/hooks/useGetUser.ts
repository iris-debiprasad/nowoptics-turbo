import React from "react";

export interface BasicUser {
    FirstName: string;
    LastName: string;
    MobileNumber: string;
    PatientId: string;
    email: string;
}
const USER_LS_KEY = "user";

export type PartialUser = Partial<BasicUser>;

export const  useGetUser =()=>{

    const [user, setUser] = React.useState<PartialUser>({});

    React.useEffect(() => {
        const userData: PartialUser = JSON.parse(
            localStorage.getItem(USER_LS_KEY) ?? "{}",
        );
        setUser(userData);
        return () => {
            setUser({});
        };
    }, []);
  
  return user;
}

