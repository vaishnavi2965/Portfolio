import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Allow all origins to prevent CORS errors
CORS(app, resources={r"/*": {"origins": "*"}})

# --- CONFIGURATION ---
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.portfolio_db

# --- HELPER ---
def serialize(data):
    """Convert ObjectId to string for JSON serialization"""
    return {**data, '_id': str(data['_id'])}

# --- ROUTE: SERVE FILES (Images context) ---
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# --- ROUTE 1: GENERAL (Multipart Form Data) ---
@app.route('/api/general', methods=['GET', 'POST'])
def handle_general():
    if request.method == 'GET':
        data = db.general.find_one()
        return jsonify(serialize(data)) if data else jsonify({})
    
    else: # POST 
        # access existing data 
        existing_data = db.general.find_one() or {} 
        
        # Get text data from request.form (NOT request.json)
        update_data = {
            "name": request.form.get('name'),
            "tagline": request.form.get('tagline'),
            "bio": request.form.get('bio'),
            "email": request.form.get('email'),
            # Add these new lines:
            "github": request.form.get('github'),
            "linkedin": request.form.get('linkedin'),
            "whatsapp": request.form.get('whatsapp'),
            "phone": request.form.get('phone')
        }

        # Handle Avatar File
        if 'avatar' in request.files:
            file = request.files['avatar']
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                update_data['avatar'] = f"http://localhost:5000/uploads/{filename}"

        # Handle Resume PDF
        if 'resume' in request.files:
            file = request.files['resume']
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                update_data['resumeLink'] = f"http://localhost:5000/uploads/{filename}"

        # Merge and Save
        final_data = {**existing_data, **update_data}
        if '_id' in final_data: del final_data['_id'] # Do not update _id

        db.general.update_one({}, {"$set": final_data}, upsert=True)
        return jsonify({"msg": "Profile Updated"})

# --- ROUTE 2: SKILLS (Standard JSON) ---
# This was missing or causing errors in your previous version
@app.route('/api/skills', methods=['GET', 'POST'])
def handle_skills():
    if request.method == 'GET':
        return jsonify([serialize(doc) for doc in db.skills.find()])
    else:
        # Uses request.json because Frontend sends standard JSON object
        data = request.json
        result = db.skills.insert_one(data)
        return jsonify({"msg": "Skill Added", "id": str(result.inserted_id)})

@app.route('/api/skills/<id>', methods=['DELETE'])
def delete_skill(id):
    db.skills.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Deleted"})

# --- ROUTE 3: EXPERIENCE (Standard JSON) ---
# This was also likely missing
@app.route('/api/experience', methods=['GET', 'POST'])
def handle_experience():
    if request.method == 'GET':
        return jsonify([serialize(doc) for doc in db.experience.find()])
    else:
        data = request.json
        result = db.experience.insert_one(data)
        return jsonify({"msg": "Experience Added", "id": str(result.inserted_id)})

@app.route('/api/experience/<id>', methods=['DELETE'])
def delete_experience(id):
    db.experience.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Deleted"})

# --- ROUTE 4: PROJECTS (Multipart Form Data) ---
@app.route('/api/projects', methods=['GET', 'POST'])
def handle_projects():
    if request.method == 'GET':
        return jsonify([serialize(doc) for doc in db.projects.find()])
    
    else: # POST
        # Use request.form for text, request.files for images
        title = request.form.get('title')
        description = request.form.get('description')
        link = request.form.get('link')
        image_url = ""

        if 'image' in request.files:
            file = request.files['image']
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_url = f"http://localhost:5000/uploads/{filename}"

        new_project = {
            "title": title,
            "description": description,
            "link": link,
            "image": image_url
        }
        result = db.projects.insert_one(new_project)
        return jsonify({"msg": "Project Added", "id": str(result.inserted_id)})

@app.route('/api/projects/<id>', methods=['DELETE'])
def delete_project(id):
    db.projects.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Deleted"})

# --- ROUTE 5: MESSAGES (Standard JSON) ---
@app.route('/api/messages', methods=['GET'])
def get_messages():
    return jsonify([serialize(doc) for doc in db.messages.find()])

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.json
    db.messages.insert_one(data)
    return jsonify({"msg": "Message Sent!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)