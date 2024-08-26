import logging
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATABASE_URL = "mysql+mysqlconnector://root:Parthk05%40MySql@localhost:3306/todo_app"

# Create the SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this list to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this list to specify allowed methods
    allow_headers=["*"],  # Adjust this list to specify allowed headers
)

# SQLAlchemy model for TodoItem
class TodoItemDB(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(length=255), index=True)
    description = Column(String(length=255), nullable=True)
    completed = Column(Boolean, default=False)

# Pydantic models for request and response
class TodoItem(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class TodoItemResponse(TodoItem):
    id: int

# Create the database tables
Base.metadata.create_all(bind=engine)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET /: Display a welcome message
@app.get("/")
async def read_root():
    return {"message": "Backend server running at port 8000"}

# POST /todos/: Add a To-Do Item
@app.post("/todos/", response_model=TodoItemResponse)
async def create_todo(todo: TodoItem, db: Session = Depends(get_db)):
    db_todo = TodoItemDB(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    logger.info(f"Created Todo with ID: {db_todo.id}")
    return db_todo

# GET /todos/: Retrieve All To-Do Items
@app.get("/todos/", response_model=List[TodoItemResponse])
async def get_todos(db: Session = Depends(get_db)):
    todos = db.query(TodoItemDB).all()
    logger.info(f"Retrieved {len(todos)} todos from the database")
    return todos

# GET /todos/{id}: Retrieve a Single To-Do Item by ID
@app.get("/todos/{id}", response_model=TodoItemResponse)
async def get_todo_by_id(id: int, db: Session = Depends(get_db)):
    todo = db.query(TodoItemDB).filter(TodoItemDB.id == id).first()
    if todo is None:
        logger.warning(f"Todo with ID {id} not found")
        raise HTTPException(status_code=404, detail="Todo not found")
    logger.info(f"Retrieved Todo with ID: {id}")
    return todo

# PUT /todos/{id}: Update a To-Do Item by ID
@app.put("/todos/{id}", response_model=TodoItemResponse)
async def update_todo(id: int, updated_todo: TodoItem, db: Session = Depends(get_db)):
    db_todo = db.query(TodoItemDB).filter(TodoItemDB.id == id).first()
    if db_todo is None:
        logger.warning(f"Todo with ID {id} not found for update")
        raise HTTPException(status_code=404, detail="Todo not found")
    for key, value in updated_todo.dict().items():
        setattr(db_todo, key, value)
    db.commit()
    db.refresh(db_todo)
    logger.info(f"Updated Todo with ID: {id}")
    return db_todo

# DELETE /todos/{id}: Delete a To-Do Item by ID
@app.delete("/todos/{id}")
async def delete_todo(id: int, db: Session = Depends(get_db)):
    db_todo = db.query(TodoItemDB).filter(TodoItemDB.id == id).first()
    if db_todo is None:
        logger.warning(f"Todo with ID {id} not found for deletion")
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()
    logger.info(f"Deleted Todo with ID: {id}")
    return {"detail": "Todo deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
