import React from 'react';
import { Input, Button } from 'react-native-elements';
import { ScrollView, ViewStyle } from 'react-native';
import Header from '../../../components/Header';
import { useEditProfile } from '../hooks/useEditProfile';
import { Container, Title, ProfileCard, Avatar, RoleBadge, RoleText, styles } from '../styles/styles';

export const EditProfileScreen: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    specialty,
    setSpecialty,
    loading,
    user,
    handleSaveProfile,
    handleCancel,
  } = useEditProfile();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Editar Perfil</Title>
        <ProfileCard>
          <Avatar source={{ uri: user?.image || 'https://via.placeholder.com/150' }} />
          <Input
            label="Nome"
            value={name}
            onChangeText={setName}
            containerStyle={styles.input}
            placeholder="Digite seu nome"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {user?.role === 'doctor' && (
            <Input
              label="Especialidade"
              value={specialty}
              onChangeText={setSpecialty}
              containerStyle={styles.input}
              placeholder="Digite sua especialidade"
            />
          )}
          <RoleBadge role={user?.role || ''}>
            <RoleText>{user?.role === 'admin' ? 'Administrador' : user?.role === 'doctor' ? 'Médico' : 'Paciente'}</RoleText>
          </RoleBadge>
        </ProfileCard>
        <Button
          title="Salvar Alterações"
          onPress={handleSaveProfile}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.saveButton}
        />
        <Button
          title="Cancelar"
          onPress={handleCancel}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};

export default EditProfileScreen;
