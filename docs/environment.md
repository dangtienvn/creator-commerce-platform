# Cấu Hình Biến Môi Trường (Environment Variables)

Hệ thống yêu cầu các cấu hình biến môi trường khác nhau giữa Frontend và Backend. Để dự án chạy ổn định, đặc biệt là khi Deploy lên Production (VPS/Render/Vercel...), bạn cần đảm bảo cấu hình đầy đủ các tham số dưới đây.

## Backend Core (`apps/backend-core/.env`)

| Biến | Vai Trò | Ví Dụ / Ghi Chú |
| :--- | :--- | :--- |
| **Cơ Bản** | | |
| `PORT` | Cổng chạy server Backend | `5000` |
| `DATABASE_URL` | Chuỗi kết nối đến PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Chìa khóa mã hoá Token bảo mật | Một chuỗi string bất kỳ (Ví dụ: `sieu_bao_mat_123`) |
| **Message Queue** | | |
| `REDIS_URL` | Kết nối Redis để chạy BullMQ (Background Job) | `redis://127.0.0.1:6379` |
| **Email (Nodemailer)** | | |
| `SMTP_HOST` | Host máy chủ gửi email (VD: Gmail) | `smtp.gmail.com` |
| `SMTP_PORT` | Cổng SMTP | `465` (Bảo mật SSL) hoặc `587` |
| `SMTP_USER` | Email dùng để làm tài khoản gửi | `admin@gmail.com` |
| `SMTP_PASS` | Mật khẩu ứng dụng (App Password) | `abcd efgh ijkl mnop` |
| **Cloudinary (Lưu Ảnh)** | | |
| `CLOUDINARY_CLOUD_NAME` | Tên Cloud của Cloudinary | Lấy từ Dashboard Cloudinary |
| `CLOUDINARY_API_KEY` | API Key | Lấy từ Dashboard Cloudinary |
| `CLOUDINARY_API_SECRET`| API Secret | Lấy từ Dashboard Cloudinary |
| **AWS S3 (Lưu Ebook/Video)** | | |
| `AWS_REGION` | Vùng dữ liệu của Bucket | `ap-southeast-1` (Singapore) |
| `AWS_ACCESS_KEY_ID` | Key truy cập AWS IAM | Cấp quyền Write/Read cho S3 |
| `AWS_SECRET_ACCESS_KEY`| Mật khẩu truy cập IAM | |
| `AWS_S3_BUCKET_NAME` | Tên của Bucket S3 | Ví dụ: `my-ecommerce-digital-bucket` |
| **Cổng Thanh Toán** | | |
| `STRIPE_SECRET_KEY` | Khóa bí mật từ Stripe | Bắt đầu bằng `sk_test_...` hoặc `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET`| Mã xác thực chữ ký Webhook | Bắt đầu bằng `whsec_...` |
| `VNP_TMN_CODE` | Mã Terminal Website VNPay | Cấp bởi VNPay Sandbox/Live |
| `VNP_HASH_SECRET` | Khóa bảo mật Hash của VNPay | Chuỗi 32 hoặc 64 ký tự |
| `VNP_URL` | Đường dẫn gọi thanh toán VNPay | (Sandbox hoặc Real) |
| `VNP_RETURN_URL` | Link Backend nhận Callback IPN | VD: `https://my-api.com/api/payment/vnpay-return` |

---

## Các Module Frontend (React/Next.js)

### CRM System (`apps/crm-system/.env`)
Giao diện quản trị Admin/Staff.
- `VITE_API_URL`: Trỏ về đường dẫn Backend. Ví dụ: `http://localhost:5000/api` hoặc `https://api.my-domain.com/api`.

### Storefront (`apps/storefront/.env`)
Giao diện khách hàng và Blog SEO.
- `NEXT_PUBLIC_API_URL`: Trỏ về Backend. Ví dụ: `http://localhost:5000/api`.

> **Lưu Ý Quan Trọng khi Deploy Frontend (Vercel/Netlify):**
> Bạn phải khai báo các biến môi trường này trực tiếp trên giao diện Dashboard của Vercel (Tab Settings > Environment Variables). Nếu không khai báo, Frontend trên mạng sẽ báo lỗi `Network Error` do không biết phải gọi API về đâu.
