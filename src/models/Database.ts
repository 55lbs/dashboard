import { supabase } from '@55lbs/supabase-client';

type CommonProps = {
  resetCache?: boolean;
};
type GetUserRecordCountProps = {
  exerciseId: number;
} & CommonProps;

export class Database {
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

    if (!resetCache || !hasCache) {
      const { data: userCountData } = await supabase
        .from('exercise')
        .select('user_records(count)')
        .eq('exercise_group_id', exerciseId);

      const userTotal =
        userCountData && userCountData.length && userCountData[0]
          ? userCountData[0].user_records[0].count
          : 0;

      Database.cache.get('getUserRecordCount').set(`${exerciseId}`, userTotal);
    }

    return Database.cache.get('getUserRecordCount').get(`${exerciseId}`);
  }
}
