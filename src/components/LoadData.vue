<script>
import { ref, watch, computed } from 'vue'
import { getUserData, getReposData } from '../api.js'

export default {
  components: {},
  name: 'LoadData',
  props: {
    username: String,
  },
  setup(props) {
    const userData = ref('')
    const userRepositories = ref([])
    const loading = ref(false)

    const perfilUsuario = computed(() => {
      return {
        name: userData.value.name,
        bio: userData.value.bio,
        location: userData.value.location,
        blog: userData.value.blog,
      }
    })

    const getUser = async (name) => {
      try {
        loading.value = true
        userData.value = await getUserData(name.value)
      } catch (error) {
        console.error(error)
      }finally {
        loading.value = false
      }
    }

    const getRepos = async (name) => {
      try {
        loading.value = true
        userData.value = await getReposData(name.value)
      } catch (error) {
        console.error(error)
      }finally {
        loading.value = false
      }
    }

    watch(
      () => props.username,
      (newValue) => {
        getUser(newValue)
        getRepos(newValue)
      }
    )

    return {
      userData,
      perfilUsuario,
      userRepositories,
      loading,
    }
  },
}
</script>
<style scoped>
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
