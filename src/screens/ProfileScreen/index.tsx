import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useProfile } from './hooks/useProfile';
import { ProfileCard } from './components/ProfileCard';
import { ActionButtons } from './components/ActionButtons';
import Header from '../../components/Header';
import {
  Container,
  ScrollView,
  ScrollContent,
  Title,
} from './styles';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProps['navigation']>();
  const {
    userProfile,
    loading,
    handleEditProfile,
    handleSignOut,
    handleGoBack,
  } = useProfile();

  const handleEditProfilePress = () => {
    handleEditProfile();
    navigation.navigate('EditProfile' as any);
  };

  const handleGoBackPress = () => {
    handleGoBack();
    navigation.goBack();
  };

  const handleSignOutPress = () => {
    handleSignOut();
  };

  return (
    <Container>
      <Header />
      <ScrollView>
        <ScrollContent>
          <Title>Meu Perfil</Title>

          <ProfileCard user={userProfile} />

          <ActionButtons
            onEditProfile={handleEditProfilePress}
            onGoBack={handleGoBackPress}
            onSignOut={handleSignOutPress}
          />
        </ScrollContent>
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
