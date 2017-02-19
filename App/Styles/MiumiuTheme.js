/**
 * Created by Calvin Huang on 2/16/17.
 */

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
  bulletItem: {
    flexDirection: 'row',
  },
  bulletContent: {
    flex: 1,
  },
  actionButtonPrimary: {
    backgroundColor: '#4E9ACF',
  },
  actionButtonWarning: {
    backgroundColor: '#F5C163',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  actionButtonIcon: {
    marginRight: 10,
  },
  actionButtonText: {
    color: 'white',
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
};
