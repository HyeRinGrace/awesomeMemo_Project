from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles #정적파일을 서버에 주입해주는 헤더

class Memo(BaseModel):
    id:str
    content:str

memos = []

app = FastAPI()

# 메모 js 응답받기 
@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'

# 메모 서버 받을 준비 완료
@app.get('/memos')
def read_memo():
    return memos

app.mount("/", StaticFiles(directory="static", html = True), name="static")