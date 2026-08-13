import React from 'react';
import { Eye, Check, X, FileText, Loader } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function ProductModeration() {
  const queryClient = useQueryClient();

  const { data: responseData, isLoading, isError } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.get('/products')
  });

  const updateProductStatus = useMutation({
    mutationFn: ({ id, status }) => api.put(`/products/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Cập nhật trạng thái sản phẩm thành công');
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  });

  // Extract products and filter those that might need moderation (e.g. draft)
  let products = responseData?.data?.products || responseData?.data || responseData || [];
  if (!Array.isArray(products)) products = [];
  
  // Assuming 'draft' is the status for pending products
  const pendingProducts = products.filter(p => p.status === 'draft' || p.status === 'pending');

  const handleApprove = (id) => {
    updateProductStatus.mutate({ id, status: 'published' });
  };

  const handleReject = (id) => {
    updateProductStatus.mutate({ id, status: 'rejected' }); // Assuming backend accepts 'rejected' or similar
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kiểm duyệt Sản phẩm</h2>
          <p className="text-sm text-slate-500">Xem trước và phê duyệt các sản phẩm mới từ Creator.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <Loader className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-500" />
            <p className="text-slate-500">Đang tải dữ liệu...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-red-300">
            <p className="text-red-500">Lỗi khi tải dữ liệu sản phẩm.</p>
          </div>
        ) : pendingProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">Không có sản phẩm nào cần duyệt.</p>
          </div>
        ) : (
          pendingProducts.map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.product_images?.[0]?.image_url ? (
                    <img src={product.product_images[0].image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Bởi: <span className="font-medium text-slate-700">{product.users_products_created_byTousers?.full_name || product.users_products_created_byTousers?.username || 'Unknown'}</span> 
                    {' '}• Loại: {product.type || 'N/A'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Nộp ngày: {new Date(product.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a 
                  href={`http://localhost:3000/product/${product.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" /> Preview
                </a>
                <button 
                  onClick={() => handleReject(product.id)}
                  disabled={updateProductStatus.isPending}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" /> Từ chối
                </button>
                <button 
                  onClick={() => handleApprove(product.id)}
                  disabled={updateProductStatus.isPending}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> Phê duyệt
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
