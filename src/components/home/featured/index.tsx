import React, {useMemo} from 'react';
import {Image} from 'native-base';
import {metric} from '@whenly/theme/theme';

import Carousel from 'react-native-snap-carousel';

const Featured = () => {
  const sliderWidth = metric.fullWidth;
  const itemWidth = metric.fullWidth;

  const items = useMemo(() => {
    return [
      require('../../../assets/images/banner/1.png'),
      require('../../../assets/images/banner/2.png'),
      require('../../../assets/images/banner/3.png'),
    ];
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <Image
        source={item}
        alt="featured banner photo"
        height={(metric.fullWidth * 9) / 16}
        width={metric.fullWidth}
        style={{borderRadius: 8}}
        resizeMode="cover"
      />
    );
  };

  return (
    <Carousel
      data={items}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      loop
      autoplay
      autoplayInterval={5000} // 5 sec per image
      itemWidth={itemWidth - 80}
    />
  );
};

export default Featured;
