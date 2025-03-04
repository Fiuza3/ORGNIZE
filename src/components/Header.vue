<script setup>
import { ref, computed } from 'vue';
import LoginModal from './LoginModal.vue';
import { useAuth } from '../store/auth';

// Pegando estado de autenticação
const { user, logout } = useAuth();
const isLoggedIn = computed(() => !!user.value);

// Controle do modal de login
const showLogin = ref(false);
const openLogin = () => (showLogin.value = true);
const closeLogin = () => (showLogin.value = false);
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/notas">Notas</router-link></li>
        <li><router-link to="/financas">Finanças</router-link></li>
        <li><router-link to="/sobre">Sobre</router-link></li>
      </ul>
      <div class="user-section">
        <button @click="openLogin" class="user-button">
          <img src="@/assets/user-icon.svg" alt="Usuário" />
        </button>
        <span v-if="isLoggedIn" class="username">
          {{ user.gender === 'masculino' ? 'Sr.' : 'Sra.' }} {{ user.lastName }}
          <button @click="logout">Sair</button>
        </span>
      </div>
    </nav>
    <LoginModal v-if="showLogin" @close="closeLogin" />
  </header>
</template>

<style scoped>
header {
  background-color: var(--stroke);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  margin-left: 20px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0 auto;
  text-decoration: none;
}

nav ul:hover {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0 auto;
  text-decoration: none;
}

nav a {
  color: var(--headline);
  font-size: 18px;
  padding: 10px;
  transition: background 0.3s, transform 0.2s;
  text-decoration: none;
}

nav a:hover {
  background: var(--button);
  color: var(--button-text);
  border-radius: 5px;
  transform: scale(1.1);
  text-decoration: none;
}

.user-section {
  display: flex;
  gap: 10px;
}

.user-button img {
  height: 35px;
  cursor: pointer;
}

.username {
  color: var(--headline);
  font-weight: bold;
}
</style>
