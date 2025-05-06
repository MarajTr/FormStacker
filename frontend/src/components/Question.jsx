import React from 'react'
import { Paper, Tab, Tabs } from '@mui/material'

function Question() {
  return (
    <Paper
      elevation={3}
      sx={{ flexGrow: 1 }}
    >
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        centered
        sx={{ height: 10 }}
      >
        <Tab
          label="Question"
          sx={{
            fontSize: 12,
            color: '#5f6368',
            textTransform: 'capitalize',
            fontWeight: 600,
            fontFamily: 'Google Sans, Roboto, sans-serif, Arial'
          }}
        />
        <Tab
          label="Response"
          sx={{
            fontSize: 12,
            color: '#5f6368',
            textTransform: 'capitalize',
            fontWeight: 600,
            fontFamily: 'Google Sans, Roboto, sans-serif, Arial'
          }}
        />
      </Tabs>
    </Paper>
  )
}

export default Question
