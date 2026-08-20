# Troubleshooting & Known Issues

TÃ i liá»‡u nÃ y ghi chÃ©p láº¡i cÃ¡c váº¥n Ä‘á» ká»¹ thuáº­t phá»©c táº¡p phÃ¡t sinh trong quÃ¡ trÃ¬nh phÃ¡t triá»ƒn dá»± Ã¡n vÃ  hÆ°á»›ng giáº£i quyáº¿t, nháº±m lÃ m tÃ i liá»‡u tham kháº£o cho viá»‡c tÃ¬m hiá»ƒu vÃ  quÃ¡ trÃ¬nh báº£o trÃ¬ há»‡ thá»‘ng.

---

### 1. Monorepo React Instance Conflict (Invalid Hook Call)

- **Component áº£nh hÆ°á»Ÿng:** CÃ¡c dá»± Ã¡n Frontend sá»­ dá»¥ng Vite (nhÆ° `crm-system`).
- **Triá»‡u chá»©ng:** Giao diá»‡n render mÃ n hÃ¬nh tráº¯ng. TrÃ¬nh duyá»‡t bÃ¡o lá»—i `Invalid hook call` hoáº·c `Cannot read properties of null (reading 'useContext')` dÃ¹ cÃº phÃ¡p React hoÃ n toÃ n há»£p lá»‡.
- **NguyÃªn nhÃ¢n gá»‘c rá»… (Root Cause):** Dá»± Ã¡n sá»­ dá»¥ng cáº¥u trÃºc Monorepo. QuÃ¡ trÃ¬nh module resolution cá»§a Vite vÃ´ tÃ¬nh load song song 2 phiÃªn báº£n React (má»™t báº£n tá»« root `node_modules` cá»§a workspace vÃ  má»™t báº£n tá»« local `node_modules` cá»§a package con) thÃ´ng qua má»™t sá»‘ thÆ° viá»‡n UI third-party (nhÆ° `lucide-react`). Viá»‡c cÃ³ 2 instance cá»§a React cÃ¹ng cháº¡y phÃ¡ vá»¡ cÆ¡ cháº¿ cáº¥p phÃ¡t context cá»§a Hook.
- **Giáº£i phÃ¡p:** Override cáº¥u hÃ¬nh module resolution cá»§a Vite Ä‘á»ƒ Ã©p buá»™c (dedupe) táº¥t cáº£ cÃ¡c package dÃ¹ng chung má»™t instance React duy nháº¥t.
  ThÃªm cáº¥u hÃ¬nh sau vÃ o `vite.config.js`:
  ```javascript
  export default defineConfig({
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  });
  ```

### 2. Relative Import Resolution Failure trong Vite

- **Component áº£nh hÆ°á»Ÿng:** Vite Dev Server (`crm-system`).
- **Triá»‡u chá»©ng:** HMR tháº¥t báº¡i hoáº·c Vite nÃ©m lá»—i `Pre-transform error: Failed to resolve import`.
- **NguyÃªn nhÃ¢n:** Khi tÃ¡i cáº¥u trÃºc láº¡i thÆ° má»¥c dá»± Ã¡n (chuyá»ƒn cÃ¡c page component vÃ o cÃ¡c sub-directories nhÆ° `src/pages/creator/`), cÃ¡c relative import path liÃªn káº¿t Ä‘áº¿n shared libraries (nhÆ° `lib/api`) khÃ´ng tá»± Ä‘á»™ng trá» Ä‘Ãºng Ä‘á»™ sÃ¢u thÆ° má»¥c (cáº§n lÃ¹i 2 cáº¥p thay vÃ¬ 1 cáº¥p).
- **Giáº£i phÃ¡p:** Cháº¡y script regex hÃ ng loáº¡t Ä‘á»ƒ cáº­p nháº­t láº¡i cáº¥u trÃºc import paths (`"../lib/api"` -> `"../../lib/api"`) Ä‘áº£m báº£o Ä‘á»“ng bá»™ vá»›i kiáº¿n trÃºc thÆ° má»¥c má»›i.

### 3. Prisma Database Lock & Schema Desync

- **Component áº£nh hÆ°á»Ÿng:** Backend Core (`packages/database`).
- **Triá»‡u chá»©ng:** Express nÃ©m lá»—i `relation "table_name" does not exist` khi query dá»¯ liá»‡u; hoáº·c Prisma Client nÃ©m lá»—i `PrismaClientInitializationError / EPERM` khi cháº¡y migrate.
- **NguyÃªn nhÃ¢n:**
  1. Xáº£y ra tÃ¬nh tráº¡ng Desync giá»¯a Prisma schema á»Ÿ code base vÃ  schema thá»±c táº¿ dÆ°á»›i Postgres (do thao tÃ¡c reset DB thá»§ cÃ´ng).
  2. Viá»‡c cháº¡y lá»‡nh Prisma generate/migrate trÃªn Windows gáº·p lá»—i do file `query_engine-windows.dll.node` bá»‹ process cá»§a Node.js (nodemon) khÃ³a cá»©ng (File lock).
- **Giáº£i phÃ¡p:** Cáº§n tuÃ¢n thá»§ quy trÃ¬nh chuáº©n khi thay Ä‘á»•i schema:
  - Dá»«ng hoÃ n toÃ n tiáº¿n trÃ¬nh backend server Ä‘ang chiáº¿m dá»¥ng káº¿t ná»‘i.
  - Cháº¡y migrate Ä‘á»“ng bá»™ schema má»™t cÃ¡ch an toÃ n: `npx prisma migrate dev --name sync_schema`.
  - Khá»Ÿi Ä‘á»™ng láº¡i service.

### 4. Infinite Login Loop (Vòng lặp Đăng nhập Vô tận)

- **Component Ảnh hưởng:** CRM Frontend (pps/crm-system).
- **Triệu chứng:** Người dùng đăng nhập thành công, nhận token hợp lệ, chuyển hướng sang màn hình Dashboard, thấy màn hình load một lát rồi bị đẩy ngược lại trang Login liên tục.
- **Nguyên nhân Gốc rễ:** 
  Tính năng 'Ghi nhớ đăng nhập' (Remember Me) chưa được thiết kế đồng bộ. Khi người dùng không tích vào ô Ghi nhớ đăng nhập, Login.jsx sẽ ghi token vào sessionStorage. Tuy nhiên, trình gác cổng AuthGuard.jsx và context AuthContext.jsx lại được hardcode chỉ kiểm tra token ở localStorage. Do đó, sau khi redirect, AuthContext check localStorage trả về 
ull, lầm tưởng user chưa đăng nhập nên đá ngược về /login.
- **Giải pháp:** Cập nhật AuthContext.jsx để ưu tiên tìm kiếm token ở cả hai vị trí: const token = localStorage.getItem('token') || sessionStorage.getItem('token');.
