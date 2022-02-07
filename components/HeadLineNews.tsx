import React from "react"
import {Box, Grid, makeStyles, Typography} from '@material-ui/core';
import { customDateFormat } from "../utils/helpers"

interface INewsDetailType {
    imageUrl: string
    topics: { title: string; }[]
    name: string
    publicationDate: string
    organization: { fields: { name: string; }; }[]
}

interface IHeadLineNewsPropsType {
    data: INewsDetailType[]
}

const useStyles = makeStyles({
    credibleHeader: {
        fontSize: '26px',
        textAlign: 'center',
        margin: '50px 0',
        color: '#4b4b4b',
        fontWeight: 'bold',
    },
    topicWrap: {
        color: '#266ba1',
        fontSize: '12px',
        marginTop: '16px',
        marginBottom: '8px',
    },
    dateWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
        '& p': {
            margin: '0',
            color: '#4b4b4b',
            fontSize: '12px',
            marginRight: '40px',
        },
        '& span': {
            fontSize: '14px',
            color: '#266ba1',
        },
    },
    detailText: {
        color: '#4b4b4b',
        height: '43px',
        marginBottom: '10px',
        fontWeight: 600,
    },
    imageUser: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        minHeight: '263px',
    },
})

const HeadLineNews = ({ data }: IHeadLineNewsPropsType) => {

    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.credibleHeader}>CredibleMind in the News</Box>
            <Grid container spacing={3}>
                {data
                    .sort((a: INewsDetailType, b: INewsDetailType) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime())
                    .slice(0, 3).map((detail: INewsDetailType, i: number) => (
                        <Grid key={`head-line-news-${i}`} item xs>
                            <Box>
                                <img src={detail.imageUrl} className={classes.imageUser}/>
                                <Box className={classes.topicWrap}>
                                    {detail.topics.map((t: { title: string }) => t.title).join(", ")}
                                </Box>
                                <Typography className={classes.detailText}>{detail.name}</Typography>
                                <Box className={classes.dateWrapper}>
                                    <p>{customDateFormat(detail?.publicationDate)}</p>
                                    <span>{detail.organization.map((org: { fields: { name: string } }) => org.fields.name)}</span>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )
}

export default HeadLineNews