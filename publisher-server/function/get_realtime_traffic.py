import requests
from fastapi.responses import JSONResponse


def get_realtime_traffic():
    realtime_report = requests.post(
        "https://octopus-app-2agx2.ondigitalocean.app/get_realtime_report",
    ).json()["realtime_report"]

    return JSONResponse(content={"realtime_traffic_list": realtime_report})
