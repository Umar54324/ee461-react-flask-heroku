import os
from flask import Flask, send_from_directory, jsonify

app = Flask(__name__, static_url_path='', static_folder='ui/build/')

@app.route('/')
def index():
    return send_from_directory('ui/build/', 'index.html')



@app.route('/checkIn/<projectId>/<qty>')
def checkIn_hardware(projectId, qty):
    data = {
        "Projectid": projectId,
        "Qty": qty
    }
    return jsonify(data)


@app.route('/checkOut/<projectid>/<qty>')
def checkOut_hardware(projectid, qty):
    data = {
        "Projectid": projectid,
        "Qty": qty
    }
    return jsonify(data)


@app.route('/joinProject/<projectid>')
def joinProject(projectid):
    return projectid


@app.route('/leaveProject/<projectid>')
def leaveProject(projectid):
    return projectid


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))