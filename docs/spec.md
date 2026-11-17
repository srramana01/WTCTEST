# WinningThruChange Homepage Design and Content Specification

Converted from WinningThruChange_Homepage_Design_and_Content_2.docx (Version 3, 17 November 2026). This file is the source of truth for copy, layout, colour, type, accessibility, scheduling and launch rules. Do not edit copy here. If the Word document changes, regenerate this file.

Design specification and website copy for a database-driven Node.js site
on Hostinger

17 November 2026 \| Version 3

## The homepage task

Show what WinningThruChange does, why the human side of change matters,
and where each visitor should go next. The page should present OCM
training, coaching, and consulting as parts of one clear offer.

Core position: Humanized Organizational Change Management. Help people
lead change with care, build practical skills, and support adoption at
work.

## The design direction

-   A calm navy opening, clear type, real learning images, and one
    orange action colour.

-   Retain the agreed hero: Change Doesn't Set You Apart. How You Lead
    It Does.

-   Give organisations, professionals, and institutions distinct routes
    near the top.

-   Keep the home page broad. Put programme details, fees, and enrolment
    on dedicated pages.

-   Build trust through relevant experience, the HUCMI relationship, and
    specific evidence.

## Brand decisions used

Use #F97316 as the standard primary CTA and action accent. It replaces
#F58220 across the website. Reserve #FF4500 for the existing logo only.
Gold is removed. Apply the action colour through one global token so
buttons and selected emphasis stay consistent.

Keep Lora for headings and Inter for body text, navigation, labels, and
buttons. Keep the header and hero on the same #0F1621 background.

## How to use this document

Copy labelled Heading, Body, Card, CTA, and Microcopy is intended for
the website. Layout and Build guidance is for the implementer. Suggested
URLs are a proposed site map, not existing live pages.

Sections 1--14 define the homepage. The implementation pages cover
responsive design, search, enquiry handling, scheduled content and
launch checks.

# 01 Page goals and structure

## Who the page serves

  -----------------------------------------------------------------------
  Visitor                 Main need               Next step
  ----------------------- ----------------------- -----------------------
  Organisations           Support adoption        Organisational change
                          through technology,     consulting enquiry
                          process, or             
                          organisational change.  

  Professionals           Build OCM skills, lead  Programme route or fit
                          people, or explore      enquiry
                          HCMBOK training.        

  Institutions            Help students connect   Institutional workshop
                          OCM concepts with       enquiry
                          workplace practice.     
  -----------------------------------------------------------------------

Give all three routes a clear label. Avoid executive-only language that
excludes early and mid-career professionals. Corporate buyers need a
clear scope and evidence, not status claims.

## Recommended section order

  -----------------------------------------------------------------------
  Section                 Purpose                 Surface
  ----------------------- ----------------------- -----------------------
  1 Header                Find a route and        Navy
                          contact option          

  2 Hero                  State the offer and     Navy
                          invite action           

  3 Credibility strip     Establish the training  Navy panel
                          relationship            

  4 Choose your path      Route three audiences   Off-white

  5 The change challenge  Show the need for OCM   Off-white

  6 Humanized OCM         Explain the approach    Navy

  7 Programmes            Make learning options   Off-white
                          clear                   

  8 Consulting support    Show scope for          Off-white
                          organisations           

  9 Evidence              Show credible           Navy
                          experience and results  

  10 Founder              Introduce Ramana and    Off-white
                          his relevance           

  11 The Catalyst Circle  Extend learning into    Navy
                          practice                

  12 Insights             Answer useful questions Off-white

  13 FAQ                  Resolve key doubts      Off-white

  14 Contact and footer   Capture the next step   Navy
  -----------------------------------------------------------------------

## Conversion rules

Use "Find Your Path" in the hero to scroll to section 4. Use "Speak With
Us" in the header and closing section to reach the same enquiry form.
Each audience card then leads to a focused page. Do not send all
visitors straight to a webinar checkout.

Avoid pop-ups on entry, auto-playing video, artificial countdowns, and a
full membership pricing ladder on the homepage. A short page with clear
routes is better than a long catalogue. Aim for about 1,300--1,700 words
of published copy, excluding the footer.

