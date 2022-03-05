import { SvgIconProps } from "@mui/material";

interface Icon extends SvgIconProps {
  testId: string;
}

type TypeSVG = JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>;

interface SVG extends TypeSVG {
  testId: string;
}

export type { Icon, SVG };
