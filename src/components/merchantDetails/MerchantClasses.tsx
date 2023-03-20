import {VStack} from 'native-base';
import React, {useState} from 'react';
import {ClassData, selectProductState} from '@whenly/redux';
import {isSameDay} from 'date-fns';
import {useSelector} from 'react-redux';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import CalendarStrip from 'react-native-calendar-strip';
import MerchantClassItem from './MerchantClassItem';

interface ClassesProps {
  classes: ClassData[];
}

export default function MerchantClasses({classes}: ClassesProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const markedDays = (date) => {
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
        style={{height: 64}}
        selectedDate={selectedDate}
        markedDates={markedDays}
        onDateSelected={(date) => setSelectedDate(date.toDate())}
      />
      {classes.length ? (
        <>
          {filteredClasses.length ? (
            filteredClasses.map((c: ClassData) => {
              return <MerchantClassItem key={c._id} classData={c} />;
            })
          ) : (
            <EmptyListMessage
              message={`This merchant doesn't have classes on this date. \nTry a different day.`}
            />
          )}
        </>
      ) : (
        <EmptyListMessage
          message={`This merchant doesn't offer classes yet. \nCheck back soon!`}
        />
      )}
    </VStack>
  );
}
