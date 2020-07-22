import { Button, CircularProgress, Grid, TextField, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginIcon from '../../images/1.png'
import loginStyle from './loginStyle'
import { loginUser } from '../../redux/actions/userAction'
import { connect } from 'react-redux';

class login extends Component {
    state = {
        email: '',
        pw: '',
        loading: false,
        errs: {},
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errs: nextProps.UI.errors })
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const { email, pw } = this.state
        const userData = {
            email: email,
            password: pw,
        }
        this.props.loginUser(userData, this.props.history)
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    render() {
        const {
            classes, UI: { loading }
        } = this.props
        const { email, pw, errs } = this.state
        return (
            <Grid container className={classes.form} >
                <Grid item sm />
                <Grid item sm>
                    <img className={classes.image} src={LoginIcon} alt='login_icon' />
                    <Typography variant='h3' className={classes.pageTitle} >
                        Đăng nhập
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField name='email' type='email' label='Email'
                            value={email} onChange={this.handleChange} fullWidth
                            helperText={errs.email} error={errs.email ? true : false}
                        />
                        <TextField name='pw' type='password' label='Mật khẩu'
                            value={pw} onChange={this.handleChange} fullWidth className={classes.textField}
                            helperText={errs.password} error={errs.password ? true : false}
                        />
                        {errs.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errs.general}
                            </Typography>
                        )}
                        <Button type='submit' variant='contained'
                            color='primary' className={classes.button} disabled={loading}
                        >
                            Login
                             {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>
                            Chưa có tài khoản? Đăng kí member ở <Link to='/signup'>đây</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
const mapState2Props = state => ({
    // user: state.userReducer,
    UI: state.uiReducer,
})
const mapActions2Props = {
    loginUser
}

export default connect(mapState2Props, mapActions2Props)(withStyles(loginStyle)(login))