import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { DoctorDashboardService, Appointment } from '../services/doctorDashboardService';

export const useDoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const loadedAppointments = await DoctorDashboardService.loadAppointments(user.id);
      setAppointments(loadedAppointments);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [user?.id])
  );

  const handleUpdateStatus = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      await DoctorDashboardService.updateAppointmentStatus(appointmentId, newStatus);
      await loadAppointments(); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await DoctorDashboardService.deleteAppointment(appointmentId);
      await loadAppointments(); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
    }
  };

  const handleEditAppointment = (appointment: Appointment) => {
    // Lógica para editar consulta será implementada posteriormente
    console.log('Editar consulta:', appointment);
  };

  return {
    appointments,
    loading,
    handleUpdateStatus,
    handleDeleteAppointment,
    handleEditAppointment,
  };
};
