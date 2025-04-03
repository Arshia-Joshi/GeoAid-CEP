from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('live_news.html')

@app.route('/upload', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({'error': 'No file part'})

    photo = request.files['photo']
    location = request.form.get('location', 'Unknown Location')

    if photo.filename == '':
        return jsonify({'error': 'No selected file'})

    if not allowed_file(photo.filename):
        return jsonify({'error': 'Invalid file type'})

    filename = secure_filename(photo.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    photo.save(file_path)

    return jsonify({'image_url': url_for('static', filename=f'uploads/{filename}'), 'location': location, 'filename': filename})

@app.route('/delete_photo', methods=['POST'])
def delete_photo():
    data = request.json
    filename = data.get('filename')

    if not filename:
        return jsonify({'error': 'Filename not provided'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'success': True})
    else:
        return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)


