# Ý Chính Web DauGia

* Mã nguồn Web không sử dụng template engine . mà tự replace nội dung khi xữ lý hoàn tất.
* Với hệ cấu trúc tự hoàn thiện, có thể thay đổi tiêu đề, nội dung, sau khi đã load ví dụ bạn có thể thay đổi tiêu đề web, nội dung header, ở phần code trang chi tiết ở content. hay bạn có thể thay đổi nội dung content khi đang code ở footer.
* Cấu trúc đơn giản ví dụ bạn muốn thay đổi giao diện trong product (chi tiết sản phẩm) thì có thể vào module/product/view/product.html, muốn thay đổi nội dung dữ liệu, xữ lý dữ liệu thì thay đổi trong module/product/product.js
* Phiên được tạo và kiểm tra theo setTimeout nhằm giới hạn số lần kiểm tra dữ liệu (thông thường mổi giây kiểm tra 1 lần cho tất cả thì khối lượng công việc server khá nhiều nên mình đặt là đến đúng giờ mới kiểm tra)
* Đăng nhập, đăng ký sử dụng api thông qua ajax nhằm đơn giản và đăng nhập tại trang đấu giá để tiện quan sát tiến độ đấu giá.
* Responsive

* ==========================Hướng dẩn=================================
* Đăng nhập (user : admin / pass : admin) sau khi đăng nhập ở trang chủ mới có thể quản lý ở admin
* Admin quản lý thêm sản phẩm và nhóm sản phẩm http://localhost:3000/admin
* ==========================Lưu ý=================================
* .................
* ==========================DEMO URL=================================
* https://daugia-vikclass.herokuapp.com/