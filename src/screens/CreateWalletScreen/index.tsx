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

const CreateWalletScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleCreateWallet = () => {
    try {
      // const wallet = ethers.Wallet.createRandom();
      setMnemonic(
        'nice loud maid wire tuition cat deny book shoe delay ginger trash',
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCreateWallet();
  }, []);

  return (
    <View style={{...STYLES.stackScreenContainer, ...styles.container}}>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(mnemonic);
        }}
        style={{
          backgroundColor: COLORS.background.secondary,
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderRadius: 16,
        }}>
        <Image
          style={{
            width: 16,
            height: 16,
            position: 'absolute',
            right: 10,
            top: 10,
          }}
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
});
