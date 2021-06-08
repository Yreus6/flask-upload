from flask import Flask, render_template, request, send_from_directory
from werkzeug.utils import secure_filename
from flask_restful import Api, Resource
import os

from process import process

app = Flask(__name__)
api = Api(app)


@app.route('/')
def home():
    return render_template('upload.html')


@app.route('/upload', methods=['POST'])
def upload():
    f = request.files['file']
    s_file = secure_filename(f.filename)
    f.save('storage/upload/' + s_file)

    return s_file


@app.route('/storage/<path:path>')
def storage(path):
    return send_from_directory('storage', path)


class Process(Resource):
    def post(self, file_name):
        output_url = process('storage/upload/' + file_name)
        os.unlink('storage/upload/' + file_name)

        return {'result': output_url}


api.add_resource(Process, '/process/<file_name>')


if __name__ == '__main__':
    app.run()
