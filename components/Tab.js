/* eslint-disable react/prop-types */
import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}));

export default function CustomTab({ children, handleTabChange, handleChangeTabIndex, value }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    style={{ backgroundImage: 'linear-gradient(45deg, black, #062a50, #081a2d)' }}
                    value={value}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab style={{ color: 'dodgerblue' }} label="My Posts" {...a11yProps(0)} />
                    <Tab style={{ color: 'dodgerblue' }} label="Saved" {...a11yProps(1)} />
                    <Tab style={{ color: 'dodgerblue' }} label="Media" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeTabIndex}>
                {children}
            </SwipeableViews>
        </div>
    );
}
