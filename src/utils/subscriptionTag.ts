import {useSelector} from 'react-redux';
import {selectSubscriptionTags} from '@whenly/redux';

export const SubscriptionTag = (tags) => {
  let subscriptions = useSelector(selectSubscriptionTags);
  subscriptions = subscriptions
    .filter((sub) => sub.status === 'active')
    .map((sub) => {
      // trim
      let subss = sub.tags.map((t: string) => t.trim().toLocaleLowerCase());
      const classTags = tags
        .split(',')
        .map((t: string) => t.trim().toLocaleLowerCase());
      subss = subss.filter((s) => classTags.includes(s));
      return {...sub, count: subss.length};
    });
  console.log('subscriptions:tags', tags);
  console.log('subscriptions', subscriptions);
  subscriptions = subscriptions
    .sort((a, b) => b.count - a.count || a.sessions - b.sessions)
    .filter((v) => v.count > 0);
  return subscriptions[0];
};
