import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import StatusBar from '../../components/StatusBar';
import { COLORS } from '../../helper/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const SplasScreen = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
   setTimeout(()=>{
    navigation.navigate('HomeScreen')
   },1000)
  }, []);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar bgColor={COLORS.PRIMARY} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.SECONDARY,
        }}>
        <Icon name='playcircleo' size={50} color={COLORS.PRIMARY}/>   
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.TEXT,
            }}>
            PLAY LIST
          </Text>
        </View>
        <ActivityIndicator color={COLORS.TEXT} style={{ marginTop: 5 }} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{ color: COLORS.TEXT, fontSize: 14 }}>Create By :</Text>
        <Text
          style={{
            color: COLORS.TEXT,
            fontSize: 20,
            marginTop: 5,
            fontWeight: 'bold',
          }}>
          SamTech
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplasScreen;
