import { Code, Layers, LucideIcon, Target } from "lucide-react";

export type JobRole = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  formUrl: string;
  longDesc?: string;
  color: string;
};

export const jobRoles: JobRole[] = [
  {
    id: "meta-expert",
    title: "Meta Expert",
    description: `REQUIREMENTS:
• Meta Ads (3+ years of active hands-on experience)
• Sales & Lead Generation campaigns with strong campaign structure optimization
• AI-powered creative production (UGC, videos, banners, landing page assets)
• Funnel strategy & CRO (user journey optimization, friction reduction)
• Tracking & Attribution (CAPI + third-party tracking tools)
• MER-focused scaling (horizontal & vertical growth strategies)
• Creative & copy optimization (thumb-stop, hold rate, performance-driven angles)
• Strong understanding of compliance-safe performance marketing strategies

ON-SITE JOB – MULTAN
MARKET COMPETITIVE SALARY
GOOD WORK ENVIRONMENT`,
    icon: Target,
    formUrl:
      "https://docs.google.com/forms/d/1nWgjYPts7MH1s42vgEUGwO3ZFTvH9Zwq21RUP6P2RGs/viewform?embedded=true",
    longDesc:
      "As a Meta Expert, you will be responsible for driving our digital marketing strategies using Meta Ads platform. You will work on campaign optimization, creative production, and scaling strategies to maximize ROI and MER.",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "php-developer",
    title: "PHP Developer",
    description: `WHAT WE NEED:
• Build & manage funnels and prelanders in PHP
• Keitaro setup & management (campaigns, postbacks, flows)
• CRM API integration & debugging
• Tracking logic & lead delivery troubleshooting

REQUIRED SKILLS:
• Strong PHP knowledge (funnel-level)
• Keitaro experience (not just basic trackers)
• CRM API integrations & tracking logic
• Performance marketing flow experience

BONUS IF YOU HAVE:
• Experience with Meta / Google ads
• Deduplication / tracking accuracy skills
• Basic frontend skills (HTML/CSS/JS)

ON-SITE JOB - MULTAN`,
    icon: Code,
    formUrl:
      "https://docs.google.com/forms/u/0/d/1H325Rm1RZExTrkDrdqk5AZgx9nB4kX8RLfjrCQA_4Z4/viewform?embedded=true",
    longDesc:
      "As a PHP Developer, you will build and maintain high-performance funnels, integrate with tracking systems like Keitaro, and ensure smooth lead delivery processes for our performance marketing campaigns.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: `REQUIREMENTS:
• MERN Stack (MongoDB, Express, React, Node.js)
• Python & Next.js Experience
• Build Casino & Betting Platforms
• 3+ Years of Development
• Scalable Backend Systems
• AWS, Docker, CI/CD
• Real-Time APIs & Automation
• High-Traffic & Cloud Deployments

SALARY: 400-600$ MONTHLY
ON-SITE JOB - MULTAN

iGaming Industry | Casino Platforms`,
    icon: Layers,
    formUrl:
      "https://docs.google.com/forms/d/1tB42PiJLC2QlaFRSaUXQX_A9uBCTIGlL9qQV3EUPFsM/viewform?embedded=true",
    longDesc:
      "As a Full Stack Developer, you will be responsible for developing and maintaining high-traffic casino and betting platforms using MERN stack, Next.js, and cloud technologies for our iGaming division.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export function getJobById(id: string): JobRole | undefined {
  return jobRoles.find((job) => job.id === id);
}
