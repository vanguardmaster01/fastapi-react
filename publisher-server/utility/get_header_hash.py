import hashlib


def get_header_hash(user_agent):
    keccak = hashlib.new("sha3_256")
    keccak.update(user_agent.encode())
    header_hash = keccak.hexdigest()
    return header_hash
