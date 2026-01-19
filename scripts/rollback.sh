#!/bin/bash

set -e

echo "======================================"
echo "DevOps Learning Platform Rollback"
echo "======================================"

NAMESPACE="devops-learning"
DEPLOYMENT="devops-learning-app"

echo "Checking rollout history..."
kubectl rollout history deployment/$DEPLOYMENT -n $NAMESPACE

echo ""
echo "Rolling back to previous version..."
kubectl rollout undo deployment/$DEPLOYMENT -n $NAMESPACE

echo ""
echo "Waiting for rollback to complete..."
kubectl rollout status deployment/$DEPLOYMENT -n $NAMESPACE --timeout=5m

echo ""
echo "Verifying rollback..."
kubectl get pods -n $NAMESPACE

echo ""
echo "======================================"
echo "Rollback completed successfully!"
echo "======================================"
