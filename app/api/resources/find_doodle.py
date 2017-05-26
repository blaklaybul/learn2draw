from flask_restful import abort, Resource, reqparse
from app.utils.load_data import load_doodles
import glob
import os


data_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
files = glob.glob(data_dir+"/data/binary/*")
words = [file.split("/")[-1].replace(".bin", "") for file in files]

print words


class FindDoodle(Resource):

    def get(self, name):
        if name in words:
            doodles=load_doodles(name, data_dir+"/data/binary/")
            return doodles[-1]
        else:
            return 'not in db'
