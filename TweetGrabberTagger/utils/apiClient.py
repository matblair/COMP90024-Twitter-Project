import requests, json
github_url = "https://api.github.com/user/repos"

class APIClient:
    '''API Client'''

    def __init__(self, ip, port):
        self.ip = str(ip)
        self.port = str(port)
        self.url = "http://" + self.ip + ":" + self.port

    def postApiTweetsSubmit(self, data):
        '''POST /api/tweets/submit'''
        new_url = self.url + "/api/tweets/submit"
        #print(new_url)

        data_obj = { "tweets": data }
        send_data = data_obj
        
        headers = {'Content-Type': 'application/json'}
        #print(json.dumps(send_data))

        r = requests.post(new_url, data=json.dumps(send_data), headers=headers)
        return r

if __name__ == "__main__":
    ac = ApiClient('144.6.227.66', 4500)
    r = ac.postApiTweetsSubmit([])
    print(r)
