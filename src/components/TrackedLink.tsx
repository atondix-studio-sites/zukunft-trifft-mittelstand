"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProperties?: Record<string, unknown>;
};

export function TrackedLink({ eventName, eventProperties, onClick, ...props }: TrackedLinkProps) {
  return <Link {...props} onClick={(event) => {
    onClick?.(event);
    trackEvent(eventName, eventProperties);
  }} />;
}
