# configParser.py
# Jun Min (542339)

import json

class ConfigParser:

    def __init__(self, config_path):

        # Open JSON file
        with open(config_path) as data_file:    
            data = json.load(data_file)

        self.config_dict = data
    
    def getConfig(self):
        return self.config_dict

if __name__ == "__main__":
    cp = ConfigParser('../config.json')
    config = cp.getConfig()
    print(config)
