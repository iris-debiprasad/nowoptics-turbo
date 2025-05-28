import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React from 'react'
// import { five9DTO } from "../../../../customer-doctor-support/src/types/five9.type";
/* TODO: getting the query params from the url  http://localhost:3000/support?storeId=0001&custph=9911489970# */
const SupportPage = dynamic(() => import("support/Support"), {
  ssr: false,
}) as React.FunctionComponent<any>;

const Support = () => {
  const router = useRouter();
  // TODO: getting the query params from the url 
  // http://localhost:3000/support?storeId=0091&custph=9911489970&temporaltoken=five9test&DNIS=7252370491&IVRSelection=3&Language=EN&Skill=CA&Brand=SO&call_id=300000006182363
  const _query = router.query as {
    storeId: string | number,
    custph: string | number,
    call_id?: string | undefined | number,
    temporaltoken?: string,
    DNIS?: string,
    IVRSelection?: string,
    Language?: string,
    Skill?: string,
    Brand?: string,
  };

  for (const key in router.query) {

    const element = _query[key as keyof typeof _query];
    switch (key.toLowerCase()) {
      case 'storeid':
        _query.storeId = element as string;
        break;
      case 'customerphoneno':
        _query.custph = element as string;
        break;
      case 'temporaltoken':
        _query.temporaltoken = element as string;
        break;
      case 'dnis':
        _query.DNIS = element as string;
        break;
      case 'ivrselection':
        _query.IVRSelection = element as string;
        break;
      case 'language':
        _query.Language = element as string;
        break;
      case 'skill':
        _query.Skill = element as string;
        break;
      case 'brand':
        _query.Brand = element as string;
        break;
      case 'call_id':
        _query.call_id = element as string;
        break;
    }
  }

  return (
    <div>
      <SupportPage {..._query} />
    </div>
  )
}
export default Support
// Removing header and footer
export const getServerSideProps = async () => {
  const support = true;

  return {
    props: { support: support },
  };
};