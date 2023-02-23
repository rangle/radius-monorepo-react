import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";

hydrateRoot(
  document,
  <StrictMode>
      <RemixBrowser />
  </StrictMode>
);