# CRM UI Audit — Initial findings

Đường dẫn quét: apps/crm-system/src/*

Tóm tắt nhanh
- Mã hiện tại dùng cùng layout/structure cho cả Admin và Creator (AdminLayout + Sidebar + Header), khiến giao diện CRM khó khác biệt rõ rệt so với admin panel.
- Giao diện hiện tại sử dụng glassmorphism (glass, glass-panel), nền gradient nhẹ và font Outfit — trông hiện đại nhưng dễ gây "giống sản phẩm mẫu" nếu không có nhận diện riêng.
- Có biến CSS (ví dụ --color-primary: #4f46e5) và tập tin CSS toàn cục (index.css, App.css) — thuận lợi để áp token theme nhanh.

Files chính đã kiểm tra
- .\apps\crm-system\src\index.css (global tokens, glassmorphism)
- .\apps\crm-system\src\App.css
- .\apps\crm-system\src\App.jsx
- .\apps\crm-system\src\layouts\AdminLayout.jsx
- .\apps\crm-system\src\layouts\Header.jsx
- .\apps\crm-system\src\layouts\Sidebar.jsx
- Pages: .\apps\crm-system\src\pages\creator\Dashboard.jsx, Customers.jsx, Orders.jsx, Products.jsx, Reports.jsx, Settings.jsx

Hiện trạng / Vấn đề chính
1) Nhận diện trùng lặp
   - Sidebar hiển thị "CRMSystem" text; Admin và Creator dùng cùng component -> người dùng thường không phân biệt được role/app.
2) Mật độ thông tin & hierarchy
   - Layout hiện có xu hướng console-like (sidebar dense, table/list), chưa tối ưu cho CRM nên cần card-focused, whitespace để UX sales/CS dễ đọc.
3) Theme & palette
   - Màu primary hiện là sắc xanh tím (#4f46e5). Nếu admin cũng dùng màu tương tự, cần đổi thành một hệ token riêng cho CRM.
4) Component reuse không phân tách
   - Các biến CSS toàn cục và class glass được dùng khắp nơi — cần tách token hoặc provider theme để nhanh chuyển đổi giữa Admin/CRM.

Quick wins (thực hiện ngay, low risk)
- Tạo theme token riêng cho CRM (prefix --crm-*) và override nhanh trong root khi vào route creator.
- Đổi logo/header nhỏ: sửa Sidebar brand thành "CreatorCRM" hoặc dùng logo khác khi role === 'creator'.
- Giảm hiệu ứng glass ở các khu vực chính (dashboard cards nên dùng solid surface hoặc nhẹ shadow) để tăng readability.
- Thay đổi các màu CTA chính (ví dụ primary -> warmer blue/teal) để khác admin.

Đề xuất style tokens (CRM) — tạm đề xuất để sử dụng tạo mockups PNG
- --crm-color-primary: #0ea5a4 (teal-500)
- --crm-color-primary-hover: #089e9c
- --crm-color-accent: #06b6d4
- --crm-neutral-100: #ffffff
- --crm-neutral-200: #f8fafc
- --crm-text: #0f172a
- --crm-danger: #ef4444
- Font: Outfit (hiện đang dùng) — giữ hoặc đổi thành Inter nếu muốn nhìn doanh nghiệp hơn.
- Border radius: 10px (cards), 8px (buttons)
- Spacing base: 8px

Danh sách component cần mockup (priority)
1. Header (desktop + mobile)
2. Sidebar (expanded & collapsed) với brand khác biệt cho CRM
3. Dashboard (KPIs, activity feed, quick actions)
4. Customers list + profile drawer/card
5. Deals / Pipeline (kanban view)
6. Activities / Tasks (timeline + quick add)
7. Reports (charts) — simple overview
8. Settings / Profile (user-facing, không lẫn với admin settings)

Deliverables cho bước tiếp theo (sẽ xuất PNG)
- 6–8 screens PNG hi-fidelity: Dashboard, Customers list, Customer profile, Pipeline, Activities, Reports, Settings.
- Bản ngắn style guide (colors, fonts, radii, spacing) trong file riêng.
- Component spec: Button, Card, Table row, Modal, Input, Tag/Badge.

Ước lượng thời gian
- Chuẩn bị mockups PNG (6–8 màn): 3–5 ngày
- Tài liệu handoff + component spec: 1–2 ngày

Next steps (mình sẽ làm tiếp)
1. Bắt đầu tạo mockups PNG cho các màn hình ưu tiên (Dashboard + Customers + Pipeline)
2. Gửi PNG đầu tiên để review (2–3 mockups đầu trong 24–48h)
3. Hoàn thiện toàn bộ mockups và style guide

Nếu bạn có logo/palette sẵn, gửi vào repo hoặc cung cấp ở đây — mình sẽ dùng để render mockups. Nếu không, sẽ dùng palette tạm thời ở trên.

---
Created by: CRM UI audit tool
Date: 2026-08-21
