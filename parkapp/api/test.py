from flask import Flask
import json 
import requests
from flask import jsonify, request,make_response
import pandas as pd
import geojson
import decimal



geojson.geometry.DEFAULT_PRECISION = 17






res = requests.get("https://spatialsolutions.hamilton.ca/webgis/rest/services/OpenData/Spatial_Collection_5/MapServer/8/query?outFields=*&where=1%3D1&f=geojson").text
# gj = geojson.loads(res)
# print(res)
# with open("./data/Parking_Meters.geojson") as f:
gj = geojson.loads(res)
features = gj['features']
dic = {}
for i in range(len(features)):
    dic[i] = features[i]
print(dic[0])

# print("{:.15f}".format((dic[0]["geometry"]["coordinates"][0])))
# print("{:.15f}".format((dic[0]["geometry"]["coordinates"][0])))