from flask import Flask
import json 
from flask import jsonify, request,make_response
import pandas as pd
import geojson

geojson.geometry.DEFAULT_PRECISION = 15

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
   
    return jsonify("Hello World!")


@app.route('/api/allData', methods=['GET'])
def readData():
    with open("./data/Parking_Meters.geojson") as f:
        gj = geojson.load(f)
    features = gj['features']
    dic = {}
    for i in range(len(features)):
        dic[i] = features[i]
    return (dic)

def sortData():
    print