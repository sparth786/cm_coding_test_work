import React, { FC } from "react";
import {makeStyles} from '@material-ui/core';

interface IFilterBoxPropsType {
    options: string[],
    selected: string[],
    selectTopicFilters: (e: (prev: string[]) => string[]) => void
}

const useStyles = makeStyles({
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0',
    },
    filterList: {

        color: '#4b4b4b',
        fontSize: '16px',
        padding: '5px 0',
        '& input': {
            cursor: 'pointer',
        },
        '& label': {
            cursor: 'pointer',
            marginLeft: '10px',
        },
    },
})

const FilterBox:FC <IFilterBoxPropsType> = ({options, selected, selectTopicFilters}) => {

    const classes = useStyles();

    const handleClick = (option: string) => {
        if (selected.includes(option))
            selectTopicFilters((prev: string[]) => {
                console.log('prev data: ', prev)
                console.log('prev.filter(val => val !== option): ', prev.filter(val => val !== option))
                return prev.filter(val => val !== option)
            })
        else {
            selectTopicFilters((prev: string[])  => {
                console.log('prev.concat([option]): ', prev.concat([option]))
                return prev.concat([option])
            })
        }

    }
    console.log('selected data: ', selected)
    return (
        <div className={classes.listItem}>
            {options.map((opt: string) => (
                <div className={classes.filterList} key={opt}>
                    <input
                        name={opt}
                        type='checkbox'
                        checked={selected.includes(opt)}
                        onChange={() => handleClick(opt)}
                    />
                    <label htmlFor={opt}>{opt}</label>
                </div>
            ))}
        </div>
    );
}

export default FilterBox;
