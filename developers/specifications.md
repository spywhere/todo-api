# Specifications

## App

### Health Check

Request

```
GET /
```

Response

```
200 OK
content-type: application/json

{
    "timestamp": string // current date and time
}
```


## Authentications

### Login

Request

```
POST /v1/authentications/login
content-type: application/json

{
    "user": string,
    "password": string  // SHA-1 of the actual password
}
```

Response

```
200 OK
content-type: application/json

{
    "access_token": string  // A JWT token for performing API calls
}
```

## Tasks

### Get a list of tasks

Request

```
GET /v1/tasks?filter[from]=[ISO-8601 timestamp]&filter[to]=[ISO-8601 timestamp]
```

Response

```
200 OK
content-type: application/json

{
    "tasks": [
        {
            "id": string,
            "title": string,
            "description": string,
            "create_timestamp": string  // ISO-8601 timestamp,
            "update_timestamp": string  // ISO-8601 timestamp
        },
        ... // Additional tasks
    ]
}
```

### Create a new task

Request

```
POST /v1/tasks
content-type: application/json

{
    "title": string,
    "description": string
}
```

Response

```
200 OK
```

### Update an existing task

Request

```
PATCH /v1/tasks/:taskID
content-type: application/json

{
    "title": string,  // Optional
    "description": string  // Optional
}
```

Response

```
200 OK
```

### Delete an existing task

Request

```
DELETE /v1/tasks/:taskID
```

Response

```
200 OK
```
