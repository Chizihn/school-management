import TeacherDetails from "@/components/TeacherDetails";

interface TeacherDetailsPageProps {
  params: {
    id: string; // `id` is directly a string, not a Promise
  };
}

export default async function TeacherDetailsPage({
  params,
}: TeacherDetailsPageProps) {
  const { id } = await params;

  return <TeacherDetails id={id} />;
}
