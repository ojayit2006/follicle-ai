from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# allow frontend on Vite dev server to call this API
app.add_middleware(
    CORSMiddleware,
    # In production you can restrict this to your Vercel domain,
    # but for now allow all so the UI definitely reaches the API.
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load trained model
model = joblib.load("baldness_model.pkl")

# IMPORTANT: training feature columns
feature_columns = model.feature_names_in_


@app.get("/")
def home():
    return {"message": "Baldness Prediction API running"}


@app.post("/predict")
def predict(data: dict):
    # convert incoming payload to DataFrame
    df = pd.DataFrame([data])

    # encode categorical features
    df = pd.get_dummies(df)

    # align columns with training data
    df = df.reindex(columns=feature_columns, fill_value=0)

    # main prediction (multi-class 0–3)
    prediction = int(model.predict(df)[0])

    # probability for the "no / minimal loss" class (assuming class 0)
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(df)[0]
        safe_idx = 0 if len(proba) > 0 else None
        surv_prob = float(proba[safe_idx]) if safe_idx is not None else 0.5
        confidence = float(max(proba))
    else:
        surv_prob = 0.5
        confidence = 0.5

    return {
        "prediction": prediction,
        "probability": surv_prob,
        "confidence": confidence,
    }