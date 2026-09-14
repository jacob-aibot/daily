# Idea backlog

Things worth pointing an NTAG213 at, beyond the pages already planned in the
README. Grouped by who they're for. Each line notes roughly what it costs to
build:

- **S** — one static page, an evening.
- **M** — needs a bit of state (localStorage, date logic, URL params).
- **A** — no page at all; the tag is just an ID that fires a phone automation
  (iOS Shortcuts → Automation → NFC, or NFC Tools Tasks on Android).

---

## Two different kinds of tag

Everything below is one of two things, and it's worth keeping them straight:

1. **A tag that opens a page.** What `/mirror/` already is. The sticker holds a
   URL; the page behind it can change forever without re-writing the sticker.
   This is the repo's whole model.
2. **A tag that does something to the phone.** iOS Shortcuts can trigger on a
   *specific physical tag* without caring what's written on it — so a blank
   sticker on the nightstand can kill the lights, set an alarm, and start
   white noise. No page, no repo, no URL. Android does the same via NFC Tools
   tasks or Tasker.

The second kind is where most of the everyday usefulness is. The first kind is
where all the charm is.

---

## For the apartment

| Idea | Cost | Why it works |
|---|---|---|
| **Plant tags** — one per pot | M | Tap to see watering cadence and light needs; tap "watered" to log the date. The page shows "6 days ago" in red. Solves a real problem you actually have. |
| **Appliance tags** — router, oven, washer, coffee machine | S | Model number, filter size, the one setting you always forget, what to do when it does *that* thing, link to the real manual. Stick it on the back where the sticker label already is. |
| **Laundry decoder** on the machine lid | S | What the cryptic dial positions actually mean, which detergent for what, and the care-symbol chart. |
| **Storage bin labels** — garage, closet, under the bed | M | Tap a bin to see what's in it. One page, `?bin=3` in the URL, so every sticker is the same page. |
| **Bin night** tag by the door | M | Alternating recycling/compost schedules are impossible to remember; a page that just says "tonight: recycling" from a date calculation is embarrassingly useful. |
| **Freezer inventory** on the freezer door | M | Checklist you tick as you eat things. |
| **Museum placards** — on souvenirs, art, the weird thing on the shelf | S | Tap it, get the story of where it came from. Beautiful for guests, and it's secretly a home inventory. |
| **Board game shelf** — one per box | S | Player count, actual playtime, rules summary, your house rules. Ends the twenty-minute "what should we play" negotiation. |
| **Leaving-the-house** tag by the door | A | Lights off, DND on, commute playlist, keys-wallet-badge checklist. |
| **Bedside** tag | A | Sleep mode: DND, alarm set, lights off, white noise. |
| **Habit streak** — water bottle, floss, guitar case | M | Tap to log. Page shows the streak. Dumb, effective. |

## For work

| Idea | Cost | Why it works |
|---|---|---|
| **Desk tag** | S | Your contact card, booking link, and a one-paragraph "what I'm working on" that you keep current. |
| **Conference badge tag** | S | Same page, but it's the thing you hand people instead of a card. Massively more memorable than a card, and you can update the page after the conference. |
| **Homelab / server tags** | S | Tap the machine: IP, role, runbook, how to reboot it safely. This is the single highest-value work use if you run any hardware. |
| **Meeting room door** | S | Dial-in, how the AV actually works, who to call when the projector dies. |
| **Office appliance onboarding** | S | Coffee machine, printer, dishwasher. New hires stop asking. |
| **Laptop lid "if found"** | S | A page with a way to reach you that isn't your phone number in plaintext. |
| **Whiteboard tag** | S | Archive of photos of that whiteboard, newest first. |

## For your parents

This is the category with the most actual payoff, and it's the one nobody
thinks of.

