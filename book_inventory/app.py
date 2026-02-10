from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# creating app
app = FastAPI()

app.mount("/static", StaticFiles(directory = "static"), name = "static")

@app.get("/")
def home():
    return FileResponse("static/home_screen.html")

@app.get("/addScreen")
def add_screen():
    return FileResponse("static/add_book_screen.html")

@app.get("/updateScreen")
def update_screen():
    return FileResponse("static/update_book_screen.html")

@app.get("/searchScreen")
def search_screen():
    return FileResponse("static/search_book_screen.html")