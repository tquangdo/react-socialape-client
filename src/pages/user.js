import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Scream from '../components/Scream/Scream'
import { getUserDetails } from '../redux/actions/dataAction'
import AxiosService from '../utils/AxiosService'
import StaticProfile from '../components/StaticProfile/StaticProfile'
import ScreamSkeleton from '../utils/ScreamSkeleton/ScreamSkeleton'
import ProfileSkeleton from '../utils/ProfileSkeleton/ProfileSkeleton'

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null,
    }
    componentDidMount = () => {
        const { handle, screamId } = this.props.match.params
        if (screamId) {
            this.setState({ screamIdParam: screamId })
        }
        this.props.getUserDetails(handle)
        AxiosService
            .get(`/users/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user //getUserDetails() là res.data.screams
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        const {
            screams, loading
        } = this.props.data
        const { profile, screamIdParam } = this.state
        const screamsMarkup = loading ? (
            <ScreamSkeleton />
        ) : (screams === null || screams.length === 0) ? (
            <p>User này KO có post nào!</p>
        ) : !screamIdParam ? (
            screams.map(scream_item => <Scream key={scream_item.screamId} scream={scream_item} />)
        ) : (
                        screams.map(scream_item => {
                            if (scream_item.screamId !== screamIdParam) {
                                return <Scream key={scream_item.screamId} scream={scream_item} />
                            } else {
                                return <Scream key={scream_item.screamId} scream={scream_item} openDialog />
                            }
                        })
                    )
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profile === null ? (
                        <ProfileSkeleton />
                    ) : (<StaticProfile profile={profile} />)}
                </Grid>
            </Grid>
        )
    }
}
const mapState2Props = state => ({
    data: state.dataReducer,
})
const mapActions2Props = {
    getUserDetails,
}

export default connect(mapState2Props, mapActions2Props)(user)