import asyncio

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from function.body import Body
from function.example import example
from function.get_article_list import get_article_list
from function.login import login
from function.get_realtime_traffic import get_realtime_traffic
from function.logout import logout


app = FastAPI(docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000",
        "https://localhost",
        "http://localhost",
        "https://localhost:3000",
        "http://localhost:3000",
        "https://localhost:8000",
        "http://localhost:8000",
        "https//0.0.0.0:5000",
        "https//0.0.0.0:5000",
        "https://localhost:5000",
        "http://localhost:5000",
        "https://seahorse-app-4aykk.ondigitalocean.app",
        "https://seahorse-app-4aykk.ondigitalocean.app",
        "https://seahorse-app-4aykk.ondigitalocean.app:5000",
        "https://seahorse-app-4aykk.ondigitalocean.app:5000",
        "https://seahorse-app-4aykk.ondigitalocean.app:8080",
        "https://seahorse-app-4aykk.ondigitalocean.app:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post(
    path="/get-realtime-traffic-list",
    responses=example(
        {
            "realtime_traffic_list": [
                {
                    "unifiedScreenName": "Jelena Karleuša Picture, Dating, Birthday, Net Worth, Wiki, Biography",
                    "screenPageViews": "81",
                },
                {
                    "unifiedScreenName": "Amazing Changes In Your Body After A Month Of No Alcohol",
                    "screenPageViews": "61",
                },
            ]
        }
    ),
)
async def get_realtime_traffic_api():
    return await asyncio.to_thread(get_realtime_traffic)


@app.post(
    path="/get-article-list",
    responses=example(
        {
            "article_list": [
                {
                    "title": "Article A",
                    "url": "https://thoughtnova.com/article-a",
                    "session_score": 82,
                    "date": "2023-09-20",
                    "featured_image_url": "https://thoughtnova.com/article-a-image",
                },
                {
                    "title": "Article B",
                    "url": "https://thoughtnova.com/article-b",
                    "session_score": 43,
                    "date": "2023-09-20",
                    "featured_image_url": "https://thoughtnova.com/article-b-image",
                },
            ]
        }
    ),
)
async def get_articles_list_api(
    page_number: int = Body(1),
    session_score: int = Body(),
    keyword: str = Body(),
):
    return await asyncio.to_thread(
        get_article_list,
        page_number,
        session_score,
        keyword,
    )


@app.post(
    path="/logout",
    responses=example({"logout_successful": True}),
)
async def logout_api(
    request: Request,
    username: str = Body(),
):
    return await asyncio.to_thread(
        logout,
        request,
        username,
    )


@app.post(
    path="/login",
    responses=example({"login_successful": True}),
)
async def login_api(
    request: Request,
    username: str = Body(),
    password: str = Body(),
):
    return await asyncio.to_thread(
        login,
        request,
        username,
        password,
    )
