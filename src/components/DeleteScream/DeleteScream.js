import React, { Component, Fragment } from 'react'
import { withStyles, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataAction'
import MyButton from '../../utils/MyButton'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import deleteScreamStyle from './DeleteScreamStyle'

class DeleteScream extends Component {
    state = { open: false }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({ open: false })
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <MyButton tip='Xóa status ' onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}>
                    <DeleteOutline color='secondary' />
                </MyButton>
                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth maxWidth='sm'>
                    <DialogTitle>
                        Bạn có chắc muốn xóa status này ko?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Hủy
                        </Button>
                        <Button onClick={this.deleteScream} color='secondary'>
                            xóa
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapActionToProps = {
    deleteScream
}

export default connect(null, mapActionToProps)(withStyles(deleteScreamStyle)(DeleteScream))
