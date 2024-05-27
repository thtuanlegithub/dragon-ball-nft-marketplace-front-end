import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {COLORS} from '../config/colors';
import {STYLES} from '../config/styles';
import {ICONS} from '../config/icons';

type Props = {
  icon?: React.ReactNode;
  title?: string;
  showCloseBtn?: boolean;
  detached?: boolean;
  headerContainerStyle?: ViewStyle;
  children: React.ReactNode;
} & BottomSheetModalProps;

export type BottomSheetHandle = {
  popUp: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetHandle, Props>(function (
  {
    icon,
    title,
    showCloseBtn = true,
    detached = false,
    headerContainerStyle,
    children,
    ...props
  },
  ref,
) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    function getRefValue() {
      return {
        popUp() {
          bottomSheetRef?.current?.present();
        },
        close() {
          bottomSheetRef?.current?.dismiss();
        },
      };
    },
    [],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.4}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[{backgroundColor: 'black'}, StyleSheet.absoluteFillObject]}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing={true}
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      detached={detached}
      {...props}>
      <BottomSheetView
        style={{
          paddingBottom: detached ? 0 : insets.bottom + 16,
          // paddingHorizontal: 16,
          backgroundColor: COLORS.background.modal,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          minHeight: 300, // too short cause auto-close
        }}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          <View style={styles.titleContainer}>
            {icon && icon}
            {title && <Text style={styles.title}>{title}</Text>}
          </View>
          {showCloseBtn && (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => bottomSheetRef.current?.dismiss()}>
              <ICONS.CloseX />
            </TouchableOpacity>
          )}
        </View>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginLeft: 16,
  },
  title: {
    ...STYLES.text.WorkSansH6,
    fontSize: 20,
    color: COLORS.background.modal,
  },
  closeBtn: {
    width: 44,
    paddingTop: 16,
    // height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomSheet;
