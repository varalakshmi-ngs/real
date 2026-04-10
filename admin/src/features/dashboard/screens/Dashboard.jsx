import React from "react";
import {
  Calendar,
  Image,
  MessageCircle,
  HandHeart,
  Newspaper,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useCountHook } from "../../GlobalHook/CountHook";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { count } = useCountHook();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Prayers",
      value: count.prayerrequests || 0,
      footer: `${count.pendingPrayer || 0} Pending`,
      icon: HandHeart,
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      path: "/request-prayer"
    },
    {
      title: "Total Events",
      value: count.events || 0,
      footer: "Upcoming this week",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
      path: "/event"
    },
    {
      title: "Gallery Images",
      value: count.images || 0,
      footer: "Moments captured",
      icon: Image,
      color: "from-green-500 to-green-600",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      path: "/gallery"
    },
    {
      title: "Donations",
      value: count.donations || 0,
      footer: "Total contributions",
      icon: CheckCircle2,
      color: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
      path: "/contribution"
    }
  ];

  const quickActions = [
    {
      title: "Add Event",
      icon: Calendar,
      color: "blue",
      path: "/event"
    },
    {
      title: "Upload Photos",
      icon: Image,
      color: "green",
      path: "/gallery"
    },
    {
      title: "Post Blog",
      icon: Newspaper,
      color: "amber",
      path: "/blogs"
    },
    {
      title: "Messages",
      icon: MessageCircle,
      color: "purple",
      path: "/contact"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="mt-2 text-lg text-gray-500">Welcome back, Admin. Here is the latest activity for Real Temple.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600">System Online</span>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-400">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(stat.path)}
            className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] -mr-10 -mt-10 rounded-full group-hover:opacity-[0.08] transition-opacity`}></div>
            
            <div className="flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bgLight} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{stat.footer}</span>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Prayer Status */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Prayer Distribution</h2>
            <button 
              onClick={() => navigate("/request-prayer")}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              View Requests
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-amber-600" size={20} />
                  <span className="font-bold text-amber-900">Pending Prayers</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-amber-700">{count.pendingPrayer || 0}</span>
                  <span className="text-sm text-amber-600 font-medium whitespace-nowrap">Awaiting action</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="text-green-600" size={20} />
                  <span className="font-bold text-green-900">Completed Prayers</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-green-700">{count.completedPrayer || 0}</span>
                  <span className="text-sm text-green-600 font-medium whitespace-nowrap">Successfully prayed</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center p-8 border-l border-gray-50">
               <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="#f3f4f6"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * ((count.completedPrayer || 0) / (count.prayerrequests || 1)))}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-gray-900">
                      {Math.round(((count.completedPrayer || 0) / (count.prayerrequests || 1)) * 100)}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Completion</span>
                  </div>
               </div>
               <p className="mt-6 text-sm text-gray-500 leading-relaxed font-medium px-4">
                  Maintaining a consistent prayer schedule for our community.
               </p>
            </div>
          </div>
        </div>

        {/* Quick Launch & System Health */}
        <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-400" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold">Quick Launch</h3>
            </div>
            <div className="hidden xs:flex bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold border border-green-500/20 items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              SYSTEM LIVE
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-3 rounded-xl bg-white/5 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-2">
                  <action.icon size={20} />
                </div>
                <span className="text-xs font-bold tracking-tight uppercase group-hover:text-white transition-colors">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