# 02 Colour and type system

  -----------------------------------------------------------------------
  Role                    Colour                  Use
  ----------------------- ----------------------- -----------------------
  Brand base              #0F1621                 Header, hero, dark
                                                  sections, dark text

  Action orange           #F97316                 Primary buttons and
                                                  limited emphasis on
                                                  navy

  Logo orange             #FF4500                 Existing logo only

  Light surface           #F6F4EE                 Reading sections and
                                                  light panels

  White                   #FFFFFF                 Dark-section headings
                                                  and selected cards

  Card navy               #20283C                 Raised panels on navy

  Muted text              #8A94A8                 Supporting text on navy
                                                  or card navy

  Light-section link      #B45309                 Underlined links on
                                                  off-white

  Light border            #D8DCE2                 Card and field
                                                  boundaries

  Dark border             #556174                 Visible interactive
                                                  outlines on navy
  -----------------------------------------------------------------------

## Contrast and button states

Primary button: #F97316 fill, #0F1621 label, 16px Inter 600, minimum
48px height, 20--24px side padding, 8px radius. Hover: #EA650F with navy
text, giving 5.50:1 text contrast. Pressed: navy fill, off-white label,
orange border. On light sections, add a thin navy border to define the
button. Keep keyboard focus visible.

Calculated contrast: navy text on #F97316 is 6.47:1. White text is only
2.80:1, so use navy labels. Orange on off-white is 2.55:1. Use #B45309
for underlined text links on light sections, giving 4.57:1. Slate on
card navy is 4.81:1. Do not reduce text opacity.

Secondary button on navy: transparent fill, off-white label and visible
slate border. Hover: card navy. On light: navy label and navy outline.
Focus: 2px ring with 3px offset, orange on navy or navy on light. Use a
navy inner edge if an orange control needs a distinct focus boundary.

## Type scale in CSS pixels

  -----------------------------------------------------------------------
  Element           Desktop           Mobile            Face and line
                                                        height
  ----------------- ----------------- ----------------- -----------------
  H1                52--56            34--38            Lora 600 / 1.16

  H2                36--40            28--32            Lora 600 / 1.22

  H3                23--26            21--23            Inter 600 / 1.3

  Body              18                17                Inter 400 / 1.6

  Navigation and    16                16                Inter 500--600 /
  CTA                                                   1.4

  Supporting text   14--15            14--15            Inter 400 / 1.5
  -----------------------------------------------------------------------

## Colour and marketing judgement

Navy provides a consistent frame. Off-white gives long sections clear
reading space. #F97316 is the preferred visual fit for the action
accent. It is slightly redder and more saturated than #F58220, but has
no proven conversion advantage. Colour associations do not establish
that one exact shade creates more trust or enquiries. Test clarity and
qualified enquiries.

Use roughly two-thirds neutral reading surfaces and one-third dark
surfaces by scroll length. Do not alternate colours just to decorate.
Keep related sections together. Avoid gold, orange gradients, glowing
borders, and orange body paragraphs.

# 03 Header and hero

## Section 1 Header

**Navigation** Organizations \| Professionals \| Institutions \| The
Catalyst Circle \| Insights \| About

**CTA** Speak With Us

Layout: one navy row, about 84px high on desktop and 72px on mobile.
Logo left, navigation centre, CTA right. Maximum inner width 1200px.
Keep the existing logo proportions.

Build: link each menu item to its page. Use a sticky header only if it
remains compact. When the row does not fit, switch to a mobile menu
rather than shrinking labels. No hover-only submenus.

## Section 2 Hero

**Eyebrow** Humanized Organizational Change Management

**H1** Change Doesn't Set You Apart. How You Lead It Does.

**Body** We help HR and transformation leaders guide teams through new
systems, processes, and roles. Our Organizational Change Management
consulting, training, and coaching help people adopt new ways of
working.

**Primary CTA** Find Your Path

**Secondary CTA** Speak With Us

**Supporting line** HCMBOK® training • Leadership development •
Organisational change support

Scheduled greeting strip. Place a slim, full-width row at the top of the
hero, above the eyebrow. Keep the headline, service description and
primary action visible in both states. An empty slot takes up zero
space. See the publishing rules on page 14.

Layout: 55% text and 45% image, with a 48px gap. Keep text to about
600px. Give the hero 80--96px vertical padding on desktop and 40--48px
on mobile. Do not force it to fill the screen. Keep the two headline
sentences in one H1. Highlight only "How You Lead It Does." in action
orange on navy.

Visual: a real photo of Ramana facilitating a session, with participants
engaged in discussion. Use a 4:3 crop, 16px corners, and no baked-in
text. Avoid posed handshakes or an image that implies stock subjects
attended a WTC programme. Use an approved photo with participant
permission.

