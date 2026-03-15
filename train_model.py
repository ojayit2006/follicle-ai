import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

print("Loading dataset...")
data = pd.read_csv("cleaned_hair_loss_dataset.csv")
data.columns = data.columns.str.strip()

# 4-class target: 0,1,2,3
y = data["hair_loss"]
X = data.drop("hair_loss", axis=1)

# one-hot encode categoricals
X = pd.get_dummies(X)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("Training RandomForest...")
model = RandomForestClassifier(
    n_estimators=300,
    class_weight="balanced",
    random_state=42
)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Classification report:")
print(classification_report(y_test, y_pred))

joblib.dump(model, "baldness_model.pkl")
print("Model saved as baldness_model.pkl")