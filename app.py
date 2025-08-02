from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    # Here you would handle the form submission and processing
    # For example, you could scrape job listings based on user input
    job_data = request.form.get('job_data')  # Example form field
    # Process job_data and get results (this part would involve your scraping logic)
    return render_template('result.html', job_data=job_data)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)