import {VStack, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ClassData,
  classActions,
  selectClassState,
  selectProductState,
  useAppDispatch,
} from '@whenly/redux';
import {isSameDay} from 'date-fns';
import {useSelector} from 'react-redux';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import CalendarStrip from 'react-native-calendar-strip';
import MerchantClassItem from './MerchantClassItem';
import {User} from '@types/alltypes';
import moment from 'moment';

interface ClassesProps {
  // classes: ClassData[];
  merchant: User;
}

const MerchantClasses = ({merchant}: ClassesProps) => {
  const appDispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {docs: classes} = useSelector(selectClassState);

  useEffect(() => {
    appDispatch(
      classActions.classes({
        createdBy: merchant.id,
        date: moment(selectedDate).format('YYYY-MM-DD'),
      }),
    );
  }, [appDispatch, merchant.id, selectedDate]);

  const markedDays = (date: any) => {
    if (date.isSame(selectedDate, 'day')) {
      return {
        dots: [
          {
            color: '#ffcc1a',
          },
        ],
      };
    }
  };

  const filteredClasses = classes.filter((c: ClassData) =>
    isSameDay(new Date(c.startsAt), new Date(selectedDate)),
  );

  return (
    <VStack>
      <CalendarStrip
        scrollable={true}
        startingDate={new Date()}
        minDate={new Date()}
        style={{height: 64}}
        selectedDate={selectedDate}
        markedDates={markedDays}
        onDateSelected={(date) => setSelectedDate(date.toDate())}
      />
      {classes.length ? (
        <View style={{marginBottom: 55}}>
          {filteredClasses.length ? (
            filteredClasses.map((c: ClassData) => {
              return <MerchantClassItem key={c._id} classData={c} />;
            })
          ) : (
            <EmptyListMessage
              message={`This merchant doesn't have classes on this date. \nTry a different day.`}
            />
          )}
        </View>
      ) : (
        <EmptyListMessage
          message={`This merchant doesn't offer classes yet. \nCheck back soon!`}
        />
      )}
    </VStack>
  );
};

export default MerchantClasses;
