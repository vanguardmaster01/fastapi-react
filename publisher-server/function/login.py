import bcrypt
import requests

from fastapi.responses import JSONResponse
from fastapi import HTTPException, status
from utility.refresh_session import refresh_session
from utility.extract_request import extract_request


def login(
    request,
    username,
    password,
):
    # Get user agent and session token
    user_agent, session_token = extract_request(request)

    # Get password hash
    data = {"username": username}
    saved_password_hash = requests.post(
        "https://octopus-app-2agx2.ondigitalocean.app/get_saved_password_hash",
        json=data,
    ).json()["saved_password_hash"]

    # Check password hash
    if not bcrypt.checkpw(
        password.encode("utf-8"),
        saved_password_hash.encode("utf-8"),
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    # Refresh session cookie
    headers = refresh_session(
        user_agent,
        username,
    )

    # Return login successful
    return JSONResponse(
        content={"login_successful": True},
        headers=headers,
    )
