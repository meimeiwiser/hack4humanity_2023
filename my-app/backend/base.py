from flask import Flask, request
import requests

app = Flask(__name__)
YELP_TOKEN = "7-ZL3Ahz1NT54QYBs-ttyU8vw3zJ83k8JeNxQDI_2xNG1D3CoczNnlIAeRUoKdJ_bPi55Awa_F-LkQs5xoSLQuSIn-hhmPB6_ryqgPLHGdM4V0kzwv-ny0FJLzDxY3Yx"


@app.route('/yelp-doctors')
def test():
    searchTerm = "sutter health radiologist"
    location = "santa clara"
    url = "https://api.yelp.com/v3/businesses/search?term={}&location={}".format(searchTerm, location)
    params = {}
    headers = {
        'Authorization': 'Bearer {}'.format(YELP_TOKEN)
    }
    response = requests.get(url, headers=headers, params=params)
    print(response.text)
    return response.json()