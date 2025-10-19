import { useState } from "react";

/**
 * A React hook that provides graceful fallback behavior for broken <img> tags.
 * Usage:
 * const { handleError } = useImageFallback("https://fallback-url.com/fallback.jpg");
 * <img src="/assets/images/example.jpg" onError={handleError} alt="example" />
 */
export default function useImageFallback(fallbackUrl) {
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    if (!hasError) {
      e.target.onerror = null;
      e.target.src = fallbackUrl;
      setHasError(true);
    }
  };

  return { handleError };
}
