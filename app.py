from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Route for the Live News & Photos page
@app.route('/')
def index():
    return render_template('live_news.html')

# Route to handle photo uploads
@app.route('/upload', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return redirect(request.url)

    photo = request.files['photo']
    if photo.filename == '':
        return redirect(request.url)

    # Here, you should save the file to a proper directory (e.g., static/uploads)
    photo.save(f'static/uploads/{photo.filename}')
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)




