import type { ReactNode, SVGProps } from "react";

export default function CheckIcon(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 10 8"
      fill="none"
      {...props}
    >
      <path
        d="M9 1L3.5 6.5L1 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
