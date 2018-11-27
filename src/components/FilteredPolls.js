import React from 'react'
import UnansweredPoll from './UnansweredPoll'
import AnsweredPoll from './AnsweredPoll'


function FilteredPolls (props) {
  const {filter, id} = props
  return (
    filter == 'answered' ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />
  )
}

export default FilteredPolls 