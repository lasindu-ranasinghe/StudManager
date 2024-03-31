import React from 'react'
import Table from "../../Components/Table/LogsTable"

export default function LogPage() {
  const currentDate = new Date();
  return (
    <div>
      <h1>VIEW LOGS</h1>
      <span>{currentDate.toDateString()}</span>
      <Table/>
    </div>
  )
}
