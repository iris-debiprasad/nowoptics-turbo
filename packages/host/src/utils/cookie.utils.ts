import Cs from "js-cookie";

/**
 * Remove all cookie on same domain
 */
export const clearAllCookie = () => {
  const cookies = Cs.get();
  let cookieKeys = Object.keys(cookies);
  const domain = window.location.hostname;
  cookieKeys.forEach((key) => {
    if (key !== "language") {
      Cs.remove(key, { path: "", domain });
      Cs.remove(key, { path: "/", domain });
    }
  });
};

/** 
 * Object that contains commons methods to manipulate cookies, can be imported from other
 * modules of the application to avoid installing new dependencies for handling cookies.
 */
export const Cookies = {
  create: Cs.set,
  get: Cs.get,
  remove: Cs.remove,
};
