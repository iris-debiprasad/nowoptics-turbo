const AddGTMEvent = (data: any) => {
  if(data){
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push(data);
    } else {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(data);
    }
    
  }
  else{
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push(data);
    } else {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(data);
    }
  }
}


export default AddGTMEvent;

