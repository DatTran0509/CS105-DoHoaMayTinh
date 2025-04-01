# Chọn image cơ sở (ở đây là nginx để phục vụ tệp tĩnh)
FROM nginx:alpine

# Copy các file HTML và CSS của bạn vào thư mục nginx
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./style /usr/share/nginx/html/style
COPY ./src /usr/share/nginx/html/src

# Đảm bảo Nginx sẽ chạy trên cổng 80
EXPOSE 80

# Lệnh để khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
