from flask import Flask, render_template
import views.writedoodle
import api.api


def create_app(config=None):

    app = Flask(__name__)
    app.register_blueprint(api.api.blueprint)
    app.register_blueprint(views.writedoodle.writedoodle)

    if config is not None:
        app.config.from_object(config)

    @app.route('/')
    def index():
        return render_template('index.html')

    return app
