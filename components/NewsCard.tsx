import React, {FC} from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import ErrorPage from "./ErrorPage";
import { customDateFormat } from "../utils/helpers"

export interface INewsCardType {
    imageUrl: string
    topics: { title: string }[]
    name: string
    description: string
    publicationDate: string
    organization: { fields: { name: string } }[]
}

export interface INewsCardPropsType {
    data: INewsCardType | null
}

const useStyles = makeStyles({
    textHeader: {
        fontSize: '14px',
        color: '#266ba1',
    },
    cardWrap: {
        display: 'flex',
    },
    titleName: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#4b4b4b',
        height: '65px',
        overflow: 'hidden',
    },
    contentDescripation: {
        fontSize: '14px',
        color: '#4b4b4b',
        lineHeight: '24px',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        textOverflow: 'ellipsis',

    },
    newImg: {
        height: 250,
        paddingRight: '15px !important',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }
    },
    publicationDate: {
        marginRight: '24px',
        paddingRight: '16px',
        borderRight: '1px solid #333',
        '& p': {
            fontSize: '14px',
            color: '#4b4b4b',
        },
    },
    manageWrapper: {
        display: 'flex',
        marginTop: '24px',
    },
    newType: {
        '& p': {
            color: '#24619b',
            fontSize: '12px',
        },
    },

})

const NewsCard: FC<INewsCardPropsType> = ({data}) => {

    const classes = useStyles();

    if(!data) return <ErrorPage/>

    return (
        <Grid container spacing={2} className={classes.cardWrap}>
            <Grid item xs={12} md={5} className={classes.newImg}>
                <img src={data?.imageUrl} alt={data?.name}/>
            </Grid>
            <Grid item xs={12} md={7} className="content-detail">
                <Typography
                    className={classes.textHeader}>{data?.topics?.map((topic: { title: string }) => topic.title).join(", ")}</Typography>
                <Typography className={classes.titleName}>{data?.name}</Typography>
                <Typography className={classes.contentDescripation}>{data?.description}</Typography>
                <div className={classes.manageWrapper}>
                    <div className={classes.publicationDate}>
                        <Typography>{customDateFormat(data?.publicationDate)}</Typography>
                    </div>
                    <div className={classes.newType}>
                        <Typography
                            className="text-blue">{data?.organization?.map((org: { fields: { name: string } }) => org.fields.name)}</Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default NewsCard;