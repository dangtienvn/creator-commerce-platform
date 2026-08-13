import React from 'react';
import { Settings, Save, Bell, Shield } from 'lucide-react';

export default function GlobalSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt Hệ thống</h2>
          <p className="text-sm text-slate-500">Cấu hình các tham số cốt lõi của nền tảng.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4" /> Lưu thay đổi
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Cấu hình Chung</h3>
          </div>
          
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên Nền Tảng</label>
              <input type="text" defaultValue="Creator Commerce" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tỷ lệ Hoa hồng Mặc định (%)</label>
              <input type="number" defaultValue="10" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-slate-500 mt-1">Sẽ tự động trừ vào mỗi giao dịch thành công của Creator.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Thông báo (Banner) Toàn cục</h3>
          </div>
          
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung Banner</label>
              <textarea rows="3" placeholder="Nhập thông báo bảo trì hoặc sự kiện..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="enableBanner" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="enableBanner" className="text-sm text-slate-700">Kích hoạt hiển thị Banner</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
