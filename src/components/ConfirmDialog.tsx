import React from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS} from '../config';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.controlContainer}>
            <TouchableHighlight
              underlayColor="#FFECEC"
              style={styles.controlCancel}
              onPress={onCancel}>
              <Text style={styles.controlCancelText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#E6FFF2"
              style={styles.controlConfirm}
              onPress={onConfirm}>
              <Text style={styles.controlConfirmText}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: 16,
    borderRadius: 16,
    width: 300,
  },
  title: {
    paddingHorizontal: 24,
    flexWrap: 'wrap',
    textAlign: 'center',
    color: COLORS.text.black,
  },
  message: {
    textAlign: 'center',
    color: COLORS.text.black,
    paddingBottom: 36,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  controlContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 0.4,
    borderColor: COLORS.gray[3],
  },
  controlCancelText: {
    color: 'red',
    padding: 10,
  },
  controlConfirmText: {
    color: 'green',
    padding: 10,
    flexWrap: 'wrap',
  },
  controlCancel: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 16,
    borderRightWidth: 0.4,
    borderColor: COLORS.gray[3],
  },
  controlConfirm: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 16,
  },
});

export default ConfirmDialog;
