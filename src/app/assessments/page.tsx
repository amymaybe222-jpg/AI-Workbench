import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AssessmentsList } from "@/components/assessments/AssessmentsList";

export const metadata: Metadata = {
  title: "Assessments",
  description: "Short, scored quizzes that check your AI knowledge and award a certificate at 80% or above.",
};

export default function AssessmentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Assessments"
        title="Test your understanding"
        description="Each assessment is under 10 questions. Score 80% or higher to unlock a downloadable certificate for your portfolio."
      />
      <AssessmentsList />
    </div>
  );
}
