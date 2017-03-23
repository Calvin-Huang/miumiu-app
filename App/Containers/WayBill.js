/**
 * Created by Calvin Huang on 2/6/17.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import Color from 'color';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, IconFasterShipping } from '../Components';
import UrgentProcessing from './UrgentProcessing';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { WayBillState, stateInfoMapping } from '../Constants/states';
import { showUserQRCode } from '../Actions';

class WayBill extends NavigatorComponent {
  static navRightButton({ data: { shippingNo, status } }, navigator, index, navState) {
    if (status === WayBillState.CONFIRMING) {
      return (
        <TouchableOpacity onPress={() => { console.log(shippingNo); }}>
          <Text style={NavigatorStyle.itemTextButton}>
            刪除
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.data,
    };
  }

  render() {
    const { data } = this.state;
    const { icon, iconColor, title } = stateInfoMapping[data.status] || {};

    const sectionTitle = ((data) => {
      switch (data.status) {
        case WayBillState.CONFIRMING:
          return '待確認訂單，您可以申請加急服務';
        case WayBillState.SHIPPING:
          return (
            <Text style={styles.sectionText}>
              往 <Text style={{ ...styles.sectionText, color: 'black' }}>{data.locationName || '-'}</Text> 貨運中
            </Text>
          );
        case WayBillState.ARRIVED:
          return (
            <Text style={styles.sectionText}>
              已到 <Text style={{ ...styles.sectionText, color: 'black' }}>{data.locationName || '-'}</Text> 集貨中心，請儘速提領
            </Text>
          );
      }
    })(data);

    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
              單號: { data.shippingNo }
            </Text>
          </View>
        </MiumiuThemeNavigatorBackground>
        <View style={styles.body}>
          <View style={styles.sectionHeader}>
            <Icon style={styles.sectionIcon} name={icon} size={24} color={iconColor} />
            <Text style={styles.sectionText}>{sectionTitle}</Text>
          </View>
          <View style={styles.listViewRow}>
            <Text style={MiumiuTheme.listViewText}>
              到貨日
            </Text>
            <Text style={styles.infoFieldValueText}>
              {data.arrivedAt || '-'}
            </Text>
          </View>
          <View style={styles.listViewRow}>
            <Text style={MiumiuTheme.listViewText}>
              到期日
            </Text>
            <Text style={styles.infoFieldValueText}>
              {data.expiredAt || '-'}
            </Text>
          </View>
          <View style={styles.listViewRow}>
            <Text style={MiumiuTheme.listViewText}>
              物流費用
            </Text>
            <Text style={{ ...styles.infoFieldValueText, color: '#F6A623' }}>
              {data.fee ? `$${data.fee}` : '-'}
            </Text>
          </View>
          <View style={styles.listViewRow}>
            <Text style={MiumiuTheme.listViewText}>
              倉儲費用
            </Text>
            <Text style={styles.infoFieldValueText}>
              {data.stockFee ? `$${data.stockFee}` : '-'}
            </Text>
          </View>
        </View>
        { data.status === WayBillState.CONFIRMING &&
          <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
              onPress={() => { this.pushToNextComponent(UrgentProcessing, data, Navigator.SceneConfigs.FloatFromBottom); } }
            >
              <IconFasterShipping style={MiumiuTheme.actionButtonIcon} iconColor="white" tintColor="white" />
              <Text style={MiumiuTheme.actionButtonText}>加急服務</Text>
            </TouchableOpacity>
          </View>
        }

        { data.status === WayBillState.ARRIVED &&
          <View style={{ backgroundColor: Color(MiumiuTheme.buttonWarning.backgroundColor).lighten(0.2), }}>
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonWarning }}
              onPress={() => { this.props.showUserQRCode(); }}
            >
              <Text style={{ ...MiumiuTheme.actionButtonText, ...MiumiuTheme.textShadow }}>取貨</Text>
            </TouchableOpacity>
          </View>
        }
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
  listViewRow: {
    ...MiumiuTheme.listViewRow,
    paddingVertical: 16,
    paddingHorizontal: 17,
  },
  infoFieldValueText: {
    ...MiumiuTheme.listViewText,
    flex: 1,
    textAlign: 'right',
  },
  body: {
    flex: 1,
  },
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

export default connect(
  mapStateToProps,
  { showUserQRCode }
)(WayBill);
