export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  let user = JSON.parse(localStorage.getItem('user'));
  console.log('logout user',user);
}

export function formatPoll (poll, author, authedUser) {
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
      percentage: (optionOne.votes.length * 100) / totalVotes,
      hasVoted: optionOne.votes.includes(authedUser),
    },
    optionTwo: {
      text: optionTwo.text,
      votes: optionTwo.votes.length,
      percentage: (optionTwo.votes.length * 100) / totalVotes,
      hasVoted: optionTwo.votes.includes(authedUser),
    }
  }
}