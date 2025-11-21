# 📱 My Simple Web App – PWA + Mobile Testing Guide

This project is a **very simple Next.js web app** upgraded into a **Progressive Web App (PWA)** that can be installed on mobile devices (Android/iOS) and behaves like a native application.  
We also use **ngrok** to test the PWA on a real phone over HTTPS.

---

## 🚀 Features

- Simple Next.js web page
- Fully functional **Progressive Web App (PWA)**
- Custom `manifest.webmanifest`
- Custom service worker (`sw.js`)
- App is installable on mobile (Android & iOS)
- Secure mobile testing using **ngrok**
- Works in standalone mode (full-screen, native-app feel)

---

# 📦 Project Structure

```
app/
  page.tsx
  layout.tsx
  register-sw.tsx
public/
  icons/
    icon-192x192.png
    icon-512x512.png
  manifest.webmanifest
sw.js
```

---

# 📱 1. Simple Web App

The base UI is defined in:

```
app/page.tsx
```

Example:

```tsx
export default function Home() {
  return (
    <main>
      <h1>My Simple Web App</h1>
      <p>We'll turn this into a PWA next 🚀</p>
    </main>
  );
}
```

This is a minimal, clean page that we later extended into a PWA.

---

# 🔧 2. Turning it into a PWA

### ✔ Manifest file (`public/manifest.webmanifest`)

This describes the app metadata:

```json
{
  "name": "My Simple Web App",
  "short_name": "MyApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Role of the manifest:**
- Defines the home screen icon
- Controls how the app launches (standalone, fullscreen…)
- Enables “Add to Home Screen” / “Install App”

---

### ✔ Service Worker (`/sw.js`)

The service worker is required for PWA installability:

```js
self.addEventListener("install", () => {
  console.log("Service worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service worker activated");
});
```

This version is minimal but enough to meet PWA install requirements.

---

### ✔ Registering the service worker (`app/register-sw.tsx`)

```tsx
"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return null;
}
```

Included in the layout:

```tsx
<RegisterSW />
```

---

# 📲 3. Test PWA on Mobile Using Ngrok

PWAs **require HTTPS** to show the install prompt.  
Localhost is HTTPS-exempt, but mobile devices require a secure URL.

## Step 1 — Install ngrok (Windows)

Download ngrok and store it in:

```
C:\ngrok\ngrok.exe
```

Add your authtoken once:

```bash
ngrok config add-authtoken <YOUR_TOKEN>
```

---

## Step 2 — Run your Next.js app

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Step 3 — Expose it with HTTPS using ngrok

From inside `C:\ngrok`:

```bash
.\ngrok.exe http 3000
```

You will see:

```
Forwarding  https://random-id.ngrok-free.dev -> http://localhost:3000
```

This **HTTPS ngrok link** is what you open on your mobile device.

---

## Step 4 — Install PWA on Mobile

### Android (Chrome)
- Open the ngrok URL in Chrome  
- Tap **⋮ menu → Install App** or **Add to Home Screen**

### iOS (Safari)
- Open the URL  
- Tap **Share → Add to Home Screen**

---

# 🎉 Result: Installed PWA

Once installed:
- It launches in standalone mode
- Has its own icon
- Behaves like a native app
- Can be updated through service worker logic

You successfully created your **first PWA with mobile installation support**.

---

# 🛠 Next Improvements (Optional)

You can now extend this project with:

- Offline caching via Workbox
- Background sync
- Push notifications
- App updates & versioning
- Better Lighthouse PWA score
- Publishing your PWA on Vercel

---

