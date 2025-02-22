from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample endpoint
@app.get("/")
def read_root():
    return {"message": "Hello from BoilerDumps Backend!"}

# Define request model for building clicks
class BuildingClick(BaseModel):
    building_id: int

# Handle building click event
@app.post("/building-click")
def building_click(data: BuildingClick):
    print(f"Building {data.building_id} was clicked!")
    return {"message": f"Building {data.building_id} was clicked!"}
