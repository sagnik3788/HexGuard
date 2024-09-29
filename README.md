# HexGuard

HexGuard is a dynamic binary analysis tool built with Go and Python, leveraging x64dbg for automated malware detection. It helps security professionals and developers analyze binaries for malicious behavior by monitoring system calls, API interactions, and generating comprehensive reports.

## Architecture

```mermaid
graph TD
    subgraph "Client Layer" 
        User[fa:fa-user User]
        UI[fa:fa-desktop Web Interface]
    end

    subgraph "Storage Layer"
        S3[fa:fa-database AWS S3]
    end

    subgraph "Queue System"
        RMQ[fa:fa-tasks RabbitMQ]
    end

    subgraph "Load Balancer"
        NGINX[fa:fa-balance-scale NGINX]
    end

    subgraph "Kubernetes Cluster"
        K8S[fa:fa-cubes Kubernetes]
        subgraph "Worker Nodes"
            W1[fa:fa-window-maximize Windows Container 1]
            W2[fa:fa-window-maximize Windows Container 2]
            W3[fa:fa-window-maximize Windows Container 3]
            W4[fa:fa-window-maximize Windows Container ...]
        end
    end

    subgraph "Analysis Components"
        X64DBG1[fa:fa-bug x64dbg]
        X64DBG2[fa:fa-bug x64dbg]
        X64DBG3[fa:fa-bug x64dbg]
        PY1[fa:fa-code Python Scripts]
        PY2[fa:fa-code Python Scripts]
        PY3[fa:fa-code Python Scripts]
    end

    subgraph "Caching Layer"
        Redis[fa:fa-bolt Redis Cache]
    end

    subgraph "Monitoring and Logging"
        Prometheus[fa:fa-chart-line Prometheus]
        Grafana[fa:fa-tachometer-alt Grafana]
        ELK[fa:fa-search ELK Stack]
    end

    User -->|Uploads binary| UI
    UI -->|Sends file| S3
    S3 -->|Notifies| RMQ
    RMQ -->|Queues analysis job| K8S
    K8S -->|Assigns job| W1
    K8S -->|Assigns job| W2
    K8S -->|Assigns job| W3
    K8S -->|Assigns job| W4
    W1 -->|Runs| X64DBG1
    W2 -->|Runs| X64DBG2
    W3 -->|Runs| X64DBG3
    X64DBG1 -.->|Automated by| PY1
    X64DBG2 -.->|Automated by| PY2
    X64DBG3 -.->|Automated by| PY3
    W1 <-->|Caches results| Redis
    W2 <-->|Caches results| Redis
    W3 <-->|Caches results| Redis
    W4 <-->|Caches results| Redis
    NGINX -->|Distributes requests| K8S
    K8S -->|Returns results| NGINX
    NGINX -->|Sends response| UI
    UI -->|Displays results| User

    Prometheus -->|Monitors| K8S
    Prometheus -->|Monitors| RMQ
    Prometheus -->|Monitors| Redis
    Grafana -->|Visualizes| Prometheus
    K8S -.->|Logs| ELK
    RMQ -.->|Logs| ELK
    Redis -.->|Logs| ELK

    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    class X64DBG1,X64DBG2,X64DBG3 highlight
    classDef emphasis fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    class K8S,Redis emphasis
```


## Features

- **Dynamic Analysis**: Automatically analyzes binaries to detect suspicious behavior patterns.
- **API Integration**: RESTful API for uploading binaries and retrieving analysis results.
- **Report Generation**: Generates detailed reports summarizing analysis findings.
- **Queue Management**: Uses RabbitMQ for managing analysis tasks efficiently.
- **Caching**: Implements Redis for caching frequently accessed data.

## Project Structure

```
HexGuard/
├── core/
│   ├── analysis/    # Analysis logic
│   ├── reporting/   # Reporting functionality
│   └── x64dbg/      # x64dbg interaction scripts
├── saas/
│   ├── api/         # API endpoints
│   ├── db/          # Database setup (Appwrite)
│   ├── queue/       # Job queue management (RabbitMQ)
│   ├── cache/       # Caching (Redis)
│   └── web/         # Web frontend
├── cli/             # Command-line interface
├── docs/            # Documentation
├── scripts/         # Setup and automation scripts
├── tests/           # Unit and integration tests
├── Dockerfile       # Docker configuration
├── docker-compose.yaml  # Local development setup
├── Makefile         # Build and testing commands
└── README.md        # Project overview
```

## Requirements

- Go (version 1.16+)
- Python (version 3.6+)
- x64dbg (installed and configured)
- Appwrite (for authentication and storage)
- RabbitMQ (for task queue management)
- Redis (for caching)
- Docker & Kubernetes (for container orchestration)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/HexGuard.git
cd HexGuard
```

### Setup Appwrite

Follow the [Appwrite installation guide](https://appwrite.io/docs/installation) to set up your Appwrite server.

### Setup RabbitMQ

Install RabbitMQ and ensure it's running:

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### Setup Redis

Install Redis and ensure it's running:

```bash
docker run -d --name redis -p 6379:6379 redis
```

### Build and Run

To build the project, run:

```bash
make build
```

Then, start the server:

```bash
go run saas/main.go
```

## API Usage

- **Upload a binary**:
  - `POST /upload` - Upload a binary for analysis.
- **Get analysis results**:
  - `GET /results/:id` - Retrieve analysis results for the given binary ID.

## Running Tests

To run the tests, use:

```bash
make test
```

## Deployment with Docker and Kubernetes

You can deploy HexGuard using Docker and Kubernetes for scaling and management. Refer to the `Dockerfile` and `docker-compose.yaml` for configurations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- x64dbg for the debugging tool.
- Appwrite for backend services.
- RabbitMQ for queue management.
- Redis for caching.
- Go and Python for their robust ecosystems and libraries.
