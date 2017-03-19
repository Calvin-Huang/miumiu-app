/**
 * Created by Calvin Huang on 2/16/17.
 */

const sharedStyle = {
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingVertical: 11,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
}

export default style = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EFEFF4'
  },
  titleText: {
    color: '#4A4A4A',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  contextText: {
    color: '#757575',
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  roundButton: {
    alignSelf: 'stretch',
    borderRadius: 22,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  bulletItem: {
    flexDirection: 'row',
  },
  bulletContent: {
    flex: 1,
  },
  buttonDefault: {
    backgroundColor: '#9B9B9B',
  },
  buttonPrimary: {
    backgroundColor: '#4E9ACF',
  },
  buttonWarning: {
    backgroundColor: '#F5C163',
  },
  button: sharedStyle.button,
  buttonText: sharedStyle.buttonText,
  buttonActivityIndicator: {
    position: 'absolute',
    right: 40,
    top: 0,
    bottom: 0,
  },
  actionButton: {
    ...sharedStyle.button,
    borderRadius: 0,
    paddingVertical: 14,
  },
  actionButtonIcon: {
    marginRight: 10,
  },
  actionButtonText: {
    ...sharedStyle.buttonText,
    fontSize: 16,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 0.75,
    },
    textShadowRadius: 0.5,
  },
  textFieldGroup: {
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    alignSelf: 'stretch',
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
  fixMKTextFieldStyleError: {
    flex: 1,
    flexDirection: 'column',
  },
  pickerToolBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  pickerToolBarButtonText: {
    color: 'rgba(0, 122, 254, 1)',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  picker: {
    backgroundColor: '#EFF0F4',
  },
  navBackgroundWithSearchBar: {
    flex: 0,
    flexDirection: 'row',
    height: 104,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 9,
    height: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    overflow: 'hidden',
  },
  searchBarIcon: {
    marginLeft: 14,
    marginRight: 12,
  },
  searchBarCancelButton: {
    flex: 1,
    top: 32,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 17,
    color: 'white',
  },
  sectionText: {
    marginLeft: 16,
    marginVertical: 15,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  listViewRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  listViewText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  listViewForwardIndicator: {
    marginRight: 22,
  },
  paginationFetchingView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixMKTextFieldStyleError: {
    flex: 1,
    flexDirection: 'column',
  },
};
