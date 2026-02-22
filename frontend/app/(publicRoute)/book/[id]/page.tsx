import { getUser } from '@/api/authService';
import BookDetails from './bookDetails';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const user = await getUser()

  return (
    <BookDetails id={id} user={user} />
  );
}
