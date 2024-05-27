// Tremor Raw useOnWindowResize [v0.0.0]

import { useEffect } from "react";

export const useOnWindowResize = (handler: { (): void }) => {
  useEffect(() => {
    const handleResize = () => {
      handler();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handler]);
};
