#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is not installed. Please install it first."
        exit 1
    fi
}

# Function to check if a command succeeded
check_status() {
    if [ $? -ne 0 ]; then
        print_error "Command failed: $1"
        exit 1
    fi
}

# Check required commands
print_status "Checking required commands..."
check_command docker
check_command docker-compose
check_command kubectl
check_command pnpm
check_command minikube

# Start Minikube with Docker driver if not running
print_status "Checking Minikube status..."
if ! minikube status | grep -q "Running"; then
    print_status "Starting Minikube with Docker driver..."
    minikube start --driver=docker
    check_status "minikube start"
else
    print_status "Minikube is already running"
fi

# Point shell to minikube's docker-daemon
print_status "Configuring Docker to use Minikube's daemon..."
eval $(minikube docker-env)
check_status "minikube docker-env"

# Build Docker images
print_status "Building Docker images..."
docker-compose build
check_status "docker-compose build"

# Create Kubernetes namespace
print_status "Creating Kubernetes namespace..."
kubectl apply -f k8s/namespace.yaml
check_status "kubectl apply namespace"

# Create ConfigMap for environment variables
print_status "Creating ConfigMap..."
kubectl create configmap nowoptics-config \
    --from-literal=NODE_ENV=production \
    --from-literal=NEXT_PUBLIC_APP_HOST=http://host.nowoptics.com \
    --from-literal=NEXT_PUBLIC_APP_HOME=http://home.nowoptics.com \
    -n nowoptics \
    --dry-run=client -o yaml | kubectl apply -f -
check_status "kubectl create configmap"

# Apply Kubernetes deployments
print_status "Applying Kubernetes deployments..."
kubectl apply -f k8s/host-deployment.yaml
check_status "kubectl apply host deployment"
kubectl apply -f k8s/home-deployment.yaml
check_status "kubectl apply home deployment"
kubectl apply -f k8s/intake-deployment.yaml
check_status "kubectl apply intake deployment"

# Apply Ingress configuration
print_status "Applying Ingress configuration..."
kubectl apply -f k8s/ingress.yaml
check_status "kubectl apply ingress"

# Enable ingress addon in Minikube
print_status "Enabling ingress addon in Minikube..."
minikube addons enable ingress
check_status "minikube addons enable ingress"

# Wait for deployments to be ready
print_status "Waiting for deployments to be ready..."
kubectl rollout status deployment/host -n nowoptics
check_status "host deployment rollout"
kubectl rollout status deployment/home -n nowoptics
check_status "home deployment rollout"
kubectl rollout status deployment/intake -n nowoptics
check_status "intake deployment rollout"

# Get Minikube IP
MINIKUBE_IP=$(minikube ip)
check_status "minikube ip"

# Print service URLs
print_status "Deployment completed! Services are available at:"
echo -e "${GREEN}Host:${NC} http://host.nowoptics.com (Add to /etc/hosts: ${MINIKUBE_IP} host.nowoptics.com)"
echo -e "${GREEN}Home:${NC} http://home.nowoptics.com (Add to /etc/hosts: ${MINIKUBE_IP} home.nowoptics.com)"
echo -e "${GREEN}Intake:${NC} http://intake.nowoptics.com (Add to /etc/hosts: ${MINIKUBE_IP} intake.nowoptics.com)"

# Print pod status
print_status "Pod status:"
kubectl get pods -n nowoptics

# Print service status
print_status "Service status:"
kubectl get services -n nowoptics

# Print ingress status
print_status "Ingress status:"
kubectl get ingress -n nowoptics

# Print instructions for accessing services
print_status "\nTo access the services, add these entries to your /etc/hosts file:"
echo -e "${YELLOW}sudo sh -c 'echo \"${MINIKUBE_IP} host.nowoptics.com\" >> /etc/hosts'"
echo -e "sudo sh -c 'echo \"${MINIKUBE_IP} home.nowoptics.com\" >> /etc/hosts'"
echo -e "sudo sh -c 'echo \"${MINIKUBE_IP} intake.nowoptics.com\" >> /etc/hosts'${NC}"

# Print dashboard URL
print_status "\nTo access the Kubernetes dashboard, run:"
echo -e "${YELLOW}minikube dashboard${NC}" 