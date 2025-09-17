export interface Patient {
  id: string;
  name: string;
  image: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana Souza',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Carlos Pereira',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Marina Lima',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export const getPatientInfo = (patientId: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === patientId);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '#4CAF50'; // Verde
    case 'cancelled':
      return '#F44336'; // Vermelho
    default:
      return '#FF9800'; // Laranja
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};
