from flask import Flask
import requests
from flask import jsonify
import geojson

geojson.geometry.DEFAULT_PRECISION = 15

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
   
    return jsonify("Hello World!")


@app.route('/api/googelmapApi', methods=['GET'])
def google_map_api():
   
    return ""

def readData(url):
    dic = {}
    try:
        res = requests.get(url, verify=False, timeout=5).text
        gj = geojson.loads(res)
        features = gj['features']
        for i in range(len(features)):
            dic[i] = features[i]
    except requests.exceptions.ConnectionError:
            print("Site not rechable", url)
    
    return dic



@app.route('/api/bike_path', methods=['GET'])  
def bike_path():
    with open("./data/Bikeways.geojson") as f:
         gj = geojson.load(f)
    features = gj['features']
    dic = {}
    for i in range(len(features)):
        dic[i] = features[i]
    return dic
    
@app.route('/api/bike_rack', methods=['GET'])           
def bike_rack():
    url = "https://spatialsolutions.hamilton.ca/webgis/rest/services/OpenData/Spatial_Collection_5/MapServer/8/query?outFields=*&where=1%3D1&f=geojson"
    res  = readData(url)
    return res

@app.route('/api/parking_meter', methods=['GET'])           
def parking_meter():
    url = "https://spatialsolutions.hamilton.ca/webgis/rest/services/OpenData/Spatial_Collection_6/MapServer/4/query?outFields=*&where=1%3D1&f=geojson"
    res  = readData(url)
    return res

