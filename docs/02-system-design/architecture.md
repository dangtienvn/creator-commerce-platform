# Kiến Trúc Hệ Thống (System Architecture)

Dự án E-commerce Platform được xây dựng theo mô hình Monorepo (đa ứng dụng chung một kho chứa mã nguồn). Kiến trúc được thiết kế nhằm tách biệt các Front-end (Client-facing) với Backend (API & Logic), đồng thời sử dụng các dịch vụ bên thứ ba (Third-party Services) để đảm nhiệm các tác vụ chuyên biệt nhằm tối ưu hóa hiệu suất và bảo mật.

## Tổng Quan Mô Hình

Hệ thống bao gồm **3 ứng dụng Frontend** và **1 ứng dụng Backend**, cùng giao tiếp qua giao thức RESTful API.

```mermaid
flowchart TD
    subgraph Frontend Applications
        DS[Digital Store - Next.js\nCửa hàng cho khách]
        CMS[Blog CMS - Next.js\nQuản lý bài viết/SEO]
        CRM[CRM System - React/Vite\nHệ thống quản trị nội bộ]
    end

    subgraph Backend Core
        API[Node.js + Express API\nHandles Business Logic]
        Queue[BullMQ Worker\nBackground Jobs]
    end

    subgraph Databases
        PG[(PostgreSQL\nPrimary Database)]
        REDIS[(Redis\nMessage Queue & Cache)]
    end

    subgraph External Services
        S3[AWS S3\nSecure Ebooks/Video]
        CLD[Cloudinary\nPublic Images CDN]
        SMTP[Nodemailer/SMTP\nEmail Service]
        PAY[Stripe / VNPay\nPayment Gateways]
    end

    %% Tương tác
    DS <-->|REST API| API
    CMS <-->|REST API| API
    CRM <-->|REST API| API

    API <-->|Prisma ORM| PG
    API <-->|Push Jobs| REDIS
    Queue <-->|Pull Jobs| REDIS

    Queue -.->|Send Email| SMTP
    API -.->|Upload Images| CLD
    API -.->|Upload/Sign URLs| S3
    API -.->|Webhook/Verify| PAY
```

## Các Thành Phần Chính

### 1. Frontend Layer
Được chia thành 3 dự án độc lập:
- **Digital Store (Next.js):** Nơi khách hàng truy cập, tìm kiếm sản phẩm, thanh toán giỏ hàng. Ứng dụng Next.js App Router được tận dụng tối đa để SEO.
- **Blog CMS (Next.js):** Kênh Inbound Marketing tập trung hiển thị bài viết, tin tức cho người dùng.
- **CRM System (React + Vite):** Trang quản trị SPA dành cho Admin và Manager. Sử dụng `React Query` để gọi API và cache dữ liệu phía client siêu mượt.

### 2. Backend API Layer (Node.js + Express)
Đây là trung tâm xử lý logic toàn bộ hệ thống.
- **Kiến trúc Module:** Được chia thành 21 module nhỏ (`user`, `auth`, `payment`, `order`,...) theo nguyên tắc Single Responsibility.
- **ORM:** Dùng `Prisma` thao tác với PostgreSQL. Lược đồ schema thiết lập chặt chẽ bằng Prisma schema.
- **Xác thực:** Dùng JWT Token kết hợp Access Token (ngắn hạn) và Refresh Token (dài hạn lưu trong HTTP-Only Cookie).

### 3. Background Jobs Layer (BullMQ + Redis)
- Nhằm tránh tình trạng API bị nghẽn (Blocking) do phải chờ đợi gửi Email mất quá nhiều thời gian, hệ thống tách tiến trình gửi Email ra riêng.
- Khi có sự kiện (VD: Người dùng quên mật khẩu), Backend API chỉ ghi 1 Job vào `Redis` rồi trả về Success ngay lập tức.
- File `mail.worker.js` sẽ chạy ngầm, liên tục lắng nghe `Redis` và thực hiện gửi Email (SMTP). Có cơ chế tự động thử lại (Retry) nếu gửi lỗi.

### 4. Storage & Media
- **Cloudinary:** Toàn bộ ảnh (Thumbnail sản phẩm, Avatar) được upload thẳng lên Cloudinary thông qua SDK và lưu link trên Database. Nhờ vậy, ảnh luôn được tối ưu (Webp/CDN).
- **AWS S3:** Đặc thù bán sản phẩm số (Digital Products), các file như Ebook PDF hoặc Video khóa học được đẩy vào một Private Bucket trên AWS S3. Khi khách hàng bấm tải xuống, Backend sẽ liên kết với AWS và cấp 1 đường link Signed URL có tuổi thọ 15 phút, ngăn chặn tuyệt đối tình trạng chia sẻ link lậu.

### 5. Cổng Thanh Toán (Payment Gateways)
- Hỗ trợ **VNPay** (Thanh toán ATM nội địa / Mã QR).
- Hỗ trợ **Stripe** (Thanh toán thẻ tín dụng quốc tế Visa/Mastercard).
- Cơ chế Webhook: Cổng thanh toán sẽ "bắn" thông báo (IPN) ngược về Backend của chúng ta. API được thiết kế kèm theo cơ chế "Row Lock" (Kiểm tra và khóa dòng dữ liệu) để tránh trùng lặp thanh toán.
