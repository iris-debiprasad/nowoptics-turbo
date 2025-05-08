import { AxiosRequestConfig } from "axios";

export function HeaderConfig() {
  let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiI3MzFhYmQ2MC00ODI4LTRkMmUtOTczNS0xMmExOTg5YjIwYTMiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZTBkMjFjYjMtODYwZS00YzBmLTljMjAtZWYxYjc0NjZhOTVjL3YyLjAiLCJpYXQiOjE3NDY1NDA1MjAsIm5iZiI6MTc0NjU0MDUyMCwiZXhwIjoxNzQ2NTQ0NDIwLCJhaW8iOiJBYVFBVy84WkFBQUE0ZC96azFreWhraUtSSzA3ckE1ZEQvTG9MWnVmVWtwN3VZa1FLOHVIN0xHekltOW8rTmdicDVZMFYzYUw3ZzlOVkc3UFhNL3Z2NnN3RUpiUXZiQWxyckYwMHFBQWd4WFVxRVVybjRHSG1XY3hnZTdDVmVCd0dxK2E1eU51ejAzdXVlQXZKYWsxUi9TZmM4MkJQUStaZE9vOVRia0ZwWEg2Yis1UCtGNitUR2xFbnNRNTJud3RINzlQb1Q4SWxlM2dZNElXNURNQWdydVlqN0diRUFIN3NBPT0iLCJuYW1lIjoiRGViaXByYXNhZCBEYXNoIiwib2lkIjoiYzkwNmIwZmUtODA3MC00OGFmLWE2OWEtODQwZTkyN2I4YjkyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGViaXByYXNhZC54LmRhc2hAbm93b3B0aWNzLmNvbSIsInJoIjoiMS5BVGNBc3h6UzRBNkdEMHljSU84YmRHYXBYR0M5R25Nb1NDNU5selVTb1ppYklLTTNBR2MzQUEuIiwic2lkIjoiMDAyMjM1ZTktMGUzMi0xOTg2LTUwYzgtY2RkMGI3ZDA3MzNjIiwic3ViIjoidGVmOXVnVXZlRmZSREUwcnFvZ213cnRqaXRlUjYwejl3eVlDcm82dTc4SSIsInRpZCI6ImUwZDIxY2IzLTg2MGUtNGMwZi05YzIwLWVmMWI3NDY2YTk1YyIsInV0aSI6IlIxb2VvS0txckVDSFV0X1VkOHp1QUEiLCJ2ZXIiOiIyLjAifQ.SixdNqDgXYdN16m3hG7xZ5tTwG-dAJdxNWKSakql9QYjxxABMLDAdWjfJO73C4EUsWpEoecKuDI_pwlr2U8T4r3jSKtddj7BkjWZLcudNcKJ0LL68Vh8jT6tohyP2Qd_ULkE4usX50583hON6oUxm3rQNCFfPN7MzivOoL9xPTG9i2vOHZ-YDqywfW3IaNUTLzNYyIbqzL4d2GybhXCUKSQS5lcqG_U6VUK-ac-VJ5WWYxNYxu8-qp55dFSNz15SUa4_AnHHogkdHAagfYCCP1h3zuRWlJJTo9GMfHEGIgsUDxTH37U_pXemWtLMwNU-yUTeekBt9ZA25tynxxrZEQ";

  // if (typeof window !== "undefined" && localStorage && localStorage.getItem) {
  //   const session = localStorage.getItem("session")
  //     ? JSON.parse(localStorage.getItem("session") as string)
  //     : "";
  //   token = session?.user?.accessToken;
  // }
  const config: AxiosRequestConfig | any = {
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  return config;
}
