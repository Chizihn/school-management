import TeacherDetails from "@/components/Teacher/TeacherDetails";

interface TeacherDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TeacherDetailsPage({
  params,
}: TeacherDetailsPageProps) {
  const { id } = await params;

  return <TeacherDetails id={id} />;
}
