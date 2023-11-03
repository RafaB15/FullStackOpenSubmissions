```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST request
    activate server
    server-->>browser: Status Code 201
    deactivate server
```
