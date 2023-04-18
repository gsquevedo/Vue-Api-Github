const getUserData = async (name) => {
  try {
    const response = await fetch(`https://api.github.com/users/${name}`);
    if(!response.ok){
      throw new Error("Erro na requisição")
    }
    const userData = response.json()
    return userData
  } catch (error) {
    throw new Error("Erro na requisição")
  }
}

const getReposData = async (name) => {
  try {
    const response = await fetch(`https://api.github.com/users/${name}/repos`);
    if(!response.ok){
      throw new Error("Erro na requisicao")
    }
    const reposData = response.json()
    return reposData
  } catch (error) {
    throw new Error("Erro na requisição")
  }
}

export {
  getUserData,
  getReposData
}
  