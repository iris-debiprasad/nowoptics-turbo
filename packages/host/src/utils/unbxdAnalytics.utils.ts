export const getRequestIdFromLocalStorage = () => {
  const requestId = localStorage.getItem("unbxd-requestId");
  const parsedRequestId = requestId ? JSON.parse(requestId) : "";

  return parsedRequestId;
};

export const setRequestIdInLocalStorage = (requestId: string) => {
  localStorage?.setItem("unbxd-requestId", JSON.stringify(requestId));
};

export const getPayloadForAnanlytics = (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const requestId = getRequestIdFromLocalStorage();
  const payload = {
    url: window.location.href,
    referrer: (query?.referrer as string) || "",
    visit_type:
      document.cookie.split("unbxd_visitType=").length > 1
        ? document.cookie.split("unbxd_visitType=")[1].split(";")[0]
        : "",
    requestId: requestId,
    uid:
      document.cookie.split("unbxd_userId=").length > 1
        ? document.cookie.split("unbxd_userId=")[1].split(";")[0]
        : "",
    t: `${new Date().getTime() + "|" + Math.random()}`,
  };

  return payload;
};
