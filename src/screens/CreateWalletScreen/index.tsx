import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Clipboard,
} from 'react-native';

import {STYLES} from '../../config/styles';
import ControlButton, {ControlButtonMode} from '../../components/ControlButton';
import {COLORS} from '../../config';
import {SERVER_URL} from '../../utils/constants/server-url.constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ethers} from 'ethers';
import {useDispatch} from 'react-redux';
import {setWalletInfo} from '../../services/slices/walletSlice';

const CreateWalletScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');

  const dispatch = useDispatch();

  const handleCreateWallet = async () => {
    try {
      // const wallet = ethers.Wallet.createRandom();
      await axios.post(`${SERVER_URL}/wallet`).then(res => {
        setMnemonic(res.data.data.wallet.mnemonic.phrase);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('wallet', jsonValue);
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleImportWallet = async (wallet: {
    address: string;
    balance: number;
    privateKey: string;
  }) => {
    await storeData({
      address: wallet.address,
      balance: Number(wallet.balance),
      private_key: wallet.privateKey,
    });

    dispatch(
      setWalletInfo({
        address: wallet.address,
        balance: wallet.balance,
        private_key: wallet.privateKey,
      }),
    );
  };

  const handleStoreWallet = async () => {
    try {
      await axios({
        method: 'post',
        url: `${SERVER_URL}/wallet/storeWallet`,
        data: {mnemonic: mnemonic},
      }).then(res => {
        handleImportWallet(res.data.data.wallet!);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCreateWallet();
  }, []);

  return (
    <View style={{...STYLES.stackScreenContainer, ...styles.container}}>
      <Text style={styles.createHelperText}>
        Your wallet is created. Please save the following mnemonic phrase in a
        safe place.
      </Text>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(mnemonic);
        }}
        style={styles.mnemonicWrapper}>
        <Image
          style={styles.copyIcon}
          source={require('../../assets/images/copy.png')}
        />
        <Text style={STYLES.text.SpaceMonoBase}>{mnemonic}</Text>
      </TouchableOpacity>
      <ControlButton
        mode={ControlButtonMode.PRIMARY}
        onPress={handleStoreWallet}
        content="Done"
      />
    </View>
  );
};

export default CreateWalletScreen;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  mnemonicWrapper: {
    backgroundColor: COLORS.background.secondary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  copyIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  createHelperText: {
    ...STYLES.text.WorkSans_R_18,
    paddingHorizontal: 8,
  },
});
