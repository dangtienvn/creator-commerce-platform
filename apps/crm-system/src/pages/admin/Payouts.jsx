import React from 'react';
import { DollarSign, Send } from 'lucide-react';

export default function Payouts() {
  const mockPayouts = [
    { id: 1, creator: 'Nguyễn Văn A', period: 'Tháng 10/2023', amount: '45,000,000đ', commission: '5,000,000đ', status: 'Pending' },
    { id: 2, creator: 'Trần Thị B', period: 'Tháng 10/2023', amount: '2,250,000đ', commission: '250,000đ', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đối soát & Thanh toán</h2>
          <p className="text-sm text-slate-500">Quản lý các khoản tiền cần thanh toán cho Creator.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          Xuất báo cáo (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Tổng Nợ (Pending)</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">45,000,000đ</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Đã Thanh Toán</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">128,500,000đ</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Creator</th>
              <th className="px-6 py-4 font-medium">Kỳ đối soát</th>
              <th className="px-6 py-4 font-medium">Thực nhận</th>
              <th className="px-6 py-4 font-medium">Phí thu (Hoa hồng)</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockPayouts.map((payout) => (
              <tr key={payout.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{payout.creator}</td>
                <td className="px-6 py-4 text-slate-600">{payout.period}</td>
                <td className="px-6 py-4 font-bold text-blue-600">{payout.amount}</td>
                <td className="px-6 py-4 text-slate-500">{payout.commission}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${payout.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {payout.status === 'Pending' && (
                    <button className="flex items-center justify-end w-full gap-1.5 text-blue-600 hover:text-blue-800 font-medium">
                      <Send className="w-4 h-4" /> Đánh dấu đã CK
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
