import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import Scream from '../components/Scream/Scream'
import Profile from '../components/Profile/Profile'
import { connect } from 'react-redux'
import { getAllScreams } from '../redux/actions/dataAction'
import ScreamSkeleton from '../utils/ScreamSkeleton/ScreamSkeleton'

class home extends Component {
    componentDidMount = () => {
        this.props.getAllScreams()
    }
    render() {
        const { screams, loading } = this.props.data
        let recentScreamsMarkup = !loading ? (
            screams.map((scream, chiso) => <Scream key={chiso} scream={scream} />)
        ) : (
                <ScreamSkeleton />
            )
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
const mapStateToProps = state => ({
    data: state.dataReducer
})

export default connect(
    mapStateToProps,
    { getAllScreams }
)(home)
