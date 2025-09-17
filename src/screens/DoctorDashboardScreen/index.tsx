import React from 'react';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import { AppointmentItem } from './components/AppointmentItem';
import Header from '../../components/Header';
import { Appointment } from './services/doctorDashboardService';
import theme from '../../styles/theme';
import {
  Container,
  ScrollContent,
  Title,
  LoadingText,
  EmptyText,
} from './styles';

type DoctorDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorDashboard'>;
};

const DoctorDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
  const {
    appointments,
    loading,
    handleUpdateStatus,
    handleDeleteAppointment,
    handleEditAppointment,
  } = useDoctorDashboard();

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentItem
      appointment={item}
      onUpdateStatus={handleUpdateStatus}
      onEdit={handleEditAppointment}
      onDelete={handleDeleteAppointment}
    />
  );

  return (
    <Container>
      <Header />
      <ScrollContent>
        <Title>Minhas Consultas</Title>

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            paddingVertical: 12,
            marginBottom: 20,
          }}
        />

        {loading ? (
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          buttonStyle={{
            backgroundColor: theme.colors.error,
            paddingVertical: 12,
            marginTop: 20,
          }}
        />
      </ScrollContent>
    </Container>
  );
};

export default DoctorDashboardScreen;
