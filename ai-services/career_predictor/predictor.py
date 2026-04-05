import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

# Placeholder for career predictor
def predict_career(interests, skills):
    # Simple logic
    if 'tech' in interests.lower():
        return 'Software Engineer'
    return 'Teacher'

if __name__ == "__main__":
    print(predict_career('tech', 'coding'))