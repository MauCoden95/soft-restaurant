import React from 'react'

export const BtnSend = (props) => {
  return (
    <button className='px-6 py-1.5 rounded-md duration-300 bg-slate-900 hover:bg-slate-800 text-white'>
        {props.value}
    </button>
  )
}
