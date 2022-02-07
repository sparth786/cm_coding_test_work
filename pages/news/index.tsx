import {useEffect, useState} from "react";
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import Image from "next/image";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import pageConfigClient from "../../lib/contentfulService";
import NewsData from "../../components/NewsData";

interface ILogo {
    fields: {
        file: {
            url: string
            description: string
            file: any
            title: string
        }
    }
}

export interface IPageDisplayConfig {
    logo: ILogo
    menuLabel: string
    searchLabel: string
    ttile: string
}

const useStyles = makeStyles({
    newsCardWrapper: {
        display: 'flex',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 24px',
        borderBottom: '1px solid #ccc',
        '& h5': {
            margin: 0,
            fontSize: '16px',
            color: '#333',
        },
        '& h4': {
            margin: 0,
            fontSize: '18px',
            color: '#266ba1',
            fontWeight: '600',

        },
    },
    angleDown: {
        '& svg': {
            fill: '#fba901',
        },
    },
    customDropDown: {
        cursor: 'pointer',
        display: 'flex',
        '& h4': {
            marginLeft: '8px',
        },
    },
    menuList: {
          '& .MuiMenu-paper': {
              top: '125px !important' ,
            left: '1254px !important',
        }
    },
    logo: {
        padding: '24px 0',
        borderBottom: '1px solid #ccc',
        '&img': {
            maxWidth: '100%',
            height: 'auto',
        },
    },
})

function News() {

    const [pageDisplayConfig, setPageDisplayConfig] = useState<IPageDisplayConfig | null>(null);
    const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);

    const classes = useStyles();

    useEffect(() => {
        pageConfigClient.getEntries()
            .then(res => {
                const {fields} = res.items[0];
                setPageDisplayConfig(fields as IPageDisplayConfig);
            }).catch(err => {
            console.log(err);
        });
    }, []);

    const handleUserClick = (event: React.MouseEvent<Element, MouseEvent>
): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleLogout = () => {
      
    }

    return (
        <div>
            {pageDisplayConfig && (
                <Container>
                    {/*<Grid className={classes.headerContainer}>*/}
                        <Grid>
                        <Grid item xs={12}>
                            <Box className={classes.logo}>
                                <Image
                                    src={`https:${pageDisplayConfig.logo.fields.file.url}`}
                                    width={'100'}
                                    height={'30'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.headerWrapper}>
                                <h5>{pageDisplayConfig.menuLabel}</h5>

                                <div className={classes.customDropDown} aria-controls="simple-menu" aria-haspopup="true"
                                     onClick={(event) =>
                                         handleUserClick(event)}>
                                    <AccountCircleIcon />
                                    <h4>John Doe</h4>
                                    <div className={classes.angleDown}>
                                        <ArrowDropDownIcon  />
                                    </div>
                                </div>

                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    className={classes.menuList}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>

                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <NewsData
                                searchLabel={pageDisplayConfig.searchLabel}
                            />
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    );
}

export default News;
