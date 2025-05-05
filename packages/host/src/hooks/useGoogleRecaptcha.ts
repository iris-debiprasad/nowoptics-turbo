"use client";
declare var grecaptcha: any;

export const useRecaptchaToken = () => {
  const fetchRecaptchaToken = async (action: string): Promise<string> => {
    // check if window is present
    if (typeof window === "undefined") return Promise.resolve("");
    const NEXT_PUBLIC_RECAPTCHA_ENABLE = window.NEXT_PUBLIC_RECAPTCHA_ENABLE;
    return new Promise((res, rej) => {
      if (NEXT_PUBLIC_RECAPTCHA_ENABLE === "false") res("");
      else {
        grecaptcha.enterprise.ready(function () {
          grecaptcha.enterprise
            .execute(process.env.NEXT_PUBLIC_APP_GOOGLE_CAPTCHA_SITE_KEY, {
              action,
            })
            .then(function (token: string) {
              res(token);
            })
            .catch((err: any) => {
              rej("");
            });
        });
      }
    });
  };
  return { fetchRecaptchaToken };
};
