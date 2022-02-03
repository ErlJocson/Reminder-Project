from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__, static_folder='my-app/build')
CORS(app)
app.config["SECRET_KEY"] = "qveut9394891vue"
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///temp/users.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["JWT_SECRET_KEY"] = "super-secret" 
jwt = JWTManager(app)
db = SQLAlchemy(app)

from . import routes