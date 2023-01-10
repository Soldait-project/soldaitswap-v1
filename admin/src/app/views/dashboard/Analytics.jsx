import React, { Fragment, useEffect } from 'react'
import RowCards from './shared/RowCards'
import StatCards from './shared/StatCards'
import Campaigns from './shared/Campaigns'
import { Grid, Card } from '@mui/material'
import { SimpleCard } from 'app/components'
import StatCards2 from './shared/StatCards2'
import DoughnutChart from './shared/Doughnut'
import UpgradeCard from './shared/UpgradeCard'
import { styled, useTheme } from '@mui/system'
import TopSellingTable from './shared/TopSellingTable'
import LineChart from './LineChart'
import { getdetails } from '../../Api/site'
import { useState } from 'react'


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}))
var init ={"totalusers":0,"totalswapping":0,"totalliqutity":0,"liqutitychart":[],"swapchart":[]}
const Analytics = () => {
    const theme = useTheme();
    const [userdetails,setuserdetails] = useState(init);
    const [totalusers,settotalusers] = useState(0);
    const [totalswapping,settotalswapping] = useState(0);
    const [totalliqutity,settotalliqutity] = useState(0);


    useEffect(() => {
        details()
    }, [])
    const details = async () => {
        let res = await getdetails();
        setuserdetails(res);
        settotalusers(res.totalusers?res.totalusers:0);
        settotalliqutity(res.totalliqutity?res.totalliqutity:0)
        settotalswapping(res.totalswapping?res.totalswapping:0)
        console.log(res,"response")
    }
    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {userdetails&&<StatCards totalusers={totalusers} totalligutity={totalliqutity} totalswapping={totalswapping}  />}
                    </Grid>


                </Grid>
                <SimpleCard title="Swap/Liquidity">
                    {userdetails&&userdetails.liqutitychart&&userdetails.swapchart&&<LineChart
                        height="350px"
                        color={[theme.palette.primary.main, "#FF007F"]}
                        liqutitydata ={userdetails.liqutitychart} swapdata ={userdetails.swapchart}
                    />}
                </SimpleCard>
            </ContentBox>
        </Fragment>
    )
}

export default Analytics
