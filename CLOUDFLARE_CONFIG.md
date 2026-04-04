# Cloudflare Pages Configuration

This file helps configure Cloudflare Pages for automatic deployment.

## Option 1: Cloudflare Pages + Git Integration (Recommended)

No configuration file needed! Cloudflare Pages automatically detects and configures from `wrangler.toml`.

### Setup Steps:

1. **Connect your GitHub repo to Cloudflare Pages:**
   - Go to https://dash.cloudflare.com/
   - Select "Pages" → "Create a project"
   - Click "Connect to Git"
   - Authorize GitHub and select your repo

2. **Configure build settings:**
   - Framework: `None` (Static site)
   - Build command: `npm install`
   - Build output directory: `public`
   - Environment variables:
     - `ENVIRONMENT` = `production`

3. **Add Secrets (if using GitHub Actions):**
   - Go to your repo → Settings → Secrets → Actions
   - Add `CLOUDFLARE_API_TOKEN`
   - Add `CLOUDFLARE_ACCOUNT_ID`

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   Cloudflare will automatically deploy!

## Option 2: Direct Deployment with Wrangler

Deploy directly without GitHub:

```bash
npm install -g wrangler
wrangler login
wrangler kv:namespace create "RECIPES"
wrangler kv:namespace create "RECIPES" --preview
npm run deploy
```

## Environment Variables

Set these in Cloudflare Dashboard or GitHub Secrets:

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token (Settings → API Tokens)
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare Account ID (Settings → Accounts)
- `ENVIRONMENT` - Set to `production` in production environment

## How to Get Your IDs

### Cloudflare Account ID:
```bash
wrangler whoami
```

### Cloudflare API Token:
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Select "Edit Cloudflare Workers" template
4. Grant permissions for KV and Workers
5. Copy the token

### KV Namespace IDs:
```bash
wrangler kv:namespace list
```

These are used internally by Cloudflare - you don't commit them to Git!
