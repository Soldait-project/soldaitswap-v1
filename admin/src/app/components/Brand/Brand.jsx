import React from 'react'
import { MatxLogo } from 'app/components'
import { Span } from '../../components/Typography'
import { styled, Box } from '@mui/system'
import useSettings from 'app/hooks/useSettings'
import config from '../../config/config'
import Logo from '../../../assets/images/logo.png'
const BrandRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 18px 20px 29px',
}))

const StyledSpan = styled(Span)(({ theme, mode }) => ({
    fontSize: 18,
    marginLeft: '.5rem',
    display: mode === 'compact' ? 'none' : 'block',
}))
const IMG = styled('img')(() => ({
    width: '100%',
}))

var imageUrl = config.imageUrl

const Brand = ({ children }) => {
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    return (
        <BrandRoot>
            <Box alignItems="center">
                <IMG src={Logo} alt="Soldait" />
            </Box>
        </BrandRoot>
    )
}

export default Brand
