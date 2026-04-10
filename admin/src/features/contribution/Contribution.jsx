import React from "react";
import DashboardNumberCard from "../dashboard/components/DashboardNumberCard";
import HeaderWithActions from "../../utils/HeaderWithActions";
import { Banknote, FilterIcon, HeartHandshake, Users } from "lucide-react";
import { useContribution } from "./Hooks/contribution.hook";
import Table from "../../utils/table/Table";
import { useContributionDataHook } from "./Hooks/contribution.data";
import { useCountHook } from "../GlobalHook/CountHook";
import { motion } from "framer-motion";

const Contribution = () => {
  const { contribution, totalamount, setSearch, search, deleteContribution } =
    useContribution();
  const { columns } = useContributionDataHook(deleteContribution);
  const { count } = useCountHook();

  const totalDonors = count?.donations ?? 0;
  const averageDonation =
    totalDonors > 0 ? (totalamount / totalDonors).toFixed(2) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full h-full flex flex-col gap-6 pb-8"
    >
      <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
        <DashboardNumberCard
          title="Donations (This Month)"
          number={totalamount || 0}
          icon={<HeartHandshake size={20} color="white" />}
        />

        <DashboardNumberCard
          title="Total Donors"
          number={count?.donations || 0}
          icon={<Users size={20} color="white" />}
        />

        <DashboardNumberCard
          title="Average Donation"
          number={averageDonation}
          icon={<Banknote size={20} color="white" />}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HeaderWithActions
          title="Manage Contributions"
          subtitle="View and manage church donations"
          onSearch={setSearch}
          searchValue={search} 
          onFilterClick={() => {}}
          filterButtonText="Filter"
          FilterIcon={FilterIcon}
          btnWidth="w-[120px] bg-red-600 text-white hover:bg-red-700 transition-colors"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex-1 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 p-2 overflow-hidden">
        <Table
          columns={columns}
          data={contribution}
          search={search}
        />
      </motion.div>
    </motion.div>
  );
};

export default Contribution;
