import React from 'react'
import useSettings from 'app/hooks/useSettings'

const MatxLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]

    return <div></div>
}

export default MatxLogo
