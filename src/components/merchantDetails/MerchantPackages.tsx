import {VStack} from 'native-base';
import React, {useEffect} from 'react';
import {
  Plan,
  selectProductState,
  useAppDispatch,
  productActions,
} from '@whenly/redux';
import {useSelector} from 'react-redux';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import MerchantPackageItem from './MerchantPackageItem';

interface PackagesProps {
  plans: Plan[];
}

export default function MerchantPackages({plans}: PackagesProps) {
  const appDispatch = useAppDispatch();
  useSelector(selectProductState);

  useEffect(() => {
    appDispatch(productActions.subscriptions());
  }, [appDispatch]);

  return (
    <VStack>
      {plans.length ? (
        plans.map((plan: Plan) => {
          return <MerchantPackageItem planData={plan} key={plan._id} />;
        })
      ) : (
        <EmptyListMessage
          message={
            "This merchant doesn't have available plans yet. Check back soon!"
          }
        />
      )}
    </VStack>
  );
}
