import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { USER_TYPE } from "./constants/common.constants";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  const url = request.nextUrl.clone();
  let urlPathName = request.nextUrl.pathname;

  // TODO: This is a hack to fix the issue with the pipe url. This need to be fixed on Azure side.
  if (urlPathName.startsWith("//pipe/")) {
    const segments = urlPathName.split("/");
    const newSegments = segments.slice(4);
    urlPathName = "/" + newSegments.join("/");
  }

  if (!session) {
    if (urlPathName.startsWith("/my-account/order-history")) {
      url.pathname = "/my-account";
      url.searchParams.set("page", "my-account-order");
      return NextResponse.redirect(url);
    }
    if (urlPathName.startsWith("/my-account/my-prescriptions")) {
      url.pathname = "/my-account";
      url.searchParams.set("page", "my-account-prescription");
      return NextResponse.redirect(url);
    }
  }

  //* Note: This code is commented beacuse of this ticket [IR-1574]

  // if (session) {
  //   if (
  //     urlPathName === "/my-account/" &&
  //     url.searchParams.get("view") === "forgot-password"
  //   ) {
  //     url.pathname = "/my-account/";
  //     url.searchParams.delete("view");
  //     return NextResponse.redirect(url);
  //   }
  // }

  if ((session?.user as any)?.authData?.userType !== USER_TYPE.ASSOCIATE) {
    if (
      urlPathName.startsWith("/managed-care") ||
      urlPathName.startsWith("/appointments") ||
      urlPathName.startsWith("/doctor-scheduler") ||
      urlPathName.startsWith("/intake") ||
      urlPathName.startsWith("/operations") ||
      urlPathName.startsWith("/patient") ||
      urlPathName.startsWith("/patient-communication") ||
      urlPathName.startsWith("/setup") ||
      urlPathName.startsWith("/job-tracking") ||
      urlPathName.startsWith("/pending-cart") ||
      urlPathName.startsWith("/self-checkin") ||
      urlPathName.startsWith("/orders/pending-web-orders") ||
      urlPathName.startsWith("/job-tracking") ||
      urlPathName.startsWith("/contact-lens-calculator")
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (
    (session?.user as any)?.authData?.userType !== USER_TYPE.PATIENT &&
    (session?.user as any)?.authData?.userType !== USER_TYPE.ASSOCIATE
  ) {
    if (urlPathName.startsWith("/my-account")) {
      if (
        urlPathName !== `/my-account/` &&
        urlPathName !== `/my-account?view="forgot-password"`
      ) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  }

  //* Note: This code is commented beacuse of this ticket [IR-1351]
  // if ((session?.user as any)?.authData?.userType === USER_TYPE.ASSOCIATE) {
  //   if (
  //     urlPathName.startsWith("/book-eye-exam") ||
  //     urlPathName.startsWith("/my-account")
  //   ) {
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  // }

  // TODO - will uncomment if needed
  // if ((session?.user as any)?.authData?.userType !== USER_TYPE.PATIENT) {
  //   if (urlPathName.startsWith("/prescription-renewal")) {
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  // }
}
