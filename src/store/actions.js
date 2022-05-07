export default {
  updateMessage({commit}, newMessage) {
    commit('updateMessage', newMessage);
  },
  updateToken({commit}, newToken) {
    commit('updateToken', newToken);
  },
}