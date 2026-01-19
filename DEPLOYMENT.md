# Deployment Guide

## Docker Deployment

### Building the Docker Image

```bash
docker build -t cloudforge-academy .
```

### Running with Docker

```bash
docker run -p 3000:80 cloudforge-academy
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

### Environment Variables

Make sure to set your environment variables before building:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

You can pass them during build:
```bash
docker build --build-arg VITE_SUPABASE_URL=your_url --build-arg VITE_SUPABASE_ANON_KEY=your_key -t cloudforge-academy .
```

Or mount a `.env` file at runtime (though it's better to bake them into the build).

## Production Build

The project uses a multi-stage Docker build:
1. **Build stage**: Installs dependencies and builds the Vite app
2. **Production stage**: Serves the static files with Nginx

This results in a small, efficient production image.

## Nginx Configuration

The included `nginx.conf` provides:
- SPA routing support (all routes redirect to index.html)
- Asset caching (1 year for /assets/)
- Gzip compression for better performance
