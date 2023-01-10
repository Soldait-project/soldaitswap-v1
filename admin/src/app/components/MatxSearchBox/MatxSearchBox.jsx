import React, { useState } from 'react'
import { styled, useTheme } from '@mui/system'
import { Icon, IconButton } from '@mui/material'
import { topBarHeight } from 'app/utils/constant'

const SearchContainer = styled('div')(({ theme }) => ({
    // position: 'absolute',
    // top: 90,
    // left: 40,
    zIndex: 9,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: topBarHeight,
    border: "1px solid #ddd",
    background: "transparent",
    borderRadius: "15px",
    color: theme.palette.text.primary,
    '&::placeholder': {
        color: theme.palette.text.primary,
    },
}))

const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    paddingLeft: '20px',
    height: 'calc(100% - 5px)',
    background: "transparent",
    color: theme.palette.text.primary,
    '&::placeholder': {
        color: theme.palette.text.primary,
    },
}))

const MatxSearchBox = (props) => {
    const {getsearch,setSearch} = props;
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }

    const { palette } = useTheme()
    const textColor = palette.text.primary

    const clear=(()=>{
        setSearch('')
        getsearch('')
    })

    return (
        <React.Fragment>
            {!open && (
                <IconButton onClick={toggle}>
                    <Icon sx={{ color: textColor }}>search</Icon>
                </IconButton>
            )}

            {open && (
                <SearchContainer>
                    <SearchInput
                        onChange={(e)=>{getsearch(e.target.value)}}
                        type="text"
                        placeholder="Search Address here..."
                        autoFocus
                    />
                    <IconButton
                        onClick={toggle}
                        sx={{ mx: 2, verticalAlign: '' }}
                        edge='end'
                    >
                        <Icon sx={{ color: textColor }} onClick={clear}>close</Icon>
                    </IconButton>
                </SearchContainer>
            )}
        </React.Fragment>
    )
}

export default MatxSearchBox
