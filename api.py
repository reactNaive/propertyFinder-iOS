from flask import Flask, jsonify, request, make_response,redirect,url_for
from flask_restful import reqparse, abort, Api, Resource
from flask_pymongo import PyMongo
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

UPLOAD_FOLDER = 'file-uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "property"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'this is a property app'
mongo = PyMongo(app)
api = Api(app)
auth = HTTPBasicAuth()
authT = HTTPTokenAuth(scheme='Token')


APP_URL = "http://127.0.0.1:5000"

USERS = {
  'user1': {
    'username': 'user1',
    'password': '123',
    'img': 'build an API'
  },
  'user2': {
    'username': 'user2',
    'password': '123',
    'img': 'build an API'
  },
  'user3': {
    'username': 'user3',
    'password': '123',
    'img': 'build an API'
  },
}

@authT.verify_token
def verify_auth_token(auth_token):
  serial = Serializer(app.config['SECRET_KEY'])
  try:
    data = serial.loads(auth_token)
  except SignatureExpired:
    return None
  except BadSignature:
    return None
  serial_user = data['username']
  return serial_user

@authT.error_handler
def unauthorized():
  # return 403 instead of 401 to prevent browsers from displaying the default
  # auth dialog
  return make_response(jsonify({'message': 'Unauthorized token access'}), 403)

def abort_if_user_doesnt_exist(user_id):
  if user_id not in USERS:
    abort(404, message="User {} doesn't exist".format(user_id))

@auth.get_password
def get_password(username):
  user = mongo.db.users.find_one({"username": username})

  if user:
    return user.get('password')
  return None


@auth.error_handler
def unauthorized():
  # return 403 instead of 401 to prevent browsers from displaying the default
  # auth dialog
  return make_response(jsonify({'message': 'Unauthorized access'}), 403)

def abort_if_user_doesnt_exist(user_id):
  if user_id not in USERS:
    abort(404, message="User {} doesn't exist".format(user_id))

parser = reqparse.RequestParser()
parser.add_argument('img')


class House(Resource):
  # decorators = [auth.login_required]
  def get(self, house_name):
    data = []

    if house_name:
      house_info = mongo.db.houses.find_one({"name": house_name}, {"_id": 0})
      if house_info:
        return jsonify({"status": "ok", "data": house_info})
      else:
        return {"response": "no house found for {}".format(house_name)}
    return jsonify({"response": data})

  def delete(self, house_name):
    if house_name == "*":
      mongo.db.houses.remove()
    mongo.db.houses.remove({'name': house_name})
    return '', 204

  def put(self, house_name):
    data = request.get_json()
    mongo.db.houses.update({'name': house_name}, {'$set': data})
    return "ok", 201

  def post(self, house_name):
    data = request.get_json()
    if house_name == "*":
        mongo.db.houses.insert(data)
    return {"response": "post ok"}

class Image(Resource):
  # decorators = [auth.login_required]
  def get(self, house_name, filename):
    filename = house_name + '_' + filename
    print filename
    return mongo.send_file(filename)

  def post(self, house_name, filename):
    print(request.files['file'])
    filename = house_name + '_' + filename
    print filename
    mongo.save_file(filename,request.files['file'])
    return mongo.send_file(filename)


class HouseList(Resource):
  # decorators = [auth.login_required]
  def get(self):
    data = []

    cursor = mongo.db.houses.find({}, {"_id": 0, "update_time": 0}).limit(10)

    for house in cursor:
        #print house
        #house = APP_URL + "/" + house.get('name')
        data.append(house)

    return jsonify({"response": data})

  def post(self):
    data = request.get_json()
    if not data:
      data = {"response": "ERROR"}
      return jsonify(data)
    else:
      name = data.get('name')
      if name:
        if mongo.db.houses.find_one({"name": name}):
          return {"response": "house already exists."}
        else:
          mongo.db.houses.insert(data)
          return {"response": "post ok"}
      else:
        return {"response": "name missing"}

def generate_auth_token(username, expiration=604800):
  gen_serial = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
  return gen_serial.dumps({'username': username})


class Token(Resource):
  decorators = [authT.login_required]
  def get(self, user_id):
    data = []
    if user_id:
      user_info = mongo.db.users.find_one({"username": user_id}, {"_id": 0})
      if user_info:
        return jsonify({"status": "ok", "data": user_info})
      else:
        return {"response": "no user found for {}".format(user_id)}
    return jsonify({"response": data})

  def delete(self, user_id):
    mongo.db.users.remove({'username': user_id})
    return '', 204

  def put(self, user_id):
    data = request.get_json()
    mongo.db.users.update({'username': user_id}, {'$set': data})
    return "ok", 201, mongo.db.users.find_one({"username": user_id}, {"_id": 0})


class User(Resource):
  decorators = [auth.login_required]
  def get(self, user_id):
    data = []
    if user_id:
      user_info = mongo.db.users.find_one({"username": user_id}, {"_id": 0})
      if user_info:
        return_token = generate_auth_token(user_id)
        return {'token':return_token.decode()}, 200
        # return jsonify({"status": "ok", "data": user_info})
      else:
        return {"response": "no user found for {}".format(user_id)}
    return jsonify({"response": data})



class UserList(Resource):

  def get(self):
    data = []

    cursor = mongo.db.users.find({}, {"_id": 0, "update_time": 0}).limit(10)

    for user in cursor:
      #print house
      #house = APP_URL + "/" + house.get('name')
      data.append(user)

    return jsonify({"response": data})

  def post(self):
    data = request.get_json()
    if not data:
      data = {"response": "ERROR"}
      return jsonify(data)
    else:
      username = data.get('username')
      if username:
        if mongo.db.users.find_one({"username": username}):
          return {"response": "username already exists."}
        else:
          mongo.db.users.insert(data)
          return {"response": "post ok"}
      else:
        return {"response": "username missing"}

##
## Actually setup the Api resource routing here
##
api.add_resource(HouseList, '/', endpoint="houses")
api.add_resource(House, '/<house_name>', endpoint="name")
api.add_resource(Image, '/<house_name>/<filename>', endpoint="image")
api.add_resource(UserList, '/users', endpoint="users")
api.add_resource(User, '/users/<user_id>', endpoint="username")
api.add_resource(Token, '/token/<user_id>', endpoint="token")

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

# @app.after_request
# def add_cors(resp):
#   """ Ensure all responses have the CORS headers. This ensures any failures are also accessible
#       by the client. """
#   resp.headers['Access-Control-Allow-Origin'] = Flask.request.headers.get('Origin','*')
#   resp.headers['Access-Control-Allow-Credentials'] = 'true'
#   resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET'
#   resp.headers['Access-Control-Allow-Headers'] = Flask.request.headers.get(
#     'Access-Control-Request-Headers', 'Authorization' )
#   # set low for debugging
#   if app.debug:
#     resp.headers['Access-Control-Max-Age'] = '1'
#   return resp

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')