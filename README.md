# Job Application Scraper

This project is a Flask web application that allows users to scrape job listings from various websites using Selenium. The application provides a user-friendly interface to input search criteria and displays the results dynamically.

## Project Structure

```
JobApp/
├── app.py                 # Main Flask application
├── requirements.txt       # List of required Python packages
├── .gitignore             # Files to ignore in Git
├── templates/             # HTML templates for rendering pages
│   ├── index.html        # Main page template
│   └── result.html       # Results page template
├── static/                # Static files (CSS, JS, images)
│   └── style.css         # Styles for the application
├── scraper/               # Directory for scraping code
│   └── job_scraper.py    # Selenium scraping logic
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd JobApp
   ```

2. **Create a virtual environment (optional but recommended):**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required packages:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```
   python app.py
   ```

5. **Access the application:**
   Open your web browser and go to `http://127.0.0.1:5000`.

## Usage

- Use the main page to enter your job search criteria.
- After submitting the form, the application will scrape the job listings and display the results on a new page.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.