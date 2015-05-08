# geoTool.py
# ~Jun Min (542339)

import math

def BoundingBox(core_lon, core_lat, radius):
    '''Calculates bounding box from lon, lat, and radius'''

    lon = core_lon
    lat = core_lat

    R = 6371 # Radius of Earth (KM)

    lon1 = lon - math.degrees(radius/R/math.cos(math.radians(lat)));
    lat1 = lat - math.degrees(radius/R);
    lon2 = lon + math.degrees(radius/R/math.cos(math.radians(lat)));
    lat2 = lat + math.degrees(radius/R);

    return [lon1, lat1, lon2, lat2]
