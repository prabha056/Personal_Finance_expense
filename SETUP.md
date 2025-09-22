# Personal Finance App Setup Guide

## Quick Fix for "Works on my device but not others" Issue

### Problem Summary
Your app works on your device but not on other devices due to:
1. Hardcoded localhost URLs
2. CORS restrictions
3. Missing environment configuration
4. Network access limitations

### Immediate Solutions Applied

#### 1. Fixed CORS Configuration
- Updated server to accept requests from any origin in development
- Added proper CORS headers for production deployment

#### 2. Fixed Backend URL
- Changed from `localhost:8080` to `localhost:5000` (correct port)
- Added environment variable support

#### 3. Added Network Access
- Configured Vite to accept external connections (`0.0.0.0`)
- Updated server CORS to handle different origins

### Setup Instructions

#### For Development (Local Network Access)

1. **Start the Backend Server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Access from Other Devices:**
   - Find your computer's IP address:
     - Windows: `ipconfig`
     - Mac/Linux: `ifconfig`
   - Access the app from other devices using: `http://YOUR_IP_ADDRESS:5173`

#### For Production Deployment

1. **Create Environment Files:**

   **Server (.env):**
   ```env
   PORT=5000
   NODE_ENV=production
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-frontend-domain.com
   ```

   **Client (.env):**
   ```env
   VITE_BACKEND_URL=https://your-backend-domain.com
   ```

2. **Deploy Backend:**
   - Deploy to Vercel, Heroku, or your preferred platform
   - Update CORS origins in server/index.js with your production domains

3. **Deploy Frontend:**
   - Deploy to Vercel, Netlify, or your preferred platform
   - Set environment variables in your deployment platform

### Testing the Fix

1. **Local Network Test:**
   - Start both servers
   - Access from another device on the same network
   - Check browser console for any errors

2. **Production Test:**
   - Deploy both frontend and backend
   - Test from different devices and networks
   - Verify all functionality works

### Common Issues and Solutions

#### Issue: "Cannot connect to server"
- **Solution:** Check if backend is running on correct port
- **Solution:** Verify firewall settings allow connections

#### Issue: "CORS error"
- **Solution:** Update CORS origins in server/index.js
- **Solution:** Check if frontend URL is in allowed origins

#### Issue: "Network Error"
- **Solution:** Ensure both devices are on same network
- **Solution:** Check if ports are accessible

### Environment Variables Reference

#### Server (.env)
```
PORT=5000                          # Server port
NODE_ENV=development               # Environment mode
MONGO_URI=mongodb://localhost:27017/personal-finance-manager  # Database URL
JWT_SECRET=your-secret-key        # JWT signing secret
FRONTEND_URL=http://localhost:5173 # Frontend URL for CORS
CLIENT_URL=http://localhost:3000   # Alternative frontend URL
```

#### Client (.env)
```
VITE_BACKEND_URL=http://localhost:5000  # Backend API URL
```

### Deployment Platforms

#### Vercel (Recommended)
- **Backend:** Connect GitHub repo, set build command: `npm install && npm start`
- **Frontend:** Connect GitHub repo, set build command: `npm install && npm run build`

#### Heroku
- **Backend:** Add Procfile: `web: npm start`
- **Frontend:** Use static buildpacks

### Security Notes
- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Configure proper CORS origins for production

### Troubleshooting

1. **Check Console Logs:**
   - Open browser developer tools
   - Look for network errors or CORS issues
   - Check server logs for errors

2. **Test API Endpoints:**
   - Test backend directly: `http://your-server:5000/api/test`
   - Verify database connection

3. **Network Connectivity:**
   - Ensure devices are on same network
   - Check firewall settings
   - Verify port accessibility

### Support
If you continue to have issues:
1. Check browser console for specific error messages
2. Verify all environment variables are set correctly
3. Test API endpoints independently
4. Check network connectivity between devices
