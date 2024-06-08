import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Clipboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import {SCREEN} from '../../navigators/AppRoute';
import {logout, setBalance} from '../../services/slices/walletSlice';
import {SERVER_URL} from '../../utils/constants/server-url.constant';

const MenuItem = ({title, route}: {title: string; route: string}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => navigation.navigate(route)}>
      <Text style={STYLES.text.WorkSansBase}>{title}</Text>
      <FontAwesome5
        opacity={0.7}
        name="chevron-right"
        size={16}
        color={COLORS.text.primary}
      />
    </TouchableOpacity>
  );
};

type MenuItemType = {
  id: number;
  label: string;
  route: string;
};

const listMenuItem: MenuItemType[] = [
  {
    id: 1,
    label: 'NFT Property',
    route: SCREEN.NFT_PROPERTY,
  },
  {
    id: 2,
    label: 'Selling NFT',
    route: SCREEN.SELLING_NFT,
  },
  {
    id: 3,
    label: 'Up for auction NFT',
    route: SCREEN.UP_FOR_AUCTION_NFT,
  },
];

const ProfileScreen = () => {
  const wallet = useSelector((state: any) => state.wallet);
  console.log(wallet);
  const dispatch = useDispatch();

  const handleLogout = () => {
    AsyncStorage.removeItem('wallet');
    dispatch(logout());
  };

  const getBalance = async () => {
    const balance = await axios.get(
      `${SERVER_URL}/wallet/balance/${wallet.address}`,
    );
    dispatch(setBalance(balance.data.data.balance));
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(wallet.address);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flexStart}>
        <View style={styles.balanceWrapper}>
          <Text style={STYLES.text.WorkSansH5}>Total balance:</Text>
          <Text style={{...STYLES.text.SpaceMonoH5, color: COLORS.yellow[0]}}>
            {wallet.balance} FTM
          </Text>
        </View>
        <View style={{justifyContent: 'flex-start', gap: 8}}>
          <Text style={STYLES.text.WorkSansH6}>Wallet address</Text>
          <TouchableOpacity
            onPress={handleCopyToClipboard}
            style={styles.addressWrapper}>
            <Text style={styles.walletText}>{wallet.address}</Text>
            <Image
              style={{width: 16, height: 16}}
              source={require('../../assets/images/copy.png')}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={listMenuItem}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <MenuItem title={item.label} route={item.route} />
          )}
        />
      </View>
      <View style={styles.flexEnd}>
        <TouchableOpacity onPress={handleLogout} style={styles.btnLogOut}>
          <Text
            style={{
              ...STYLES.text.WorkSansBase,
              color: COLORS.red[0],
            }}>
            Log Out
          </Text>
          <FontAwesome5
            style={{marginTop: 4}}
            opacity={0.7}
            name="chevron-right"
            size={16}
            color={COLORS.red[0]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    flex: 1,
    gap: 8,
  },
  flexEnd: {
    width: '100%',
    paddingBottom: 90,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  btnContainer: {
    backgroundColor: COLORS.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLogOut: {
    backgroundColor: COLORS.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  addressWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.secondary,
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  balanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  walletText: {
    ...STYLES.text.WorkSanSmall,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ProfileScreen;
