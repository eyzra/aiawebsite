# Abuja International Academy: one-page site

One page, three files, no build step. `index.html` holds everything: portal entry, about, values, academics, admissions, application form, campuses and contact. `thank-you.html` is where forms land. `404.html` catches wrong addresses.

About 60KB on first load, which matters when a parent opens it on a phone with two bars of signal.

## Before it goes live

**1. Portal links.** Three links currently point at the text `PORTAL-URL` and `PORTAL-URL-STAFF`. Once the portal exists, swap them:

```bash
sed -i 's|PORTAL-URL-STAFF|https://portal.aia.edu.ng/staff|g' index.html
sed -i 's|"PORTAL-URL"|"https://portal.aia.edu.ng"|g' index.html
```

Run the staff line first. It is more specific, and running it second would leave the staff link broken.

**2. Phone number.** It reads `+2349069888620` throughout.


**3. Domain.** Replace `REPLACE-WITH-YOUR-DOMAIN` in `robots.txt`.

**4. Portal wording.** The two doors currently promise results, fees, report cards, score entry and attendance. Trim that to whatever the portal actually does on day one, so no parent arrives expecting a feature that is not there.

## The portal

The site links to a portal. It does not contain one. That is deliberate, and worth being blunt about.

A working school portal needs accounts for every pupil, parent and teacher, a database of scores and payments, password resets, role permissions, and a server that stays up in August when results drop. That is an application with a running cost and someone responsible for it, not a page. Building one from scratch for three campuses would take months and would leave AIA maintaining software instead of teaching.

## Deploying

The forms already work on Netlify with no setup.


For Cloudflare Pages, sign up at formspree.io or web3forms.com, then on both forms change `action` to the endpoint they give you, and delete `data-netlify="true"`, `netlify-honeypot="company"` and the hidden `form-name` input.

## Editing later

Everything is readable HTML in one file. Change text between tags, never the tags themselves. Colours and type live at the top of `assets/css/aia.css` under `:root`. Photographs go in `assets/img/`, resized to under 200KB each, because a 4MB photo straight off a phone costs a parent real money in data.

