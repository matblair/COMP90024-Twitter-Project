# config.py
class Config:
    '''Config Class, holds configs'''
    
    # Consumer Key/Secret (Needed for Streamer)
    consumer_key="cskey1"
    consumer_secret="cssecret1"

    # Access Token/Secret (Needed for Streamer)
    access_token="ackey"
    access_token_secret="acsecret"

    # List of API Tokens (Needed for userTimelineScraper)
    api_tokens=[
            { "key": "",\
            "secret": "" },\
            { "key": "",\
            "secret": "" }] 

    # Latitude / Longitude
    longitude = -98.493629
    latitude = 29.424122

    # Location (String)
    location = "San Antonio"
    
    # Search Radius (KM)
    search_radius = 100
