"use client";

import { useEffect, useRef } from "react";

export default function TravelpayoutsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Guard against React Strict Mode double-injection
    if (container.querySelector("script[data-tp-widget]")) return;

    const script = document.createElement("script");
    script.src =
      "https://tpemd.com/content?currency=usd&trs=582829&shmarker=787006&show_hotels=false&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=5&no_labels=&plain=true&destination=KTM&promo_id=7879&campaign_id=100";
    script.async = true;
    script.charset = "utf-8";
    script.setAttribute("data-tp-widget", "true");
    container.appendChild(script);
  }, []);

  return (
    <div
      id="tp-widget-container"
      ref={containerRef}
      className="w-full min-h-[120px]"
    />
  );
}