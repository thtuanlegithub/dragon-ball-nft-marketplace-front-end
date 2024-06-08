import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {ethers} from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {STYLES} from '../../config/styles';
import CustomTextInput from '../../components/CustomTextInput';
import ControlButton, {ControlButtonMode} from '../../components/ControlButton';
import {SERVER_URL} from '../../utils/constants/server-url.constant';
import {setWalletInfo} from '../../services/slices/walletSlice';

const ImportWalletScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>(''); // [1

  const dispatch = useDispatch();

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('wallet', jsonValue);
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleImportWallet = async () => {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const balance = await axios.get(
      `${SERVER_URL}/wallet/balance/${wallet.address}`,
    );

    await storeData({
      address: wallet.address,
      balance: balance.data.data.balance,
      private_key: wallet.privateKey,
    });

    dispatch(
      setWalletInfo({
        address: wallet.address,
        balance: balance.data.data.balance,
        private_key: wallet.privateKey,
      }),
    );
  };
  return (
    <View style={STYLES.stackScreenContainer}>
      <Text style={{...STYLES.text.WorkSansH5, textAlign: 'center'}}>
        Import from Secret Recovery Phrase
      </Text>
      <View style={styles.formWrapper}>
        <CustomTextInput
          value={mnemonic}
          onChangeText={text => setMnemonic(text)}
          multiline={true}
          placeholder="Enter your Secret Recovery Phrase"
        />
        <ControlButton
          mode={ControlButtonMode.PRIMARY}
          content="Import Wallet"
          onPress={handleImportWallet}
        />
      </View>
    </View>
  );
};

export default ImportWalletScreen;

const styles = StyleSheet.create({
  formWrapper: {
    marginTop: 24,
    gap: 24,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
});
