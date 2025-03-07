import { memo } from "react";

export const Subheading = memo(({label}) => {
  return <div className="text-slate-500 text-md pt-1 pb-2 text-center">{label}</div>;
});