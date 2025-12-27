#include <iostream>
#include <boost/asio.hpp>

using boost::asio::ip::tcp;

int main() {
    try {
        boost::asio::io_context io;

        tcp::acceptor acceptor(io, tcp::endpoint(tcp::v4(), 5555));
        std::cout << "Server listening on port 8080...\n";

        tcp::socket socket(io);
        acceptor.accept(socket);
        std::cout << "Client connected!\n";

        char buffer[4096];
        size_t length = socket.read_some(boost::asio::buffer(buffer));

        std::string message(buffer, length);
        std::cout << "Raw message received:\n" << message << "\n";

    } catch (std::exception& e) {
        std::cerr << "Error: " << e.what() << "\n";
    }
}