Mobile: text first, CTAs next, image last. Stack buttons at 100% width
where needed. Keep the eyebrow, offer, and first action visible without
an oversized image pushing them down.

## Section 3 Credibility strip

**Label** HCMBOK® training through an authorised HUCMI® training partner

**Supporting text** Serving India, Sri Lanka, Bangladesh, the Middle
East, and ASEAN.

Layout: a compact navy panel below the hero, with the approved HUCMI
mark and one short text block. Use the exact current authorisation
wording and permitted logo treatment. Confirm territory and
authorisation before publishing. Do not add global HUCMI totals as WTC
client or learner counts.

# 04 Audience routes and the change challenge

## Section 4 Choose your path

**H2** What Do You Want to Achieve Through Change?

**Intro** Choose the support that fits your role and the change you
face.

**Card 1 heading** For Organisations

**Card 1 body** Help leaders and teams adopt new ways of working. Plan
for the people impact of change, involve stakeholders, and build change
capability within your organisation.

**Card 1 link** Explore Organisational Support

**Card 2 heading** For Professionals

**Card 2 body** Build practical OCM skills for your current role or your
next step. Explore HCMBOK® training, leadership development, and
coaching for workplace challenges.

**Card 2 link** Explore Learning Programmes

**Card 3 heading** For Institutions

**Card 3 body** Help students understand the human side of workplace
change. Bring OCM into learning through workshops, case discussions, and
applied activities.

**Card 3 link** Explore Institutional Programmes

Layout: three equal cards on off-white. Use white card fills, a subtle
border, 24--32px padding, 12px corners, and a 24px gap. Keep link
positions aligned. Add simple line icons only when they help distinguish
the routes. Do not fill all three cards with orange buttons.

Mobile: stack Organisations, Professionals, Institutions. Keep text
visible without tabs or horizontal swiping. Use one descriptive link per
card and a visible focus state. Avoid nested clickable elements.

## Section 5 The change challenge

**H2** A New System Is Only Part of the Change.

**Body** New tools and plans change what people do. They can also change
roles, routines, relationships, and trust. When those effects are
missed, adoption can slow and teams can lose direction.

**Point 1** People need clarity. What is changing, why does it matter,
and what will it mean for me?

**Point 2** Managers need support. They must guide their teams while
adapting to the change themselves.

**Point 3** Adoption needs follow-through. Training must connect with
work, feedback, and support after launch.

**Closing line** OCM helps you plan for these human needs alongside the
technical work.

Layout: stay on off-white. Use a 40/60 split: heading left, explanation
and three short points right. Use navy text. Do not add alarming
statistics, blame employees for resistance, or present resistance as a
defect to remove.

# 05 Humanized OCM and learning programmes

## Section 6 The approach

**H2** Put People at the Centre of Change.

**Body** Our approach to Humanized Organizational Change Management
combines change management practice with attention to human behaviour.
The aim is to understand what people need, involve them in the work, and
help them adopt change.

**Step 1** Understand the impact. Look at the people, roles, and work
affected by the change.

**Step 2** Build shared understanding. Listen to concerns, explain the
purpose, and involve the right stakeholders.

**Step 3** Support new ways of working. Equip leaders and teams with
relevant learning, tools, and support.

**Step 4** Learn and adjust. Use feedback and adoption measures to
improve the approach.

**Link** Explore Our Approach

Layout: navy background, off-white copy, four numbered blocks in a 2 × 2
grid. Orange for step numbers only. This is an explanatory sequence, not
a claimed proprietary framework or the official HCMBOK lifecycle. The
dedicated approach page should explain where HCMBOK informs the work.

## Section 7 Learning programmes

**H2** Build OCM Skills You Can Use at Work.

**Intro** Choose structured HCMBOK® learning or focused support for the
people challenges in your role.

**Card 1 heading** HCMBOK® Certification Training

**Card 1 body** Explore HCMBOK® Level 1, Level 2, and HCMBOK® to Agile
training. Choose a route that fits your experience and the change work
you want to do.

**Card 1 link** View HCMBOK Training

**Card 2 heading** Change Leadership Development

**Card 2 body** Build skills in stakeholder engagement, change
communication, and leading people through uncertainty. Apply learning to
situations you face at work.

**Card 2 link** Explore Leadership Development

