import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {STYLES} from '../config/styles';
import {COLORS} from '../config';

const AuctionTimer = ({endDateTime}: {endDateTime: number}) => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = endDateTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft('00:00:00');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      setTimeLeft(
        `${
          days > 0 ? `${days}d ` : ''
        }${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [endDateTime]);

  return (
    <View style={styles.countDownContainer}>
      <Text style={STYLES.text.WorkSansBase}>{timeLeft}</Text>
    </View>
  );
};

export default AuctionTimer;

const styles = StyleSheet.create({
  countDownContainer: {
    opacity: 0.8,
    position: 'absolute',
    zIndex: 2,
    right: 24,
    top: 16,
    textAlignVertical: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.orange[0],
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
