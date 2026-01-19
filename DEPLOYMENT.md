# Deployment Guide

## Docker Deployment

### Building the Docker Image

```bash
docker build -t devops-learning-platform .
```

### Running with Docker

```bash
docker run -p 3000:8080 devops-learning-platform
```

The application will be available at `http://localhost:3000`

### Using Docker Compose

```bash
docker-compose up -d
```

To stop:
```bash
docker-compose down
```

### Health Check

The application includes a health check endpoint at `/health` that returns "healthy" when the app is running properly.

Test it:
```bash
curl http://localhost:3000/health
```

### Environment Variables

The environment variables are embedded at build time from the `.env` file:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

These are automatically included when you build the Docker image (the `.env` file is copied during build).

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (1.19+)
- kubectl configured
- Namespace created (`kubectl create namespace devops-learning`)

### Deploy with Kustomize

```bash
kubectl apply -k k8s/base/
```

### Deploy with Helm

```bash
helm install devops-learning helm/devops-learning/ \
  --namespace devops-learning \
  --create-namespace
```

For staging:
```bash
helm install devops-learning helm/devops-learning/ \
  --namespace devops-learning \
  --values helm/devops-learning/values-staging.yaml
```

For production:
```bash
helm install devops-learning helm/devops-learning/ \
  --namespace devops-learning \
  --values helm/devops-learning/alues-production.yaml
```

### Verify Deployment

```bash
kubectl get pods -n devops-learning
kubectl get svc -n devops-learning
kubectl get ingress -n devops-learning
```

### Check Logs

```bash
kubectl logs -n devops-learning -l app=devops-learning
```

## Production Build

The project uses a multi-stage Docker build:
1. **Build stage**: Installs dependencies and builds the Vite app
2. **Production stage**: Serves the static files with Nginx (running as non-root user)

Security features:
- Runs as non-root user (nginx user)
- Uses port 8080 (non-privileged port)
- Includes health checks
- Resource limits defined

## Nginx Configuration

The included `nginx.conf` provides:
- SPA routing support (all routes redirect to index.html)
- Health check endpoint at `/health`
- Asset caching (1 year for /assets/)
- Gzip compression for better performance
- Runs on port 8080 for non-root operation
