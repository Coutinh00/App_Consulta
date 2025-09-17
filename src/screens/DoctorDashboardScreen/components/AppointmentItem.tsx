import React from 'react';
import { Button } from 'react-native-elements';
import { Appointment } from '../services/doctorDashboardService';
import { getPatientInfo, getStatusText } from '../models/patients';
import theme from '../../../styles/theme';
import {
  AppointmentCard,
  PatientImage,
  InfoContainer,
  PatientName,
  DateTime,
  Description,
  StatusBadge,
  StatusText,
  ButtonContainer,
} from '../styles';

interface AppointmentItemProps {
  appointment: Appointment;
  onUpdateStatus?: (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => void;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: string) => void;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onUpdateStatus,
  onEdit,
  onDelete,
}) => {
  const patient = getPatientInfo(appointment.patientId);

  const handleConfirm = () => {
    if (onUpdateStatus) {
      onUpdateStatus(appointment.id, 'confirmed');
    }
  };

  const handleCancel = () => {
    if (onUpdateStatus) {
      onUpdateStatus(appointment.id, 'cancelled');
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(appointment);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(appointment.id);
    }
  };

  return (
    <AppointmentCard>
      <PatientImage source={{ uri: patient?.image || 'https://via.placeholder.com/100' }} />
      <InfoContainer>
        <PatientName>{patient?.name || appointment.patientName || 'Paciente não encontrado'}</PatientName>
        <DateTime>{appointment.date} às {appointment.time}</DateTime>
        <Description>{appointment.specialty}</Description>
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
        {appointment.status === 'pending' && (
          <ButtonContainer>
            <Button
              title="Confirmar"
              onPress={handleConfirm}
              buttonStyle={{
                backgroundColor: theme.colors.success,
                paddingVertical: 8,
                width: '48%',
              }}
            />
            <Button
              title="Cancelar"
              onPress={handleCancel}
              buttonStyle={{
                backgroundColor: theme.colors.error,
                paddingVertical: 8,
                width: '48%',
              }}
            />
          </ButtonContainer>
        )}
      </InfoContainer>
    </AppointmentCard>
  );
};
