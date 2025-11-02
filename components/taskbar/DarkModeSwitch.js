"use client"
import { useSelector, useDispatch } from 'react-redux'
import { setEnableDarkmode } from '../../state/uiSlice'
import { Moon, Sun } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { useTranslations } from 'next-intl'

const DarkModeSwitch = () => {
    const t = useTranslations('Header')
    const enableDarkmode = useSelector((state) => state.ui.enableDarkmode)
    const dispatch = useDispatch()
    
    const darkModeHandler = () => {
            dispatch(setEnableDarkmode(!enableDarkmode))
            document.body.classList.toggle("dark");
    }
    return (
        <button className='icon-button'
            data-tooltip-id="dropdown-tooltip"             
            aria-label={t('toggle_darkmode')}
                onClick={darkModeHandler}>
                    {enableDarkmode ? <Sun/> : <Moon/>}
                    {/* data-tooltip-content={t('toggle_darkmode')} */}
                    {/* <Tooltip id="darkmode-tooltip" /> */}
        </button>
    )
}

export default DarkModeSwitch
