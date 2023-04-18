<template>
    <section>
        <form @submit.prevent="onSubmit" id="userForm">
            <h1>Buscar usuários e seus repositórios do GitHub</h1>
            <div class="input-container">
                <InputText v-model="username" :type="'text'" :placeholder="'Digite o nome de usuário'"/>
            </div>
            <div class="positionBtn">
                <ButtonUser class="btnSearch"  @click="searchUser" :type="'submit'" form="userForm" > Pesquisar </ButtonUser>
            </div>
            <div class="user">
                <div v-if="userData">
                    <h2>{{ userData.name }}</h2>
                    <p>{{ userData.bio }}</p> 
                </div>
            </div>
            <div class="repositorios">
                <ul id="myList" v-if="userRepositories.length > 0">
                    <h4>Repositórios</h4>
                    <small>Total: {{ userRepositories.length }}</small>
                    <hr />
                    <li v-for="repository in userRepositories" :key="repository.id">
                        {{ repository.name }}
                    </li>
                </ul>
            </div>
        </form>
    </section>
</template>
<script>
import { ref } from 'vue'
import InputText from "./InputText.vue"
import ButtonUser from './ButtonUser.vue';
import { getUserData, getReposData } from '../api.js'

export default {
    name: "FormUser",
    setup(props, { emit }) {
       const username = ref(props.value);
       const userData = ref('')
       const userRepositories = ref('')

       const onSubmit = () => {
        emit("update:value", username.value)
       }

       const searchUser = async () => {
          try {
            const [userDataResult, reposResult] = await Promise.all([
              getUserData(username.value),
              getReposData(username.value)
            ]);
            userData.value = userDataResult;
            userRepositories.value = reposResult;
          } catch (error) {
            console.error(error);
          }
        };

       
       return {
        username, 
        onSubmit,
        searchUser,
        userData,
        userRepositories
       }

    },
    components: { 
        InputText,
        ButtonUser 
    }
}
</script>

<style scoped>
.btnSearch {
  margin-top: 20px;
  width: 120px;
  height: 40px;
  font-size: 1.2rem;
  background-color: #54a89a;
  width: 100%;
  border: none;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
}

.btnSearch:hover {
  background-color: #459689;
  color: #f3f3f9;
}

.positionBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container {
  position: relative;
}

input {
  border: 0;
  border-bottom: 2px solid #9e9e9e;
  outline: none;
  transition: 0.2s ease-in-out;
  box-sizing: border-box;
}

label {
  top: 0;
  left: 0;
  right: 0;
  color: #616161;
  display: flex;
  align-items: center;
  position: absolute;
  font-size: 1rem;
  cursor: text;
  transition: 0.2s ease-in-out;
  box-sizing: border-box;
}

input,
label {
  width: 100%;
  height: 3rem;
  font-size: 1rem;
}

/* Interation */
input:valid,
input:focus {
  border-bottom: 2px solid #26a69a;
}

input:valid + label,
input:focus + label {
  color: #26a69a;
  font-size: 0.8rem;
  top: -30px;
  pointer-events: none;
}

h1 {
  color: #616161;
  text-align: center;
  margin-bottom: 30px;
}

section {
  margin: 15px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 0 0 2px 2px;
  background-color: #fff;
}

.repositorios {
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
  flex-direction: column;
  width: 92%;
}

.repositorios h4 {
  text-align: center;
}

.card {
  max-width: 70ch;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  flex-wrap: wrap;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  box-shadow: 30px 30px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  border: 15px solid white;
  margin-bottom: 40px;
}

.card:hover {
  box-shadow: 30px 30px 30px 35px rgba(0, 0, 0, 0.3);
}

ul > h4 {
  margin-bottom: 2px;
}

#listRepos {
  position: absolute;
  width: 80vw;
}
#listRepos li {
  visibility: hidden;
  -webkit-animation: fadeIn 2s ease-in-out;
  -moz-animation: fadeIn 2s ease-in-out;
  -o-animation: fadeIn 2s ease-in-out;
  animation: fadeIn 2s ease-in-out;
}
#listRepos li:nth-child(2n) {
  background-color: #444;
  color: #2de;
  padding: 6px 0;
  list-style: none;
}

#listRepos li:nth-child(2n + 1) {
  background-color: #333;
  color: white;
  padding: 6px 0;
  list-style: none;
}
</style>
