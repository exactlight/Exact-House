# LingoLaunch — IT & Privacy Fact Sheet

*A one-page summary for a school IT / technology department reviewing whether
a teacher may use LingoLaunch with students.*

## What it is

LingoLaunch is a **self-contained classroom tool** for an ESL teacher — a set
of vocabulary games, a student picker, timers, conversation prompts, and a
speaking-practice recorder with a WIDA-style scoring rubric. It is built from
plain, static web files (HTML/CSS/JavaScript). It is **not** a cloud service,
has **no vendor account**, and behaves more like a document or spreadsheet the
teacher runs on a district device than like a third-party edtech platform.

## The one thing that matters most: no student data ever leaves the device

There is **no server, no database, and no external network request** in this
application. Everything a teacher enters lives only in the browser on the
computer being used:

| Data | Where it is stored | Leaves the device? |
| --- | --- | --- |
| Class rosters / student names | Browser `localStorage` | **No** |
| Word lists, scores, notes | Browser `localStorage` / `IndexedDB` | **No** |
| Speaking-practice **video recordings** | Browser `IndexedDB` | **No** |

Data leaves the device **only** when the teacher deliberately uses the built-in
**"Export CSV"** or **"Download video"** buttons to save a file — which the
teacher then places into whatever storage the district already approves (e.g.
the district Google Workspace / OneDrive account). The app itself transmits
nothing, to anyone, ever.

## How that is enforced (verifiable by IT)

1. **No network code.** The source contains no `fetch`, `XMLHttpRequest`,
   `WebSocket`, analytics, telemetry, tracking pixels, cookies, ad SDKs, or
   third-party scripts. Fonts are compiled into the bundle at build time and
   served from the app's own files — there is no call to Google Fonts or any
   CDN at runtime.
2. **A Content Security Policy blocks external connections.** The app ships a
   CSP with `connect-src 'self'` and no external origin permitted for any
   resource. Even if code *tried* to send data out, the browser would block
   it. IT can confirm this in the page source (`<meta http-equiv=
   "Content-Security-Policy">`) and, on a proper host, as an HTTP response
   header (also set here — see `netlify.toml`).
3. **Open, inspectable code.** The entire source is readable — no minified
   black box, no obfuscation, no external dependencies loaded at runtime.
4. **Reproducible from the network log.** Open the browser DevTools → Network
   tab while using the app. After the initial page load of the app's own
   files, using any feature (recording a video, scoring, exporting) produces
   **zero outbound requests**.

## No logins, no accounts, no PII collection by anyone

There is no sign-up, no email, no password, no user tracking. Nobody —
including the developer — can see any data entered into the app. There is no
"operator" collecting information from children.

## Hosting options (choose what fits district policy)

The build produces a folder of static files (`out/`) that can be served from
anywhere. In order of "most self-contained":

1. **District intranet / internal web server** *(recommended for classroom
   use).* Drop the `out/` folder onto the district's existing web server
   (IIS, Apache, Nginx) at an internal URL. Nothing is exposed to the public
   internet. This keeps the tool fully inside district infrastructure and
   under district control.
2. **District-managed cloud the district already approves** (e.g. a Google
   Sites / SharePoint static host, or district Netlify/Cloudflare account).
3. **Run locally on the teacher's district device** via a simple static
   server, for offline single-classroom use.

> **HTTPS is required for the camera.** Browsers only allow camera/microphone
> access on secure origins — i.e. `https://` or `localhost`. Any district
> hosting option above over HTTPS satisfies this; a plain `http://` internal
> URL will allow every feature *except* video recording.

### Setting the CSP as a real header (defense in depth)

The app already carries the policy in-page, but production hosts should also
send it as an HTTP header. Examples:

- **Netlify / Cloudflare Pages:** already configured in `netlify.toml`.
- **Apache** (`.htaccess`):
  ```
  Header set Content-Security-Policy "default-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'"
  ```
- **Nginx:**
  ```
  add_header Content-Security-Policy "default-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'";
  ```
- **IIS** (`web.config`): add a `customHeaders` entry for
  `Content-Security-Policy` with the same value.

## Where this fits legally

*This section is plain-language context, not legal advice. Confirm with the
district's data-privacy officer before classroom use.*

- **FERPA.** Student rosters and speaking recordings are "education records."
  Because they never leave the teacher's district-managed device and are never
  disclosed to any outside party, using the tool is analogous to a teacher
  keeping a gradebook, anecdotal notes, or a video on a district laptop — use
  by a "school official" with a legitimate educational interest. The moment a
  recording is exported, it should be stored and shared only through
  district-approved channels, exactly like any other student record.
- **COPPA.** COPPA governs online *operators* that collect personal
  information from children under 13. LingoLaunch has no operator and collects
  nothing online — there is no transmission to anyone — so the usual COPPA
  vendor-consent machinery is not triggered by the app itself.
- **State law (Wisconsin).** Wisconsin's pupil-records law (Wis. Stat.
  § 118.125) and typical district student-data-privacy agreements (often via
  the Student Data Privacy Consortium / a signed DPA) are designed for
  **third-party vendors** that receive student data. LingoLaunch is not a
  vendor and receives no student data, which is precisely the condition those
  agreements exist to control. If the district still wishes to categorize it,
  the accurate category is a **teacher-used, district-hosted local tool**, not
  an external online service.

## Suggested IT review checklist

- [ ] Read the source (small, dependency-light, no runtime third-party code).
- [ ] Load the app and watch DevTools → Network: confirm zero outbound
      requests while using every feature.
- [ ] Confirm the CSP (`connect-src 'self'`, no external origins) in page
      source and response headers.
- [ ] Host the `out/` folder on district infrastructure over HTTPS.
- [ ] Confirm with the data-privacy officer that a device-local, no-transmission
      tool fits district policy (and that exported files go only to approved
      storage).

## What IT would need to support

Because it is static files with no backend, there is nothing to patch, no
server to run, no database to back up, and no vendor dependency. "Support" is
limited to hosting a folder of files — the same as hosting any internal static
page.

---

**Contact:** built for Meegan (Lake Mills Public Schools) as a self-contained
classroom tool. Source and this fact sheet live alongside the app so IT can
review everything in one place.
