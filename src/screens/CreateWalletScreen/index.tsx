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
import axios from 'axios';
import {SERVER_URL} from '../../utils/constants/server-url.constant';

const CreateWalletScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleCreateWallet = async () => {
    try {
      // const wallet = ethers.Wallet.createRandom();
      await axios.post(`${SERVER_URL}/wallet`).then(res => {
        console.log(JSON.stringify(res.data, null, 2));
        setMnemonic(res.data.data.wallet.mnemonic.phrase);
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
        onPress={handleCreateWallet}
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
