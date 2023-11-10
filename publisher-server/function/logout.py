import requests

from utility.extract_request import extract_request
from utility.verify_session import verify_session
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse


def logout(
    request,
    username,
):
    # Get user agent and session token
    user_agent, session_token = extract_request(request)

    # Verify session
    verify_session(
        user_agent,
        session_token,
        username,
    )

    # Delete session
    data = {"username": username}
    is_deleted = requests.post(
        "https://octopus-app-2agx2.ondigitalocean.app/delete_session",
        json=data,
    ).json()["is_deleted"]

    # Check if deleted
    if not is_deleted:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Empty session_token
    headers = {
        "Set-Cookie": "session_token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    }

    # If everything looks good
    return JSONResponse(
        content={"logout_successful": True},
        headers=headers,
    )
