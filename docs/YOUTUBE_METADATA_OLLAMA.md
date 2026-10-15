# Ollama + Qwen YouTube metadata extension

This optional module generates Thai YouTube titles and descriptions **from an existing ClipDraft**. It never uploads to YouTube or modifies ClipDraft.title.

## Setup

1. Start Ollama on your PC and check available Qwen models with \`ollama list\`.
2. Copy settings from \`.env.example\` to your local \`.env\` and set \`OLLAMA_BASE_URL\`; optionally set \`OLLAMA_MODEL\`. Leaving the model blank selects the first installed Qwen.
3. Run \`npx prisma migrate dev\` and \`npx prisma generate\`.
4. Start the NestJS API with \`npm run start:dev\`.
5. Set \`VITE_DEMO_MODE=false\` in the web app. Open an existing Clip Draft and click **AI YouTube Metadata**.

## Endpoints

- \`GET /api/v1/ai/ollama/models\`
- \`GET /api/v1/clips/:clipId/youtube-metadata\`
- \`POST /api/v1/clips/:clipId/youtube-metadata/generate\` with \`{ "model": "your-installed-qwen-name", "tone": "balanced" }\`
- \`PATCH /api/v1/clips/:clipId/youtube-metadata\` with editable \`selectedTitle\`, \`description\`, \`hashtags\`, \`tags\`

Generator reads transcript segments overlapping exactly the ClipDraft time range, takes a small sample of chat reactions, and uses the HighlightCandidate summary as supplemental context. Ollama JSON schema output is validated before saving; URL/credit lines are constructed from the stored Video record, never invented by the model. Generated text is a draft and should be reviewed before posting.

The draft is marked \`isStale\` if ClipDraft start/end timestamps change. Regenerate after changing clip boundaries. Ollama and the local machine must be running for generation to succeed.

### Limitations

- Text-only analysis; a scream does not establish what visually appeared.
- Long clips may exceed the 14,000-character transcript context budget. Only the first portion is used.
- A human should confirm names and event claims against the actual clip.
- Local Ollama is an unauthenticated service: do not expose it or your NestJS API directly to the public internet.
