def example(example: dict):
    response_example = {
        200: {
            "content": {
                "application/json": {
                    "example": example,
                }
            }
        }
    }
    return response_example
