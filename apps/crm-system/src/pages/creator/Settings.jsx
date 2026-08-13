import { useState } from 'react';
import { Save, Shield, Bell, Globe, CreditCard, X, Loader } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  const changePasswordMutation = useMutation({
    mutationFn: (data) => api.put('/users/my-password', data),
    onSuccess: () => {
      toast.success("Äá»•i máº­t kháº©u thÃ nh cÃ´ng!");
      setIsPasswordModalOpen(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Lá»—i khi Ä‘á»•i máº­t kháº©u.");
    }
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Máº­t kháº©u má»›i khÃ´ng khá»›p!");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/.test(passwordForm.newPassword)) { toast.error("Mật khẩu mới phải từ 8 ký tự trở lên, chứa ít nhất một chữ hoa, một chữ thường và một ký tự đặc biệt."); return; }
    changePasswordMutation.mutate({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">CÃ i Ä‘áº·t</h1>
        <p className="text-slate-500 mt-1">Quáº£n lÃ½ cÃ¡c tÃ¹y chá»n vÃ  cáº¥u hÃ¬nh há»‡ thá»‘ng cá»§a báº¡n.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <nav className="flex flex-col">
              <button 
                onClick={() => setActiveTab('general')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Globe className="w-4 h-4 mr-3" /> Chung
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Shield className="w-4 h-4 mr-3" /> Báº£o máº­t
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Bell className="w-4 h-4 mr-3" /> ThÃ´ng bÃ¡o
              </button>
              <button 
                onClick={() => setActiveTab('billing')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'billing' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <CreditCard className="w-4 h-4 mr-3" /> Thanh toÃ¡n
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            
            {activeTab === 'general' && (
              <form onSubmit={handleSave}>
                <h2 className="text-lg font-bold text-slate-800 mb-6">CÃ i Ä‘áº·t Chung</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">TÃªn cá»­a hÃ ng</label>
                      <input type="text" defaultValue="Digital Store CRM" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email há»— trá»£</label>
                      <input type="email" defaultValue="support@digitalstore.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">MÃ´ táº£ cá»­a hÃ ng</label>
                    <textarea rows="4" defaultValue="Premium digital products and resources for developers and designers." className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tiá»n tá»‡</label>
                      <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>VND (â‚«)</option>
                        <option>USD ($)</option>
                        <option>EUR (â‚¬)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">MÃºi giá»</label>
                      <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>(GMT+07:00) Indochina Time</option>
                        <option>(GMT+00:00) UTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                  <div className="border-t border-slate-100 pt-6 mt-6">
                    <h3 className="text-md font-semibold text-slate-800 mb-4">TÃ­nh nÄƒng Gian hÃ ng</h3>
                    <div className="flex items-center">
                      <input type="checkbox" id="enableBlog" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="enableBlog" className="ml-2 text-sm font-medium text-slate-700">Báº­t tÃ­nh nÄƒng Blog trÃªn Storefront (Cho phÃ©p Ä‘á»™c giáº£ Ä‘á»c bÃ i viáº¿t cá»§a báº¡n)</label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                      <Save className="w-4 h-4 mr-2" /> LÆ°u thay Ä‘á»•i
                    </button>
                  </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-6">Báº£o máº­t</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">XÃ¡c thá»±c 2 bÆ°á»›c (2FA)</p>
                      <p className="text-sm text-slate-500 mt-1">ThÃªm má»™t lá»›p báº£o máº­t phá»¥ cho tÃ i khoáº£n cá»§a báº¡n.</p>
                    </div>
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                      Báº­t
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Äá»•i máº­t kháº©u</p>
                      <p className="text-sm text-slate-500 mt-1">Cáº­p nháº­t máº­t kháº©u tÃ i khoáº£n thÆ°á»ng xuyÃªn Ä‘á»ƒ tÄƒng cÆ°á»ng báº£o máº­t.</p>
                    </div>
                    <button 
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
                    >
                      Cáº­p nháº­t
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'notifications' || activeTab === 'billing') && (
              <div className="py-12 text-center">
                <p className="text-slate-500 font-medium">TÃ­nh nÄƒng Ä‘ang Ä‘Æ°á»£c phÃ¡t triá»ƒn.</p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Äá»•i máº­t kháº©u</h3>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Máº­t kháº©u hiá»‡n táº¡i</label>
                <input 
                  type="password" 
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nháº­p máº­t kháº©u hiá»‡n táº¡i"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Máº­t kháº©u má»›i</label>
                <input 
                  type="password" 
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nháº­p máº­t kháº©u má»›i"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">XÃ¡c nháº­n máº­t kháº©u má»›i</label>
                <input 
                  type="password" 
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nháº­p láº¡i máº­t kháº©u má»›i"
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Há»§y
                </button>
                <button 
                  type="submit" 
                  disabled={changePasswordMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center disabled:opacity-70"
                >
                  {changePasswordMutation.isPending ? (
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  XÃ¡c nháº­n Ä‘á»•i
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


