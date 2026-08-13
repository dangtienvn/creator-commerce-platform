import React, { useState } from 'react';
import { MoreVertical, Search, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export default function TenantManagement() {
  const [search, setSearch] = useState('');

  const { data: creatorsResponse, isLoading, isError } = useQuery({
    queryKey: ['admin-creators', search],
    queryFn: () => api.get(`/users?role=creator${search ? `&search=${search}` : ''}`)
  });

  // Extract the users array from response
  const creators = creatorsResponse?.data || creatorsResponse || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Creators</h2>
          <p className="text-sm text-slate-500">Giám sát và quản lý các tài khoản Creator trên hệ thống.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm creator..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Creator</th>
                <th className="px-6 py-4 font-medium">Sản phẩm</th>
                <th className="px-6 py-4 font-medium">Doanh thu</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    <Loader className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-red-500">
                    Lỗi khi tải dữ liệu creators.
                  </td>
                </tr>
              ) : creators.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy creator nào.
                  </td>
                </tr>
              ) : creators.map((creator) => (
                <tr key={creator.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{creator.full_name || creator.username}</div>
                    <div className="text-slate-500 text-xs">{creator.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {/* Placeholder for products count, as API might not return it directly */}
                    {creator.total_products || 0}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {Number(creator.total_revenue || 0).toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${creator.is_locked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {creator.is_locked ? 'Locked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
