# userGrabber.py
# Mat
import tweepy
import time
import json
from config import Config
from utils.argParser import ArgParser
from tagger.tweetTagger import tweetTagger
from data.categoryParser import CategoryParser

def user_followers(auth, f, user_id):
    if f:
        f.write(str(user_id) + ',')

    api = tweepy.API(auth)
    for follower in tweepy.Cursor(api.followers_ids, user_id).items():
        if f:
            f.write(str(follower) + ' ') # Added space separator.
    if f:
        # Add new line
        f.write('\n')

if __name__ == '__main__':

    # Arg Parsing
    ap = ArgParser()
    args = ap.getArgs()

    # Find file to dump to
    if (args.dump):
        f = open(args.dump, 'w')
        f.write('user_id, followers\n')
    else:
        f = None

    # Find the user file
    if (args.input):
        i = open(args.input, 'r')
    else:
        print("No input file given")
        exit()

    auth = tweepy.auth.AppAuthHandler(Config.consumer_key,
            Config.consumer_secret)

    # Count of users found
    count = 0

    # Just infinite loop
    for line in i:
        try:
            print("Finding friends for " + line)
            user_followers(auth, f, line)
        except tweepy.TweepError:
            print("error")
            time.sleep(60 * 15)
        except e:
            print (e)
            break
        count += 1


#passenger_ruby /home/deploy/.rvm/wrappers/ruby-2.1.5/ruby
