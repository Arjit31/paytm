import { memo } from "react";

export const Heading = memo(({label}) => {
  return <div className="font-bold text-4xl pt-6 pb-2">{label}</div>;
});