'use client'

import { useState, useCallback } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import Logo from '../../components/Logos/Logo'
import InformativeMessage from '../../components/InformativeMessage/InformativeMessage'
import CustomButton from '../../components/Button/CustomButton'
import LogoFooter from '../../components/Logos/LogoFooter'
import CustomModal from '../../components/Modal/CustomModal'

import { getTenantData } from '../../api/tenant'
import { getDocumentTypeData } from '../../api/documentType'
import { setTenantData, setDocumentType, getDocumentType } from '../../util/localStorage'

import styles from './HomePage.module.css'

const HomePage = () => {
    const navigate = useNavigate()
    const { tenant } = useParams()

    // Modal state for errors and information
    const [modalState, setModalState] = useState({ 
        loading: false, 
        error: false, 
        title: '', 
        message: '', 
        button: false,
    })

    // Handlers for error and modal
    const showError = useCallback((title, message, button = false) => {
        setModalState({ 
            loading: false, 
            error: true, 
            title,
            message, 
            button,
        })
    }, [])

    const handleViewReservation = async () => {
        try {
            const tenantData = await getTenantData(tenant)
            if (!tenantData?.data || tenantData.data.estado !== "ACTIVO") {
                console.error('Tenant data is invalid or inactive')
                showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
                return
            }
        
            setTenantData(JSON.stringify(tenantData.data))
            const documentTypes = getDocumentType()

            if (Object.keys(documentTypes).length === 0) {
                const documentData = await getDocumentTypeData()
                if (!documentData?.data) {
                    console.error('Error fetching document types')
                    showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
                    return
                }
            
                const activeDocuments = documentData.data
                    .filter(({ estado }) => estado === "ACTIVO")
                    .map(({ codigo, nombre }) => ({ cod: codigo, value: nombre, label: nombre }))
            
                setDocumentType(activeDocuments)
            }

            navigate("/consultReservation", { replace: true })

        } catch (error) {
            console.error('Error in handleViewReservation:', error)
            showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
        }
    }

    const handleNewReservation = async () => {
        try {
            setModalState({ loading: true, error: false, title: '', message: '', button: false })
        
            const tenantData = await getTenantData(tenant)
            if (!tenantData?.data || tenantData.data.estado !== "ACTIVO") {
                console.error('Tenant data is invalid or inactive')
                showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
                return
            }
        
            setTenantData(JSON.stringify(tenantData.data))
            const documentTypes = getDocumentType()

            if (Object.keys(documentTypes).length === 0) {
                const documentData = await getDocumentTypeData()
                if (!documentData?.data) {
                    console.error('Error fetching document types')
                    showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
                    return
                }
            
                const activeDocuments = documentData.data
                    .filter(({ estado }) => estado === "ACTIVO")
                    .map(({ codigo, nombre }) => ({ cod: codigo, value: nombre, label: nombre }))
            
                setDocumentType(activeDocuments)
            }
        
            setTimeout(() => {
                setModalState({ loading: false, error: false, title: '', message: '', button: false })
                navigate("/login", { replace: true })
            }, 5000)

        } catch (error) {
            console.error('Error in handleNewReservation:', error)
            showError('Ocurrió un error al crear una nueva reserva.')
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <div>
                        <Logo/>
                        <h1 className={styles.title}>Reserva de Turno</h1>
                        <div className={styles.informativeMessage}>
                            <InformativeMessage/>
                        </div>
                        <div className={styles.buttonContainer}>
                            <CustomButton 
                                name="activateTurn" 
                                label="Consultar reserva" 
                                type="button"
                                 onClick={handleViewReservation}
                            />
                            <CustomButton 
                                name="newReservation" 
                                label="Nueva Reserva" 
                                type="button" 
                                onClick={handleNewReservation} 
                            />
                        </div>
                    </div>
                    {modalState.loading && (
                        <CustomModal 
                            title='La reserva no es una cita'
                            description='Te recomendamos activar tu turno 5 minutos antes y durante los primeros 10 minutos de la hora de tu reserva.'
                        />
                    )}
                    {modalState.error && (
                        <CustomModal 
                            title={modalState.title}
                            description={modalState.message}
                            error={true}
                        />
                    )}   
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default HomePage