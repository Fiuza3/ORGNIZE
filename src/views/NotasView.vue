<template>
  <div>
    <h1>Minhas Notas</h1>
    <p>Aqui você pode visualizar suas notas.</p>
    <button @click="createNote" class="newnote">Adicionar Nota</button>
    <div class="notes-container">
      <div v-for="note in notes" :key="note.id" class="note">
        <h2>{{ note.title }}</h2>
        <p>{{ note.content }}</p>
        <p>Criado em: {{ note.createdAt }}</p>
        <p>Última alteração: {{ note.updatedAt }}</p>
        <button @click="editNote(note)">Editar</button>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <h2>{{ editingNote ? 'Editar Nota' : 'Nova Nota' }}</h2>
      <input v-model="noteTitle" placeholder="Título" />
      <textarea v-model="noteContent" placeholder="Conteúdo"></textarea>
      <button @click="saveNote">Salvar</button>
      <button @click="closeModal">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  setup() {
    const notes = ref([]);
    const showModal = ref(false);
    const noteTitle = ref('');
    const noteContent = ref('');
    const editingNote = ref(null);

    const loadNotes = () => {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        notes.value = JSON.parse(savedNotes);
      }
    };

    const saveNotes = () => {
      localStorage.setItem('notes', JSON.stringify(notes.value));
    };

    const createNote = () => {
      noteTitle.value = '';
      noteContent.value = '';
      editingNote.value = null;
      showModal.value = true;
    };

    const editNote = (note) => {
      noteTitle.value = note.title;
      noteContent.value = note.content;
      editingNote.value = note;
      showModal.value = true;
    };

    const saveNote = () => {
      if (editingNote.value) {
        editingNote.value.title = noteTitle.value;
        editingNote.value.content = noteContent.value;
        editingNote.value.updatedAt = new Date().toLocaleString();
      } else {
        const newNote = {
          id: uuidv4(),
          title: noteTitle.value,
          content: noteContent.value,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        };
        notes.value.push(newNote);
      }
      saveNotes();
      closeModal();
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(() => {
      loadNotes();
    });

    return {
      notes,
      showModal,
      noteTitle,
      noteContent,
      createNote,
      editNote,
      saveNote,
      closeModal,
    };
  },
};
</script>

<style scoped>
.notes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.note {
  width: 335px;
  height: 335px;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #16161a;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
}

.modal input,
.modal textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
}

.modal button {
  margin: 5px;
}
.newnote {
  margin-bottom: 32px;
}

</style>