**Card 3 heading** Coaching for Workplace Change

**Card 3 body** Work through a specific challenge, such as a new
leadership role, a difficult stakeholder conversation, or a team
adapting to change.

**Card 3 link** Explore Coaching

**Helper line** Not sure where to start? Speak with us about your role
and goals.

Layout: off-white, three clear cards with underlined links. Keep
official HCMBOK routes separate from WTC community membership levels. Do
not imply that attending training alone earns a credential. Course pages
must state awarding body, current requirements, delivery, fees, and
assessment terms.

# 06 Organisational support and evidence

## Section 8 Consulting support

**H2** Bring the People Side Into Your Change Plan.

**Body** Whether you are introducing technology, changing processes, or
reshaping roles, your plan needs to account for how people will work
differently. We help you identify that impact and plan practical support
for adoption.

**Support area 1** Change impact and readiness. Identify affected
groups, likely concerns, and gaps in support.

**Support area 2** Stakeholder engagement and communication. Plan who to
involve, what they need to know, and how feedback will shape the work.

**Support area 3** Leader and team capability. Prepare managers to hold
useful conversations and support their teams through change.

**Support area 4** Adoption and reinforcement. Define signs of progress
and use feedback to guide ongoing support.

**CTA** Discuss Your Change Initiative

Layout: off-white, two columns, with the four support areas in a 2 × 2
grid. Place the CTA below the scope, linking to the enquiry form with
Organisations preselected. Show these as areas to discuss, not a fixed
package or a promise to guarantee adoption.

## Section 9 Evidence

**H2** See How the Learning Connects With Work.

**Intro** Explore participant feedback and examples of learning put into
practice.

Use two or three evidence cards. Each should show the context, the work,
and a verified result or specific learning outcome. A workshop photo can
support the story but does not establish a business result.

  -----------------------------------------------------------------------
  Card field                          Required content
  ----------------------------------- -----------------------------------
  Context                             Role or sector and the change
                                      challenge

  Work                                What WTC actually delivered

  Evidence                            An approved quotation, artefact, or
                                      measured result

  Attribution                         Name, role, organisation, and
                                      permission where applicable

  Link                                Read the full learning story or
                                      case study
  -----------------------------------------------------------------------

Layout: navy, card navy panels, off-white text. Prefer static cards over
a carousel. Use one short quotation per card and a clear attribution.
Use client logos only with permission and a label that states the
relationship.

Publication rule: do not publish the suggested heading and intro without
evidence beneath them. If approved stories are not ready, use "Learning
in Practice" with a short account of a documented workshop and an
approved image. Remove the section if no suitable material exists. Do
not write sample testimonials or use the founder's former employers as
WTC clients.

# 07 Founder and community

## Section 10 Meet Ramana

**H2** Meet S. R. Ramana

**Role line** Founder, WinningThruChange® \| OCM Trainer, Coach, and
Consultant

**Body** Ramana brings experience in enterprise systems, programme
delivery, and organisational change. His work focuses on how people
understand change, respond to it, and build the skills to lead it.

**Second paragraph** Through WinningThruChange, he helps professionals
connect OCM concepts with workplace practice and supports organisations
in planning for the human impact of change.

**Statement** My focus is simple: help you lead change with care,
clarity, and practical skill.

**Link** Learn More About Ramana

Layout: off-white. Portrait occupies about 35%, text 65%. Use a warm,
current professional photograph with natural eye contact. Keep the image
at 4:5 and maximum 380px wide. The statement is proposed first-person
copy for Ramana's approval, not an existing quotation.

Show only relevant, current credentials beneath the biography. Confirm
certification names and any experience totals before adding them. Keep
the full career history on About. Avoid a long badge wall or claims of
clinical credentials.

## Section 11 The Catalyst Circle

**Eyebrow** The WinningThruChange Community

**H2** Keep Learning as Your Leadership Role Grows.

**Body** The Catalyst Circle brings professionals together to develop
their approach to leadership and change. Explore a community built
around shared learning, reflection, and applying ideas at work.

**Progression** Leadership Integration System → Leadership Integration
Mastery → Leadership Integration Transcendence

**Supporting line** Together, these stages form the Leadership
Integration Odyssey.

**CTA** Explore The Catalyst Circle

Layout: navy with one spacious feature panel. Use three stacked stage
names or a simple three-column progression. Keep every stage readable on
mobile. Use no pricing grid on the homepage. Avoid reintroducing
metallic gold or silver colours because the membership names include
those terms.

