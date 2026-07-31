"use client";

import { useEffect } from "react";

export function PwaRegistry() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Service Worker registrado com sucesso: ", registration.scope);
          },
          (err) => {
            console.log("Falha ao registrar o Service Worker: ", err);
          }
        );
      });
    }
  }, []);

  return null;
}
