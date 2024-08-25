from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this list to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this list to specify allowed methods
    allow_headers=["*"],  # Adjust this list to specify allowed headers
)

# Define the Pydantic model
class TodoItem(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class TodoItemResponse(TodoItem):
    id: int

# In-memory database (list) to store To-Do items
todos = []
next_id = 1

# GET /: Display a welcome message
@app.get("/")
def read_root():
    return {"message": "Backend server running at port 8000"}

# POST /todos/: Add a To-Do Item
@app.post("/todos/", response_model=TodoItemResponse)
def create_todo(todo: TodoItem):
    global next_id
    todo_item = TodoItemResponse(id=next_id, **todo.dict())
    todos.append(todo_item)
    next_id += 1
    return todo_item

# GET /todos/: Retrieve All To-Do Items
@app.get("/todos/", response_model=List[TodoItemResponse])
def get_todos():
    return todos

# GET /todos/{id}: Retrieve a Single To-Do Item by ID
@app.get("/todos/{id}", response_model=TodoItemResponse)
def get_todo_by_id(id: int):
    for todo in todos:
        if todo.id == id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

# PUT /todos/{id}: Update a To-Do Item by ID
@app.put("/todos/{id}", response_model=TodoItemResponse)
def update_todo(id: int, updated_todo: TodoItem):
    for index, todo in enumerate(todos):
        if todo.id == id:
            updated_todo_item = TodoItemResponse(id=id, **updated_todo.dict())
            todos[index] = updated_todo_item
            return updated_todo_item
    raise HTTPException(status_code=404, detail="Todo not found")

# DELETE /todos/{id}: Delete a To-Do Item by ID
@app.delete("/todos/{id}")
def delete_todo(id: int):
    for index, todo in enumerate(todos):
        if todo.id == id:
            todos.pop(index)
            return {"detail": "Todo deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")

# Event handler for startup
@app.on_event("startup")
def startup_event():
    print("Backend server running at port 8000")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
