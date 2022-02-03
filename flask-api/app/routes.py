from os import getcwd
from . import app, db
from .models import User, Reminder
from .serializer import serialize
from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from flask.helpers import send_from_directory
from flask_cors import cross_origin

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/sendReminders', methods=["GET"])
@jwt_required()
@cross_origin()
def handleReminder():
    user = User.query.filter_by(email=get_jwt_identity()).first()
    reminder = Reminder.query.filter_by(user_id = user.id).all()
    if reminder:
        return jsonify({"user":serialize(reminder)})
    else:
        return jsonify({"user":False})

@app.route("/sendImportantReminders", methods=["GET"])
@jwt_required()
@cross_origin()
def handleImportantReminder():
    user = User.query.filter_by(email=get_jwt_identity()).first()
    reminder = Reminder.query.filter_by(user_id = user.id, urgent="Yes").all()
    if reminder:
        return jsonify({"user":serialize(reminder)})
    else:
        return jsonify({"user":False})

@app.route('/deleteReminder', methods=["POST"])
@jwt_required()
@cross_origin()
def deleteReminder():
    data = request.json
    user_id = data['userId']
    reminder_id = data['reminderId']
    reminder = Reminder.query.filter_by(user_id = user_id, id=reminder_id).all()
    try:
        db.session.delete(reminder[0])
        db.session.commit()
    except:
        return jsonify({"msg":False})
    return jsonify({'msg':True})

@app.route('/removeAccount', methods=["POST"])
@jwt_required()
@cross_origin()
def removeAccount():
    requestContent = request.json
    email = get_jwt_identity()
    if requestContent["data"]:
        userToDelete = User.query.filter_by(email = email).all()
        db.session.delete(userToDelete[0])
        db.session.commit()
        return jsonify({"msg":True})
    return jsonify({"msg":False})

@app.route("/postNewReminders", methods=["POST"])
@jwt_required()
@cross_origin()
def newReminders():
    requestContent = request.json
    title = requestContent["title"]
    date = requestContent["date"]
    content = requestContent["content"]
    important = requestContent["important"]
    date = date.split('-')
    date = datetime(year = int(date[0]), month = int(date[1]), day = int(date[2]))
    user = User.query.filter_by(email=get_jwt_identity()).first()
    try:
        newReminder = Reminder(
                        title=title, 
                        content=content,
                        urgent=important,
                        date_posted=date, 
                        user_id=user.id
                        )
        db.session.add(newReminder)
        db.session.commit()
    except:
        return jsonify({"msg":"Can't add reminder"})
    return jsonify({"msg":"Reminder added"})

@app.route('/token', methods=["POST"])
@cross_origin()
def login():
    requestContent = request.json
    email = requestContent["email"]
    password = requestContent["password"]
    user = User.query.filter_by(email=email).all()
    if user:
        if not (password == user[0].password):
            return jsonify({"msg":False})
        access_token = create_access_token(identity=email)
        return jsonify({"msg":access_token})
    else:
        return jsonify({"msg":False})

@app.route('/register', methods=["POST"])
@cross_origin()
def register():
    requestContent = request.json
    email = requestContent["email"]
    username = requestContent["username"]
    password = requestContent["password"]
    user = User(email=email, username=username, password=password)
    try:
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=email)
    except:
        return jsonify({"msg":"Email is already used or something went wrong with the server"})
    return jsonify({"msg":access_token})
