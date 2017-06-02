/**
 * Created by Calvin Huang on 2/16/17.
 */

import {
  Platform,
} from 'react-native';

const styles = {
  titleView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 6,
    right: Platform.OS === 'ios' ? 0 : null,
    left: Platform.OS === 'ios' ? 0 : 72,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
};

export default {
  navBackButton: {
    marginTop: 10,
    marginRight: 80,
    marginLeft: 9,
    marginBottom: 8,
  },
  itemButtonsContainer: {
    flexDirection: 'row-reverse',
  },
  itemTextButton: {
    margin: 9,
    flex: 0,
    fontSize: 17,
    color: 'white',
  },
  itemButton: {
    margin: 9,
    height: 24,
    width: 24,
    flex: 0,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  titleView: styles.titleView,
  brandView: {
    ...styles.titleView,
    right: 0,
    left: 0,
  },
};
