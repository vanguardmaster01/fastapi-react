import requests

from fastapi import HTTPException, status
from fastapi.responses import JSONResponse


def get_article_list(
    page_number,
    session_score,
    keyword,
):
    # Verify page number
    if not isinstance(page_number, int):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid page number",
        )
    if page_number < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid page number",
        )

    # Set page size
    page_size = 100

    # Set skip count
    skip_count = (page_number - 1) * page_size

    # Set sort criteria
    sort_criteria = [
        (
            "date_published",
            -1,
        )
    ]

    # Initiate filter
    filter = {}

    # Set up tag filter
    filter["tag"] = {
        "$in": [
            "story",
            "hot_story",
            "link",
            "link_image",
        ]
    }

    # Add session score filter
    if (
        session_score != None
        and isinstance(session_score, int)
        and session_score > 0
    ):
        filter["session_score"] = {"$gte": session_score}

    # Add keyword filter
    if keyword != None and isinstance(keyword, str):
        filter["title"] = {"$regex": keyword, "$options": "i"}

    # Get article list
    data = {
        "page_size": page_size,
        "skip_count": skip_count,
        "sort_criteria": sort_criteria,
        "filter": filter,
    }
    new_article_list = requests.post(
        "https://octopus-app-2agx2.ondigitalocean.app/get_article_list",
        json=data,
    ).json()["article_list"]

    # Return article list
    return JSONResponse(content={"article_list": new_article_list})
