import { supabase } from '@55lbs/supabase-client';

import { Prisma, PrismaClient } from '@prisma/client';

type CommonProps = {
  resetCache?: boolean;
};
type GetUserRecordCountProps = {
  exerciseId: number;
} & CommonProps;

type GetExerciseTopResultsProps = {
  exerciseId: number;
} & CommonProps;

export class Database {
  private static prisma = new PrismaClient({ log: ['info'] });
  private static cache = new Map<string, Map<string, unknown>>();

  static async getUserRecordCount({
    exerciseId,
    resetCache = false,
  }: GetUserRecordCountProps) {
    if (!Database.cache.has('getUserRecordCount')) {
      Database.cache.set('getUserRecordCount', new Map());
    }

    const hasCache = Database.cache
      .get('getUserRecordCount')
      .has(`${exerciseId}`);

    console.log('CHECK CACHE', { exerciseId, hasCache });

    if (resetCache || !hasCache) {
      console.log('FETCHING FROM DB', { exerciseId });
      const userId = (await supabase.auth.getSession()).data.session.user.id;

      const [{ count: userRecordCount }] = await this.prisma.$queryRaw<
        [
          {
            count: number;
          },
        ]
      >(Prisma.sql`select count(user_records.id) as count
      from exercise
      inner join user_records on exercise.id = user_records.exercise_id
      where  exercise_group_id = ${exerciseId} and user_records.user_id = ${userId}::uuid`);

      const userTotal = userRecordCount ?? 0;

      Database.cache.get('getUserRecordCount').set(`${exerciseId}`, userTotal);
    }

    return Database.cache.get('getUserRecordCount').get(`${exerciseId}`);
  }

  static async getExerciseTopResults({
    exerciseId,
  }: GetExerciseTopResultsProps) {
    const sql = Prisma.sql`select value::int
    from user_records
    where exercise_id = ${exerciseId}
    order by value::int desc
    limit 100`;
  }
}
