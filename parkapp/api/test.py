from flask import Flask
import json 
from flask import jsonify, request,make_response
import pandas as pd
import geojson
import decimal



geojson.geometry.DEFAULT_PRECISION = 17







with open("./data/Parking_Meters.geojson") as f:
    gj = geojson.load(f)
features = gj['features']
dic = {}
for i in range(len(features)):
    dic[i] = features[0]
print(dic[0])

# print("{:.15f}".format((dic[0]["geometry"]["coordinates"][0])))
# print("{:.15f}".format((dic[0]["geometry"]["coordinates"][0])))