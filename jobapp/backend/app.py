from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(
    __name__,
    static_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '../../frontend/build')),
    static_url_path='/'
)
CORS(app)


# Serve React static files and index.html for client-side routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# Example API route
@app.route('/api/dashboard', methods=['GET'])
def dashboard_data():
    return [
        {"company": "Google", "role": "SWE Intern", "status": "Interested"},
        {"company": "Figma", "role": "Designer", "status": "Applied"}
    ]

if __name__ == '__main__':
    app.run(debug=True)
