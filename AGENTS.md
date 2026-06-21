# AGENTS.md

## Project

`Applier AI` is a CV tailoring assistant.

The app should:

- accept a job description
- tailor an existing base CV
- improve `summary`, `skills`, and `experience` alignment
- optionally generate a cover letter
- export the final CV as PDF

## Product Rules

- this is not a fully generative resume builder
- generated content must stay truthful
- experience edits must stay small and controlled
- the user must review generated content before final export

## Build Rules

- work in very small steps
- each step should become a separate git commit
- do not mix unrelated work in one commit
- prefer planning and flow clarity before implementation detail

## Current Delivery Order

1. bootstrap the repo
2. scaffold the app
3. build a mock flow first
4. integrate local AI
5. add cover letter generation
6. add PDF export
7. polish UX

## Technical Direction

- frontend: `Next.js + TypeScript`
- styling: `Tailwind CSS`
- AI: local `Ollama + Qwen3`
- output: `PDF`

## Design Direction

- avoid generic SaaS styling
- avoid obvious AI-generated visual patterns
- prefer a premium, calm, and polished interface
- keep the product visually professional and trustworthy
- use strong typography, clean spacing, and restrained color usage
- the UI should feel intentional, not templated
- do not fill screens with meaningless filler text or fake marketing copy

## AI Safety Rules

- do not invent experience
- do not invent achievements
- do not invent skills
- do not change company names, titles, or dates
- prefer constrained rewriting over creative rewriting

## Collaboration Note

When making changes:

- keep them easy to review
- keep commits small
- preserve the agreed MVP scope
