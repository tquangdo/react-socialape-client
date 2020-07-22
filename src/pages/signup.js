import { Button, CircularProgress, Grid, TextField, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginIcon from '../images/login.png'
import loginStyle from './Login/loginStyle'
import { signupUser, logoutUser } from '../redux/actions/userAction'
import { connect } from 'react-redux'

class signup extends Component {
    state = {
        email: '',
        pw: '',
        confirmPw: '',
        handle: '',
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
        const { email, pw, confirmPw, handle } = this.state
        const newUserData = {
            email: email,
            password: pw,
            confirmPassword: confirmPw,
            handle: handle,
        }
        this.props.signupUser(newUserData, this.props.history)
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    render() {
        const {
            classes, UI: { loading }
        } = this.props
        const { email, pw, errs, confirmPw, handle } = this.state
        return (
            <Grid container className={classes.form} >
                <Grid item sm />
                <Grid item sm>
                    <img className={classes.image} src={LoginIcon} alt='login_icon' />
                    <Typography variant='h3' className={classes.pageTitle} >
                        Đăng kí
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
                        <TextField name='confirmPw' type='password' label='Nhập lại mật khẩu'
                            value={confirmPw} onChange={this.handleChange} fullWidth className={classes.textField}
                            helperText={errs.confirmPassword} error={errs.confirmPassword ? true : false}
                        />
                        <TextField name='handle' type='text' label='Tên user'
                            value={handle} onChange={this.handleChange} fullWidth
                            helperText={errs.handle} error={errs.handle ? true : false}
                        />
                        {errs.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errs.general}
                            </Typography>
                        )}
                        <Button type='submit' variant='contained'
                            color='primary' className={classes.button} disabled={loading}
                        >
                            Đăng kí
                             {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>
                            Đã có tài khoản? Login ở <Link to='/login'>đây</Link>
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
    signupUser, logoutUser
}

export default connect(mapState2Props, mapActions2Props)(withStyles(loginStyle)(signup))