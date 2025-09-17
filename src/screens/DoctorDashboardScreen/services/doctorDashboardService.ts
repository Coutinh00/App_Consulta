import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export class DoctorDashboardService {
  private static readonly STORAGE_KEY = '@MedicalApp:appointments';

  static async loadAppointments(doctorId: string): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const doctorAppointments = allAppointments.filter(
          (appointment) => appointment.doctorId === doctorId
        );
        return doctorAppointments;
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      return [];
    }
  }

  static async saveAppointments(appointments: Appointment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
      console.error('Erro ao salvar consultas:', error);
      throw error;
    }
  }

  static async updateAppointmentStatus(appointmentId: string, newStatus: 'confirmed' | 'cancelled'): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedAppointments));
        return updatedAppointments;
      }
      return [];
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  }

  static async deleteAppointment(appointmentId: string): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.filter(appointment => appointment.id !== appointmentId);
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedAppointments));
        return updatedAppointments;
      }
      return [];
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
      throw error;
    }
  }
}
