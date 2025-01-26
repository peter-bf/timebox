from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from cryptography.fernet import Fernet
import os
import json
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
JSON_FILE_PATH = "../frontend/data/timeboxes.json"

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update as needed for your frontend
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Request and response models
class CreateBoxRequest(BaseModel):
    content: str  # Content to encrypt
    name: str
    timestamp: str
    date_due: str
    description: str

class CreateBoxResponse(BaseModel):
    secret_key: str  # Key for decryption
    encrypted_content: str  # Encrypted content

class DecryptBoxRequest(BaseModel):
    id: str  # ID of the box file
    secret_key: str  # Key for decryption

class DecryptBoxResponse(BaseModel):
    decrypted_content: str  # Decrypted content

# Create new box JSON file by appending to an array
def create_new_box_json(unique_id, encrypted_content, name, timestamp, date_due, description):
    # Ensure the file and directory exist
    os.makedirs(os.path.dirname(JSON_FILE_PATH), exist_ok=True)

    # Load existing data or initialize as an empty list
    if os.path.exists(JSON_FILE_PATH):
        with open(JSON_FILE_PATH, "r") as json_file:
            try:
                data = json.load(json_file)
            except json.JSONDecodeError:
                data = []  # Reset to empty list if file is corrupted
    else:
        data = []

    # Box data to append
    box_data = {
        "id": unique_id,
        "Name": name,
        "Timestamp": timestamp,
        "DateDue": date_due,
        "Description": description,
        "Content": encrypted_content.decode(),  # Encrypted content
        "IconUrl": "https://github.com/octocat.png",
        "BlockchainHash": "0xabc1234567890defabc1234567890defabc12345",
    }

    # Append the new box data to the list
    data.append(box_data)

    # Write back to the JSON file
    with open(JSON_FILE_PATH, "w") as json_file:
        json.dump(data, json_file, indent=4)

    print(f"New box added to JSON file: {JSON_FILE_PATH}")

# Create box endpoint
@app.post("/createbox", response_model=CreateBoxResponse)
async def createbox(request: CreateBoxRequest):
    try:
        # Generate secret key and encrypt content
        secret_key = Fernet.generate_key()
        cipher = Fernet(secret_key)
        encrypted_content = cipher.encrypt(request.content.encode())

        # Generate unique ID and save the box
        unique_id = str(uuid.uuid4())
        create_new_box_json(
            unique_id,
            encrypted_content,
            request.name,
            request.timestamp,
            request.date_due,
            request.description,
        )

        # Return response
        return CreateBoxResponse(
            secret_key=secret_key.decode(),
            encrypted_content=encrypted_content.decode(),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Decrypt box endpoint
@app.post("/decryptbox", response_model=DecryptBoxResponse)
async def decryptbox(request: DecryptBoxRequest):
    try:
        # Ensure the JSON file exists
        if not os.path.exists(JSON_FILE_PATH):
            raise HTTPException(status_code=404, detail="Box data file not found.")

        # Load the JSON file
        with open(JSON_FILE_PATH, "r") as json_file:
            try:
                data = json.load(json_file)
            except json.JSONDecodeError:
                raise HTTPException(status_code=500, detail="Box data file is corrupted.")

        # Find the box with the specified ID
        box_data = next((box for box in data if box["id"] == request.id), None)
        if not box_data:
            raise HTTPException(status_code=404, detail="Box with the specified ID not found.")

        # Decrypt the content
        cipher = Fernet(request.secret_key.encode())
        try:
            decrypted_content = cipher.decrypt(box_data["Content"].encode()).decode()
        except Exception:
            raise HTTPException(status_code=400, detail="Decryption failed. Invalid key or corrupted content.")

        return DecryptBoxResponse(decrypted_content=decrypted_content)

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")