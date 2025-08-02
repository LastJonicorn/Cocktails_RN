import { StyleSheet } from 'react-native';
import colors from './Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'center',
    color: colors.text,
    marginBottom: 12,
  },
  subhead: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: colors.text,
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
});