| Idea | Cost | Why it works |
|---|---|---|
| **"How to do X" tags** on the TV, remote, router, printer | S | Giant text, three steps, one photo per step. Tap the remote → how to get to Netflix. Tap the router → how to reboot it and how long to wait. It is a gift *and* it cuts your tech support calls by half. |
| **Fridge photo tag** | S | Tap it, get the latest family photos. They'll use it daily. |
| **Recipe card tags** | S | Stick one on the handwritten card in Mom's recipe box. Scan of the card, plus the video of her making it. Do this while you still can. |
| **Pill / dose log** on the cabinet door | M | Tap when taken, page shows "last: 8:14am." Prevents double-dosing. Keep it generic — no drug names, no PII, see the privacy note below. |
| **Emergency info** on the fridge | S | Doctor, allergies, emergency contacts, for a caregiver or paramedic. ⚠️ Not on a public URL — see below. |

## For your girlfriend

Since the mirror one landed:

| Idea | Cost | Why it works |
|---|---|---|
| **"Open when…" set** | S | A sheet of stickers: *when you're stressed*, *when you miss me*, *when you can't sleep*, *when you've had a bad day*. One page each. The physical act of choosing which to tap is the whole gift. |
| **Countdown tag** | M | Days until the trip, the anniversary, the next time you see each other. One line of date math, disproportionate emotional return. |
| **Time capsule** | M | A page that shows a placeholder until a date, then reveals the letter. (Client-side, so it's honour-system, not a vault — that's fine.) |
| **Advent / 24 tags** | M | Hidden around the apartment, one unlocks per day. Same page, `?day=n`, gated on the date. |
| **Gift-wrap tag** | S | On the box, before it's opened. Tap first, then unwrap. |
| **Date-night hunt** | M | Each tag gives the next location. The `/escape/` page you already planned, pointed at the city instead of a puzzle. |
| **Book tag** | S | Inside the cover of a book you give her: why you picked it, and which page to notice. |
| **Time-of-day mirror** | M | Same sticker, different voice at 7am, 2pm, and midnight. Cheapest trick here, biggest effect. |

## Gags

- **Mystery button** — already planned, still the correct instinct.
- **A tag under a coaster** — the drink recipe of the night.
- **The obvious one** — you know the one. Put it somewhere nobody expects a tag.

---

## Techniques worth reusing

Five patterns cover almost everything above:

1. **One page, many stickers.** Write `…/bins/?b=3` to each sticker. One HTML
   file, thirty tags. Don't build thirty folders.
2. **Time-aware content.** Branch on `new Date()` — hour of day, day of week,
   days until a target. No backend, and it makes a static sticker feel alive.
3. **State in `localStorage`.** Streaks, logs, "last watered," decks that don't
   repeat. Namespace every key like `/mirror/` does with `mm_deck` — the whole
   site is one origin and storage is shared across pages.
4. **Reveal-after-date.** Trivial to write, trivially bypassable. Perfect for
   gifts, never for anything that matters.
5. **Tag-as-trigger.** For anything that's "do a thing on my phone," skip the
   repo entirely and use an iOS Shortcuts NFC automation. Faster to build than
   any page here.

## Two constraints to design around

**Tag capacity.** NTAG213 has ~144 bytes usable for the NDEF record. A URL like
`https://<owner>.github.io/NFC-Sticker/mirror/` is nowhere near that, so it's
a non-issue today — but long paths plus query strings on a deeply nested page
can get tight, and a short custom domain buys a lot of headroom if it ever does.

**Everything here is public.** GitHub Pages serves this site to the open
internet with no auth, and an unguessable folder name is obscurity, not
privacy. So:

- Never put on a page: home address, phone numbers, medication names,
  full names of family members, anything that identifies where someone lives.
- The emergency-info and pill-log ideas are good ideas on the *wrong platform*.
  Put those on a note stored locally on the phone the tag opens, or a private
  document behind a login — not here.
- Anything sentimental is fine. Nobody is going to find `/open-when-stressed/`,
  and it doesn't matter if they do.
