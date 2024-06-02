import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import ControlButton, {ControlButtonMode} from '../../components/ControlButton';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../navigators/AppRoute';

const WalletScreen = () => {
  const navigation = useNavigation();
  const wallet = useSelector((state: RootState) => state.wallet);
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 16}}>
        <Text style={STYLES.text.WorkSansH5}>Wallet Setup</Text>
        <Text style={{...STYLES.text.WorkSansCaption, textAlign: 'center'}}>
          Import an existing wallet or create a new one
        </Text>
      </View>
      <Image
        style={{height: 300, width: 300, resizeMode: 'contain'}}
        source={require('../../assets/images/wallet-icon.png')}
      />
      <View style={{width: '100%', gap: 16}}>
        <ControlButton
          onPress={() => navigation.navigate(SCREEN.IMPORT_WALLET)}
          mode={ControlButtonMode.SECONDARY}
          content="Import using Secret Recovery Phrase"
        />
        <ControlButton
          onPress={() => navigation.navigate(SCREEN.CREATE_WALLET)}
          mode={ControlButtonMode.PRIMARY}
          content="Create a new wallet"
        />
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 90,
  },
});
