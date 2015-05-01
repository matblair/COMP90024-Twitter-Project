import socket, pickle, threading

class MockReceivingWorker(threading.Thread):
    def __init__(self, ip, port, sock):
        threading.Thread.__init__(self)
        self.ip = ip
        self.port = port
        self.csocket = sock
   
    def run(self):
        data = b''
        while True:
            recv_data = self.csocket.recv(4096)
            if len(recv_data) == 0:
                break
            data += recv_data
        tweets = pickle.loads(data)
        
        return data

if __name__ == "__main__":
    host = "localhost"
    port = 8001

    listener = socket.socket()
    listener.bind((host,port))
    
    while True:
        listener.listen(1000)
        print("listening for incoming connections...")
        (clientsock, (ip, port)) = listener.accept()

        newthread = MockReceivingWorker(ip, port, clientsock)
        newthread.start()
