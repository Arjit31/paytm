import { Link } from "react-router-dom"
import { memo } from 'react';

export const BottomWarning = memo(({label, buttonText, to}) => {
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
});