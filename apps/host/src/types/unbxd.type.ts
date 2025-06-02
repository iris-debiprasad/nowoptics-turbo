export interface UnbxdDTO {
  cookies: {
    userId: string;
    visitId: string;
    visitType: string;
  };
  setCookie: (name: string, value: string, expire?: Date) => void;
  getVisitId: () => string;
  getVisitType: () => string;
}

export interface IUnbxd {
  track: (type: string, obj: { [x: string]: any }) => void;
}