The community page should state which tiers are open, what members
receive, the actual meeting format, schedule, price, and next step. Do
not imply that sessions, peer review, mentoring, or access are included
until those services are confirmed. If enrolment is closed, change the
CTA to "Enquire About The Catalyst Circle" and direct it to an enquiry,
not a purchase page.

# 08 Insights and frequently asked questions

## Section 12 Insights

**H2** Practical Ideas for the Human Side of Change.

**Intro** Explore OCM, leadership, and the workplace questions that
matter when people face change.

**Article 1 title** How to Lead Former Peers After a Promotion

**Article 1 summary** Set expectations, rebuild working relationships,
and make space for honest conversations.

**Article 2 title** What Is Humanized Organizational Change Management?

**Article 2 summary** Understand how a people-centred approach shapes
engagement, learning, and adoption.

**Article 3 title** How Managers Can Support Teams During Restructuring

**Article 3 summary** Communicate what you know, make room for concerns,
and keep support close to the work.

**Section link** View All Insights

Layout: three article cards on off-white. Show category, title, short
summary, author, and publication date. Titles above are proposed
editorial briefs. Publish and link the articles before showing these
cards. Do not create dead links or pass them off as existing posts.

## Section 13 Frequently asked questions

**H2** Your Questions About OCM and Working With Us

**Q1** What is Organizational Change Management?

Organizational Change Management, or OCM, is a structured approach to
helping people adopt changes in how they work. It includes understanding
impacts, engaging stakeholders, communicating clearly, building skills,
and supporting adoption over time.

**Q2** Who are WinningThruChange programmes for?

We work with professionals, leaders, organisations, and educational
institutions. The right programme depends on your role, experience, and
goals. Each programme page explains who it serves and what it covers.

**Q3** What is the difference between OCM and project management?

Project management coordinates the work needed to deliver a change. OCM
focuses on helping people understand, adopt, and sustain the new ways of
working. Both need to work together.

**Q4** How do I choose an HCMBOK training route?

Start with your current experience and learning goals. Review the HCMBOK
training pages, then speak with us if you need help comparing the routes
and their current requirements.

**Q5** Can you support an organisation or an educational institution?

Yes. Tell us about your audience, the change or learning need, and the
timing. We can discuss the scope and suggest a suitable next step.

Layout: five accessible accordion rows, first answer open. Use buttons
with visible focus, expanded state, and linked answer panels. Keep
answers in page HTML. Icons must not be the only indication of state. A
stacked question-and-answer layout is a sound fallback.

# 09 Contact footer and destinations

## Section 14 Closing action

**H2** What Change Are You Preparing to Lead?

**Body** Tell us about your role, your goals, or the change your
organisation is planning. We will help you identify a suitable next
step.

**CTA** Speak With Us

**Form introduction** A few details will help us understand what you
need.

  -----------------------------------------------------------------------
  Form field                          Requirement
  ----------------------------------- -----------------------------------
  Name                                Required

  Email                               Required, accept personal and work
                                      addresses

  I am enquiring as                   Required: Organisation /
                                      Professional / Institution /
                                      Community

  What would you like help with?      Required, short multiline field

  Organisation or institution         Optional

  Phone                               Optional, include country code
  -----------------------------------------------------------------------

**Submit label** Send Enquiry

**Privacy text** We use these details to respond to your enquiry. Read
our Privacy Policy.

**Success message** Thank you. Your enquiry has been received.

**Success support** We will reply using the email address you provided.

**Error message** Your enquiry was not sent. Please try again or contact
us by email.

Use the success message only after the submission has been accepted by
the form service. Preserve entered values on an error. Label fields
above inputs, show inline error text, and link it to the relevant field.
Keep newsletter sign-up separate and optional. Do not promise a response
time without an agreed service standard.

## Footer copy

WinningThruChange®\
Humanized Organizational Change Management\
Training, coaching, and consulting for professionals, organisations, and
institutions.

Explore: Organizations \| Professionals \| Institutions \| The Catalyst
Circle\
Learn: Insights \| About \| Contact\
Legal: Privacy Policy \| Terms and Conditions\
Serving India, Sri Lanka, Bangladesh, the Middle East, and ASEAN.

Use verified contact details and current social profile links. Add the
legal entity line only after checking the registered name and its
relationship to the brand. Do not use a draft company name.

