import socket, pickle

recv_sock = socket.socket()
addr = ("localhost", 8001)
recv_sock.bind(addr)
recv_sock.listen(8001)

conn, addr = recv_sock.accept()
stream = b''
while True:
    data = conn.recv(4096)
    if len(data) == 0:
        break
    stream += data
tweets = pickle.loads(stream)
print(tweets)
