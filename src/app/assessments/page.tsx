import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AssessmentsList } from "@/components/assessments/AssessmentsList";

export const metadata: Metadata = {
  title: "Assessments",
  description:
    "Take short, scored AI knowledge assessments and quizzes on AI Workbench, then earn a downloadable certificate for scoring 80 percent or higher overall.",
  openGraph: {
    title: "Assessments — AI Workbench",
    description:
      "Take short, scored AI knowledge assessments and quizzes on AI Workbench, then earn a downloadable certificate for scoring 80 percent or higher overall.",
    type: "website",
    siteName: "AI Workbench",
  },
};

export default function AssessmentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Assessments"
        title="Test your understanding"
        description="Short quizzes. Score 80% or higher to earn a certificate."
      />
      <AssessmentsList />
    </div>
  );
}
