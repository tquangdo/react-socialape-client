import { Button, Grid, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cmtOnScream } from '../redux/actions/dataAction'

class CommentForm extends Component {
    state = {
        body: '',
        errors: {},
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { errors, loading } = nextProps.UI
        if (errors) {
            this.setState({
                errors: errors
            })
        }
        if (!errors && !loading) {
            this.setState({ body: '', errors: {}, })
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.cmtOnScream(this.props.screamId, { body: this.state.body })
    }
    render() {
        const { authenticated } = this.props
        const { body, errors } = this.state
        const cmtFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='body' type='text'
                        label='Bình luận cho post' error={errors.comment ? true : false}
                        helperText={errors.comment} value={body}
                        onChange={this.handleChange} fullWidth />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Gửi
                    </Button>
                </form>
                <hr />
            </Grid>
        ) : null
        return cmtFormMarkup
    }
}
const mapStateToProps = state => ({
    UI: state.uiReducer,
    authenticated: state.userReducer.authenticated,
})
const mapActionToProps = {
    cmtOnScream,
}

export default connect(mapStateToProps, mapActionToProps)(CommentForm)