## Proposed destinations

  -----------------------------------------------------------------------
  Label                               Proposed route
  ----------------------------------- -----------------------------------
  Find Your Path                      /#choose-your-path

  Speak With Us / Discuss Your Change /#enquiry, with audience
  Initiative                          preselection where relevant

  Organisations / Professionals /     /organizations /professionals
  Institutions                        /institutions

  HCMBOK / Leadership / Coaching      /hcmbok-training
                                      /leadership-development /coaching

  Approach / About / Circle /         /our-approach /about
  Insights                            /the-catalyst-circle /insights
  -----------------------------------------------------------------------

# 10 Responsive layout and Node.js build rules

## Global layout

-   Set the content width to 1200px with 32px desktop gutters, 24px
    tablet gutters, and 20px mobile gutters. Test at 1440, 1024, 768,
    390, and 360px.

-   Use 88--96px section padding on desktop, 64px on tablet, and
    48--56px on mobile. Keep adjacent sections on the same surface
    visually grouped.

-   Use an 8px spacing system: 8, 16, 24, 32, 48, 64, 96. Limit
    paragraphs to around 60--70 characters per line.

-   Use three-column grids where space permits. At 768--1023px use two
    columns; let the last card span both if needed. Below 768px use a
    single column.

-   Switch the full navigation to a menu at the width where it no longer
    fits, likely below 1200px. Maintain a text label for the menu
    button.

## Mobile behaviour

Use one natural reading order in the page structure. Do not visually
reorder text in a way that differs from keyboard or screen reader order.
Stack hero copy, actions, then image. Keep headings free of forced line
breaks. Let long words wrap. Check that the HCMBOK mark does not break
headings.

Do not add a sticky bottom action by default. It can hide the form,
overlap consent controls, and reduce reading space. Keep header links
usable and anchor targets visible below the sticky header. Set scroll
margins for section anchors.

## Components and motion

Use 12px card corners, 8px button corners, and 16px image corners.
Prefer subtle borders to deep shadows. Keep icon style consistent at
24--32px. Treat decorative icons as hidden from assistive tools. No text
rendered inside images.

Use short colour transitions of about 150--200ms. Avoid scroll-reveal
effects that hide content until scripts run. Respect reduced-motion
settings. No auto-playing carousel or background video.

## Node.js implementation

-   Define the palette and type scale as global CSS custom properties.
    Use shared components for the header, hero, buttons, cards, and
    content slots.

-   Render one H1, H2 section headings and H3 card headings in semantic
    HTML. Use header, nav, main and footer landmarks.

-   Build named anchors choose-your-path and enquiry. Give links
    descriptive labels and keep text links underlined.

-   Use a labelled mobile menu that supports keyboard access, Escape to
    close, and focus return to the trigger. Test it in the published
    build.

-   Use actual button elements for forms and accordion toggles. Use
    links for navigation. Do not make entire containers clickable
    through script alone.

-   Load Lora 600 and Inter 400/500/600 in WOFF2 where supported. Avoid
    loading unused weights. Set a sensible serif and sans-serif
    fallback.

# 11 Search content and measurement

## SEO AEO and GEO content plan

**Suggested page title** OCM Training and Consulting \|
WinningThruChange

**Suggested meta description** Build practical change leadership skills
with WinningThruChange. Explore OCM training, HCMBOK programmes,
coaching, and organisational change consulting.

The hero keeps the agreed brand headline. The eyebrow and first
paragraph explicitly name Organizational Change Management. Use the full
term at first mention and OCM after that. Keep service terms in relevant
headings and links rather than repeating them in every paragraph.

Use clear definitions, direct FAQ answers, named authors, real examples,
and references where a claim needs support. Keep essential copy in
crawlable HTML. These choices help readers and search systems understand
the page. They do not guarantee rankings or citations in AI answers.

Google states that its AI search features use the same SEO foundations
and do not require special AI-specific markup. Do not promise "GEO
optimisation" through keyword repetition or hidden question blocks. Keep
FAQ content for visitors without relying on a rich-result outcome. \[2\]

## Structured data and indexing

Add accurate Organization and WebSite structured data using the live
domain, approved logo URL, and verified social profiles. Keep the person
biography on About linked to the organisation. Add course or article
data only to suitable detail pages with complete, visible information.
Never add invented ratings or qualifications.

Keep the staging site out of search while development continues. On
launch, make the production page indexable, set its self-referencing
canonical URL, include it in the XML sitemap, and verify Search Console.
Redirect replaced live URLs to relevant new pages. Do not leave a
production-wide noindex in place.

