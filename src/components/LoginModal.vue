<script setup>
import { ref } from 'vue';
import { useAuth } from '../store/auth';

const { register, login } = useAuth();
const emit = defineEmits(['close']);
const isRegister = ref(false);
const email = ref('');
const password = ref('');
const name = ref('');
const lastName = ref('');
const gender = ref('');

const handleSubmit = async () => {
  console.log('Botão clicado!'); // Verifica se o clique está funcionando

  if (!email.value || !password.value) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    let response;
    if (isRegister.value) {
      console.log('Enviando requisição de registro...');
      response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, name: name.value, lastName: lastName.value, gender: gender.value, password: password.value }),
      });
    } else {
      console.log('Enviando requisição de login...');
      response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });
    }

    const result = await response.json();
    
    console.log('Resposta do servidor:', result);
    
    if (!response.ok) {
      alert(result.message); // Exibe alerta caso haja erro
    } else {
      alert(result.message); // Exibe mensagem de sucesso
      emit('close');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar com o servidor!');
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ isRegister ? "Registro" : "Login" }}</h2>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      
      <div v-if="isRegister">
        <input v-model="name" type="text" placeholder="Nome" required />
        <input v-model="lastName" type="text" placeholder="Sobrenome" required />
        <select v-model="gender">
          <option disabled value="">Selecione o gênero</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>

      <button @click="handleSubmit">{{ isRegister ? "Registrar" : "Entrar" }}</button>
      <p @click="isRegister = !isRegister">
        {{ isRegister ? "Já tem conta? Faça login" : "Não tem conta? Registre-se" }}
      </p>
      <button @click="$emit('close')">Fechar</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: var(--background);
  padding: 32px 42px 32px 32px;
  border-radius: 10px;
  text-align: center;
}

input, select {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
