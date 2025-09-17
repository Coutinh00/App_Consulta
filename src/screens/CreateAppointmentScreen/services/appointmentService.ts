import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../models/appointment';

export const AppointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    const stored = await AsyncStorage.getItem('@MedicalApp:appointments');
    return stored ? JSON.parse(stored) : [];
  },
  async saveAppointments(appointments: Appointment[]): Promise<void> {
    await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));
  },
  async addAppointment(appointment: Appointment): Promise<void> {
    const appointments = await this.getAppointments();
    appointments.push(appointment);
    await this.saveAppointments(appointments);
  },
};
