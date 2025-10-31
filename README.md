# n8n Workflow Monitor - Cyberpunk Dashboard

A real-time monitoring dashboard for n8n workflows with a stunning cyberpunk aesthetic.

## Features

- 📊 Real-time workflow monitoring
- 🔄 Auto-refresh every 5-10 seconds
- 📈 Live execution history
- 🎨 Cyberpunk-themed UI
- 📱 Fully responsive design
- ⚡ Built with React, TypeScript, and Tailwind CSS

## Project info

**URL**: https://lovable.dev/projects/427ae7f1-b491-4958-8814-3c6bbde15fdb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/427ae7f1-b491-4958-8814-3c6bbde15fdb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Configuration

Before deploying, update the n8n instance IP address in `src/config/n8n.ts`:

```typescript
export const N8N_CONFIG = {
  baseUrl: 'http://10.43.58.226:5678',  // Update this to your n8n instance
  apiPath: '/api/v1',
};
```

### n8n API Configuration

Ensure your n8n instance allows API access:

1. **Enable CORS** in n8n configuration
2. **Generate API Key** in n8n Settings → API
3. **Update the dashboard** to include authentication if needed

## Deployment Options

### Option 1: Deploy via Lovable (Easiest)

1. Open [Lovable](https://lovable.dev/projects/427ae7f1-b491-4958-8814-3c6bbde15fdb)
2. Click **Publish** button (top right)
3. Your dashboard will be live at `yoursite.lovable.app`

**Custom Domain:**
- Navigate to Project > Settings > Domains
- Click Connect Domain
- Follow the DNS configuration steps
- [Learn more](https://docs.lovable.dev/features/custom-domain#custom-domain)

### Option 2: Deploy with Docker

```bash
# Build the Docker image
docker build -t nexus-aura-watch:latest .

# Run the container (maps host port 3000 to container port 8080)
docker run -d -p 3000:8080 nexus-aura-watch:latest

# Or use port 8080 on host as well
docker run -d -p 8080:8080 nexus-aura-watch:latest
```

Access the dashboard at `http://localhost:3000` (or `http://localhost:8080` if using second command)

### Option 3: Deploy to Kubernetes

```bash
# Apply the Kubernetes deployment
kubectl apply -f k8s-deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services

# Access via NodePort (default: 30080)
# Or configure an Ingress for production
```

### Option 4: Deploy to Static Hosting

Build the project and deploy to any static hosting service:

```bash
# Build for production
npm run build

# The 'dist' folder contains your static files
# Upload to: Vercel, Netlify, GitHub Pages, AWS S3, etc.
```

**Popular Hosting Services:**

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Push `dist` to `gh-pages` branch
- **AWS S3**: Upload `dist` to S3 bucket + CloudFront

## Deployment Steps (Kubernetes)

### Prerequisites
- Kubernetes cluster running
- kubectl configured
- n8n instance accessible at configured IP

### Step-by-Step Deployment

1. **Clone the repository**
   ```bash
   git clone https://github.com/joinnetwork2024/n8n-start.git
   cd n8n-start
   ```

2. **Update n8n configuration**
   ```bash
   # Edit src/config/n8n.ts with your n8n IP
   nano src/config/n8n.ts
   ```

3. **Build Docker image (IMPORTANT: Use the correct Dockerfile)**
   ```bash
   # Build with the multi-stage Dockerfile (uses Nginx, not npm)
   docker build -t nexus-aura-watch:latest .
   
   # Verify the build succeeded
   docker images | grep nexus-aura-watch
   ```

4. **Test locally first (recommended)**
   ```bash
   # Test the image locally before deploying to Kubernetes
   docker run -d -p 3000:8080 nexus-aura-watch:latest
   
   # Check if it's working
   curl http://localhost:3000
   
   # Stop the test container
   docker stop $(docker ps -q --filter ancestor=nexus-aura-watch:latest)
   ```

5. **Push to registry (REQUIRED for Kubernetes)**
   ```bash
   # Tag with your registry
   docker tag nexus-aura-watch:latest your-registry/nexus-aura-watch:latest
   
   # Push to registry
   docker push your-registry/nexus-aura-watch:latest
   ```

6. **Update Kubernetes manifest**
   ```bash
   # Edit k8s-deployment.yaml line 26 with your image registry
   # Change: image: nexus-aura-watch:latest
   # To: image: your-registry/nexus-aura-watch:latest
   nano k8s-deployment.yaml
   ```

7. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f k8s-deployment.yaml
   ```

7. **Verify deployment**
   ```bash
   kubectl get pods -n default
   kubectl get svc -n default
   ```

8. **Access the dashboard**
   ```bash
   # Get the service URL
   kubectl get svc n8n-monitor-service
   
   # Access via NodePort: http://<node-ip>:30080
   # Or configure Ingress for production access
   ```

## Environment Variables

No environment variables required for basic setup. All configuration is in `src/config/n8n.ts`.

For production, consider adding:
- `N8N_API_KEY` - n8n API authentication key
- `N8N_BASE_URL` - n8n instance URL

## Monitoring & Troubleshooting

### Check n8n connectivity
```bash
curl http://10.43.58.226:5678/api/v1/workflows
```

### View application logs
```bash
# Docker
docker logs <container-id>

# Kubernetes
kubectl logs -f deployment/n8n-monitor
```

### Common Issues

1. **CORS errors**: Enable CORS in n8n settings
2. **Connection refused**: Check n8n is running and accessible
3. **Empty dashboard**: Verify n8n API endpoint and permissions
