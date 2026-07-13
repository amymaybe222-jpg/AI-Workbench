-- Seed the remaining prompts from src/data/prompts.ts (5 of ~32 were
-- already seeded in migration 0002; this adds the rest).
insert into public.prompts (id, title, category, tool, description, prompt_text, tags, created_at)
values
  ('54a715c1-8f7b-4eab-8657-4705e126df46', 'Generate unit tests for a function', 'Engineering', 'GitHub Copilot or Claude', 'Get a starting set of unit tests, including edge cases you might not think of.', 'Write unit tests for the function below using [testing framework, e.g. Jest / pytest].

Cover:
- Typical/expected inputs
- Edge cases (empty input, null/undefined, boundary values)
- At least one failure case that should throw or return an error

Function:
[paste function]

Return only the test file contents, with brief comments explaining each test''s purpose.', array['testing', 'quality'], now()),
  ('86339eb4-e9e9-4cb4-9432-6310b91f796f', 'Draft a pull request description', 'Engineering', 'Claude or ChatGPT', 'Turn a diff and some context into a clear, reviewable PR description.', 'Write a pull request description based on the change summary below.

Structure:
- **Summary**: what changed and why (2-3 sentences)
- **Changes**: bullet list of the concrete changes
- **Testing**: how this was verified
- **Risk / rollback**: anything a reviewer should watch for, and how to roll back if needed

Context:
[paste your rough notes or diff summary]', array['pull request', 'documentation'], now()),
  ('ef909158-76b3-4e06-a9c3-4cbe45adf34d', 'Debug an error message', 'Engineering', 'Claude or GitHub Copilot', 'Get a structured hypothesis list for a confusing error or stack trace.', 'I''m seeing the following error and I''m not sure of the root cause:

Error:
[paste error/stack trace]

Relevant code:
[paste relevant code]

Give me:
1. The most likely cause, in plain language
2. 2-3 alternative causes, ranked by likelihood
3. A specific next step to confirm or rule out each one', array['debugging', 'troubleshooting'], now()),
  ('b5185e0f-7bb2-468a-888b-52e7563cd3ca', 'Reply to a frustrated customer', 'Customer Support', 'Claude or ChatGPT', 'Draft an empathetic, clear response to a customer complaint.', 'Draft a support reply to the customer message below. Tone: empathetic, calm, and solution-focused — acknowledge their frustration without being overly apologetic or robotic.

Include:
- A brief acknowledgment of the specific issue
- A clear explanation of what we''re doing about it (or will need to check)
- A concrete next step and timeframe

Customer message:
[paste customer message]

Context on our side (what happened, what we can offer):
[paste internal context]', array['support reply', 'tone'], now()),
  ('be3a720d-ed49-48dc-a0e1-450d4636bc1f', 'Summarize a support ticket for escalation', 'Customer Support', 'Claude', 'Turn a long back-and-forth ticket into a concise escalation summary for engineering.', 'Summarize the support ticket thread below so I can escalate it to engineering.

Format:
- Customer impact (1-2 sentences, plain language)
- Steps to reproduce (numbered, if identifiable from the thread)
- What''s already been tried
- Urgency/severity, with reasoning

Ticket thread:
[paste ticket thread]', array['escalation', 'summarization'], now()),
  ('b4dd5119-a7f8-4340-8e36-aba3a2091293', 'Build a macro/canned response library', 'Customer Support', 'Claude or ChatGPT', 'Draft reusable response templates for common support scenarios.', 'Draft 3 canned response templates for our support team covering these common scenarios: [list scenarios, e.g. "refund request", "login issue", "feature not working as expected"].

For each template:
- Use a friendly, professional tone consistent with our brand voice: [describe brand voice]
- Include a placeholder in [brackets] wherever specific details need to be filled in
- Keep each under 120 words', array['templates', 'efficiency'], now()),
  ('4fb84340-4bde-40d8-81cc-391024a9f922', 'Turn support tickets into a FAQ', 'Customer Support', 'Claude', 'Identify recurring themes across many tickets and draft FAQ entries.', 'Below are summaries of recent support tickets. Identify the 5 most common themes or questions, and for each one draft a short FAQ entry (question + answer, 2-3 sentences).

Ticket summaries:
[paste list of ticket summaries]', array['faq', 'knowledge base'], now()),
  ('0b2d5d8c-fc64-4e97-b8a5-ab707338835d', 'Draft an all-hands announcement', 'Leadership', 'Claude', 'Communicate a significant change to the whole company clearly and with the right tone.', 'Draft an all-hands announcement about the following change: [describe the change, e.g. reorg, new product launch, policy update].

Requirements:
- Open with the headline, not a long preamble
- Explain the "why" behind the decision in plain language
- Address the most likely question or concern employees will have
- Close with what happens next and where to ask questions
- Tone: direct, honest, and calm — avoid corporate jargon

Keep it under 300 words.', array['comms', 'change management'], now()),
  ('5558defc-7dd4-450a-81ae-bb1622e71963', 'Prepare talking points for a difficult 1:1', 'Leadership', 'Claude', 'Structure a sensitive performance conversation before it happens.', 'Help me prepare for a 1:1 conversation about [describe the situation, e.g. a performance concern, a missed deadline, team conflict].

Give me:
1. A short framing statement to open the conversation
2. 3-4 specific, factual points to raise (not vague generalities)
3. Questions to ask to understand their perspective
4. A constructive way to close with clear next steps

Keep the tone direct but supportive, not accusatory.', array['1:1s', 'management'], now()),
  ('3b00146c-c0f1-41c1-8a8e-e23a4ebb0f53', 'Summarize quarterly results for the board', 'Leadership', 'Claude', 'Turn detailed internal metrics into a board-ready narrative summary.', 'Turn the raw metrics and notes below into a board-ready summary of this quarter''s performance.

Structure:
- Headline result (1 sentence)
- 3-4 supporting metrics with brief context on why each matters
- One key risk or challenge, stated plainly
- One forward-looking priority for next quarter

Tone: confident but honest — do not spin weak results as positives.

Raw metrics/notes:
[paste data and notes]', array['board update', 'reporting'], now()),
  ('30128c2f-7f58-4438-9f50-8df05db35c56', 'Draft a team charter or working agreement', 'Leadership', 'Claude or ChatGPT', 'Create a first draft of a team''s operating norms for the team to react to and edit.', 'Draft a one-page team working agreement for a [team type, e.g. product engineering] team of [size] people.

Cover:
- Core working hours / response-time expectations
- Meeting norms (which meetings are mandatory, async-first practices)
- Decision-making approach (who decides what, and how disagreements are resolved)
- Communication channels and when to use each

Write it as a draft for the team to discuss and edit, not a final policy.', array['team norms', 'management'], now()),
  ('6b088f1c-eaf0-4909-89cd-095fc7920091', 'Explain a dataset in plain language', 'Data & Analytics', 'ChatGPT or Claude', 'Get a non-technical summary of what a spreadsheet or dataset shows.', 'I''m going to describe a dataset. Explain, in plain language for a non-technical stakeholder, what the data likely shows and what questions it can and can''t answer.

Dataset description / columns:
[paste column names and a few sample rows]

Context: this data is used for [describe purpose, e.g. tracking support ticket volume].', array['data literacy', 'reporting'], now()),
  ('d10686ff-382f-48e5-8e63-2d18fd1089d2', 'Write a SQL query from a plain-language request', 'Data & Analytics', 'ChatGPT or Claude', 'Translate a business question into a starting SQL query against your schema.', 'Write a SQL query ([dialect, e.g. PostgreSQL]) that answers this question: [describe the question, e.g. "monthly active users by plan tier for the last 6 months"].

Relevant schema:
[paste table/column names]

Return the query with inline comments explaining each part, and note any assumptions you had to make about the schema.', array['sql', 'analytics'], now()),
  ('dafa9536-ed16-4e41-a4b3-ecfaf1ed225a', 'Turn a metrics table into an executive summary', 'Data & Analytics', 'Claude', 'Translate a raw metrics table into 3-4 sentences a non-analyst can act on.', 'Here is a table of metrics: [paste table].

Write a 3-4 sentence executive summary that:
- States the single most important trend
- Notes any anomaly or outlier worth investigating
- Avoids jargon — assume the reader is a non-technical stakeholder
- Suggests one concrete next step', array['reporting', 'kpis'], now()),
  ('67e1bfe1-40d5-4a83-923c-9be7b43b2f3d', 'Design a simple A/B test', 'Data & Analytics', 'Claude', 'Get a structured starting plan for testing a hypothesis.', 'Help me design an A/B test for this hypothesis: [describe hypothesis, e.g. "a shorter signup form increases conversion"].

Include:
- The primary metric and 1-2 guardrail metrics
- A suggested sample size / duration approach (in general terms, not exact stats)
- Risks of the test (novelty effects, seasonality, etc.)
- What result would count as a clear win vs. inconclusive', array['experimentation', 'product analytics'], now()),
  ('2f0d91b1-4024-47e3-8298-43ee808b95ea', 'Draft a product launch announcement', 'Marketing & Comms', 'ChatGPT or Claude', 'Create a first draft of a launch announcement for a new feature or product.', 'Draft a product launch announcement for [product/feature name].

Audience: [describe audience, e.g. existing customers / prospects]
Key benefit: [describe the main value proposition]
Supporting details: [list 2-3 supporting points or features]

Format as a short blog-style post: headline, 1-paragraph intro, bullet list of key benefits, closing call-to-action. Tone: confident and clear, avoid hype words like "revolutionary" or "game-changing".', array['launch', 'copywriting'], now()),
  ('4c4c5dd1-d67a-4dd2-9728-0dad8f5b3706', 'Repurpose a blog post into social copy', 'Marketing & Comms', 'ChatGPT', 'Turn one piece of long-form content into several short social posts.', 'Turn the article below into:
1. Three short LinkedIn post variations (each under 100 words, professional tone)
2. One Twitter/X thread outline (5 tweets, punchy and direct)

Article:
[paste article text or summary]', array['social media', 'repurposing'], now()),
  ('8e96b992-f72f-4d0b-97d7-783728cb2609', 'Write subject lines for an email campaign', 'Marketing & Comms', 'ChatGPT', 'Generate and rank subject line options for an email send.', 'Generate 8 subject line options for an email about: [describe the email content/offer].

For each, keep it under 60 characters. Then rank the top 3 you''d test first, with a one-line reason for each choice (e.g. curiosity, urgency, clarity).', array['email marketing', 'copywriting'], now()),
  ('f80f07be-24a3-4866-8da7-cf898f8ccdaf', 'Create a mood board brief for visuals', 'Marketing & Comms', 'Midjourney', 'Generate image prompts for a campaign''s visual direction.', 'Generate 4 image-generation prompts for a mood board for a campaign about: [describe campaign/theme].

Each prompt should specify: subject, color palette, lighting, and overall mood/style (e.g. "minimalist", "bold and energetic", "warm and human"). Vary the direction across the 4 so we have real options to react to.', array['visual design', 'campaign'], now()),
  ('8d5c547b-8f83-4c47-ba18-46f1927cc400', 'Draft a job description', 'People & HR', 'Claude or ChatGPT', 'Create a clear, inclusive job description from a rough set of requirements.', 'Draft a job description for a [role title] role on the [team name] team.

Must-have requirements: [list]
Nice-to-haves: [list]
Key responsibilities: [list]

Use clear, inclusive language — avoid gendered or overly aggressive phrases like "rockstar" or "ninja", and avoid inflating requirements beyond what''s actually needed for the role.', array['recruiting', 'job description'], now()),
  ('b565359d-5801-453e-9066-0d7a9b3e22a0', 'Draft onboarding checklist for a new hire', 'People & HR', 'Claude or Notion AI', 'Create a first-week and first-month onboarding plan.', 'Draft an onboarding checklist for a new [role title] joining the [team name] team.

Structure it as:
- Before day 1 (setup tasks)
- Week 1 (goals: orientation and access)
- Weeks 2-4 (goals: first small contribution)
- 90-day check-in goals

Keep each item action-oriented and specific enough that a manager could hand this to the new hire directly.', array['onboarding', 'checklist'], now()),
  ('6395e580-575e-48e9-8e75-b11ed109f50d', 'Summarize employee survey feedback', 'People & HR', 'Claude', 'Identify themes across open-text engagement survey responses.', 'Below are open-text responses from an employee engagement survey. Identify the 4-5 most common themes (positive and negative), and for each theme give 1-2 representative quotes (paraphrased, anonymized) and a suggested action.

Responses:
[paste survey responses]', array['engagement survey', 'feedback'], now()),
  ('f44cc29c-5e78-441d-bb66-fa588e66516b', 'Draft interview questions for a role', 'People & HR', 'Claude or ChatGPT', 'Generate structured, role-specific interview questions and what to listen for.', 'Draft 6 interview questions for a [role title] interview, focused on assessing [key skill/competency, e.g. "cross-team collaboration"].

For each question, include a one-line note on what a strong answer typically demonstrates, so interviewers can calibrate what they''re listening for.', array['interviewing', 'hiring'], now()),
  ('1606fcd0-d89e-4e11-82f0-c8b4c50ea860', 'Draft a cold outreach email', 'Sales', 'ChatGPT or Claude', 'Write a short, personalized outreach email that doesn''t sound like a template.', 'Draft a cold outreach email to [describe prospect/role, e.g. "a VP of Engineering at a mid-size SaaS company"].

What we offer: [describe product/value proposition]
Why this prospect specifically: [describe relevant trigger, e.g. recent funding round, hiring surge, tech stack]

Requirements: under 120 words, no generic flattery, one clear call-to-action, and a tone that sounds like a real person, not a template.', array['outreach', 'prospecting'], now()),
  ('99f697cc-a18b-48c1-b093-1bc66bd64f25', 'Prepare for a discovery call', 'Sales', 'Claude', 'Build a structured question list ahead of a first prospect call.', 'Help me prepare for a discovery call with [describe prospect and what we know about them].

Give me:
- 5 open-ended discovery questions to understand their current process and pain points
- 2 questions to uncover budget/timeline without being blunt about it
- A short list of things to listen for that would indicate strong or weak fit', array['discovery call', 'prospecting'], now()),
  ('ecf4475a-cd53-4a70-bf75-1774090afcb0', 'Summarize a sales call for CRM notes', 'Sales', 'Claude or ChatGPT', 'Turn a call transcript or rough notes into structured CRM-ready notes.', 'Turn the call notes below into structured CRM notes.

Format:
- Summary (2-3 sentences)
- Pain points mentioned
- Objections raised
- Next steps and owner
- Deal risk level (low/medium/high) with a one-line reason

Call notes:
[paste rough notes or transcript]', array['crm', 'call notes'], now()),
  ('d0e38be3-6aa9-4cfb-afed-d473defb2883', 'Handle a common objection', 'Sales', 'Claude or ChatGPT', 'Prepare a thoughtful response to a recurring sales objection.', 'A prospect raised this objection: "[paste objection, e.g. ''your product is more expensive than Competitor X'']".

Draft a response that:
- Acknowledges the concern genuinely, without being dismissive
- Reframes around value rather than just defending price
- Ends with a question that re-engages the conversation

Keep it conversational — this is for a live call, not an email.', array['objection handling', 'negotiation'], now())
on conflict (id) do nothing;
