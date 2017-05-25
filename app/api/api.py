from flask import Blueprint
from flask_restful import Api

blueprint = Blueprint('api', __name__, url_prefix="/api")
api = Api(blueprint)

from resources.find_doodle import FindDoodle

api.add_resource(FindDoodle, '/find_doodle/<name>')

api.init_app(blueprint)