export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  let user = JSON.parse(localStorage.getItem('user'));
  console.log('logout user',user);
}

export function formatBoard(user) {
  const { name, avatarURL, questions, answers } = user
  console.log("formatBoard")
  return {
    name,
    avatar: avatarURL,
    answered: Object.keys(answers).length,
    questions: questions.length,
    score: Object.keys(answers).length + questions.length
  }
}

export function formatPoll (poll, author, authedUser) {
  console.log("formatPoll")
  const { optionOne, optionTwo, id, timestamp } = poll
  const { name, avatarURL } = author
  const totalVotes = optionOne.votes.length + optionTwo.votes.length
  
  return {
    id,
    timestamp,
    name,
    avatar: avatarURL,
    totalVotes,
    optionOne: {
      text: optionOne.text,
      votes: optionOne.votes.length,
      percentage: Math.round((optionOne.votes.length * 100) / totalVotes),
      hasVoted: optionOne.votes.includes(authedUser),
    },
    optionTwo: {
      text: optionTwo.text,
      votes: optionTwo.votes.length,
      percentage: Math.round((optionTwo.votes.length * 100) / totalVotes),
      hasVoted: optionTwo.votes.includes(authedUser),
    }
  }

}