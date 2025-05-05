import { UnbxdDTO } from "@/types/unbxd.type";

export const MyUnbxd: UnbxdDTO = {
  cookies: {
    userId: "unbxd_userId",
    visitId: "unbxd_visitId",
    visitType: "unbxd_visitType",
  },
  setCookie: (name, value, expire) => {
    let cookie = name + "=" + value;

    if (expire) {
      cookie += "; expires=" + expire.toUTCString();
    }
    document.cookie = cookie;
  },
  getVisitId: () => {
    let visitId =
      document.cookie.split("unbxd_visitId=").length > 1
        ? document.cookie.split("unbxd_visitId=")[1].split(";")[0]
        : "";
    let now = new Date().getTime();
    let expire = new Date(now + 30 * 60000);

    if (!visitId) {
      visitId = "visitId-" + now + "-" + Math.floor(Math.random() * 100000);
    }

    MyUnbxd.setCookie(MyUnbxd.cookies.visitId, visitId, expire);

    return visitId;
  },
  getVisitType: () => {
    let userId =
      document.cookie.split("unbxd_userId=").length > 1
        ? document.cookie.split("unbxd_userId=")[1].split(";")[0]
        : "";
    let now = new Date().getTime();

    if (!userId) {
      userId = "uid-" + now + "-" + Math.floor(Math.random() * 100000);
      MyUnbxd.setCookie(MyUnbxd.cookies.visitType, "first_time");
    } else {
      MyUnbxd.setCookie(MyUnbxd.cookies.visitType, "repeat");
    }
    MyUnbxd.setCookie(MyUnbxd.cookies.userId, userId);
    return userId;
  },
};
