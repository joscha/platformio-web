# Copyright (C) Ivan Kravets <me@ikravets.com>
# See LICENSE for details.

from subprocess import check_output, CalledProcessError
from urllib import unquote


def application(env, start_response):
    status = "200 OK"
    response = ""

    qs = env.get("QUERY_STRING", None)
    if not qs or not qs.startswith("_escaped_fragment_="):
        status = "500 Internal Server Error"
    else:
        url = "http://platformio.ikravets.com/#!" + unquote(qs[19:])
        try:
            response = get_webcontent(url)
            if "404 Not Found" in response:
                status = "404 Not Found"
        except Exception:
            status = "500 Internal Server Error"

    start_response(status, [("Content-Type", "text/html"),
                            ("Content-Length", str(len(response)))])
    return response


def get_webcontent(url):
    retrynums = 0
    while retrynums < 3:
        try:
            response = check_output([
                "phantomjs", "--disk-cache=true", "--load-images=false",
                "crawler.js", url
            ])
            return response
        except CalledProcessError:
            retrynums += 1
    raise Exception("Could not retrieve content from %s" % url)