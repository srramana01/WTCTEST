# Open questions

Facts only Ramana can supply. Claude Code appends to this file. Ramana answers inline and marks each item `ANSWERED` with the answer. Nothing in this file is ever resolved by assumption in code.

Each question that needs a choice carries **Recommended:** — the option Claude Code would pick. A recommendation is not an answer. Nothing is built on it until the item is marked `ANSWERED`.

Items Q1 to Q8 are the rows of the spec section 12 table "Assets and facts to complete". Everything after Q8 was added in the kickoff session (2026-11-17).

---

## Blocks launch

### From the spec section 12 table

- [ ] **Q1 Hero and founder photos.** High-resolution images, suitable crops, and permissions. Hero: Ramana facilitating, 4:3, participant permission (spec section 2). Founder: 4:5, current, max 380 px wide (spec section 10). Also needed: the alt text for each, written or approved by Ramana.
- [ ] **Q2 HUCMI relationship.** Current authorised wording, territory scope, and logo permission (spec section 3). Specifically: is "HCMBOK® training through an authorised HUCMI® training partner" the exact authorised wording, or a draft to be replaced? Is the territory line "Serving India, Sri Lanka, Bangladesh, the Middle East, and ASEAN." confirmed by HUCMI? The HUCMI mark as a file, and the permitted treatment (size, background, clear space). Until answered, section 3 renders nothing.
- [ ] **Q3 Programme pages.** Active routes, fees, delivery, assessment, and awarding details for HCMBOK® Level 1, Level 2, and HCMBOK® to Agile, leadership development, and coaching (spec section 7).
- [ ] **Q4 Consulting scope.** Confirm the four support areas in section 8 match what WTC currently delivers.
- [ ] **Q5 Evidence cards.** Approved quotations or case records with name, role, organisation, and written permission. Without at least one, section 9 does not appear at launch (but see Spec conflict C1).
- [ ] **Q6 Community.** Current Catalyst Circle offer, which tiers are open, inclusions, meeting format, schedule, price, and the working destination. Is enrolment open at launch? Until answered, `community.enrolmentOpen` is `false` and the CTA becomes "Enquire About The Catalyst Circle".
- [ ] **Q7 Insights.** At least one published article with a named author and a date. Without one, section 12 does not appear. The three titles in spec section 12 are editorial briefs, not articles.
- [ ] **Q8 Contact and legal.** A working inbox; verified contact details for the footer; Privacy Policy and Terms and Conditions text; legal entity wording. The registered company name and the brand name are spelled differently: confirm exact wording, ® status, and whether the entity line appears in the footer at all.

### Added in kickoff

- [ ] **Q9 Secondary page copy.** Copy for every page the homepage links to: `/organizations`, `/professionals`, `/institutions`, `/hcmbok-training`, `/leadership-development`, `/coaching`, `/our-approach`, `/about`, `/the-catalyst-circle`, `/insights`, plus `/privacy-policy` and `/terms-and-conditions`. Phase 5 writes a brief per page. Launch cannot happen while any nav or CTA target is a draft.
- [ ] **Q10 Founder statement approval.** Spec section 10: "The statement is proposed first-person copy for Ramana's approval, not an existing quotation." Approve "My focus is simple: help you lead change with care, clarity, and practical skill." as written, or remove it. **Recommended:** do not render the statement until approved; the rest of section 10 renders normally.
- [ ] **Q11 Social profile links.** Which profiles, with URLs. Only verified ones. Needed for the footer and the `Organization` structured data `sameAs`. Empty is acceptable; the footer then shows none.
- [ ] **Q12 Production domain.** The live origin for `SITE_ORIGIN` (canonical URLs, sitemap, structured data). Assumed to be the domain the current Dorik site uses, but not confirmed.
- [ ] **Q13 Page title and meta description.** Spec section 11 labels them "Suggested". Approve "OCM Training and Consulting | WinningThruChange" and the suggested description as final? **Recommended:** approve as written.
- [ ] **Q14 Footer "Contact" link.** Footer line "Learn: Insights | About | Contact" has no destination in the spec's proposed destinations table, and there is no `/contact` page in the phase plan. **Recommended:** link it to `/#enquiry`.
- [ ] **Q15 Enquiry data retention.** How long are enquiry rows (names, emails, phone numbers) kept, and does the Privacy Policy say so? Needed before real enquiries are stored in production.
- [ ] **Q16 Analytics consent.** Does WTC need a consent banner before GTM loads, for India (DPDP Act) or for visitors from the other territories served? The spec mentions "consent controls" (section 10, mobile behaviour) but specifies none. **Recommended:** load GTM only after consent, using a minimal accessible banner; copy for it would need to be supplied.
- [ ] **Q17 Search Console.** Who has access to verify the production property at launch (spec section 11, "verify Search Console")?

