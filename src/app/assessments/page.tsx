import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AssessmentsList } from "@/components/assessments/AssessmentsList";

export const metadata: Metadata = {
  title: "Assessments",
  description:
    "Take short, scored AI assessments and quizzes, then earn a downloadable certificate for scoring 80% or above.",
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
