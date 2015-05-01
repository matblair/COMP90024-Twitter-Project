# grabTweeter.py
# 
# Grabs Tweets from Twitter then forwards them to Graph System.
################################################################################

import tweepy
import math, time, json, os, socket, pickle, sys
import multiprocessing

DEBUG = False

# API Keys
api_key = ("d5G06lkn62j2ZbYFRKZRTHjdJ", 
    "gsNN8JRcM9t9fCAuJvHBcqMTetBN0elLF5dcEfIihRjExz9zYR")

nTweets = 0

def tweet2Dict(t):
    csv_tweet = {}

    csv_tweet["id"] = t.id
    csv_tweet["id_str"] = t.id_str
    csv_tweet["metadata"] = t.metadata
    csv_tweet["entities"] = t.entities
    csv_tweet["text"] = t.text
    csv_tweet["lang"] = t.lang
    csv_tweet["geo"] = t.geo

    return csv_tweet

def log_tweets(ts):
    for t in ts:
        nTweets += 1

def log_error(err):
    print(err)

def send_job(res):

    tweets = res[2]

    send_sock = socket.create_connection((res[0], res[1]))
    formated_ts = []
    for tweet in tweets:  
        formated_ts.append(tweet2Dict(tweet))

    data = pickle.dumps(formated_ts, protocol=pickle.HIGHEST_PROTOCOL)
    totalsent = 0
    while(totalsent < len(data)):
        sent = send_sock.send(data[totalsent:])
        totalsent += sent
    send_sock.close()
    return 

def worker_job(addr, port):
    api_key = ("d5G06lkn62j2ZbYFRKZRTHjdJ", 
        "gsNN8JRcM9t9fCAuJvHBcqMTetBN0elLF5dcEfIihRjExz9zYR")
    auth = tweepy.auth.AppAuthHandler(api_key[0], api_key[1]) 
    api = tweepy.API(auth)

    lat = "29.424122"
    lng = "-98.493629"
    radius = "100km"
    geocode_str = lat + "," + lng + "," + radius
    tweets = api.search("", geocode=geocode_str, count=100) 

    return (addr, port, tweets)

def head_job(dest):
    auth = tweepy.auth.AppAuthHandler(api_key[0], api_key[1]) 
    api = tweepy.API(auth)

    rate_limit = api.rate_limit_status()['resources']['search']\
                    ['/search/tweets']["remaining"]
    if DEBUG:
        print(rate_limit)
    pool = multiprocessing.Pool() 
    for i in range(0, int(rate_limit)):
        pool.apply_async(worker_job, args=(dest[0], dest[1]), 
            callback=send_job, error_callback=log_error)
    pool.close()
    pool.join()

if __name__ == "__main__":
    addr = sys.argv[1]
    port = sys.argv[2]
    dest = (addr, port)
    head_job(dest) 
