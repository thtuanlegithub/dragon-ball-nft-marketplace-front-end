import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../navigators/AppRoute';
import {useDispatch, useSelector} from 'react-redux';
import {logout, setBalance} from '../../services/slices/walletSlice';
import axios from 'axios';
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
    dispatch(logout());
  };

  const getBalance = async () => {
    const balance = await axios.get(
      `${SERVER_URL}/wallet/balance/${wallet.address}`,
    );
    dispatch(setBalance(balance.data.data.balance));
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flexStart}>
        <Text style={STYLES.text.WorkSansH5}>Total balance</Text>
        <Text style={STYLES.text.SpaceMonoBase}>{wallet.balance}</Text>
        <Text
          style={{
            ...STYLES.text.WorkSansCaption,
            paddingBottom: 16,
          }}>
          {wallet.address}
        </Text>
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
    alignItems: 'center',
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
});

export default ProfileScreen;
