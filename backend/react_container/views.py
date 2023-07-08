"""
This module contains the catchall view for the app app.
"""

import logging

import requests
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
from django.template import engines
from django.views.generic import TemplateView

logger = logging.getLogger(__name__)

def iter_response(response):
    for chunk in response.iter_content(chunk_size=65536):
        if chunk: 
            yield chunk

def catchall_dev(request, upstream="http://localhost:3000"):
    upstream_url = upstream + request.path
    logger.info("Attempting to proxy request to %s", upstream_url)
    try:
        response = requests.get(upstream_url, stream=True)
        content_type = response.headers.get("Content-Type")

        if content_type == "text/html; charset=UTF-8":
            response_text = response.text
            return HttpResponse(
                engines["django"].from_string(response_text).render(),
                content_type=content_type,
                status=response.status_code,
                reason=response.reason,
            )
        else:
            return StreamingHttpResponse(
                iter_response(response),
                content_type=content_type,
                status=response.status_code,
                reason=response.reason,
            )
    except Exception as e:
        logger.error("Failed to access %s, with %s", upstream_url, e)
        raise

catchall_prod = TemplateView.as_view(template_name="index.html")

catchall = catchall_dev if settings.DEBUG else catchall_prod

# Create your views here.
