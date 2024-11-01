from flask import Flask, request, render_template, jsonify
import os
from analyzers.sqli_analyzer import check_sql_injection
from analyzers.xss_analyzer import check_xss

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Home page route
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to analyze code
@app.route('/analyze', methods=['POST'])
def analyze_code():
    results = {"SQL Injection": [], "XSS": []}
    uploaded_files = request.files.getlist("files[]")

    for file in uploaded_files:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        # Open and read the file content
        with open(filename, 'r') as f:
            code = f.read()
            # Run analyzers
            if check_sql_injection(code):
                results["SQL Injection"].append(file.filename)
            if check_xss(code):
                results["XSS"].append(file.filename)

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
