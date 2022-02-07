import {FC, useEffect, useState} from "react";
import client from "../lib/algoliaService";
import HeadLineNews from "./HeadLineNews";
import NewsCard from "./NewsCard";
import FilterBox from "./FilterBox";
import Router from "next/router";
import SearchIcon from '@material-ui/icons/Search';
import {Box, Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    newsCardWrapper: {
        display: 'flex',
        margin: '50px 0',
    },
    newsCardItem: {
        marginBottom: '24px',
        paddingBottom: 24,
        borderBottom: '1px solid #e1e1e1',
        cursor: 'pointer',
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    searchInfo: {
        fontSize: '18px',
        color: '#4b4b4b',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid #e1e1e1',
    },
    filterWrapper: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        padding: '24px',
        marginRight: '20px',
    },
    headerSearch: {
        fontSize: '16px',
        color: '#4b4b4b',
        marginBottom: '16px',
    },
    btnSearch: {
        cursor: 'pointer',
        width: '45px',
        border: 'none',
        background: '#24619b',
        borderRadius: '0 4px 4px 0',
        color: '#FFFFFF',
        outline: 'none',
    },
    inputBox: {
        cursor: 'pointer',
        display: 'flex',
        '& input': {
            width: '100%',
            borderTop: '1px solid #dee0e0',
            borderBottom: '1px solid #dee0e0',
            borderLeft: '1px solid #dee0e0',
            borderRadius: '4px 0 0 4px',
            padding: '10px 20px',
            color: '#5c5c5c',
            outline: 'none'
        },
    },

})

const newsDataClient = client.initIndex("news");

interface INewsDataType {
    searchLabel: string
}

// @ts-ignore
export const getHits = (hits) => JSON.parse(JSON.stringify(hits))

// @ts-ignore
const concatTitleOption = (getAllHits: any) => Array.from(new Set([].concat(...getAllHits.map(news => news.topics)).map(topic => topic.title)))

const NewsData: FC<INewsDataType> = (props) => {
    const classes = useStyles();

    const [newsCardsData, setNewsCardData] = useState([]);
    const [searchFilteredData, setSearchFilteredData] = useState([]);
    const [topicTitleOptions, setTopicTitleOptions] = useState<string[]>([]);
    const [topicFilters, setTopicFilters] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        newsDataClient.search(searchTerm)
            .then(({hits}) => {
                const getAllHits = getHits(hits)
                const titleOption = concatTitleOption(getAllHits)
                setNewsCardData(getAllHits)
                setSearchFilteredData(getAllHits)

                setTopicTitleOptions(titleOption)
            }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        if (!!topicFilters.length)
            { // @ts-ignore
                setSearchFilteredData(newsCardsData.filter(news => topicFilters.some(val => news.topics.map(t => t.title).includes(val))))
            }
        else setSearchFilteredData(newsCardsData)
    }, [topicFilters]);

    useEffect(() => {
        if (topicTitleOptions.length > 0 && searchTerm.length < 1) setTopicFilters([])
    },[topicTitleOptions]);

    const searchNews = () => {
        if (searchTerm) {
            newsDataClient.search(searchTerm)
                .then(({hits}) => {
                    const getAllHits = getHits(hits)
                    const titleOption = concatTitleOption(getAllHits)
                    setSearchFilteredData(getAllHits)
                    setTopicTitleOptions(titleOption)
                }).catch(err => {
                console.log(err);
            });
        } else {
            setSearchFilteredData(newsCardsData)
            const titleOption = concatTitleOption(newsCardsData)
            setTopicTitleOptions(titleOption)
        }
    }

    // @ts-ignore
    const handleOnClick = (data) => {
        Router.push({
            pathname: `news/${data.slug}`,
            query: {
                imageUrl: data.imageUrl,
                topics: JSON.stringify(data.topics),
                name: data.name,
                description: data.description,
                publicationDate: data.publicationDate,
                organization: JSON.stringify(data.organization)
            }
        }, `news/${data.slug}`)
    }

    return (
        <Grid>
            <HeadLineNews data={newsCardsData}/>
            <Box className={classes.newsCardWrapper}>
                <Grid container>
                    <Grid item xs={3}>
                        <Box>
                            <Box className={classes.filterWrapper}>
                                <div className={classes.headerSearch}>{props.searchLabel}</div>
                                <div className={classes.inputBox}>
                                    <input type={"text"} value={searchTerm}
                                           onChange={e => setSearchTerm(e.target.value)}/>
                                    <button className={classes.btnSearch} onClick={searchNews}><SearchIcon/></button>
                                </div>
                            </Box>
                            <FilterBox
                                options={topicTitleOptions}
                                selected={topicFilters}
                                selectTopicFilters={setTopicFilters}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <div className={classes.searchInfo}>{searchFilteredData.length} Resources Found</div>
                        {searchFilteredData.map((data, i) => (
                            <div className={classes.newsCardItem} key={i} onClick={() => handleOnClick(data)}>
                                <NewsCard
                                    key={`${i}-news-card`}
                                    data={data}
                                />
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default NewsData;
