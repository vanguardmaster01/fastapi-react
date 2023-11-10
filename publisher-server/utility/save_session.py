import requests

from utility.get_header_hash import get_header_hash
from utility.get_session_token_hash import get_session_token_hash


def save_session(
    username,
    session_token,
    user_agent,
):
    # Hash header info
    header_hash = get_header_hash(user_agent)

    # Hash session token
    session_token_hash = get_session_token_hash(session_token)

    # Save session
    data = {
        "username": username,
        "header_hash": header_hash,
        "session_token_hash": session_token_hash,
    }

    requests.post(
        "https://octopus-app-2agx2.ondigitalocean.app/save_session",
        json=data,
    ).json()
