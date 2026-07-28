# Hướng Dẫn Triển Khai Với Docker (Docker Deployment)

Docker là phương án dễ nhất và an toàn nhất để triển khai (deploy) toàn bộ hệ sinh thái E-commerce Platform lên máy chủ (VPS).

## Yêu Cầu Cấu Hình Máy Chủ (VPS)
- **Hệ điều hành:** Ubuntu 22.04 LTS hoặc tương đương.
- **RAM:** Tối thiểu 4GB (Khuyến nghị 8GB để chạy mượt 5 containers).
- **Phần mềm:** Đã cài đặt sẵn `Docker` và `Docker Compose`.

## Cấu Trúc File `docker-compose.yml`

Hệ thống được gói gọn vào 5 services (Containers) chính hoạt động liên kết với nhau qua mạng ảo `crm_network`:
1. `db`: Chạy **PostgreSQL 15** để lưu dữ liệu chính. (Cổng 5432)
2. `redis`: Chạy **Redis 7** để làm Message Queue (BullMQ) cho hệ thống gửi Email. (Cổng 6379)
3. `backend`: Chạy **Node.js Express**. (Cổng 5000)
4. `frontend`: Chạy **CRM System** (Quản trị Admin). (Cổng 3001)
5. `digital-store`: Chạy **Digital Store Next.js** (Cửa hàng khách hàng). (Cổng 3002)

*(Lưu ý: `blog-cms` đang chạy ở cổng 3003 nếu được kích hoạt).*

## Các Bước Triển Khai (Deploy)

### Bước 1: Clone Source Code
```bash
git clone https://github.com/dangtienvn/e-cormmerce-platform.git
cd e-cormmerce-platform
```

### Bước 2: Cấu hình biến môi trường
Docker Compose của dự án đọc trực tiếp các biến cấu hình từ bên trong file `docker-compose.yml`. Mở file này ra và điền các mã Key bí mật vào block `environment` của service `backend` (Tham khảo tài liệu [environment.md](./environment.md)).

### Bước 3: Khởi chạy hệ thống
Chạy lệnh sau tại thư mục gốc chứa file compose:
```bash
docker-compose up -d --build
```
> Giải thích: Cờ `-d` (Detached) giúp docker chạy ngầm ở nền. Cờ `--build` bắt docker tải và đóng gói lại code mới nhất.

### Bước 4: Kiểm tra trạng thái
```bash
docker-compose ps
```
Nếu thấy tất cả các container đều ở trạng thái `Up`, xin chúc mừng, dự án của bạn đã hoạt động! Bạn có thể truy cập `http://IP_VPS:3002` để xem trang cửa hàng.

---

## Một số lệnh vận hành hữu ích (Operations)

**1. Xem Log lỗi (VD: xem log của Backend để biết tại sao Mail gửi thất bại)**
```bash
docker-compose logs -f backend
```

**2. Tắt hoàn toàn hệ thống**
```bash
docker-compose down
```

**3. Khởi tạo dữ liệu mẫu (Seeding) sau khi build Database lần đầu**
Do ứng dụng Backend chạy trong container, để seed dữ liệu, bạn cần chạy script bên trong container `backend`:
```bash
# Vào bên trong bash của container backend
docker-compose exec backend /bin/sh

# Chạy lệnh tạo dữ liệu demo
npm run seed:demo
```
Sau đó thoát ra bằng lệnh `exit`. Dữ liệu Database được cấu hình lưu trong Volume `db_data`, và hàng đợi lưu trong `redis_data`. Khởi động lại Docker không làm mất dữ liệu của bạn!
