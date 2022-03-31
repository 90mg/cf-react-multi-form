import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

import MultiStepForm from './components/MultiStepForm';
import StepOne from './form/StepOne';
import StepTwo from './form/StepTwo';
import StepThree from './form/StepThree';
import FinalStep from './form/FinalStep';

const App = () => {
  const classes = useStyles();
  const [fieldData, setFieldData] = useState([]);

  // Assume dishes data is from remote server
  const fetchFormData = async () => {
    const { data = {} } = await axios.get('data/dishes.json');
    const { dishes } = data;
    setFieldData(dishes);
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Paper className={classes.formWrapper}>
          <MultiStepForm fieldData={fieldData} showFlow>
            <StepOne label="Step 1" />
            <StepTwo label="Step 2" />
            <StepThree label="Step 3" />
            <FinalStep label="Review" />
          </MultiStepForm>
        </Paper>
      </div>
    </MuiThemeProvider>
  );
};

export default App;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    width: '100vw',
    height: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '50%',
    height: 'auto',
    padding: 30,
  },
});
