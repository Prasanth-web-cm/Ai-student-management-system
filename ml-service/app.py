from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'student_model.pkl'

# Initial mock model if not exists
def train_initial_model():
    # Synthetic data: [attendance, midterm, quiz, prev_gpa] -> risk (0: Good, 1: Average, 2: At Risk)
    X = np.array([
        [0.95, 0.90, 0.95, 3.8], [0.90, 0.85, 0.90, 3.5], # Good
        [0.80, 0.70, 0.75, 3.0], [0.75, 0.65, 0.70, 2.8], # Average
        [0.55, 0.40, 0.50, 2.0], [0.45, 0.35, 0.45, 1.8], # At Risk
        [0.90, 0.10, 0.80, 2.5], [0.30, 0.80, 0.40, 2.2]  # Edge cases
    ])
    y = np.array([0, 0, 1, 1, 2, 2, 2, 2])
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    print("Initial model trained and saved.")

if not os.path.exists(MODEL_PATH):
    train_initial_model()

# Load model
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Features: attendanceRate, midtermScore, quizRate, prevGPA
        features = [
            data.get('attendanceRate', 0.5),
            data.get('midtermScore', 0.5),
            data.get('quizRate', 0.5),
            data.get('prevGPA', 2.5)
        ]
        
        prediction = model.predict([features])[0]
        probabilities = model.predict_proba([features])[0]
        
        status_map = {0: 'Good', 1: 'Average', 2: 'At Risk'}
        prediction_status = status_map.get(prediction, 'Unknown')
        
        return jsonify({
            'predictedGrade': float(np.max(probabilities)),
            'status': prediction_status,
            'probabilities': {
                'Good': float(probabilities[0]),
                'Average': float(probabilities[1]),
                'At Risk': float(probabilities[2])
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/train', methods=['POST'])
def train():
    # Placeholder for updating the model with new data
    return jsonify({'message': 'Model training triggered (not implemented for demo)'})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