## Events and success measures

  -----------------------------------------------------------------------
  Event                   Useful fields           What it tells you
  ----------------------- ----------------------- -----------------------
  hero_path_click         Location                Whether visitors use
                                                  the main action

  audience_route_click    Organisation /          Which audience routes
                          Professional /          draw interest
                          Institution             

  programme_click         Programme and placement Which learning routes
                                                  get attention

  enquiry_start           Selected audience       Whether visitors begin
                                                  an enquiry

  enquiry_success         Audience and source     Accepted submissions
                          section                 

  enquiry_error           Error type only         Where forms fail
  -----------------------------------------------------------------------

Keep names, email addresses, and free-text answers out of analytics
events. Count a conversion after an accepted submission, not a click on
Send. Review qualified enquiries by audience, route clicks, and form
completion on mobile and desktop. Use traffic volume and business value
to decide whether a test is worthwhile.

Initial test priorities: audience label clarity, hero photo choice, and
form length. #F97316 is the default CTA colour. Any later colour test
must keep wording, layout, and traffic allocation consistent. Set the
sample requirement before testing and assess accepted enquiries and lead
quality alongside clicks.

# 12 Evidence accessibility and launch handoff

## Assets and facts to complete

  -----------------------------------------------------------------------
  Item                                What is needed before launch
  ----------------------------------- -----------------------------------
  Hero and founder photos             High-resolution images, suitable
                                      crops, and permissions

  HUCMI relationship                  Current authorised wording,
                                      territory scope, and logo
                                      permission

  Programme pages                     Active routes, fees, delivery,
                                      assessment, and awarding details

  Consulting scope                    Confirm the published support areas
                                      match current delivery

  Evidence cards                      Approved quotes or case records,
                                      attribution, and permissions

  Community                           Current offer, availability,
                                      inclusions, and working destination

  Insights                            Published articles with named
                                      authors and dates

  Contact and legal                   Working inbox, verified details,
                                      policies, and legal entity wording
  -----------------------------------------------------------------------

## Accessibility acceptance checks

Target WCAG 2.2 AA. Normal text needs at least 4.5:1 contrast, with 3:1
for qualifying large text. \[1\] Design buttons and menu controls at
least 44 × 44px as a practical touch target. Provide a skip link,
visible keyboard focus, sensible tab order, and useful image
descriptions. Decorative images should have empty alt text.

Check at 200% zoom and in a narrow viewport. Ensure content reflows
without horizontal scrolling. Test the menu, accordion, anchors, and
form by keyboard. Link validation messages to fields, announce
submission status, and do not use colour alone to communicate errors.
Check final colours after any transparency or overlays.

## Launch acceptance checks

-   Every CTA goes to a working, relevant page or enquiry destination.
    No draft URLs or empty links remain.

-   The homepage has one H1, no gold accents, no #FF4500 outside the
    logo, and consistent #F97316 actions. Primary CTA labels use
    #0F1621. On light surfaces, CTA buttons have a thin navy boundary.

-   Test form delivery end to end and confirm the reply address works.
    Confirm error handling as well as success.

-   Replace placeholder images. Set image dimensions to limit layout
    movement. Serve appropriately sized WebP or AVIF images where
    supported. Load the hero image promptly and lazy-load images below
    the fold.

-   Check the actual published page on mobile and desktop. Inspect
    readable type, menu overflow, image crops, focus, spacing, and form
    errors.

-   Verify page title, description, canonical URL, indexability,
    sitemap, and redirects. Check analytics events without sending
    personal form data.

-   Remove unapproved logos, unsupported statistics, sample quotes,
    unconfirmed service promises, and unpublished article cards.

## Design and copy references

Project basis: the revised WTC homepage discussions, the earlier
WinningThruChange Brand Colour Guidelines, and the SRR Gemini AI Chat
Transcript. Later decisions govern where the older documents conflict.
The older luxury-style copy is not carried into the public page because
it obscures the offer and narrows the audience.

\[1\] W3C, Understanding WCAG 2.2 Contrast Minimum.
https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

\[2\] Google Search Central, AI features and your website.
https://developers.google.com/search/docs/appearance/ai-features

Contrast ratios use solid sRGB colour pairs. Validate dimensions and
breakpoints in the deployed Node.js site on Hostinger.

