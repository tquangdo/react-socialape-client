import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'

export default ({ children, onClick, tip, btnClassName }) => (
    <Tooltip title={tip} placement='top'>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
