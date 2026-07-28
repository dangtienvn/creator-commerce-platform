# Changelog

Tài liệu này ghi chú lại những thay đổi lớn (Major Updates) và các lần refactor hệ thống của dự án E-commerce Platform.

## [1.1.0] - Giai đoạn Nâng Cấp Hệ Thống (Production Readiness)

### Ngày 26/07/2026
- **Fix (Payment):** Khắc phục lỗi bảo mật khi nhận Webhook từ cổng thanh toán Stripe. Lỗi xảy ra do middleware `express.json()` parse dữ liệu trước khi Webhook đọc Raw Buffer. Giải pháp: Đưa route `/api/payment` lên trước `express.json()`.
- **Fix (VNPay IPN):** Thêm cơ chế Row-level Lock (khoá dòng dữ liệu bằng cách check trạng thái `paid` trước khi cập nhật) nhằm ngăn chặn hiện tượng Race-condition khi VNPay gọi IPN (Webhook) 2 lần cùng một thời điểm, tránh việc cập nhật log trùng lặp và gây nhiễu cho luồng gửi email.

### Ngày 25/07/2026
- **Feat (Message Queue):** Chuyển đổi toàn bộ cơ chế gửi Email (Hóa đơn, Quên mật khẩu, Xác thực) từ Đồng bộ (Synchronous) sang Bất đồng bộ (Asynchronous Background Jobs).
- **Cấu trúc:** Áp dụng thư viện `BullMQ` kết hợp với `Redis`. Thêm mới thư mục `queues/` chứa `mail.queue.js` và `mail.worker.js`.
- **Hạ tầng:** Cập nhật file `docker-compose.yml` để bổ sung container `redis:7-alpine`. Cơ chế này giúp API phản hồi tức thì cho người dùng, tránh bị timeout khi SMTP Server nghẽn.

### Ngày 24/07/2026
- **Feat (Media Storage):** Tích hợp Cloud Storage thay cho việc lưu file tĩnh (`uploads/`) trên Local Server, giúp bảo vệ dữ liệu khi deploy bằng Docker/VPS.
- **Image Upload:** Tích hợp `Cloudinary` SDK. Hệ thống tự động đẩy file định dạng ảnh (jpg, png, webp) lên Cloudinary và trả về CDN Link tĩnh, giúp tối ưu tốc độ load ảnh.
- **Secure File Download (Ebook/Video):** Tích hợp AWS S3 (`@aws-sdk/client-s3`). Các file tải xuống bảo mật được ném lên bucket S3 Private. API `/api/files/download` được viết lại để sinh ra một Signed URL (Link tải có hiệu lực 15 phút) nhằm tránh tình trạng link tải bị chia sẻ tràn lan trên mạng.
