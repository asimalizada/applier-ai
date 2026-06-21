# Applier AI Phases

## Goal

Build `Applier AI` step by step from an almost empty repo, with very small commits and clear delivery order.

## Working Rule

- every small step should be its own commit
- do not mix setup, docs, and features in one commit unless very small
- do not jump into AI or data modeling before the app flow is clear

## Phase 0: Bootstrap

Goal:

- turn the empty repo into a ready-to-start project

Steps:

1. add initial `README.md`
2. add `AGENTS.md`
3. finalize planning docs
4. initialize app scaffold

Suggested commits:

- `docs: add initial readme`
- `docs: add project working rules`
- `docs: add phased delivery plan`
- `chore: scaffold app`

## Phase 1: App Shell

Goal:

- create the first visible app without real AI logic

Steps:

1. create base page layout
2. add app title and description
3. add job description textarea
4. add primary action button
5. add empty preview area

Suggested commits:

- `feat: add base app layout`
- `feat: add hero and app intro`
- `feat: add job description input`
- `feat: add tailor action button`
- `feat: add empty preview sections`

## Phase 2: Static Preview Flow

Goal:

- make the app feel real using static placeholder data first

Steps:

1. add summary preview block
2. add skills preview block
3. add experience preview block
4. add cover letter placeholder block
5. connect button to mocked result state

Suggested commits:

- `feat: add summary preview section`
- `feat: add skills preview section`
- `feat: add experience preview section`
- `feat: add cover letter preview placeholder`
- `feat: connect tailor action to mock state`

## Phase 3: Review Flow

Goal:

- let the user review generated content before export

Steps:

1. make summary editable
2. make skills editable
3. make experience bullets editable
4. add clear review labels
5. add reset or regenerate action

Suggested commits:

- `feat: make summary editable`
- `feat: make skills editable`
- `feat: make experience editable`
- `feat: add review state labels`
- `feat: add reset and regenerate actions`

## Phase 4: AI Integration

Goal:

- replace mocked content with local AI generation

Steps:

1. add local AI integration setup
2. add tailor CV prompt logic
3. add structured AI response parsing
4. add validation for AI output
5. add error handling states

Suggested commits:

- `feat: add local ai integration`
- `feat: add cv tailoring prompts`
- `feat: parse ai response`
- `feat: validate generated content`
- `feat: handle ai generation errors`

## Phase 5: Cover Letter Generation

Goal:

- support optional cover letter generation

Steps:

1. add cover letter action
2. add cover letter prompt logic
3. show generated cover letter
4. make cover letter editable
5. add copy action

Suggested commits:

- `feat: add cover letter generate action`
- `feat: add cover letter prompt`
- `feat: render generated cover letter`
- `feat: make cover letter editable`
- `feat: add cover letter copy action`

## Phase 6: PDF Export

Goal:

- let the approved CV be exported as PDF

Steps:

1. create printable CV layout
2. bind tailored content to print layout
3. add export PDF action
4. verify print styling

Suggested commits:

- `feat: add printable cv layout`
- `feat: bind tailored content to pdf view`
- `feat: add pdf export action`
- `style: refine print layout`

## Phase 7: Polish

Goal:

- improve clarity, trust, and usability

Steps:

1. improve loading states
2. improve empty states
3. improve error messages
4. refine labels and wording
5. clean up layout and spacing

Suggested commits:

- `feat: improve loading states`
- `feat: improve empty states`
- `feat: improve error messages`
- `copy: refine interface wording`
- `style: polish layout and spacing`

## Build Order

1. bootstrap
2. app shell
3. static preview flow
4. review flow
5. AI integration
6. cover letter
7. PDF export
8. polish

## Immediate Next Step

Start with:

1. `README.md`
2. `AGENTS.md`
3. app scaffold

That is the cleanest way to begin.
