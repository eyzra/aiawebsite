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

Three routes, cheapest effort first.

**Buy one.** Edves and SAFSMS are the established Nigerian platforms, and there are newer entrants. They give you result computation, report cards, fee tracking, parent logins and a mobile app on day one. Published Nigerian pricing for cloud school systems runs from around fifty thousand naira a year at the small end to several hundred thousand for larger schools, usually scaling with enrolment. You point the two portal links at the login page they give you and the job is done this term. This is what I would do.

**Result checker only.** If all the school wants is for a parent to type a registration number and a scan card PIN and see a term's result, that is a small build, not a full portal. It needs a database and a bit of backend, and it can sit on the same domain. Weeks rather than months, and cheap to run.

**Build the whole thing.** Custom portal, custom everything, and AIA owns the code. Months of work, real hosting costs, and a maintenance burden that never ends. Only worth it if the off-the-shelf platforms genuinely cannot fit how the school runs.

## Deploying

The forms already work on Netlify with no setup.


For Cloudflare Pages, sign up at formspree.io or web3forms.com, then on both forms change `action` to the endpoint they give you, and delete `data-netlify="true"`, `netlify-honeypot="company"` and the hidden `form-name` input.

## Editing later

Everything is readable HTML in one file. Change text between tags, never the tags themselves. Colours and type live at the top of `assets/css/aia.css` under `:root`. Photographs go in `assets/img/`, resized to under 200KB each, because a 4MB photo straight off a phone costs a parent real money in data.

