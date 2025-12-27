cmake_minimum_required(VERSION 3.10)
project(auth_tcp_server)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(server src/server.cpp)

target_include_directories(server PRIVATE C:/boost)

# 🔑 REQUIRED on Windows for Boost.Asio
target_link_libraries(server PRIVATE ws2_32)