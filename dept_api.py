import open
import json
from flask import Flask

app = Flask(__name__)

dept_list=open.dept_list
dept_def_return=open.dept_def_ret


@app.route('/departments')
def departments():
    return json.dumps({
        'departments':dept_list,
        'definitions':dept_def_return
        }
)

