# Long Response API

API for testing response times and simple endpoint testing.

## Overview

This API provides endpoints for testing response times and simple endpoint functionality. All endpoints support GET, POST, and PUT methods and require no authentication.

## API Documentation

### Swagger UI

Interactive API documentation is available via Swagger UI:

- **Swagger UI**: `/api/swagger` - Interactive API documentation interface
- **OpenAPI Spec**: `/api/openapi.json` - Raw OpenAPI 3.0 specification in JSON format

### Endpoints

#### 1. Test Response Time

**Endpoint**: `/api/testResponseTime`

Wait for a specified time in milliseconds before responding. Useful for testing response time handling and timeouts.

**Methods**: GET, POST, PUT

**Parameters**:
- `testTime` (required): Time to wait in milliseconds (0 - 300000)

**Example GET Request**:
```bash
curl "https://long-response-api.vercel.app/api/testResponseTime?testTime=2000"
```

**Example POST/PUT Request**:
```bash
curl -X POST "https://long-response-api.vercel.app/api/testResponseTime" \
  -H "Content-Type: application/json" \
  -d '{"testTime": 2000}'
```

**Success Response** (200):
```json
{
  "message": "Wait Time Reached: 2000",
  "requestedWaitMs": 2000,
  "startTime": "2024-01-15T10:30:00.000Z",
  "endTime": "2024-01-15T10:30:02.005Z",
  "elapsedMs": 2005
}
```

**Error Responses**:
- `400`: Bad Request - Missing or invalid testTime parameter
- `405`: Method Not Allowed

**Notes**:
- Maximum wait time is 300,000ms (5 minutes)
- For POST/PUT requests, `testTime` can be passed in the request body or as a query parameter

#### 2. Test For Underscore

**Endpoint**: `/api/{param}/test_for_underscore`

Simple endpoint that returns a success message. The path parameter can be any number or text.

**Methods**: GET, POST, PUT

**Path Parameters**:
- `param` (required): Any number or text (e.g., '123', 'abc', 'anynumber', 'text')

**Example Requests**:
```bash
# GET request
curl "https://long-response-api.vercel.app/api/123/test_for_underscore"

# POST request
curl -X POST "https://long-response-api.vercel.app/api/abc/test_for_underscore"

# PUT request
curl -X PUT "https://long-response-api.vercel.app/api/anynumber/test_for_underscore"
```

**Success Response** (200):
```json
{
  "message": "it worked"
}
```

**Error Responses**:
- `405`: Method Not Allowed

## Base URL

- **Production**: `https://long-response-api.vercel.app`
- **Local Development**: `http://localhost:3000`

## Authentication

No authentication is required for any endpoints.

## Technology Stack

- **Platform**: Vercel Serverless Functions
- **Runtime**: Node.js 18+
- **API Documentation**: OpenAPI 3.0 / Swagger UI

## Development

### Local Setup

1. Clone the repository
2. Install dependencies (if any)
3. Run locally using Vercel CLI:
   ```bash
   vercel dev
   ```

### Project Structure

```
long-response-api/
├── api/
│   ├── [param]/
│   │   └── test_for_underscore.js
│   ├── openapi.json.js
│   ├── swagger.js
│   └── testResponseTime.js
├── public/
│   └── index.html
├── openapi.json
├── package.json
└── README.md
```

## License

Private project.
