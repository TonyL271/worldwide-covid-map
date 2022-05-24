import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
const Hamburger = ({ open, setOpen, sx}) => {
    return (
        <MenuIcon
            sx={{
                ... sx,
                width: {
                    xs: '2.5rem',
                    sm: '3.5rem'

                },
                height: {
                    xs: '2.5rem',
                    sm: '3.5rem'
                },
                backgroundColor: 'white',
                color: 'red',
                zIndex: 3000,
                mt: '2rem',
                ml: '2rem',
                borderRadius: '0.35rem'
            }}
            onClick={(e) => setOpen(!open)}
        />
    )
}

export default Hamburger