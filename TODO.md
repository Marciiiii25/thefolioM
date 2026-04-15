# Deployment Fix: Admin Login on Render

## Current Status

✅ Plan approved  
🔄 Creating TODO.md and implementing auto-seeding...

## Step-by-Step Plan

### 1. Set Render Environment Variables (Manual - Do This First)

In your Render Dashboard → Your Backend Service → Environment:

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/yourdbname
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@thefolio.com
ADMIN_PASSWORD=Admin@1234
ADMIN_NAME=TheFolio Admin
```

**Get MONGO_URI:**

- MongoDB Atlas: Connect → Drivers → Copy connection string
- Render PostgreSQL? → No, need MongoDB. Create Atlas cluster (free tier)

### 2. Backend Changes (Auto-Implemented)

- ✅ `backend/server.js`: Added auto-seeding on startup (checks if admin exists → seeds if missing)
- ✅ `backend/package.json`: Added `seed` script for manual run

### 3. Deploy & Test

```
# Redeploy backend on Render (auto-triggers server.js → seeds admin)
# Test login: admin@thefolio.com / Admin@1234
```

### 4. Frontend API URL (if separate services)

- Update `frontend/src/api/axios.js` REACT_APP_API_URL=your-render-backend-url/api

### 5. Manual Seed (Alternative/Verification)

```
# Render Shell: cd backend && npm install && npm run seed
```

## Expected Result

- Server starts → DB connects → Admin auto-created → Login works on deploy!

## Next Steps After This

- [ ] Confirm Render URLs/services
- [ ] Set env vars & redeploy
- [ ] Test admin login
- [ ] Update frontend API baseURL if needed
