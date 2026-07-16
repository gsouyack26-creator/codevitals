# CodeVitals — Medical Coding Exam Prep

A single-file, offline-friendly study app for medical-coding certification prep
(CPC / CCS style): 16 modules, 300+ practice questions, 9 exams incl. a 150-Q mock,
flashcards, glossary, boss battles, adaptive practice, chart simulator, analytics,
6 themes (incl. lavender), and **cross-device Cloud Sync**.

---

## 1) Put it online (GitHub Pages) — ~3 minutes

1. Go to <https://github.com/new> and create a repo, e.g. **`codevitals`** (Public is fine).
2. On the repo page click **Add file ▸ Upload files**, drag in **`index.html`** and **`.nojekyll`** from this folder, then **Commit changes**.
3. Go to **Settings ▸ Pages**. Under *Build and deployment* set **Source = Deploy from a branch**, **Branch = `main` / `(root)`**, click **Save**.
4. Wait ~1 minute. Your app is now live at:

   `https://YOUR-USERNAME.github.io/codevitals/`

5. Open that link on her **phone / tablet / laptop**. On the phone tap the browser menu ▸ **Add to Home Screen** — it installs like a real app (the "Install as app" button in Settings does the same on desktop).

> The app works even without the cloud step below — each device just keeps its own local progress.

---

## 2) Make progress follow her across devices (Cloud Sync) — one-time ~5 min

Progress is normally saved only in the browser it was made in. To share it across her
phone, tablet, and laptop, the app can stash it in a tiny free Firebase database.
**You only do this setup once.** After that, she just types a Sync Code on each device.

### A. Create a free Firebase project
1. Go to <https://console.firebase.google.com> and sign in with any Google account.
2. **Add project** ▸ give it a name (e.g. `codevitals`) ▸ you can turn Google Analytics **off** ▸ **Create project**.
3. In the left menu open **Build ▸ Firestore Database ▸ Create database**.
   - Choose **Start in test mode** ▸ pick a location ▸ **Enable**.
   - (Test mode is fine to start. For a permanent setup, see *Rules* below.)
4. Get your keys: click the **gear ⚙ ▸ Project settings**. Scroll to **Your apps**, click the **`</>` (Web)** icon, register an app (any nickname, **no** hosting needed). You'll see a `firebaseConfig` block like:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSyD...................",
     projectId: "codevitals-abc12",
     ...
   };
   ```
   You only need **`apiKey`** and **`projectId`**.

### B. Paste the two keys into the app
1. Open **`index.html`** in a text editor (Notepad is fine).
2. Press Ctrl+F and search for: `const FIREBASE=`
3. Fill in the two values:

   ```js
   const FIREBASE={ projectId:"codevitals-abc12", apiKey:"AIzaSyD..................." };
   ```
4. Save, then re-upload `index.html` to GitHub (Add file ▸ Upload files ▸ commit) to publish it.

> These two keys are **safe to be public** — that's how Firebase web apps work. Access is
> controlled by Firestore *rules*, not by hiding the key.

### C. Use it
1. On each device open the Pages link ▸ **Settings ▸ Cloud Sync**.
2. Type the **same private Sync Code** on every device — anything she'll remember,
   e.g. `sarah-cpc-2026`. (Treat it like a password; anyone with the code + the site
   could see her study progress — it's low-stakes, but keep it private.)
3. Tap **Sync now** once. From then on it saves automatically as she studies, and pulls
   the newest progress whenever she opens the app. Newest change always wins.

### (Optional) Lock the rules down a bit
In Firestore ▸ **Rules**, this keeps it working forever while limiting access to just this app's data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /codevitals/{code} {
      allow read, write: if true;
    }
  }
}
```

---

## Updating the app later
Whenever a new version of `index.html` is ready, just re-upload it to the repo
(Add file ▸ Upload files ▸ commit). Everyone's Pages link updates automatically, and
their cloud progress is untouched.

## Files in this folder
- **index.html** — the whole app (double-clickable locally too).
- **.nojekyll** — tells GitHub Pages to serve the file as-is.
- **README.md** — this guide.
