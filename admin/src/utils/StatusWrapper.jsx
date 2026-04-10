import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const StatusWrapper = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="w-full h-[300px] bg-slate-50 border border-slate-200 flex justify-center items-center rounded-md text-slate-700">
        <ClipLoader color="#f97316" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[300px] bg-slate-50 border border-slate-200 flex justify-center items-center rounded-md text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return <>{children}</>;
};

export default StatusWrapper;
