"use client"
import { useSelector, useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'
import { setSideBarExpanded } from '../../state/uiSlice'
import IconX from '../vector/IconX'
import { SIDE_PANEL_HEADERS } from '@/config/utils'
const Sidebar = () => {
    const sideBarExpanded = useSelector((state) => state.ui.sideBarExpanded) || null
    const dispatch = useDispatch()
    const t = useTranslations();
    return (
        <>
            <div onClick={() => {dispatch(setSideBarExpanded(null))}}
                className={`fixed z-40 bg-taskbar-bg-dark dark:bg-taskbar-bg-light top-0 bottom-0 left-0 right-0
                transition-opacity ${sideBarExpanded ? 'opacity-25' : 'opacity-0 pointer-events-none'}`}>

            </div>
            <aside 
                className={`fixed bg-taskbar-bg-light dark:bg-taskbar-bg-dark top-0 bottom-0 w-full md:w-[300px] 
                max-w-[100%] md:max-w-[40%] z-50 transition-transform duration-300 ease-in-out
                ${sideBarExpanded ? 'translate-x-0' : '-translate-x-full'}`}>
                <button 
                    aria-label={t('close')}
                    className='icon-button absolute top-1 right-1'
                    onClick={() => {dispatch(setSideBarExpanded(null))}}>
                    <IconX />
                </button>
                {/* <h3 className='my-3 ml-4 font-semibold'>{t(SIDE_PANEL_HEADERS[sideBarExpanded] || '')}</h3> */}
            </aside>
        </>
    )
}

export default Sidebar
