# geoTool.py
# ~Jun Min (542339)

import math

def boundingBox(core_lon, core_lat, radius):
    '''Calculates bounding box from lon, lat, and radius'''

    lon = core_lon
    lat = core_lat

    R = 6371

    lon1 = lon - math.degrees(radius/R/math.cos(math.radians(lat)));
    lon2 = lon + math.degrees(radius/R/math.cos(math.radians(lat)));
    lat1 = lat + math.degrees(radius/R);
    lat2 = lat - math.degrees(radius/R);

    return [lon1, lat1, lon2, lat2]

# DEBUG
print(boundingBox(-98.493629, 29.424122, 100))
