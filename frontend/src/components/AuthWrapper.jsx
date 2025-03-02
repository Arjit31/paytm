export function AuthWrapper({children}) {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
      <div className='w-100 flex flex-col items-center justify-center bg-white px-4 rounded-md drop-shadow-xl'>
        {children}
      </div>
    </div>
  );
}