import os
import csv

# NOTE: CSV files only have fields `term`, `description` and `mood`

class CategoryParser:
    '''Creates Dictionaries for topic categorization'''

    def __init__(self):
        '''Initialization, loads all terms into memory'''

        # Emoji
        self.emojiCategories = \
                self.dumpCSVToDict(self.getCSVPath('emoji.csv'))
        # Immigration
        self.immigrationCategories = \
                self.dumpCSVToDict(self.getCSVPath('immigration.csv'))
        # Gun Control
        self.guncontrolCategories = \
                self.dumpCSVToDict(self.getCSVPath('gun_control.csv'))

        # Unemployment
        self.unemploymentCategories = \
                self.dumpCSVToDict(self.getCSVPath('unemployment.csv'))

        # Democratic
        self.democraticCategories = \
                self.dumpCSVToDict(self.getCSVPath('democratic.csv'))

        # Republican
        self.republicanCategories = \
                self.dumpCSVToDict(self.getCSVPath('republican.csv'))

    def getEmojiCategories(self):
        return self.emojiCategories

    def getImmigrationCategories(self):
        return self.immigrationCategories

    def getGunControlCategories(self):
        return self.guncontrolCategories

    def getUnemploymentCategories(self):
        return self.unemploymentCategories

    def getDemocraticCategories(self):
        return self.democraticCategories

    def getRepublicanCategories(self):
        return self.republicanCategories

    # Private Methods
    def dumpCSVToDict(self, path):
        '''Opens a csv file, and dumps contents to a Dict'''
        category_dict = {}

        f = open(path)
        reader = csv.DictReader(f)

        for line in reader:
            if line['term'] not in category_dict:

                # Check fields
                if 'description' not in line:
                    line['description'] = None
                if 'mood' not in line:
                    line['mood'] = None

                attrib_dict = {}
                attrib_dict['description'] = line['description']
                attrib_dict['mood'] = line['mood']

                category_dict[line['term']] = attrib_dict

        f.close()

        return category_dict

    def getCSVPath(self, file_name):
        '''Gets absolute file path of CSV file'''
        return os.path.join(os.path.dirname(__file__),'data',file_name)
