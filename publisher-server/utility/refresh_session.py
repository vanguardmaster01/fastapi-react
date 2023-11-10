import secrets

from utility.save_session import save_session


def refresh_session(
    user_agent,
    username,
):
    # Set a new session_token
    session_token = secrets.token_hex()
    header = {
        "Set-Cookie": f"session_token={session_token}; max-age=604800; secure; samesite=none"
    }

    # Save session to database
    save_session(
        username,
        session_token,
        user_agent,
    )

    # Return header with new session_token
    return header
