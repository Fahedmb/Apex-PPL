import { workouts } from '@/data/workouts';
import { notFound } from 'next/navigation';
import WorkoutDetail from './WorkoutDetail';

export function generateStaticParams() {
  return workouts.map((w) => ({ id: w.id }));
}

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetail workout={workout} />;
}
