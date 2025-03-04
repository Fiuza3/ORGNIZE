import { ref } from 'vue';

const user = ref(JSON.parse(localStorage.getItem('user')) || null);

const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const foundUser = users.find(u => u.email === email);

  if (!foundUser) {
    alert('Usuário não encontrado!');
    return;
  }

  if (foundUser.password !== password) {
    alert('Senha incorreta!');
    return;
  }

  user.value = foundUser;
  localStorage.setItem('user', JSON.stringify(foundUser));
};

const register = (email, name, lastName, gender, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(u => u.email === email)) {
    alert('Este email já está cadastrado!');
    return;
  }

  const newUser = { email, name, lastName, gender, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Cadastro realizado com sucesso!');
};

const logout = () => {
  user.value = null;
  localStorage.removeItem('user');
};

export function useAuth() {
  return { user, login, register, logout };
}
