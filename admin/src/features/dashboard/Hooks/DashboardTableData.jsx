export const useTableDashboardHook = () => {
  const columns = [
    {
      name: "ID",
      width: "3%",
      render: (row) => <p>{row.id}</p>,
    },
    {
      name: "Name",
      width: "16%",
      render: (row) => <p>{row.name}</p>,
    },
    {
      name: "Mobile",
      width: "10%",
      render: (row) => <p>{row.mobile}</p>,
    },
    {
      name: "Prayer for Whom",
      width: "16%",
      render: (row) => <p>{row?.forWhom}</p>,
    },
    {
      name: "Request",
      width: "35%",
      render: (row) => <p>{row?.message}</p>,
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => (
        <button className="p-2 rounded-lg bg-[#10B981] text-base font-poppins font-semibold text-white">
          Prayed For
        </button>
      ),
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <button className="p-2 rounded-lg bg-[#10B981] text-base font-poppins font-semibold text-white">
          Prayed For
        </button>
      ),
    },
  ];

  return { columns };
};
