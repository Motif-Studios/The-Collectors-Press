"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  icon: IconDefinition;
  className?: string;
};

export function Icon({ icon, className }: IconProps) {
  return <FontAwesomeIcon icon={icon} className={className} />;
}