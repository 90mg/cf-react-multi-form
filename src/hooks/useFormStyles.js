import { makeStyles } from '@material-ui/styles';

const useFormStyles = makeStyles({
  form: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  fieldsArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '20px!important',
  },
  compondField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  helperText: {
    textAlign: 'center!important',
  },
  addButton: {
    margin: '20px 0',
  },
  buttonsArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  gridContainer: {
    marginTop: '20px!important',
  },
});

export default useFormStyles;
