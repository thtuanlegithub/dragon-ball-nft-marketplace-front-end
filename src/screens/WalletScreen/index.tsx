import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import {SCREEN} from '../../navigators/AppRoute';

import ControlButton, {ControlButtonMode} from '../../components/ControlButton';

const WalletScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.walletSetupWrapper}>
        <Text style={STYLES.text.WorkSansH5}>Wallet Setup</Text>
        <Text style={styles.importText}>
          Import an existing wallet or create a new one
        </Text>
      </View>
      <Image
        style={styles.walletImg}
        source={require('../../assets/images/wallet-icon.png')}
      />
      <View style={styles.btnWrapper}>
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
  walletSetupWrapper: {justifyContent: 'center', alignItems: 'center', gap: 16},
  importText: {...STYLES.text.WorkSansCaption, textAlign: 'center'},
  walletImg: {height: 300, width: 300, resizeMode: 'contain'},
  btnWrapper: {width: '100%', gap: 16},
});
