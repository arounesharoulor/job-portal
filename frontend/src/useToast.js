// useToast.js
import { useState, useCallback } from 'react';

export default function useToast(timeout = 3000) {
  const [toast, setToast] = useState("");

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), timeout);
  }, [timeout]);

  const hideToast = useCallback(() => setToast(""), []);

  return { toast, showToast, hideToast };
}
