import { CommunityPost } from "@/types";

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    title: "Cut our sprint retro prep time from 30 min to 5 using Claude",
    author: "Priya Nair",
    role: "Engineering Manager",
    team: "Platform",
    body:
      "I used to spend a solid 30 minutes before every retro pulling together what shipped, what slipped, and rough themes from standup notes. I started pasting our raw Slack standup thread into Claude with a prompt asking for 'what shipped, what's blocked, and recurring themes across the week' and it gets me 90% of the way there in one pass. I still read through and adjust, but it's a huge time save. Happy to share the exact prompt if useful.",
    tags: ["engineering", "productivity", "retros"],
    createdAt: "2026-06-18T09:12:00.000Z",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: "Daniel Osei",
        role: "Senior Engineer",
        body: "Would love the exact prompt — we do the same thing manually every sprint.",
        createdAt: "2026-06-18T10:03:00.000Z",
      },
      {
        id: "c2",
        author: "Priya Nair",
        role: "Engineering Manager",
        body: "Posted it in the Prompt Library under Productivity — search 'meeting notes'.",
        createdAt: "2026-06-18T11:47:00.000Z",
      },
    ],
  },
  {
    id: "post-2",
    title: "Using GitHub Copilot chat for onboarding into a legacy repo",
    author: "Marcus Lee",
    role: "Software Engineer II",
    team: "Payments",
    body:
      "Joined the payments team last month and the codebase has almost no comments. Instead of pinging teammates for every question, I've been asking Copilot Chat to explain functions and files before I dig deeper myself. It's dramatically cut down how many 'dumb question' Slack messages I send, and I actually retain the explanations better than a quick verbal answer in a meeting.",
    tags: ["engineering", "onboarding", "github-copilot"],
    createdAt: "2026-06-20T14:30:00.000Z",
    likes: 31,
    comments: [
      {
        id: "c3",
        author: "Aisha Rahman",
        role: "Staff Engineer",
        body: "Good approach — just make sure to still verify against tests, Copilot's explanations of *intent* aren't always right even when the code summary is.",
        createdAt: "2026-06-20T15:02:00.000Z",
      },
    ],
  },
  {
    id: "post-3",
    title: "AI-assisted first drafts for support macros — feedback wanted",
    author: "Jordan Kim",
    role: "Customer Support Lead",
    team: "Support",
    body:
      "Drafted a first pass of 8 new canned responses using one of the Prompt Library templates and tightened the tone with two rounds of feedback. Sharing here before we roll these out team-wide — would appreciate a gut check from anyone outside Support on whether the tone reads as genuine rather than corporate. Linking the draft doc in the comments.",
    tags: ["support", "feedback wanted", "templates"],
    createdAt: "2026-06-22T08:05:00.000Z",
    likes: 12,
    comments: [
      {
        id: "c4",
        author: "Priya Nair",
        role: "Engineering Manager",
        body: "Read through these — they read well to me, not robotic at all. Nice work.",
        createdAt: "2026-06-22T09:15:00.000Z",
      },
      {
        id: "c5",
        author: "Sofia Almeida",
        role: "Support Specialist",
        body: "Agreed, though I'd shorten the refund one slightly — customers skim past long ones.",
        createdAt: "2026-06-22T10:40:00.000Z",
      },
    ],
  },
  {
    id: "post-4",
    title: "Passed the Prompt Engineering assessment — here's what surprised me",
    author: "Tomasz Nowak",
    role: "Product Manager",
    team: "Growth",
    body:
      "Took the Prompt Engineering Basics assessment this morning (scored 86%). The question about iterating with follow-ups instead of restarting a conversation actually changed how I work — I used to open a fresh chat every time a response wasn't quite right. Small habit change, noticeably better outputs since.",
    tags: ["assessments", "learning", "prompt-engineering"],
    createdAt: "2026-06-25T16:20:00.000Z",
    likes: 18,
    comments: [
      {
        id: "c6",
        author: "Marcus Lee",
        role: "Software Engineer II",
        body: "Same habit here, definitely underrated tip.",
        createdAt: "2026-06-25T17:02:00.000Z",
      },
    ],
  },
  {
    id: "post-5",
    title: "Perplexity for competitor research ahead of QBRs",
    author: "Elena Petrova",
    role: "Sales Director",
    team: "Enterprise Sales",
    body:
      "Ahead of quarterly business reviews I use Perplexity to pull a quick, cited snapshot of what our top accounts' competitors have shipped recently. Having the citations means I can actually drop the source link into the QBR deck instead of a vague 'AI said so' bullet. Much faster than my old process of manually checking 5 different competitor blogs.",
    tags: ["sales", "research", "perplexity"],
    createdAt: "2026-06-27T11:00:00.000Z",
    likes: 9,
    comments: [],
  },
];