---

## Blocks a phase

### Phase 1: Homepage with static content

- [ ] **Q18 WTC logo file.** The existing logo as SVG (it is the only place `#FF4500` may appear) and its approved alt text. **Recommended alt:** "WinningThruChange". Without the file the header cannot be built to spec ("Keep the existing logo proportions").
- [ ] **Q19 Fonts.** Permission to download Lora 600 and Inter 400/500/600 WOFF2 files (SIL Open Font License) and commit them under `src/public/fonts/`. **Recommended:** take them from the `@fontsource/lora` and `@fontsource/inter` npm packages at install time and copy only the needed weights and Latin subset; record as a decision entry.
- [ ] **Q20 Interface strings the spec does not contain.** Phase 1 needs these, and hard rule 2 forbids inventing them. Supply the wording, or approve the recommended wording, and it will be added to `content/homepage.json` under a `ui` key with a note that its source is this answer, not the spec. The copy test will treat that key separately.
  - Skip link. **Recommended:** "Skip to main content".
  - Mobile menu button, closed and open. **Recommended:** "Menu" and "Close menu".
  - Required and optional markers on form labels. The spec table says "Required" and "Optional". **Recommended:** add "(optional)" after the two optional labels only; mark required fields with the `required` attribute and no extra text.
  - Phone field hint. The spec table says "include country code" under Requirement. Is that shown to visitors? **Recommended:** show "Include country code" as hint text under the field.
  - Default option for "I am enquiring as" when nothing is preselected. **Recommended:** "Choose one".
  - Per-field validation messages for Name, Email (missing, invalid), I am enquiring as, What would you like help with?. The spec gives only the form-level error message.
  - Draft banner wording. CLAUDE.md says "Draft". **Recommended:** "Draft".
  - 404 page heading and body.
  - Success page: heading and page title. The spec gives the success message and support line only. **Recommended:** use "Thank you. Your enquiry has been received." as the H1 and page title.
- [ ] **Q21 Closing section CTA.** Spec section 14 gives a "Speak With Us" CTA and the enquiry form in the same section, and section 01 says "Use 'Speak With Us' in the header and closing section to reach the same enquiry form." If the form is already on screen, what does the closing-section CTA do? **Recommended:** the form is rendered directly beneath the body with `id="enquiry"`; the closing section has no separate "Speak With Us" button; the header and hero "Speak With Us" link to `/#enquiry`.
- [ ] **Q22 Evidence card link label.** The evidence field table says "Link: Read the full learning story or case study" in the "Required content" column. Is that the visible link text, or a description of what the link is? **Recommended:** treat it as a description; no evidence link renders until a case-study page exists and its label is supplied.
- [ ] **Q23 Upcoming batch copy and position (section 7).** The spec defines the data (course, batch date, time zone, registration deadline, booking link) but no visible wording: no label for the date, no booking link text, no deadline wording. Also, where in section 7 does it sit? **Recommended:** below the HCMBOK® Certification Training card; wording to be supplied.
- [ ] **Q24 Client logo row label (section 9).** "Use client logos only with permission and a label that states the relationship." Is the label per logo (from the logo record) or one label for the row? **Recommended:** per logo, from the `relationship_label` column, supplied with each logo.
- [ ] **Q25 Insights card labels.** Cards show "category, title, short summary, author, and publication date". The category list, and the date format. **Recommended:** date as "17 November 2026"; categories supplied with each article.
- [x] **Q26 Colours that fail non-text contrast.** See Spec conflict C5 and decision D-103. **ANSWERED 2026-11-17:** D-103 approved, recorded as D-106.

