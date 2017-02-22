/**
 * Created by Calvin Huang on 2/6/17.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
import Color from 'color';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, IconFasterShipping } from '../Components';
import UrgentProcessing from './UrgentProcessing';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { WayBillState, stateInfoMapping } from '../Constants/states';

export default class WayBill extends NavigatorComponent {
  static navRightButton({ data: { id } }, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { console.log(id); }}>
        <Text style={NavigatorStyle.itemButton}>
          刪除
        </Text>
      </TouchableOpacity>
    );
  }

  static title({ data: { id } }, navigator, index, navState) {
    return (
      <Text style={NavigatorStyle.title}>
        單號: { id }
      </Text>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.data,
      showModal: false,
    };

    this.fetchWayBill();
  }

  fetchWayBill(id = this.state.data.id) {
    setTimeout(() => {
      const mockData = ((state) => {
        switch (state) {
          case WayBillState.CONFIRMING:
            return {
              destination: null,
              arrivedAt: null,
              expiredAt: null,
              amount: null,
            };
          case WayBillState.SHIPPING:
            return {
              destination: '珠海',
              arrivedAt: '2017/02/01',
              expiredAt: null,
              amount: 50,
            };
          case WayBillState.ARRIVED:
            return {
              destination: '珠海',
              arrivedAt: '2017/02/01',
              expiredAt: '2017/02/14',
              amount: 65,
            };
        }
      })(this.state.data.state);

      this.setState({
        data: {
          ...this.state.data,
          ...mockData,
        },
      });
    }, 500);
  }

  render() {
    const { data } = this.state;
    const { icon, iconColor, title } = stateInfoMapping[data.state] || {};

    const sectionTitle = ((data) => {
      switch (data.state) {
        case WayBillState.CONFIRMING:
          return '待確認訂單，您可以申請加急服務';
        case WayBillState.SHIPPING:
          return (
            <Text style={styles.sectionText}>
              往 <Text style={{ ...styles.sectionText, color: 'black' }}>{data.destination || '-'}</Text> 貨運中
            </Text>
          );
        case WayBillState.ARRIVED:
          return (
            <Text style={styles.sectionText}>
              已到 <Text style={{ ...styles.sectionText, color: 'black' }}>{data.destination || '-'}</Text> 集貨中心，請儘速提領
            </Text>
          );
      }
    })(data);

    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground />
        <View style={styles.body}>
          <View style={styles.sectionHeader}>
            <Icon style={styles.sectionIcon} name={icon} size={24} color={iconColor} />
            <Text style={styles.sectionText}>{sectionTitle}</Text>
          </View>
          <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldNameText}>
              到貨日
            </Text>
            <Text style={styles.infoFieldValueText}>
              {data.arrivedAt || '-'}
            </Text>
          </View>
          <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldNameText}>
              到期日
            </Text>
            <Text style={styles.infoFieldValueText}>
              {data.expiredAt || '-'}
            </Text>
          </View>
          <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldNameText}>
              金額
            </Text>
            <Text style={{ ...styles.infoFieldValueText, color: '#F6A623' }}>
              {data.amount ? `$${data.amount}` : '-'}
            </Text>
          </View>
        </View>
        { data.state === WayBillState.CONFIRMING &&
          <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
              onPress={() => { this.pushToNextComponent(UrgentProcessing, data.id, Navigator.SceneConfigs.FloatFromBottom); } }
            >
              <IconFasterShipping style={MiumiuTheme.actionButtonIcon} iconColor="white" tintColor="white" />
              <Text style={MiumiuTheme.actionButtonText}>加急服務</Text>
            </TouchableOpacity>
          </View>
        }

        { data.state === WayBillState.ARRIVED &&
          <View style={{ backgroundColor: Color(MiumiuTheme.buttonWarning.backgroundColor).lighten(0.2), }}>
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonWarning }}
              onPress={() => { this.setState({ showModal: true }) }}
            >
              <Text style={{ ...MiumiuTheme.actionButtonText, ...MiumiuTheme.textShadow }}>取貨</Text>
            </TouchableOpacity>
          </View>
        }

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showModal}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => { this.setState({ showModal: false }) }}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalBody}>
                <View style={styles.qrCode}>
                  <QRCode value="+998988008752" size={140} />
                </View>
                <Text style={styles.qrCodeInfo}>
                  +998988008752
                </Text>
                <Text style={styles.pickupInstruction}>
                  已提貨單號工作人員會將單號由APP註銷
                </Text>
                <View
                  style={{
                    alignSelf: 'stretch',
                     borderRadius: MiumiuTheme.button.borderRadius,
                     backgroundColor: Color(MiumiuTheme.buttonDefault.backgroundColor).lighten(0.2)
                  }}
                >
                  <TouchableOpacity
                    style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonDefault }}
                    onPress={() => { this.setState({ showModal: false }) }}
                  >
                    <Text style={MiumiuTheme.buttonText}>
                      關閉
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}

const styles = {
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginLeft: 18,
    marginRight: 10,
    marginTop: 13,
    marginBottom: 9,
  },
  sectionText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  infoFieldContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  infoFieldNameText: {
    fontSize: 16,
    marginVertical: 16,
    marginLeft: 17,
  },
  infoFieldValueText: {
    flex: 1,
    fontSize: 16,
    marginVertical: 16,
    marginRight: 17,
    textAlign: 'right',
  },
  body: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    width: 295,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  qrCode: {
    marginTop: 30,
    marginBottom: 18,
  },
  qrCodeInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MiumiuTheme.titleText.color,
    marginBottom: 10
  },
  pickupInstruction: {
    fontSize: 12,
    color: MiumiuTheme.titleText.color,
    marginBottom: 34
  },
};