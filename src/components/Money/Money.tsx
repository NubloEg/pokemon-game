import React from 'react'
import { useSelector } from 'react-redux'
import { selectMoney } from '../../redux/profileSlice'

export default function Money() {
  const money=useSelector(selectMoney)
  return (
    <div className="money">{money}</div>
  )
}
