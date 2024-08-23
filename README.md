### Usage
There are two required query params:

1. `url` - encoded URL to request.

    Example: `https%3A%2F%2Fapi.ipify.org%2F%3Fformat%3Djson`

2. `valuePath` - path to the required value.

    You can use `.` as a delimeter. Use numbers to index an array.

    Example: `0.rate`

Usage example: `https://98o718.github.io/json-value-extractor/?valuePath=ip&url=https%3A%2F%2Fapi.ipify.org%2F%3Fformat%3Djson`
    
