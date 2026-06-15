# CMS_DEPLOY.md — Content Portal, Firebase Hosting & CI/CD

---

## OVERVIEW: HOW IT ALL CONNECTS

```
Client edits content in Sanity Studio
          ↓
      Clicks "Publish"
          ↓
  Sanity fires a webhook
          ↓
  GitHub receives webhook
          ↓
  GitHub Actions runs:
    npm run build (Next.js)
    firebase deploy
          ↓
  Live website updates
  (takes ~2–3 minutes)
```

**Cost: $0.** All tools are on free tiers.

---

## PART 1: SANITY CMS SETUP (CLIENT CONTENT PORTAL)

### What Sanity Gives the Client
- A beautiful web-based editor at `studio.divyotsav.com` (hosted free by Sanity)
- They can edit taglines, images, testimonials, service prices, gallery — without touching code
- Changes go live automatically in ~2 minutes (via GitHub Actions)

### Step 1 — Create Sanity Account
1. Go to sanity.io → "Start for free"
2. Create new project → name: "Divyotsav"
3. Dataset: `production`
4. Template: "Clean project"
5. Save your **Project ID** and **Dataset name**

### Step 2 — Install Sanity in Project
```bash
npm create next-app@latest divyotsav --typescript --tailwind --app
cd divyotsav
npm install next-sanity @sanity/image-url @sanity/vision
npx sanity@latest init --env
```

### Step 3 — Add to next.config.ts
```typescript
// Point Next.js to Sanity's image CDN
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' }
  ]
}
```

### Step 4 — Sanity Studio URL (client portal)
After `npx sanity deploy`, the studio is live at:
```
https://divyotsav.sanity.studio
```
Share this URL with the client. They log in with the Google/email you set up for them.

### Step 5 — What the Client Can Edit
Using the schemas from TECH.md, the client gets fields to update:
| What | Where in Studio |
|------|----------------|
| Hero taglines | Site Settings → Tagline |
| Hero video | Site Settings → Hero Video |
| Social links (Instagram, WhatsApp, Facebook, Email) | Site Settings |
| Service prices, descriptions | Services → [click service] |
| Testimonials | Testimonials → add / edit |
| Gallery images | Gallery Items → upload |
| Contact details | Site Settings → Contact |

---

## PART 2: FIREBASE HOSTING SETUP (FREE)

### Free Tier Limits (more than enough)
- 10 GB storage
- 360 MB/day data transfer
- Custom domain: free
- SSL: automatic & free
- Global CDN: included

### Step 1 — Firebase Project
1. Go to firebase.google.com → "Add project"
2. Name: `divyotsav-web`
3. Disable Google Analytics (not needed)
4. Go to "Hosting" in sidebar → "Get started"

### Step 2 — Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```
Select:
- Use existing project → `divyotsav-web`
- Public directory: `out` (Next.js static export)
- Configure as single-page app: **No** (Next.js handles routing)
- GitHub Actions: **Yes**

### Step 3 — Next.js Static Export
In `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }
}
```
> Note: With static export, use Sanity CDN for all images — next/image optimization works via Sanity's CDN, not Next.js server.

### Step 4 — Custom Domain
1. Firebase Hosting → "Add custom domain"
2. Enter `divyotsav.com`
3. Add the DNS records Firebase gives you to your domain registrar
4. SSL certificate is issued automatically

---

## PART 3: GITHUB ACTIONS CI/CD PIPELINE

### How it works
Every time the client publishes content in Sanity → Sanity webhook → GitHub → auto-deploy.

### Step 1 — Firebase Service Account
1. Firebase Console → Project Settings → Service Accounts
2. "Generate new private key" → download JSON
3. Go to GitHub repo → Settings → Secrets → Actions
4. Add secret: `FIREBASE_SERVICE_ACCOUNT` → paste JSON content

### Step 2 — Sanity Token
1. Sanity project → API → Tokens → "Add API Token"
2. Name: "GitHub Actions Read"
3. Permissions: Viewer
4. Copy token
5. Add to GitHub Secrets as `SANITY_API_TOKEN`

### Step 3 — GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Divyotsav

on:
  push:
    branches: [main]
  repository_dispatch:
    types: [sanity-webhook]      # triggered by Sanity

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: production
          SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: divyotsav-web
```

### Step 4 — Sanity Webhook (connects Sanity → GitHub)
1. Sanity project → API → Webhooks → "Create webhook"
2. Name: "Deploy on Publish"
3. URL: `https://api.github.com/repos/[YOUR_USERNAME]/divyotsav/dispatches`
4. Trigger on: **Publish**
5. HTTP Method: POST
6. Headers:
   ```
   Authorization: token [YOUR_GITHUB_PERSONAL_ACCESS_TOKEN]
   Accept: application/vnd.github.v3+json
   Content-Type: application/json
   ```
7. Body:
   ```json
   { "event_type": "sanity-webhook" }
   ```

> GitHub Personal Access Token: github.com → Settings → Developer settings → Personal access tokens → Generate. Scope: `repo`.

---

## PART 4: ENVIRONMENT VARIABLES

Create `.env.local` (never commit this file):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
WEB3FORMS_ACCESS_KEY=your_key
```

Add each of these as GitHub Secrets too (so Actions can build).

---

## PART 5: SANITY STUDIO SEPARATE DOMAIN (OPTIONAL)

If you want the client to access the studio at `studio.divyotsav.com` instead of `divyotsav.sanity.studio`:

```bash
npx sanity deploy
```
Sanity hosts it for free at `divyotsav.sanity.studio`.

Alternatively, embed the Studio inside the Next.js app at `/studio` route — still free, same Firebase hosting.

---

## QUICK REFERENCE: DEPLOYMENT STEPS ORDER

```
1. Create Sanity project → get Project ID
2. Create Firebase project → get Service Account
3. Create GitHub repo → add secrets
4. Build locally: npm run build → verify no errors
5. firebase deploy (first manual deploy)
6. Add Sanity webhook → test by publishing content
7. Add custom domain in Firebase
8. Share studio URL with client
```
