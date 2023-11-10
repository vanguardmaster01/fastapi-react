import requests

from utility.get_header_hash import get_header_hash
from utility.get_session_token_hash import get_session_token_hash
from fastapi import HTTPException, status


def verify_session(
    user_agent,
    session_token,
    username,
):
    # Get header info hash
    header_hash = get_header_hash(user_agent)

    # Get session_token hash
    session_token_hash = get_session_token_hash(session_token)

    # Get session info
    data = {"username": username}
    session_info = requests.post(
        "https://octopus-app-2agx2.ondigitalocean.app/get_session_info",
        json=data,
    ).json()["session_info"]

    # If session does not exsit
    if session_token_hash != session_info["session_token_hash"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    elif header_hash != session_info["header_hash"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
