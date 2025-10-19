import React, { useEffect, useState } from "react";

export default function Toast({ message, duration = 2500, onClose }) {
  const [visible, setVisible] = useState(!!message);
  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const id = setTimeout(() => { setVisible(false); onClose && onClose(); }, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  if (!visible) return null;
  return (
    <div style={{position:'fixed',right:16,bottom:16,background:'rgba(0,0,0,0.8)',color:'#fff',padding:'10px 14px',borderRadius:8}}>
      {message}
    </div>
  );
}

