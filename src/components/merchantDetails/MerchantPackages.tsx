import {Button, HStack, Text, VStack, Box} from 'native-base';
import React, {useMemo} from 'react';
import {
  Plan,
  planActions,
  selectProductState,
  Subscription,
  useAppDispatch,
} from '@whenly/redux';
import Collapse from '@whenly/components/Collapse';
import {convertToCurrency} from '@whenly/utils/numbers';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {PLAN} from '@whenly/constants';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import MerchantPackageItem from './MerchantPackageItem';

interface PackagesProps {
  plans: Plan[];
}

export default function MerchantPackages({plans}: PackagesProps) {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const {subscriptions} = useSelector(selectProductState);

  console.log('PLANS', plans);

  const tags = useMemo(() => {
    const tagsArray: string[] = [];
    plans.forEach((plan: Plan) => {
      if (!tagsArray.includes(plan.tags)) tagsArray.push(plan.tags);
    });

    return tagsArray;
  }, [plans]);

  return (
    <VStack>
      {plans.length ? (
        plans.map((plan: Plan) => {
          return <MerchantPackageItem planData={plan} key={plan._id} />;
        })
      ) : (
        <EmptyListMessage
          message={`This merchant doesn't have available plans yet. Check back soon!`}
        />
      )}
    </VStack>
  );
}
