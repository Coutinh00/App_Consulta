import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  image?: string;
  specialty?: string;
}

export class ProfileService {
  private static readonly USER_STORAGE_KEY = '@MedicalApp:user';

  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      const storedUser = await AsyncStorage.getItem(this.USER_STORAGE_KEY);
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
      return null;
    }
  }

  static async updateUserProfile(updatedProfile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      throw error;
    }
  }

  static async clearUserProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.USER_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar perfil do usuário:', error);
      throw error;
    }
  }

  static async getUserStatistics(): Promise<{
    totalAppointments: number;
    completedAppointments: number;
    pendingAppointments: number;
  }> {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const appointments = JSON.parse(storedAppointments);
        const userAppointments = appointments.filter((appointment: any) => 
          appointment.patientId === (await this.getUserProfile())?.id ||
          appointment.doctorId === (await this.getUserProfile())?.id
        );
        
        return {
          totalAppointments: userAppointments.length,
          completedAppointments: userAppointments.filter((apt: any) => apt.status === 'confirmed').length,
          pendingAppointments: userAppointments.filter((apt: any) => apt.status === 'pending').length,
        };
      }
      return {
        totalAppointments: 0,
        completedAppointments: 0,
        pendingAppointments: 0,
      };
    } catch (error) {
      console.error('Erro ao carregar estatísticas do usuário:', error);
      return {
        totalAppointments: 0,
        completedAppointments: 0,
        pendingAppointments: 0,
      };
    }
  }
}
