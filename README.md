# NFC-Sticker

Small, self-contained web pages that a set of NTAG213 NFC stickers point to.
Each sticker is written once with a phone (NFC Tools, iOS/Android) to a URL
under this site; the page behind that URL can change over time without
rewriting the physical sticker.

No build step, no framework, no backend — plain HTML/CSS/JS per page,
served as static files via GitHub Pages.

## URL structure

One folder per tag, each with its own `index.html` so the sticker's URL has
no filename in it (`/mirror/`, not `/mirror/index.html`). Folders are added
as each page is actually built — this is the planned scheme, not all of it
exists yet:

| Path | Status | What it is |
|---|---|---|
| `/mirror/` | **built** | Tap-to-reveal note for the bathroom mirror; cycles through 28 lines with no repeat until the deck is exhausted. |
| `/firsts/` | planned | "First X" wall — a tag per relationship milestone. |
| `/timeline/` | planned | Growing memory timeline. |
| `/mystery/` | planned | Hidden "mystery button" webpage gag. |
| `/guestbook/` | planned | Shared guestbook — will need small persisted/shared state, architecturally kept separate from the other pages so it can add that later without touching them. |
| `/party/` | planned | Party game / challenge randomizer. |
| `/escape/` | planned | Escape-room-style linked puzzle chain. |

More ideas than this table — home, work, parents, gifts, and the patterns
they share — live in [`IDEAS.md`](IDEAS.md).

Each page is self-contained (own inline CSS/JS, own font links) rather than
sharing a common assets folder, so editing or breaking one page can't affect
another.

**`localStorage` note:** GitHub Pages serves every page from one shared
origin, so browser storage is shared across pages that live in the same
browser. Each page must namespace its own keys (the mirror page uses
`mm_deck`) — this matters once more pages exist, not just for the mirror.

## GitHub Pages setup (one-time, manual)

Pages deploys straight from a branch — no CI, no build:

1. Repo **Settings → Pages**.
2. **Source: Deploy from a branch**.
3. **Branch: `main`**, folder **`/ (root)`**.
4. Save. The site becomes available at `https://<owner>.github.io/NFC-Sticker/`,
   and each page at e.g. `https://<owner>.github.io/NFC-Sticker/mirror/`.

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
3. Paste the page's full URL (e.g. `https://<owner>.github.io/NFC-Sticker/mirror/`).
4. Tap **Write**, hold the phone to the sticker.
5. Test by tapping again before sticking it down.
