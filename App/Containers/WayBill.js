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
              destination: '澳門',
              arrivedAt: '2017/02/01',
              expiredAt: null,
              amount: 50,
            };
          case WayBillState.ARRIVED:
            return {
              destination: '澳門',
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
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
              單號: { data.id }
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
              onPress={() => { this.pushToNextComponent(UrgentProcessing, data, Navigator.SceneConfigs.FloatFromBottom); } }
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