### Phase 2: Enquiry form end to end

- [ ] **Q27 SMTP provider and credentials.** Hostinger mail, Google Workspace, or a transactional provider.
- [ ] **Q28 Enquiry inbox.** The address that receives enquiries, who monitors it, and the From address (its domain must have SPF and DKIM for delivery).

### Phase 3: MySQL and the scheduling engine

- [ ] **Q29 Seed content.** Approved records for `content/seed/*.json`. The seed files ship empty; this is the content that makes the site launchable without the admin panel.
- [ ] **Q30 Batch behaviour at the deadline.** See Spec conflict C3.
- [ ] **Q31 Which batch is "next".** See Spec conflict C3.
- [ ] **Q32 Placement end dates for logos.** Every placement has a required exclusive end (CLAUDE.md). For a logo with no permission expiry, what end date should the editor enter? **Recommended:** require an end date for every placement, including logos; the editor picks a review date. The logo's own permission expiry also applies.

### Phase 4: Admin panel

- [ ] **Q33 Build the admin panel before launch?** Or launch on seeded content and add it later.
- [ ] **Q34 Admin users and permissions.** One user, or more? Spec section 14 says "check editing and publishing permissions". With one user both are the same. **Recommended:** one user with both permissions; store a role column so a second user can be limited to editing later.

### Phase 5: Secondary pages, SEO, launch checks

- [ ] **Q35 Redirects.** The full list of URLs on the current Dorik site, for `config/redirects.json`.
- [ ] **Q36 GTM container ID.** An existing container is believed to be in place. Confirm the ID before use.
- [ ] **Q37 Article body format.** Who writes articles and in what format (Markdown, Word, HTML)? Needed to choose how article bodies are stored and sanitised.

### Phase 6: Hostinger deployment

- [ ] **Q38 Hostinger plan.** Node.js web-app hosting or a VPS. Affects upload persistence, available Node versions, native modules (`argon2`, `sharp`), and outbound SMTP.
- [ ] **Q39 Node version.** Node 20 is end-of-life (see D-101). Which LTS versions does the chosen Hostinger plan offer? Target approved in D-104: Node 24, else 22. Still open: what the plan actually offers.
- [ ] **Q40 Domain and DNS.** DNS access, a staging hostname, and whether the current site stays live during the build.
- [ ] **Q41 Backups.** Where database and uploads backups go, and who can restore them.

---

## Nice to know

- [ ] **Q42 Newsletter.** Which provider, and whether it launches with the site or later. The spec says "Keep newsletter sign-up separate and optional."
- [ ] **Q43 Spam protection.** Beyond honeypot and rate limit: Turnstile or none. **Recommended:** none at launch; revisit if spam arrives.
- [ ] **Q44 Founder credentials.** Which certification names and experience totals are current and verifiable, for the lines under the biography (spec section 10). Without an answer, none are shown.
- [ ] **Q45 Section icons.** Spec section 4 allows "simple line icons only when they help distinguish the routes". **Recommended:** no icons at launch.

---

## Spec conflicts

Each item quotes both lines. None has been resolved in code. The conservative choice that Claude Code will use until answered is stated, and is easy to reverse.

### C1 Evidence section with no approved evidence
- Spec section 9: "If approved stories are not ready, use \"Learning in Practice\" with a short account of a documented workshop and an approved image. Remove the section if no suitable material exists."
- CLAUDE.md, Empty states: "Section 9 evidence renders only with at least one approved `evidence` record. Otherwise the whole section, including the heading, renders nothing."
- The spec allows a "Learning in Practice" fallback; CLAUDE.md does not. The spec wins on copy and design, but the fallback needs content (a documented workshop account and image) that does not exist.
- Interim: section renders nothing. Question: should a "Learning in Practice" variant be built for when a workshop account is approved?

