import React from "react";
export default function LoadingSpinner(){ 
  return (
    <div style={{display:'grid',placeItems:'center',padding:'32px'}}>
      <div style={{width:44,height:44,borderRadius:22,border:'5px solid #eee',borderTop:'5px solid var(--color-primary)',animation:'spin 1s linear infinite'}}/>
      <style>{`@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

