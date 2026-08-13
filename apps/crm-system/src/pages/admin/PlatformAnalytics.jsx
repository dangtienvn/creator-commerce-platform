import React from 'react';
import { TrendingUp, Users, ShoppingBag, Activity, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import api from '../../lib/api';

export default function PlatformAnalytics() {
  const { data: reportData, isLoading, isError } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: () => api.get('/reports')
  });

  const data = reportData?.data || {};
  const statsData = data.stats || {};
  
  // Format currency
  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString() + ' ₫';
  };

  const stats = [
    { name: 'Tổng GMV', value: formatCurrency(statsData.total_revenue), icon: TrendingUp, trend: '+12.5%' },
    { name: 'Lợi Nhuận Nền Tảng', value: formatCurrency(statsData.total_profit), icon: Activity, trend: '+12.5%' },
    { name: 'Tổng Khách Hàng', value: Number(statsData.total_customers || 0).toLocaleString(), icon: Users, trend: '+5' },
    { name: 'Tổng Giao Dịch', value: Number(statsData.total_orders || 0).toLocaleString(), icon: ShoppingBag, trend: '+18%' },
  ];

  const revenueByDay = data.revenueByDay || [];
  const orderStatus = data.orderStatus || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Lỗi khi tải dữ liệu báo cáo.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Báo cáo Nền tảng</h2>
          <p className="text-sm text-slate-500">Toàn cảnh hoạt động kinh doanh của Creator Commerce Platform.</p>
        </div>
        <select className="bg-white border border-slate-300 text-slate-700 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
          <option>30 ngày qua</option>
          <option>Tháng này</option>
          <option>Tháng trước</option>
          <option>Năm nay</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-slate-50 group-hover:text-blue-50 transition-colors">
                <Icon className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-slate-600">{stat.name}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Biểu đồ Doanh thu (GMV)</h3>
          <div className="h-80">
            {revenueByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueByDay} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Doanh thu']}
                    labelStyle={{ color: '#64748b' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">Không có dữ liệu biểu đồ</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Trạng thái Đơn hàng</h3>
          <div className="h-80">
            {orderStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatus} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="status" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} name="Số lượng" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">Không có dữ liệu</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
