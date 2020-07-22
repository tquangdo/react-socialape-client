import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import AxiosService from '../utils/AxiosService'
import Scream from '../components/Scream/Scream'
import Profile from '../components/Profile/Profile'

class home extends Component {
    state = { screams: null }
    componentDidMount = () => {
        AxiosService.get('/screams')
            .then(res => {
                this.setState({ screams: res.data })
            })
            .catch(err => console.log(err))
    }
    render() {
        const { screams } = this.state
        let recentScreamsMarkup = screams ? (
            screams.map((scream, chiso) => <Scream key={chiso} scream={scream} />)
        ) : <p>Đang load dữ liệu...</p>
        return (
            <Grid container spacing={10} >
                <Grid item sm={8} xs={12} >
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12} >
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

export default home