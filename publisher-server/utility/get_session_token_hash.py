import hashlib


def get_session_token_hash(session_token):
    keccak = hashlib.new("sha3_256")
    keccak.update(session_token.encode())
    session_token_hash = keccak.hexdigest()
    return session_token_hash
