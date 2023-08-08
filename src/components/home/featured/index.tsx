import React, {useMemo} from 'react';
import {Image} from 'native-base';
import {metric} from '@whenly/theme/theme';

import Carousel from 'react-native-snap-carousel';

const Featured = () => {
  const sliderWidth = metric.fullWidth;
  const itemWidth = metric.fullWidth;

  const items = useMemo(() => {
    return [
      require('../../../assets/images/banner/1v2.png'),
      require('../../../assets/images/banner/2.png'),
      require('../../../assets/images/banner/3v2.png'),
    ];
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <Image
        source={item}
        alt="featured banner photo"
        height={(metric.fullWidth * 9) / 16}
        width={metric.fullWidth}
        // style={{borderRadius: 8}}
        resizeMode="cover"
      />
    );
  };

  return (
    // <Carousel
    //   data={items}
    //   renderItem={_renderItem}
    //   sliderWidth={sliderWidth}
    //   loop
    //   autoplay
    //   autoplayInterval={5000} // 5 sec per image
    //   itemWidth={itemWidth}
    // />
    // Single image full banner
    <Image
      source={require('../../../assets/images/banner/1v2.png')}
      style={{width: metric.fullWidth, height: (metric.fullWidth * 9) / 16}}
    />
  );
};

export default Featured;
