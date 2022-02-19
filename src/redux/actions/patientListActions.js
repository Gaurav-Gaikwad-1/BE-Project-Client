import { getPatients } from '../../services/ClinicDataAPI'
import {actions} from '../constants/patientListConstants'

export const patientListAction = (page,size)=>async(dispatch)=>{
    try{
        // handle get patient list logic here
        let token = JSON.parse(localStorage.getItem('clinicInfo')).token
        let res_patients=[]
        await getPatients(page,size,token)
            .then(res=>{
                res_patients=res
            })
            .catch(err=>{console.log(err)})

        dispatch({
            type:actions.GET_ALL_PATIENTS,
            payload:res_patients
        })
    }catch(err){
        console.log(err)
    }
}

export const addPatientAction = (patient)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.ADD_NEW_PATIENT,
            payload:patient
        })
    }catch(err){
        console.log(err)
    }
}

export const deletePatientAction = (patient)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.DELETE_PATIENT,
            payload:patient
        })
    }catch(err){
        console.log(err)
    }
}