### C2 Insights fallback: one article or three
- Spec section 13, Featured insight: "Section 12 leads with the selected article. Otherwise show the latest published article. Hide the section if there are none."
- Spec section 12: "Layout: three article cards on off-white."
- CLAUDE.md, Empty states: "Featured placement first, else the three latest."
- Interim: featured article first, then the latest published articles up to three cards in total; one or two cards if fewer exist.

### C3 Upcoming batch at and after the registration deadline
- Spec section 13: "Section 7 shows the next open batch. At the deadline, the booking link disappears. The programme links remain available."
- Spec section 14: "Exclude withdrawn entries, unpublished articles, closed batches and logos with expired permission."
- Spec section 14: "For single-item slots, choose the highest-priority eligible entry, then the latest start, then the highest placement ID."
- Two questions. (a) At the deadline, does the batch stay visible without its booking link, or disappear entirely? (b) "Next open batch" suggests the soonest batch date; the single-item rule picks the latest placement start. Which wins when two batches are placed?
- Interim: at the deadline the whole batch disappears (no stale dates on the page); among eligible batches the single-item rule from section 14 applies.

### C4 Client logos when there is no evidence
- Spec section 13, Client logos: "Section 9 shows approved logos within their permission period. Omit the logo row when empty."
- CLAUDE.md, Empty states: "Section 9 evidence renders only with at least one approved `evidence` record. Otherwise the whole section, including the heading, renders nothing."
- If logos are placed but no evidence is approved, do the logos show?
- Interim: no. Section 9 renders only with evidence; the logo row is part of it.

### C5 Colours below the WCAG 2.2 non-text contrast minimum
- Spec section 02 palette: "Dark border #556174 Visible interactive outlines on navy" and "Light border #D8DCE2 Card and field boundaries".
- Spec section 12: "Target WCAG 2.2 AA."
- Measured: `#556174` on `#0F1621` is 2.89:1; `#D8DCE2` on `#FFFFFF` is 1.38:1. SC 1.4.11 needs 3:1 for the visible boundary of an interactive control. All the text pairs quoted in the spec were re-measured and match (6.48, 2.80, 5.50, 2.55, 4.57, 4.81).
- Proposal in D-103.
- **ANSWERED 2026-11-17:** D-103 approved (D-106). Outlines on navy use `#8A94A8`; form field borders use `#0F1621`; `#D8DCE2` for decorative card borders only.

### C6 Which colour is "slate"
- Spec section 02: "Secondary button on navy: transparent fill, off-white label and visible slate border."
- Spec section 02: "Slate on card navy is 4.81:1." (that ratio is `#8A94A8`, labelled "Muted text"), while the palette lists "Dark border #556174 Visible interactive outlines on navy".
- Is the secondary button border `#8A94A8` or `#556174`? Ties to C5.
- **ANSWERED 2026-11-17:** `#8A94A8`, by D-106.

### C7 Heading typeface for H3
- Spec section "Brand decisions used": "Keep Lora for headings and Inter for body text, navigation, labels, and buttons."
- Spec section 02 type scale: "H3 ... Inter 600 / 1.3".
- Interim: follow the type scale (H1 and H2 in Lora, H3 in Inter), because it is the more specific line.

### C8 "Organizations" or "Organisations" (possible typo, not changed)
- Spec section 1 navigation and the footer: "Organizations | Professionals | Institutions".
- Spec section 4: "For Organisations", "Explore Organisational Support"; spec section 09 destinations: "Organisations / Professionals / Institutions"; the form option "Organisation".
- The proposed route is `/organizations`. The nav label uses US spelling while the rest of the page uses UK spelling. "Organizational Change Management" is a proper term and is not in question.
- Interim: both transcribed exactly as written.

### C9 Page reference
- Spec section 2: "See the publishing rules on page 14."
- The hero greeting rules are in chapter 13 ("Hero presentation") and the scheduling rules in chapter 14. The reference is to a Word page number. No action; noted so it is not read as a missing section.
