# PWA Installation Guide

## What is a PWA?

A **Progressive Web App (PWA)** is a website that can be installed on your device like a native app. Once installed, HP2 Game Tracker:

- 🚀 **Launches faster** from your home screen
- 📱 **Feels like a native app** (no browser UI)
- 🔲 **Supports fullscreen mode** (hides address bar)
- 📶 **Works offline** (once loaded)
- 🎯 **Perfect for rinkside tracking** (no distractions)

---

## Installation Instructions

### iOS (iPhone/iPad)

1. **Open Safari** and navigate to the game tracking page:
   ```
   https://your-app.com/demo/game-tracking
   ```

2. **Tap the Share button** (square with arrow pointing up) at the bottom of the screen:
   <img src="../images/ios-share-button.png" alt="iOS Share Button" width="300"/>

3. **Scroll down** in the share menu

4. **Tap "Add to Home Screen"**:
   <img src="../images/ios-add-to-home.png" alt="Add to Home Screen" width="300"/>

5. **Customize the name** (optional) and tap **"Add"**

6. **Find the icon** on your home screen:
   - Blue background with 🏒 hockey stick
   - Name: "HP2 Tracker"

7. **Launch from home screen** for fullscreen experience!

#### iOS Features
- ✅ Fullscreen mode (no Safari UI)
- ✅ Landscape orientation (auto-rotates)
- ✅ Standalone app experience
- ✅ Faster loading

---

### Android (Chrome)

1. **Open Chrome** and navigate to the game tracking page:
   ```
   https://your-app.com/demo/game-tracking
   ```

2. **Tap the menu button** (three vertical dots) in the top-right corner

3. **Look for one of these options**:
   - "Install App"
   - "Add to Home Screen"
   - "Install HP2 Tracker"

4. **Tap Install/Add**

5. **Confirm** in the popup dialog

6. **Find the icon** on your home screen or app drawer

7. **Launch** and enjoy fullscreen mode!

#### Android Features
- ✅ Native install prompt (after 2-3 visits)
- ✅ Fullscreen button (⬆️) in the app
- ✅ Add to home screen from menu
- ✅ App drawer integration

---

### Desktop (Chrome, Edge, Brave)

1. **Open browser** and navigate to the game tracking page

2. **Look for install icon** in the address bar (usually on the right):
   - Chrome: ⊕ icon or computer monitor icon
   - Edge: ⊕ icon
   - Brave: ⊕ icon

3. **Click the install icon**

4. **Click "Install"** in the popup

5. **Launch** from:
   - Desktop shortcut
   - Start menu (Windows)
   - Applications folder (Mac)
   - Browser bookmarks bar

#### Desktop Features
- ✅ Standalone window (no browser tabs)
- ✅ Dock/taskbar icon
- ✅ Keyboard shortcuts
- ✅ Desktop notifications (future)

---

## Benefits of Installing

### For Coaches
- **Faster Access**: One tap from home screen vs opening browser + navigating
- **Fullscreen**: Maximum screen space for tracking (no address bar clutter)
- **Focus Mode**: Feels like a dedicated tracking app
- **Offline Ready**: Works even with spotty rink WiFi (after first load)
- **Professional**: Looks like you're using a pro coaching tool

### Technical Benefits
- **Performance**: Instant loading, cached resources
- **Reliability**: Service workers handle offline scenarios
- **Updates**: Auto-updates when you launch (no app store)
- **Cross-Platform**: Same app on iOS, Android, and desktop

---

## Troubleshooting

### "Add to Home Screen" option missing (iOS)
- **Make sure you're using Safari** (not Chrome or Firefox)
- **Check iOS version**: iOS 11.3+ required
- **Try closing/reopening Safari** and visiting the page again

### "Install App" option missing (Android)
- **Use Chrome**: Other browsers may not support PWA install
- **Visit page 2-3 times**: Chrome may wait before showing prompt
- **Check for banner**: Look for install banner at bottom of screen
- **Use menu**: Three dots → "Add to Home Screen"

### Fullscreen button not showing (iOS in browser)
- **This is expected**: iOS Safari doesn't support fullscreen API in browser
- **Solution**: Install as PWA (steps above) for fullscreen support
- **Alternative**: Scroll down to hide address bar

### Fullscreen button not showing (Android)
- **Check browser**: Must be Chrome, Edge, or other Chromium browser
- **Outdated browser**: Update to latest version
- **Private mode**: Fullscreen may not work in incognito mode

### App not updating
- **Close completely**: Swipe up to close app (don't just minimize)
- **Relaunch**: Next launch will check for updates
- **Clear cache**: Delete app and reinstall if stuck on old version

---

## Uninstalling

### iOS
1. **Press and hold** the app icon on home screen
2. **Tap "Remove App"**
3. **Select "Delete App"**
4. **Confirm deletion**

### Android
1. **Press and hold** the app icon
2. **Drag to "Uninstall"** at top of screen
3. Or: Settings → Apps → HP2 Tracker → Uninstall

### Desktop
- **Windows**: Right-click icon → Uninstall
- **Mac**: Delete from Applications folder
- **Linux**: Right-click icon → Remove

---

## Privacy & Data

### What's Stored Locally?
- **Game events**: Cached for offline access
- **Player roster**: Your team's players
- **Login session**: Keeps you signed in
- **App resources**: HTML, CSS, JavaScript files

### What's Stored in Cloud?
- **Game data**: Synced to Supabase database
- **Analytics**: Post-game statistics
- **Practice plans**: AI-generated and manual plans

### Data Usage
- **First load**: ~2-5 MB (downloads app resources)
- **Updates**: ~100-500 KB (only changed files)
- **Syncing**: Minimal (only event data as you track)
- **Offline**: 0 bytes (works from cache)

---

## Advanced: Manifest Details

The PWA is configured with:

```json
{
  "name": "Hockey Practice Planner - Game Tracker",
  "short_name": "HP2 Tracker",
  "start_url": "/demo/game-tracking",
  "display": "standalone",
  "orientation": "landscape",
  "background_color": "#1e40af",
  "theme_color": "#1e40af",
  "icons": [
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

**Key Settings**:
- **Display**: Standalone (no browser UI)
- **Orientation**: Landscape (optimized for tablets/phones in landscape)
- **Theme**: Blue (#1e40af) matches app branding

---

## Support

### Need Help?
- 📧 Email: support@hp2tracker.com
- 🐛 Report bug: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discord: [Community Server](https://discord.gg/your-server)
- 📖 Docs: [Full Documentation](https://docs.hp2tracker.com)

### Feedback
We'd love to hear about your PWA experience!
- Does the install process work smoothly?
- Is fullscreen mode useful during games?
- Any issues or suggestions?

---

**Last Updated**: October 31, 2025
**Compatibility**: iOS 11.3+, Android 5+, Chrome 67+, Edge 79+, Safari 11.3+
