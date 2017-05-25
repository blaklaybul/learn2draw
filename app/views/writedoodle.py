from flask import Blueprint, render_template


writedoodle = Blueprint('writedoodle', __name__)


@writedoodle.route('/writedoodle')
def write_doodle():
    return render_template('writedoodle/index.html')