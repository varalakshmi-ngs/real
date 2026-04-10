import HeaderWithActions from "../../utils/HeaderWithActions";
import { FilterIcon } from "lucide-react";
import { useRequestPrayerDataHook } from "./Hooks/request-prayer-data";
import { useRequestPrayerHook } from "./Hooks/request-prayer.hook";
import Table from "../../utils/table/Table";
import { ClipLoader } from "react-spinners";
import DashboardNumberCard from "../dashboard/components/DashboardNumberCard";
import { useCountHook } from "../GlobalHook/CountHook";

const RequesrForPrayer = () => {
  const {
    requestForPrayer,
    totalPages,
    handlePageClick,
    loading,
    currentPage,
    error,
    searchContact,
    deletPrayerRequesr,
    isPrayerRequest,
    searchText, // get current search text
  } = useRequestPrayerHook();

  const { columns } = useRequestPrayerDataHook({
    deletPrayerRequesr,
    isPrayerRequest,
  });

  const { count } = useCountHook();

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-4  items-center">
        <DashboardNumberCard
          title="Prayer Requests Pending"
          number={count.pendingPrayer}
        />
        <DashboardNumberCard
          title="Prayer Requests Completed"
          number={count.completedPrayer}
        />
      </div>

      <HeaderWithActions
        title="Prayer Requests"
        subtitle="Manage and respond to prayer requests submitted by community members"
        onSearch={searchContact} // pass handler
        searchValue={searchText} // pass value for controlled input
        onFilterClick={() => {}}
        filterButtonText="Filter"
        FilterIcon={FilterIcon}
        btnWidth="w-[120px] bg-[#0048F9] text-white"
      />

      {loading ? (
        <div className="w-full h-[300px] bg-slate-50 border border-slate-200 flex justify-center items-center rounded-md">
          <ClipLoader color="#E60023" size={30} />
        </div>
      ) : error ? (
        <div className="w-full h-[300px] bg-slate-50 border border-slate-200 flex justify-center items-center rounded-md text-rose-600 font-semibold">
          {error}
        </div>
      ) : (
        <Table
          columns={columns}
          data={requestForPrayer}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default RequesrForPrayer;
