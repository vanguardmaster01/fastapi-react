def extract_request(request):
    # Extract user agent
    user_agent = request.headers.get("user-agent")

    # Extract session token
    session_token = request.cookies.get("session_token")
    if session_token is None:
        session_token = "None"

    # Return user agent and session token
    return user_agent, session_token
