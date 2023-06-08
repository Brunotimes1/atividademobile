import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [seguidores, setSeguidores] = useState(0);

  useEffect(() => {
    fetchSeguidores();
  }, []);

  const fetchSeguidores = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/Brunotimes1');
      setSeguidores(response.data.followers);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa('');
    }
  };

  const atualizarTarefa = (index) => {
    const tarefasAtualizadas = [...tarefas];
    tarefasAtualizadas[index] = novaTarefa;
    setTarefas(tarefasAtualizadas);
    setNovaTarefa('');
  };

  const excluirTarefa = (index) => {
    const tarefasAtualizadas = [...tarefas];
    tarefasAtualizadas.splice(index, 1);
    setTarefas(tarefasAtualizadas);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f7a35c', '#f7a35c', '#9c715f']} style={styles.background}>
        <Text style={styles.titulo}>Lista de Tarefas</Text>
        <View style={styles.seguidoresContainer}>
          <Text style={styles.seguidoresTexto}>Seguidores: {seguidores}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova tarefa"
            value={novaTarefa}
            onChangeText={(text) => setNovaTarefa(text)}
          />
          <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
            <Text style={styles.botaoTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>
        {tarefas.map((tarefa, index) => (
          <View key={index} style={styles.tarefaContainer}>
            <Text style={styles.tarefaTexto}>{tarefa}</Text>
            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => atualizarTarefa(index)}
              >
                <Text style={styles.botaoTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluirTarefa(index)}
              >
                <Text style={styles.botaoTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seguidoresContainer: {
    marginBottom: 20,
  },
  seguidoresTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  botao: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tarefaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tarefaTexto: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  botoesContainer: {
    flexDirection: 'row',
  },
  botaoEditar: {
    backgroundColor: 'green',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
});
