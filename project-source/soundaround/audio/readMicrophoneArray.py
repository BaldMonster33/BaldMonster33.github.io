import socket

def create_socket():
    """
    Creates a TCP/IP socket.
    """
    return socket.socket(socket.AF_INET, socket.SOCK_STREAM)

def bind_socket(server_socket, address, port):
    """
    Binds the socket to a specific address and port.
    """
    server_address = (address, port)
    server_socket.bind(server_address)

def listen_for_connections(server_socket):
    """
    Listens for incoming connections.
    """
    server_socket.listen(1)

def accept_connection(server_socket):
    """
    Accepts incoming connections.
    """
    return server_socket.accept()

def send_data(connection, data):
    """
    Sends data to the client.
    """
    connection.sendall(data.encode())

def close_connection(connection, server_socket):
    """
    Closes the connection and the server socket.
    """
    connection.close()
    server_socket.close()

def main():
    # create a TCP/IP socket
    server_socket = create_socket()

    # bind the socket to a specific address and port
    address = 'localhost'
    port = 10000
    bind_socket(server_socket, address, port)

    # listen for incoming connections
    listen_for_connections(server_socket)

    # accept incoming connections
    connection, client_address = accept_connection(server_socket)

    # send data to the client
    data = 'Hello, client!'
    send_data(connection, data)

    # close the connection
    close_connection(connection, server_socket)

if __name__ == '__main__':
    main()
