import * as React from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const onChange = () => {
      setIsMobile(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", onChange);
    setIsMobile(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}
