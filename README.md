# daily

Small, self-contained web pages that a set of NTAG213 NFC stickers point to.
Each sticker is written once with a phone (NFC Tools, iOS/Android) to a URL
under this site; the page behind that URL can change over time without
rewriting the physical sticker.

No build step, no framework, no backend — plain HTML/CSS/JS per page,
served as static files via GitHub Pages.

## URL structure

One folder per tag, each with its own `index.html` so the sticker's URL has
no filename in it (`/m-65e7657c/`, not `/m-65e7657c/index.html`). Folders are added
as each page is actually built — this is the planned scheme, not all of it
exists yet.

**The repository name is part of the sticker URL too.** A project site is
served at `https://<owner>.github.io/<repo>/`, so renaming the repo moves the
whole site and GitHub does **not** redirect the old Pages path — it starts
returning 404 immediately. This was confirmed the hard way during setup, before
any tag had been written. Treat renaming this repository exactly like renaming
a page folder: fine before a sticker exists, breaking afterwards.

**Folder names carry a random suffix on purpose.** A sticker's URL is fixed
the moment it goes on a wall, so the path has to be chosen once and kept. An
obvious path like `/mirror/` is guessable by anyone who knows the site root,
which matters if this repo is ever made private (Pages keeps serving the site
publicly while the source disappears — at that point the unguessable path is
the only thing standing between a stranger and the page). Give every new page
its own random suffix; never rename one after its sticker is written.

| Path | Status | What it is |
|---|---|---|
| `/m-65e7657c/` | **built** | Tap-to-reveal note for the bathroom mirror. A dated note for each day (`PINNED_NOTES` in `index.html`, written through Feb 26, 2027), falling back to a 30-line rotation; a "one more" deck; and one of 12 growing flowers per week, changing Mondays (`FLOWER_SCHEDULE`, hand-picked through the week of Feb 22, 2027, shuffled after). |
| `/firsts-<random>/` | planned | "First X" wall — a tag per relationship milestone. |
| `/timeline-<random>/` | planned | Growing memory timeline. |
| `/mystery-<random>/` | planned | Hidden "mystery button" webpage gag. |
| `/guestbook-<random>/` | planned | Shared guestbook — will need small persisted/shared state, architecturally kept separate from the other pages so it can add that later without touching them. |
| `/party-<random>/` | planned | Party game / challenge randomizer. |
| `/escape-<random>/` | planned | Escape-room-style linked puzzle chain. |

Each page is self-contained (own inline CSS/JS, own font links) rather than
sharing a common assets folder, so editing or breaking one page can't affect
another.

**`localStorage` note:** GitHub Pages serves every page from one shared
origin, so browser storage is shared across pages that live in the same
browser. Each page must namespace its own keys (the mirror page uses
`mm_deck`) — this matters once more pages exist, not just for the mirror.
Note the key is tied to the browser origin, not the folder, so renaming a
page's folder does not reset anyone's stored state.

## GitHub Pages setup (one-time, manual)

Pages deploys straight from a branch — no CI, no build:

1. Repo **Settings → Pages**.
2. **Source: Deploy from a branch**.
3. **Branch: `main`**, folder **`/ (root)`**.
4. Save. The site becomes available at `https://<owner>.github.io/daily/`,
   and each page at e.g. `https://<owner>.github.io/daily/m-65e7657c/`.

Pages from a **private** repo needs GitHub Pro or above; on the free plan the
repo has to be public. Either way the served page is public — it has to be,
since a stranger tapping the sticker cannot log in. Repo visibility can be
changed at any time without touching a sticker; the URL path cannot.

`.nojekyll` at the repo root disables GitHub's default Jekyll processing,
which isn't needed for plain static HTML and can otherwise mangle files in
edge cases.

Pages is configured to build from `main`. This repo's feature/review work
happens on other branches and reaches `main` only once merged — the Pages
setting itself is not something to change from a session; it's set once by
hand per the steps above.

## Writing a sticker

1. Install **NFC Tools** (free, iOS/Android).
2. Write tab → Add a record → **URL/URI**.
3. Paste the page's full URL (e.g. `https://<owner>.github.io/daily/m-65e7657c/`).
4. Tap **Write**, hold the phone to the sticker.
5. Test by tapping again before sticking it down.
6. Do **not** use the app's lock / write-protect option. Locking an NTAG is
   permanent, and it is never needed here: the tag holds only a URL, and
   everything that changes lives behind it.

## Search engines

Every page carries `<meta name="robots" content="noindex, nofollow">`. A
`robots.txt` in this repo would **not** work — crawlers only honour robots.txt
at the origin root (`https://<owner>.github.io/robots.txt`), which is served by
the separate `<owner>.github.io` repo, not by this project site. If that repo
exists, a `Disallow: /daily/` there covers the whole site at the origin
level; the per-page meta tag is what applies regardless.
