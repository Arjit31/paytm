import { memo } from 'react';

export const InputBox = memo(({ label, placeholder, type, id, onChange, value }) => {
  console.log('InputBox rendered');
  return (
    <div className="pb-1 w-full">
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input placeholder={placeholder}
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        className="w-full p-1 border rounded border-slate-200" />
    </div>
  );
});