import React, { useState } from "react";
import { connect } from "react-redux";
import { Timer } from "easytimer.js";
import {
  Grid,
  Avatar,
  Typography,
  Box,
  ListItem,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  BottomNavigation,
  BottomNavigationAction,
  Divider
} from "@material-ui/core";
import { cyan, grey } from "@material-ui/core/colors";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "../../lotties/stop-watch.json";

const defaultOptions = {
  loop: true,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontWeight: "bold",
    },
    h1: {
      fontWeight: "bold",
      fontSize: "4rem",
      color: grey[800],
    },
    body1: {
      color: grey[700],
      fontSize: "1.5rem",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: cyan[600],
    boxShadow: "none",
    color: "black",
    overflow: "visible",
  },
  gridPage: {
    backgroundColor: "black",
    height: "100vh",
    width: "100vm",
  },
  gridApp: {
    backgroundColor: cyan[50],
    width: "414px",
    height: "736px",
  },
  gridNavBar: {
    width: "100%",
  },
  BtnNav: {
    width: "100%",
  }, 
  list: {
    width: "100%",
    height: "4.5rem"
  }, 
  runTime: {
    width: "100%",
    marginBottom: "2rem",
  },
  picture: {
    width: "150px",
    height: "150px",
  },
  timeline: {
    overflow: "auto",
    height: "45vh",
    width: "100%",
    borderBottom: "3px"
  },
  inside: {
    minWidth: "35px",
    width: "35px",
    height: "35px",
    textAlign: "center",
    color: cyan[600],
    backgroundColor: cyan[50],
    borderRadius: "50%",
    marginLeft: "2px",
    marginTop: "2px"
  },
  outline: {
    minWidth: "39px",
    width: "39px",
    height: "39px",
    textAlign: "center",
    color: cyan[600],
    backgroundColor: cyan[600],
    borderRadius: "50%"
  },
  divider: {
    backgroundColor: cyan[100],
    marginTop:"0.5rem"
  }
}));

const timer = new Timer();

function StopWatch(props) {
  const styled = useStyles();

  const [runTime, setRunTime] = useState(
    timer
      .getTimeValues()
      .toString(["hours", "minutes", "seconds", "secondTenths"])
  );
  const [state, setState] = useState({isStopped: false, isPaused: false})

  const handleAdd = (e) => {
    e.preventDefault();
    const timeState = {
      id: new Date(),
      runtime: runTime,
    };
    props.dispatch({
      type: "ADD_TIME",
      timeState,
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    timer.reset();
    timer.stop();
    setState({isStopped: true})

    props.dispatch({
      type: "RESET_TIME",
    });
  };
  const handlePlay = () => {
    setState({isStopped: false}) 
    timer.start({ precision: "secondTenths" })
  }
  const handleStop = () => {
    setState({isStopped: true})
    timer.pause()

  }

  timer.addEventListener("secondTenthsUpdated", () => {
    setRunTime(
      timer
        .getTimeValues()
        .toString(["hours", "minutes", "seconds", "secondTenths"])
    );
  });
  timer.addEventListener("reset", () => {
    setRunTime(
      timer
        .getTimeValues()
        .toString(["hours", "minutes", "seconds", "secondTenths"])
    );
  });

  return (
    //page
    <ThemeProvider theme={theme}>
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={styled.gridPage}
    >
      <Grid
        container
        item
        xs={12}
        md={10}
        direction="column"
        justify="flex-end"
        alignItems="center"
        spacing={2}
        className={styled.gridApp}
      >
        <Box className={styled.runTime}>
          <Grid container item justify="center">
            <div onClick={handlePlay}>
            <Lottie options={defaultOptions} height={150} width={150} isStopped={state.isStopped} isPaused={state.isPaused}/>
            </div>
          </Grid>

          <Grid container item justify="center" className={styled.BtnNav}>
            <Typography variant="h1">{runTime}</Typography>
          </Grid>
        </Box>

          <Grid container item justify="center" className={styled.timeline}>
            <List className={styled.list}>
              
              {props.data?.map((item, index) => (
                <Box className={styled.list}>
                <ListItem key={index}>
                  <ListItemAvatar className={styled.outline}>
                    <Avatar className={styled.inside}>{parseInt(index + 1)}</Avatar>
                  </ListItemAvatar>
                  <ListItemSecondaryAction>
                    <Typography variant="body1">
                      {item.runtime}
                    </Typography>
                  </ListItemSecondaryAction>
                  
                </ListItem>
                <Divider className={styled.divider} variant="middle" />
                </Box>
              ))}
            </List>
          </Grid>

        <Grid container className={styled.gridNavBar}>
          <BottomNavigation showLabels className={styled.BtnNav}>
            <BottomNavigationAction
              label={
                <Typography
                  variant="subtitle1"
                  style={{ color: cyan[600] }}
                  onClick={handleReset}
                >
                  CLEAR
                </Typography>
              }
            />
            <BottomNavigationAction
              label={
                <Typography
                  variant="subtitle1"
                  style={{ color: cyan[600] }}
                  onClick={handleAdd}
                >
                  LAB
                </Typography>
              }
            />
            <BottomNavigationAction
              label={
                <Typography
                  variant="subtitle1"
                  style={{ color: cyan[600] }}
                  onClick={handleStop}
                >
                  STOP
                </Typography>
              }
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}

const ToState = (state) => {
  return {
    data: state,
  };
};
export default connect(ToState)(StopWatch);
