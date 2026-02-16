#!/bin/bash

set -e

echo "======================================"
echo "DevOps Learning Platform Deployment"
echo "======================================"

ENVIRONMENT=${1:-production}
NAMESPACE="dev"

echo "Environment: $ENVIRONMENT"
echo "Namespace: $NAMESPACE"

if [ "$ENVIRONMENT" = "production" ]; then
    DOMAIN="devops-learning.example.com"
elif [ "$ENVIRONMENT" = "staging" ]; then
    DOMAIN="staging.devops-learning.example.com"
else
    echo "Invalid environment. Use 'production' or 'staging'"
    exit 1
fi

echo "Domain: $DOMAIN"
echo ""

echo "Step 1: Building Docker image..."
docker build -t ghcr.io/luniemma/devops-learning-platform:latest .

echo ""
echo "Step 2: Pushing to container registry..."
docker push ghcr.io/luniemma/devops-learning-platform:latest

echo ""
echo "Step 3: Deploying to Kubernetes..."
kubectl apply -k k8s/

echo ""
echo "Step 4: Waiting for deployment to be ready..."
kubectl rollout status deployment/devops-learning-app -n $NAMESPACE --timeout=5m

echo ""
echo "Step 5: Verifying deployment..."
kubectl get pods -n $NAMESPACE
kubectl get services -n $NAMESPACE
kubectl get ingress -n $NAMESPACE

echo ""
echo "======================================"
echo "Deployment completed successfully!"
echo "======================================"
echo "Application URL: https://$DOMAIN"
echo ""
