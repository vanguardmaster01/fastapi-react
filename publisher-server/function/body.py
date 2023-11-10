from fastapi import Body as body


def Body(default=None):
    return body(default, embed=True)
