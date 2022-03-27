import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import utils

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to PyTorch Image Recognition API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    return utils.get_result(image_file=file, is_api=True)


# Downloading: "https://download.pytorch.org/models/densenet121-a639ec97.pth" to C:\Users\GDA-Users/.cache\torch\hub\checkpoints\densenet121-a639ec97.pth


# uvicorn main:app --reload --port 8080