import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import {prettyPrint} from './util';
import './InfoBox.css';


function InfoBox({title, cases, isRed, active, total, ...props}) {

    return (
        <Card 
        onClick={props.onClick}
        className={`infobox ${active && 'infobox--selected'} ${isRed && 'inforbox--red'}`}
        >
            <CardContent>
                <Typography className='infoBox__title' color='textSecondary'>
                {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && 'infobox__cases--green'}`}>{prettyPrint(cases)}</h2>
                <Typography className='infoBox__total' color='textSecondary'>
                    {prettyPrint(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

