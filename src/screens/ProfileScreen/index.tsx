import React from 'react';
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

const ProfileScreen = () => {
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
    {
      id: 4,
      label: 'Wallets',
      route: SCREEN.WALLET,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.flexStart}>
        <Image
          style={styles.image}
          source={require('../../assets/images/profile_test.png')}
        />
        <Text
          style={{
            ...STYLES.text.WorkSansBase,
            paddingBottom: 16,
          }}>
          John Doe
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
        <TouchableOpacity style={styles.btnLogOut}>
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
    paddingTop: 16,
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
    paddingTop: 16,
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
