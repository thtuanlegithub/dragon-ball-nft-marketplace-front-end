import React from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../config';
import {STYLES} from '../config/styles';

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = ({
  visible = false,
  title = 'Confirm',
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
    width: 310,
  },
  title: {
    paddingHorizontal: 32,
    flexWrap: 'wrap',
    textAlign: 'center',
    ...STYLES.text.WorkSansH6,
    color: COLORS.text.black,
  },
  message: {
    textAlign: 'center',
    ...STYLES.text.WorkSansBase,
    color: COLORS.text.black,
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  controlContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 0.4,
    borderColor: COLORS.gray[0],
  },
  controlCancelText: {
    color: 'red',
    padding: 10,
    fontSize: 16,
  },
  controlConfirmText: {
    color: 'green',
    padding: 10,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlCancel: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 16,
    borderRightWidth: 0.4,
    borderColor: COLORS.gray[3],
    paddingVertical: 4,
  },
  controlConfirm: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 16,
  },
});

export default ConfirmDialog;
