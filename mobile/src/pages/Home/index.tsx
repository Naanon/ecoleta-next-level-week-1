import React, { useState, useEffect, ChangeEvent } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Text, Image, KeyboardAvoidingView, Platform, Picker } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import styles from './styles'

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {

  const navigation = useNavigation()
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials.sort())
    })
  }, [])

  useEffect(() => {
    //Carregar as cidades de acordo com suas respectivas UFs
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome)

      setCities(cityNames)
    })
  }, [selectedUf])

  function handleSelectUf(uf: string) {
    setSelectedUf(uf)
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city)
  }

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View>
          <Picker
            selectedValue={selectedUf}
            onValueChange={handleSelectUf}
            style={styles.select}
          >
            <Picker.Item
              key={String(0)}
              label="Selecione uma UF"
              value={0}
            />
            {ufs.map(uf => (
              <Picker.Item key={String(uf)} label={uf} value={uf} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedCity}
            onValueChange={handleSelectCity}
            style={styles.select}
          >
            <Picker.Item
              key={String(0)}
              label="Selecione uma Cidade"
              value={0}
            />
            {cities.map(city => (
              <Picker.Item key={String(city)} label={city} value={city} />
            ))}
          </Picker>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
          </Text>
          </RectButton>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default Home