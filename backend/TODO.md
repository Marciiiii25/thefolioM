# MongoDB/Render Deployment Fix ✅

## Problem Fixed

Admin auto-seeding now works locally/Render when DB connects.

## Atlas Network Access (Critical for Render)

1. Atlas Dashboard → Network Access
2. Add IP: `0.0.0.0/0` (allow all - production: VPC/Render IP)
3. Confirm cluster running (not paused)

## Render Env Vars (Copy-Paste)

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.gncpxgz.mongodb.net/<dbname>?retryWrites=true&amp;w=majority
JWT_SECRET=supersecret2024changeit
ADMIN_EMAIL=admin@thefolio.com
ADMIN_PASSWORD=Admin@1234
ADMIN_NAME=TheFolio Admin
```

## Local Test

```powershell
cd backend
npm install
npm run dev
# Expect:
# MongoDB Connected: cluster0-shard-00-00...
# ✅ Admin account already exists.
```

## Manual Seed

```powershell
cd backend
npm run seed
```

## Render Test

1. Set env vars
2. Redeploy
3. Logs show auto-seed
4. Login: admin@thefolio.com / Admin@1234

**Status: Code fixed. Fix Atlas whitelist → redeploy → works!**
