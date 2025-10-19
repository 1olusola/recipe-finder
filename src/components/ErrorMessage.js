import React from "react";
export default function ErrorMessage({ title="Error", message="Something went wrong", onRetry }) {
  return (
    <div style={{padding:24, textAlign:'center', color: 'var(--color-text-secondary)'}}>
      <h3 style={{marginBottom:8}}>{title}</h3>
      <p style={{marginBottom:12}}>{message}</p>
      {onRetry && <button style={{background:'var(--color-primary)', color:'#fff', padding:'8px 12px', borderRadius:8}} onClick={onRetry}>Retry</button>}
    </div>
  );
}

