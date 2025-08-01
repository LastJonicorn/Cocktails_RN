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
});