# 13 Scheduled announcements and featured content

Use one publishing system for items that change between releases. An
editor chooses a content item, its placement and its dates. The website
reads published selections from the database.

## Homepage placements

  -----------------------------------------------------------------------
  Placement               Editor controls         Visitor experience
  ----------------------- ----------------------- -----------------------
  Hero greeting           Short message and       One slim strip. With no
                          required start and end  active message, the
                          dates                   normal hero starts at
                                                  the eyebrow.

  Upcoming HCMBOK® batch  Course, batch date,     Section 7 shows the
                          time zone, registration next open batch. At the
                          deadline and booking    deadline, the booking
                          link                    link disappears. The
                                                  programme links remain
                                                  available.

  Client logos            Approved image,         Section 9 shows
                          organisation name,      approved logos within
                          relationship,           their permission
                          permission expiry if    period. Omit the logo
                          applicable, display     row when empty.
                          order                   

  Featured insight        Select an existing      Section 12 leads with
                          published article,      the selected article.
                          preview and display     Otherwise show the
                          dates                   latest published
                                                  article. Hide the
                                                  section if there are
                                                  none.
  -----------------------------------------------------------------------

## Hero presentation

Example copy: "Wishing you and your team a happy Diwali." Use Inter at
14--16px, off-white text on card navy and 6--8px vertical padding. Allow
wrapping on small screens. Keep the existing H1 and the service
description directly beneath it so a CHRO can identify the offer in five
seconds.

Use a single 180ms fade-in when the strip appears. Serve the text in the
initial HTML. For reduced-motion preferences, display it immediately.
Keep greeting copy to one short sentence and reserve the filled orange
button for the main action.

## Admin workflow

In the private admin panel, choose a placement, enter copy or select an
existing item, set the display window, and preview the homepage at a
chosen date and time. Save a draft or publish. Show the editor whether
the item is draft, scheduled, live, expired or withdrawn. Allow
immediate withdrawal and edits to a live item.

Require an expiry for every announcement. Show the time zone beside both
date fields and reject an end date earlier than the start. Preview
overlapping entries and their display order before publication. Saving
or publishing content updates the database directly, without a code
change or deployment.

# 14 Hosting scheduling and launch tests

## Hosting and database

Use a Hostinger plan that supports Node.js web apps. MySQL is the
proposed database. Configure the app start command and database
credentials in hPanel. Keep credentials on the server. Deploy code
changes separately from editorial updates. Keep staging content and
credentials separate from production.

Render public pages on the server. Store reusable content records such
as articles, batches and approved logo assets separately from their
homepage placements. Each placement records its slot, content ID,
publication state, start time, exclusive end time, priority and update
timestamp. This lets an editor feature an article without copying its
text.

Protect admin routes with authenticated sessions and check editing and
publishing permissions on the server. Validate dates, links and uploaded
images before saving. Keep a change history showing who published or
withdrew each item. Back up the database and uploaded assets together.

## Scheduling rules

Use Asia/Kolkata for homepage scheduling and show IST in the editor.
Store timestamps in UTC. A published item is eligible when start ≤
current time \< end. For an inclusive end date, use midnight at the
start of the following local day as the exclusive end.

Example schedule, using 2026 for illustration: enter 29 October to 3
November. The greeting appears at 00:00 IST on 29 October and disappears
at 00:00 IST on 4 November. The editor enters it once. The same headline
and service description appear throughout.

Evaluate eligibility on each public request. Serve dynamic homepage HTML
with Cache-Control: no-store and bypass full-page CDN caching. Static
assets can be cached. For an open page, refresh the slot at the next
schedule boundary and when the tab regains focus. If the slot cannot
load, show the standard hero.

For single-item slots, choose the highest-priority eligible entry, then
the latest start, then the highest placement ID. Exclude withdrawn
entries, unpublished articles, closed batches and logos with expired
permission.

## Acceptance tests

Preview the Diwali schedule one minute before opening, at opening, late
on 3 November and at midnight on 4 November. Check the same boundaries
on an already-open page. Verify that the default hero has no empty
strip, that the H1 stays visible on mobile and that reduced motion
disables the fade.

Publish and withdraw an item from admin and reload the public homepage.
Confirm it changes without deployment. Test an overlap, a closed
registration, an expired logo and an unpublished featured article.
Verify the fallback for each slot and confirm a signed-out visitor
cannot edit or publish.

Hostinger setup reference:
https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/
